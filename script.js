import Player from "./scripts/player.js";
import Dice from "./scripts/dice.js";
import GameState from "./scripts/gameState.js";
import dialogPolyfill from "./node_modules/dialog-polyfill/dist/dialog-polyfill.esm.js";

const newGameButton = document.getElementById("ngButton");
const keepScoreButton = document.getElementById("keepScore");
const gameButtonPanel = document.getElementById("gameButtonPanel");
const playerPanel = document.getElementById("playerPanel");
const player1Name = document.getElementById("playerName1");
const player2Name = document.getElementById("playerName2");
const player1ind = document.getElementById("indicator-1");
const player2ind = document.getElementById("indicator-2");
const player1score = document.getElementById("score-1");
const player2score = document.getElementById("score-2");
const playerInfo = document.getElementsByClassName("playerInfo");
const diceImage = document.getElementById("dice");
const currentScoreText = document.getElementById("currentScore");

let player1 = new Player(player1Name, player1ind, player1score, 1, false);
let player2 = new Player(player2Name, player2ind, player2score, 2, false);
let dice = new Dice();
let currentPlayer;
let currentScore;

const MENU = new GameState("menu");
const INGAME = new GameState("ingame");
const OVER = new GameState("over");
const ROLL = new GameState("roll");
let state;
let gameMode;
let rollCounter;
let count;

const dialogWindow = document.getElementById("newGameDialog");
dialogPolyfill.registerDialog(dialogWindow);

dialogWindow.addEventListener("cancel", (ev) => {
  ev.preventDefault();
});

const helpWindow = document.getElementById("helpDialog");
dialogPolyfill.registerDialog(helpWindow);

const helpButton = document.getElementById("helpButton");
helpButton.addEventListener("click", function() {
  openHelpDialog();
});
const closeHelpButton = document.getElementById("closeButton");
closeHelpButton.addEventListener("click", function() {
  helpWindow.close();
});

function openHelpDialog() {
  if (typeof HTMLDialogElement === "function") {
    // console.log("navigateur compatible avec dialog");
    helpWindow.showModal();
  } else {
    // console.log("navigateur incompatible avec dialog");
    helpWindow.show();
  }
}

const warningMessage = document.getElementById("warning");
const soloSelector = document.getElementById("soloGame");
const twoSelector = document.getElementById("twoGame");
const iaRadio = document.getElementsByClassName("iconRadio");
const startButton = document.getElementById("startButton");
const cancelButton = document.getElementById("cancelButton");
const newGameForm = document.getElementById("newGameForm");
newGameForm.addEventListener(
  "submit",
  (ev) => {
    console.log("submit");
    const data = new FormData(newGameForm);
    for (const entry of data) {
      switch (entry[0]) {
        case "player1name":
          player1.setName(entry[1] != "" ? entry[1] : "Player 1");
          break;
        case "player2name":
          player2.setName(entry[1] != "" ? entry[1] : "Player 2");
          break;
        case "gameType":
          gameMode = entry[1];
          break;
        case "iaPlay":
          if (entry[1] === "iaplay1" && soloSelector.checked) {
            player1.setIA(true);
            player2.setIA(false);
          }
          if (entry[1] === "iaplay2" && soloSelector.checked) {
            player1.setIA(false);
            player2.setIA(true);
          }
          break;
      }
    }
    ev.preventDefault();
    dialogWindow.close();
    startNewGame();
  },
  false
);
cancelButton.addEventListener("click", (ev => {
  console.log("cancel");
  ev.preventDefault();
  dialogWindow.close();
}));

soloSelector.addEventListener("change", function () {
  if (soloSelector.checked) {
    for (const a of iaRadio) {
      a.classList.remove("displayNone");
    }
  }
});
twoSelector.addEventListener("change", function () {
  if (twoSelector.checked) {
    for (const a of iaRadio) {
      a.classList.add("displayNone");
    }
  }
});
newGameButton.addEventListener("click", function () {
  openNewGameDialog();
});
diceImage.addEventListener("click", function () {
  rollAgain();
});
keepScoreButton.addEventListener("click", function () {
  keepScore();
});

function init() {
  state = MENU;
  player1.setActive(false);
  player2.setActive(false);
}

function openNewGameDialog() {
  if (state === INGAME) {
    warningMessage.classList.remove("displayNone");
    document.documentElement.style.setProperty("--dialog-background", "hsl(39, 66%, 82%)");
    cancelButton.classList.remove("highlightText");
    cancelButton.classList.add("blackBtn");
    startButton.classList.remove("highlightText");
    startButton.classList.add("blackBtn");
  }
  if (typeof HTMLDialogElement === "function") {
    // console.log("navigateur compatible avec dialog");
    dialogWindow.showModal();
  } else {
    // console.log("navigateur incompatible avec dialog");
    dialogWindow.show();
  }
}

function startNewGame() {
  gameButtonPanel.classList.remove("displayNone");
  playerPanel.classList.remove("displayNone");
  player1.resetScore();
  player2.resetScore();
  if (twoSelector.checked) {
    player1.setIA(false);
    player2.setIA(false);
  }
  currentPlayer = player1;
  currentPlayer.setActive(true);
  setDiceImage();
  state = INGAME;
  currentScore = 0;
  currentScoreText.innerText = currentScore.toString();
  count = 0;
  for(const p of playerInfo) {
    p.style.removeProperty("--playerWidth");
  }
  let player1width = playerInfo[0].offsetWidth;
  let player2width = playerInfo[1].offsetWidth;
  let maxWidth = Math.max(player1width, player2width);
  maxWidth = Math.max(maxWidth, 120);
  for(const p of playerInfo) {
    p.style.setProperty("--playerWidth", `${maxWidth}px`);
  }
  // console.log(`game mode is ${gameMode}`);
  // console.log(`Player 1 is ${player1.isIa() ? "IA" : "Player"}`);
  // console.log(`Player 2 is ${player2.isIa() ? "IA" : "Player"}`);
  if (gameMode === "solo" && player1.isIa()) {
    iaPlay();
  }
}

function setDiceImage() {
  diceImage.style.setProperty("--diceImage", `url(${dice.getUrl()})`);
}

function iaPlay() {
  if (count === 0) {
    // console.log("first turn. IA roll");
    rollAgain();
    return;
  }
  let iaRollAgain = 500;
  iaRollAgain -= count * 40;
  let playerScore =
    currentPlayer.getIndex() === 1 ? player2.getScore() : player1.getScore();
  let actualScore = currentPlayer.getScore() + currentScore;
  iaRollAgain -=
    playerScore > actualScore ? 20 * count : 70 * count;
  if (actualScore > 100) {
    iaRollAgain = -1;
  }
  let randomMinDecision = Math.floor(Math.random() * 300);
  if (iaRollAgain > randomMinDecision) {
    // console.log(`roll again score: ${iaRollAgain}`);
    // console.log(`rand decision: ${randomMinDecision}`);
    // console.log("ia roll again");
    setTimeout(() => {
      rollAgain();
    }, 200);
    return;
  }
  // console.log("ia keep score");
  keepScore();
}

function rollAgain() {
  if (state === OVER || state === ROLL) {
    return;
  }
  state = ROLL;
  rollCounter = 0;
  diceImage.classList.add("diceRoll");
  rollDice();
}

function rollDice() {
  let oldResult = dice.getValue();
  let newResult;
  do {
    newResult = Math.floor(Math.random() * 6) + 1;
  } while (oldResult === newResult);
  dice.setValue(newResult);
  setDiceImage();
  rollCounter++;
  if (rollCounter < 20) {
    setTimeout(() => {
      rollDice();
    }, 50);
    return;
  }
  state = INGAME;
  checkResult();
}

function checkResult() {
  diceImage.classList.remove("diceRoll");
  count++;
  if (dice.getValue() !== 1) {
    currentScore += dice.getValue();
    currentScoreText.innerText = currentScore.toString();
    if (currentPlayer.isIa()) {
      iaPlay();
    }
    return;
  }
  if (gameMode === "solo") {
    setTimeout(() => {
      switchPlayer();
    }, 1500);
  } else {
    switchPlayer();
  }
}

function keepScore() {
  if (state === OVER || state === ROLL) {
    return;
  }
  currentPlayer.addScore(currentScore);
  checkWin();
}

function switchPlayer() {
  currentScore = 0;
  count = 0;
  currentScoreText.innerText = currentScore.toString();
  currentPlayer.setActive(false);
  switch (currentPlayer.getIndex()) {
    case 1:
      currentPlayer = player2;
      break;
    case 2:
      currentPlayer = player1;
      break;
  }
  currentPlayer.setActive(true);
  if (currentPlayer.isIa()) {
    iaPlay();
  }
}

function checkWin() {
  if (currentPlayer.getScore() >= 100) {
    console.log(`${currentPlayer.getName()} win the game`);
    state = OVER;
    currentPlayer.setActive(false);
    warningMessage.classList.add("displayNone");
    return;
  }
  switchPlayer();
}

init();

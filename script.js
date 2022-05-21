import Player from "./scripts/player.js";
import Dice from "./scripts/dice.js";
import GameState from "./scripts/gameState.js";

const newGameButton = document.getElementById("ngButton");
const rollAgainButton = document.getElementById("roll");
const keepScoreButton = document.getElementById("keepScore");
const gameButtonPanel = document.getElementById("gameButtonPanel");
const playerPanel = document.getElementById("playerPanel");
const player1Name = document.getElementById("playerName1");
const player2Name = document.getElementById("playerName2");
const player1ind = document.getElementById("indicator-1");
const player2ind = document.getElementById("indicator-2");
const player1score = document.getElementById("score-1");
const player2score = document.getElementById("score-2");
const diceImage = document.getElementById("dice");
const currentScoreText = document.getElementById("currentScore");

let player1 = new Player(player1Name, player1ind, player1score, 1);
let player2 = new Player(player2Name, player2ind, player2score, 2);
let dice = new Dice();
let currentPlayer;
let currentScore;

const MENU = new GameState("menu");
const INGAME = new GameState("ingame");
const OVER = new GameState("over");
let state;

newGameButton.addEventListener("click", function () {
  startNewGame(); // for now just restart game
  //TODO: show new game dialog
});

rollAgainButton.addEventListener("click", function () {
  rollAgain();
});

keepScoreButton.addEventListener("click", function () {
  keepScore();
});

function init() {
  gameButtonPanel.style.display = "none";
  playerPanel.style.display = "none";
  state = MENU;
  player1.setActive(false);
  player2.setActive(false);
}

function startNewGame() {
  gameButtonPanel.style.display = "flex";
  playerPanel.style.display = "flex";
  player1.resetScore();
  player2.resetScore();
  currentPlayer = player1;
  currentPlayer.setActive(true);
  setDiceImage();
  state = INGAME;
  currentScore = 0;
}

function setDiceImage() {
  diceImage.style.setProperty("--diceImage", `url(${dice.getUrl()})`);
}

function rollAgain() {
  if (state === OVER) {
    return;
  }
  dice.roll();
  setDiceImage();
  if (dice.getValue() !== 1) {
    currentScore += dice.getValue();
    currentScoreText.innerText = currentScore.toString();
    rollAgainButton.innerText = "Roll again";
    return;
  }
  switchPlayer();
}

function keepScore() {
  if (state === OVER) {
    return;
  }
  currentPlayer.addScore(currentScore);
  checkWin();
}

function switchPlayer() {
  rollAgainButton.innerText = "Roll";
  currentScore = 0;
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
}

function checkWin() {
  if (currentPlayer.getScore() >= 100) {
    console.log(`${currentPlayer.getName()} win the game`);
    state = OVER;
    currentPlayer.setActive(false);
    return;
  }
  switchPlayer();
}

init();

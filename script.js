import Player from "./scripts/player.js";
import Dice from "./scripts/dice.js";
import GameState from "./scripts/gameState.js";

const newGameButton = document.getElementById("ngButton");
const rollAgainButton = document.getElementById("roll");
const keepScoreButton = document.getElementById("keepScore");
const player1Name = document.getElementById("playerName1");
const player2Name = document.getElementById("playerName2");
const player1ind = document.getElementById("indicator-1");
const player2ind = document.getElementById("indicator-2");
const player1score = document.getElementById("score-1");
const player2score = document.getElementById("score-2");
const diceImage = document.getElementById("dice");

let player1 = new Player(player1Name, player1ind, player1score);
player1.setActive(false);
let player2 = new Player(player2Name, player2ind, player2score);
player2.setActive(false);
let dice = new Dice();
let currentPlayer;

const MENU = new GameState("menu");
const INGAME = new GameState("ingame");
const OVER = new GameState("over");

newGameButton.addEventListener("click", function() {
  startNewGame(); // for now just restart game
  //TODO: show new game dialog
});

rollAgainButton.addEventListener("click", function() {
  rollAgain();
});

keepScoreButton.addEventListener("click", function() {
  keepScore();
});

function startNewGame() {
  currentPlayer = player1;
  currentPlayer.setActive(true);
  setDiceImage(1);
}

function setDiceImage(value) {
  dice.setValue(value);
  diceImage.style.setProperty("--diceImage", `url(${dice.getUrl()})`);
}

function rollAgain() {
  console.log("roll again");
}

function keepScore() {
  console.log("keep score");
}

// startNewGame();
import Player from "./scripts/player.js";
import Dice from "./scripts/dice.js";

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
let player2 = new Player(player2Name, player2ind, player2score);
let dice = new Dice();
let currentPlayer;

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
  player1.setName("Player1");
  player2.setName("Player2");
  player1.setScore(0);
  player2.setScore(0);
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

startNewGame();
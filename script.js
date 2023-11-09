"use strict";

// Selected elements
const player0Elem = document.querySelector(".player--0");
const player1Elem = document.querySelector(".player--1");
const score0Elem = document.querySelector("#score--0");
const score1Elem = document.getElementById("score--1");
const current0Elem = document.getElementById("current--0");
const current1Elem = document.getElementById("current--1");
const diceElem = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Initial condition of the game

let scores, currentScore, activePlayer, stillPlaying;

const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  stillPlaying = true;

  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  current0Elem.textContent = 0;
  current1Elem.textContent = 0;

  diceElem.classList.add("hidden");
  player0Elem.classList.remove("player--winner");
  player1Elem.classList.remove("player--winner");
  player0Elem.classList.add("player--active");
  player1Elem.classList.remove("player--active");
};

initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Elem.classList.toggle("player--active");
  player1Elem.classList.toggle("player--active");
};

// When user clicks to roll the dice
btnRoll.addEventListener("click", function () {
  // 1. Generate a random dice roll
  // 2. Display the dice
  // 3. Check if number 1 was rolled; if true, switch the players
  if (stillPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceElem.classList.remove("hidden");
    diceElem.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // Add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // 1. Add the current score to the active player's score.
  // 2. Check if the active player's score is >= 100; if so, END GAME.
  // 3. Switch to other player if game isn't over.
  if (stillPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      stillPlaying = false;
      diceElem.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", initialization);

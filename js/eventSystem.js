function initializeEndTurnButton() {
  const endTurnButton = document.getElementById("end-turn-button");

  endTurnButton.addEventListener("click", endTurn);
}

function initializeHandCardEvents() {
  const handCards = document.querySelectorAll(
    "#player-hand-container .hand-card",
  );

  for (let i = 0; i < handCards.length; i++) {
    const clickedHandCard = handCards[i];

    clickedHandCard.addEventListener("click", () => {
      const clickedCardId = clickedHandCard.dataset.cardId;

      playCard(clickedCardId);
    });
  }
}

const heroCards = document.querySelectorAll(".hero-selection-card");

for (let i = 0; i < heroCards.length; i++) {
  const clickedCard = heroCards[i];

  clickedCard.addEventListener("click", () => {
    for (let j = 0; j < heroCards.length; j++) {
      heroCards[j].classList.remove("selected-hero");
    }

    clickedCard.classList.add("selected-hero");

    gameState.selectedHero = clickedCard.id;

    const confirmHeroButton = document.getElementById(
      "hero-selection-confirm-button",
    );

    if (gameState.selectedHero) {
      confirmHeroButton.classList.remove("hidden");
    }
  });
}

const confirmHeroButton = document.getElementById(
  "hero-selection-confirm-button",
);

confirmHeroButton.addEventListener("click", () => {
  showScreen("game-board");
  startGame();
});
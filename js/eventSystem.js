function initializeEndTurnButton() {
  const endTurnButton = document.getElementById("end-turn-button");

  endTurnButton.addEventListener("click", () => {
    endTurn("player");
  });
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

function initializePlayerBattlefieldEvents() {
  const playerBattlefieldCards = document.querySelectorAll(
    "#player-minion-container .battlefield-card",
  );

  for (let i = 0; i < playerBattlefieldCards.length; i++) {
    const clickedBattlefieldCard = playerBattlefieldCards[i];

    clickedBattlefieldCard.addEventListener("click", () => {

      if (gameState.currentTurn !== gameState.player) {
        return;
      }

      const clickedCardId = clickedBattlefieldCard.dataset.cardId;

      let clickedCard;

      for (let j = 0; j < gameState.player.battlefield.length; j++) {
        const currentCard = gameState.player.battlefield[j];

        if (currentCard.id === clickedCardId) {
          clickedCard = currentCard;
          break;
        }
      }

      if (!clickedCard) {
        return;
      }

      if (!clickedCard.canAttack) {
        return;
      }

      if (clickedCardId === gameState.selectedAttackerId) {
        gameState.selectedAttackerId = null;
      } else {
        gameState.selectedAttackerId = clickedCardId;
      }

      renderPlayerBattlefield();
    });
  }
}

function initializeEnemyBattlefieldEvents() {
  const enemyBattlefieldCards = document.querySelectorAll(
    "#enemy-minion-container .battlefield-card",
  );

  for (let i = 0; i < enemyBattlefieldCards.length; i++) {
    const clickedBattlefieldCard = enemyBattlefieldCards[i];

    clickedBattlefieldCard.addEventListener("click", () => {

      if (gameState.currentTurn !== gameState.player) {
        return;
      }

      if (!gameState.selectedAttackerId) {
        return;
      }

      const clickedCardId = clickedBattlefieldCard.dataset.cardId;

      if (clickedCardId === gameState.selectedTargetId) {
        gameState.selectedTargetId = null;
      } else {
        gameState.selectedTargetId = clickedCardId;
      }

      attackSelectedTarget();

      renderEnemyBattlefield();
    });
  }
}

function initializeEnemyHeroEvents() {
  const enemyHeroContainer = document.getElementById(
    "enemy-hero-container",
  );

  enemyHeroContainer.addEventListener("click", () => {

    if (gameState.currentTurn !== gameState.player) {
      return;
    }

    if (!gameState.selectedAttackerId) {
      return;
    }

    attackEnemyHero();
  });
}
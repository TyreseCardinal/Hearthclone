function runEnemyAI() {
  console.log(gameState.enemy.availableMana);
  console.log(gameState.enemy.hand);
  let cardWasPlayed = true;

  while (cardWasPlayed) {
    cardWasPlayed = false;

    if (gameState.currentTurn !== gameState.enemy) {
      return;
    }

    if (gameState.enemy.battlefield.length >= 7) {
      endTurn("enemy");
      return;
    }

    for (let i = 0; i < gameState.enemy.hand.length; i++) {
      const currentCard = gameState.enemy.hand[i];

      const canPlayCard =
        currentCard.type === "minion" &&
        gameState.enemy.availableMana >= currentCard.manaCost &&
        gameState.enemy.battlefield.length < 7;

      if (canPlayCard) {
        enemyPlayCard(currentCard.id);
        cardWasPlayed = true;
        break;
      }
    }
  }

  endTurn("enemy");
}

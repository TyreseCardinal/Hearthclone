function runEnemyAI() {
  if (gameState.gameOver) {
  return;
}
  console.log(gameState.enemy.availableMana);
  console.log(gameState.enemy.hand);

  let cardWasPlayed = true;

  while (cardWasPlayed) {
    cardWasPlayed = false;

    if (gameState.currentTurn !== gameState.enemy) {
      return;
    }

    if (gameState.enemy.battlefield.length >= 7) {
      break;
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

  runEnemyAttacks();

  endTurn("enemy");
}

function runEnemyAttacks() {
  for (let i = 0; i < gameState.enemy.battlefield.length; i++) {
    const attacker = gameState.enemy.battlefield[i];

    if (!attacker.canAttack) {
      continue;
    }

    if (gameState.player.battlefield.length === 0) {
      gameState.player.health -= attacker.attack;

      attacker.canAttack = false;

      continue;
    }

    const randomIndex = Math.floor(
      Math.random() * gameState.player.battlefield.length,
    );

    const target = gameState.player.battlefield[randomIndex];

    target.health -= attacker.attack;
    attacker.health -= target.attack;

    attacker.canAttack = false;
  }

  gameState.player.battlefield =
    gameState.player.battlefield.filter((card) => {
      return card.health === undefined || card.health > 0;
    });

  gameState.enemy.battlefield =
    gameState.enemy.battlefield.filter((card) => {
      return card.health === undefined || card.health > 0;
    });

  renderPlayerHealth();
  renderPlayerBattlefield();
  renderEnemyBattlefield();

  checkGameOver();
}
function endTurn(source = "player") {
  if (gameState.gameOver) {
    return;
  }

  if (source === "player" && gameState.currentTurn !== gameState.player) {
    return;
  }

  gameState.selectedAttackerId = null;
  gameState.selectedTargetId = null;

  gameState.currentTurn =
    gameState.currentTurn === gameState.player
      ? gameState.enemy
      : gameState.player;

  gameState.turnNumber++;

  renderPlayerBattlefield();
  renderEnemyBattlefield();

  startTurn();
  renderTurnIndicator();
}

function startTurn() {
  drawCard(gameState.currentTurn);

  if (gameState.currentTurn === gameState.player) {
    for (let i = 0; i < gameState.player.battlefield.length; i++) {
      gameState.player.battlefield[i].canAttack = true;
    }

    if (gameState.player.maxMana < 10) {
      gameState.player.maxMana++;
    }

    gameState.player.availableMana = gameState.player.maxMana;

    renderPlayerMana();
    renderPlayerHand();
  } else {
    for (let i = 0; i < gameState.enemy.battlefield.length; i++) {
      gameState.enemy.battlefield[i].canAttack = true;
    }

    if (gameState.enemy.maxMana < 10) {
      gameState.enemy.maxMana++;
    }

    gameState.enemy.availableMana = gameState.enemy.maxMana;

    renderEnemyMana();
    renderEnemyHand();

    const aiDelay = 800 + Math.random() * 1200;

    setTimeout(() => {
      runEnemyAI();
    }, aiDelay);
  }
}

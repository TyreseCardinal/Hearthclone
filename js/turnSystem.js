function endTurn() {
  gameState.currentTurn =
    gameState.currentTurn === gameState.player
      ? gameState.enemy
      : gameState.player;

  gameState.turnNumber++;

  startTurn();
  renderTurnIndicator();
}

function startTurn() {
  drawCard(gameState.currentTurn);

  if (gameState.currentTurn === gameState.player) {
    if (gameState.player.maxMana < 10) {
      gameState.player.maxMana++;
    }
      gameState.player.availableMana = gameState.player.maxMana;

    renderPlayerMana();
    renderPlayerHand();
  } else {
    if (gameState.enemy.maxMana < 10) {
      gameState.enemy.maxMana++;
    }
    gameState.enemy.availableMana = gameState.enemy.maxMana;
    renderEnemyMana();
    renderEnemyHand();
  }
}

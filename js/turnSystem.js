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
    gameState.player.mana++;
    renderPlayerMana();
    renderPlayerHand();
  } else {
    gameState.enemy.mana++;
    renderEnemyMana();
    renderEnemyHand();
  }
}

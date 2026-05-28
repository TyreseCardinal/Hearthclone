function startGame() {
  initializePlayerDeck();
  initializeEnemyDeck();
  initializeEndTurnButton();

  if (Math.random() < 0.5) {
    gameState.startingPlayer = gameState.player;
    gameState.secondPlayer = gameState.enemy;
    gameState.currentTurn = gameState.player;
  } else {
    gameState.startingPlayer = gameState.enemy;
    gameState.secondPlayer = gameState.player;
    gameState.currentTurn = gameState.enemy;
  }

  drawOpeningHand(gameState.startingPlayer, 3);
  drawOpeningHand(gameState.secondPlayer, 4);

  renderPlayerHand();
  renderEnemyHand();
  renderTurnIndicator();

  startTurn();
}

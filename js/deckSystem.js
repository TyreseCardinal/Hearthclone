function initializePlayerDeck() {
  const selectedPlayerHero = gameState.selectedHero;
  const playerDeck = heroBaseKit[selectedPlayerHero].deck.map((card) => {
    return { ...card };
  });

  for (let i = 0; i < playerDeck.length; i++) {
    playerDeck[i].id = `player-card-${i}`;
  }

  gameState.player.deck = playerDeck;
}

function initializeEnemyDeck() {
  const selectedEnemyHero = "mage";
  const enemyDeck = heroBaseKit[selectedEnemyHero].deck.map((card) => {
    return { ...card };
  });

  for (let i = 0; i < enemyDeck.length; i++) {
    enemyDeck[i].id = `enemy-card-${i}`;
  }

  gameState.enemy.deck = enemyDeck;
}

function drawCard(player) {
  const cardDrawn = player.deck.pop();

  if (!cardDrawn) {
    return;
  }

  player.hand.push(cardDrawn);
}

function drawOpeningHand(player, amount) {
  for (let i = 0; i < amount; i++) {
    drawCard(player);
  }
}

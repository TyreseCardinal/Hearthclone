function playCard(cardId) {
  if (gameState.gameOver) {
  return;
}

  let cardToPlay;

  for (let i = 0; i < gameState.player.hand.length; i++) {
    const currentCard = gameState.player.hand[i];

    if (currentCard.id === cardId) {
      cardToPlay = currentCard;
      let cardManaCost = cardToPlay.manaCost;

      // Turn Validation
      if (gameState.currentTurn !== gameState.player) {
        return;
      }

      // Mana Validation
      if (gameState.player.availableMana < cardManaCost) {
        return;
      }

      // Battlefield Space Validation
      if (gameState.player.battlefield.length >= 7) {
        return;
      }

      // Minion type check
      if (cardToPlay.type !== "minion") {
        return;
      }

      // Played Card 1-turn exhaustion
      cardToPlay.canAttack = false;

      // Spend mana
      gameState.player.availableMana -= cardManaCost;

      // Move card from hand to battlefield
      gameState.player.hand.splice(i, 1);
      gameState.player.battlefield.push(cardToPlay);

      break;
    }
  }

  renderPlayerMana();
  renderPlayerBattlefield();
  renderPlayerHand();

  if (cardToPlay) {
    console.log("played card:", cardToPlay.id);
  }
}

function enemyPlayCard(cardId) {
  let cardToPlay;

  for (let i = 0; i < gameState.enemy.hand.length; i++) {
    const currentCard = gameState.enemy.hand[i];

    if (currentCard.id === cardId) {
      cardToPlay = currentCard;
      let cardManaCost = cardToPlay.manaCost;

      // Turn Validation
      if (gameState.currentTurn !== gameState.enemy) {
        return;
      }

      // Mana Validation
      if (gameState.enemy.availableMana < cardManaCost) {
        return;
      }

      // Battlefield Space Validation
      if (gameState.enemy.battlefield.length >= 7) {
        return;
      }

      // Minion type check
      if (cardToPlay.type !== "minion") {
        return;
      }

      // Played Card 1-turn exhaustion
      cardToPlay.canAttack = false;

      // Spend mana
      gameState.enemy.availableMana -= cardManaCost;

      // Move card from hand to battlefield
      gameState.enemy.hand.splice(i, 1);
      gameState.enemy.battlefield.push(cardToPlay);

      break;
    }
  }

  renderEnemyMana();
  renderEnemyBattlefield();
  renderEnemyHand();

  if (cardToPlay) {
    console.log("played card:", cardToPlay.id);
  }
}

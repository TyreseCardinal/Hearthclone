function playCard(cardId) {
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

console.log("played card:", cardToPlay.id);}

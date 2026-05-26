function playCard(cardId) {
  let cardToPlay;

  for (let i = 0; i < gameState.player.hand.length; i++) {
    const currentCard = gameState.player.hand[i];

    if (currentCard.id === cardId) {
      cardToPlay = currentCard;
      let cardManaCost = cardToPlay.manaCost;

      // Validation
      if (gameState.player.mana < cardManaCost) {
        return;
      }

      // Spend mana
      gameState.player.mana -= cardManaCost;

      // Move card from hand to battlefield
      gameState.player.hand.splice(i, 1);
      gameState.player.battlefield.push(cardToPlay);

      break;
    }
  }

  renderPlayerMana();
  renderPlayerBattlefield();
  renderPlayerHand();

  console.log(cardToPlay);
}
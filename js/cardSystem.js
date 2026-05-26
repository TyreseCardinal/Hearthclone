function playCard(cardId) {
  let cardToPlay;

  for (let i = 0; i < gameState.player.hand.length; i++) {
    const currentCard = gameState.player.hand[i];

    if (currentCard.id === cardId) {
      cardToPlay = currentCard;

      gameState.player.hand.splice(i, 1);
      gameState.player.battlefield.push(cardToPlay);

      break;
    }
  }

  renderPlayerBattlefield();
  renderPlayerHand();

  console.log(cardToPlay);
}
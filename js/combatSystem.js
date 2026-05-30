function attackSelectedTarget() {
  if (gameState.gameOver) {
  return;
}

  if (!gameState.selectedAttackerId) {
    return;
  }

  if (!gameState.selectedTargetId) {
    return;
  }

  let attacker;
  let target;

  for (let i = 0; i < gameState.player.battlefield.length; i++) {
    const currentCard = gameState.player.battlefield[i];

    if (currentCard.id === gameState.selectedAttackerId) {
      attacker = currentCard;
    }
  }

  for (let i = 0; i < gameState.enemy.battlefield.length; i++) {
    const currentCard = gameState.enemy.battlefield[i];

    if (currentCard.id === gameState.selectedTargetId) {
      target = currentCard;
    }
  }

  if (!attacker || !target) {
    return;
  }

  if (!attacker.canAttack) {
  return;
}

target.health -= attacker.attack;
attacker.health -= target.attack;

attacker.canAttack = false;

gameState.player.battlefield = gameState.player.battlefield.filter((card) => {
  return card.health === undefined || card.health > 0;
});

gameState.enemy.battlefield = gameState.enemy.battlefield.filter((card) => {
  return card.health === undefined || card.health > 0;
});

  gameState.selectedAttackerId = null;
  gameState.selectedTargetId = null;

  renderPlayerBattlefield();
renderEnemyBattlefield();
checkGameOver();
}

function attackEnemyHero() {
  if (gameState.gameOver) {
  return;
}
  
  if (!gameState.selectedAttackerId) {
    return;
  }

  let attacker;

  for (let i = 0; i < gameState.player.battlefield.length; i++) {
    const currentCard = gameState.player.battlefield[i];

    if (currentCard.id === gameState.selectedAttackerId) {
      attacker = currentCard;
      break;
    }
  }

  if (!attacker) {
    return;
  }

  if (!attacker.canAttack) {
    return;
  }

  gameState.enemy.health -= attacker.attack;

  attacker.canAttack = false;

  gameState.selectedAttackerId = null;
  gameState.selectedTargetId = null;

  renderEnemyHealth();
  renderPlayerBattlefield();

  checkGameOver();
}

function checkGameOver() {
  if (gameState.player.health <= 0) {
    gameState.gameOver = true;

    alert("Defeat");
  }

  if (gameState.enemy.health <= 0) {
    gameState.gameOver = true;

    alert("Victory");
  }
}
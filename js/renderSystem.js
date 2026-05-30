function renderTurnIndicator() {
  const turnIndicator = document.getElementById("turn-indicator-overlay");

  if (gameState.currentTurn === gameState.player) {
    turnIndicator.innerHTML = "Player Turn";
  } else {
    turnIndicator.innerHTML = "Enemy Turn";
  }
}

function createCardHTML(card, cardClass) {
  let finalCardClass = cardClass;

  if (card.id === gameState.selectedAttackerId) {
    finalCardClass += " selected-attacker";
  }

  if (card.id === gameState.selectedTargetId) {
    finalCardClass += " selected-target";
  }

  return `
    <div class="${finalCardClass}" data-card-id="${card.id}">
      <img src="./assets/cards/base-card-body.svg" class="card-base">

      <img src="./assets/cards/mana-gem.svg" class="card-mana-gem">
      <img src="./assets/cards/attack-gem.svg" class="card-attack-gem">
      <img src="./assets/cards/health-gem.svg" class="card-health-gem">

      <div class="card-mana">${card.manaCost}</div>
      <div class="card-attack">${card.attack || 0}</div>
      <div class="card-health">${card.health || 0}</div>

      <div class="card-name">${card.name}</div>
      <div class="card-description">${card.description}</div>
    </div>
  `;
}

function renderPlayerBattlefield() {
  const playerBattlefield = document.getElementById("player-minion-container");

  playerBattlefield.innerHTML = "";

  for (let i = 0; i < gameState.player.battlefield.length; i++) {
    const playerBattlefieldMinion = gameState.player.battlefield[i];

    playerBattlefield.insertAdjacentHTML(
      "beforeend",
      createCardHTML(playerBattlefieldMinion, "battlefield-card"),
    );
  }

  initializePlayerBattlefieldEvents();
}

function renderEnemyBattlefield() {
  const enemyBattlefield = document.getElementById("enemy-minion-container");

  enemyBattlefield.innerHTML = "";

  for (let i = 0; i < gameState.enemy.battlefield.length; i++) {
    const enemyBattlefieldMinion = gameState.enemy.battlefield[i];

    enemyBattlefield.insertAdjacentHTML(
      "beforeend",
      createCardHTML(enemyBattlefieldMinion, "battlefield-card"),
    );
  }

  initializeEnemyBattlefieldEvents();
}

function renderPlayerHand() {
  const playerHand = document.getElementById("player-hand-container");

  playerHand.innerHTML = "";

  for (let i = 0; i < gameState.player.hand.length; i++) {
    const playerHandCard = gameState.player.hand[i];

    playerHand.insertAdjacentHTML(
      "beforeend",
      createCardHTML(playerHandCard, "hand-card"),
    );
  }

  initializeHandCardEvents();
}

function renderPlayerHealth() {
  const playerHealth = document.getElementById("player-health-container");

  playerHealth.innerHTML = gameState.player.health;
}

function renderPlayerMana() {
  const playerMana = document.getElementById("player-mana-container");

  playerMana.innerHTML = `${gameState.player.availableMana} / ${gameState.player.maxMana}`;
}

function renderEnemyHand() {
  const enemyHand = document.getElementById("enemy-hand-container");

  enemyHand.innerHTML = "";

  for (let i = 0; i < gameState.enemy.hand.length; i++) {
    const enemyHandCard = gameState.enemy.hand[i];

    enemyHand.insertAdjacentHTML(
      "beforeend",
      createCardHTML(enemyHandCard, "enemy-hand-card"),
    );
  }
}

function renderEnemyHealth() {
  const enemyHealth = document.getElementById("enemy-health-container");

  enemyHealth.innerHTML = gameState.enemy.health;
}

function renderEnemyMana() {
  const enemyMana = document.getElementById("enemy-mana-container");

  enemyMana.innerHTML = `${gameState.enemy.availableMana} / ${gameState.enemy.maxMana}`;
}
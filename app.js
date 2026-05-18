const mainMenu = document.getElementById("main-menu-screen");
const heroSelect = document.getElementById("hero-select-screen");
const gameBoard = document.getElementById("game-board");

function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach((screen) => {
    screen.classList.add("hidden");
  });

  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.remove("hidden");
  }
}

// Hero Selection logic
const heroCards = document.querySelectorAll(".hero-selection-card");

for (let i = 0; i < heroCards.length; i++) {
  const clickedCard = heroCards[i];

  clickedCard.addEventListener("click", () => {
    // Remove selected state from all hero cards
    for (let j = 0; j < heroCards.length; j++) {
      // Remove selected class here
      heroCards[j].classList.remove("selected-hero");
    }

    // Add selected state to clicked hero card
    clickedCard.classList.add("selected-hero");

    // Update selected hero in gameState
    gameState.selectedHero = clickedCard.id;

    // Show confirm button
    let confirmHeroButton = document.getElementById(
      "hero-selection-confirm-button",
    );

    if (gameState.selectedHero) {
      confirmHeroButton.classList.remove("hidden");
    }

    // Debugging
    console.log(clickedCard);
  });
}

// Transition from hero select -> gameboard
let confirmHeroButton = document.getElementById(
  "hero-selection-confirm-button",
);

confirmHeroButton.addEventListener("click", () => {
  showScreen("game-board");
  startGame();
});

// Game State
const gameState = {
  selectedHero: null,
  startingPlayer: null,
  secondPlayer: null,
  currentTurn: null,
  turnNumber: 0,
  player: {
    health: 30,
    mana: 0,
    deck: [],
    hand: [],
  },
  enemy: {
    health: 30,
    mana: 0,
    deck: [],
    hand: [],
  },
};

const heroBaseKit = {
  mage: {
    power: {
      name: "Fireball",
      manaCost: 2,
      description: "Deal 2 damage",
      damageValue: 2,
    },
    deck: [
      {
        name: "Arcane Missile",
        manaCost: 1,
        description: "Deal 1 damage.",
        damageValue: 1,
      },

      {
        name: "Mana Sprite",
        manaCost: 1,
        description: "A weak magical creature.",
        attack: 1,
        health: 2,
      },

      {
        name: "Frost Bolt",
        manaCost: 2,
        description: "Deal 3 damage.",
        damageValue: 3,
      },

      {
        name: "Apprentice Mage",
        manaCost: 2,
        description: "A student of the arcane arts.",
        attack: 2,
        health: 3,
      },

      {
        name: "Flame Burst",
        manaCost: 3,
        description: "Deal 4 damage.",
        damageValue: 4,
      },

      {
        name: "Arcane Scholar",
        manaCost: 3,
        description: "A knowledgeable spellcaster.",
        attack: 3,
        health: 4,
      },

      {
        name: "Ice Barrier",
        manaCost: 3,
        description: "Restore 4 health.",
        healValue: 4,
      },

      {
        name: "Fire Elemental",
        manaCost: 4,
        description: "A blazing elemental warrior.",
        attack: 4,
        health: 5,
      },

      {
        name: "Blizzard",
        manaCost: 4,
        description: "Deal 2 damage to all enemies.",
        damageValue: 2,
      },

      {
        name: "Arcane Golem",
        manaCost: 5,
        description: "A heavy magical construct.",
        attack: 5,
        health: 6,
      },

      {
        name: "Meteor Strike",
        manaCost: 5,
        description: "Deal 6 damage.",
        damageValue: 6,
      },

      {
        name: "Crystal Dragon",
        manaCost: 6,
        description: "A powerful magical dragon.",
        attack: 6,
        health: 7,
      },

      {
        name: "Phoenix Flame",
        manaCost: 7,
        description: "Deal 8 damage.",
        damageValue: 8,
      },

      {
        name: "Archmage Valen",
        manaCost: 8,
        description: "Master of forbidden magic.",
        attack: 8,
        health: 8,
      },

      {
        name: "Celestial Inferno",
        manaCost: 10,
        description: "Deal 12 damage.",
        damageValue: 12,
      },
    ],
  },
};

// Gameplay State Systems
function startGame() {
  // Initialize Player/Enemy Decks
  initializePlayerDeck();

  initializeEnemyDeck();

  initializeEndTurnButton();

  // Randomize first turn
  if (Math.random() < 0.5) {
    gameState.startingPlayer = gameState.player;
    gameState.secondPlayer = gameState.enemy;
    gameState.currentTurn = gameState.player;
  } else {
    gameState.startingPlayer = gameState.enemy;
    gameState.secondPlayer = gameState.player;
    gameState.currentTurn = gameState.enemy;
  }

  // Draw Opening Hand
  drawOpeningHand(gameState.startingPlayer, 3);
  drawOpeningHand(gameState.secondPlayer, 4);

  renderPlayerHand();
  renderEnemyHand();
  renderTurnIndicator();
}

function drawCard(player) {
  const cardDrawn = player.deck.pop();

  player.hand.push(cardDrawn);
}

function drawOpeningHand(player, amount) {
  for (let i = 0; i < amount; i++) {
    drawCard(player);
  }
}

function endTurn() {
  gameState.currentTurn = (
  gameState.currentTurn === gameState.player
    ? gameState.enemy
    : gameState.player
);

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

function initializePlayerDeck() {
  let selectedPlayerHero = gameState.selectedHero;

  let playerDeck = [...heroBaseKit[selectedPlayerHero].deck];

  for (let i = 0; i < playerDeck.length; i++) {
    playerDeck[i].id = i;
  }

  gameState.player.deck = playerDeck;

}

function initializeEnemyDeck() {
  let selectedEnemyHero = "mage";

  let enemyDeck = [...heroBaseKit[selectedEnemyHero].deck];

  for (let i = 0; i < enemyDeck.length; i++) {
    enemyDeck[i].id = i;
  }

  gameState.enemy.deck = enemyDeck;
}

function initializeEndTurnButton() {
  const endTurnButton = document.getElementById("end-turn-button");

  endTurnButton.addEventListener("click", endTurn);

  console.log("Button initialized");
}
// Render Systems

// Turn indicator UI

function renderTurnIndicator() {
  const turnIndicator = document.getElementById("turn-indicator-text");

  // Display current turn
  if (gameState.currentTurn === gameState.player) {
    turnIndicator.innerHTML = "Player Turn";
  } else {
    turnIndicator.innerHTML = "Enemy Turn";
  }
}
// Player UI render pipeline
function renderPlayerHand() {
  const playerHand = document.getElementById("player-hand-container");

  playerHand.innerHTML = "";

  for (let i = 0; i < gameState.player.hand.length; i++) {
    const playerHandCard = gameState.player.hand[i];

    playerHand.insertAdjacentHTML(
      "beforeend",
      `<div class="hand-card" data-card-id="${playerHandCard.id}">
        ${playerHandCard.name}<br>
        ${playerHandCard.manaCost}<br>
        ID: ${playerHandCard.id}
      </div>`,
    );
  }

  initializeHandCardEvents();
}

function renderPlayerHealth() {
  const playerHealth = document.getElementById(`player-health-container`);
  playerHealth.innerHTML = gameState.player.health;
}

function renderPlayerMana() {
  const playerMana = document.getElementById(`player-mana-container`);
  playerMana.innerHTML = gameState.player.mana;
}

// Enemy UI render pipeline
function renderEnemyHand() {
  const enemyHand = document.getElementById(`enemy-hand-container`);

  enemyHand.innerHTML = "";

  for (let i = 0; i < gameState.enemy.hand.length; i++) {
    const enemyHandCard = gameState.enemy.hand[i];

    enemyHand.insertAdjacentHTML(
      "beforeend",
      `<div class="hand-card">
      ${enemyHandCard.name}<br>
      ${enemyHandCard.manaCost}
    </div>`,
    );
  }
}

function renderEnemyHealth() {
  const enemyHealth = document.getElementById(`enemy-health-container`);
  enemyHealth.innerHTML = gameState.enemy.health;
}

function renderEnemyMana() {
  const enemyMana = document.getElementById(`enemy-mana-container`);
  enemyMana.innerHTML = gameState.enemy.mana;
}

// UI Event Systems

function initializeHandCardEvents() {
  const handCards = document.querySelectorAll(".hand-card");

  for (let i = 0; i < handCards.length; i++) {
    const clickedHandCard = handCards[i];

    clickedHandCard.addEventListener("click", () => {
      const clickedCardId = clickedHandCard.dataset.cardId;

      console.log(clickedCardId);
    });
  }
}
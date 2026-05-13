const gameState = {
  currentTurn: "player",
  turnNumber: 0,
  player: {
    health: 30,
    mana: 0,
    hand: [
      {
        name: "Fireball",
        manaCost: 2,
      },
      {
        name: "Heal",
        manaCost: 2,
      },
      {
        name: "Footman",
        manaCost: 1,
      },
    ],
  },
  enemy: {
    health: 30,
    mana: 0,
    hand: [
      {
        name: "Fireball",
        manaCost: 2,
      },
      {
        name: "Heal",
        manaCost: 2,
      },
      {
        name: "Footman",
        manaCost: 1,
      },
    ],
  },
};

// Player UI render pipeline
const playerHealth = document.getElementById(`player-health-container`);
playerHealth.innerHTML = gameState.player.health;

const playerMana = document.getElementById(`player-mana-container`);
playerMana.innerHTML = gameState.player.mana;

const playerHand = document.getElementById(`player-hand-container`);
for (let i = 0; i < gameState.player.hand.length; i++) {
  const playerHandCard = gameState.player.hand[i];

  playerHand.insertAdjacentHTML(
    "beforeend",
    `<div class="hand-card">
      ${playerHandCard.name}<br>
      ${playerHandCard.manaCost}
    </div>`
  );
}

// Enemy UI render pipeline
const enemyHealth = document.getElementById(`enemy-health-container`);
enemyHealth.innerHTML = gameState.enemy.health;

const enemyMana = document.getElementById(`enemy-mana-container`);
enemyMana.innerHTML = gameState.enemy.mana;

const enemyHand = document.getElementById(`enemy-hand-container`);
for (let i = 0; i < gameState.enemy.hand.length; i++) {
  const enemyHandCard = gameState.enemy.hand[i];

  enemyHand.insertAdjacentHTML(
    "beforeend",
    `<div class="hand-card">
      ${enemyHandCard.name}<br>
      ${enemyHandCard.manaCost}
    </div>`
  );
}


const mainMenu = document.getElementById("main-menu-screen");
const heroSelect = document.getElementById("hero-select-screen");
const gameBoard = document.getElementById("game-board");

function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');

  screens.forEach(screen => {
    screen.classList.add('hidden');
  });

  const activeScreen = document.getElementById(screenId);
  if(activeScreen) {
    activeScreen.classList.remove('hidden');
  }
}
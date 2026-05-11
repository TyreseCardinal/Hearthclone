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

// Enemy UI render pipeline
const enemyHealth = document.getElementById(`enemy-health-container`);
enemyHealth.innerHTML = gameState.enemy.health;

const enemyMana = document.getElementById(`enemy-mana-container`);
enemyMana.innerHTML = gameState.enemy.mana;
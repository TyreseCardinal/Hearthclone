const gameState = {
  currentTurn: "player",
  selectedHero: null,
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

// Hero Selection logic
const heroCards = document.querySelectorAll(".hero-selection-card");

for (let i = 0; i < heroCards.length; i++) {

  const clickedCard = heroCards[i];

  clickedCard.addEventListener("click", () => {

      // Remove selected state from all hero cards
    for (let j = 0; j < heroCards.length; j++) {
      
      // Remove selected class here
      heroCards[j].classList.remove("selected-hero")
    }
    
    // Add selected state to clicked hero card
        clickedCard.classList.add("selected-hero");

    
    // Update selected hero in gameState
    let heroSelected = clickedCard.id

    gameState.selectedHero = heroSelected;
    // Show confirm button
    let confirmHeroButton = document.getElementById("hero-selection-confirm-button");

    if (heroSelected) {
      confirmHeroButton.classList.remove('hidden')
    }
    
    // Debugging
    console.log(clickedCard);
  });

}

// Transition from hero select -> gameboard
let confirmHeroButton = document.getElementById("hero-selection-confirm-button");

confirmHeroButton.addEventListener("click", () => {
  showScreen("game-board");
})
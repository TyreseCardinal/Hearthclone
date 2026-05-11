const gameState = {
  currentTurn: player,
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

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
    battlefield: [],
  },

  enemy: {
    health: 30,
    mana: 0,
    deck: [],
    hand: [],
    battlefield: [],
  },
};
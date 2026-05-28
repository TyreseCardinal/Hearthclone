const gameState = {
  selectedHero: null,
  startingPlayer: null,
  secondPlayer: null,
  currentTurn: null,
  turnNumber: 0,
  selectedAttackerId: null,
  selectedTargetId: null,

  player: {
    health: 30,
    availableMana: 0,
    maxMana: 0,
    deck: [],
    hand: [],
    battlefield: [],
  },

  enemy: {
    health: 30,
    availableMana: 0,
    maxMana: 0,
    deck: [],
    hand: [],
    battlefield: [],
  },
};
import { INITIAL_MONEY } from '../constants/gameConstants.js';

class GameModel {
  constructor() {
    this.money = INITIAL_MONEY;
    this.round = 0;
  }

  getMoney() {
    return this.money;
  }

  getRound() {
    return this.round;
  }

  deductMoney(amount) {
    this.money -= amount;
  }
}

export { GameModel };

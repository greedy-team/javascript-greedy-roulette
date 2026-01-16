import { INITIAL_MONEY, COLORS, VALID_COLORS } from '../constants/gameConstants.js';

class GameModel {
  constructor() {
    this.money = INITIAL_MONEY;
    this.round = 0;
    this.slots = this.createSlots();
  }

  createSlots() {
    const slots = [];
    VALID_COLORS.forEach((color) => {
      for (let i = 0; i < COLORS[color].slots; i += 1) {
        slots.push(color);
      }
    });
    return slots;
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

  spin() {
    const randomIndex = Math.floor(Math.random() * this.slots.length);
    return this.slots[randomIndex];
  }

  getMultiplier(color) {
    return COLORS[color].multiplier;
  }

  addMoney(amount) {
    this.money += amount;
  }

  incrementRound() {
    this.round += 1;
  }
}

export { GameModel };

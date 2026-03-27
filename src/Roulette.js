import {
  INITIAL_BALANCE,
  NUMBER_OF_SLOTS,
  COLOR_REWARD_RATE,
  COLOR_SLOT_RANGES,
} from "./constants.js";

export default class Roulette {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.round = 0;
  }

  calculatePayout(color, betAmount, result) {}

  rouletteSpin() {}

  addRound() {}
  addPayout(payout) {}
  subtractBet(betAmount) {}

  randomResult() {
    return Math.floor(Math.random() * NUMBER_OF_SLOTS);
  }

  validateBet(color, betAmountValue) {
    if (!color) {
      throw new Error("색상을 선택해주세요.");
    }
    if (!/^[1-9]\d*$/.test(betAmountValue)) {
      throw new Error("베팅 금액은 양의 정수여야 합니다.");
    }
    if (Number(betAmountValue) > this.balance) {
      throw new Error("보유 금액을 초과할 수 없습니다.");
    }
  }

  isWinner(color, result) {
    return color === result;
  }

  isBacnkrupt() {}

  reset() {}
}

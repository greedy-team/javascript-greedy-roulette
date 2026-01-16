import { SPIN_DELAY } from '../constants/gameConstants.js';

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.bindEvents();
    this.initializeView();
  }

  bindEvents() {
    this.view.bindBetButton(() => this.handleBet());
    this.view.bindStopButton(() => this.handleStop());
  }

  initializeView() {
    this.view.updateMoney(this.model.getMoney());
    this.view.updateRound(this.model.getRound());
    this.view.hideRestartButton();
    this.view.hideResultBox();
  }

  validateBet(color, amount) {
    if (!this.model.isValidColor(color)) {
      return { valid: false, message: '유효한 색상을 선택해주세요.' };
    }
    if (!amount || amount <= 0) {
      return { valid: false, message: '베팅 금액은 1원 이상이어야 합니다.' };
    }
    if (amount > this.model.getMoney()) {
      return { valid: false, message: '보유 금액을 초과하여 베팅할 수 없습니다.' };
    }
    return { valid: true, message: '' };
  }

  handleBet() {
    const color = this.view.getSelectedColor();
    const amount = this.view.getBetAmount();

    const validation = this.validateBet(color, amount);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    this.model.deductMoney(amount);
    this.view.updateMoney(this.model.getMoney());
    this.view.setButtonsDisabled(true);
    this.view.showSpinning();

    setTimeout(() => {
      this.resolveRound(color, amount);
    }, SPIN_DELAY);
  }

  resolveRound(betColor, betAmount) {
    const resultColor = this.model.spin();
    const isWin = betColor === resultColor;
    this.model.incrementRound();

    if (isWin) {
      const multiplier = this.model.getMultiplier(betColor);
      const winnings = betAmount + betAmount * multiplier;
      this.model.addMoney(winnings);
      this.view.showResult(resultColor, true, winnings);
    } else {
      this.view.showResult(resultColor, false, betAmount);
    }

    this.view.updateMoney(this.model.getMoney());
    this.view.updateRound(this.model.getRound());
    this.view.setButtonsDisabled(false);
  }

  handleStop() {
  }
}

export { GameController };

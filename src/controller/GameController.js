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

  handleBet() {
    const color = this.view.getSelectedColor();
    const amount = this.view.getBetAmount();

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

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
    const amount = this.view.getBetAmount();

    this.model.deductMoney(amount);
    this.view.updateMoney(this.model.getMoney());
    this.view.setButtonsDisabled(true);
  }

  handleStop() {
  }
}

export { GameController };

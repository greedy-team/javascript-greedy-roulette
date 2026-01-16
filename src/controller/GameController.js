class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.initializeView();
  }

  initializeView() {
    this.view.updateMoney(this.model.getMoney());
    this.view.updateRound(this.model.getRound());
    this.view.hideRestartButton();
    this.view.hideResultBox();
  }
}

export { GameController };

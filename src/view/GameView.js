class GameView {
  constructor() {
    this.elements = {
      currentMoney: document.getElementById('current-money'),
      currentRound: document.getElementById('current-round'),
      colorSelect: document.getElementById('color-select'),
      betAmount: document.getElementById('bet-amount'),
      betButton: document.getElementById('bet-button'),
      stopButton: document.getElementById('stop-button'),
      restartButton: document.getElementById('restart-button'),
      resultBox: document.getElementById('result-box'),
    };
  }

  formatMoney(amount) {
    return amount.toLocaleString('ko-KR');
  }

  updateMoney(amount) {
    this.elements.currentMoney.textContent = this.formatMoney(amount);
  }

  updateRound(round) {
    this.elements.currentRound.textContent = round;
  }

  hideRestartButton() {
    this.elements.restartButton.style.display = 'none';
  }

  hideResultBox() {
    this.elements.resultBox.style.display = 'none';
  }

  getSelectedColor() {
    return this.elements.colorSelect.value;
  }

  getBetAmount() {
    const value = this.elements.betAmount.value;
    if (!/^\d+$/.test(value)) {
      return 0;
    }
    return parseInt(value, 10);
  }

  setButtonsDisabled(disabled) {
    this.elements.betButton.disabled = disabled;
    this.elements.stopButton.disabled = disabled;
  }

  bindBetButton(handler) {
    this.elements.betButton.addEventListener('click', handler);
  }

  bindStopButton(handler) {
    this.elements.stopButton.addEventListener('click', handler);
  }
}

export { GameView };

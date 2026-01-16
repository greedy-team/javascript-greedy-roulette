class GameView {
  constructor() {
    this.elements = {
      currentMoney: document.getElementById('current-money'),
      currentRound: document.getElementById('current-round'),
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
}

export { GameView };

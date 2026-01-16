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
      gameControls: document.getElementById('game-controls'),
      resultBox: document.getElementById('result-box'),
      resultContent: document.getElementById('result-content'),
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

  showSpinning() {
    this.elements.resultBox.style.display = 'block';
    this.elements.resultContent.innerHTML = '<p class="spinning">룰렛을 돌리는 중...</p>';
  }

  showResult(color, isWin, amount) {
    const colorClass = color.toLowerCase();
    const resultMessage = isWin
      ? `<p class="win">베팅 성공! +${this.formatMoney(amount)}원</p>`
      : `<p class="lose">베팅 실패! -${this.formatMoney(amount)}원</p>`;

    this.elements.resultContent.innerHTML = `
      <p>룰렛 결과: <span class="result-color ${colorClass}">${color}</span></p>
      ${resultMessage}
    `;
  }

  showFinalResult(money, round) {
    this.elements.resultBox.style.display = 'block';
    this.elements.resultContent.innerHTML = `
      <div class="final-result">
        <h2>게임 종료</h2>
        <p>최종 자금: ${this.formatMoney(money)}원</p>
        <p>플레이한 라운드: ${round}</p>
      </div>
    `;
  }

  hideControls() {
    this.elements.gameControls.style.display = 'none';
  }

  showControls() {
    this.elements.gameControls.style.display = 'block';
  }

  showRestartButton() {
    this.elements.restartButton.style.display = 'block';
  }

  resetInputs() {
    this.elements.colorSelect.value = '';
    this.elements.betAmount.value = '';
  }

  reset() {
    this.showControls();
    this.hideRestartButton();
    this.hideResultBox();
    this.resetInputs();
    this.setButtonsDisabled(false);
  }

  bindRestartButton(handler) {
    this.elements.restartButton.addEventListener('click', handler);
  }
}

export { GameView };

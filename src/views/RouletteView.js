export const view = {

    el: {
        $currentMoney: document.getElementById('current-money'),
        $currentRound: document.getElementById('current-round'),
        $gameControls: document.getElementById('game-controls'),
        $betAmountInput: document.getElementById('bet-amount'),
        $colorSelect: document.getElementById('color-select'),
        $betButton: document.getElementById('bet-button'),
        $stopButton: document.getElementById('stop-button'),
        $resultBox: document.getElementById('result-box'),
        $resultContent: document.getElementById('result-content'),
        $restartButton: document.getElementById('restart-button')
    },

    init() {
        this.el.$gameControls.style.display = 'block';
        this.el.$restartButton.style.display = 'none';
        this.el.$resultBox.style.display = 'none';
        this.el.$colorSelect.style.display = 'block';
        this.el.$betButton.style.display = 'block';
        this.el.$stopButton.style.display = 'block';
        this.showActiveState();

        this.el.$colorSelect.value = "";
        this.el.$betAmountInput.value = "";
        this.el.$resultContent.textContent = "";
    },

    updateMoney(currentMoney) { this.el.$currentMoney.textContent = currentMoney.toLocaleString(); },
    updateRound(currentRound) { this.el.$currentRound.textContent = currentRound; },
    updateResult(text) { this.el.$resultContent.innerHTML = text; },

    showWaitingState() {
        this.el.$betButton.disabled = true;
        this.el.$stopButton.disabled = true;
        this.el.$resultBox.style.display = 'block';
        this.updateResult('룰렛을 돌리는 중...');
    },

    showActiveState() {
        this.el.$betButton.disabled = false;
        this.el.$stopButton.disabled = false;
    },

    showEndGame(currentMoney, currentRounds) {
        this.el.$gameControls.style.display = 'none';
        this.el.$colorSelect.style.display = 'none';
        this.el.$betButton.style.display = 'none';
        this.el.$stopButton.style.display = 'none';
        this.updateResult(`게임 종료<br>최종 자금: ${currentMoney.toLocaleString()}원<br>플레이한 라운드: ${currentRounds}`);
        this.el.$restartButton.style.display = 'block';
    }
};

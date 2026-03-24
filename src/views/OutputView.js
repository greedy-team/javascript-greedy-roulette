export default class OutputView {
    constructor() {
        this.resultColorClasses = ['YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'RED'];
        this.currentMoney = document.getElementById('current-money');
        this.currentRound = document.getElementById('current-round');
        this.betButton = document.getElementById('bet-button');
        this.stopButton = document.getElementById('stop-button');
        this.gameControls = document.getElementById('game-controls');
        this.resultBox = document.getElementById('result-box');
        this.resultContent = document.getElementById('result-content');
        this.restartButton = document.getElementById('restart-button');
        this.colorSelect = document.getElementById('color-select');
        this.betAmount = document.getElementById('bet-amount');

        this.currentMoney.textContent = "10,000";

    }

    setResultColorClass(color) {
        this.resultContent.classList.remove(...this.resultColorClasses);
        if (color) {
            this.resultContent.classList.add(color);
        }
    }

    updateCurrentstatus(calculatedMoney, calculatedRound, result) {
        setTimeout(() => {
            this.currentMoney.textContent = calculatedMoney;
            this.currentRound.textContent = calculatedRound;
            this.resultContent.innerHTML = result;

            this.betButton.disabled = false;
            this.stopButton.disabled = false;
        }, 2000);
    }

    bettingRoulette(deductedMoney) {
        this.betButton.disabled = true;
        this.stopButton.disabled = true;
        this.setResultColorClass('');
        if (deductedMoney !== undefined) {
            this.currentMoney.textContent = deductedMoney;
        }
        this.resultBox.style.display = 'block';
        this.resultContent.innerText = '룰렛을 돌리는 중...';
    }

    showAlert(message) {
        alert(message);
    }

    end(result) {
        this.gameControls.style.display = 'none';
        this.restartButton.style.display = 'block';
        this.resultContent.innerHTML = result;
        this.resultBox.style.display = 'block';
    }

    restart() {
        this.currentMoney.textContent = '10,000';
        this.currentRound.textContent = '0';
        this.colorSelect.value = '';
        this.betAmount.value = '';
        this.setResultColorClass('');

        this.betButton.disabled = false;
        this.stopButton.disabled = false;
        this.gameControls.style.display = 'block';
        this.resultBox.style.display = 'none';
        this.resultContent.innerHTML = '';
        this.restartButton.style.display = 'none';
    }
}
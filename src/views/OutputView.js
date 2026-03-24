export default class OutputView {
    constructor() {
        this.currentMoney = document.getElementById('current-money');
        this.currentRound = document.getElementById('current-round');
        this.betButton = document.getElementById('bet-button');
        this.stopButton = document.getElementById('stop-button');
        this.resultBox = document.getElementById('result-box');
        this.resultContent = document.getElementById('result-content');
        this.restartButton = document.getElementById('restart-button');

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

    bettingRoulette() {
        this.betButton.disabled = true;
        this.stopButton.disabled = true;
        this.resultBox.style.display = 'block';
        this.resultContent.innerText = "룰렛을 돌리는 중";
    }

    showAlert(message) {
        alert(message);
    }

    end(result) {
        document.getElementById("game-controls").style.display = "none";
        this.restartButton.style.display = "block";
        this.resultContent.innerHTML = result;
        this.resultBox.style.display = "block";
    }
}
export default class OutputView {
    constructor() {
        this.currentMoney = document.getElementById('current-money');
        this.betButton = document.getElementById('bet-button');
        this.stopButton = document.getElementById('stop-button');
        this.resultBox = document.getElementById('result-box');
        this.resultContent = document.getElementById('result-content');
    }

    updateCurrentMoney(calculatedMoney) {
        this.currentMoney.textContent = calculatedMoney;
    }

    bettingRoulette() {
        this.betButton.disabled = true;
        this.stopButton.disabled = true;
        this.resultBox.style.display = 'block';
        this.resultContent.innerText = "룰렛을 돌리는 중";

        setTimeout(() => {
            this.betButton.disabled = false;
            this.stopButton.disabled = false;
            this.resultContent.innerText = "결과";
        }, 2000)
    }
}
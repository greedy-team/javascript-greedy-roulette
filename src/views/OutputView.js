export default class OutputView {
    constructor() {
        this.currentMoney = document.getElementById('current-money');
    }

    updateCurrentMoney(calculatedMoney) {
        this.currentMoney.textContent = calculatedMoney;
        console.groupCollapsedx
    }
}
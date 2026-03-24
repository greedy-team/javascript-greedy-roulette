export default class InputView {
    constructor() {
        this.colorSelect = document.getElementById('color-select');
        this.betAmount = document.getElementById('bet-amount');

        this.currentMoney = document.getElementById('current-money');
    }

    bindBetEvent(handler) {
        this.betButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentMoney = this.currentMoney.textContent;
            const selectedColor = this.colorSelect.value;
            const bettedAmount = this.betAmount.value;

            handler(currentMoney, selectedColor, bettedAmount);
        }
    );}
}
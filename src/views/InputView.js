export default class InputView {
    constructor() {
        this.colorSelect = document.getElementById('color-select');
        this.betAmount = document.getElementById('bet-amount');
        this.betButton = document.getElementById('bet-button');
        this.stopButton = document.getElementById('stop-button');

        this.currentMoney = document.getElementById('current-money');
    }

    bindBetEvent(handler) {
        this.betButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentMoney = this.currentMoney.textContent;
            const selectedColor = this.colorSelect.value;
            const bettedAmount = this.betAmount.value;

            this.betButton.disabled = true;
            this.stopButton.disabled = true;

            setTimeout(() => {
                this.betButton.disabled = false;
                this.stopButton.disabled = false;
            }, 2000)

            handler(currentMoney, selectedColor, bettedAmount);
        }
    );}
}
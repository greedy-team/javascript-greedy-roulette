export default class InputView {
    constructor() {
        this.colorSelect = document.getElementById('color-select');
        this.betButton = document.getElementById('bet-button');
        this.betAmount = document.getElementById('bet-amount');
        this.currentRound = document.getElementById('current-round');
        this.currentMoney = document.getElementById('current-money');
    }

    bindBetEvent(handler) {
        this.betButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            const currentMoney = this.currentMoney.textContent;
            const currentRound = parseInt(this.currentRound.textContent);
            const selectedColor = this.colorSelect.value;
            const bettedAmount = this.betAmount.value;

            handler(currentMoney, currentRound, selectedColor, bettedAmount);
        }
    );}
}
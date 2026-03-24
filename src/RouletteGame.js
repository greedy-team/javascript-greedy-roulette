import InputView from './views/InputView.js'
import OutputView from './views/OutputView.js'
import ViewModel from './ViewModel.js';

export default class RouletteGame {
    constructor() {
        this.InputView = new InputView();
        this.OutputView = new OutputView();
        this.ViewModel = new ViewModel();

        this.init();
    }

    init() {
        this.InputView.bindBetEvent(this.onBet.bind(this));
    }

    onBet(currentMoney, selectedColor, bettedAmount) {
        try {
            const calculatedMoney = parseInt(currentMoney) - parseInt(bettedAmount);
            this.OutputView.updateCurrentMoney(calculatedMoney);
            
        } catch (error) {
        }
    }
}
import InputView from './views/InputView.js'
import OutputView from './views/OutputView.js'
import ViewModel from './ViewModel.js';
import { mark } from './utils/mark.js';

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

    onBet(currentMoney, currentRound, selectedColor, bettedAmount) {
        try {
            this.OutputView.bettingRoulette();
            let calculatedMoney;
            
            let result;
            if (this.ViewModel.play(selectedColor, bettedAmount)) {
                result = "베팅 성공! +" + mark(bettedAmount) + "원";
                calculatedMoney = mark(parseInt(currentMoney) + parseInt(bettedAmount));
            } else {
                result = "베팅 실패! -" + mark(bettedAmount) + "원";
                calculatedMoney = mark(parseInt(currentMoney) - parseInt(bettedAmount));
            }

            this.OutputView.updateCurrentstatus(calculatedMoney, ++currentRound, result);
        } catch (error) {
        }
    }
}
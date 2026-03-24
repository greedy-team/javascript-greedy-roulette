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
        this.InputView.bindStopEvent(this.onStop.bind(this));
        this.InputView.bindBetEvent(this.onBet.bind(this));
    }

    validateBet(currentMoney, selectedColor, bettedAmount) {
        const money = Number(String(currentMoney).replace(/,/g, ''));
        const amountText = String(bettedAmount).trim();
        const amount = Number(amountText);

        if (!selectedColor) {
            throw new Error('색상을 선택해주세요.');
        }

        if (!Number.isInteger(amount) || amount <= 0) {
            throw new Error('베팅 금액은 1 이상의 정수여야 합니다.');
        }

        if (amount > money) {
            throw new Error('보유 금액을 초과했습니다.');
        }

        return { money, amount };
    }

    onBet(currentMoney, currentRound, selectedColor, bettedAmount) {
        try {
            const { money, amount } = this.validateBet(currentMoney, selectedColor, bettedAmount);

            this.OutputView.bettingRoulette();
            let calculatedMoney;
            
            let result;
            if (this.ViewModel.play(selectedColor, amount)) {
                result = "베팅 성공! +" + mark(amount) + "원";
                calculatedMoney = mark(money + amount);
            } else {
                result = "베팅 실패! -" + mark(amount) + "원";
                calculatedMoney = mark(money - amount);
            }

            this.OutputView.updateCurrentstatus(calculatedMoney, ++currentRound, result);
        } catch (error) {
            console.log(error);
        }
    }

    onStop(currentMoney, currentRound) {
        let result = "<h4>게임 종료</h4>최종 자금: " + mark(currentMoney) + "원<br>" + "플레이한 라운드: " + currentRound;
        this.OutputView.end(result);
    }
}
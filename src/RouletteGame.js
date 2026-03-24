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
        this.InputView.bindRestartEvent(this.onRestart.bind(this));
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

    getRouletteColor() {
        const rate = Math.random();

        if (rate < 0.525) return 'YELLOW';
        if (rate < 0.775) return 'GREEN';
        if (rate < 0.925) return 'BLUE';
        if (rate < 0.975) return 'PURPLE';
        return 'RED';
    }

    onBet(currentMoney, currentRound, selectedColor, bettedAmount) {
        try {
            const { money, amount } = this.validateBet(currentMoney, selectedColor, bettedAmount);
            const rouletteColor = this.getRouletteColor();
            const isWin = rouletteColor === selectedColor;
            const nextRound = currentRound + 1;
            const nextMoney = isWin ? money + amount : money - amount;

            this.OutputView.bettingRoulette();
            let result = `룰렛 결과: ${rouletteColor}<br>`;

            if (isWin) {
                result += "베팅 성공! +" + mark(amount) + "원";
            } else {
                result += "베팅 실패! -" + mark(amount) + "원";
            }

            if (nextMoney <= 0) {
                result += "<br>게임이 곧 종료됩니다.";
            }

            this.OutputView.updateCurrentstatus(mark(nextMoney), nextRound, result);

            if (nextMoney <= 0) {
                setTimeout(() => {
                    this.onStop(nextMoney, nextRound);
                }, 4000);
            }
        } catch (error) {
            this.OutputView.showAlert(error.message || '알 수 없는 오류가 발생했습니다.');
        }
    }

    onStop(currentMoney, currentRound) {
        let result = "<h4>게임 종료</h4>최종 자금: " + mark(currentMoney) + "원<br>" + "플레이한 라운드: " + currentRound;
        this.OutputView.end(result);
    }

    onRestart() {
        this.OutputView.restart();
    }
}
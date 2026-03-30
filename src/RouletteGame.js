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
        this.InputView.bindBetEvent(this.startBet.bind(this));
        this.InputView.bindRestartEvent(this.onRestart.bind(this));
    }

    preprocessInput(currentMoney, bettedAmount) {
        const money = Number(String(currentMoney).replace(/,/g, ''));
        const amountText = String(bettedAmount).trim();

        return { money, amountText };
    }

    validateBet(selectedColor, amountText, amount, money) {

        if (!selectedColor) {
            throw new Error('색상을 선택해주세요.');
        }

        if (!/^\d+$/.test(amountText)) {
            throw new Error('베팅 금액은 1 이상의 정수여야 합니다.');
        }

        if (amount > money) {
            throw new Error('보유 금액을 초과했습니다.');
        }
    }

    startBet(currentMoney, currentRound, selectedColor, bettedAmount) {
        try {
            const { money, amountText } = this.preprocessInput(currentMoney, bettedAmount);
            const amount = Number(amountText);
            this.validateBet(selectedColor, amountText, amount, money);
            const rouletteColor = this.ViewModel.getRouletteColor();
            const payoutRate = this.ViewModel.getPayoutRate(selectedColor);
            const isWin = rouletteColor === selectedColor;
            const nextRound = currentRound + 1;
            const deductedMoney = money - amount;
            const payoutAmount = amount * (payoutRate + 1);
            const nextMoney = isWin ? deductedMoney + payoutAmount : deductedMoney;

            this.OutputView.bettingRoulette(mark(deductedMoney));
            const colorClass = rouletteColor.toLowerCase();
            let result = `룰렛 결과: <span class="color-chip ${colorClass}">${rouletteColor}</span><br>`;

            if (isWin) {
                result += `<span class="win">베팅 성공! +${mark(payoutAmount)}원</span>`;
            } else {
                result += `<span class="lose">베팅 실패! -${mark(amount)}원</span>`;
            }

            if (nextMoney <= 0) {
                result += "<br>게임이 곧 종료됩니다.";
            }

            this.OutputView.updateCurrentstatus(mark(nextMoney), nextRound, result);
            this.OutputView.setResultColorClass(rouletteColor);

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
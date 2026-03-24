import { model } from '../models/RouletteModel.js';
import { view } from '../views/RouletteView.js';

export const viewModel = {
    init() {
        model.reset();
        view.init();
        view.updateMoney(model.data.currentMoney);
        view.updateRound(model.data.currentRound);
    },

    setupGameEventListeners() {
        view.el.$betButton.addEventListener('click', () => this.processBettingFlow());
        
        view.el.$stopButton.addEventListener('click', () => {
            view.el.$resultBox.style.display = 'block';
            view.updateResult("게임이 곧 종료됩니다.");
            setTimeout(() => view.showEndGame(model.data.currentMoney, model.data.currentRound), 2000);
        });

        view.el.$restartButton.addEventListener('click', () => {
            view.updateResult("새 게임을 시작합니다!");
            this.init(); 
        });
    },

    processBettingFlow() {
        const selectedColor = view.el.$colorSelect.value;
        const getAmount = view.el.$betAmountInput.value; 

        if (!this.isValid(selectedColor, getAmount)) {
            return; 
        }

        const amount = Number(getAmount);
        model.data.currentMoney -= amount;
        view.updateMoney(model.data.currentMoney); 

        view.showWaitingState();

        setTimeout(() => {
            this.RouletteResult(selectedColor, amount);
        }, 2000);
    },

    isValid(selectedColor, getAmount){
        if (selectedColor === "") {
            alert("색상을 선택해주세요!");
            return false;
        }

        const amount = Number(getAmount); 
        if (isNaN(amount) || amount <= 0) {
            alert("베팅 금액을 정확히 입력해주세요!");
            return false;
        }
        return true;
    },

    RouletteResult(selectedColor, amount) {
        model.data.currentRound += 1;
        view.updateRound(model.data.currentRound);

        const randomNumber = Math.floor(Math.random() * 40) + 1;
        const resultColor = model.getResultColor(randomNumber);
        
        this.judgeResult(selectedColor, resultColor, amount);
        
        if(this.bankruptCheck()){
            return;
        }
        view.showActiveState();
    },

    judgeResult(selectedColor, resultColor, amount){
        let resultMessage = "";

            if (selectedColor === resultColor) {
                const multiplier = model.getMultiplier(resultColor);
                const winAmount = Math.floor(amount + (amount * multiplier));
                
                model.data.currentMoney += winAmount; 
                view.updateMoney(model.data.currentMoney);
                resultMessage = `베팅 성공! +${winAmount}원`;
            } else {
                resultMessage = `베팅 실패! -${amount}원`;
            }

            view.updateResult(`룰렛 결과: ${resultColor} <br> ${resultMessage}`);
    },

    
    bankruptCheck(){
        if (model.data.currentMoney <= 0) {
            view.el.$resultContent.innerHTML += `<br> 자금이 0원이 되었습니다.`;
            view.el.$betButton.disabled = true;
            view.el.$stopButton.disabled = true;
            setTimeout(() => view.showEndGame(model.data.currentMoney, model.data.currentRound), 2000);
            return true;
        }
        return false;
    }
};

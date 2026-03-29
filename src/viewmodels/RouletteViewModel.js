import { model } from '../models/RouletteModel.js';

export const viewModel = {
    
    //방송해 줄 함수 초기화
    onMoneyChange: null,
    onRoundChange: null,
    onResultChange: null,
    onStateChange: null, 
    onBankrupt: null,

    init() {
        model.reset();
        // null 값이 아니면 방송
        if(this.onStateChange) this.onStateChange('init');
        if(this.onMoneyChange) this.onMoneyChange(model.data.currentMoney);
        if(this.onRoundChange) this.onRoundChange(model.data.currentRound);
        if(this.onResultChange) this.onResultChange("");
    },

    processBettingFlow(selectedColor, getAmount) {

        if (!this.isValid(selectedColor, getAmount)) {
            return; 
        }

        const amount = Number(getAmount);
        model.data.currentMoney -= amount;

        if(this.onMoneyChange){
            this.onMoneyChange(model.data.currentMoney);
        }
        if(this.onStateChange){
            this.onStateChange('waiting');
        }

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
        if (isNaN(amount) || !/^[0-9]+$/.test(getAmount)) {
            alert("베팅 금액을 정확히 입력해주세요!");
            return false;
        }

        if (amount <= 0) {
            alert("베팅 금액을 정확히 입력해주세요!");
            return false;
        }

        if(amount>model.data.currentMoney){
            alert("보유 금액을 초과하여 베팅할 수 없습니다!")
            return false;
        }
        return true;
    },

    RouletteResult(selectedColor, amount) {
        model.data.currentRound += 1;
        if(this.onRoundChange) this.onRoundChange(model.data.currentRound);

        const totalPercentage = 40;
        const randomNumber = Math.floor(Math.random() * totalPercentage) + 1;
        const resultColor = model.getResultColor(randomNumber);
        
        this.judgeResult(selectedColor, resultColor, amount);
        
        if(this.checkingBankrupt()){
            return;
        }
        if(this.onStateChange){
            this.onStateChange('active');
        }
    },

    judgeResult(selectedColor, resultColor, amount){
        let resultMessage = "";

            if (selectedColor === resultColor) {
                const multiplier = model.getMultiplier(resultColor);
                const winAmount = Math.floor(amount + (amount * multiplier));
                
                model.data.currentMoney += winAmount; 
                if(this.onMoneyChange) this.onMoneyChange(model.data.currentMoney);
                resultMessage = `베팅 성공! +${winAmount.toLocaleString()}원`;
            } else {
                resultMessage = `베팅 실패! -${amount.toLocaleString()}원`;
            }

            if(this.onResultChange) this.onResultChange(`룰렛 결과: ${resultColor}<br>${resultMessage}`);
    },
    
    checkingBankrupt(){
        if (model.data.currentMoney <= 0) {
            if(this.onBankrupt) this.onBankrupt(model.data.currentMoney, model.data.currentRound)
            return true;
        }
        return false;
    },

    stopGame() {
        if(this.onStateChange) this.onStateChange('endGame', model.data.currentMoney, model.data.currentRound);
    }
};

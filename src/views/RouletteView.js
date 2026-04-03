import { viewModel } from "../viewmodels/RouletteViewModel.js";

export const view = {

    el: {
        $currentMoney: document.getElementById('current-money'),
        $currentRound: document.getElementById('current-round'),
        $gameControls: document.getElementById('game-controls'),
        $betAmountInput: document.getElementById('bet-amount'),
        $colorSelect: document.getElementById('color-select'),
        $betButton: document.getElementById('bet-button'),
        $stopButton: document.getElementById('stop-button'),
        $resultBox: document.getElementById('result-box'),
        $resultContent: document.getElementById('result-content'),
        $restartButton: document.getElementById('restart-button')
    },

    bindEvents(viewmodel){

        this.el.$betButton.addEventListener('click', ()=>{
            const selectedColor = this.el.$colorSelect.value;
            const getAmount = this.el.$betAmountInput.value;
            
            viewModel.processBettingFlow(selectedColor, getAmount);
        })
        this.el.$stopButton.addEventListener('click', ()=>{
            this.el.$resultBox.style.display = 'none';
            this.updateResult("게임이 곧 종료됩니다.");
            viewModel.stopGame();
        })
        this.el.$restartButton.addEventListener('click',()=>{
            this.updateResult("새 게임을 시작합니다!");
            viewModel.init();
        })

        viewModel.onMoneyChange = (money) => this.updateMoney(money);
        viewModel.onRoundChange = (round) => this.updateRound(round);
        viewModel.onResultChange = (text) => this.updateResult(text);

        viewModel.onStateChange = (state, data1, data2) => {
            if (state === 'init') this.init();
            if (state === 'waiting') this.showWaitingState();
            if (state === 'active') this.showActiveState();
            if (state === 'endGame') {

                this.el.$betButton.disabled = true;
                this.el.$stopButton.disabled = true;
                
                setTimeout(() => this.showEndGame(data1, data2), 2000);
            };
        };

        viewModel.onBankrupt = (money, round) => {
            this.el.$resultContent.innerHTML += `<br>게임이 곧 종료됩니다.`;
            this.el.$betButton.disabled = true;
            this.el.$stopButton.disabled = true;
            setTimeout(() => this.showEndGame(money, round), 2000);
        };
    },

    init() {
        this.el.$gameControls.style.display = 'block';
        this.el.$restartButton.style.display = 'none';
        this.el.$resultBox.style.display = 'none';
        this.el.$colorSelect.style.display = 'block';
        this.el.$betButton.style.display = 'block';
        this.el.$stopButton.style.display = 'block';
        this.showActiveState();

        this.el.$colorSelect.value = "";
        this.el.$betAmountInput.value = "";
        this.el.$resultContent.textContent = "";
    },

    updateMoney(currentMoney) { this.el.$currentMoney.textContent = currentMoney.toLocaleString(); },
    updateRound(currentRound) { this.el.$currentRound.textContent = currentRound; },
    updateResult(text) { this.el.$resultContent.innerHTML = text; },

    showWaitingState() {
        this.el.$betButton.disabled = true;
        this.el.$stopButton.disabled = true;
        this.el.$resultBox.style.display = 'block';
        this.updateResult('룰렛을 돌리는 중...');
    },

    showActiveState() {
        this.el.$betButton.disabled = false;
        this.el.$stopButton.disabled = false;
    },

    showEndGame(currentMoney, currentRounds) {
        this.el.$gameControls.style.display = 'none';
        this.el.$colorSelect.style.display = 'none';
        this.el.$betButton.style.display = 'none';
        this.el.$stopButton.style.display = 'none';
        this.updateResult(`게임 종료<br>최종 자금: ${currentMoney.toLocaleString()}원<br>플레이한 라운드: ${currentRounds}`);
        this.el.$restartButton.style.display = 'block';
    }
};

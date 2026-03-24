const $currentMoney = document.getElementById('current-money');
const $currentRound = document.getElementById('current-round');
const $gameControls = document.getElementById('game-controls');
const $betAmountInput = document.getElementById('bet-amount');
const $colorSelect = document.getElementById('color-select');
const $betButton = document.getElementById('bet-button');
const $stopButton = document.getElementById('stop-button');
const $resultBox = document.getElementById('result-box');
const $resultContent = document.getElementById('result-content');
const $restartButton = document.getElementById('restart-button');

const init = () => {
  $currentMoney.textContent = 10000;
  $currentRound.textContent = 0;

  $gameControls.style.display = 'block';
  $restartButton.style.display = 'none';
  $resultBox.style.display = 'none';

  $colorSelect.style.display = 'block';
  $betButton.style.display = 'block';
  $stopButton.style.display = 'block';
};

init();

function endGame(){
  $gameControls.style.display = 'none';
  $colorSelect.style.display='none';
  $betButton.style.display = 'none';
  $stopButton.style.display = 'none';

  const finalMoney = $currentMoney.textContent;
  const totalRounds = $currentRound.textContent;

  $restartButton.style.display = 'block';
  $resultContent.innerHTML=`게임 종료 최종 자금: ${finalMoney}원 플레이한 라운드: ${totalRounds}`;

  $restartButton.style.display='block';
}

$betButton.addEventListener('click', () => {
  const selectedColor = $colorSelect.value;
  const getAmount = $betAmountInput.value;

  if (selectedColor===""){
    alert("색상을 선택해주세요!");
    return;
  }
  const amount=Number(getAmount);
  if(isNaN(amount) || amount<=0){
    alert("베팅 금액을 정확히 입력해주세요!");
    
  }
  
});


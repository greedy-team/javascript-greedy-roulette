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

$betButton.addEventListener('click', () => {
  const selectedColor = $colorSelect.value;
  const getAmount = $betAmountInput.value;

  if (selectedColor === "") {
    alert("색상을 선택해주세요!");
    return;
  }
  const amount = Number(getAmount);
  if (isNaN(amount) || amount <= 0) {
    alert("베팅 금액을 정확히 입력해주세요!");
    return;
  }

  const currentBalance = Number($currentMoney.textContent);
  const nextBalance = currentBalance - amount;

  $currentMoney.textContent = nextBalance;

  $betButton.style.display = 'none';
  $stopButton.style.display = 'none';
  $resultBox.style.display = 'block';
  $resultContent.textContent = '룰렛을 돌리는 중...';

  setTimeout(() => {
    const currentRound = Number($currentRound.textContent);
    $currentRound.textContent = currentRound + 1;

    const randomNumber = Math.floor(Math.random() * 40) + 1;
    let resultColor = "";

    if (randomNumber <= 21) resultColor = "YELLOW";
    else if (randomNumber <= 31) resultColor = "GREEN";
    else if (randomNumber <= 37) resultColor = "BLUE";
    else if (randomNumber <= 39) resultColor = "PURPLE";
    else resultColor = "RED";

    let resultMessage = "";

    if (selectedColor === resultColor) {
      let multiplier = 0;
      if (resultColor === "YELLOW") multiplier = 1;
      else if (resultColor === "GREEN") multiplier = 3.0;
      else if (resultColor === "BLUE") multiplier = 5.0;
      else if (resultColor === "PURPLE") multiplier = 10.0;
      else if (resultColor === "RED") multiplier = 20.0;

      const winAmount = Math.floor(amount + (amount * multiplier));
      const currentMoneyValue = Number($currentMoney.textContent);
      $currentMoney.textContent = currentMoneyValue + winAmount;

      resultMessage = `🎉 베팅 성공! +${winAmount}원`;
    } else {
      resultMessage = `💀 베팅 실패! -${amount}원`;
    }

    $resultContent.innerHTML = `룰렛 결과: ${resultColor} <br> ${resultMessage}`;

    $betButton.style.display = 'block';
    $stopButton.style.display = 'block';
  }, 2000);
});
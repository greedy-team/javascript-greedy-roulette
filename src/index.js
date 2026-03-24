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

const currentMoney = document.querySelector("#current-money");
const currentRound = document.querySelector("#current-round");
const gameControls = document.querySelector("#game-controls");
const resultBox = document.querySelector("#result-box");
const resultContent = document.querySelector("#result-content");

export const colorSelect = document.querySelector("#color-select");
export const betAmount = document.querySelector("#bet-amount");
export const betButton = document.querySelector("#bet-button");
export const stopButton = document.querySelector("#stop-button");
export const restartButton = document.querySelector("#restart-button");

export function formatMoney(amount) {
  return amount.toLocaleString();
}
export function updateMoneyDisplay(balance) {
  currentMoney.textContent = formatMoney(balance);
}
export function updateRoundDisplay(round) {
  currentRound.textContent = round;
}
export function disableButtons() {
  betButton.disabled = true;
  stopButton.disabled = true;
}
export function enableButtons() {
  betButton.disabled = false;
  stopButton.disabled = false;
}
export function showSpinning() {
  resultBox.style.display = "";
  resultContent.textContent = "룰렛을 돌리는 중...";
}

export function showResult(result, payout, amount) {
  const isWin = payout > 0;
  const message = isWin
    ? `베팅 성공! +${formatMoney(payout)}원`
    : `베팅 실패! -${formatMoney(amount)}원`;
  resultContent.innerHTML =
    `룰렛 결과: <span class="${result.toLowerCase()}">${result}</span>` +
    `<br>${message}`;
}

export function showBankruptMessage() {
  resultContent.innerHTML += "<br>게임이 곧 종료됩니다.";
}
export function showEndGame(balance, round) {
  gameControls.style.display = "none";
  resultBox.style.display = "";
  resultContent.innerHTML = `게임 종료<br>최종 자금: ${formatMoney(balance)}원<br>플레이한 라운드: ${round}`;
  restartButton.style.display = "";
}

export function initRoulette(initialBalance) {
  updateMoneyDisplay(initialBalance);
  updateRoundDisplay(0);
  colorSelect.value = "";
  betAmount.value = "";
  enableButtons();
  gameControls.style.display = "";
  resultBox.style.display = "none";
  restartButton.style.display = "none";
}

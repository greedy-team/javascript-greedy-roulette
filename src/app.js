// 이벤트 리스너 + 흐름제어
import Roulette from "./Roulette.js";
import { INITIAL_BALANCE } from "./constants.js";
import {
  colorSelect,
  betAmount,
  betButton,
  stopButton,
  restartButton,
  initRoulette,
  updateMoneyDisplay,
  updateRoundDisplay,
  disableButtons,
  enableButtons,
  showSpinning,
  showResult,
  showBankruptMessage,
  showEndGame,
} from "./dom.js";

betButton.addEventListener("click", handleBetClick);

stopButton.addEventListener("click", handleStopClick);

restartButton.addEventListener("click", handleRestartClick);

const roulette = new Roulette();

initRoulette(INITIAL_BALANCE);

// 베팅 결과
function handleBetResult(color, amount) {
  const result = roulette.rouletteSpin();
  const payout = roulette.calculatePayout(color, amount, result);
  roulette.addPayout(payout);
  roulette.addRound();
  showResult(result, payout, amount);
  updateMoneyDisplay(roulette.balance);
  updateRoundDisplay(roulette.round);

  if (roulette.isBankrupt()) {
    showBankruptMessage();
    setTimeout(() => showEndGame(roulette.balance, roulette.round), 2000);
  } else {
    enableButtons();
  }
}

// 베팅 클릭
function handleBetClick() {
  const color = colorSelect.value;
  const betAmountValue = betAmount.value;
  try {
    roulette.validateBet(color, betAmountValue);
  } catch (error) {
    alert(error.message);
    return;
  }
  const amount = Number(betAmountValue);
  roulette.subtractBet(amount);
  updateMoneyDisplay(roulette.balance);
  disableButtons();
  showSpinning();
  setTimeout(() => handleBetResult(color, amount), 2000);
}

function handleStopClick() {
  showEndGame(roulette.balance, roulette.round);
}

function handleRestartClick() {
  roulette.reset();
  initRoulette(INITIAL_BALANCE);
}

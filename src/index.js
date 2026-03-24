// 룰렛 칸수 상수
const NUMBER_OF_SLOTS = 40;

// 초기 자금 상수
const INITIAL_BALANCE = 10000;

// 배당: YELLOW x1, GREEN x3, BLUE x5, PURPLE x10, RED x20
const rouletteBets = {
  YELLOW: 1,
  GREEN: 3,
  BLUE: 5,
  PURPLE: 10,
  RED: 20,
};

// DOM 요소
const currentMoney = document.querySelector("#current-money");
const currentRound = document.querySelector("#current-round");
const colorSelect = document.querySelector("#color-select");
const betAmount = document.querySelector("#bet-amount");
const betButton = document.querySelector("#bet-button");
const stopButton = document.querySelector("#stop-button");
const restartButton = document.querySelector("#restart-button");
const gameControls = document.querySelector("#game-controls");
const resultBox = document.querySelector("#result-box");
const resultContent = document.querySelector("#result-content");

function formatMoney(amount) {
  // 숫자 3자리마다 콤마 추가하는 포멧함수
  return amount.toLocaleString();
}

function initRoulette() {
  currentMoney.textContent = formatMoney(INITIAL_BALANCE); // 초기 자금 표시
  currentRound.textContent = "0"; // 초기 라운드 표시
  colorSelect.value = ""; // 초기 색상 선택값 초기화
  betAmount.value = ""; // 초기 베팅 금액 입력값 초기화
  betButton.disabled = false; // 베팅 버튼 활성화
  stopButton.disabled = false; // 정지 버튼 활성화
  gameControls.style.display = ""; // 게임 컨트롤 표시
  resultBox.style.display = "none"; // 결과 박스 숨김
  restartButton.style.display = "none"; // 다시 시작 버튼 숨김
}

initRoulette();

class Roulette {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.round = 0;
  }

  // 룰렛 결과에 따른 배당금 계산 메서드
  calculatePayout(betAmount, result) {
    return betAmount * rouletteBets[result];
  }
  //    - 40칸: YELLOW(21), GREEN(10), BLUE(6), PURPLE(2), RED(1)
  //    - 각 칸 동일 확률(2.5%)로 선택
  //    룰렛 칸수 40개로 고정

  // 룰렛 시작 메서드
  rouletteStart() {
    const result = this.randomResult();
    if (result < 21) {
      return "YELLOW";
    } else if (result < 31) {
      return "GREEN";
    } else if (result < 37) {
      return "BLUE";
    } else if (result < 39) {
      return "PURPLE";
    } else {
      return "RED";
    }
  }

  // 랜덤 값 생성 메서드
  randomResult() {
    // 0부터 39까지의 랜덤 정수 생성
    return Math.floor(Math.random() * NUMBER_OF_SLOTS);
  }
}

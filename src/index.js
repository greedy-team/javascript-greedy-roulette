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
    // 선택한 색상과 rouletteSpin에서 나온 랜덤 룰렛 결과가 일치하는지 확인
    if (this.checkWinner(colorSelect.value, result)) {
      return betAmount + betAmount * rouletteBets[result]; // 성공시 원금을 더 더해야함
    }
    return 0;
  }
  //    - 40칸: YELLOW(21), GREEN(10), BLUE(6), PURPLE(2), RED(1)
  //    - 각 칸 동일 확률(2.5%)로 선택
  //    룰렛 칸수 40개로 고정

  // 룰렛 시작 메서드
  rouletteSpin() {
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

  //라운드 증가 메서드
  addRound() {
    this.round += 1;
    currentRound.textContent = String(this.round);
  }
  // 랜덤 값 생성 메서드
  randomResult() {
    // 0부터 39까지의 랜덤 정수 생성
    return Math.floor(Math.random() * NUMBER_OF_SLOTS);
  }

  // 베팅 입력 검증
  validateBet(color, amount) {
    if (!color) {
      throw new Error("색상을 선택해주세요.");
    }
    if (!/^[1-9]\d*$/.test(String(amount))) {
      throw new Error("베팅 금액은 1원 이상의 정수여야 합니다.");
    }
    if (amount > this.balance) {
      throw new Error("보유 금액을 초과할 수 없습니다.");
    }
    return "검증 성공";
  }

  // 베팅 실행 메서드
  // 인증 후 베팅 금액 차감, 버튼 비활성화, 결과 표시, 결과 로딩 메시지 표시
  startBet(color, amount) {
    this.validateBet(color, amount);
    this.balance -= amount;
    // DOM 업데이트
    currentMoney.textContent = formatMoney(this.balance);

    // 베팅 후 버튼 비활성화
    betButton.disabled = true;
    stopButton.disabled = true;
    resultBox.style.display = "";
    resultContent.textContent = "룰렛을 돌리는 중...";
    setTimeout(() => {
      this.rouletteResult();
      // 파산 시 게임 종료 처리
      if (this.balance <= 0) {
        resultContent.innerHTML += "<br>게임이 곧 종료됩니다.";
        betButton.disabled = true;
        stopButton.disabled = true;
        setTimeout(() => {
          this.endGame();
        }, 2000);
        return;
      }
      stopButton.disabled = false;
      betButton.disabled = false;
    }, 2000); // 2초 후 룰렛 결과 표시
  }

  rouletteResult() {
    // 이미 startBet 에서 검증된 값만 들어오기 때문에 추가 검증 없이 바로 결과 계산
    const result = this.rouletteSpin();
    const payout = this.calculatePayout(Number(betAmount.value), result);
    this.balance += payout;
    this.addRound();
    currentMoney.textContent = formatMoney(this.balance);

    // 베팅 성공 여부에 따른 분기 처리
    const isWin = payout > 0;
    const message = isWin
      ? `베팅 성공! +${formatMoney(payout)}원`
      : `베팅 실패! -${formatMoney(Number(betAmount.value))}원`;
    resultContent.innerHTML = `룰렛 결과: <span class="${result.toLowerCase()}">${result}</span><br>${message}`;
  }

  checkWinner(color, result) {
    return color === result;
  }

  endGame() {
    gameControls.style.display = "none";
    resultBox.style.display = "";
    resultContent.innerHTML = `게임 종료<br>최종 자금: ${formatMoney(this.balance)}원<br>플레이한 라운드: ${this.round}`;
    restartButton.style.display = "";
  }
}

const roulette = new Roulette();

// 베팅하기 버튼
betButton.addEventListener("click", () => {
  const color = colorSelect.value;
  const amount = Number(betAmount.value);
  try {
    roulette.startBet(color, amount);
  } catch (error) {
    alert(error.message);
  }
});

// 게임 중단 버튼
stopButton.addEventListener("click", () => {
  roulette.endGame();
});

// 다시 시작하기 버튼
restartButton.addEventListener("click", () => {
  roulette.balance = INITIAL_BALANCE;
  roulette.round = 0;
  initRoulette();
});

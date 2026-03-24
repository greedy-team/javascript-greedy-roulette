// 룰렛 칸수 상수
const NUMBER_OF_SLOTS = 40;

// 배당: YELLOW x1, GREEN x3, BLUE x5, PURPLE x10, RED x20
const rouletteBets = {
  YELLOW: 1,
  GREEN: 3,
  BLUE: 5,
  PURPLE: 10,
  RED: 20,
};

class Roulette {
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

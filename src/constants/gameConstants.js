const INITIAL_MONEY = 10000;
const SPIN_DELAY = 2000;

const COLORS = {
  YELLOW: { slots: 10, multiplier: 1 },
  GREEN: { slots: 5, multiplier: 3 },
  BLUE: { slots: 3, multiplier: 5 },
  PURPLE: { slots: 1, multiplier: 10 },
  RED: { slots: 1, multiplier: 20 },
};

const VALID_COLORS = Object.keys(COLORS);

export { INITIAL_MONEY, SPIN_DELAY, COLORS, VALID_COLORS };

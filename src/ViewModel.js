export default class ViewModel {
    constructor() {
    }

    getPayoutRate(color) {
        const payoutRate = {
            YELLOW: 1,
            GREEN: 3,
            BLUE: 5,
            PURPLE: 10,
            RED: 20
        };

        return payoutRate[color];
    }

    getRouletteColor() {
        const rate = Math.random();

        if (rate < 0.525) return 'YELLOW';
        if (rate < 0.775) return 'GREEN';
        if (rate < 0.925) return 'BLUE';
        if (rate < 0.975) return 'PURPLE';
        return 'RED';
    }

    play(color) {
        const rouletteColor = this.getRouletteColor();
        return color === rouletteColor;
    }
}
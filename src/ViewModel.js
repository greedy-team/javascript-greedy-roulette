export default class ViewModel {
    constructor() {
    }

    getRouletteColor() {
        const weightedColors = [
            ...Array(21).fill('YELLOW'),
            ...Array(10).fill('GREEN'),
            ...Array(6).fill('BLUE'),
            ...Array(2).fill('PURPLE'),
            ...Array(1).fill('RED')
        ];
        const randomIndex = Math.floor(Math.random() * weightedColors.length);
        return weightedColors[randomIndex];
    }

    play(color) {
        const rouletteColor = this.getRouletteColor();
        return color === rouletteColor;
    }
}
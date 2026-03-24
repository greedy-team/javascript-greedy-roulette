export default class ViewModel {
    constructor() {
    }

    play(color, amount) {
        let rate = Math.random();

        switch (color) {
            case "YELLOW":
                if (rate < 0.525) {
                    return true;
                }
                break;

            case "GREEN":
                if (rate < 0.25) {
                    return true;
                }
                break;

            case "BLUE":
                if (rate < 0.15) {
                    return true;
                }
                break;

            case "PURPLE":
                if (rate < 0.05) {
                    return true;
                }
                break;

            case "RED":
                if (rate < 0.025) {
                    return true;
                }
                break;
        
            default:
                break;
        }

        return false;
    }
}
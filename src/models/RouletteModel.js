export const model = {
    data: {
        currentMoney: 10000,
        currentRound: 0,
    },
    
    reset() {
        this.data.currentMoney = 10000;
        this.data.currentRound = 0;
    },

    getResultColor(randomNumber) {
        let resultColor = "";
        if (randomNumber <= 21) {
            resultColor = "YELLOW";
        } else if (randomNumber <= 31) {
            resultColor = "GREEN";
        } else if (randomNumber <= 37) {
            resultColor = "BLUE";
        } else if (randomNumber <= 39) {
            resultColor = "PURPLE";
        } else {
            resultColor = "RED";
        }
        return resultColor;
    },

    getMultiplier(resultColor) {
        let multiplier = 0;
        if (resultColor === "YELLOW") multiplier = 1;
        else if (resultColor === "GREEN") multiplier = 3.0;
        else if (resultColor === "BLUE") multiplier = 5.0;
        else if (resultColor === "PURPLE") multiplier = 10.0;
        else if (resultColor === "RED") multiplier = 20.0;
        return multiplier;
    }
};

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
        if (resultColor === "YELLOW") return 1;
        else if (resultColor === "GREEN") return 3.0;
        else if (resultColor === "BLUE") return 5.0;
        else if (resultColor === "PURPLE") return 10.0;
        else if (resultColor === "RED") return 20.0;
        return 0;
    }
};

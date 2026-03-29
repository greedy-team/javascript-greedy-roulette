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

        const table={
            YELLOW: 21,
            GREEN: 10,
            BLUE: 6,
            PURPLE: 2,
            RED: 1
        };

        if (randomNumber <= table.YELLOW) return "YELLOW";
        if (randomNumber <= table.YELLOW + table.GREEN) return "GREEN";
        if (randomNumber <= table.YELLOW + table.GREEN + table.BLUE) return "BLUE";
        if (randomNumber <= table.YELLOW + table.GREEN + table.BLUE + table.PURPLE) return "PURPLE";
    
        return "RED";
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

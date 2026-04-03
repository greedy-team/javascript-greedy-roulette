import getRouletteColor from "../models/getRouletteColor.js"
import successBetting from "../views/successBetting.js";
import showFailBetting from "../views/showFailBetting.js";
import stopPlayBetting from "../views/stopPlayBetting.js";
import waitingForResult from "../views/waitingForResult.js";
import restartBetting from "../views/restartBetting.js";
import getValidationError from "../views/getValidationError.js";
import updateStatus from "../views/updateStatus.js";
import ifNotAccountZero from "../views/enableBettingButtons.js";
import calculateBonusMoney from "../models/calculateBonusMoney.js"
let userAccount = 10000;
let currentRound = 0;

const betBtn = document.getElementById("bet-button");
const stopBtn = document.getElementById("stop-button");
const restartBtn = document.getElementById("restart-button");

function playBetting() {
    const userColor = document.getElementById("color-select").value;
    const rouletteColor = getRouletteColor();
    const money = document.getElementById("bet-amount").value;
    const error=getValidationError(money, userColor, userAccount);

    if (error) {
        alert(error)
        return null;
    }
    const bettingMoney=Number(money);
    userAccount -= bettingMoney;
    currentRound++;
    waitingForResult(userAccount);
    setTimeout(()=>{userAccount=BettingProcess(userColor,rouletteColor,bettingMoney,userAccount,currentRound)}, 2000)
}
function BettingProcess(userColor,rouletteColor,bettingMoney,userAccount,currentRound) {
    if (userColor === rouletteColor) {
        const bonusMoney=calculateBonusMoney(userColor, bettingMoney)
        successBetting(rouletteColor,bonusMoney);
        userAccount += bonusMoney
    } else {
        showFailBetting(rouletteColor, bettingMoney);
    }
    updateStatus(userAccount,currentRound);
    if (userAccount <= 0) {
        showFailBetting(rouletteColor, bettingMoney);
        stopPlayBetting(userAccount, currentRound);
    } else {
        ifNotAccountZero();
    }
    return userAccount;
}

betBtn.onclick = playBetting;
stopBtn.onclick = () => {
    stopPlayBetting(userAccount, currentRound);
}
restartBtn.onclick = () => {
    currentRound=0;
    userAccount=10000;
    restartBetting(userAccount, currentRound);
}


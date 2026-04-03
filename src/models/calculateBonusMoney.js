export default function calculateBonusMoney(userColor, bettingMoney) {
    let bonusRate = 0;
    if (userColor === "YELLOW") {
        bonusRate = 2;
    } else if (userColor === "GREEN") {
        bonusRate = 4;
    } else if (userColor === "BLUE") {
        bonusRate = 6;
    } else if (userColor === "PURPLE") {
        bonusRate = 11;
    } else if (userColor === "RED") {
        bonusRate = 21;
    }
    return bettingMoney * bonusRate;
}
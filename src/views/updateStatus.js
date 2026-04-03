export default function updateStatus(userAccount,currentRound) {
    document.getElementById("current-money").innerHTML = `${userAccount.toLocaleString()}`;
    document.getElementById("current-round").innerHTML = `${currentRound}`;
    document.getElementById("bet-amount").value = null;
}
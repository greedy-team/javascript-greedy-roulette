export default function waitingForResult(userAccount) {
    const betBtn = document.getElementById("bet-button");
    const stopBtn = document.getElementById("stop-button");
    const resultBox = document.getElementById("result-content");
    document.getElementById("current-money").innerHTML = `${userAccount.toLocaleString()}`;
    betBtn.disabled = true;
    stopBtn.disabled = true;
    resultBox.innerHTML = "룰렛을 돌리는 중...";
}
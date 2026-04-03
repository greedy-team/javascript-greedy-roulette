export default function restartBetting(userAccount,currentRound) {
    const resultBox = document.getElementById("result-content");
    const ColorSelect = document.getElementById("color-select");
    const betBtn = document.getElementById("bet-button");
    const stopBtn = document.getElementById("stop-button");
    const restartBtn = document.getElementById("restart-button");
    ColorSelect.value = "";
    betBtn.disabled = false;
    stopBtn.disabled = false;
    betBtn.style.display = 'block';
    stopBtn.style.display = 'block';
    restartBtn.style.display = 'none';
    document.getElementById("game-controls").style.display = "block";
    resultBox.innerHTML = "";
    document.getElementById("current-money").innerHTML = Number(userAccount).toLocaleString();
    document.getElementById("current-round").innerHTML = currentRound;
    document.getElementById("bet-amount").value = null;
    
}
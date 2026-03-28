export default function stopPlayBetting(userAccount,currentRound) {
    const betBtn = document.getElementById("bet-button");
    const stopBtn = document.getElementById("stop-button");
    const restartBtn = document.getElementById("restart-button");
    const resultBox = document.getElementById("result-content");

    betBtn.disabled = true;
    stopBtn.disabled = true;
    resultBox.innerHTML += `<br>` + "게임이 곧 종료됩니다.";
    setTimeout((function () {
        resultBox.innerHTML = "게임 종료" + `<br>` + " 최종 자금: " + userAccount.toLocaleString() + "원 " + `<br>` + "플레이한 라운드: " + currentRound;
        betBtn.style.display = 'none';
        stopBtn.style.display = 'none';
        restartBtn.style.display = 'block';
        document.getElementById("game-controls").style.display = "none";
    }), 2000);

}
export function mark(score) {
    const numericScore = typeof score === "number" ? score : Number(String(score).replace(/,/g, ""));

    if (Number.isNaN(numericScore)) {
        return "";
    }

    return numericScore.toLocaleString("ko-KR");
}
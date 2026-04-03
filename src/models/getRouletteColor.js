export default function getRouletteColor() {
    const colorNum = Math.floor(Math.random() * 40) + 1;
    let color;
    if (colorNum <= 21) {
        color = "YELLOW";
    } else if (colorNum <= 31) {
        color = "GREEN";
    } else if (colorNum <= 37) {
        color = "BLUE";
    } else if (colorNum <= 39) {
        color = "PURPLE";
    } else {
        color = "RED";
    }
    return color;
}
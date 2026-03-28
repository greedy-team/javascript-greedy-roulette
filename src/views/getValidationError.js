export default function getValidationError(bettingMoney,userColor,userAccount){
    if(!isNotInputNothing(bettingMoney)){
        //alert("금액을 입력해주세요!");
        return "금액을 입력해주세요!";
    }
    if (!isInputPossible(bettingMoney,userAccount)) {
        //alert("자금보다 작고 0보다 크게 설정해주세요!");
        return "자금보다 작고 0보다 크게 설정해주세요!";
    }
    if (!userColor) {
        //alert("색상을 선택해주세요!");
        return "색상을 선택해주세요!";
    }
    if (!isInt(bettingMoney)) {
        //alert("정수를 적어주세요");
        return "정수를 적어주세요";
    }
    if (String(bettingMoney).toLowerCase().includes('e')) {
        //alert("지수 표기법으로 입력하지마세요");
        return "지수 표기법으로 입력하지마세요";
    }
    return null;
}

function isInputPossible(bettingMoney,userAccount) {
    if (bettingMoney <= 0 || bettingMoney > userAccount) {
        return false;
    }
    return true;
}
function isNotInputNothing(bettingMoney) {
    if (bettingMoney=="") {
        return false;
    }
    return true;
}
function isInt(bettingMoney) {
    if (!(Number.isInteger(Number(bettingMoney)))) {
        return false;
    }
    return true;
}
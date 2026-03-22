let UserAccount=10000;
let CurrentRound=0;

const BettingBtn=document.getElementById("bet-button");
const StopBtn=document.getElementById("stop-button");
const RestartBtn=document.getElementById("restart-button");

function PlayBetting(){
    const UserColor=document.getElementById("color-select").value;
    const RouletteColor=GetRouletteColor(); 
    
    
}

function GetRouletteColor(){
    const ColorNum=Math.floor(Math.random()*40)+1;
    let Color;
    if(ColorNum<=21){
        Color="YELLOW";
    }else if(ColorNum<=31){
        Color="GREEN";
    }else if(ColorNum<=37){
        Color="BLUE";
    }else if(ColorNum<=39){
        Color="PURPLE";
    }else{
        Color="RED";
    }
    return Color;
}


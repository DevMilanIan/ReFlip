// Lite version -> local vars, Pi App -> firebase
let wonAmt = 0;
let bet = 0;
let betSide = "";
let heads = 0;
let tails = 0;
let locked = false;
let coin = document.querySelector(".coin");
let lockSwitch = document.querySelector("#switch");
let headsBtn = document.querySelector("#heads-button");
let tailsBtn = document.querySelector("#tails-button");
let minBtn = document.querySelector("#min-button");
let meanBtn = document.querySelector("#mean-button");
let maxBtn = document.querySelector("#max-button");
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");
let simBtn = document.querySelector("#sim-button");
let footerTxt = document.querySelector("#footer-text");
let infoTxt = document.querySelector("#info-text");

const extensions = ["eth", "btc", "sol", "algo", "sol", "doge", "ltc", "vet", "xlm", "trx", "bch", "xrp", "bnb", "ada", "dot", "dash", "xmr"];
const random = Math.floor(Math.random() * extensions.length);

footerTxt.textContent = "Developed by imdev." + extensions[random];
  
function resetGame() {
    resetVals();
    resetButtons();
    resetSelection();
};

function setText() {
    if(bet && betSide) {
       infoTxt.textContent = `Betting ${bet} on ${betSide}`;
    } else if(bet){
       infoTxt.textContent = `Betting ${bet}`;
    } else if(betSide){
       infoTxt.textContent = `Betting on ${betSide}`;
    } else {
       infoTxt.textContent = `Select a side and wager!`;
    };
};

function setVals() {
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
    document.querySelector("#winnings").textContent = `Fake Winnings: ${wonAmt}`;
    
    if(!locked) {
        bet = 0;
        betSide = "";
        resetButtons();
        resetSelection();
    };
    setText();
};

function selectSide(button) {
    if(button == headsBtn) {
        betSide = "heads";
        headsBtn.disabled = true;
        tailsBtn.disabled = false;
    } else if(button == tailsBtn) {
        betSide = "tails";
        tailsBtn.disabled = true;
        headsBtn.disabled = false;
    };

    setText();
};

function resetVals() {
    bet = 0;
    betSide = "";
    heads = 0;
    tails = 0;
    
    setVals();
};

function resetButtons() {
    flipBtn.disabled = false;
    headsBtn.disabled = false;
    tailsBtn.disabled = false;
    lockSwitch.checked = false;
    locked = false;
};

function selectBet(amt, button) {
    resetSelection();
    bet = amt;
    button.style.backgroundColor = "#AFAFAF";
    
    setText();
};

function resetSelection() {
    minBtn.style.backgroundColor = "#e1c841";
    meanBtn.style.backgroundColor = "#e1c841";
    maxBtn.style.backgroundColor = "#e1c841";
};

function flipCoin() {
    if(betSide && bet) {
        disableFlipButtons();
        let i = Math.floor(Math.random() * 2);
        coin.style.animation = "none";
        if(i){
            setTimeout(function(){
                coin.style.animation = "spin-heads 3s forwards";
            }, 100);
            heads++;
            if(betSide == "heads") {
                wonAmt += bet;
                setTimeout(function(){
                   infoTxt.textContent = `You win!`;
                   if(realFunds) {addFlip(true)};
                }, 2000);
            } else {
                wonAmt -= bet;
                setTimeout(function(){
                   infoTxt.textContent = `You lose...`;
                   if(realFunds) {addFlip(false)};
                }, 2000);
            }
        }
        else{
            setTimeout(function(){
                coin.style.animation = "spin-tails 3s forwards";
            }, 100);
            tails++;
            if(betSide == "tails") {
                wonAmt += bet;
                setTimeout(function(){
                   infoTxt.textContent = `You win!`;
                }, 2000);
            } else {
                wonAmt -= bet;
                setTimeout(function(){
                   infoTxt.textContent = `You lose...`;
                }, 2000);
            }
        }
        setTimeout(setVals, 3000);
    } else if(bet){
        alert("Please select a side.");
    } else if(betSide){
        alert("Please select a bet.");
    } else {
        alert("Please select a side and bet.");
    }
};

function disableFlipButtons(){
    flipBtn.disabled = true;
    simBtn.disabled = true;
    setTimeout(function(){
        flipBtn.disabled = false;
        simBtn.disabled = false;
    }, 3000);
};

lockSwitch.addEventListener("click", () => {
    if(locked) {locked = false;} else {locked = true};
});

headsBtn.addEventListener("click", () => {
    selectSide(headsBtn);
});

tailsBtn.addEventListener("click", () => {
    selectSide(tailsBtn);
});

minBtn.addEventListener("click", () => {
    selectBet(5, minBtn);
});

meanBtn.addEventListener("click", () => {
    selectBet(10, meanBtn);
});

maxBtn.addEventListener("click", () => {
    selectBet(20, maxBtn);
});

flipBtn.addEventListener("click", () => {
    flipCoin();
});

resetBtn.addEventListener("click",() => {
    coin.style.animation = "none";
    
    resetGame();
});

simBtn.addEventListener("click", () => {
    if(bet && betSide) {
        for (let i = 0; i < 100; i++) {
            flipCoin();
        }
    } else if(bet){
        alert("Please select a side.");
    } else if(betSide){
        alert("Please select a bet.");
    } else {
        alert("Please select a side and bet.");
    };
});
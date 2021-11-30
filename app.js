const inputChips = document.getElementById("chips");
const ruletNums = document.getElementById("rulet-body");
const mainMsg = document.getElementById("main-msg");
const handMsg = document.getElementById("hand");
const showBox = document.getElementById("show-box");


/** Buttons */ 
const btnStartGame = document.getElementById("btn-startGame");
const btnSpinGame = document.getElementById("btn-spinGame");


/** Config */
const width = 9;
const height = 4;

let numbers = 0;
let chips = 0;
let hand = 0;
let desiredNum;
let randomNumsShowInt = null; 

function randomShow(){
    randomNumsShowInt = setInterval(() => {
        showBox.innerText = Math.floor(Math.random() * 36);
    }, 20);
}

Messages.setMessage("Enter your chips", MessageType.INFO);

function startGame() {
    if(inputChips.value === ""){
        Messages.setMessage("CHIPS FIELD MUSH BE FILLED!", MessageType.ERROR);
        return;
    }
    
    document.getElementById("chips").disabled = true;
    Messages.setMessage("Place your bets now", MessageType.INFO);
    chips = inputChips.value;
    console.log(chips);

    helpers.enableButton('btn-spinGame');
    helpers.disableButton('btn-startGame');

    Roulette.startGame();
}

function onBtnSpinClick() {
    if(!Roulette.getHasGameStarted()) {
        Messages.setMessage("The game has not yet started", MessageType.ERROR)
        return;
    }else if(hand === 0){
        Messages.setMessage("Put some chips in order to spin", MessageType.ERROR);
        return;
    }

    randomShow();
    helpers.disableButton('btn-spinGame');
    Roulette.spin();    
}

function onSpinFinished(result) {
    clearInterval(randomNumsShowInt);

    const fieldNum = Roulette.getNumberAtField(`num-${result}`);
    if(fieldNum && fieldNum > 0) {
        const winAmount = fieldNum * 36;
        chips += winAmount;
        inputChips.value = chips;
        Messages.setMessage(`Congrats, you just won ${winAmount} chips!`, MessageType.SUCCESS);
        showBox.innerText = result;
    }else{
        Messages.setMessage(`You did not hit desired num whish was: ${result}`, MessageType.INFO);
        showBox.innerText = result;
    }
            
    console.log(`Desired num is: ${result}`);
    hand = 0;
    handMsg.innerHTML = 0;
    hasGameStarted = false;
    helpers.enableButton('btn-startGame');
    if(chips == 0) {
        document.getElementById("chips").disabled = false;
    }

    Roulette.endGame();
}

let numberRef = {};
Roulette.init(1500, onSpinFinished);
Roulette.createTable(width, height);
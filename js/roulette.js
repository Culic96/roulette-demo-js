var Roulette = {
    init: null,
    createTable: null,
    spin: null,
    getNumberAtField: null,
    startGame: null,
    endGame: null,
    getHasGameStarted: null
};

/**
 * Found info on namespaces here: 
 * https://stackoverflow.com/questions/29687794/javascript-call-functions-from-element-events-without-global-scope
 * 
 */

// Define namespace name
const NS_ROULETTE = 'ns_roulette';

(function(global) {
    let numbersMap = { };
    let onSpinFinshed = null;
    let spinDuration = 1000;
    let hasGameStarted = false;


    function startGame() {
        
        hasGameStarted = true;
    }

    function getHasGameStarted() { 
        
        return hasGameStarted;
    }

    function btnNumberClick(i) {
        if(!numbersMap[`num-${i}`]) {
            numbersMap[`num-${i}`] = 0;
        }

        if(inputChips.value < 1) {
            Messages.setMessage("Not enough chips!", MessageType.ERROR);
            return;
        }

        if(!hasGameStarted) {
            Messages.setMessage("The game has not started yet!");
           
            return  numbersMap[`num-${i}`] = 0;
        }

        Messages.setMessage("Click spin when you wish to test your luck", MessageType.INFO);

        numbersMap[`num-${i}`]++;
        hand++;
        handMsg.innerHTML = hand;
        chips--;
        inputChips.value = chips;

        // Update visual info as well
        const chipCounter = document.getElementById(`num-${i}`).getElementsByClassName("chip-counter")[0];
        chipCounter.innerText = numbersMap[`num-${i}`];
    }

    function genClickHandler(args) {
        return `onclick=${NS_ROULETTE}.btnNumberClick(${args})`;
    }

    function genButton(btnClass, btnClickHandler, text) {
        // let currChips = "";
        // if(numbersMap[`num-${text}`]) {
        //     currChips = numbersMap[`num-${text}`];
        // } else {
        //     currChips = 0;
        // }
        // <==>
        const currChips = `${numbersMap[`num-${text}`] ? numbersMap[`num-${text}`] : 0}`;

        const btnInner = `<div class="btn-chip-num">${text}</div><div class="chip-counter">${currChips}</div>`;
        return `<button ${btnClass} ${btnClickHandler}>${btnInner}</button>`;
    }

    function init(durationMS, onSpinFinishedCB) {
        spinDuration = durationMS;
        onSpinFinshed = onSpinFinishedCB;

        // Create globa namespace, for event handlers
        window[NS_ROULETTE] = {
            btnNumberClick // same as btnNumberClick: btnNumberClick
        };

        console.log(window[NS_ROULETTE]);
    }

    function createTable(width, height) {
        const nullNum = document.getElementById("num-0");
        let btnClassHtml = `class="btn btn-green"`;
        nullNum.innerHTML = genButton(btnClassHtml, genClickHandler(0),0); 
        for (let i = 1; i <= height; i++) {
            let rows = "<tr>";
            
            let columns = "";
            let currNumber = i;
            for(let j = 0; j < width; j++) {
                btnClassHtml = `class="btn btn-black"`;
                // Red fields
                if((i + j) % 2 != 0) {
                    btnClassHtml = `class="btn btn-red"`;
                }
        
                columns += `<td id=num-${currNumber}>${
                    genButton(btnClassHtml, 
                        genClickHandler(currNumber), 
                        currNumber)}</td>`;

                currNumber += height;
            }
        
            rows += columns;
            rows += "</tr>"
            
            ruletNums.innerHTML += rows;
        }
    }
    

    function spin() {
        setTimeout(() => {
            let result = Math.floor(Math.random() * 36);
            onSpinFinshed(result);
        }, spinDuration);
    }

    global.createTable = createTable;
    global.spin = spin;
    global.init = init;
    global.startGame = startGame;
    global.getHasGameStarted = getHasGameStarted;
    global.getNumberAtField = (fieldKey) => {
        return numbersMap[fieldKey];
    }
    global.endGame = () => {
        for(let i=0; i<=36; i++) {
            const chipCounter = document.getElementById(`num-${i}`).getElementsByClassName("chip-counter")[0];
            chipCounter.innerText = '0';
            numbersMap[`num-${i}`] = 0;
        }
        hasGameStarted = false;
    };
})(Roulette);
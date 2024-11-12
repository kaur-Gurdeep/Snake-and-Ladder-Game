let turn = 'red';
let stopEvent = false;
let redPosition = 1;  // Starting at 1
let bluePosition = 1;
let currentPlayer = 'Red';

// Constants
const boxSize = 9; // Each box is 9vmin
const maxColumns = 10; // 10 columns per row
const maxRows = 10; // 10 rows in total

// Initialize positions inside the grid (row 0, col 0)
document.querySelector('#red').style.marginLeft = '0vmin';  // Left margin of 0
document.querySelector('#red').style.marginBottom = `0vmin`;  // Bottom margin of 0

document.querySelector('#blue').style.marginLeft = '0vmin';  // Left margin of 0
document.querySelector('#blue').style.marginBottom = `0vmin`;  // Bottom margin of 0

boxNumbers();
updateTurnIndicator();

// Key press event for rolling the dice
document.addEventListener("keydown", async (e) => {
    if (e.keyCode == 83 && !stopEvent) { // 'S' key
        stopEvent = true;
        let diceNum = await roll();
        await new Promise(resolve => setTimeout(resolve, 400));
        await run(diceNum);
        await new Promise(resolve => setTimeout(resolve, 400));
        toggleTurn();
        stopEvent = false;
    }
});

// Main function to move player
async function run(diceNum) {
    for (let i = 1; i <= diceNum; i++) {
        // Move the current player
        if (turn === 'red') {
            redPosition++;
            await movePlayer(redPosition);
        } else {
            bluePosition++;
            await movePlayer(bluePosition);
        }
    }
}

async function movePlayer(position) {
    let player = document.querySelector(`#${turn}`);
    
    // Calculate row and column based on position
    let row = Math.floor((position - 1) / maxColumns);
    let col = (row % 2 === 0) ? (position - 1) % maxColumns : (maxColumns - 1) - ((position - 1) % maxColumns);

    // Set new position using `left` and `bottom` properties
    let newBottom = row * boxSize;
    let newLeft = col * boxSize;

    player.style.bottom = newBottom + 'vmin';
    player.style.left = newLeft + 'vmin';

    await new Promise(resolve => setTimeout(resolve, 400));
}


// Roll the dice and animate
function roll() {
    return new Promise(async (resolve) => {
        let diceNum = Math.floor(Math.random() * 6) + 1;
        let values = [[0, -360], [-180, -360], [-180, -270], [0, -90], [270, 180], [90, 90]];
        new Audio('dice-sound.mp3').play();
        document.querySelector('#cube_inner').style.transform = 'rotateX(360deg) rotateY(360deg)';
        await new Promise(resolve => setTimeout(resolve, 750));
        document.querySelector('#cube_inner').style.transform = `rotateX(${values[diceNum - 1][0]}deg) rotateY(${values[diceNum - 1][1]}deg)`;
        await new Promise(resolve => setTimeout(resolve, 750));
        resolve(diceNum);
    });
}

// Label each box
function boxNumbers() {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box, i) => {
        let row = Math.floor(i / maxColumns);
        let col = i % maxColumns;

        // Add numbers to boxes based on row and column positioning
        if (row % 2 === 0) {
            box.innerHTML = 100 - (row * maxColumns + col);
        } else {
            box.innerHTML = 100 - (row * maxColumns + (maxColumns - 1 - col));
        }
    });
}

// Toggle turn between players
function toggleTurn() {
    currentPlayer = currentPlayer === "Red" ? "Blue" : "Red";
    turn = turn === 'red' ? 'blue' : 'red';
    updateTurnIndicator();
}

// Update the turn indicator on screen
function updateTurnIndicator() {
    const turnIndicator = document.getElementById("turnIndicator");
    turnIndicator.textContent = `${currentPlayer} Player's Turn`;
    turnIndicator.style.color = currentPlayer === "Red" ? "#ff4d4d" : "#4d94ff";
}

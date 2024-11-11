// Variables
let turn = 'red';
let stopEvent = false;
let redPosition = 0;
let bluePosition = 0;
let totalBoxes = 100; // Number of boxes on the board
let currentPlayer = 'Red';

// Initialize positions
document.querySelector('#red').style.marginLeft = '0vmin';
document.querySelector('#red').style.marginTop = '0vmin';
document.querySelector('#blue').style.marginLeft = '0vmin';
document.querySelector('#blue').style.marginTop = '0vmin';
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
        let direction = getDirection();
        await move(direction);

        // Check if we need to move up after 10 moves
        if (i % 10 === 0) {
            await move('up'); // Move up after 10 horizontal moves
        }
    }
}
function getDirection() {
    let currentLeft = marginLeft();
    let currentTop = marginTop();

    const boxSize = 9; // Each box is 9vmin
    const maxColumns = 10;  // 10 columns (0 to 9) per row

    let row = Math.floor(currentTop / boxSize);  // 0-indexed row
    let col = Math.floor(currentLeft / boxSize); // 0-indexed column

    console.log("Row:", row, "Column:", col);

    // Check if we're at the last column
    if (col === maxColumns - 1) {
        console.log("Moving Up");
        return 'up';
    }

    // Check if we're at the first column and moving up
    if (col === 0 && row > 0) {
        console.log("Moving Up");
        return 'up';
    }

    // Determine direction based on row
    if (row % 2 === 0) { // Even row
        console.log("Moving Right");
        return 'right';
    } else { // Odd row
        console.log("Moving Left");
        return 'left';
    }
}
// // Get the direction the player needs to move
// function getDirection() {
//     let currentLeft = marginLeft();
//     let currentTop = marginTop();

//     const boxSize = 9; // Each box is 9vmin
//     const maxColumns = 10;  // 10 columns (0 to 9) per row

//     let row = Math.floor(currentTop / boxSize);  // 0-indexed row
//     let col = Math.floor(currentLeft / boxSize); // 0-indexed column

//     console.log("Row:", row, "Column:", col);

//     // Check if we're at the last column
//     if (col === maxColumns - 1) {
//         console.log("Moving Up");
//         return 'up';
//     }

//     if (row % 2 === 0) { // Even row
//         console.log("Moving Right");
//         return 'right';
//     } else { // Odd row
//         console.log("Moving Left");
//         return 'left';
//     }
// }

async function move(direction) {
    const boxSize = 9; // Each box is 9vmin

    if (direction === 'up' && marginTop() > 0) {
        document.querySelector(`#${turn}`).style.marginTop = (marginTop() - boxSize) + 'vmin';
    } else if (direction === 'right' && marginLeft() < (boxSize * 9)) { // Prevent overflow past the grid's right side
        document.querySelector(`#${turn}`).style.marginLeft = (marginLeft() + boxSize) + 'vmin';
    } else if (direction === 'left' && marginLeft() > 0) {
        document.querySelector(`#${turn}`).style.marginLeft = (marginLeft() - boxSize) + 'vmin';
    } else if (direction === 'up' && marginLeft() === (boxSize * 9)) { // Move up after reaching the last column
        document.querySelector(`#${turn}`).style.marginTop = (marginTop() - boxSize) + 'vmin';
        document.querySelector(`#${turn}`).style.marginLeft = (marginLeft()) + 'vmin'; // Stay in the same column
    }
    await new Promise(resolve => setTimeout(resolve, 400)); // Wait after each move
}

// Get current margin left value (current horizontal position of the player)
function marginLeft() {
    return Number(document.querySelector(`#${turn}`).style.marginLeft.split('v')[0]);
}

// Get current margin top value (current vertical position of the player)
function marginTop() {
    return Number(document.querySelector(`#${turn}`).style.marginTop.split('v')[0]);
}

// Roll the dice and animate the dice roll
function roll() {
    return new Promise(async (resolve) => {
        let diceNum = Math.floor(Math.random() * 6) + 1;
        let values = [[0, -360], [-180, -360], [-180, -270], [0, -90], [270, 180], [90, 90]]; // Dice rotations
        new Audio(`dice-sound.mp3`).play();
        document.querySelector('#cube_inner').style.transform = `rotateX(360deg) rotateY(360deg)`;
        await new Promise(resolve => setTimeout(resolve, 750));
        document.querySelector('#cube_inner').style.transform = `rotateX(${values[diceNum - 1][0]}deg) rotateY(${values[diceNum - 1][1]}deg)`;
        await new Promise(resolve => setTimeout(resolve, 750));
        resolve(diceNum);
    });
}

// Label each box with its number
function boxNumbers() {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box, i) => {
        let row = Math.floor(i / 10);
        let col = i % 10;

        if (row % 2 === 0) {
            box.innerHTML = 100 - (row * 10 + col);
        } else {
            box.innerHTML = 100 - (row * 10 + (9 - col));
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

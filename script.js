let turn = 'red';
let stopEvent = false;
// let redPosition = 0;
// let bluePosition = 0;
// let totalBoxes = 100; // Number of boxes on the board

document.querySelector('#red').style.marginLeft = '0vmin;';
document.querySelector('#red').style.marginTop = '0vmin;';
document.querySelector('#blue').style.marginLeft = '0vmin;';
document.querySelector('#blue').style.marginTop = '0vmin;';
boxNumbers();

document.addEventListener("keydown", async(e) => {   
    if (e.keyCode == 83 && !stopEvent){  // Check for 'S' key
        stopEvent = true;
        let diceNum = await roll();
        await new Promise(resolve => setTimeout(resolve, 400)); // before run
        await run(diceNum);
        await new Promise(resolve => setTimeout(resolve, 400)) //after run
        stopEvent = false;
    }
});

// function chnangeTurn(){

// }

function run(diceNum){
    return new Promise(async(resolve,reject) => {
        for(i=1; i<=diceNum; i++){
            let direction = getDirection();
            await move(direction);
        }
        resolve();
    });
}

function getDirection() {
    let currentLeft = marginLeft();
    let currentTop = marginTop();

    // 1. Move up if at the far-right end of an even row
    if (currentLeft >= 88 && Math.abs(currentTop % (-19.6)) < 0.1) {
        return 'up';
    }
    // 2. Move up if at the far-left end of an odd row
    else if (currentLeft <= 0 && Math.abs(currentTop % (-19.6)) > 0.1) {
        return 'up';
    }
    // 3. If on an even row (multiple of -19.6 top), move right
    else if (Math.abs(currentTop % (-19.6)) < 0.1) {
        return 'right';
    }
    // 4. If on an odd row, move left
    else {
        return 'left';
    }
}

function move(direction) {
    return new Promise(async (resolve) => {
        console.log('Direction:', direction);
        console.log('Current marginTop:', marginTop());
        
        if (direction === 'up' && marginTop() > 0) {
            console.log('Moving Up');
            document.querySelector(`#${turn}`).style.marginTop = String(marginTop() - 9) + 'vmin';
        } 
        else if (direction === 'right' && marginLeft() < 88) {
            console.log('Moving Right');
            document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() + 9) + 'vmin';
        } 
        else if (direction === 'left' && marginLeft() > 0) {
            console.log('Moving Left');
            document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() - 9) + 'vmin';
        }
        await new Promise(resolve => setTimeout(resolve, 400));
        resolve();
    });
}





// function move(direction){
//     return new Promise(async(resolve, reject) => {
//     // new Audio('dice-sound.mp3').play(); ////player move sound
//         if (direction === 'up') {
//             document.querySelector(`#${turn}`).style.marginTop = String(marginTop() - 9) + 'vmin';
//         } else if (direction === 'right') {
//             document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() + 9) + 'vmin';
//         } else if (direction === 'left') {
//             document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() - 9) + 'vmin';
//         }
//         await new Promise(resolve => setTimeout(resolve, 400));
//         resolve();
//     });
// }

// function getDirection(){
//     let direction;
//     if((marginLeft() == 88.2 && ((((marginTop()*10)%(-19.6*10))/10) == 0)) || (marginLeft()==0 && ((((marginTop()*10)%(-19.6*10))/10)!=0))){
//         direction = 'up'
//     }
//     else if((((marginTop()*10)%(-19.6*10))/10)==0){
//         direction = "right";
//     }
//     else{
//         direction = "left";
//     }
//     return direction;

// }



function marginLeft(){
    return Number(document.querySelector(`#${turn}`).style.marginLeft.split('v')[0])
}

function marginTop(){
    return Number(document.querySelector(`#${turn}`).style.marginTop.split('v')[0])

}
    function roll(){
        return new Promise(async(resolve, reject) => {
            let diceNum = Math.floor(Math.random() * 6) + 1;
            // let values = [[0, -360], [-100, -340], [-200, -320], [-300, -300], [-400, -280], [-500, -260]];
            let values = [[0, -360], [-180, -360], [-180, -270], [0, -90], [270, 180], [90, 90]];
            new Audio(`dice-sound.mp3`).play();
            document.querySelector('#cube_inner').style.transform = `rotateX(360deg) rotateY(360deg)`
            await new Promise(resolve => setTimeout(resolve, 750))
            document.querySelector('#cube_inner').style.transform = `rotateX(${values[diceNum-1][0]}deg) rotateY(${values[diceNum-1][1]}deg)`
            await new Promise(resolve => setTimeout(resolve, 750));
            resolve(diceNum);
        });
    }
    function boxNumbers() {
        // let boxes = document.querySelectorAll('.box');

        // boxes.forEach((box, i) => {
        //     if (String(i).length === 1 || (String(i).length === 2 && Number(String(i)[0]) % 2 === 0)) {
        //         box.innerHTML = 100 - i;
        //     } else {
        //         //  box.innerHTML = Number(`${9 - Number(String(i)[0])}${String(i)[1]}`) + 1;
        //         let firstDigit = Math.floor(i / 10);
        //         let secondDigit = i % 10;
        //         box.innerHTML = 9 - firstDigit + secondDigit + 1;
        //     }
        // });
        let boxes = document.querySelectorAll('.box');

    boxes.forEach((box, i) => {
        // Calculate row and column based on a 10x10 grid
        let row = Math.floor(i / 10);
        let col = i % 10;

        // Determine the direction (left-to-right or right-to-left) based on the row index
        if (row % 2 === 0) {
            box.innerHTML = 100 - (row * 10 + col);
        } else {
            box.innerHTML = 100 - (row * 10 + (9 - col));
        }
    });
    }



// // Sample JavaScript to switch turns
// let currentPlayer = "Red";

// function updateTurnIndicator() {
//     const turnIndicator = document.getElementById("turnIndicator");
//     turnIndicator.textContent = `${currentPlayer} Player's Turn`;
//     turnIndicator.style.color = currentPlayer === "Red" ? "#ff4d4d" : "#4d94ff"; // Update color for each player
// }

// function toggleTurn() {
//     currentPlayer = currentPlayer === "Red" ? "Blue" : "Red";
//     updateTurnIndicator();
// }

// // Call updateTurnIndicator initially to set the first player's turn
// updateTurnIndicator();

// Example: Call toggleTurn() to switch turns after each player moves

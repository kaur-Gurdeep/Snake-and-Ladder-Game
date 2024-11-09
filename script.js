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

function move(direction){
    return new Promise(async(resolve, reject) => {
    // new Audio('dice-sound.mp3').play(); ////player move sound
        if (direction === 'up') {
            document.querySelector(`#${turn}`).style.marginTop = String(marginTop() - 9.8) + 'vmin';
        } else if (direction === 'right') {
            document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() + 9.8) + 'vmin';
        } else if (direction === 'left') {
            document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() - 9.8) + 'vmin';
        }
        await new Promise(resolve => setTimeout(resolve, 400));
        resolve();
    });
}

function getDirection(){
    let direction;
    if((marginLeft() == 88.2 && ((((marginTop()*10)%(-19.6*10))/10) == 0)) || (marginLeft()==0 && ((((marginTop()*10)%(-19.6*10))/10)!=0))){
        direction = 'up'
    }
    else if((((marginTop()*10)%(-19.6*10))/10)==0){
        direction = "right";
    }
    else{
        direction = "left";
    }
    return direction;

}
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




// boxNumbers();

// document.addEventListener("keydown", (e) => {   
//     if (e.keyCode == 83) { // 'S' key has keycode 83
//         let diceNum = roll();
//     }
// });

// function roll() {
//     let diceNum = Math.floor(Math.random() * 6) + 1;
//     let values = [[0, -360], [-180, -360], [-180, -270], [0, -90], [270, 180], [90, 90]];

//     const audio = new Audio(`dice-sound.mp3`);
//     audio.play().catch(error => {
//         console.error("Audio playback failed:", error);
//     });
    
//     // Apply initial transform to reset
//     document.querySelector('#cube_inner').style.transform = `rotateX(360deg) rotateY(360deg)`;
    
//     // Set timeout to apply the new rotation after a brief delay for smoother animation
//    document.querySelector('#cube_inner').style.transform = `rotateX(${values[diceNum-1][0]}deg) rotateY(${values[diceNum-1][1]}deg)`
//     // setTimeout(() => {
//     //     document.querySelector('#cube_inner').style.transform = `rotateX(${values[diceNum - 1][0]}deg) rotateY(${values[diceNum - 1][1]}deg)`;
//     // }, 50);

//     return diceNum;
// }

// function boxNumbers() {
//     let boxes = document.querySelectorAll('.box');

//     boxes.forEach((box, i) => {
//         if (String(i).length === 1 || (String(i).length === 2 && Number(String(i)[0]) % 2 === 0)) {
//             box.innerHTML = 100 - i;
//         } else {
//             box.innerHTML = Number(`${9 - Number(String(i)[0])}${String(i)[1]}`) + 1;
//         }
//     });
// }

// let turn = 'red';
// let stopEvent = false;
// // let redPosition = 0;
// // let bluePosition = 0;
// // let totalBoxes = 100; // Number of boxes on the board

// document.querySelector('#red').style.marginLeft = '0vmin;';
// document.querySelector('#red').style.marginTop = '0vmin;';
// document.querySelector('#blue').style.marginLeft = '0vmin;';
// document.querySelector('#blue').style.marginTop = '0vmin;';
// boxNumbers();

// document.addEventListener("keydown", async(e) => {   
//     if (e.keyCode == 83 && !stopEvent){  // Check for 'S' key
//         stopEvent = true;
//         let diceNum = await roll();
//         await new Promise(resolve => setTimeout(resolve, 400)); // before run
//         await run(diceNum);
//         await new Promise(resolve => setTimeout(resolve, 400)) //after run
//         stopEvent = false;
//     }
// });

// // function chnangeTurn(){

// // }

// function run(diceNum){
//     return new Promise(async(resolve,reject) => {
//         for(i=1; i<=diceNum; i++){
//             let direction = getDirection();
//             await move(direction);
//         }
//         resolve();
//     });
// }

// function getDirection() {
//     let currentLeft = marginLeft();
//     let currentTop = marginTop();

//     // 1. Move up if at the far-right end of an even row
//     if (currentLeft >= 88 && Math.abs(currentTop % (-19.6)) < 0.1) {
//         return 'up';
//     }
//     // 2. Move up if at the far-left end of an odd row
//     else if (currentLeft <= 0 && Math.abs(currentTop % (-19.6)) > 0.1) {
//         return 'up';
//     }
//     // 3. If on an even row (multiple of -19.6 top), move right
//     else if (Math.abs(currentTop % (-19.6)) < 0.1) {
//         return 'right';
//     }
//     // 4. If on an odd row, move left
//     else {
//         return 'left';
//     }
// }

// function move(direction) {
//     return new Promise(async (resolve) => {
//         console.log('Direction:', direction);
//         console.log('Current marginTop:', marginTop());
        
//         if (direction === 'up' && marginTop() > 0) {
//             console.log('Moving Up');
//             document.querySelector(`#${turn}`).style.marginTop = String(marginTop() - 9) + 'vmin';
//         } 
//         else if (direction === 'right' && marginLeft() < 88) {
//             console.log('Moving Right');
//             document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() + 9) + 'vmin';
//         } 
//         else if (direction === 'left' && marginLeft() > 0) {
//             console.log('Moving Left');
//             document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() - 9) + 'vmin';
//         }
//         await new Promise(resolve => setTimeout(resolve, 400));
//         resolve();
//     });
// }





// // function move(direction){
// //     return new Promise(async(resolve, reject) => {
// //     // new Audio('dice-sound.mp3').play(); ////player move sound
// //         if (direction === 'up') {
// //             document.querySelector(`#${turn}`).style.marginTop = String(marginTop() - 9) + 'vmin';
// //         } else if (direction === 'right') {
// //             document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() + 9) + 'vmin';
// //         } else if (direction === 'left') {
// //             document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() - 9) + 'vmin';
// //         }
// //         await new Promise(resolve => setTimeout(resolve, 400));
// //         resolve();
// //     });
// // }

// // function getDirection(){
// //     let direction;
// //     if((marginLeft() == 88.2 && ((((marginTop()*10)%(-19.6*10))/10) == 0)) || (marginLeft()==0 && ((((marginTop()*10)%(-19.6*10))/10)!=0))){
// //         direction = 'up'
// //     }
// //     else if((((marginTop()*10)%(-19.6*10))/10)==0){
// //         direction = "right";
// //     }
// //     else{
// //         direction = "left";
// //     }
// //     return direction;

// // }



// function marginLeft(){
//     return Number(document.querySelector(`#${turn}`).style.marginLeft.split('v')[0])
// }

// function marginTop(){
//     return Number(document.querySelector(`#${turn}`).style.marginTop.split('v')[0])

// }
//     function roll(){
//         return new Promise(async(resolve, reject) => {
//             let diceNum = Math.floor(Math.random() * 6) + 1;
//             // let values = [[0, -360], [-100, -340], [-200, -320], [-300, -300], [-400, -280], [-500, -260]];
//             let values = [[0, -360], [-180, -360], [-180, -270], [0, -90], [270, 180], [90, 90]];
//             new Audio(`dice-sound.mp3`).play();
//             document.querySelector('#cube_inner').style.transform = `rotateX(360deg) rotateY(360deg)`
//             await new Promise(resolve => setTimeout(resolve, 750))
//             document.querySelector('#cube_inner').style.transform = `rotateX(${values[diceNum-1][0]}deg) rotateY(${values[diceNum-1][1]}deg)`
//             await new Promise(resolve => setTimeout(resolve, 750));
//             resolve(diceNum);
//         });
//     }
//     function boxNumbers() {
//         // let boxes = document.querySelectorAll('.box');

//         // boxes.forEach((box, i) => {
//         //     if (String(i).length === 1 || (String(i).length === 2 && Number(String(i)[0]) % 2 === 0)) {
//         //         box.innerHTML = 100 - i;
//         //     } else {
//         //         //  box.innerHTML = Number(`${9 - Number(String(i)[0])}${String(i)[1]}`) + 1;
//         //         let firstDigit = Math.floor(i / 10);
//         //         let secondDigit = i % 10;
//         //         box.innerHTML = 9 - firstDigit + secondDigit + 1;
//         //     }
//         // });
//         let boxes = document.querySelectorAll('.box');

//     boxes.forEach((box, i) => {
//         // Calculate row and column based on a 10x10 grid
//         let row = Math.floor(i / 10);
//         let col = i % 10;

//         // Determine the direction (left-to-right or right-to-left) based on the row index
//         if (row % 2 === 0) {
//             box.innerHTML = 100 - (row * 10 + col);
//         } else {
//             box.innerHTML = 100 - (row * 10 + (9 - col));
//         }
//     });
//     }



// // // Sample JavaScript to switch turns
// // let currentPlayer = "Red";

// // function updateTurnIndicator() {
// //     const turnIndicator = document.getElementById("turnIndicator");
// //     turnIndicator.textContent = `${currentPlayer} Player's Turn`;
// //     turnIndicator.style.color = currentPlayer === "Red" ? "#ff4d4d" : "#4d94ff"; // Update color for each player
// // }

// // function toggleTurn() {
// //     currentPlayer = currentPlayer === "Red" ? "Blue" : "Red";
// //     updateTurnIndicator();
// // }

// // // Call updateTurnIndicator initially to set the first player's turn
// // updateTurnIndicator();

// // Example: Call toggleTurn() to switch turns after each player moves




/* body {
  background-color: lightgrey;
  font-family: Arial, Helvetica, sans-serif;
}

#main {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 0.1vmin solid black;
  height: 98vmin;
  width: 98vmin;
}

.box {
  float: left;
  height: 9.601vmin;
  width: 9.601vmin;
  border: 0.1vmin solid black;
  text-align: center;
  line-height: 9.601vmin;
  font-size: 2.5vmin;
  background-color: #a9d18e;
}

#side {
  position: absolute;
  top: 1vmin;
  left: 1vmin;
  height: 25vmin;
  width: 35vmin;
  border: 0.2vmin solid black;
  background-color: white;
  text-align: center;
  font-size: 3.5vmin;
}

#cube_outer {
  height: 8vmin;
  width: 8vmin;
  perspective: 30vmin;
  margin: auto;
}

#cube_inner {
  height: 100%;
  width: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: all 0.75s linear;
}

#cube_inner div {
  height: 100%;
  width: 100%;
  position: absolute;




  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
#front { 
    transform: translateZ(4vmin); 
}
#back { 
    transform: rotateY(180deg) translateZ(4vmin); 
}
#left {
    transform: rotateY(-90deg) translateX(-4vmin);
    transform-origin: left; 
}
#right { 
    transform: rotateY(90deg) translateX(4vmin); 
    transform-origin: right;
}
#top { 
    transform: rotateX(-90deg) translateY(-4vmin); 
    transform-origin: top;
}
#bottom { 
    transform: rotateX(90deg) translateY(4vmin); 
    transform-origin: bottom;
}
img {
  height: 100.3%;
  width: 100.3%;
}
.players {
  position: absolute;
  top: 90vmin;
  left: 3vmin;
  height: 4vmin;
  width: 4vmin;
  border-radius: 50%;
  opacity: 0.7;
  transition-duration: 0.4s;
  transition-property: margin;
}

.players:nth-child(1) {
  background-color: red;
}
.players:nth-child(2) {
  background-color: blue;
}
#main img{
    position: absolute;
}
#l1{
    transform: scale(0.3) scaleX(0.6) scaleY(0.8) rotate(15deg);
    top: 34.3vmin;
    left: -29.5vmin;
}
#l2{
    transform: scale(0.3) scaleX(0.6) scaleY(0.8) rotate(15deg);
    top: 5vmin;
    left: 11vmin;
}
#s1{
    transform: scale(0.4) scaleY(0.8) rotate(341deg);
    top: -27vmin;
    left: -41vmin;
}
 */


body {
    background-color: lightgrey;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0;
    height: 100vh;
  }
  
  .game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background-color: bisque;
  }
  
  #gameBoard {
    background-color: #a59a9a;
    color: white;
    text-align: center;
    padding: 5px;
  }
  
  #turnIndicator {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff4d4d; /* Red color for the red player's turn */
  }
  /* #main {
    background-color: black;
    border: 2px solid black;
    max-width: 90vmin;
    width: 90vw;
    height: 90vw; /* Use 90vw for consistent square aspect ratio */
    /*max-height: 90vmin;
    margin: 5px auto;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0;
  } */
  
  #gameContainer {  
    position: relative;
    display: grid;
    grid-template-columns: repeat(10, 1fr); /* 10 columns */
    grid-template-rows: repeat(10, 1fr); /* 10 rows */
    max-width: 90vmin;
    width: 90vw;
    height: 90vw; 
    max-height: 90vmin;
    pointer-events: none; 
    overflow: hidden;
    margin: 5px auto;
  }
  
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(1vmin + 0.5rem);
    background-color: #4ca5dd;
    color: white;
    border: 0.1vmin solid black;
    box-sizing: border-box;
    transition: background-color 0.3s ease; /* Optional: Add hover effect */
  }
  
  .players {
    position: absolute;
    width: 5%;
    height: 5%;
    border-radius: 50%;
    opacity: 0.8;
    transition: transform 0.4s ease, margin 0.4s ease; 
    /* transition: transform 0.4s ease;  */
    /* bottom: 1vmin; 
    left: 1vmin;  */
    /* bottom: 2.8%;
    left: 2.9%; */
    transform: translate(50%, -50%);
  } 
  
  .players#red {
    background-color: red;
    bottom: 0;
    left: 0;
    
  }
  
  .players#blue {
    background-color: blue;
    bottom: 0;
    left: 0;
    
  }
  
  /* Dice and Player Turn Indicator */
  #side {
    position: relative;
    display: flex;
    height: 150px;
    width: 50%;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding: 1rem;
    border-radius: 1vmin;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: calc(1vmin + 1rem);
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 10px;
    margin-top: 20px;
  }
  
  #p_turn {
    font-weight: bold;
    margin-bottom: 1rem;
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
  
  /* Responsive Design */
  @media (min-width: 37.5em) /*600px / 16px = 37.5em*/ {
    body {
      height: 100vh;
    }
    .box {
      font-size: calc(0.8vmin + 0.5rem);
    }
    #side {
      background-color: gray;
      width: 30%;
      bottom: 1%;
      left: 50%;
      font-size: calc(1vmin + 0.5rem);
    }
    #players{
      position: absolute;
      transform: translate(50%, -50%);
    }
    .players#red {
      background-color: rgb(68, 152, 59);
      bottom: 0;
      left: 0;    
    }
    
    .players#blue {
      background-color: rgb(159, 40, 157);
      bottom: 0;
      left: 0;
      
    }
  }
  
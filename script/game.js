document.addEventListener('DOMContentLoaded', function () {
  // Initialize game settings
  initializeGameMode(gameMode);
  initializePlayers(playerData);
  boxNumbers();

  // DOM Elements
  const homeBtn = document.getElementById('homeBtn');
  const viewLadderBtn = document.getElementById('viewLadderBtn');
  const restartGameBtn = document.getElementById('restartGameBtn');
  const settingBtn = document.getElementById('settingBtn');
  const buttons = document.querySelectorAll('#closeBtn, #helpBtn, #volumeBtn');
  const volumeBtn = document.getElementById('volumeBtn');
  const modal = document.getElementById('winnerModal');
  let canShowModal = false; // Flag to track if the winner modal can be shown
  let isMuted = false; // Flag to track if audio is muted

  // Attach event listener to home button to redirect to homepage
  homeBtn.addEventListener('click', redirectToHome);

  // Attach event listener to home button to redirect to homepage
  viewLadderBtn.addEventListener('click', function () {
    showLadder();
    canShowModal = true;
  });

  // Restart game and disable modal display
  restartGameBtn.addEventListener('click', function () {
    restartGame();
    canShowModal = false;
  });

  // Toggle settings visibility (e.g., volume, help, close buttons)
  settingBtn.addEventListener('click', function () {
    buttons.forEach((button) => {
      button.classList.toggle('show');
    });
  });

  // Add click event listeners to close, help, and volume buttons
  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const targetId = e.target.id;
      if (targetId === 'closeBtn') {
        window.location.href = 'index.html';
      } else if (targetId === 'helpBtn') {
        openHelpModal();
      }
    });
  });

  volumeBtn.addEventListener('click', () => {
    isMuted = !isMuted; // Toggle mute state

    if (isMuted) {
      // Mute all sounds
      Object.values(sounds).forEach((sound) => {
        sound.muted = true;
      });
      volumeBtn.classList.add('muted'); // Add muted class to show visual feedback
    } else {
      // Unmute all sounds
      Object.values(sounds).forEach((sound) => {
        sound.muted = false;
      });
      volumeBtn.classList.remove('muted'); // Remove muted class
    }
    console.log('Muted state:', isMuted);
  });

  // Event listener to show the modal when clicked anywhere on the screen
  document.addEventListener('click', function (e) {
    if (
      modal.style.display === 'none' &&
      !e.target.closest('#winnerModal') &&
      canShowModal
    ) {
      showModal();
    }
  });
});

// Retrieve data from localStorage
const playerData = JSON.parse(localStorage.getItem('playerData') || '[]');
const playerCount = parseInt(localStorage.getItem('playerCount') || '0');
const colors = playerData.map((player) => player.color);
const gameMode = localStorage.getItem('gameMode') || 'default';
let playerPositions = {}; // Track player positions
let playersFinished = []; // Store players who finished the game
let stopEvent = false; // Stop further events (e.g., during animations)
let gameOver = false; // Flag to check if game has ended
let redPosition = 1; // Initial player positions
let bluePosition = 1;
let greenPosition = 1;
let yellowPosition = 1;
let snakesAndLadders = {}; // Store snakes and ladders based on selected mode

// Grid and player constants
const boxSize = 8; // Size of each box (grid cell)
const maxColumns = 10; // Number of columns in the grid
const maxRows = 10; // Number of rows in the grid
const allColors = ['red', 'blue', 'green', 'yellow']; // Allowed player colors
const playerColors = playerData.map((player) => player.color.toLowerCase());
let activePlayers = colors.slice(0, Math.min(playerCount, 4)); // Limit to 4 players

// Friendly Mode Snakes and Ladders positions
const friendlyModeSnakesAndLadders = {
  15: 8, // Snake: Head at 15, tail at 8
  28: 9,
  45: 27,
  70: 32,
  80: 42,
  87: 55,

  2: 39, // Ladder: Base at 2, top at 39
  4: 36,
  33: 68,
  38: 57,
  56: 97,
  62: 81,
  73: 94,
};
// Difficult Mode Snakes and Ladders positions
const difficultModeSnakesAndLadders = {
  15: 8, // Snake: Head at 15, tail at 8
  28: 9,
  39: 20,
  45: 27,
  70: 32,
  80: 42,
  87: 55,
  99: 4,
  91: 72,

  4: 36, // Ladder: Base at 4, top at 36
  33: 68,
  38: 57,
  56: 97,
  62: 81,
  73: 94,
};

// Sound effects for game actions
const sounds = {
  playerMove: new Audio('sounds/playerMove.wav'),
  snakeEncounter: new Audio('sounds/snakeEncounter.wav'),
  ladderEncounter: new Audio('sounds/ladderEncounter.wav'),
  diceRoll: new Audio('sounds/dice-sound.mp3'),
  gameOver: new Audio('sounds/winningSound.mp3'),
};

// Log initial game state for debugging
console.log('Player Data:', playerData);
console.log('Player Count:', playerCount);
console.log('Colors:', colors);
console.log('Game Mode:', gameMode);

document.addEventListener('keydown', async (e) => {
  if (gameOver || stopEvent) return;
  if (e.keyCode == 32 && !stopEvent && !gameOver) {
    // 'Space' key for rolling the dice
    stopEvent = true;
    if (activePlayers.includes(turn)) {
      let diceNum = await roll();
      await new Promise((resolve) => setTimeout(resolve, 400));
      await run(diceNum);
    }
  }
});

// Initialize game mode based on localStorage value
function initializeGameMode(mode) {
  if (mode === 'friendly') {
    snakesAndLadders = friendlyModeSnakesAndLadders;
    console.log(
      'Game Mode: friendly - Using friendly Mode Snakes and Ladders.'
    );

    // Show all ladders and hide some snakes
    for (let i = 1; i <= 7; i++) {
      document.getElementById('l' + i).style.display = 'block'; // Show all ladders
    }
    for (let i = 1; i <= 7; i++) {
      // Display fewer snakes in friendly mode
      document.getElementById('s' + i).style.display = 'block';
    }
    for (let i = 8; i <= 9; i++) {
      // Hide remaining snakes in friendly mode
      document.getElementById('s' + i).style.display = 'none';
    }
  } else if (mode === 'difficult') {
    snakesAndLadders = difficultModeSnakesAndLadders;
    console.log(
      'Game Mode: Difficult - Using Difficult Mode Snakes and Ladders.'
    );

    // Show few ladders
    for (let i = 1; i <= 6; i++) {
      document.getElementById('l' + i).style.display = 'block'; // Show all ladders
    }
    for (let i = 7; i <= 7; i++) {
      // Hide remaining ladders in difficult mode
      document.getElementById('l' + i).style.display = 'none';
    }
    for (let i = 1; i <= 9; i++) {
      // Show all snakes
      document.getElementById('s' + i).style.display = 'block';
    }
  } else {
    console.warn('Game Mode not recognized. Defaulting to friendly Mode.');
    snakesAndLadders = friendlyModeSnakesAndLadders; // Default to friendly

    // Show all ladders and hide some snakes
    for (let i = 1; i <= 7; i++) {
      document.getElementById('l' + i).style.display = 'block'; // Show all ladders
    }
    for (let i = 1; i <= 7; i++) {
      // Display fewer snakes in friendly mode (show only 4)
      document.getElementById('s' + i).style.display = 'block';
    }
    for (let i = 8; i <= 9; i++) {
      // Hide remaining snakes in friendly mode
      document.getElementById('s' + i).style.display = 'none';
    }
  }
}

function initializePlayers(playerData) {
  // Ensure the playerData has the correct structure
  if (!Array.isArray(playerData) || playerData.length === 0) {
    console.warn('No player data found');
    return;
  }
  // Initialize playerPositions
  playerData.forEach((player) => {
    playerPositions[player.color] = 1; // Start all players at position 1
  });

  // Check if there is already an AI player
  const aiExists = playerData.some((player) => player.isAI);

  // If only one player exists, let AI choose a random color from the remaining colors
  if (playerCount === 1 && !aiExists) {
    const remainingColors = allColors.filter(
      (color) => !playerColors.includes(color)
    );
    const aiColor =
      remainingColors[Math.floor(Math.random() * remainingColors.length)];
    playerColors.push(aiColor);
    playerData.push({ name: 'AI', color: aiColor, isAI: true }); // Flag the AI
  }
  console.log('Initializing Players with Colors:', playerColors);
  allColors.forEach((color) => {
    const playerElement = document.querySelector(`#${color}`);
    if (playerElement) {
      playerElement.style.display = playerColors.includes(color)
        ? 'block'
        : 'none';
    } else {
      console.warn(`Element with ID #${color} not found!`);
    }
  });
  activePlayers = playerColors;
  turn = activePlayers[0] || null;
  updateTurnIndicator(turn);
}

function updateTurnIndicator(turn) {
  const currentPlayer = playerData.find(
    (player) => player.color.toLowerCase() === turn
  );
  const turnDisplay = document.getElementById('turnIndicator');

  // Update the element if it exists
  if (turnDisplay) {
    if (currentPlayer) {
      turnDisplay.textContent = `${currentPlayer.name.toUpperCase()}'s turn`;
      turnDisplay.style.color = currentPlayer.color; // Set text color to the player's color
    } else {
      turnDisplay.textContent = 'Mr. AI';
      turnDisplay.style.color = turn; // Reset to default color
    }
  } else {
    console.warn('Element with ID #turnIndicator not found!');
  }
}

async function run(diceNum) {
  if (gameOver) return;

  let currentPosition = getCurrentPosition(turn);
  let targetPosition = currentPosition + diceNum;

  console.log(
    `Current Position: ${currentPosition}, Target Position: ${targetPosition}`
  );

  // Check for overshooting the target
  if (targetPosition > 100) {
    stopEvent = false;
    toggleTurn();
    return;
  }

  // Move the player step by step
  for (let i = 1; i <= diceNum; i++) {
    if (gameOver) return;

    currentPosition++;
    console.log(`Moving player to position: ${currentPosition}`);
    await movePlayer(currentPosition);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Delay between moves
  }

  updatePlayerPosition(turn, currentPosition);

  // Extra roll on 6
  if (diceNum === 6 && !gameOver) {
    showMessage(`${turn.toUpperCase()} gets an extra roll!`);
    let extraDiceNum = await roll();
    await run(extraDiceNum);
    return;
  }

  await checkLaddersAndSnakes();

  // Handle reaching position 100
  if (currentPosition === 100 && !playersFinished.includes(turn)) {
    playersFinished.push(turn);
    activePlayers = activePlayers.filter((player) => player !== turn);

    if (activePlayers.length <= 1) {
      if (activePlayers.length === 1) {
        playersFinished.push(activePlayers[0]); // Add last player
      }
      stopEvent = true;
      gameOver = true;
      showWinnerModal();
      return;
    }
  }

  stopEvent = false;
  toggleTurn();
}

async function movePlayer(position) {
  if (gameOver) return;

  let player = document.querySelector(`#${turn}`);

  if (player.style.display === 'none' || player.style.visibility === 'hidden') {
    return;
  }

  // Play move sound on each step
  sounds.playerMove.currentTime = 0; // Reset sound to play again immediately
  sounds.playerMove.play();

  let row = Math.floor((position - 1) / maxColumns);
  let col = (position - 1) % maxColumns;

  // Adjust for zigzag layout
  if (row % 2 !== 0) {
    col = maxColumns - 1 - col;
  }

  let newBottom = row * boxSize;
  let newLeft = col * boxSize;

  player.style.bottom = newBottom + 'vmin';
  player.style.left = newLeft + 'vmin';

  // Logging the player’s new position
  console.log(`Player ${turn} moved to [${newBottom}, ${newLeft}]`);

  await new Promise((resolve) => setTimeout(resolve, 20)); // Animation delay

  // Check if player reached the end
  if (position === 100 && !playersFinished.includes(turn)) {
    playersFinished.push(turn);
    activePlayers = activePlayers.filter((player) => player !== turn);

    if (activePlayers.length <= 1) {
      if (activePlayers.length === 1) {
        playersFinished.push(activePlayers[0]);
      }
      gameOver = true;
      showWinnerModal();
      return;
    }
  }
}

function getCurrentPosition(turn) {
  switch (turn) {
    case 'red':
      return redPosition;
    case 'blue':
      return bluePosition;
    case 'green':
      return greenPosition;
    case 'yellow':
      return yellowPosition;
    default:
      return 1; // Default starting position
  }
}

function updatePlayerPosition(turn, position) {
  switch (turn) {
    case 'red':
      redPosition = position;
      playerPositions['red'] = position;
      break;
    case 'blue':
      bluePosition = position;
      playerPositions['blue'] = position;
      break;
    case 'green':
      greenPosition = position;
      playerPositions['green'] = position;
      break;
    case 'yellow':
      yellowPosition = position;
      playerPositions['yellow'] = position;
      break;
  }
}

async function checkLaddersAndSnakes() {
  let position;
  // Check which player's position to update
  if (turn === 'red') {
    position = redPosition;
  } else if (turn === 'blue') {
    position = bluePosition;
  } else if (turn === 'green') {
    position = greenPosition;
  } else if (turn === 'yellow') {
    position = yellowPosition;
  }

  // Check if the current position is a snake or ladder
  if (snakesAndLadders[position]) {
    let newPosition = snakesAndLadders[position];

    // If it's a snake (downward movement)
    if (newPosition < position) {
      sounds.snakeEncounter.play();
      showMessage('SORRY...');
    }
    // If it's a ladder (upward movement)
    else {
      sounds.ladderEncounter.play();
      showMessage('COOL...');
    }

    // Move the player to the new position (snake or ladder)
    if (turn === 'red') {
      redPosition = newPosition;
    } else if (turn === 'blue') {
      bluePosition = newPosition;
    } else if (turn === 'green') {
      greenPosition = newPosition;
    } else if (turn === 'yellow') {
      yellowPosition = newPosition;
    }

    // Update the player's position on the board
    await movePlayer(newPosition);
  }
}

// Roll the dice and animate
async function roll() {
  if (gameOver) return 0;
  return new Promise(async (resolve) => {
    let diceNum = Math.floor(Math.random() * 6) + 1;
    let values = [
      [0, -360],
      [-180, -360],
      [-180, -270],
      [0, -90],
      [270, 180],
      [90, 90],
    ];
    sounds.diceRoll.play();
    document.querySelector('#cube_inner').style.transform =
      'rotateX(360deg) rotateY(360deg)';
    await new Promise((resolve) => setTimeout(resolve, 750));
    document.querySelector('#cube_inner').style.transform = `rotateX(${
      values[diceNum - 1][0]
    }deg) rotateY(${values[diceNum - 1][1]}deg)`;
    await new Promise((resolve) => setTimeout(resolve, 750));
    resolve(diceNum);
  });
}

// Label each box in the grid
function boxNumbers() {
  let boxes = document.querySelectorAll('.box');
  boxes.forEach((box, i) => {
    let row = Math.floor(i / maxColumns);
    let col = i % maxColumns;

    // Add numbers to boxes based on row and column positioning
    if (row % 2 === 0) {
      // For even rows (0, 2, 4, ...) fill left to right
      box.innerHTML = 100 - (row * maxColumns + col);
    } else {
      // For odd rows (1, 3, 5, ...) fill right to left
      box.innerHTML = 100 - (row * maxColumns + (maxColumns - 1 - col));
    }
  });
}

function toggleTurn() {
  // Switch turn
  const currentIndex = activePlayers.indexOf(turn);
  const nextIndex = (currentIndex + 1) % activePlayers.length;

  // Set the next turn
  turn = activePlayers[nextIndex];

  // Update the UI for the turn indicator
  updateTurnIndicator(turn);

  // Check if the next turn belongs to AI
  const currentPlayer = playerData.find(
    (player) => player.color.toLowerCase() === turn
  );

  // Handle AI's turn automatically
  if (currentPlayer && currentPlayer.isAI) {
    aiTurn(); // Call AI's turn logic
  } else {
    stopEvent = false; // Allow human player to take their turn
  }
}

// AI Turn Logic
async function aiTurn() {
  if (!stopEvent) {
    // Prevent multiple AI actions
    stopEvent = true;
    showMessage('AI is thinking...');
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for realism

    let diceNum = await roll(); // Roll dice for AI
    await new Promise((resolve) => setTimeout(resolve, 400)); // Wait for dice animation
    await run(diceNum); // Move AI player

    stopEvent = false; // Reset to allow the next player's turn
  }
}

//Function to update the message on the grid
function showMessage(message) {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.innerText = message;
  messageContainer.style.visibility = 'visible';

  // Hide the message after 2 seconds
  setTimeout(() => {
    messageContainer.style.visibility = 'hidden';
  }, 2000);
}

function showWinnerModal() {
  gameOver = true;
  const modal = document.getElementById('winnerModal');
  const winnerList = document.getElementById('winnerList');
  winnerList.innerHTML = '';

  sounds.gameOver.play();

  const rankings = playersFinished.map((player, index) => {
    let position = index + 1;
    let suffix =
      position === 1
        ? 'st'
        : position === 2
        ? 'nd'
        : position === 3
        ? 'rd'
        : 'th';
    return `${position}${suffix}: ${player.toUpperCase()}`;
  });

  rankings.forEach((rank) => {
    const li = document.createElement('li');
    li.textContent = rank;
    winnerList.appendChild(li);
  });
  modal.style.display = 'flex';
}

function redirectToHome() {
  window.location.href = 'design.html';
  hideModal();
}

function showLadder() {
  hideModal();
}

async function restartGame() {
  // Pause and reset sounds
  sounds.gameOver.pause();
  sounds.gameOver.currentTime = 0;
  hideModal();

  // Reset the game-over flag and stop event flag
  gameOver = false;
  stopEvent = false;

  // Reset player positions (clear out any old data)
  activePlayers = []; // Clear active players to prevent duplication
  playersFinished = []; // Clear finished players list
  playerPositions = {}; // Clear player positions
  redPosition = bluePosition = greenPosition = yellowPosition = 1;

  // Initialize active players again based on playerCount
  activePlayers = colors.slice(0, Math.min(playerCount, 4)); // Ensure it's limited to the right number of players

  // Initialize player positions for all active players
  activePlayers.forEach((color) => {
    playerPositions[color] = 1; // Reset each player's position to 1
  });

  // Reset UI positions for each player
  allColors.forEach((color) => {
    const playerElement = document.querySelector(`#${color}`);
    if (playerElement) {
      playerElement.style.left = '0vmin';
      playerElement.style.bottom = '0vmin';
    }
  });

  // Reset any turn display UI elements
  const turnDisplay = document.getElementById('turnIndicator');
  if (turnDisplay) {
    turnDisplay.textContent = 'Starting new game...';
    turnDisplay.style.color = 'black';
  }

  // Ensure turn is set to the first player in activePlayers
  turn = playerColors[0]; // Reset to the first player in the activePlayers list

  // Reinitialize any game-related settings and modes
  initializeGameMode(gameMode); // Ensure game mode is set correctly
  initializePlayers(playerData); // Ensure player data is re-initialized correctly

  // Debugging - Log to ensure the active players are correctly reset
  console.log('Game has been restarted!');
  console.log('Active Players:', activePlayers);
  console.log('Player Positions:', playerPositions);
  console.log('Players Finished:', playersFinished);
}

function hideModal() {
  const modal = document.getElementById('winnerModal');
  modal.style.display = 'none';
}
function showModal() {
  const modal = document.getElementById('winnerModal');
  modal.style.display = 'block';
}

const helpModal = document.getElementById('helpModal');
const closeHelpBtn = document.getElementById('closeHelpBtn');

// Function to open the Help Modal
function openHelpModal() {
  helpModal.style.display = 'block';
}

closeHelpBtn.addEventListener('click', () => {
  helpModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === helpModal) {
    helpModal.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ////////////////////// DOM elements //////////////////////
  const mainContainer = document.querySelectorAll('.main-container');
  const volumeBtn = document.getElementById('volume-btn');
  const backgroundMusic = document.getElementById('background-music');
  const cancelBtn = document.getElementById('cancel-btn');
  const infoBtn = document.getElementById('info-btn');
  const playButton = document.getElementById('play-btn');
  const infoScreenModal = document.getElementById('infoScreenModal');
  const gameModeModal = document.getElementById('gameModeModal');
  const heading = document.getElementById('heading');
  const banner = document.getElementById('banner');
  const difficultOption = document.getElementById('difficultOption');
  const playerOptions = document.querySelectorAll('.player-option');
  const playerHeading = document.getElementById('player-heading');
  const backButton = document.getElementById('back-btn');
  const playerDetails = document.getElementById('player-details');
  const playersContainer = document.getElementById('players-container');
  const startGameBtn = document.getElementById('startGameBtn');
  const selectionContainer = document.getElementById('selection-container');

  ////////////////////// Variables //////////////////////
  const colors = ['Red', 'Blue', 'Green', 'Yellow'];
  let gameMode = null;
  let scale = 1;
  let direction = 1;
  // Retrieve the saved music state from localStorage or default to 'off'
  const musicState = localStorage.getItem('musicState') || 'off';

  ////////////////////// Functions //////////////////////
  function initializeGame() {
    document.getElementById('gameModeModal').style.display = 'none';
    banner.style.display = 'block';
    playButton.style.display = 'block';
    heading.style.display = 'block';
    cancelBtn.style.display = 'none';
    playerDetails.style.display = 'none';
    selectionContainer.style.display = 'none';
    playersContainer.innerHTML = '';
    startGameBtn.disabled = true;
    gameMode = null;
    // Reset player options
    playerOptions.forEach((option) => {
      option.style.display = 'block'; // Make sure player options are visible again
    });
  }

  // FOR ANIMATION
  function animateBanner() {
    scale += 0.001 * direction; // Increment scale
    if (scale >= 1.1 || scale <= 1) direction *= -1; // Reverse direction at limits
    document.getElementById('banner').style.transform = `scale(${scale})`;
    document.getElementById('play-btn').style.transform = `scale(${scale})`;
    requestAnimationFrame(animateBanner); // Call again for smooth animation
  }

  function playGame(e) {
    e.preventDefault();
    banner.style.display = 'none';
    playButton.style.display = 'none';
    heading.style.display = 'none';
    cancelBtn.style.display = 'block';
    document.getElementById('gameModeModal').style.display = 'block';
  }

  function setupPlayerSelection() {
    document.getElementById('gameModeModal').style.display = 'none';
    selectionContainer.style.display = 'block';
    playerHeading.textContent =
      gameMode === 'friendly'
        ? 'Select Friendly Mode Players'
        : 'Select Difficult Mode Players';

    playerHeading.style.display = 'block';
    playerOptions.forEach((option) => {
      option.style.display = 'block'; // Reset player options
    });
  }

  ////////////////////// Event Listeners //////////////////////
  volumeBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      volumeBtn.classList.add('muted');
      localStorage.setItem('musicState', 'on');
    } else {
      backgroundMusic.pause();
      volumeBtn.classList.remove('muted');
      localStorage.setItem('musicState', 'off');
    }
  });

  // Add the event listener to both the banner and the play button
  banner.addEventListener('click', playGame);
  playButton.addEventListener('click', playGame);

  // Handle friendly mode selection
  friendlyOption.addEventListener('click', () => {
    gameMode = 'friendly';
    setupPlayerSelection();
  });

  // Handle difficult mode selection
  difficultOption.addEventListener('click', () => {
    gameMode = 'difficult';
    setupPlayerSelection();
  });

  // Handle player options selection
  playerOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const playerCount = parseInt(option.getAttribute('data-players'));

      // Hide the player options once a selection is made
      playerOptions.forEach((option) => (option.style.display = 'none'));

      playerHeading.textContent = `Enter Details for ${playerCount} Player${
        playerCount > 1 ? 's' : ''
      }`;

      playerHeading.style.display = 'block';
      playersContainer.innerHTML = ''; // Clear the players container

      // Generate player input fields dynamically
      for (let i = 1; i <= playerCount; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-input');
        playerDiv.innerHTML = `
            <div class="player-name-field">
              <label for="player-name-${i}">Player ${i} Name:</label>
              <input type="text" class="player-name" id="player-name-${i}" placeholder="Enter Name">
            </div>
            <div class="player-color-field">
              <label for="player-color-${i}">Choose Color:</label>
              <select class="player-color" id="player-color-${i}">
                ${colors
                  .map((color) => `<option value="${color}">${color}</option>`)
                  .join('')}
              </select>
            </div>`;
        playersContainer.appendChild(playerDiv);
      }

      // Show the player details section
      playerDetails.style.display = 'block';

      // Enable/disable start button based on inputs
      const checkAllNamesFilled = () => {
        const allNamesFilled = Array.from(
          playersContainer.querySelectorAll('.player-name')
        ).every((input) => input.value.trim() !== '');
        startGameBtn.disabled = !allNamesFilled || !areColorsUnique();
      };

      const areColorsUnique = () => {
        const colorSelections = Array.from(
          playersContainer.querySelectorAll('.player-color')
        ).map((select) => select.value);
        return new Set(colorSelections).size === colorSelections.length;
      };

      playersContainer.addEventListener('input', checkAllNamesFilled);
      checkAllNamesFilled();
    });
  });
  //Info Modal
  infoBtn.addEventListener('click', () => {
    infoScreenModal.classList.add('show');
    infoScreenModal.style.display = 'block'; // Make modal visible
    document.body.classList.add('modal-open'); // Prevent background scrolling
  });

  // Hide modal on close button click or outside modal click
  infoScreenModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-close') || e.target === modal) {
      infoScreenModal.classList.remove('show');
      infoScreenModal.style.display = 'none'; // Hide modal
      document.body.classList.remove('modal-open');
    }
  });

  volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('muted');
  });

  // Cancel button to reset the game
  cancelBtn.addEventListener('click', initializeGame);

  // Start game logic
  startGameBtn.addEventListener('click', () => {
    const playerData = [];
    const playerInputs = playersContainer.querySelectorAll('.player-input');

    playerInputs.forEach((playerDiv) => {
      const name = playerDiv.querySelector('.player-name').value;
      const color = playerDiv.querySelector('.player-color').value;
      playerData.push({ name, color });
    });
    const playerCount = playerInputs.length;
    // Save data in localStorage
    localStorage.setItem('playerData', JSON.stringify(playerData));
    localStorage.setItem('playerCount', playerCount);
    localStorage.setItem('colors', JSON.stringify(colors));
    localStorage.setItem('gameMode', gameMode);
    // Redirect to the next page
    window.location.href = 'game.html';
  });

  // Initialize game on page load
  initializeGame();
  animateBanner();
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 10;
    const squareSize = canvas.width / gridSize;
    let cellNumber = 100;

    const snakeImg = new Image();
    const ladderImage = new Image();
    snakeImg.src = 'images/snake.svg';


    // Ensure the image is loaded before drawing
    snakeImg.onload = () => {
        drawGrid(); // Draw the grid
        drawSnake([95, 75]);// Example start and end cells for the snake
        // drawSnake([33, 43, 53, 63]);
        // drawSnake([43, 53, 63, 73]);
    };

    function drawGrid() {
        // Reset the cell number for each call
        cellNumber = 100; 
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = col * squareSize;
                const y = row * squareSize;

                ctx.fillStyle = (row + col) % 2 === 0 ? '#e5e5e5' : '#ffffff';
                ctx.fillRect(x, y, squareSize, squareSize);

                const displayNumber = row % 2 === 0
                    ? cellNumber - col
                    : cellNumber - (gridSize - 1 - col);

                ctx.fillStyle = '#000';
                ctx.font = '16px Arial';
                ctx.fillText(displayNumber, x + squareSize / 2 - 8, y + squareSize / 2 + 8);
            }
            cellNumber -= gridSize;
        }
    }

    function drawSnake(snakeCells) {
        // Calculate the height of each segment of the snake image to fit within the cells
        const segmentHeight = snakeImg.height / snakeCells.length;
        
        // Loop through each cell in the snakeCells array to draw a segment of the snake
        snakeCells.forEach((cell, index) => {
            const { x, y } = getCellPosition(cell); // Get cell position
            ctx.drawImage(
                snakeImg, // Source image
                0, index * segmentHeight, // Source x, y (cropped part of the snake image)
                snakeImg.width, segmentHeight, // Source width, height
                x, y, // Destination x, y on the canvas
                squareSize, squareSize // Destination width, height on the canvas
            );
        });
    }

    function getCellPosition(cell) {
        const col = cell % gridSize; // Calculate the column based on the cell number
        const row = Math.floor(cell / gridSize); // Calculate the row based on the cell number
        const x = col * squareSize; // Calculate the top-left x position of the cell
        const y = row * squareSize; // Calculate the top-left y position of the cell
        return { x, y }; // Return the position
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 10;
    const squareSize = canvas.width / gridSize;

    const snakeImg = new Image();
    snakeImg.src = './images/snake.svg';

    snakeImg.onload = () => {
        console.log("Image loaded");
        drawGrid();
        drawSnake(65, 96); // Example: Draw snake from cell 95 to 75
    };

    function drawGrid() {
        cellNumber = 100; // Reset cell number for each call
    
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = col * squareSize;
                const y = row * squareSize;
    
                // Fill the cell with alternating colors
                ctx.fillStyle = (row + col) % 2 === 0 ? '#e5e5e5' : '#ffffff';
                ctx.fillRect(x, y, squareSize, squareSize);
    
                // Draw grid lines (borders) for each cell
                ctx.strokeStyle = '#000';  // Color of the grid lines (black)
                ctx.lineWidth = 1;         // Width of the grid lines
                ctx.strokeRect(x, y, squareSize, squareSize);
    
                // Display the cell number
                const displayNumber = row % 2 === 0
                    ? cellNumber - col
                    : cellNumber - (gridSize - 1 - col);
    
                ctx.fillStyle = '#000';
                ctx.font = '16px Arial';
                ctx.fillText(displayNumber, x + squareSize / 2 - 8, y + squareSize / 2 + 8);
            }
            cellNumber -= gridSize;
        }
    }

    function drawSnake(startCell, endCell) {
        const startPosition = getCellPosition(startCell);
        const endPosition = getCellPosition(endCell);

        // Calculate width and height based on cell span
        const width = Math.abs(startPosition.x - endPosition.x) + squareSize;
        const height = Math.abs(startPosition.y - endPosition.y) + squareSize;

        // Draw the snake image stretched across the desired cells
        ctx.drawImage(snakeImg, startPosition.x, startPosition.y, width, height);
    }

    function getCellPosition(cell) {
        const col = cell % gridSize;
        const row = Math.floor(cell / gridSize);
        const x = col * squareSize;
        const y = row * squareSize;
        return { x, y };
    }
});




// document.addEventListener("DOMContentLoaded", () => {
//     const canvas = document.getElementById('gameCanvas');
//     const ctx = canvas.getContext('2d');
//     const gridSize = 10;
//     const squareSize = canvas.width / gridSize;
//     let cellNumber = 100;

//     const snakeImg = new Image();
//     const ladderImg = new Image();
//     snakeImg.src = 'images/snake.svg'; // Path to your snake image
//     ladderImg.src = 'images/snake.svg'; // Path to your ladder image

//     // Ensure images are loaded before drawing
//     let imagesLoaded = 0;
//     const totalImages = 2;

//     snakeImg.onload = ladderImg.onload = () => {
//         imagesLoaded++;
//         if (imagesLoaded === totalImages) {
//             drawGrid();
//             drawSnake(95, 75); // Example snake from cell 95 to 75
//             drawLadder(10, 30); // Example ladder from cell 10 to 30
//         }
//     };

//     function drawGrid() {
//         cellNumber = 100; // Reset cell number for each call
//         for (let row = 0; row < gridSize; row++) {
//             for (let col = 0; col < gridSize; col++) {
//                 const x = col * squareSize;
//                 const y = row * squareSize;

//                 ctx.fillStyle = (row + col) % 2 === 0 ? '#e5e5e5' : '#ffffff';
//                 ctx.fillRect(x, y, squareSize, squareSize);

//                 const displayNumber = row % 2 === 0
//                     ? cellNumber - col
//                     : cellNumber - (gridSize - 1 - col);

//                 ctx.fillStyle = '#000';
//                 ctx.font = '16px Arial';
//                 ctx.fillText(displayNumber, x + squareSize / 2 - 8, y + squareSize / 2 + 8);
//             }
//             cellNumber -= gridSize;
//         }
//     }

//     // function drawSnake(startCell, endCell) {
//     //     const { x, y } = getCellPosition(startCell);
//     //     ctx.drawImage(snakeImg, x, y, squareSize, squareSize);
//     // }

//     // function drawLadder(startCell, endCell) {
//     //     const { x, y } = getCellPosition(startCell);
//     //     ctx.drawImage(ladderImg, x, y, squareSize, squareSize);
//     // }

//     // function getCellPosition(cell) {
//     //     const col = cell % gridSize;
//     //     const row = Math.floor(cell / gridSize);
//     //     const x = col * squareSize;
//     //     const y = row * squareSize;
//     //     return { x, y };
//     // }
//     function drawSnake(startCell, endCell) {
//         const startPosition = getCellPosition(startCell);
//         const endPosition = getCellPosition(endCell);
    
//         // Calculate the distance between the two positions
//         const dx = endPosition.x - startPosition.x;
//         const dy = endPosition.y - startPosition.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
    
//         // Calculate the angle to rotate the snake image
//         const angle = Math.atan2(dy, dx);
    
//         // Save the current canvas state
//         ctx.save();
//         ctx.translate(startPosition.x, startPosition.y);
//         ctx.rotate(angle);
    
//         // Draw the snake image stretched across the distance between start and end cells
//         ctx.drawImage(snakeImg, 0, 0, distance, squareSize);
    
//         // Restore the canvas state
//         ctx.restore();
//     }

//     function drawLadder(startCell, endCell) {
//         const startPosition = getCellPosition(startCell);
//         const endPosition = getCellPosition(endCell);
    
//         // Calculate the difference between start and end positions
//         const dx = (endPosition.x - startPosition.x) / gridSize;
//         const dy = (endPosition.y - startPosition.y) / gridSize;
    
//         // Draw the ladder along the path
//         for (let i = 0; i <= gridSize; i++) {
//             const x = startPosition.x + dx * i;
//             const y = startPosition.y + dy * i;
//             ctx.drawImage(ladderImg, x, y, squareSize, squareSize);
//         }
//     }
// });

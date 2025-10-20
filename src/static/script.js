// Initialize default boards
let startBoard = [[7, 2, 4], [5, 0, 6], [8, 3, 1]];
let goalBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
let solutionSteps = [];
let currentStep = 0;
let animationInterval = null;
let isAnimating = false;
let animationSpeed = 600; // milliseconds per step

// Render puzzle on page load
window.onload = function() {
    renderPuzzle('start-puzzle', startBoard);
    renderPuzzle('goal-puzzle', goalBoard);
};

function renderPuzzle(elementId, board, highlightChanges = false, previousBoard = null) {
    const puzzleDiv = document.getElementById(elementId);
    const tiles = puzzleDiv.querySelectorAll('.tile');

    // If tiles already exist, animate the changes
    if (tiles.length > 0 && highlightChanges && previousBoard) {
        let tileIndex = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile = tiles[tileIndex];
                const newValue = board[i][j];
                const oldValue = previousBoard[i][j];

                if (newValue !== oldValue) {
                    // Add moving animation to changed tiles
                    tile.classList.add('moving');
                    setTimeout(() => tile.classList.remove('moving'), 400);
                }

                tile.className = newValue === 0 ? 'tile blank' : 'tile';
                tile.textContent = newValue === 0 ? '' : newValue;

                tileIndex++;
            }
        }
    } else {
        // Initial render
        puzzleDiv.innerHTML = '';

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile = document.createElement('div');
                tile.className = board[i][j] === 0 ? 'tile blank' : 'tile';
                tile.textContent = board[i][j] === 0 ? '' : board[i][j];

                // Stagger the initial animation
                const delay = (i * 3 + j) * 0.05;
                tile.style.animation = `fadeIn 0.4s ease-out ${delay}s backwards`;

                puzzleDiv.appendChild(tile);
            }
        }
    }
}

function getCurrentBoard(elementId) {
    if (elementId === 'start-puzzle') return startBoard;
    if (elementId === 'goal-puzzle') return goalBoard;
}

function disableButtons() {
    document.getElementById('randomize-btn').disabled = true;
    document.getElementById('solve-btn').disabled = true;
    document.getElementById('reset-btn').disabled = true;
}

function enableButtons() {
    document.getElementById('randomize-btn').disabled = false;
    document.getElementById('solve-btn').disabled = false;
    document.getElementById('reset-btn').disabled = false;
}

// Randomize button
document.getElementById('randomize-btn').addEventListener('click', async () => {
    try {
        disableButtons();

        const response = await fetch('/randomize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        startBoard = data.board;
        renderPuzzle('start-puzzle', startBoard);

        // Clear any previous solution
        stopAnimation();
        document.getElementById('solution-display').innerHTML = '';

        enableButtons();
    } catch (error) {
        console.error('Error randomizing:', error);
        showError('Error randomizing puzzle. Please try again.');
        enableButtons();
    }
});

// Reset button
document.getElementById('reset-btn').addEventListener('click', () => {
    stopAnimation();
    startBoard = [[7, 2, 4], [5, 0, 6], [8, 3, 1]];
    renderPuzzle('start-puzzle', startBoard);
    document.getElementById('solution-display').innerHTML = '';
    enableButtons();
});

// Solve button
document.getElementById('solve-btn').addEventListener('click', async () => {
    try {
        stopAnimation();
        disableButtons();

        // Show loading message
        showLoading();

        const response = await fetch('/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                start_board: startBoard,
                goal_board: goalBoard
            })
        });

        const data = await response.json();

        if (data.success) {
            solutionSteps = data.solution;
            displaySolution(data.solution);
        } else {
            showError(data.error || 'Failed to find a solution');
            enableButtons();
        }
    } catch (error) {
        console.error('Error solving:', error);
        showError('Error solving puzzle. Make sure the solver is working correctly.');
        enableButtons();
    }
});

function showLoading() {
    const display = document.getElementById('solution-display');
    display.innerHTML = `
        <p class="loading">Searching for optimal solution...</p>
        <p style="color: #666; font-size: 0.95rem; margin-top: 10px;">
            The A* algorithm is exploring possible moves
        </p>
    `;
}

function showError(message) {
    const display = document.getElementById('solution-display');
    display.innerHTML = `
        <p class="error-message">Error: ${message}</p>
    `;
}

function stopAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    isAnimating = false;
    currentStep = 0;
}

function displaySolution(solution) {
    const display = document.getElementById('solution-display');

    if (solution.length === 1) {
        display.innerHTML = `
            <h2>Puzzle Already Solved!</h2>
            <p class="success-message">The start state is already the goal state.</p>
        `;
        enableButtons();
        return;
    }

    display.innerHTML = `
        <h2>Solution Found!</h2>
        <div class="stats">
            <div class="stats-item">
                <span class="stats-label">Total Steps:</span>
                <span class="stats-value">${solution.length - 1}</span>
            </div>
            <div class="stats-item">
                <span class="stats-label">Current Step:</span>
                <span class="stats-value" id="current-step-display">0</span>
            </div>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
        </div>
        <div class="step-controls">
            <button id="play-btn" class="step-btn">Play</button>
            <button id="pause-btn" class="step-btn" disabled>Pause</button>
            <button id="prev-btn" class="step-btn">Previous</button>
            <button id="next-btn" class="step-btn">Next</button>
            <button id="restart-btn" class="step-btn">Restart</button>
        </div>
    `;

    // Setup step control buttons
    setupStepControls(solution);

    // Auto-play the solution
    setTimeout(() => {
        playSolution(solution);
    }, 500);
}

function setupStepControls(solution) {
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');

    playBtn.addEventListener('click', () => {
        if (!isAnimating) {
            playSolution(solution);
        }
    });

    pauseBtn.addEventListener('click', () => {
        pauseSolution();
    });

    prevBtn.addEventListener('click', () => {
        pauseSolution();
        if (currentStep > 0) {
            currentStep--;
            updateStep(solution);
        }
    });

    nextBtn.addEventListener('click', () => {
        pauseSolution();
        if (currentStep < solution.length - 1) {
            currentStep++;
            updateStep(solution);
        }
    });

    restartBtn.addEventListener('click', () => {
        pauseSolution();
        currentStep = 0;
        updateStep(solution, false);
    });
}

function playSolution(solution) {
    isAnimating = true;
    document.getElementById('play-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;

    // Remove any existing success message
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    animationInterval = setInterval(() => {
        if (currentStep >= solution.length - 1) {
            pauseSolution();
            const display = document.getElementById('solution-display');
            const successMsg = document.createElement('p');
            successMsg.className = 'success-message';
            successMsg.style.marginTop = '20px';
            successMsg.style.animation = 'fadeIn 0.5s ease-out';
            successMsg.textContent = 'Solution Complete!';
            display.appendChild(successMsg);
            enableButtons();
            return;
        }

        currentStep++;
        updateStep(solution);
    }, animationSpeed);
}

function pauseSolution() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    isAnimating = false;
    document.getElementById('play-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

function updateStep(solution, animate = true) {
    const previousBoard = currentStep > 0 ? solution[currentStep - 1] : solution[currentStep];

    if (animate && currentStep > 0) {
        renderPuzzle('start-puzzle', solution[currentStep], true, previousBoard);
    } else {
        renderPuzzle('start-puzzle', solution[currentStep], false);
    }

    // Update step counter with animation
    const stepDisplay = document.getElementById('current-step-display');
    if (stepDisplay) {
        stepDisplay.style.transform = 'scale(1.2)';
        stepDisplay.textContent = currentStep;
        setTimeout(() => {
            stepDisplay.style.transform = 'scale(1)';
        }, 200);
    }

    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const progress = (currentStep / (solution.length - 1)) * 100;
        progressFill.style.width = `${progress}%`;
    }
}
// Initialize default boards
let startBoard = [[7, 2, 4], [5, 0, 6], [8, 3, 1]];
let goalBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

// Render puzzle on page load
window.onload = function() {
    renderPuzzle('start-puzzle', startBoard);
    renderPuzzle('goal-puzzle', goalBoard);
};

function renderPuzzle(elementId, board) {
    const puzzleDiv = document.getElementById(elementId);
    puzzleDiv.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const tile = document.createElement('div');
            tile.className = board[i][j] === 0 ? 'tile blank' : 'tile';
            tile.textContent = board[i][j] === 0 ? '' : board[i][j];
            puzzleDiv.appendChild(tile);
        }
    }
}

function getCurrentBoard(elementId) {
    // This function extracts the current board state
    // For now, we'll use the stored board variables
    if (elementId === 'start-puzzle') return startBoard;
    if (elementId === 'goal-puzzle') return goalBoard;
}

// Randomize button
document.getElementById('randomize-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('/randomize', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        startBoard = data.board;
        renderPuzzle('start-puzzle', startBoard);
        
        // Clear any previous solution
        document.getElementById('solution-display').innerHTML = '';
    } catch (error) {
        console.error('Error randomizing:', error);
        alert('Error randomizing puzzle');
    }
});

// Solve button
document.getElementById('solve-btn').addEventListener('click', async () => {
    try {
        // Show loading message
        document.getElementById('solution-display').innerHTML = '<p>Solving...</p>';
        
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
            displaySolution(data.solution);
        } else {
            document.getElementById('solution-display').innerHTML = 
                `<p style="color: red;">Error: ${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error solving:', error);
        document.getElementById('solution-display').innerHTML = 
            '<p style="color: red;">Error solving puzzle. Make sure solver.py is implemented.</p>';
    }
});

function displaySolution(solution) {
    const display = document.getElementById('solution-display');
    display.innerHTML = `<h2>Solution found! ${solution.length} steps</h2>`;
    
    let step = 0;
    const interval = setInterval(() => {
        if (step >= solution.length) {
            clearInterval(interval);
            display.innerHTML += '<p>Solution complete!</p>';
            return;
        }
        renderPuzzle('start-puzzle', solution[step]);
        display.innerHTML = `<h2>Solution found! ${solution.length} steps</h2><p>Step ${step + 1} of ${solution.length}</p>`;
        step++;
    }, 500);
}
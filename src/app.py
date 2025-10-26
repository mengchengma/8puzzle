from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

def generate_random_board():
    """Generate a random solvable 8-puzzle configuration"""
    # Start with goal state
    board = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
    
    # Flatten to 1D list
    flat = [item for row in board for item in row]
    
    # Shuffle until we get a solvable configuration
    while True:
        random.shuffle(flat)
        if is_solvable(flat):
            break
    
    # Convert back to 2D
    result = []
    for i in range(0, 9, 3):
        result.append(flat[i:i+3])
    
    return result

def is_solvable(puzzle):
    """Check if a puzzle configuration is solvable"""
    # Count inversions (excluding the blank tile)
    inversions = 0
    flat = [x for x in puzzle if x != 0]
    
    for i in range(len(flat)):
        for j in range(i + 1, len(flat)):
            if flat[i] > flat[j]:
                inversions += 1
    
    # 8-puzzle is solvable if number of inversions is even
    return inversions % 2 == 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/randomize', methods=['POST'])
def randomize():
    """Generate a random solvable puzzle"""
    board = generate_random_board()
    return jsonify({'board': board})

@app.route('/solve', methods=['POST'])
def solve():
    """Solve the puzzle using A* algorithm"""
    try:
        data = request.json
        start_board = data['start_board']
        goal_board = data['goal_board']
        
        # Import your solver
        from solver import solvePuzzle

        solution = solvePuzzle(start_board, goal_board)
        
        if solution:
            return jsonify({'solution': solution, 'success': True})
        else:
            return jsonify({'error': 'No solution found', 'success': False})
    except Exception as e:
        return jsonify({'error': str(e), 'success': False})

if __name__ == '__main__':
    app.run(debug=True)
# src/solver.py
# YOU MUST WRITE THIS CODE YOURSELF - NO AI ALLOWED

class PuzzleState:
    """Represents a state of the 8-puzzle"""
    def __init__(self, board, parent=None, move=None, depth=0):
        self.board = board  # 2D list representing the puzzle
        self.parent = parent
        self.move = move
        self.depth = depth
        self.cost = self.depth + self.heuristic()
    
    def heuristic(self):
        """Calculate Manhattan distance heuristic"""
        # TODO: Implement Manhattan distance
        pass
    
    def get_blank_position(self):
        """Find the position of the blank (0) tile"""
        # TODO: Implement
        pass
    
    def get_neighbors(self):
        """Generate all valid neighbor states"""
        # TODO: Implement
        pass
    
    def is_goal(self, goal_state):
        """Check if this is the goal state"""
        # TODO: Implement
        pass

def a_star_search(start_state, goal_state):
    """
    A* search algorithm
    Returns: list of moves from start to goal
    """
    # TODO: Implement A* algorithm
    # Use a priority queue (heapq)
    # Track visited states
    # Return the solution path
    pass

def solve_puzzle(start_board, goal_board):
    """
    Main function to solve the puzzle
    Returns: list of board states showing the solution
    """
    # TODO: Implement
    pass
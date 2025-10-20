#!/usr/bin/env python3
"""
Simple test file for the 8-puzzle solver
"""

import sys
sys.path.insert(0, 'src')  # Add src to path

from solver import solvePuzzle, PuzzleState

def test_already_solved():
    """Test with already solved puzzle (0 moves)"""
    print("Test 1: Already solved puzzle...")
    start = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    goal = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

    solution = solvePuzzle(start, goal)

    if solution and len(solution) == 1:
        print("[PASS] Found solution with", len(solution), "states (should be 1)")
    else:
        print("[FAIL] Expected 1 state, got", len(solution) if solution else "None")
    print()

def test_one_move():
    """Test with 1-move puzzle"""
    print("Test 2: One move puzzle...")
    start = [[0, 1, 2], [3, 4, 5], [6, 8, 7]]  # Just swap 7 and 8
    goal = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

    solution = solvePuzzle(start, goal)

    if solution and len(solution) == 2:  # Start + 1 move
        print("[PASS] Found solution with", len(solution), "states (2 = start + 1 move)")
        print("  Start:", solution[0])
        print("  Goal:", solution[-1])
    else:
        print("[FAIL] Expected 2 states, got", len(solution) if solution else "None")
    print()

def test_easy_puzzle():
    """Test with easy puzzle (2-3 moves)"""
    print("Test 3: Easy puzzle (2 moves)...")
    start = [[1, 0, 2], [3, 4, 5], [6, 7, 8]]
    goal = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

    solution = solvePuzzle(start, goal)

    if solution:
        print("[PASS] Found solution with", len(solution), "states")
        print("  Solution path:")
        for i, state in enumerate(solution):
            print(f"    Step {i}: {state}")
    else:
        print("[FAIL] No solution found")
    print()

def test_heuristic():
    """Test heuristic calculation"""
    print("Test 4: Heuristic function...")

    # Goal state should have heuristic = 0
    goal_state = PuzzleState([[0, 1, 2], [3, 4, 5], [6, 7, 8]])
    h = goal_state.heuristic()

    if h == 0:
        print(f"[PASS] Goal state heuristic = {h} (should be 0)")
    else:
        print(f"[FAIL] Goal state heuristic = {h} (should be 0)")

    # Test another state
    test_state = PuzzleState([[1, 0, 2], [3, 4, 5], [6, 7, 8]])
    h2 = test_state.heuristic()
    print(f"  Test state heuristic = {h2} (tiles 0 and 1 swapped)")
    print()

def test_medium_puzzle():
    """Test with medium difficulty puzzle"""
    print("Test 5: Medium puzzle...")
    start = [[7, 2, 4], [5, 0, 6], [8, 3, 1]]
    goal = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

    print("  This may take a few seconds...")
    solution = solvePuzzle(start, goal)

    if solution:
        print(f"[PASS] Found solution with {len(solution)} states")
        print(f"  Start: {start}")
        print(f"  Goal:  {goal}")
    else:
        print("[FAIL] No solution found")
    print()

if __name__ == "__main__":
    print("=" * 50)
    print("8-PUZZLE SOLVER TESTS")
    print("=" * 50)
    print()

    try:
        test_already_solved()
        test_one_move()
        test_easy_puzzle()
        test_heuristic()
        test_medium_puzzle()

        print("=" * 50)
        print("TESTS COMPLETE!")
        print("=" * 50)

    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()

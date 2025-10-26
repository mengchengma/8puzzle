import copy
import heapq

class PuzzleState:
    def __init__(self, board, parent=None, move=None, depth=0):
        self.board = board
        self.parent = parent
        self.move = move
        self.depth = depth
        self.cost = self.depth + self.heuristic()

    def __lt__(self, other):
        return self.cost < other.cost

    def __eq__(self, other):
        return self.board == other.board
    
    def __hash__(self):
        return hash(tuple(map(tuple, self.board)))
    
    
    def heuristic(self):
        # Goal state: [[1, 2, 3],
        #              [4, 5, 6],
        #              [7, 8, 0]]
        goalboard = [(2,2), (0,0), (0,1),
                     (0,2), (1,0), (1,1),
                     (1,2), (2,0), (2,1)]

        distance = 0
        for i in range(3):
            for j in range(3):
                value = self.board[i][j]
                if value != 0:
                    targetX, targetY = goalboard[value]
                    distance += abs(i - targetX) + abs(j - targetY)

        return distance

    def getBlank(self):
        for i in range(3):
            for j in range(3):
                if self.board[i][j] == 0:
                    return (i, j)
        pass
    
    def getNeighbors(self):
        neighbors = []
        blankX, blankY = self.getBlank()
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for x, y in directions:
            newX, newY = blankX + x, blankY + y
            if newX >= 0 and newX < 3 and newY >= 0 and newY < 3:
                newBoard = copy.deepcopy(self.board)
                newBoard[blankX][blankY], newBoard[newX][newY] = newBoard[newX][newY], newBoard[blankX][blankY]
                newState = PuzzleState(newBoard, parent=self, move=(newX, newY), depth=self.depth + 1)
                neighbors.append(newState)
        return neighbors

    def isGoal(self, goalBoard):
        return self.board == goalBoard

def aStarSearch(startState, goalBoard):
    openSet = []
    heapq.heappush(openSet, (startState.cost, startState))

    visited = set()

    while openSet:
        currcost, currstate = heapq.heappop(openSet)

        if currstate.isGoal(goalBoard):
            return pathFinder(currstate)
        
        stateTuple = tuple(tuple(row) for row in currstate.board)
        if stateTuple in visited:
            continue

        visited.add(stateTuple)

        for neighbor in currstate.getNeighbors():
            neighborTuple = tuple(tuple(row) for row in neighbor.board)

            if neighborTuple not in visited:
                heapq.heappush(openSet, (neighbor.cost, neighbor))

    return None

def pathFinder(state):
    path = []
    current = state
    while current:
        path.append(current.board)
        current = current.parent
    path.reverse()
    return path

def solvePuzzle(startBoard, goalBoard):
    startState = PuzzleState(startBoard)

    solution = aStarSearch(startState, goalBoard)
    return solution

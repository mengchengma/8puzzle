# 8-Puzzle Project Checklist

## Technical Implementation

### Core Algorithm (src/solver.py) - ⚠️ NO AI ALLOWED
- [ ] Implement `PuzzleState.__init__()`
- [ ] Implement `heuristic()` - Manhattan distance calculation
- [ ] Implement `get_blank_position()` - Find the 0 tile
- [ ] Implement `get_neighbors()` - Generate valid successor states
- [ ] Implement `is_goal()` - Check if current state matches goal
- [ ] Implement `a_star_search()` - Main A* algorithm with priority queue
- [ ] Implement `solve_puzzle()` - Wrapper function returning solution path
- [ ] Add `__eq__()` and `__hash__()` for state comparison
- [ ] Test with simple puzzles (1-2 moves)
- [ ] Test with medium puzzles (5-10 moves)
- [ ] Test with complex puzzles (15+ moves)

### Web Application
- [x] Flask backend setup
- [x] HTML template with puzzle grid
- [x] CSS styling
- [x] JavaScript for randomize functionality
- [x] JavaScript for solve functionality
- [x] Solution animation/display
- [ ] Test randomize button
- [ ] Test solve button
- [ ] Verify solution animation works smoothly
- [ ] Add loading indicators
- [ ] Handle error cases gracefully

### Documentation
- [x] README.md with setup instructions
- [x] .gitignore file
- [x] requirements.txt
- [ ] Add contributor names to README
- [ ] Document any known limitations
- [ ] Add comments to complex code sections

---

## Report (NO AI ALLOWED) - Worth 110 points

### Title Page (5 pts)
- [ ] Project title
- [ ] Contributors' names and student IDs
- [ ] Course name, number, section
- [ ] Formatted nicely

### Formatting (5 pts)
- [ ] Two-column IEEE format
- [ ] Professional appearance
- [ ] Numbered figures
- [ ] IEEE citation format

### Abstract (5 pts)
- [ ] Brief summary of project
- [ ] Problem statement
- [ ] Solution approach
- [ ] Key findings

### Introduction (10 pts)
- [ ] Introduce 8-puzzle problem
- [ ] Explain why it's important
- [ ] Describe your solution approach
- [ ] Summarize conclusions

### Background (5 pts)
- [ ] History of 8-puzzle
- [ ] Previous solutions
- [ ] A* algorithm background
- [ ] Heuristic search concepts

### Problem Formulation (30 pts)
- [ ] **PEAS Description**
  - [ ] Performance measure
  - [ ] Environment
  - [ ] Actuators
  - [ ] Sensors
- [ ] **Task Environment Attributes**
  - [ ] Fully/Partially observable
  - [ ] Deterministic/Stochastic
  - [ ] Episodic/Sequential
  - [ ] Static/Dynamic
  - [ ] Discrete/Continuous
  - [ ] Single/Multi agent
- [ ] **Goal Formulation**
- [ ] **State Space Representation**
- [ ] **Actions/Operators**
- [ ] **Evaluation Function & Heuristics**
  - [ ] Explain Manhattan distance
  - [ ] Why it's admissible
- [ ] **A* Algorithm**
  - [ ] Pseudocode (use LaTeX algorithm package)
  - [ ] Explanation of how it works
  - [ ] Why you chose this approach
- [ ] **UML Diagrams/Flowcharts**
- [ ] **Complexity Analysis**
  - [ ] Completeness (will it find a solution?)
  - [ ] Optimality (will it find the best solution?)
  - [ ] Time complexity
  - [ ] Space complexity

### Project Results (30 pts)
- [ ] Did the AI agent successfully solve puzzles?
- [ ] Performance metrics (time, steps, states explored)
- [ ] Screenshots/figures of working application
- [ ] Example solutions with different starting states
- [ ] Challenges faced during development
- [ ] How you overcame challenges
- [ ] Link to YouTube video
- [ ] Link to GitHub repository

### Contributions (5 pts)
- [ ] List each team member's specific contributions
- [ ] Be clear and detailed
- [ ] Ensure contributions are roughly equal

### Conclusion (15 pts)
- [ ] Summary of what was accomplished
- [ ] What you learned about AI
- [ ] What you learned about search algorithms
- [ ] Reflections on intelligence
- [ ] Future improvements
- [ ] Personal takeaways

---

## Video Demonstration - Worth 35 points

### Planning
- [ ] Script out what to show
- [ ] Decide who will narrate each part
- [ ] Plan 2+ puzzle solve demonstrations

### Recording (Max 5 minutes)
- [ ] Project overview (30 seconds)
- [ ] Code walkthrough (45-60 seconds)
  - [ ] Show project structure
  - [ ] Briefly explain key files
  - [ ] Show solver.py structure
- [ ] Demo 1: Simple puzzle solve
- [ ] Demo 2: Complex puzzle solve
- [ ] Show randomize functionality
- [ ] Show solution animation

### Editing
- [ ] Add text overlays
- [ ] Add audio narration
- [ ] Clean transitions
- [ ] Professional quality
- [ ] Under 5 minutes

### Publishing
- [ ] Upload to YouTube
- [ ] Set as unlisted (if preferred)
- [ ] Add link to report

---

## GitHub Setup

### Initial Setup
- [x] Create repository
- [x] Add .gitignore
- [x] Add README.md
- [ ] Add collaborator on GitHub
- [ ] Test that collaborator can clone
- [ ] Set up branch protection (optional)

### Throughout Project
- [ ] Commit regularly with clear messages
- [ ] Keep branches organized
- [ ] Use pull requests for major changes
- [ ] Keep README updated

---

## Testing Checklist

### Functional Testing
- [ ] Random puzzle generation works
- [ ] Generated puzzles are solvable
- [ ] Solve button triggers A* algorithm
- [ ] Solution is correct (manually verify a few)
- [ ] Animation displays all steps
- [ ] No crashes on edge cases

### Edge Cases
- [ ] Already solved puzzle (0 moves)
- [ ] Very easy puzzle (1-2 moves)
- [ ] Very hard puzzle (20+ moves)
- [ ] Multiple rapid clicks
- [ ] Solving while animation running

---

## Before Submission

- [ ] All code committed and pushed
- [ ] Repository is public or shared with instructor
- [ ] README updated with all info
- [ ] Report is complete and proofread
- [ ] Video is uploaded and accessible
- [ ] All team members have contributed equally
- [ ] Double-check: NO AI code in solver.py
- [ ] Double-check: NO AI text in report
- [ ] Test installation on fresh machine (if possible)

---

## Grading Breakdown

| Component | Points | Status |
|-----------|--------|--------|
| **Report** | 110 | |
| - Title Page & TOC | 5 | |
| - General Formatting | 5 | |
| - Abstract | 5 | |
| - Introduction | 10 | |
| - Background | 5 | |
| - Problem Formulation | 30 | |
| - Project Results | 30 | |
| - Contributions | 5 | |
| - Conclusion | 15 | |
| **Technical Project** | 50 | |
| - Visualization Quality | 10 | |
| - Functionality | 20 | |
| - A* Code | 20 | |
| **Video Demo** | 35 | |
| - Video Quality & Length | 10 | |
| - Project Functionality | 15 | |
| - Explanations | 10 | |
| **TOTAL** | **195** | |

---

## Timeline Suggestion

**Week 1:**
- Set up development environment
- Implement basic A* algorithm
- Test with simple cases

**Week 2:**
- Complete and debug A* implementation
- Ensure web app fully functional
- Begin report writing

**Week 3:**
- Complete report
- Record and edit video
- Final testing
- Submit

Good luck! 🎯

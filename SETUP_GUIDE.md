# Quick Setup Guide for New Team Members

## First Time Setup (5 minutes)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd 8puzzle
```

### Step 2: Create Virtual Environment

**Windows Users:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux Users:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` at the start of your command prompt.

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Test the Application
```bash
cd src
python app.py
```

Open browser to: http://127.0.0.1:5000

You should see the 8-Puzzle interface!

---

## Daily Workflow

### Before Starting Work
```bash
# 1. Activate virtual environment
venv\Scripts\activate              # Windows
source venv/bin/activate           # Mac/Linux

# 2. Get latest changes
git pull origin main

# 3. Create your feature branch
git checkout -b your-name/feature-description
```

### While Working
```bash
# Save your work frequently
git add .
git commit -m "Clear description of what you changed"
```

### When Done
```bash
# Push your branch
git push origin your-name/feature-description

# Then create a Pull Request on GitHub
```

---

## What to Work On

### Priority Tasks:

1. **Implement A* Algorithm in `src/solver.py`**
   - ⚠️ **NO AI TOOLS ALLOWED** for this file
   - Implement: `heuristic()`, `get_blank_position()`, `get_neighbors()`, `is_goal()`, `a_star_search()`, `solve_puzzle()`

2. **Test the solver thoroughly**
   - Try different puzzle configurations
   - Verify solution paths are correct
   - Test edge cases

3. **Work on Technical Report**
   - PEAS description
   - Problem formulation
   - Algorithm explanation
   - Results and analysis

---

## File Responsibilities

### Who Can Work on What:

| File | Can Use AI? | Notes |
|------|-------------|-------|
| `src/solver.py` | ❌ NO | Academic integrity - write from scratch |
| `src/app.py` | ✅ Yes | Flask routes |
| `src/templates/index.html` | ✅ Yes | Frontend |
| `src/static/*.css` | ✅ Yes | Styling |
| `src/static/*.js` | ✅ Yes | Frontend logic |
| Report | ❌ NO | Must be your own words |

---

## Common Issues

### "Command not found: python"
Try `python3` instead of `python`

### "pip: command not found"
Try `pip3` or `python -m pip`

### Virtual environment won't activate
Make sure you're in the project root directory

### Changes not showing up
Make sure you:
1. Saved the file
2. Restarted Flask (`Ctrl+C` then `python app.py`)
3. Refreshed browser (`Ctrl+F5` for hard refresh)

---

## Need Help?

1. Check the main [README.md](README.md)
2. Message the team on [your communication platform]
3. Check project requirements PDF

---

## Reminder: Academic Integrity

⚠️ **CRITICAL**: The solver code (`src/solver.py`) must be written entirely by team members without AI assistance. Using AI for this file will result in a grade of 0 and academic dishonesty charges for the entire team.

git remote remove origin
git remote -v
git remote add origin https://github.com/TakdanaiGH/ebook-community.git

git config --global user.name "Your Name"
git config --global user.email you@example.com

# Check current branches
git branch

# Create and switch to a new branch
git checkout -b {yourname}-branch

# Stage changes
git add .

# Commit changes
git commit -m "update home page and ebook"

# Push the new branch to GitHub
git push -u origin {yourname}-branch
git pull origin main
git pull origin main --no-rebase

# Switch back to the main branch
git checkout main
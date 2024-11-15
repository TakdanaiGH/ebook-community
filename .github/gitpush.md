git remote remove origin
git remote -v
git remote add origin https://github.com/TakdanaiGH/ebook-community.git

# Check current branches
git branch

# Create and switch to a new branch
git checkout -b {yourname}-branch

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push the new branch to GitHub
git push -u origin my-feature-branch

# Switch back to the main branch
git checkout main
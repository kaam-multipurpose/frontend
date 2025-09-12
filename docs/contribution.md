
# 🛠️ Contribution Guide

This guide outlines the process for contributing to this project. Following these steps ensures a clean and organized version history, making collaboration smooth and efficient for everyone.

## Table of Contents

- [Getting Started](#getting-started)
- [Making Your Changes](#making-your-changes)
- [Submitting Your Work](#submitting-your-work)
- [Repository Branching Rules](#repository-branching-rules)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pre-Submission Checklist](#pre-submission-checklist)
- [Clean Up After Merge](#clean-up-after-merge)
- [Troubleshooting](#troubleshooting)

## Getting Started

Before you begin, you need to set up your local development environment by cloning the repository and setting up the correct branch.

### 1. Clone the Repository

Use the `git clone` command to create a local copy of the project.

```bash
git clone [repository_url]
```

### 2. Navigate to the Project Directory

Change your current directory to the new repository folder.

```bash
cd [repository_name]
```

### 3. Fetch All Remote Branches

Make sure your local repository is aware of all remote branches, including the `dev` branch.

```bash
git fetch
```

### 4. Create a New Branch

All new work must be done on a dedicated branch created from the `dev` branch. Your branch name must start with either `feat/` for a new feature or `fix/` for a bug fix.

```bash
git checkout -b <your-new-branch-name> origin/dev
```

**Examples:**
- For a new feature: `git checkout -b feat/add-user-login origin/dev`
- For a bug fix: `git checkout -b fix/correct-typo-on-homepage origin/dev`

## Making Your Changes

Once your new branch is set up, you can start working on your changes.

### 1. Make Your Code Changes

Work on your feature or fix in your preferred code editor. Make sure to:
- Follow the project's coding standards
- Update documentation as needed

### 2. Stage and Commit Your Changes

Stage your changes and commit them with a clear, descriptive message.

```bash
git add .
git commit -m "Your descriptive commit message"
```

### 3. Push Your Branch to Remote

Push your newly created branch to the remote server. The `-u` flag sets up tracking between your local branch and the remote branch.

```bash
git push -u origin <your-new-branch-name>
```

## Submitting Your Work

After pushing your branch, you'll create a Pull Request (PR) to merge your changes into the `dev` branch.

### 1. Sync with Dev Branch

Before creating a PR, always update your branch with the latest changes from the `dev` branch to avoid conflicts.

```bash
git checkout dev
git pull origin dev
git checkout <your-new-branch-name>
git merge dev
```

### 2. Resolve Any Merge Conflicts

If there are merge conflicts during the merge step:

1. Open the conflicted files in your editor
2. Resolve the conflicts by choosing the appropriate code
3. Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Stage and commit the resolved files:

```bash
git add .
git commit -m "resolve merge conflicts with dev"
```

### 3. Push Updated Branch

After resolving conflicts (if any), push your branch again:

```bash
git push
```

### 4. Create a Pull Request

On your repository platform (GitHub, GitLab, etc.):

1. Navigate to your repository
2. Click "New Pull Request" or "Create Merge Request"
3. Set the **base branch** to `dev`
4. Set the **compare branch** to your `feat/` or `fix/` branch
5. Fill out the PR template with:
    - Clear description of changes
    - Reference to any related issues
    - Screenshots (if applicable)
    - Testing notes

## Repository Branching Rules

To maintain the integrity of our project, please adhere to the following rules:

### Branch Protection Rules

1. **❌ Never Push Directly**: Do not push code directly to the `main`, `test`, or `dev` branches
2. **✅ PR to Dev**: Always create a Pull Request from your `feat/` or `fix/` branch to the `dev` branch
3. **🔄 Dev to Test**: The `dev` branch is periodically merged into the `test` branch by maintainers
4. **🚀 Test to Main**: The `test` branch is periodically merged into the `main` branch by maintainers
5. **🔄 Sync Before PR**: Always pull the latest `dev` branch and merge it into your feature branch before creating a PR

### Branch Flow Diagram

```
main (production) ← test (staging) ← dev (development) ← feat/fix branches
```

## Branch Naming Conventions

Use clear, descriptive branch names that follow these patterns:

### Feature Branches
```bash
feat/description-of-feature
feat/issue-123-user-authentication
feat/add-payment-integration
```

### Bug Fix Branches
```bash
fix/description-of-bug
fix/issue-456-login-button-styling
fix/resolve-memory-leak
```

### Other Branch Types (if needed)
```bash
docs/update-api-documentation
refactor/improve-database-queries
test/add-unit-tests-for-auth
```

## Commit Message Guidelines

Write clear, concise commit messages that explain **what** you changed and **why**.

### Format
```
type: short description

Optional longer description explaining the change in more detail.
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples
```bash
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve login button alignment issue"
git commit -m "docs: update API documentation for auth endpoints"
```

## Pre-Submission Checklist

Before creating your Pull Request, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] New features include appropriate tests
- [ ] Documentation is updated (if applicable)
- [ ] Branch is up to date with `dev`
- [ ] Commit messages are clear and descriptive
- [ ] No merge conflicts exist
- [ ] Sensitive information (API keys, passwords) is not committed

## Clean Up After Merge

After your PR is successfully merged, clean up your local environment:

### Delete Local Branch
```bash
git checkout dev
git pull origin dev
git branch -d <your-branch-name>
```

### Delete Remote Branch
```bash
git push origin --delete <your-branch-name>
```

## Troubleshooting

### Common Issues and Solutions

#### Merge Conflicts
If you encounter merge conflicts:
1. Don't panic! Conflicts are normal in collaborative development
2. Open conflicted files and look for conflict markers
3. Choose the correct code version or combine both
4. Remove all conflict markers
5. Test your changes
6. Commit the resolution

#### Branch Out of Sync
If your branch is behind `dev`:
```bash
git checkout dev
git pull origin dev
git checkout <your-branch-name>
git rebase dev  # or git merge dev
```

#### Accidentally Committed to Wrong Branch
If you committed to `dev` instead of a feature branch:
```bash
git reset --soft HEAD~1  # Undo last commit, keep changes
git stash                # Save changes temporarily
git checkout -b feat/my-feature origin/dev  # Create correct branch
git stash pop            # Restore changes
git add .
git commit -m "your commit message"
```

#### Need Help?
- Check existing issues and documentation
- Ask questions in team chat or create a discussion issue
- Reach out to project maintainers

---

## Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

Thank you for contributing to our project! 🎉
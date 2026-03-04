# Contributing to FCT Solar Accumulator Calculator

Thanks for deciding to invest your time in this project. Contributions of all sizes are welcome, from typo fixes to feature-level refactors.

## Introduction

This repository is a lightweight static web tool for Factorio power planning. We keep the workflow intentionally clean and low-friction: minimal dependencies, deterministic logic, and pragmatic code reviews.

If you contribute, you help improve usability for thousands of players planning scalable solar layouts.

## I Have a Question

> [!IMPORTANT]
> **GitHub Issues are reserved for bugs and feature requests, not general usage Q&A.**

If your topic is a question (how to use, gameplay interpretation, setup advice), use community channels instead:

- GitHub Discussions (if enabled in the repo)
- Telegram community chat: <https://t.me/FCTostin>
- YouTube community channel: <https://www.youtube.com/@FCT-Ostin>

When asking, provide context (what you tried, expected outcome, screenshots if UI-related).

## Reporting Bugs

Before opening a bug report:

1. Check existing open/closed issues for duplicates.
2. Reproduce on latest `main` branch.
3. Verify whether the issue is browser-specific.

### What to Include in a Bug Report

Please include the following payload:

- **Environment**
  - OS and version (e.g., Windows 11, Ubuntu 24.04)
  - Browser and version (e.g., Chrome 125)
  - Repository commit/branch used
- **Steps to Reproduce**
  - Exact, numbered sequence from app launch to failure
- **Expected Behavior**
  - What should have happened
- **Actual Behavior**
  - What actually happened
- **Evidence**
  - Console errors, screenshots, screen recordings

A high-signal issue saves review cycles and gets fixed faster.

## Suggesting Enhancements

Feature proposals are welcome when they solve a real workflow pain.

Your enhancement request should include:

- **Problem Statement**: What friction or limitation exists right now?
- **Proposed Solution**: What change do you suggest?
- **Use Cases**: Concrete examples of who benefits and how.
- **Scope**: Is this UI-only, logic-only, i18n-related, or structural?

Keep proposals focused. Small, composable enhancements are easier to merge than huge multi-concern redesigns.

## Local Development / Setup

### 1) Fork and Clone

```bash
# Fork via GitHub UI, then clone your fork
git clone https://github.com/<your-username>/solar-accumulator-calculator.git
cd solar-accumulator-calculator
```

### 2) Add Upstream Remote

```bash
git remote add upstream https://github.com/OstinUA/solar-accumulator-calculator.git
git fetch upstream
```

### 3) Run Locally

This is a static app, so no dependency install is required.

```bash
# Option A: open directly
open index.html   # macOS
# or
xdg-open index.html  # Linux
# or
start index.html  # Windows PowerShell

# Option B: local HTTP server (recommended)
python3 -m http.server 8000
```

Open `http://localhost:8000` and validate behavior in browser.

### 4) Environment Variables

There is no `.env` in the current architecture.
If future features introduce backend or build tooling, add `.env.example` and document every variable.

## Pull Request Process

### Branch Naming

Use descriptive branch names:

- `feature/<short-feature-name>`
- `bugfix/<issue-id-or-topic>`
- `docs/<topic>`
- `refactor/<scope>`

Examples:

- `feature/add-it-language-profile`
- `bugfix/fix-locale-fallback`
- `docs/rewrite-readme`

### Commit Convention

Use **Conventional Commits**:

- `feat: add Japanese translation profile`
- `fix: handle missing translation fallback`
- `docs: improve setup and deployment sections`
- `refactor: split language helpers`

### Sync With Upstream

Before opening a PR, rebase your branch on latest `main`:

```bash
git fetch upstream
git rebase upstream/main
```

### PR Description Checklist

Your PR should include:

- What changed and why
- Linked issue(s), if applicable
- Testing notes (manual steps / screenshots)
- UI screenshots for visible interface changes
- Any backward-compatibility concerns

## Styleguides

Keep code style simple, readable, and aligned with existing files.

- Use clear variable naming and avoid clever abstractions.
- Preserve the no-framework, static-first architecture unless discussed in advance.
- Keep translation keys consistent across all language profiles.
- Avoid mixing unrelated refactors in one PR.

Suggested optional local checks:

```bash
# JS/CSS formatting checks if you use local tooling
npx prettier --check "**/*.{html,css,js}"
```

If you introduce linter/formatter tooling, document it in `README.md`.

## Testing

All behavior changes should be tested before PR submission.

Minimum expectation:

1. Manual smoke test for calculation correctness.
2. Language switching verification.
3. Persistence check for saved language preference.
4. Browser console check for runtime errors.

Example run flow:

```bash
python3 -m http.server 8000
# then manually test in browser
```

If you add automated tests, include exact run commands in your PR.

## Code Review Process

- Maintainers review incoming PRs for correctness, scope, and maintainability.
- At least **one maintainer approval** is required before merge.
- Address review comments with follow-up commits or amendments.
- Keep review threads resolved and changelog clear.

Fastest merge path:

- small focused PR
- clean commit history
- explicit test notes
- clear rationale

# FCT Solar Accumulator Calculator <a href="https://github.com/OstinUA"><img align="right" src="https://img.shields.io/badge/OstinUA-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>

**Plan your Factorio solar fields like an engineer, not by vibes.**

[![Platform: Web](https://img.shields.io/badge/Platform-Web-0f172a?style=for-the-badge&logo=google-chrome&logoColor=white)](#)
[![Stack: Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20JS-f7df1e?style=for-the-badge&logo=javascript&logoColor=111827)](#)
[![Status: Active](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge)](#)
[![Version](https://img.shields.io/badge/Version-1.0.0-3b82f6?style=for-the-badge)](#)
[![Coverage](https://img.shields.io/badge/Coverage-Manual%20Smoke%20Test-f59e0b?style=for-the-badge)](#testing)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge)](LICENSE)

> [!IMPORTANT]
> This project is a **client-side, zero-backend calculator** focused on Factorio solar and accumulator balancing. It is intentionally lightweight and can be shipped as static files.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Technical Notes](#technical-notes)
  - [Project Structure](#project-structure)
  - [Key Design Decisions](#key-design-decisions)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)
- [Community and Support](#community-and-support)
- [Support the Development](#support-the-development)

## Features

- **Fast solar-to-accumulator ratio math** using a fixed, game-oriented ratio (`0.84`).
- **Live recalculation** while typing input values (no submit button, no refresh loop).
- **Power output estimation** in MW based on panel count.
- **Accumulator storage estimation** in MJ with locale-aware number formatting.
- **Multi-language UI** powered by per-language profile files in `profiles/`.
- **Persistent language preference** via browser `localStorage`.
- **No dependencies / no build step** workflow for ultra-low maintenance and instant onboarding.

> [!TIP]
> If you want to add another language, you only need one extra profile file and one language option in the selector.

## Technology Stack

- **HTML5** for semantic page structure.
- **CSS3** for layout/styling.
- **Vanilla JavaScript (ES6+)** for calculator logic and i18n runtime behavior.
- **Static asset architecture** (no Node runtime, no package manager, no framework lock-in).

## Technical Notes

### Project Structure

```text
solar-accumulator-calculator/
├── index.html              # Main UI skeleton
├── style.css               # Visual styling
├── script.js               # Calculator + localization runtime
├── profiles/
│   ├── en.js               # English translations
│   ├── ru.js               # Russian translations
│   └── ...                 # Additional language packs
├── README.md               # Project documentation
├── CONTRIBUTING.md         # Contribution workflow
├── CODE_OF_CONDUCT.md      # Community behavior standard
└── LICENSE                 # GPL-3.0 license
```

### Key Design Decisions

- **Pure front-end architecture**: all logic runs in-browser to keep latency effectively zero and hosting dead-simple.
- **Translation-per-file model**: language files are decoupled from runtime logic for easier maintenance and contributor onboarding.
- **No framework abstraction**: minimizes cognitive overhead and makes the app easy to audit for small teams.
- **Deterministic formulas**: ratio and constants are hardcoded in `script.js` so output is predictable and reproducible.

> [!NOTE]
> This repo optimizes for maintainability and accessibility over framework complexity.

## Getting Started

### Prerequisites

You only need:

- A modern browser (`Chrome`, `Firefox`, `Edge`, `Safari`).
- Optional: `Python 3` if you prefer serving files through a local HTTP server.
- Optional: `Git` for cloning and contributing.

### Installation

```bash
# 1) Clone the repo
git clone https://github.com/OstinUA/solar-accumulator-calculator.git

# 2) Enter project directory
cd solar-accumulator-calculator

# 3) Quick start: open index.html directly
# Linux
xdg-open index.html
# macOS
open index.html
# Windows (PowerShell)
start index.html
```

Optional local server mode:

```bash
# Serve static files on http://localhost:8000
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Testing

Current testing model is **manual smoke testing** (appropriate for the current no-build static setup).

Suggested checks:

```bash
# Start local static server
python3 -m http.server 8000
```

Manual verification checklist:

1. Open the app in browser and input values like `1`, `100`, and `10000`.
2. Verify accumulator count updates instantly.
3. Switch language and verify labels + units change correctly.
4. Reload page and verify language preference persists.
5. Confirm values are locale-formatted (group separators, decimal format).

> [!WARNING]
> There is no CI pipeline configured in this repository right now. If you add one, update badges and testing docs immediately.

## Deployment

Because this is a static web app, deployment is straightforward:

- **GitHub Pages**: push to default branch and serve root.
- **Netlify / Vercel (static mode)**: connect repository and deploy without build command.
- **Any CDN / static host**: upload files as-is.

Example (generic static host pipeline):

1. Pull latest `main`.
2. Validate manual smoke tests.
3. Upload `index.html`, `style.css`, `script.js`, and `profiles/`.
4. Purge CDN cache after release.

## Usage

Basic usage flow:

```text
1) Select language from dropdown.
2) Enter total number of solar panels.
3) Read calculated:
   - Required accumulators
   - Max generation (MW)
   - Total storage capacity (MJ)
```

Example logic snapshot:

```js
const RATIO = 0.84;
const SOLAR_POWER = 60; // kW per panel
const ACCUMULATOR_CAPACITY = 5; // MJ per accumulator

const accumulators = Math.ceil(panels * RATIO);
const totalPowerMW = (panels * SOLAR_POWER) / 1000;
const totalStorageMJ = accumulators * ACCUMULATOR_CAPACITY;
```

## Configuration

This project currently does **not** use `.env` or runtime server config.

Configuration points are code-level constants and language resources:

- `script.js` constants (`RATIO`, `SOLAR_POWER`, `ACCUMULATOR_CAPACITY`).
- `profiles/*.js` translation dictionaries.
- `index.html` language selector options.

> [!CAUTION]
> If you add a new language profile but forget to register it in `index.html` and locale mapping in `script.js`, the UI will fall back and your language won’t be selectable.

## License

Distributed under the **GNU General Public License v3.0**.

See [`LICENSE`](LICENSE) for full legal text.

## Community and Support

Project created with the support of the FCTostin community.

[![YouTube](https://img.shields.io/badge/YouTube-Channel-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@FCT-Ostin)
[![Telegram](https://img.shields.io/badge/Telegram-Join_Chat-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/FCTostin)
[![Steam](https://img.shields.io/badge/Steam-Join_Group-1b2838?style=for-the-badge&logo=steam&logoColor=white)](https://steamcommunity.com/groups/FCTgroup)

## Support the Development

[![Patreon](https://img.shields.io/badge/Patreon-Support-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/c/OstinFCT)
[![Boosty](https://img.shields.io/badge/Boosty-Donate-F15F2C?style=for-the-badge&logo=boosty&logoColor=white)](https://boosty.to/ostinfct)

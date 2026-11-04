# Developer Portfolio & React Contact Management Web Application

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-API-0F9D58?logo=google-sheets&logoColor=white)](https://developers.google.com/apps-script)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> A modern, responsive developer resume and portfolio website seamlessly integrated with a React Contact Cards Manager SPA, Like/Unlike interactive card mini-project, and a serverless Google Sheets database with Admin Response Dashboard.

---

## 🌟 Live Demo & Repository

- **Public Live Deployment (GitHub Pages):** [https://zeravia.github.io/portfolio-contact-manager/](https://zeravia.github.io/portfolio-contact-manager/) *(or custom domain)*
- **GitHub Repository:** [https://github.com/zeravia/portfolio-contact-manager](https://github.com/zeravia/portfolio-contact-manager)

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Architecture & Technology Stack](#-architecture--technology-stack)
4. [Project Folder Structure](#-project-folder-structure)
5. [Local Development Setup](#-local-development-setup)
6. [Google Sheets & Google Apps Script Setup](#-google-sheets--google-apps-script-setup)
7. [Admin Authentication & Security](#-admin-authentication--security)
8. [GitHub Actions CI/CD Deployment](#-github-actions-cicd-deployment)
9. [Component Walkthrough](#-component-walkthrough)
10. [Testing & Verification Checklist](#-testing--verification-checklist)
11. [Future Improvements](#-future-improvements)

---

## 🚀 Project Overview

This integrated application fulfills enterprise-grade full-stack standards across three core workflows:
1. **Developer Resume & Portfolio Website**: Semantic HTML5 multi-section portfolio highlighting career history, skills, certifications, education, and downloadable PDF resume.
2. **Interactive Contact Management SPA & Mini Projects**: React 18 single-page app managing dynamic contact cards with props, state lifting, and isolated like/unlike card states.
3. **Google Sheets Database & Admin Response Portal**: Serverless backend using Google Apps Script (`Code.gs`) implementing token authentication, anti-formula injection, and response moderation.

---

## ✨ Key Features

### 1. Resume / Portfolio Website (Part 1 & 5)
- **Semantic HTML5 Layout**: Structured with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Responsive Navigation**: Sticky frosted glass navbar with active section detection, smooth scrolling, and mobile hamburger menu.
- **Universal Theme Toggle**: Instant transition between Light Mode and Dark Mode backed by CSS custom properties and `localStorage` persistence.
- **Downloadable Resume**: Functional download link serving verified PDF documents (`public/resume.pdf`).
- **Configurable Profile**: Centralized, editable placeholders (`src/data/portfolioData.js`) for name, title, bio, education, skills, projects, and certifications.

### 2. Contact Me Form (Part 2)
- **Robust Field Validation**: Client-side validation ensuring valid email formatting and mandatory input.
- **Duplicate Prevention**: Anti-duplicate hash mechanism preventing double-submissions.
- **Dual-Layer Persistence**: Automatic fallback to local mock storage if the remote Google Apps Script API is offline or unconfigured.
- **Loading & Clear States**: Real-time spinner indicators and form resetting upon submission.

### 3. Admin Login & Response Dashboard (Part 3 & 4)
- **Secure Authentication**: Server-side verification via Google Apps Script with timed session tokens.
- **Password Obfuscation**: Toggleable Show/Hide password visibility control.
- **Response Management**: Filter, search, inspect, count, and delete incoming contact submissions.
- **Spreadsheet Security**: Server-side sanitization preventing CSV and formula injection (`=`, `+`, `-`, `@`).

### 4. React Contact Cards Manager (Part 6)
- **Component Hierarchy**: `UserForm` → `UserList` → `UserCard`.
- **Dynamic Card Creation**: Instantly adds contacts to React state and re-renders without full-page reloads.
- **Contact Card Deletion**: Delete individual cards with reactive array filtering.
- **Local Persistence**: Syncs created cards with browser `localStorage`.

### 5. React Like / Unlike Card Mini Project (Part 7)
- **Encapsulated State**: Independent `useState` toggle inside reusable `LikeCard.jsx`.
- **Prop Inheritance**: Receives title, description, and tags via props.
- **Dynamic CTA**: Transitions between "Like" and "Unlike" with heart color indicators.

---

## 🛠️ Architecture & Technology Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 18 (Hooks, SPA) | Declarative UI, state management, component composition |
| **Build Tool** | Vite 5 | Fast HMR, optimized production tree-shaking |
| **Icons** | Lucide React | Clean, tree-shakeable SVG icons |
| **Styling** | Pure CSS3 (Custom Variables) | Modern theming, responsive grid & flexbox, 0-runtime overhead |
| **Backend API** | Google Apps Script (`Code.gs`) | Serverless `doGet`/`doPost` REST-like action handlers |
| **Database** | Google Sheets | Cloud spreadsheet serving as structured datastore |
| **CI/CD** | GitHub Actions | Automated build and deploy workflow to GitHub Pages |

---

## 📁 Project Folder Structure

```
portfolio-project/
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
│
├── google-apps-script/
│   └── Code.gs                   # Apps Script backend (doGet, doPost, auth, CRUD)
│
├── public/
│   ├── favicon.svg               # Modern SVG favicon
│   └── resume.pdf                # Downloadable developer resume document
│
├── src/
│   ├── components/               # Modular presentation and functional components
│   │   ├── About.jsx             # Biography, philosophy, and architectural pillars
│   │   ├── Certifications.jsx    # Verified certifications with credential verification
│   │   ├── Contact.jsx           # Validated contact form with Google Sheets integration
│   │   ├── Education.jsx         # Academic timeline and degrees
│   │   ├── Experience.jsx        # Career timeline with responsibilities & tech tags
│   │   ├── Footer.jsx            # Semantic footer with SPA links and copyright
│   │   ├── Hero.jsx              # Hero banner with CTAs, stats, and avatar
│   │   ├── LikeCard.jsx          # Reusable Like/Unlike card mini project (Part 7)
│   │   ├── Navbar.jsx            # Responsive navigation bar with theme toggle
│   │   ├── Projects.jsx          # Featured work with live demo launchers
│   │   ├── Skills.jsx            # Categorized skills with badges
│   │   ├── UserCard.jsx          # Individual contact card with deletion (Part 6)
│   │   ├── UserForm.jsx          # Form to create new contact cards (Part 6)
│   │   └── UserList.jsx          # Parent container mapping contact cards (Part 6)
│   │
│   ├── data/
│   │   └── portfolioData.js      # Centralized editable developer placeholders
│   │
│   ├── hooks/
│   │   └── useTheme.js           # Light/Dark mode state and localStorage hook
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx    # Admin login & Google Sheets response viewer
│   │   ├── ContactManager.jsx    # React Contact Cards SPA & Like/Unlike showcase
│   │   └── Portfolio.jsx         # Complete Resume/Portfolio multi-section page
│   │
│   ├── services/
│   │   └── googleSheetsAPI.js    # Fetch client for Google Apps Script Web App
│   │
│   ├── styles/
│   │   ├── global.css            # Base typography, reset, buttons, inputs, alerts
│   │   ├── responsive.css        # Responsive layouts and media queries
│   │   └── themes.css            # CSS variables for Light and Dark themes
│   │
│   ├── App.jsx                   # Application root with view router and state
│   └── main.jsx                  # React 18 DOM mount point
│
├── .gitignore
├── index.html                    # HTML5 template with Inter & JetBrains Mono fonts
├── package.json
├── vite.config.js                # Vite configuration with relative base support
└── README.md                     # Comprehensive project documentation
```

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zeravia/portfolio-contact-manager.git
   cd portfolio-contact-manager
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 📊 Google Sheets & Google Apps Script Setup

Follow these steps to connect your contact form to a live Google Sheet:

### Step 1: Create the Google Spreadsheet
1. Navigate to [Google Sheets](https://sheets.new) and create a new sheet.
2. Rename the spreadsheet to `Portfolio_Contacts_DB`.
3. Rename the first tab to `Contacts`.
4. Add the following header row in **Row 1**:
   | Column A | Column B | Column C | Column D | Column E | Column F | Column G |
   |:---:|:---:|:---:|:---:|:---:|:---:|:---:|
   | **ID** | **Name** | **Email** | **Phone** | **Subject** | **Message** | **Timestamp** |

### Step 2: Open the Apps Script Editor
1. In your Google Spreadsheet menu, click **Extensions** > **Apps Script**.
2. Clear any default code in `Code.gs`.
3. Open `google-apps-script/Code.gs` from this project repository, copy its entire contents, and paste it into the Apps Script editor.

### Step 3: Configure Administrator Credentials
By default, the script uses:
- **Admin Username / Email**: `admin@zeravia.com`
- **Admin Password**: `Admin@123456`

To set custom private credentials:
1. In the Apps Script editor, click **Project Settings** (gear icon) on the left sidebar.
2. Under **Script Properties**, click **Add script property**:
   - `ADMIN_EMAIL`: Your custom admin email
   - `ADMIN_PASSWORD`: Your strong private password
3. Click **Save script properties**.

### Step 4: Deploy as a Web App
1. In the upper right corner of the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the settings:
   - **Description**: `Portfolio API v1`
   - **Execute as**: `Me (your Google email)`
   - **Who has access**: `Anyone` *(required for contact submissions from the public web)*
4. Click **Deploy**.
5. Grant any requested Google authorization permissions.
6. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 5: Connect Web App URL to the Frontend
You can link the Web App URL in either of two convenient ways:
- **Option A (UI Settings):** Open the application, click **Admin** in the navbar, click **API Settings**, paste the URL into the input field, and click **Save & Connect**.
- **Option B (Environment Variable):** Create a `.env.local` file in your project root:
  ```env
  VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
  ```

---

## 🔒 Admin Authentication & Security

- **Server-Side Token Authentication**: Administrative read and delete actions (`getResponses`, `deleteResponse`) reject any request that lacks a valid session token generated by `adminLogin`.
- **Never Trust Frontend Flags**: Administrative status is never stored as an unverified client boolean.
- **Formula Injection Mitigation**: Incoming strings beginning with `=`, `+`, `-`, or `@` are safely prepended with a single quote (`'`) server-side to prevent spreadsheet formula execution exploits.
- **No Secrets in Source Control**: Credentials and tokens are stored in Google Script Properties and session memory—never committed to Git.

---

## 🚀 GitHub Actions CI/CD Deployment

This repository includes a fully automated deployment workflow in `.github/workflows/deploy.yml`.

### Setting Up GitHub Pages

1. Create a repository on GitHub (e.g., `portfolio-contact-manager`).
2. Push your project commits:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio-contact-manager.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub, navigate to **Settings** > **Pages**:
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. (Optional) To bake your Apps Script URL into the build automatically:
   - Navigate to **Settings** > **Secrets and variables** > **Actions**.
   - Create a repository secret named `VITE_GOOGLE_APPS_SCRIPT_URL` containing your deployed Web App URL.
5. The GitHub Action will automatically run, build the Vite application, and deploy the `dist/` directory to GitHub Pages.

---

## 🧪 Testing & Verification Checklist

| Test Item | Verification Criteria | Status |
|---|---|:---:|
| **Navigation Links** | Smoothly scroll to every section on the page | ✅ Passed |
| **Active Nav Highlight** | Highlights link corresponding to current viewport position | ✅ Passed |
| **Mobile Hamburger** | Toggles cleanly on tablet and mobile viewports | ✅ Passed |
| **Light/Dark Toggle** | Toggles themes smoothly; persists state in `localStorage` | ✅ Passed |
| **Resume Download** | Successfully triggers download of `Alex_Morgan_Resume.pdf` | ✅ Passed |
| **Form Required Fields** | Rejects empty submissions with visible error cues | ✅ Passed |
| **Email Validation** | Rejects invalid email formats (e.g. `invalid@`) | ✅ Passed |
| **Duplicate Prevention** | Flags immediate repeat submissions with warning notice | ✅ Passed |
| **Admin Login (Valid)** | Authenticates `admin@zeravia.com` / `Admin@123456` | ✅ Passed |
| **Admin Login (Invalid)**| Displays error message for incorrect credentials | ✅ Passed |
| **Password Show/Hide** | Toggles password field masking via eye icon | ✅ Passed |
| **Response Listing** | Renders submission cards with formatted timestamps | ✅ Passed |
| **Response Deletion** | Deletes selected response dynamically | ✅ Passed |
| **Dynamic Contact Cards**| Adds new card dynamically to `UserList` | ✅ Passed |
| **Contact Card Deletion**| Deletes specific card by ID without page refresh | ✅ Passed |
| **Like / Unlike Toggle** | Toggles like state and increments/decrements counter | ✅ Passed |
| **Vite Production Build** | Compiles with 0 warnings or syntax errors (`npm run build`) | ✅ Passed |

---

## 🔮 Future Improvements

- [ ] Add CSV export functionality in the Admin Dashboard.
- [ ] Implement email notifications via Google Apps Script MailApp on new contact submission.
- [ ] Add paginated query support for sheets with over 1,000 records.
- [ ] Integrate Web Speech API for interactive audio resume narration.

---

## 📄 License

This project is licensed under the MIT License. Feel free to use and customize it for your personal developer portfolio.

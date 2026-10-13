# Awesh Hussain — Machine Learning Engineer Portfolio

An editorial, responsive, production-ready portfolio website inspired by high-fashion magazine layouts and modern engineering aesthetics. Built with **React 18**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🎨 Visual Identity & Architecture

* **Signature Palette:**
  * Primary Canvas (Ivory): `#F5F0E7`
  * Secondary Surface (Cream): `#EAE2D6`
  * Focal Accent (Terracotta): `#C96D4F`
  * Typography (Near-Black): `#171717`
  * Muted Label Text: `#77736D`
  * Dark Mode: Charcoal `#111111` with warm terracotta highlights and soft panels
* **Typography Hierarchy:**
  * Display Header: `Bebas Neue` / `Anton`
  * Editorial Name: `Cormorant Garamond`
  * Body & Interface: `Inter`
  * Signature Script: `Caveat`
* **Signature Design Elements:**
  * Fullscreen cinematic welcome sequence with text reveals, session memory, and skip controls.
  * Editorial hero featuring oversized condensed `PORTFOLIO` lettering, 3D terracotta circle, authentic portrait placement, and rotating circular availability badge.
  * Verified Machine Learning showcase featuring **Chakravat Manthan**, **Used Car Price Prediction**, and **Personal AI Assistant**.
  * Accessible Project Detail modal with architecture workflows and research boundaries.
  * Transparent skills matrix and verified journey milestones.
  * Active scrollspy navigation, mobile drawer menu, and one-click copy email feedback.

---

## 🚀 Running Locally

### Prerequisites
* Node.js (v18 or higher recommended; developed on Node v24)
* npm (v9 or higher)

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 📷 How to Add Your Portrait Photo

1. Place your transparent cutout photograph (`.png`) or photograph into:
   ```
   public/assets/portrait.png
   ```
2. Open [`src/config/profile.ts`](file:///d:/portfolio/src/config/profile.ts) and verify or update `portraitPath`:
   ```ts
   portraitPath: '/assets/portrait.png',
   ```
3. The hero automatically layers your portrait over the terracotta circle and under/over the display typography just like in the reference image.

---

## ⚙️ Updating Content & Projects

All project and personal information is centrally located in `src/config/`:

| File | Purpose |
| :--- | :--- |
| [`src/config/profile.ts`](file:///d:/portfolio/src/config/profile.ts) | Personal bio, email, GitHub URL, LinkedIn URL, tagline, availability status |
| [`src/config/projects.ts`](file:///d:/portfolio/src/config/projects.ts) | Project titles, descriptions, workflows, capabilities, limitations, and URLs |
| [`src/config/skills.ts`](file:///d:/portfolio/src/config/skills.ts) | Categorized technical skills across ML, Computer Vision, Dev, and Tools |
| [`src/config/timeline.ts`](file:///d:/portfolio/src/config/timeline.ts) | Career and research milestones |

---

## 🛡️ License
Private & Personal Portfolio for **Awesh Hussain**.

# M.S. Ochieng Law - Brand & Website Identity

![M.S Ochieng Elite Law Firm Theme - Home](./screenshot.png)

A modern, professional web presence for the M.S. Ochieng Law Firm. 

## Institutional Aesthetic
This repository features a **Premium, High-Stakes Institutional Law Firm** aesthetic designed to convey unshakeable structural integrity and elite strategy. 

The aesthetic foundation includes:
- **Sovereign Dark Themes:** A dominant `#0a0a0a` secondary tone that roots the viewer in exclusivity and authority.
- **Deep Maroon Precision:** A bold primary accent (`#800020`) used strategically to draw the eye, denoting critical action and unapologetic mastery.
- **Classic Typography:** Crisp, commanding serifs paired with highly legible body text, engineered for clarity and executive presence.
- **Strategic Micro-Animations:** Fluid, meticulously timed Framer Motion reveals that bring the firm's philosophy to life without sacrificing solemnity.

### Technology Stack
This application leverages modern web technologies to achieve its high-performance, responsive aesthetic:
- **Core Language:** JavaScript (ES6+), leveraging JSX for component structure.
- **Framework:** React.js via Vite for lightning-fast hot module replacement and optimized production builds.
- **Styling:** TailwindCSS for precision styled utility classes.
- **Animations:** Framer Motion for liquid-smooth, professional transitions.
- **Routing:** Wouter for a lightweight, hook-based routing approach.

## Installation & Local Development

To run the project locally, ensure you have Node.js installed, then execute:

```bash
# Install all required dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will run locally on Vite's default port.

## Deployment to Vercel

This repository is strictly configured to be **Deploy-Ready for Vercel** natively. 

It is completely zero-configuration. The root contains the `package.json` and `vite.config.js` files naturally expected by automation platforms.

### Quick Deploy
1. Commit all your latest code and push to your GitHub repository.
2. Sign in to your [Vercel account](https://vercel.com/).
3. Click **Add New** → **Project**.
4. Import this repository. 
5. Vercel will automatically detect `Vite` as the framework. Leave all build settings to their auto-detected defaults.
6. Click **Deploy**.

## Building for Production
To manually build the front-end application without deploying, simply run:
```bash
npm run build
```
This will compile the optimized application assets into the `/dist` directory.

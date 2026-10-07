# PORTFOLIO_DESIGN.md

## 1. Project Goal

Build a visually impressive, modern personal portfolio for **Nguyễn Cao Bản** focused on:

- AI / Machine Learning
- RAG & LLM Applications
- Computer Vision
- Backend / Software Engineering
- AI Research

The website should feel like a **high-end creative developer portfolio**, not a static online CV.

The design must use motion, depth, glow, 3D elements, scroll-based effects, and interactive cards while keeping the content readable and professional.

Primary goals:

1. Create a strong first impression within the first 5 seconds.
2. Highlight real projects instead of generic skill lists.
3. Present research interests clearly.
4. Make GitHub, LinkedIn, CV, and project repositories easy to access.
5. Maintain excellent performance and mobile responsiveness.
6. Deploy cleanly to GitHub Pages.

---

# 2. Technical Stack

Use:

- React
- Vite
- Tailwind CSS
- Framer Motion
- GSAP
- GSAP ScrollTrigger
- Three.js
- React Three Fiber
- @react-three/drei
- Lucide React
- Lenis for smooth scrolling

Optional libraries:

- Aceternity UI
- Magic UI
- React Icons

Do not add dependencies unless they provide a clear visual or UX benefit.

---

# 3. Visual Direction

## Theme

Primary theme:

**Dark Futuristic AI / Creative Developer**

The visual language should feel technical, modern, cinematic, and slightly experimental.

Avoid:

- Generic Bootstrap portfolio appearance
- Too many rounded cards
- Excessive neon everywhere
- Rainbow gradients
- Overuse of glassmorphism
- Large amounts of text
- Animations that make content hard to read
- Effects that significantly reduce performance

---

# 4. Color System

Main background:

```text
#050505
#080808
#0B0B0F
```

Secondary surfaces:

```text
#111116
#15151C
```

Primary text:

```text
#F5F5F5
```

Secondary text:

```text
#A1A1AA
```

Accent colors:

```text
Electric Blue: #4F7CFF
Purple:        #8B5CF6
Cyan:          #22D3EE
```

Use gradients only for important focal areas.

Example:

```css
linear-gradient(
  135deg,
  #4F7CFF,
  #8B5CF6,
  #22D3EE
)
```

Accent colors should mainly appear in:

- Hero visual
- CTA hover
- Important keywords
- Project card borders
- Active navigation
- Interactive effects

---

# 5. Typography

Recommended fonts:

Primary:

- Geist
- Inter

Optional display font:

- Space Grotesk

Typography hierarchy:

```text
Hero name:
64–96px desktop
44–56px tablet
36–44px mobile

Section heading:
48–64px desktop

Project heading:
24–32px

Body:
16–18px
```

Use strong typography instead of filling the page with decorative elements.

---

# 6. Global Interaction System

The entire site should feel responsive to user interaction.

Implement:

## Mouse Spotlight

A subtle radial glow follows the mouse.

The effect must remain behind content.

Do not make it excessively bright.

---

## Custom Cursor

Desktop only.

Use a small circular cursor.

On interactive elements:

- slightly enlarge
- add subtle glow
- optionally display labels such as `VIEW`

Disable custom cursor on touch devices.

---

## Smooth Scroll

Use Lenis.

Scrolling should feel smooth but not slow.

Avoid excessive inertia.

---

## Scroll Reveal

Elements enter the viewport using:

- opacity
- translateY
- blur

Example:

```text
opacity: 0 → 1
translateY: 40px → 0
blur: 8px → 0
```

Animation duration:

```text
0.6 – 1.0 seconds
```

Stagger children where appropriate.

---

# 7. Page Structure

The website is a single-page portfolio.

Sections:

```text
Navbar
Hero
About
Featured Projects
Research
Skills / Tech Stack
Experience & Competitions
GitHub / Activity
Contact
Footer
```

---

# 8. Navbar

Navbar should initially be transparent.

After scrolling:

- dark semi-transparent background
- subtle blur
- thin bottom border

Desktop navigation:

```text
Home
About
Projects
Research
Skills
Contact
```

Right side:

```text
GitHub icon
LinkedIn icon
```

Add an animated active section indicator.

Mobile:

Use an animated fullscreen menu.

Menu opening animation:

```text
clip-path reveal
```

or

```text
scaleY
```

Do not use a generic dropdown menu.

---

# 9. Hero Section

The Hero is the most visually important section.

Viewport height:

```text
min-height: 100vh
```

Desktop layout:

```text
-------------------------------------------------
|                                               |
|  LEFT CONTENT             RIGHT VISUAL        |
|                                               |
|  Nguyễn Cao Bản            3D / AI Object     |
|                                               |
|  AI Developer                                 |
|  RAG & LLM Applications                       |
|  Software Engineering                         |
|                                               |
|  Short introduction                           |
|                                               |
|  [Explore Work] [GitHub]                      |
|                                               |
-------------------------------------------------
```

---

## Hero Intro

Small label:

```text
HELLO, I'M
```

Main title:

```text
NGUYỄN
CAO BẢN
```

Use animated text reveal.

Each line should slide upward from an overflow-hidden container.

---

## Role Text

Use animated role switching.

Example:

```text
AI Developer
Machine Learning Engineer
RAG & LLM Builder
AI Researcher
```

Use smooth vertical or fade transitions.

Do not use old-style terminal typing animations unless visually refined.

---

## Hero Description

Suggested tone:

```text
I build intelligent systems that combine
AI models, retrieval systems, computer vision,
and reliable software engineering.
```

Keep the text short.

---

## Hero Buttons

Primary:

```text
Explore My Work
```

Secondary:

```text
GitHub
```

Optional:

```text
Download CV
```

Hover behavior:

- slight scale
- animated border
- moving glow
- arrow shifts right

---

# 10. Hero 3D Visual

The right side should contain one interactive Three.js scene.

Recommended concept:

## Option A — AI Orb

A floating sphere made from:

- particles
- wireframe
- noise deformation

Behavior:

- slowly rotates
- reacts slightly to mouse position
- subtle pulse
- particles move around the sphere

Preferred option.

---

## Option B — Neural Network

Floating nodes connected with lines.

Nodes gently move.

Mouse movement changes camera perspective slightly.

---

## Option C — Abstract Geometry

Metallic or glass-like geometric structure.

Use environment lighting.

Avoid realistic humanoid 3D models.

---

## Hero Background

Add a low-opacity:

- grid
- dots
- particles
- noise texture

Optional animated gradient blobs.

The background must never compete with the text.

---

# 11. Scroll Indicator

At bottom of Hero:

```text
SCROLL TO EXPLORE
```

with an animated line.

Animation:

```text
scaleY 0 → 1
```

loop slowly.

---

# 12. About Section

Do not create a boring biography card.

Use large typography.

Example layout:

```text
ABOUT
-----------------------------------------

I'M AN AI DEVELOPER WHO ENJOYS BUILDING
SYSTEMS WHERE MACHINE LEARNING MEETS
REAL SOFTWARE.

                    short description →
```

Important words can use the accent gradient.

Content can mention:

- HCMUS
- Artificial Intelligence
- AI systems
- research
- software development

Keep the text concise.

---

# 13. Animated Statistics

Below About, optionally show:

```text
AI / ML
RAG
Computer Vision
Research
```

or real numerical statistics later.

Do not invent fake statistics.

Animation:

numbers / labels reveal on scroll.

---

# 14. Featured Projects

This is the most important content section after Hero.

Heading:

```text
SELECTED
PROJECTS
```

Use oversized typography.

---

## Project Layout

Use alternating large project cards.

Example:

```text
PROJECT 01

------------------------------------------
|                                        |
|             SCREENSHOT                 |
|                                        |
------------------------------------------

AI Story Adventure

RAG-powered interactive storytelling platform

FastAPI · Gemini · Qdrant · React

[VIEW PROJECT] [GITHUB]
```

Alternate left/right layouts between projects.

---

# 15. Project Card Effects

When hovering:

- image scale: 1 → 1.04
- border glow appears
- title slightly moves
- cursor displays `VIEW`
- technology labels animate
- optional image parallax

Do not rotate project cards excessively.

---

# 16. Recommended Featured Projects

Initial portfolio content can include:

## AI Story Adventure

Focus:

- RAG
- Gemini
- Qdrant
- FastAPI
- AI application architecture

---

## Vietnamese Medical NLP / Retrieval

Focus:

- biomedical retrieval
- Vietnamese NLP
- medical entity processing
- information retrieval

---

## Football Computer Vision

Focus:

- YOLO
- ByteTrack
- SigLIP
- tracking
- computer vision

---

## Financial / Tax AI Agent

Focus:

- structured financial data
- AI agent architecture
- rule engine
- Vietnamese tax compliance

---

## Video Editing Research

Can either appear here or be highlighted separately in Research.

---

# 17. Project Data Architecture

Projects must NOT be hard-coded directly inside React components.

Create:

```text
src/data/projects.js
```

Example structure:

```js
export const projects = [
  {
    id: 1,
    title: "AI Story Adventure",
    subtitle: "RAG-powered interactive storytelling platform",
    description: "...",
    image: "/projects/ai-story.png",
    tags: [
      "FastAPI",
      "Gemini",
      "Qdrant",
      "RAG"
    ],
    github: "...",
    demo: "...",
    featured: true
  }
]
```

Project cards should render from this data source.

---

# 18. Research Section

This section differentiates the portfolio from generic developer portfolios.

Heading:

```text
RESEARCH
&
EXPLORATION
```

Visual style should be more restrained than the Projects section.

---

## Main Research Topic

Highlight:

```text
Adaptive Spatio-Temporal
Rectified-Flow Video Editing
```

Include a concise description explaining the research direction.

Display keywords:

```text
Video Editing
Rectified Flow
Diffusion Models
Flow Matching
Generative AI
Computer Vision
```

---

# 19. Research Visual

Use one of:

- animated timeline
- paper cards
- research graph
- flowing node network

Recommended:

A vertical research timeline.

Example:

```text
Video Generation
       ↓
Diffusion Editing
       ↓
Flow Matching
       ↓
Rectified Flow
       ↓
Video Editing
       ↓
Adaptive Spatio-Temporal Control
```

Animate the vertical line during scroll.

---

# 20. Research Paper Cards

Each research paper / topic card can show:

```text
Paper name
Year
Short relevance
Read Paper →
```

Hover:

- border accent
- arrow movement
- slight background illumination

---

# 21. Skills Section

Avoid conventional progress bars such as:

```text
Python █████████ 90%
```

Do NOT use skill percentages.

Instead use technology groups.

---

## Groups

### AI / Machine Learning

```text
PyTorch
Scikit-learn
NumPy
Pandas
YOLO
CNN
CLIP
SigLIP
```

### LLM / RAG

```text
LangChain
LangGraph
RAG
Qdrant
ChromaDB
FAISS
BM25
Gemini API
OpenAI API
```

### Backend

```text
FastAPI
REST API
Firebase
SQL
```

### Frontend

```text
React
JavaScript
Tailwind CSS
HTML/CSS
```

### Tools / Deployment

```text
Git
GitHub
Docker
Coolify
Cloudflare
WSL
Linux
```

---

# 22. Skills Animation

Recommended design:

Floating technology pills/cards.

On hover:

- subtle glow
- small scale
- icon rotation <= 5 degrees

Optional desktop effect:

A slow orbital layout around:

```text
AI
```

Do not create constant fast motion.

---

# 23. Experience & Competitions

Present as a timeline.

Possible categories:

```text
Research Lab
AI Competitions
Hackathons
University Projects
```

Each timeline item:

```text
YEAR
TITLE
ROLE
SHORT DESCRIPTION
```

Timeline line should animate while scrolling.

---

# 24. GitHub Section

Optional.

Display:

```text
LET'S BUILD
SOMETHING
INTERESTING.
```

Include:

- GitHub profile button
- selected repositories
- contribution graph only if reliable

Do not embed heavy third-party widgets that slow the page.

---

# 25. Contact Section

The ending section should be visually strong.

Full viewport or near-full viewport.

Large text:

```text
HAVE AN IDEA?

LET'S
BUILD IT.
```

CTA:

```text
GET IN TOUCH →
```

Show:

```text
GitHub
LinkedIn
Email
```

Background can contain:

- moving gradient
- giant blurred orb
- slow particle field

Keep interaction subtle.

---

# 26. Footer

Minimal.

Example:

```text
© 2026 Nguyễn Cao Bản
Built with React, Three.js & too much coffee.
```

Optional fun line, but keep professional.

---

# 27. Page Transition

Because the initial version is a single-page website, avoid complex router transitions.

Use section-level motion instead.

If project detail pages are added later:

Use:

```text
opacity + clip-path transition
```

---

# 28. Animation Rules

Animation should communicate hierarchy.

Priority:

```text
Hero                 VERY HIGH
Projects             HIGH
Research             MEDIUM
Skills               MEDIUM
Experience           LOW
Footer / Contact     MEDIUM
```

Do not animate every single text element.

---

# 29. Motion Accessibility

Respect:

```css
prefers-reduced-motion
```

When enabled:

- disable Three.js heavy motion
- disable parallax
- remove continuous cursor effects
- use simple opacity transitions

---

# 30. Performance Requirements

Target:

```text
Lighthouse Performance >= 85
Accessibility >= 90
Best Practices >= 90
SEO >= 90
```

Rules:

- lazy load images
- compress screenshots
- prefer WebP / AVIF
- lazy-load 3D content
- avoid huge textures
- minimize continuous JS animation
- pause animations when outside viewport
- avoid unnecessary rerenders

---

# 31. Mobile Rules

Mobile must NOT simply shrink desktop layout.

For mobile:

- remove custom cursor
- simplify particles
- reduce Three.js geometry
- stack Hero content vertically
- move 3D visual behind or below text
- disable expensive parallax
- enlarge tap targets
- collapse navigation into fullscreen menu

Project cards become vertical.

---

# 32. Responsive Breakpoints

Suggested:

```text
mobile:
< 640px

tablet:
640px – 1024px

desktop:
> 1024px
```

Test especially:

```text
390 × 844
768 × 1024
1366 × 768
1440 × 900
1920 × 1080
```

---

# 33. Folder Structure

Recommended structure:

```text
portfolio/
│
├── public/
│   ├── avatar/
│   ├── projects/
│   ├── research/
│   ├── icons/
│   └── cv/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── SmoothScroll.jsx
│   │   │
│   │   ├── hero/
│   │   │   ├── Hero.jsx
│   │   │   ├── HeroCanvas.jsx
│   │   │   └── AIOrb.jsx
│   │   │
│   │   ├── projects/
│   │   │   ├── Projects.jsx
│   │   │   └── ProjectCard.jsx
│   │   │
│   │   ├── research/
│   │   │   ├── Research.jsx
│   │   │   └── ResearchTimeline.jsx
│   │   │
│   │   ├── skills/
│   │   │   └── Skills.jsx
│   │   │
│   │   └── ui/
│   │       ├── Cursor.jsx
│   │       ├── Spotlight.jsx
│   │       └── Reveal.jsx
│   │
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── research.js
│   │   └── experience.js
│   │
│   ├── hooks/
│   │   ├── useMousePosition.js
│   │   └── useReducedMotion.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── PORTFOLIO_DESIGN.md
├── package.json
├── vite.config.js
└── README.md
```

---

# 34. Component Principles

Each component should have one responsibility.

Avoid:

```text
App.jsx = 1000+ lines
```

Prefer:

```text
Hero
Projects
ProjectCard
Research
Skills
Experience
Contact
```

Store portfolio content in `/src/data`.

Store UI components separately.

---

# 35. SEO

Set:

```text
title:
Nguyễn Cao Bản | AI Developer

description:
AI developer focused on machine learning, RAG, computer vision,
software engineering and generative AI research.
```

Add:

- Open Graph metadata
- favicon
- social preview image
- canonical URL

---

# 36. GitHub Pages Deployment

The site must support deployment to:

```text
https://caoban123.github.io
```

Preferred repository:

```text
caoban123.github.io
```

Use GitHub Actions for deployment.

For this repository name, Vite base can remain:

```js
base: "/"
```

If deployed from another repository:

```js
base: "/repository-name/"
```

---

# 37. GitHub Actions

Create:

```text
.github/workflows/deploy.yml
```

Deployment flow:

```text
push to main
      ↓
npm install
      ↓
npm run build
      ↓
dist/
      ↓
GitHub Pages
```

---

# 38. Content Philosophy

The website must focus on proof of work.

Bad:

```text
I am passionate.
I am hardworking.
I love AI.
```

Better:

```text
Built a retrieval system using Qdrant and Gemini.

Implemented object tracking using YOLO and ByteTrack.

Exploring adaptive control in rectified-flow video editing.
```

Projects should demonstrate abilities rather than claim them.

---

# 39. Animation Philosophy

Use the rule:

```text
Motion should explain hierarchy,
not distract from content.
```

A visitor should immediately understand:

```text
Who is this?
↓
What does he build?
↓
What projects has he done?
↓
What is he researching?
↓
How do I contact him?
```

---

# 40. Final Desired Experience

When a visitor enters:

```text
Dark screen
    ↓
Subtle particles appear
    ↓
NGUYỄN CAO BẢN reveals
    ↓
3D AI orb fades into view
    ↓
Mouse creates subtle light response
    ↓
User scrolls
    ↓
Large About typography appears
    ↓
Projects reveal with cinematic transitions
    ↓
Research timeline draws itself
    ↓
Skills float into view
    ↓
Contact section ends with large typography
```

The final result should feel like:

```text
AI researcher
+
software engineer
+
creative developer
```

rather than:

```text
student resume website
```

---

# 41. Implementation Priority

Build in this order:

```text
1. Global layout + typography
2. Navbar
3. Hero static layout
4. Hero animation
5. Three.js visual
6. About
7. Projects
8. Research
9. Skills
10. Experience
11. Contact
12. Responsive design
13. Performance optimization
14. GitHub Pages deployment
```

Do not start by implementing every animation.

First make the static layout visually correct.

Then add motion progressively.

---

# 42. Definition of Done

The portfolio is considered complete when:

- Desktop and mobile layouts are polished
- Hero contains one optimized 3D visual
- Smooth scrolling works
- Projects render from data files
- Research section exists
- Skills are grouped logically
- All external links work
- CV can be downloaded
- GitHub Pages deployment works
- No console errors
- No horizontal overflow
- Animations respect reduced-motion preferences
- Lighthouse scores remain acceptable
- Website remains usable without animations

---

# 43. Design Keyword Reference

Use these keywords when searching for visual inspiration:

```text
Awwwards developer portfolio
creative developer portfolio
Three.js portfolio
AI portfolio website
dark futuristic web design
kinetic typography portfolio
GSAP scroll portfolio
minimal cyberpunk website
interactive developer portfolio
webgl portfolio
```

Final design direction:

> **Cinematic dark AI portfolio with controlled motion, interactive depth, strong typography, selected project storytelling, and research-oriented credibility.**

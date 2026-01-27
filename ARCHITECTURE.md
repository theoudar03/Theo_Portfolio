# Architecture & Design Plan - Light Galaxy Portfolio

## 1. UI Layout & Design Strategy

**Theme**: Light Galaxy

- **Background**: A very subtle off-white/pale-gray background (`#f8f9fa`) with soft, flowing gradient orbs in pastel purples (`#e9d5ff`), blues (`#dbeafe`), and pinks (`#fce7f3`).
- **Effect**: Using absolute positioned, blurred `div`s with `framer-motion` to create a "breathing" galaxy nebula effect behind the content.
- **Glassmorphism**: Cards (Projects, Experience) will have a white background with high transparency (`bg-white/70`), backdrop-blur (`backdrop-blur-md`), and thin white borders to simulate glass.
- **Typography**: `Inter` or `Outfit` for a clean, modern tech look. Headings in dark slate (`#1e293b`), body text in slate gray (`#475569`).
- **Animations**:
  - Fade-in on scroll (Intersection Observer / Framer Motion).
  - Hover effects on cards (slight lift + glow).
  - Hero text reveal animation.
  - "Stars" can be small, static SVGs scattered sparsely to avoid clutter.

## 2. Folder Structure

### Root

- `/client` (Frontend)
- `/server` (Backend)
- `README.md`
- `ARCHITECTURE.md`

### Frontend (/client)

```
src/
├── assets/         # Images, icons
├── components/     # Reusable UI components
│   ├── layout/     # Navbar, Footer
│   ├── shared/     # Buttons, Cards, Inputs
│   └── sections/   # Hero, About, Skills, Projects, Experience, Contact
├── context/        # React Context (if needed for global strict state)
├── hooks/          # Custom hooks (e.g., useScrollPosition)
├── styles/         # Global styles, Tailwind directives
├── utils/          # Helper functions, Animations variants
├── App.jsx         # Main routing
└── main.jsx        # Entry point
```

### Backend (/server)

```
src/
├── config/         # DB connection, env vars
├── controllers/    # Route logic
├── models/         # Mongoose schemas
├── routes/         # API routes
├── middlewares/    # Error handling, validation
└── index.js        # Server entry point
```

## 3. Component Breakdown

- **Navbar**: Sticky glassmorphism header. Logo on left, Links (Home, About...) on right. Mobile hamburger menu.
- **Hero**: Large centered heading "Hello, I'm [Name]". Subtitle "Full Stack Developer".
- **SkillBadge**: Pill-shaped component with icon and text.
- **ProjectCard**: Image top, Title/Desc middle, Tech Stack tags, Github/Live buttons bottom.
- **TimelineItem**: For Experience section (vertical line with dots).
- **ContactForm**: Inputs for Name, Email, Message.

## 4. MongoDB Schema

### Projects Schema

```javascript
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL
  tags: [String], // ["React", "Node"]
  githubLink: String,
  liveLink: String,
  featured: { type: Boolean, default: false },
  order: Number,
});
```

### Messages Schema

```javascript
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});
```

## 5. Performance & Best Practices

- **Lazy Loading**: Use `React.lazy` for heavy components/sections.
- **Image Optimization**: Use WebP format.
- **Code Optimization**: Memoize heavy calculations.
- **SEO**: Helmet/Head tags for meta titles/descriptions.
- **Security**: Sanitize inputs in backend (express-validator), Rate limiting on contact form.

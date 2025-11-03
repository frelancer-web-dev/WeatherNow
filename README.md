# 🎨 Mykola's Portfolio | Frontend Developer & Designer

A minimalist and modern web developer portfolio with dark theme, animations, and multi-language support.

## ✨ Features

- 🌙 **Dark Theme** — stylish design with focus on readability
- 🌍 **Multi-language** — support for English, Ukrainian, and Russian
- 📱 **Responsive Design** — looks great on all devices
- ⚡ **Smooth Animations** — using AOS library for scroll effects
- 🎯 **SEO Optimized** — meta tags, structured data, Open Graph
- 🚀 **High Performance** — fast loading, preload critical resources
- 📂 **Detailed Project View** — dedicated page for each project with gallery
- 🏷️ **Difficulty Tags** — easy, medium, hard project classification
- 🎨 **Collapsible Features** — show more/less functionality for project features

## 📁 Project Structure

```
ai-portfolio-landing/
│
├── index.html                           # Main portfolio page
├── README.md                            # Documentation (English)
├── README_UA.md                         # Documentation (Ukrainian)
├── README_ru.md                         # Documentation (Russian)
│
├── src/
│   │
│   ├── images/                          # Images and icons
│   │   ├── favicon.png                  # Site favicon
│   │   ├── og-image.jpg                 # Open Graph image
│   │   └── ...                          # Project screenshots
│   │
│   ├── translations/                    # JSON translation files
│   │   ├── en.json                      # English language
│   │   ├── uk.json                      # Ukrainian language
│   │   └── ru.json                      # Russian language
│   │
│   ├── css/                             # Stylesheets
│   │   ├── main.css                     # Main site styles
│   │   ├── project.css                  # Project page styles
│   │   └── projects.css                 # Projects grid styles
│   │
│   ├── js/                              # JavaScript files
│   │   ├── main.js                      # Main JavaScript (navigation, animations)
│   │   └── project-preview.js           # Project view logic
│   │
│   └── res/                             # Additional resources
│       ├── projects.html                # All projects page
│       ├── project.html                 # Single project view template
│       └── projects.json                # Projects database (configuration)
```

## 🚀 Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/frelancer-web-dev/ai-portfolio-landing.git
cd ai-portfolio-landing
```

2. **Open `index.html` in your browser**

Or use a live server for development:
```bash
# Install Live Server (if using VS Code)
# Or run a simple HTTP server
python -m http.server 8000
```

3. **Open in browser:**
```
http://localhost:8000
```

## 🛠️ Technologies

- **HTML5** — semantic markup, accessibility (ARIA)
- **CSS3** — flexbox, grid, custom properties, animations
- **JavaScript (ES6+)** — modular architecture, async/await
- **AOS Library** — scroll animations
- **Google Fonts** — Inter typeface

## 📝 Configuration

### Adding Projects

1. **Add project images** to `src/images/`

2. **Update `src/res/projects.json`:**
```json
{
  "project-id": {
    "titleKey": "projects.projectN.title",
    "descriptionKey": "projects.projectN.descriptionFull",
    "difficulty": "easy",
    "tags": ["HTML", "CSS", "JavaScript"],
    "images": [
      "https://url-to-image1.png",
      "https://url-to-image2.png",
      "https://url-to-image3.png"
    ],
    "featuresKeys": [
      "projects.projectN.feature1",
      "projects.projectN.feature2",
      "projects.projectN.feature3",
      "projects.projectN.feature4",
      "projects.projectN.feature5"
    ],
    "liveUrl": "https://example.com",
    "codeUrl": "https://github.com/username/repo"
  }
}
```

**Difficulty levels:**
- `"easy"` — green tag
- `"medium"` — orange tag
- `"hard"` — red tag

3. **Add translations** in `src/translations/*.json`:
```json
{
  "projects.projectN.title": "Project Title",
  "projects.projectN.description": "Short description",
  "projects.projectN.descriptionFull": "Full project description...",
  "projects.projectN.feature1": "Feature 1",
  "projects.projectN.feature2": "Feature 2",
  "projects.projectN.feature3": "Feature 3"
}
```

4. **Add project card** in `index.html` and `src/res/projects.html`:
```html
<article class="project-card" data-project-id="project-id">
  <div class="project-image">
    <img src="image-url.png" alt="Project Name" class="project-preview" loading="lazy">
    <div class="project-placeholder" style="background: linear-gradient(...)">
      <!-- SVG icon -->
    </div>
  </div>
  <div class="project-content">
    <h3 class="project-title" data-i18n="projects.projectN.title">Project Title</h3>
    <p class="project-description" data-i18n="projects.projectN.description">
      Description
    </p>
    <div class="project-tags">
      <span class="tag">HTML</span>
      <span class="tag">CSS</span>
      <span class="tag">JS</span>
    </div>
    <div class="project-links">
      <button class="project-link" data-project="external">View Live →</button>
      <a href="github-url" class="project-link code-link">Show Code</a>
    </div>
  </div>
</article>
```

### Changing Languages

Edit JSON files in `src/translations/` folder:
- `en.json` — English
- `uk.json` — Ukrainian
- `ru.json` — Russian

### Changing Color Scheme

Modify CSS variables in `src/css/main.css`:
```css
:root {
  --bg-primary: #0a0a0a;      /* Primary background */
  --bg-secondary: #111111;     /* Secondary background */
  --bg-card: #1a1a1a;          /* Card background */
  --text-primary: #ffffff;     /* Primary text */
  --text-secondary: #a1a1aa;   /* Secondary text */
  --accent: #6366f1;           /* Accent color */
  --accent-hover: #4f46e5;     /* Hover color */
  --border: #27272a;           /* Border color */
}
```

### Personalization

1. **Change personal information** in `index.html`:
   - Name, description, titles
   - Social media links
   - Meta tags for SEO

2. **Update favicon** — replace `src/images/favicon.png`

3. **Add your OG image** — replace `src/images/og-image.jpg`

## 🎯 Key Features Explained

### Difficulty Tags
Projects can be tagged with difficulty levels that appear as colored badges:
- **Easy** (Green) — Simple projects, beginner-friendly
- **Medium** (Orange) — Intermediate complexity
- **Hard** (Red) — Advanced projects with complex features

### Collapsible Features List
When a project has more than 3 features:
- First 3 features are always visible
- Remaining features are hidden behind "Show all features" button
- Button text changes based on selected language

### Dynamic Project Preview
Each project gets a dedicated page with:
- Image gallery with navigation arrows
- Indicator dots for multiple images
- Full project description
- Feature list with translations
- Live demo and source code buttons

## 📄 License

**MIT License**

Copyright (c) 2025 Mykola

Permission is hereby granted, free of charge, to use, modify, and distribute this software, provided that this copyright notice is preserved.

## 👤 Author

**Mykola** — Frontend Developer & Designer

- 🐙 GitHub: [@frelancer-web-dev](https://github.com/frelancer-web-dev)
- 💼 Upwork: [Profile](https://www.upwork.com/freelancers/~01dec1110f4bac0e7d)
- 💬 Telegram: [@privatefanat_dep](https://t.me/privatefanat_dep)

## 🤝 AI Co-Author

Developed with support from **Claude (Anthropic)** — AI assistant for web development

---

## 🐛 Troubleshooting

### Project preview page shows errors
- Check that `src/res/projects.json` exists and is valid JSON
- Verify project ID in URL matches an entry in `projects.json`
- Check browser console for specific error messages

### Images not loading
- Verify image URLs in `projects.json` are correct
- Check that images are accessible (not blocked by CORS)
- Ensure placeholder gradients are defined in project cards

### Language switching not working
- Check that all translation files exist in `src/translations/`
- Verify translation keys match between JSON files
- Clear browser cache and reload page

---

## 📞 Support

If you have questions or suggestions:
- Create an [Issue](https://github.com/frelancer-web-dev/ai-portfolio-landing/issues)
- Message me on [Telegram](https://t.me/privatefanat_dep)

---

⭐ If this project was helpful, please star it on GitHub!

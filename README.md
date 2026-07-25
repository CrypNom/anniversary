# Prem & Niruta — One Year Anniversary Website 💗

A 12-page animated, romantic, liquid-glassmorphism anniversary website.
Plain HTML/CSS/JS — no build step, no framework. Just open and go.

## How to view it

1. Unzip the folder.
2. Double-click `index.html` to open it in any modern browser (Chrome,
   Safari, Edge, Firefox). Every page is fully linked from the nav bar.
3. You need an internet connection the first time you open it, because
   the fonts (Fraunces, Quicksand, Caveat) load from Google Fonts. If you
   want it to work fully offline, download the font files and update the
   `@import` line at the top of `css/style.css`.

## Folder structure

```
anniversary-website/
├── index.html            Home / Hero — "Happy 1 Year Anniversary"
├── our-story.html        How Prem & Niruta met
├── timeline.html         Milestone timeline
├── gallery.html          Photo gallery with lightbox
├── letters.html          Open love letters
├── memories.html         Fun memories (flip cards)
├── wishes.html           Guestbook wall + wish form
├── closing.html          Closing page with confetti + fireworks
├── css/
│   ├── style.css         Design tokens, nav, glass cards, global animation
│   └── pages.css         Page-specific styles (hero locket, timeline, etc.)
├── js/
│   ├── main.js           Cursor glow, floating hearts, scroll reveal, nav toggle, live counter
│   ├── components.js     Gallery lightbox, wish form
│   └── confetti.js       Confetti + fireworks canvas (closing page)
└── assets/
    └── images/           Placeholder SVG photos (romantic gradient cards)
```

## Replacing the placeholder content with your real photos

Every image in this site is a clearly-labeled placeholder so you can swap
them in without touching any layout code:

- **Photos** — replace files inside `assets/images/` (e.g. `gallery-01.svg`
  → your own `gallery-01.jpg`). Keep the same filename *or* update the
  `src=""` in the matching `.html` file. JPG/PNG/WebP all work fine.
- **The live "days together" counter** — open `js/main.js`, find the line
  `new Date('2025-07-16')` inside `initAnniversaryCounter()`, and change it
  to your actual anniversary date.
- **Timeline / Our Story / Fun Memories / Wishes text** — this is written
  directly into each `.html` file (search for the section by its heading)
  — just edit the text between the tags. If you used the included
  `gen_pages.py` generator, you can also edit the Python lists at the top
  of that script and re-run `python3 gen_pages.py` to regenerate every
  page at once.

## Notes on the wishes/guestbook form

The wish form on `wishes.html` adds new wishes to the page instantly, but
only for the person viewing it in that moment — it doesn't save them
anywhere permanent (there's no backend/database here). To collect real
wishes from guests, connect the form in `js/components.js`
(`initWishForm`) to a simple form backend of your choice (e.g. Formspree,
a Google Form, or your own small API) and `POST` the `name`/`message`
fields there instead of just rendering them locally.

## Design notes

- **Palette**: blush pink, lavender, sky blue, and peach mesh gradient
  background, with magenta/violet/aqua "neon-pastel" glow accents used
  sparingly for CTAs and highlights.
- **Type**: Fraunces (romantic serif, headlines) + Quicksand (rounded,
  friendly body text) + Caveat (handwritten script for love-note moments).
- **Signature motif**: the "liquid ribbon" — a flowing animated gradient
  line used in the nav, section dividers, and footer of every page — and
  the morphing "liquid locket" frame around the hero photo.
- All animation respects `prefers-reduced-motion` for accessibility.

Happy anniversary, Prem & Niruta. 💗

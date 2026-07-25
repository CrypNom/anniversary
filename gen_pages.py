#!/usr/bin/env python3
import os

ROOT = "/home/claude/anniversary-website"

NAV = '''<nav class="site-nav">
  <a href="index.html" class="nav-brand"><span class="heart-mark">💗</span> Prem &amp; Niruta</a>
  <button class="nav-toggle" aria-label="Toggle menu">☰</button>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="our-story.html">Our Story</a></li>
    <li><a href="timeline.html">Timeline</a></li>
    <li><a href="gallery.html">Gallery</a></li>
    <li><a href="letters.html">Love Letters</a></li>
    <li><a href="memories.html">Fun Memories</a></li>
    <li><a href="wishes.html">Wishes</a></li>
    <li><a href="closing.html">Forever ✨</a></li>
  </ul>
</nav>'''

FOOTER = '''<footer class="site-footer">
  <div class="liquid-ribbon"></div>
  <p class="footer-love">Made with 💗 for one year, and every year after</p>
  <nav class="page-links">
    <a href="index.html">Home</a>
    <a href="our-story.html">Our Story</a>
    <a href="timeline.html">Timeline</a>
    <a href="gallery.html">Gallery</a>
    <a href="letters.html">Love Letters</a>
    <a href="memories.html">Fun Memories</a>
    <a href="wishes.html">Wishes</a>
    <a href="closing.html">Forever</a>
  </nav>
</footer>'''

BG_BLOBS = '''<div class="bg-mesh"></div>
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>
<div class="blob blob-3"></div>'''


def page(title, description, extra_head, body_content, extra_scripts=""):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Prem &amp; Niruta</title>
<meta name="description" content="{description}">
<link rel="icon" href="assets/images/favicon-src.svg" type="image/svg+xml">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/pages.css">
{extra_head}
</head>
<body>

{BG_BLOBS}

{NAV}

<main>
{body_content}
</main>

{FOOTER}

<script src="js/main.js"></script>
<script src="js/components.js"></script>
{extra_scripts}
</body>
</html>
'''


def write(fname, html):
    with open(os.path.join(ROOT, fname), "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", fname)


# ==========================================================================
# 1. OUR STORY
# ==========================================================================
our_story_body = '''
  <section class="page-hero wrap--tight wrap">
    <span class="eyebrow">chapter one</span>
    <h1>Our Story</h1>
    <p style="color:var(--ink-soft); max-width:600px; margin:0 auto;">How two strangers turned into each other's favorite person.</p>
  </section>

  <section class="wrap wrap--tight">
    <div class="story-row reveal">
      <div class="story-img"><img src="assets/images/story-1.svg" alt="How Prem and Niruta met"></div>
      <div>
        <p class="story-chip">how it began</p>
        <h2>The First Hello</h2>
        <p>It started with something small — a shared laugh, a conversation that
        wasn't supposed to last twenty minutes but somehow lasted three hours.
        Neither of us expected it, and that's exactly why it mattered.</p>
        <p><em>👉 Replace this paragraph with how you two actually met — the place, the awkward first words, the little detail neither of you forgot.</em></p>
      </div>
    </div>

    <div class="story-row reveal">
      <div class="story-img"><img src="assets/images/story-2.svg" alt="Getting to know each other"></div>
      <div>
        <p class="story-chip">getting closer</p>
        <h2>Getting to Know You</h2>
        <p>Late night calls that turned into early mornings. Learning each
        other's favorite songs, worst habits, and biggest dreams — and
        somehow loving all of it more with every conversation.</p>
        <p><em>👉 Swap in your own memory: your first date, the first trip, or the moment you realized this was different.</em></p>
      </div>
    </div>

    <div class="story-row reveal">
      <div class="story-img"><img src="assets/images/story-3.svg" alt="Falling in love"></div>
      <div>
        <p class="story-chip">falling deeper</p>
        <h2>Falling, On Purpose</h2>
        <p>Somewhere between the inside jokes and the quiet comfortable
        silences, "falling for you" turned into "choosing you" — every day,
        on purpose, no accident about it.</p>
        <p><em>👉 Add the moment you said "I love you" for the first time, or when you knew this was forever.</em></p>
      </div>
    </div>

    <div class="story-row reveal">
      <div class="story-img"><img src="assets/images/story-4.svg" alt="One year together"></div>
      <div>
        <p class="story-chip">today</p>
        <h2>One Year, and Counting</h2>
        <p>Twelve months of laughing until it hurt, showing up for each other,
        and building something that feels a little bit like home. Here's to
        the year behind us, and every one still ahead.</p>
      </div>
    </div>
  </section>

  <div class="wrap wrap--tight text-center">
    <a href="timeline.html" class="btn btn--primary">Walk Through Our Timeline →</a>
  </div>
'''
write("our-story.html", page(
    "Our Story",
    "How Prem and Niruta's love story began — from first hello to one year together.",
    "", our_story_body))

# ==========================================================================
# 2. TIMELINE
# ==========================================================================
milestones = [
    ("Aug 2024", "We Met", "A chance conversation turned into hours of talking. Neither of us saw it coming.", "timeline-01.svg"),
    ("Sep 2024", "First Date", "Coffee turned into a long walk, and the long walk turned into 'let's do this again.'", "timeline-02.svg"),
    ("Dec 2024", "First Trip Together", "New city, new memories, and the confirmation that we travel well together (mostly).", "timeline-03.svg"),
    ("Feb 2025", "Meeting the Family", "Nervous introductions that turned into easy laughter around the dinner table.", "timeline-04.svg"),
    ("Apr 2025", "Moved Closer Together", "Choosing each other, a little more, every single day.", "timeline-05.svg"),
    ("Jun 2025", "A Promise", "No grand proposal yet — just a quiet, certain promise that this is it.", "timeline-06.svg"),
    ("Jul 2026", "One Year Together", "Here we are. One year down. Forever still ahead.", "timeline-07.svg"),
]

t_items = ""
for date, title, desc, img in milestones:
    t_items += f'''    <div class="t-item reveal">
      <span class="t-dot"></span>
      <div class="t-card glass-card glass-card--pad">
        <img src="assets/images/{img}" alt="{title}">
        <div>
          <span class="t-date">{date}</span>
          <h3 style="margin:.2rem 0;">{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
    </div>
'''

timeline_body = f'''
  <section class="page-hero wrap wrap--tight">
    <span class="eyebrow">chapter two</span>
    <h1>Our Timeline</h1>
    <p style="color:var(--ink-soft); max-width:600px; margin:0 auto;">Every milestone that brought us from strangers to one year strong.</p>
  </section>

  <section class="wrap wrap--tight">
    <div class="timeline">
{t_items}    </div>
    <p class="text-center" style="margin-top:1rem;"><em>👉 Edit the <code>milestones</code> list in gen_pages.py (or copy this markup) to add your real dates, captions and photos.</em></p>
  </section>
'''
write("timeline.html", page(
    "Our Timeline",
    "The milestones of Prem and Niruta's first year together.",
    "", timeline_body))

# ==========================================================================
# 3. GALLERY
# ==========================================================================
gallery_photos = [
    ("gallery-01.svg", "Our First Coffee Date"),
    ("gallery-02.svg", "Sunset Walk"),
    ("gallery-03.svg", "Silly Selfie"),
    ("gallery-04.svg", "Dancing in the Rain"),
    ("gallery-05.svg", "Trip to the Hills"),
    ("gallery-06.svg", "Movie Night"),
    ("gallery-07.svg", "Birthday Surprise"),
    ("gallery-08.svg", "Cooking Together"),
    ("gallery-09.svg", "Beach Afternoon"),
    ("gallery-10.svg", "Lazy Sunday"),
    ("gallery-11.svg", "Festival Lights"),
    ("gallery-12.svg", "First 'I Love You'"),
]

g_items = ""
for img, caption in gallery_photos:
    g_items += f'''    <div class="g-item reveal" data-caption="{caption}">
      <img src="assets/images/{img}" alt="{caption}" loading="lazy">
      <span class="g-caption">{caption}</span>
    </div>
'''

gallery_body = f'''
  <section class="page-hero wrap wrap--tight">
    <span class="eyebrow">chapter three</span>
    <h1>Photo Gallery</h1>
    <p style="color:var(--ink-soft); max-width:600px; margin:0 auto;">A year of moments, big and small. Click any photo to see it up close.</p>
  </section>

  <section class="wrap wrap--tight">
    <div class="gallery-grid">
{g_items}    </div>
    <p class="text-center" style="margin-top:1.4rem;"><em>👉 Replace the files in <code>assets/images/</code> (gallery-01.svg … gallery-12.svg) with your real photos — keep the same filenames and everything updates automatically. Add more by copying a <code>.g-item</code> block.</em></p>
  </section>

  <!-- Lightbox modal, shared by every gallery image -->
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" aria-label="Close">✕</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous">‹</button>
    <div class="lightbox-inner">
      <img class="lightbox-img" src="" alt="Enlarged memory">
      <p class="lightbox-caption"></p>
    </div>
    <button class="lightbox-nav lightbox-next" aria-label="Next">›</button>
  </div>
'''
write("gallery.html", page(
    "Photo Gallery",
    "A gallery of Prem and Niruta's favorite photos together.",
    "", gallery_body))

# ==========================================================================
# 4. LOVE LETTERS
# ==========================================================================
letters_body = '''
  <section class="page-hero wrap wrap--tight">
    <span class="eyebrow">chapter four</span>
    <h1>Love Letters</h1>
    <p style="color:var(--ink-soft); max-width:600px; margin:0 auto;">Two open letters — one from each of us.</p>
  </section>

  <section class="wrap wrap--tight grid grid-2">
    <div class="glass-card letter reveal">
      <p>My Niruta,</p>
      <p>A year in, and you still make me laugh harder than anyone else I know.
      Thank you for the patience, the pep talks, and for choosing "us" on
      the hard days too. Here's to many, many more.</p>
      <p class="letter-sign">— Prem</p>
    </div>
    <div class="glass-card letter reveal">
      <p>My Prem,</p>
      <p>I didn't know a year could feel this full — of inside jokes, quiet
      Sunday mornings, and a love that keeps getting easier to trust. Thank
      you for being exactly you.</p>
      <p class="letter-sign">— Niruta</p>
    </div>
  </section>

  <div class="wrap wrap--tight text-center">
    <p><em>👉 Replace both letters above with the real words you'd want to say to each other — this page is meant to be read together.</em></p>
  </div>
'''
write("letters.html", page(
    "Love Letters",
    "Open letters between Prem and Niruta.",
    "", letters_body))

# ==========================================================================
# 5. FUN MEMORIES (flip cards)
# ==========================================================================
fun = [
    ("memory-01.svg", "Karaoke Fail", "The night we found out neither of us can hit that high note. We tried anyway."),
    ("memory-02.svg", "Road Trip Snacks", "The great snack debate — you were (mostly) right about the chips."),
    ("memory-03.svg", "Pet Name Origin", "The story behind the nickname that stuck, for reasons we still laugh about."),
    ("memory-04.svg", "Inside Joke #1", "You had to be there. You were. That's why it's still funny."),
    ("memory-05.svg", "Matching Outfits", "One time, completely unplanned. We still deny it was cute."),
    ("memory-06.svg", "The Rainy Picnic", "Planned a picnic, got rained out, ate sandwiches in the car instead — 10/10."),
]

flip_cards = ""
for img, title, back in fun:
    flip_cards += f'''    <div class="flip-card reveal" tabindex="0">
      <div class="flip-inner">
        <div class="flip-front" style="background-image:url('assets/images/{img}'); background-size:cover; background-position:center;">
          <h3 style="color:#fff; text-shadow:0 2px 10px rgba(0,0,0,.35);">{title}</h3>
        </div>
        <div class="flip-back">
          <p>{back}</p>
        </div>
      </div>
    </div>
'''

memories_body = f'''
  <section class="page-hero wrap wrap--tight">
    <span class="eyebrow">chapter five</span>
    <h1>Fun Memories</h1>
    <p style="color:var(--ink-soft); max-width:600px; margin:0 auto;">Hover (or tap) each card to flip it and relive the story.</p>
  </section>

  <section class="wrap wrap--tight grid grid-3">
{flip_cards}  </section>

  <div class="wrap wrap--tight text-center">
    <p><em>👉 Swap in your own six memories — replace the images in <code>assets/images/memory-01.svg</code> etc. and edit the titles/stories in gen_pages.py.</em></p>
  </div>
'''
write("memories.html", page(
    "Fun Memories",
    "Playful, funny memories from Prem and Niruta's first year.",
    "", memories_body))

# ==========================================================================
# 6. WISHES (guestbook wall + form)
# ==========================================================================
wishes = [
    ("Sita Sharma", "One year in and you two still look at each other like it's the first day. So happy for you both!"),
    ("Bibek Rai", "Prem, she's the best thing that's happened to you and we all know it. Cheers to year one!"),
    ("Anjali K.", "Watching your relationship grow this year has honestly given me so much hope for love. Congrats!"),
    ("Sujan Thapa", "Happy anniversary! May your Wi-Fi be strong and your love be stronger. 😄💗"),
    ("Maya Gurung", "You two balance each other so beautifully. Here's to many more years of laughter and love."),
]

wish_cards = ""
for name, msg in wishes:
    wish_cards += f'''    <div class="glass-card glass-card--pad wish-card reveal">
      <p>"{msg}"</p>
      <span class="wish-from">— {name}</span>
    </div>
'''

wishes_body = f'''
  <section class="page-hero wrap wrap--tight">
    <span class="eyebrow">chapter six</span>
    <h1>Wishes for Us</h1>
    <p style="color:var(--ink-soft); max-width:600px; margin:0 auto;">Kind words from the people who love us. Add your own below!</p>
  </section>

  <section class="wrap wrap--tight">
    <div class="glass-card glass-card--pad reveal" style="margin-bottom:2.5rem;">
      <h3 class="text-center">Leave a Wish 💌</h3>
      <form class="wish-form" id="wish-form">
        <input type="text" name="name" placeholder="Your name">
        <textarea name="message" placeholder="Write your wish for Prem &amp; Niruta..." required></textarea>
        <button type="submit" class="btn btn--primary" style="justify-self:center;">Send Wish 💗</button>
      </form>
      <p class="text-center" style="font-size:.82rem; color:var(--ink-soft); margin-top:.8rem;">
        <em>Note: wishes submitted here appear instantly for you, but only in this browser session — connect the form to a backend to save them permanently. See README.md.</em>
      </p>
    </div>

    <div class="wishes-wall" id="wishes-wall">
{wish_cards}    </div>
  </section>
'''
write("wishes.html", page(
    "Wishes",
    "Anniversary wishes and messages for Prem and Niruta.",
    "", wishes_body))

# ==========================================================================
# 7. CLOSING PAGE (confetti + fireworks)
# ==========================================================================
closing_body = '''
  <section class="closing-hero">
    <canvas id="celebration-canvas"></canvas>
    <div class="closing-content reveal-scale is-visible">
      <span class="hero-eyebrow">the final chapter (for now)</span>
      <h1>Here's To <span class="banner-word">Forever</span></h1>
      <p class="hero-sub" style="margin:1rem auto;">
        One year down. A lifetime of inside jokes, quiet mornings, loud
        laughter, and steady love still ahead of us. Thank you for being
        part of this chapter — here's to every one still to come.
      </p>
      <p class="closing-signature">With all our love,<br>Prem &amp; Niruta 💗</p>
      <button class="btn btn--primary replay-btn" onclick="window.replayCelebration && window.replayCelebration()">Celebrate Again 🎉</button>
      <div style="margin-top:1.2rem;">
        <a href="index.html" class="btn btn--ghost">Back to the Beginning ↺</a>
      </div>
    </div>
  </section>
'''
write("closing.html", page(
    "Forever",
    "The closing celebration page for Prem and Niruta's one year anniversary.",
    "", closing_body, extra_scripts='<script src="js/confetti.js"></script>'))

print("done — all pages generated")











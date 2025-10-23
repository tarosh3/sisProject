# For My Lovely Sister 💖 - Website

A beautiful, responsive website created with love for your sister! This includes a heartfelt home page, a fun Flappy Bird-style game, and a chocolate redemption page with photo slideshow.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Cute Animations**: Floating hearts, sparkles, and smooth transitions
- **Flappy Bird Game**: Collect chocolates with a heart character
- **Photo Slideshow**: Display your favorite sibling memories
- **Score Persistence**: Chocolates earned are saved between sessions
- **Pastel Theme**: Soft pinks, purples, and gradients
- **Interactive Effects**: Click sparkles and celebration animations

## 📁 File Structure

```
├── index.html          # Home page with heartfelt message
├── flappy.html         # Chocolate Hearts game page
├── redeem.html         # Chocolate redemption & photo slideshow
├── styles.css          # Home page styles
├── game-styles.css     # Game page styles
├── redeem-styles.css   # Redeem page styles
├── script.js           # Home page JavaScript
├── flappy-game.js      # Game logic
├── redeem-script.js    # Redeem page functionality
└── README.md           # This file
```

## 🎨 Customization Guide

### 1. Personalize Messages

**Home Page (index.html)**:
- Edit the heartfelt message in the `<p class="heartfelt-message">` section
- Change the title in `<h1 class="title">`

**Redeem Page (redeem.html)**:
- Update the animated messages in the `messages` array in `redeem-script.js`
- Modify slide captions in the slideshow

### 2. Add Your Photos

Replace the placeholder images in the slideshow:

1. Add your photos to the project folder
2. In `redeem.html`, replace the placeholder slides:

```html
<!-- Replace this placeholder -->
<div class="placeholder-image">
    <span>👫</span>
    <p>Replace with your favorite sibling photo!</p>
</div>

<!-- With your actual image -->
<img src="your-photo.jpg" alt="Description" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;">
```

### 3. Customize Colors

**Main Colors** (in all CSS files):
- Primary Pink: `#d63384`
- Secondary Purple: `#8e44ad`
- Accent Pink: `#ff6b9d`
- Light Purple: `#6f42c1`

**Background Gradients**:
```css
background: linear-gradient(135deg, #ffeef8 0%, #f0e6ff 50%, #e6f3ff 100%);
```

### 4. Modify Game Settings

In `flappy-game.js`, you can adjust:
- `pipeGap`: Space between obstacles (default: 180)
- `pipeSpeed`: Game speed (default: 2)
- `bird.jump`: Jump strength (default: -12)
- `bird.gravity`: Fall speed (default: 0.6)

### 5. Add Background Music

Replace the placeholder audio in `redeem.html` with your own music file:
```html
<audio id="backgroundMusic" loop>
    <source src="your-music.mp3" type="audio/mpeg">
</audio>
```

## 🚀 Hosting Instructions

### GitHub Pages (Free)

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder to Netlify
3. Your site will be live instantly with a custom URL

### Vercel (Free)

1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repository or upload files
3. Deploy with one click

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Touch controls for the game
- Mobile-friendly navigation
- Optimized font sizes and spacing
- Smooth animations on all devices

## 🎮 Game Controls

- **Desktop**: Click or press SPACEBAR to make the heart fly
- **Mobile**: Tap anywhere on the screen
- **Objective**: Avoid obstacles and collect chocolates!

## 💝 Personal Touches

- Footer message: "Made with 💖 by your brother"
- Cute emoji usage throughout
- Heartfelt messages that rotate automatically
- Celebration effects and confetti
- Chocolate rain animation

## 🔧 Technical Details

- **No Backend Required**: Pure HTML, CSS, and JavaScript
- **Local Storage**: Saves game scores and total chocolates
- **Web Audio API**: Optional sound effects
- **Canvas API**: Smooth game rendering
- **CSS Animations**: Butter-smooth transitions

## 💡 Tips for Best Experience

1. Test on mobile devices before sharing
2. Add your own photos for a personal touch
3. Customize messages to match your relationship
4. Consider adding your sister's favorite colors
5. Test the game difficulty and adjust if needed

## 🎉 Surprise Ideas

- Hide the website URL and reveal it as a surprise
- Add it to her phone's home screen as a web app
- Share it during a special occasion
- Create a QR code for easy access
- Add more personal inside jokes in the messages

---

Made with 💖 for the best sister in the world!
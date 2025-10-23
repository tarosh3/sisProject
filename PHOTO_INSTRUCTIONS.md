# 📸 How to Add Your Custom Photos

## 🗂️ **Step 1: Prepare Your Photos**

1. **Create a `photos` folder** in your project directory (already created for you!)
2. **Add your 5 favorite photos** and rename them to:
   - `photo1.jpg` - Your favorite sibling photo
   - `photo2.jpg` - Birthday celebration photo
   - `photo3.jpg` - Vacation/fun moments photo
   - `photo4.jpg` - Holiday celebration photo
   - `photo5.jpg` - Achievement/proud moment photo

## 📏 **Photo Requirements:**
- **Format**: JPG, PNG, or WEBP
- **Size**: Any size (they'll auto-resize to fit)
- **Orientation**: Both landscape and portrait work fine
- **Quality**: High resolution recommended for best results

## 🎨 **Current Slide Captions:**
1. "Best siblings forever! 💖"
2. "Celebrating another year of awesomeness! 🎉"
3. "Making memories together! ☀️"
4. "Festive times with family! ✨"
5. "So proud of you! 🌟"

## ✏️ **Customize Captions (Optional):**

If you want to change the captions, edit the `<div class="slide-caption">` text in `redeem.html`:

```html
<div class="slide-caption">Your custom message here! 💕</div>
```

## 🖼️ **Photo Styling:**
- **Rounded corners** for a soft look
- **Hover effect** - slight zoom on mouse over
- **Shadow effects** for depth
- **Auto-fit** - photos will crop to fit the frame nicely

## 🔄 **Add More Photos:**

To add more than 5 photos, copy this slide structure in `redeem.html`:

```html
<div class="slide">
    <img src="photos/photo6.jpg" alt="Description" class="slide-image">
    <div class="slide-caption">Your caption here! ✨</div>
</div>
```

And update the `totalSlides` number in `redeem-script.js`:
```javascript
this.totalSlides = 6; // Change from 5 to your new total
```

## 📱 **Mobile Optimization:**
- Photos automatically resize for mobile devices
- Touch-friendly slideshow controls
- Optimized loading for different screen sizes

## 🎯 **Pro Tips:**
- Use photos with good lighting for best results
- Mix different types of moments (candid, posed, events)
- Consider the emotional impact - these will make her smile!
- Test on mobile after adding to ensure they look great

## 🚀 **After Adding Photos:**
1. Refresh your browser at `http://localhost:8080`
2. Navigate to the redeem page
3. Check that all photos load correctly
4. Test the slideshow navigation

Your sister will love seeing your beautiful memories together! 💖
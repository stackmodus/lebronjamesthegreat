# LeBron James Tribute Website 👑

A beautiful, responsive tribute website honoring LeBron James - celebrating his basketball greatness, philanthropy, and global impact.

## 🌟 Features

- **Fully Responsive Design** - Works perfectly on all devices
- **Dark Theme with Gold Accents** - Elegant LeBron-inspired color scheme
- **Smooth Animations** - Engaging scroll effects and hover animations
- **No Build Tools Required** - Pure HTML, CSS, and JavaScript
- **Easy to Customize** - All content is directly editable in the HTML file
- **Fast Loading** - Optimized for performance
- **Accessibility Friendly** - Proper ARIA labels and semantic HTML

## 🚀 Quick Start

1. **Download the files:**
   - `index.html` - Main website file
   - `README.md` - This documentation

2. **Open in browser:**
   - Double-click `index.html` to view locally
   - Or drag the file into your browser

3. **Deploy online:**
   - Upload to GitHub Pages, Netlify, or Vercel
   - No build process required!

## 📝 How to Edit Content

### Basic Text Changes
Open `index.html` in any text editor and look for these sections:

```html
<!-- HERO SECTION -->
<h1>LeBron James</h1>
<p>The King. The Leader. The Legend.</p>

<!-- BIOGRAPHY SECTION -->
<p>Born on December 30, 1984, in Akron, Ohio...</p>

<!-- CAREER ACHIEVEMENTS -->
<div class="text-2xl font-bold">4× NBA Champion</div>
```

### Adding New Images
Replace image URLs in the gallery section:

```html
<img src="YOUR_NEW_IMAGE_URL" alt="Description" class="w-full h-64 object-cover">
```

**Recommended Image Sources:**
- [Unsplash](https://unsplash.com/s/photos/lebron-james) - Free high-quality photos
- [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:LeBron_James) - Public domain images
- [NBA.com](https://www.nba.com/player/2544/lebron-james) - Official photos (check usage rights)

### Updating Videos
Replace YouTube video IDs in the video section:

```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" title="Video Title">
```

### Adding Fan Tributes
Find the "Fan Tributes" section and add new tribute cards:

```html
<div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 card-hover">
    <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-lebron-gold rounded-full flex items-center justify-center text-lebron-dark font-bold mr-4">A</div>
        <div>
            <h4 class="font-bold text-lebron-gold">Your Name</h4>
            <p class="text-sm text-gray-400">Your Location</p>
        </div>
    </div>
    <p class="text-gray-300 italic">"Your message to LeBron..."</p>
</div>
```

## 🎨 Customization Guide

### Changing Colors
The website uses custom Tailwind colors. To change them, find this section in the HTML:

```html
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    'lebron-gold': '#FFD700',    // Change gold color
                    'lebron-purple': '#4A148C',  // Change purple color
                    'lebron-dark': '#1A1A1A',    // Change dark background
                    'lebron-light': '#F8F9FA'    // Change light background
                }
            }
        }
    }
</script>
```

### Adding New Sections
To add a new section, copy this template:

```html
<section class="py-20 bg-gradient-to-br from-lebron-dark to-lebron-purple">
    <div class="container mx-auto px-4">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">Your Section Title</h2>
            <p class="text-xl text-gray-300">Your subtitle</p>
        </div>
        
        <!-- Your content here -->
        
    </div>
</section>
```

### Modifying Animations
Custom animations are defined in the `<style>` section:

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
```

## 🌐 Deployment Options

### GitHub Pages (Free)
1. Create a new GitHub repository
2. Upload `index.html` to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → Choose "main" branch
5. Your site will be available at `https://yourusername.github.io/repositoryname`

### Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `index.html` file
3. Your site is instantly deployed!

### Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy automatically

## 📱 Mobile Optimization

The website is already optimized for mobile devices with:
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-friendly buttons
- Optimized images
- Fast loading times

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No frameworks required
- **Google Fonts** - Inter font family

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

### Performance Features
- Lazy loading for images
- Optimized CSS animations
- Minimal JavaScript
- CDN-hosted resources

## 📞 Support & Contributing

### Getting Help
If you need help customizing the website:
1. Check this README first
2. Look at the HTML comments for guidance
3. Use browser developer tools to inspect elements

### Contributing
Feel free to:
- Add new sections
- Improve the design
- Fix bugs
- Add new features
- Share your customizations

## 📄 License

This tribute website is created for educational and fan purposes. All images and videos are used with respect to their original creators and copyright holders.

## 🙏 Acknowledgments

- **LeBron James** - For inspiring millions worldwide
- **Unsplash** - For providing free high-quality images
- **Tailwind CSS** - For the amazing CSS framework
- **Fans Worldwide** - For keeping the legacy alive

---

**Made with ❤️ by fans, for fans.**

*"We're all witnesses." - LeBron James* 
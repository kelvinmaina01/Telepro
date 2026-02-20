# Telepro Extension Icons

Place your extension icons here:

Required sizes:
- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels  
- `icon128.png` - 128x128 pixels

You can generate these from your main Telepro logo.

For now, you can use placeholder icons or create simple ones with:
- A "T" logo
- Text overlay design
- Simple teleprompter symbol

Example command to create placeholder icons (requires ImageMagick):
```bash
# Create 128x128 icon
convert -size 128x128 gradient:blue-purple -fill white -pointsize 60 -gravity center -draw "text 0,0 'T'" icon128.png

# Resize for other sizes
convert icon128.png -resize 48x48 icon48.png
convert icon128.png -resize 16x16 icon16.png
```
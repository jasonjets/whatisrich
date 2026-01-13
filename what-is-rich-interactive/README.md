# What Is Rich? - Modular Structure

This project has been modularized for easier editing and maintenance.

## Structure

```
what-is-rich-interactive/
├── index.html              # Main HTML file (includes all sections)
├── styles.css              # All CSS styles
├── script.js               # All JavaScript functionality
├── build.js                # Build script to assemble final HTML
├── assembled.html          # Output of build script (single file)
├── sections/               # Individual section HTML files
│   ├── webgl-canvas.html
│   ├── navigation.html
│   ├── screen-0-introduction.html
│   ├── screen-1-user-input.html
│   ├── screen-2-reveal.html
│   ├── screen-3-spectrum.html
│   ├── screen-4-perspectives.html
│   ├── screen-5-profile.html
│   ├── screen-6-cta.html
│   └── share-modal.html
└── README.md
```

## Usage

### Development

1. **Edit individual sections**: Modify files in the `sections/` directory
2. **Edit styles**: Modify `styles.css`
3. **Edit functionality**: Modify `script.js`
4. **View changes**: Open `index.html` in a browser

### Building

To create a single assembled HTML file:

```bash
node build.js
```

This will create `assembled.html` with all sections, CSS, and JavaScript combined into one file.

## Editing Guide

### To edit a specific screen:
- Open the corresponding file in `sections/screen-X-*.html`
- Make your changes
- Refresh `index.html` in your browser

### To edit styles:
- Open `styles.css`
- Find the section you want to modify (each screen has its own CSS section)
- Make your changes

### To edit functionality:
- Open `script.js`
- Find the relevant function (organized by feature)
- Make your changes

### To add a new screen:
1. Create a new HTML file in `sections/` (e.g., `screen-7-new.html`)
2. Add the corresponding CSS to `styles.css`
3. Add any JavaScript functionality to `script.js`
4. Include the section in `index.html` or update `build.js` to include it

## Notes

- The `index.html` file includes all sections directly for easy development
- The `build.js` script can be used to create a single-file version
- All sections are self-contained and can be edited independently
- CSS variables are defined in `:root` in `styles.css` for easy theming

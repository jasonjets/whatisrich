/**
 * Build script to assemble the modular HTML page
 * Run with: node build.js
 */

const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'sections');
const outputFile = path.join(__dirname, 'assembled.html');

// Read the main template structure
const head = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>What Is Rich?</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
`;

const bodyStart = `
    </style>
</head>
<body>
`;

const bodyEnd = `
    <script>
`;

const footer = `
    </script>
</body>
</html>
`;

// Read CSS
const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

// Read JavaScript
const js = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

// Read section files in order
const sectionFiles = [
    'webgl-canvas.html',
    'navigation.html',
    'screen-0-introduction.html',
    'screen-1-user-input.html',
    'screen-2-reveal.html',
    'screen-3-spectrum.html',
    'screen-4-perspectives.html',
    'screen-5-profile.html',
    'screen-6-cta.html',
    'share-modal.html'
];

let sectionsHTML = '';
sectionFiles.forEach(file => {
    const filePath = path.join(sectionsDir, file);
    if (fs.existsSync(filePath)) {
        sectionsHTML += fs.readFileSync(filePath, 'utf8') + '\n';
    } else {
        console.warn(`Warning: Section file ${file} not found`);
    }
});

// Assemble the final HTML
const assembledHTML = head + css + bodyStart + sectionsHTML + bodyEnd + js + footer;

// Write the assembled file
fs.writeFileSync(outputFile, assembledHTML, 'utf8');
console.log(`✓ Assembled HTML written to: ${outputFile}`);
console.log(`  Total size: ${(assembledHTML.length / 1024).toFixed(2)} KB`);

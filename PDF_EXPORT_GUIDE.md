# PDF Export Guide for Scout Presentations

This guide explains how to export your reveal.js presentation as a PDF.

## Quick Start

1. Open your presentation in a browser
2. Add `?print-pdf` to the URL
   - Example: `https://your-presentation.scout.site/?print-pdf`
3. Press **Cmd+P** (Mac) or **Ctrl+P** (Windows/Linux)
4. Save as PDF

## Best Practices

### Before Exporting

- Review all slides for proper formatting
- Test animations and fragments (they will appear as separate pages)
- Ensure images are properly loaded
- Check code blocks for readability

### Print Settings

Recommended settings in your browser's print dialog:

- **Layout**: Portrait
- **Paper size**: A4 or Letter
- **Margins**: Default
- **Background graphics**: Enabled (to preserve theme colors)
- **Scale**: 100%

### PDF Features

The exported PDF will include:

- One slide per page
- All text and images
- Code syntax highlighting
- Theme colors and styling
- Speaker notes (optional)

### Limitations

- Animations appear as static slides
- Video/audio content won't play
- Interactive elements become static
- Some CSS transitions may not render

## Troubleshooting

### Slides Cut Off

If slides are being cut off:

1. Ensure you've added `?print-pdf` to the URL
2. Try a different paper size
3. Adjust browser zoom to 100%

### Missing Backgrounds

Enable "Background graphics" in print settings

### Font Issues

Ensure fonts are fully loaded before printing (wait a few seconds after page load)

## Advanced Options

### Custom PDF Styling

The presentation includes print-specific CSS in `css/print/pdf.css` that optimizes layout for PDF export.

### Programmatic Export

For automated PDF generation, consider using tools like:

- Puppeteer
- Playwright
- wkhtmltopdf

Example with Puppeteer:

```javascript
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://your-presentation.scout.new/?print-pdf", {
    waitUntil: "networkidle2",
  });
  await page.pdf({
    path: "presentation.pdf",
    format: "A4",
    printBackground: true,
  });
  await browser.close();
})();
```

## Need Help?

Visit [scout.new](https://scout.new) for more information and support.

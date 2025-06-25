#!/bin/bash
echo "Testing Vite setup for reveal.js template..."
echo "=========================================="
echo ""

# Check if bun is installed
if command -v bun &> /dev/null; then
    echo "✓ Bun is installed"
    PKG_MANAGER="bun"
else
    echo "✗ Bun not found, using npm"
    PKG_MANAGER="npm"
fi

echo ""
echo "1. Installing dependencies..."
$PKG_MANAGER install

echo ""
echo "2. Building themes and core files..."
$PKG_MANAGER run build

echo ""
echo "3. Checking build output..."
if [ -f "dist/reveal.css" ] && [ -f "dist/theme/scout.css" ] && [ -f "dist/reveal.js" ] && [ -f "dist/reveal.esm.js" ]; then
    echo "✓ All core files built successfully"
else
    echo "✗ Some files are missing"
    ls -la dist/
fi

echo ""
echo "4. Checking plugin builds..."
PLUGINS=("highlight" "markdown" "search" "notes" "zoom" "math")
for plugin in "${PLUGINS[@]}"; do
    if [ -f "plugin/$plugin/$plugin.js" ] && [ -f "plugin/$plugin/$plugin.esm.js" ]; then
        echo "✓ $plugin plugin built"
    else
        echo "✗ $plugin plugin missing"
    fi
done

echo ""
echo "=========================================="
echo "Test complete! Run '$PKG_MANAGER run dev' to start the development server."
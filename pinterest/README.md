# Pinterest Content Generation System

This workflow creates Pinterest-ready copy + vertical pin assets for affiliate products without changing website UI or product data.

## Input
Place one file inside `spreadsheet/products/`:
- `products.csv` **or** `products.json`
- Required fields: `title`, `image`, `price`, `affiliate_link`, `description`

## Run
```bash
node pinterest/generate-pinterest-content.mjs
```

## Output (`pinterest/output/`)
- `pinterest-content.json` → structured pin content for automation
- `pinterest-content.md` → human-editable content sheet
- `pin-*.svg` → export-ready vertical 1000x1500 modern tech pin templates

## Included Generation
- Pinterest pin titles (3 variants)
- SEO-optimized Pinterest descriptions
- Hashtags (base + product-aware)
- CTA text
- 3 style variations per product:
  - `deal-alert`
  - `feature-focus`
  - `problem-solution`

## Design Style
- Vertical format: 1000x1500
- Modern tech affiliate look
- Gradient backgrounds, strong headline blocks, high-contrast CTA area

Tip: Open generated SVGs in Figma/Canva/Illustrator and export PNG/JPG for Pinterest publishing.

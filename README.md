# Electdove

Premium tech store landing page — same-to-same build of the reference design: black announcement bar, centred-logo navbar, full-bleed hero with three flagship phones, Ready-to-Wear grid, New Collection feature and Smartphones for You.

- **Stack:** Svelte 5 + SvelteKit 3 + Vite + TypeScript + Tailwind CSS v4, adapter-static prerendering
- **Design:** mobile-first responsive (2-col product grid on mobile, 4-col on desktop, hamburger menu, sticky header)
- **Images:** all AI-generated (hero phones, watch, headphones, PS5, Galaxy, laptop, cases, 4 smartphones) — sliced from generated strips with PIL into WebP
- **Icons:** hand-drawn SVG (search, user, bag, heart, arrows, menu, truck, shield, returns)
- **Interactive:** working Add to Bag (header badge + toast), expanding search, mobile menu, newsletter signup

## Develop

```bash
npm install
npm run dev
npm run build   # static output in build/
npm run check   # svelte-check
```

## Deploy

Static site — deploy `build/` to any static host (Cloudflare Pages, Netlify, Vercel).

# SEO, metadata and share images

## Every page
- Unique `<title>` (50 to 60 chars, primary term first, brand last) and meta description (140 to 160 chars, specific outcome).
- Canonical URL. `lang` on `<html>`. One `h1` matching the page's intent.
- `theme-color` for light and dark. Favicon set: SVG plus 180px Apple touch icon.

## Open Graph and social
- `og:title`, `og:description`, `og:url`, `og:type`, `og:image` (1200x630, under 5 MB, text large enough at thumbnail size), `og:image:alt`.
- `twitter:card` = `summary_large_image`.
- Next.js App Router: `generateMetadata` per route, `opengraph-image.tsx` with `ImageResponse` for dynamic images, `metadataBase` set once.
- Angular: `Meta` and `Title` services, set during SSR.

## Structured data
- JSON-LD in a `<script type="application/ld+json">`: `Organization`, `Product` with `Offer`, `Article`, `BreadcrumbList`, `FAQPage` only for real FAQs.
- Never mark up content that is not visible on the page.

## Crawl and speed
- `sitemap.xml`, `robots.txt`, clean URLs, real links (`<a href>`) for navigation.
- Content in server-rendered HTML, not only after client fetch.
- Core Web Vitals are a ranking input; see `performance.md`.

Leader — Powers & Renewable Energy Solutions (Static Site)

Overview
This is a fresh static website for Leader, implemented without copying any template HTML or text. It follows a mobile‑first approach, uses CSS variables for design tokens, and minimal vanilla JS.

Structure
- index.html, about.html, products.html, portfolio.html, faq.html, testimonials.html, contact.html, 404.html
- /products/* six product detail pages
- /assets/css/styles.css — single source of styles
- /assets/js/main.js — site JS (nav, animations, gallery, forms)
- /assets/vendor — local copies of Venobox/Swiper (optional)
- products.json, gallery.json — data used for products grid and gallery

Run
No build step. Open the files via a local server to avoid CORS for JSON fetches.

Examples:
  - Python: python3 -m http.server 8080 (open http://localhost:8080/leader-new/)
  - Node: npx serve . (open /leader-new/)

Content
- All copy is newly authored from the provided content pack; no template HTML was reused.
- Placeholder images (SVG) and spec PDFs are included and should be replaced with final assets.

Forms
- contact.html posts to action="#". JS provides validation and fallbacks:
  - mailto: leaderpowers99@gmail.com with a prefilled message
  - WhatsApp: +91 9822444552 prefilled
- To wire a backend, set action="/contact.php" (or similar). Ensure CORS if deployed on a subpath.

SEO
- Unique <title> and meta description per page
- OG image: /assets/img/preview/leader-og.jpg
- LocalBusiness JSON‑LD: index.html and contact.html
- Product/Service JSON‑LD on product pages

Accessibility
- One H1 per page, semantic landmarks, visible focus, alt text, prefers‑reduced‑motion respected

Performance
- Mobile‑first CSS, deferred JS, lazy images, minimal libraries

Manual tasks remaining
- Replace placeholder images and PDFs with final assets
- Verify Google Maps embed and provide an API key if switching to Maps JS API
- Add analytics if required

Screenshots (to capture)
- Desktop: Home, one Product detail, Contact (save in /assets/img/preview/)


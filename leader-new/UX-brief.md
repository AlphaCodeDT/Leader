Leader — Powers & Renewable Energy Solutions — UI/UX Brief

Purpose: Build a fresh, static website that matches or improves the template’s UX patterns without copying any template HTML or content. This brief is implemented in the new pages now present under `/leader-new/`.

Observed patterns from the template (scan only; no copied markup):

- Header & Navigation
  - Sticky header activates after small scroll threshold.
  - Two-tier structure used in places (top bar + primary navigation); on mobile a slide-in side menu.
  - Mobile breakpoint around ~992px in template; we will standardize to 640px and 1024px.
  - Clear CTA in header and visually distinct active states.

- Hero/Banner
  - Edge-to-edge hero with image overlay and subtle animated text entry.
  - Primary CTA(s) and supporting subhead; optional background shape.
  - Carousel pattern used in some variants; we will keep a single hero with subtle parallax/entrance for performance.

- Cards & Grid
  - Service/product cards with icon, title, short text, CTA; generous spacing and rounded corners.
  - Consistent card shadow/hover lift effect; grid adapts at common breakpoints.
  - Spacing utility classes exist in template; we’ll replace with a compact utility scale in our CSS.

- Gallery/Lightbox & Filters
  - Lightbox used for images and video; category filters and masonry-like layout.
  - We’ll implement: CSS columns masonry + filter buttons; Venobox lightbox initialized via new JS.

- Animations
  - Scroll-triggered fades/slides, counters, subtle image reveals. GSAP was used; we’ll use IntersectionObserver-based animations to reduce JS weight and respect prefers-reduced-motion.

- Breakpoints & Spacing
  - Template uses multiple breakpoints (767/992/1200+); we’ll adopt mobile-first with 640px and 1024px only.
  - Spacing scale appears in 5–10px increments; we’ll provide a tokenized spacing system and utility classes.

- Color & Type
  - Dark brand header backgrounds; vibrant accent for CTAs.
  - We will adopt tokens: brand dark, brand sky, accent yellow, muted backgrounds, and a clear type scale.

Design decisions for the new site (to emulate/improve):

- Navigation
  - Sticky-on-scroll header with shadow; hamburger toggles an accessible off-canvas nav.
  - Focus rings visible; ARIA attributes and proper labelling.

- Hero
  - Single high-contrast hero: headline, subhead, two CTAs. Background overlay and subtle image zoom on load.
  - Inline critical CSS for above-the-fold for fast paint.

- Components
  - Buttons: solid (accent/brand) and ghost variants; consistent sizes and radii.
  - Cards: media-top, content stack, badge support; hover lift and shadow.
  - Badges: small rounded labels for categories (gallery filters/product labels).
  - Forms: clear labels, large touch targets, client-side validation feedback.

- Layout
  - Container width capped by token; grid via modern CSS (grid/flex) with 12-col feel but simpler rules.
  - Utilities for spacing, layout helpers (stack/cluster/center/visually-hidden).

- Motion & Performance
  - IntersectionObserver animations (slide/fade) with reduced-motion opt-out.
  - Lazy-load images with srcset; lightbox via vendor (Venobox) loaded deferred.

- Accessibility
  - One H1 per page; semantic sections; skip-to-content link; keyboard-accessible menus and modals.
  - Sufficient contrast; focus outlines; alt text pattern “<Subject> in <Location>”.

- SEO
  - Unique titles/descriptions; OG tags and canonical; JSON-LD: LocalBusiness (Home/Contact) and Product (product pages).

Implementation notes:

- Breakpoints used
  - 640px (sm): enhance grid from 1 to 2 columns; adjust hero and nav.
  - 1024px (lg): expand to 3–4 columns; persistent desktop nav.

- Libraries
  - Lightbox: Venobox (copied to vendor) initialized in new main.js.
  - Optional: Swiper for testimonials slider.

- Data-driven content
  - products.json and gallery.json power product grids and portfolio filtering.

- Anti-copy commitment
  - All HTML, CSS, and JS authored fresh. Only vendor assets are copied as-is with license headers preserved.


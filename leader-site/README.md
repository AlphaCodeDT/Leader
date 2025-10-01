Leader — Powers & Renewable Energy Solutions site

Overview
This folder contains a new website for Leader, built by reusing the existing HTML template's UI/UX, animations, and plugins without modifying the original template files.

Structure
- index.html — Home
- about.html — About Leader
- products.html — Products overview
- products/solar-rooftops.html
- products/solar-water-pumps.html
- products/solar-water-heaters.html
- products/wind-turbines.html
- products/biogas-systems.html
- products/project-execution.html
- portfolio.html — Project gallery
- faq.html — FAQ
- testimonial.html — Testimonials
- contact.html — Contact & quote form
- 404.html — Error page
- data/products.json — Product seed data
- data/gallery.json — Gallery seed data
- assets/ — Copied vendors, CSS/JS, fonts, and images from the template. Logos, favicon, OG image may be replaced with Leader assets.

Branding
- Company: Leader — Powers & Renewable Energy Solutions
- Phone/WhatsApp: +91 9822444542, +91 9822444552; Landline: 02422-252244
- Email: leaderpowers99@gmail.com
- Address: Kolhar Road, Babhaleshwar, Tal: Rahata, PIN 413737
- Instagram: https://instagram.com/LEADERPOWERS_99

Forms
- Contact form posts to /contact.php by default. If no backend is present, the included JS (assets/js/contact.js) handles AJAX submission gracefully.

SEO
- Each page includes unique <title>, meta description, OG tags, and JSON-LD schema (LocalBusiness on Home/Contact; Product/Service on product pages).

Manual steps
1) Replace assets/img/logo/logo-1.png and assets/img/logo/logo-2.png with Leader logos.
2) Replace assets/img/preview/leader-og.jpg with your final OG image and update per-page og:image if needed.
3) If you have a working backend, add /contact.php at repo root to process the form submit.
4) Confirm that no links or assets reference solera.geekslabthemes.com. All references are local in this folder.

Brand color tokens
Appended at the end of assets/css/main.css in this folder:
--brand-dark:#0B3A4A; --brand-sky:#2FA8D6; --accent:#FFC400; --muted-bg:#F7FAFC; --text-dark:#0B2B34;
Light overrides adjust header/footer buttons and link hover.

changes.diff
See the files in this folder; all original template files remain untouched at project root. A brief summary is kept in this README and can be generated via git diff if needed.


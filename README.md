LocalShop - Static SPA

Overview

This is a small single-page shopping site built with plain HTML/CSS/JS. All data is local. Products are loaded from /data/products.json. Images are in /images (referenced as /images/...).

Run

Use a simple static server (recommended) to serve files because fetch() to local JSON requires HTTP. For example, from the project root run:

python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

Notes

- Admin is frontend-only and protected by a simple PIN stored in localStorage. This is not secure — TODO: add real auth.
- Images are lazy-loaded and responsive.

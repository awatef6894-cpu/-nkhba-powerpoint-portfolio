# صفحة هبوط — برنامج نخبة البوربوينت (الدفعة 8)

Static landing page (HTML + CSS + JS, no build step). Hosted on Vercel under a custom
sub-domain of `powerpoint-ksa.store`; checkout stays on Acadimiat.

```
landing/
├── index.html        # page markup (Arabic, RTL)
├── styles.css        # design tokens (brand colours) + all styles, mobile-first
├── app.js            # CONFIG (all page values) + behaviour
├── vercel.json       # caching + security headers
└── assets/
    ├── fonts/        # self-hosted El Messiri + IBM Plex Sans Arabic (OFL)
    ├── img/          # before images, video posters, coach, certificate, brand mark, favicon
    ├── logos/        # client logos
    └── video/        # "after" videos (1920×1080, H.264) + Mohammed Al-Zahrani testimonial
```

## Changing page values

Everything lives in the `CONFIG` object at the top of `app.js`:
price, old price, batch, seats, deadline (and the countdown), stats, links, social
accounts, the trainee-community switch (`communityReady`) and pixel IDs.
Change it there once and every place on the page updates.

## Deploy on Vercel (custom domain, no Vercel branding)

1. Vercel → **Add New… → Project** → import this GitHub repo.
2. **Root Directory:** `landing` · **Framework Preset:** Other ·
   **Build Command:** empty · **Output Directory:** `.` → Deploy.
3. **Settings → Domains** → add the sub-domain, e.g. `course.powerpoint-ksa.store`.
4. At the DNS provider of `powerpoint-ksa.store` add the record Vercel shows
   (normally `CNAME course → cname.vercel-dns.com`).
   **Do not change** the existing records of the root domain — they point to Acadimiat.
5. Hide every Vercel trace:
   - **Settings → Deployment Protection → Vercel Authentication → Standard Protection**
     (the `*.vercel.app` URLs require a Vercel login; only your domain is public).
   - **Settings → General → Vercel Toolbar** → Off.
   - The page itself loads nothing from Vercel: all files are relative, fonts are self-hosted.
6. When the domain is live, in `index.html` make `og:image` absolute
   (`https://course.powerpoint-ksa.store/assets/img/og-image.jpg`) and add
   `<link rel="canonical" href="https://course.powerpoint-ksa.store/">`.

## Acadimiat

- Checkout: every button goes to `CONFIG.checkoutUrl` and carries the visitor's
  `utm_*`, `ttclid`, `fbclid` and `gclid` parameters over.
- Link the landing page from the Acadimiat site (menu / course page button) and use the
  landing URL in TikTok ads.

## Tracking

Paste IDs into `CONFIG.pixels` (TikTok, Meta, GA4, GTM). Empty = not loaded.
Every CTA fires `InitiateCheckout` (GA4: `begin_checkout`) before redirecting.

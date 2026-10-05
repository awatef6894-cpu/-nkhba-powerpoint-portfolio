/* =========================================================
   نخبة البوربوينت — Landing page behaviour
   ---------------------------------------------------------
   CONFIG is the ONE place to change page values. Every price,
   batch, deadline, stat and link on the page is filled from here.
   ========================================================= */
const CONFIG = {
  checkoutUrl: "https://1powerpoint.acadimiat.com/direct-checkout/1/4837",

  // Price comes from config/pricing.js — do not type it here.
  priceNow: PRICING.PRICE_SAR,
  currency: PRICING.currencyLabel,
  currencyCode: PRICING.currencyCode,

  batchNumber: 7,

  // Program facts (hero line and pricing card)
  units: 14,

  batch: "الدفعة 7",
  pastBatches: 6,

  // Registration deadline (Riyadh time). No countdown is shown; after this moment
  // the "open until" line switches to closedLabel.
  deadlineLabel: "25 أكتوبر",
  deadlineISO: "2026-10-25T23:59:59+03:00",
  closedLabel: "انتهى التسجيل في الدفعة 7",

  trainees: 5000,
  rating: 4.95,
  designs: 829,

  // Switch to true once the trainee community is live — shows it in the pricing list.
  communityReady: false,

  designServiceUrl: "https://wa.me/966569886979",

  // Intro video after the hero (streams from Acadimiat storage)
  introVideoUrl: "https://public.acadimiat.com/801wgd5m92m9xlwdhjq6z9rtvbzmepyqeafcrpapdyfznvtegk.mp4",

  social: {
    tiktok: "https://www.tiktok.com/@1powerpoint",
    youtube: "https://youtube.com/@1powerpoint",
    instagram: "https://www.instagram.com/1power.point1",
    whatsapp: "https://wa.me/966569886979",
  },

  links: {
    privacy: "https://powerpoint-ksa.store/privacy-policy",
    terms: "https://powerpoint-ksa.store/terms-condition",
  },

  // Tracking — leave empty to keep a pixel switched off. Paste the ID to enable.
  pixels: {
    tiktok: "", // TikTok Pixel ID, e.g. "C0XXXXXXXXXXXXXXX"
    meta: "", // Meta Pixel ID, e.g. "123456789012345"
    ga4: "", // GA4 Measurement ID, e.g. "G-XXXXXXX"
    gtm: "", // GTM container ID, e.g. "GTM-XXXXXXX"
  },
};

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const fmt = (n, decimals = 0) =>
    Number(n).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  /* ---------- 1. Fill config values ---------- */
  const cfgText = {
    priceNow: String(CONFIG.priceNow),
    currency: CONFIG.currency,
    batch: CONFIG.batch,
    batchNumber: String(CONFIG.batchNumber),
    units: String(CONFIG.units),
    deadlineLabel: CONFIG.deadlineLabel,
    trainees: fmt(CONFIG.trainees),
    rating: fmt(CONFIG.rating, 2),
    designs: fmt(CONFIG.designs),
    pastBatches: String(CONFIG.pastBatches),
  };
  $$("[data-cfg]").forEach((el) => {
    const key = el.dataset.cfg;
    if (key in cfgText) el.textContent = cfgText[key];
  });
  const countTargets = { designs: CONFIG.designs, trainees: CONFIG.trainees, pastBatches: CONFIG.pastBatches, rating: CONFIG.rating };
  $$("[data-count][data-cfg]").forEach((el) => {
    if (el.dataset.cfg in countTargets) el.dataset.count = countTargets[el.dataset.cfg];
  });
  $$("[data-cfg-href]").forEach((el) => {
    const val = el.dataset.cfgHref.split(".").reduce((o, k) => (o ? o[k] : undefined), CONFIG);
    if (val) el.href = val;
  });
  $$("[data-community]").forEach((el) => (el.hidden = !CONFIG.communityReady));

  /* ---------- 2. Tracking pixels (only load when an ID is set) ---------- */
  const P = CONFIG.pixels;
  const loadScript = (src) => {
    const s = document.createElement("script");
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  };
  if (P.tiktok) {
    !(function (w, t) {
      w.TiktokAnalyticsObject = t;
      const ttq = (w[t] = w[t] || []);
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
      ttq.setAndDefer = function (o, m) { o[m] = function () { o.push([m].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (e) {
        const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r;
        ttq._t = ttq._t || {}; ttq._t[e] = +new Date();
        ttq._o = ttq._o || {}; ttq._o[e] = {};
        loadScript(r + "?sdkid=" + e + "&lib=" + t);
      };
      ttq.load(P.tiktok);
      ttq.page();
    })(window, "ttq");
  }
  if (P.meta) {
    !(function (f) {
      if (f.fbq) return;
      const n = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      loadScript("https://connect.facebook.net/en_US/fbevents.js");
    })(window);
    window.fbq("init", P.meta);
    window.fbq("track", "PageView");
  }
  if (P.gtm) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(P.gtm));
  }
  if (P.ga4) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", P.ga4);
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(P.ga4));
  }
  const anyPixel = Boolean(P.tiktok || P.meta || P.ga4 || P.gtm);
  const trackCheckout = (label) => {
    const payload = { value: CONFIG.priceNow, currency: CONFIG.currencyCode, content_name: "برنامج نخبة البوربوينت", content_id: CONFIG.batch };
    try {
      if (window.ttq) window.ttq.track("InitiateCheckout", payload);
      if (window.fbq) window.fbq("track", "InitiateCheckout", { value: payload.value, currency: payload.currency });
      if (window.gtag) window.gtag("event", "begin_checkout", { value: payload.value, currency: payload.currency });
      if (window.dataLayer) window.dataLayer.push({ event: "InitiateCheckout", cta: label, ...payload });
    } catch (_) { /* never block checkout on a tracking error */ }
  };

  /* ---------- 3. CTAs → checkout with UTM / click-ids preserved ---------- */
  const checkoutUrl = (() => {
    const url = new URL(CONFIG.checkoutUrl);
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (/^utm_/i.test(key) || ["ttclid", "fbclid", "gclid", "wbraid", "gbraid"].includes(key.toLowerCase())) url.searchParams.set(key, value);
    });
    return url.toString();
  })();
  $$("[data-cta]").forEach((a) => {
    a.href = checkoutUrl;
    a.addEventListener("click", (e) => {
      trackCheckout(a.textContent.trim());
      if (!anyPixel || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      setTimeout(() => (window.location.href = checkoutUrl), 300); // let pixels flush
    });
  });

  /* ---------- 4. Header + sticky bar ---------- */
  const header = $("[data-header]");
  const onScrollHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  const sticky = $("[data-sticky]");
  const hero = $("[data-hero]");
  if (sticky && hero && "IntersectionObserver" in window) {
    const stickyLink = $("a", sticky);
    new IntersectionObserver(([entry]) => {
      const show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      sticky.classList.toggle("is-visible", show);
      document.documentElement.classList.toggle("sticky-on", show);
      sticky.setAttribute("aria-hidden", String(!show));
      stickyLink.tabIndex = show ? 0 : -1;
    }).observe(hero);
  }

  /* ---------- 5. Entrance reveal (stagger 80ms, once) ---------- */
  const reveals = $$(".reveal");
  reveals.forEach((el) => {
    const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--i", Math.min(siblings.indexOf(el), 6));
  });
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- 6. Count-up stats ---------- */
  const renderCount = (el, v) => {
    const decimals = Number(el.dataset.decimals || 0);
    el.textContent = el.dataset.format === "comma" || decimals ? fmt(v, decimals) : String(Math.round(v));
  };
  if (!reduceMotion && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        cio.unobserve(el);
        const target = Number(el.dataset.count);
        const start = performance.now();
        const step = (now) => {
          const t = Math.min((now - start) / 1400, 1);
          renderCount(el, target * (1 - Math.pow(1 - t, 4)));
          if (t < 1) requestAnimationFrame(step);
          else renderCount(el, target);
        };
        renderCount(el, 0);
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    $$("[data-count]").forEach((el) => cio.observe(el));
  }

  /* ---------- 7. Registration deadline (static line, no countdown) ---------- */
  if (Date.now() > new Date(CONFIG.deadlineISO).getTime()) {
    $$("[data-deadline-line]").forEach((el) => (el.textContent = CONFIG.closedLabel));
  }

  /* ---------- 8. Video helpers (lazy sources, start offset) ---------- */
  const loadVideo = (video) => {
    if (video.dataset.loaded) return;
    video.dataset.loaded = "1";
    const start = Number(video.dataset.start || 0);
    if (start) {
      // skip intro frames and loop from the first meaningful frame
      video.addEventListener("loadedmetadata", () => { video.currentTime = start; }, { once: true });
      video.addEventListener("ended", () => { video.currentTime = start; video.play().catch(() => {}); });
    }
    const sources = $$("source[data-src]", video);
    if (sources.length) sources.forEach((s) => (s.src = s.dataset.src));
    else if (video.dataset.src) video.src = video.dataset.src;
    video.load();
  };

  /* intro video: plays with sound on tap */
  const intro = $("[data-intro-video]");
  if (intro) {
    const v = $("video", intro);
    if (CONFIG.introVideoUrl) v.dataset.src = CONFIG.introVideoUrl;
    $("[data-intro-play]", intro).addEventListener("click", () => {
      loadVideo(v);
      v.controls = true;
      v.muted = false;
      intro.classList.add("is-playing");
      v.play().catch(() => {});
      v.focus({ preventScroll: true });
    });
  }

  /* video testimonial: plays with sound on tap */
  $$("[data-tvideo]").forEach((card) => {
    const v = $("video", card);
    $("[data-tvideo-play]", card).addEventListener("click", () => {
      loadVideo(v);
      v.controls = true;
      v.muted = false;
      card.classList.add("is-playing");
      v.play().catch(() => {});
      v.focus({ preventScroll: true });
    });
  });

  /* ---------- 9. Before / after — tabs, one work at a time ---------- */
  const works = $("[data-works]");
  if (works) {
    const tabs = $$('[role="tab"]', works);
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
    const tablist = $('[role="tablist"]', works);
    let current = 0;
    let inView = false;

    const syncVideos = () => {
      panels.forEach((p, i) => {
        const v = $("video", p);
        if (i === current && inView && !reduceMotion) { loadVideo(v); v.play().catch(() => {}); }
        else v.pause();
      });
    };
    const select = (i, focus = false) => {
      current = (i + tabs.length) % tabs.length;
      tabs.forEach((t, k) => {
        const on = k === current;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[k].hidden = !on;
      });
      tablist.style.setProperty("--tab", current);
      if (focus) tabs[current].focus();
      syncVideos();
    };
    tabs.forEach((t, i) => t.addEventListener("click", () => select(i)));
    tablist.addEventListener("keydown", (e) => {
      // RTL: ArrowLeft = next tab, ArrowRight = previous tab
      const map = { ArrowLeft: 1, ArrowRight: -1 };
      if (e.key in map) { select(current + map[e.key], true); e.preventDefault(); }
      else if (e.key === "Home") { select(0, true); e.preventDefault(); }
      else if (e.key === "End") { select(tabs.length - 1, true); e.preventDefault(); }
    });
    // swipe between works on touch screens
    let x0 = null, y0 = null;
    panels.forEach((p) => {
      p.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      p.addEventListener("touchend", (e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        const dy = e.changedTouches[0].clientY - y0;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) select(current + (dx > 0 ? 1 : -1)); // RTL: swipe right → next
        x0 = y0 = null;
      });
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncVideos(); }, { threshold: 0.3 }).observe(works);
    }
    select(0);
  }

  /* ---------- 10. Media dialog: full "after" video or enlarged "before" ---------- */
  const dialog = $("[data-media-dialog]");
  const slot = dialog && $("[data-media-slot]", dialog);
  const dTitle = dialog && $("[data-media-title]", dialog);
  const openDialog = (node, title) => {
    if (!dialog || typeof dialog.showModal !== "function") return false;
    slot.replaceChildren(node);
    dTitle.textContent = title || "";
    dialog.showModal();
    return true;
  };
  $$("[data-video-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const base = btn.dataset.videoOpen;
      const v = document.createElement("video");
      v.controls = true; v.playsInline = true; v.muted = true; v.autoplay = true;
      v.innerHTML = `<source src="${base}.webm" type="video/webm"><source src="${base}.mp4" type="video/mp4">`;
      if (!openDialog(v, btn.dataset.videoTitle)) window.open(base + ".mp4", "_blank", "noopener");
      else v.play().catch(() => {});
    });
  });
  $$("[data-img-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = new Image();
      img.src = btn.dataset.imgOpen;
      img.alt = btn.dataset.imgAlt || "";
      if (!openDialog(img, "قبل")) window.open(btn.dataset.imgOpen, "_blank", "noopener");
    });
  });
  if (dialog) {
    $("[data-media-close]", dialog).addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => {
      const v = $("video", slot);
      if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
      slot.replaceChildren();
    });
  }

  /* ---------- 11. FAQ accordion ---------- */
  $$("[data-faq] .faq-item").forEach((item) => {
    const btn = $("button", item);
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-open", open);
    });
  });

  /* ---------- 12. Desktop-only hero parallax ---------- */
  const parallax = $("[data-parallax]");
  if (parallax && finePointer && !reduceMotion && window.matchMedia("(min-width: 960px)").matches) {
    let raf = 0;
    const onScroll = () => {
      raf = 0;
      const p = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
      parallax.style.opacity = String(1 - p * 0.6);
      parallax.style.transform = `scale(${1 - p * 0.03})`;
    };
    window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(onScroll); }, { passive: true });
  }
})();

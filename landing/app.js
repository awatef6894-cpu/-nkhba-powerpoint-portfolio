/* =========================================================
   نخبة البوربوينت — Landing page behaviour
   ---------------------------------------------------------
   CONFIG is the ONE place to change page values. Every price,
   batch, deadline, stat and link on the page is filled from here.
   ========================================================= */
const CONFIG = {
  checkoutUrl: "https://1powerpoint.acadimiat.com/direct-checkout/1/4837",

  priceNow: 795,
  priceWas: 1500,
  currency: "ريال",
  currencyCode: "SAR",

  batchNumber: 8,
  batch: "الدفعة 8",
  seats: 100,

  // Real registration deadline (Riyadh time). The countdown counts down to this
  // exact moment and switches to "closed" after it — it never resets.
  deadlineLabel: "25 أكتوبر",
  deadlineISO: "2026-10-25T23:59:59+03:00",
  closedLabel: "انتهى التسجيل في الدفعة 8",

  trainees: 5382,
  rating: 4.95,
  designs: 829,
  years: 4,

  // Switch to true once the trainee community is live — shows it in the pricing list.
  communityReady: false,

  designServiceUrl: "https://wa.me/966569886979",

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
    priceWas: String(CONFIG.priceWas),
    currency: CONFIG.currency,
    batch: CONFIG.batch,
    batchNumber: String(CONFIG.batchNumber),
    seats: String(CONFIG.seats),
    deadlineLabel: CONFIG.deadlineLabel,
    trainees: fmt(CONFIG.trainees),
    rating: fmt(CONFIG.rating, 2),
    designs: fmt(CONFIG.designs),
    years: String(CONFIG.years),
  };
  $$("[data-cfg]").forEach((el) => {
    const key = el.dataset.cfg;
    if (key in cfgText) el.textContent = cfgText[key];
  });
  // keep count-up targets in sync with CONFIG
  const countTargets = { designs: CONFIG.designs, trainees: CONFIG.trainees, years: CONFIG.years, rating: CONFIG.rating };
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
    /* TikTok Pixel base code */
    !(function (w, d, t) {
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
    })(window, document, "ttq");
  }
  if (P.meta) {
    /* Meta Pixel base code */
    !(function (f, b, e, v, n) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      loadScript(v);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
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
  const buildCheckoutUrl = () => {
    const url = new URL(CONFIG.checkoutUrl);
    const incoming = new URLSearchParams(window.location.search);
    incoming.forEach((value, key) => {
      if (/^utm_/i.test(key) || ["ttclid", "fbclid", "gclid", "wbraid", "gbraid"].includes(key.toLowerCase())) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  };
  const checkoutUrl = buildCheckoutUrl();
  $$("[data-cta]").forEach((a) => {
    a.href = checkoutUrl;
    a.addEventListener("click", (e) => {
      trackCheckout(a.textContent.trim());
      if (!anyPixel) return; // nothing to wait for
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      setTimeout(() => (window.location.href = checkoutUrl), 300); // let pixels flush
    });
  });

  /* ---------- 4. Header, mobile menu, sticky bar ---------- */
  const header = $("[data-header]");
  const onScrollHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  const toggle = $("[data-menu-toggle]");
  const menu = $("[data-menu]");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    $(".sr-only", toggle).textContent = open ? "إغلاق القائمة" : "فتح القائمة";
    menu.hidden = !open;
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); }
  });

  const sticky = $("[data-sticky]");
  const hero = $("[data-hero]");
  if (sticky && hero && "IntersectionObserver" in window) {
    const stickyLink = $("a", sticky);
    new IntersectionObserver(([entry]) => {
      const show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      sticky.classList.toggle("is-visible", show);
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
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- 6. Count-up stats ---------- */
  const countEls = $$("[data-count]");
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
        const dur = 1400;
        const step = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          renderCount(el, target * eased);
          if (t < 1) requestAnimationFrame(step);
          else renderCount(el, target);
        };
        renderCount(el, 0);
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    countEls.forEach((el) => cio.observe(el));
  }

  /* ---------- 7. Countdown to the real deadline ---------- */
  const deadline = new Date(CONFIG.deadlineISO).getTime();
  const countdowns = $$("[data-countdown]");
  const pad = (n) => String(n).padStart(2, "0");
  let cdTimer = null;
  const tick = () => {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      countdowns.forEach((c) => {
        c.classList.add("is-closed");
        const label = $(".countdown-label", c);
        if (label) label.textContent = CONFIG.closedLabel;
      });
      $$("[data-deadline-line]").forEach((el) => (el.textContent = CONFIG.closedLabel));
      clearInterval(cdTimer);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    countdowns.forEach((c) => {
      $("[data-cd=d]", c).textContent = String(d);
      $("[data-cd=h]", c).textContent = pad(h);
      $("[data-cd=m]", c).textContent = pad(m);
      $("[data-cd=s]", c).textContent = pad(s);
    });
  };
  tick();
  cdTimer = setInterval(tick, 1000);

  /* ---------- 8. Before / after sliders (after = video) ---------- */
  const loadVideo = (video) => {
    if (video.src || !video.dataset.src) return;
    const start = Number(video.dataset.start || 0);
    if (start) {
      // skip the intro frames and loop from the first meaningful frame
      video.addEventListener("loadedmetadata", () => { video.currentTime = start; }, { once: true });
      video.addEventListener("ended", () => { video.currentTime = start; video.play().catch(() => {}); });
    }
    video.src = video.dataset.src;
    video.load();
  };

  $$("[data-ba]").forEach((fig) => {
    const stage = $(".ba-stage", fig);
    const handle = $(".ba-handle", fig);
    const video = $(".ba-after", fig);
    const pauseBtn = $("[data-ba-toggle]", fig);
    let pos = 50;
    let userPaused = reduceMotion;

    const setPos = (p) => {
      pos = Math.max(0, Math.min(100, p));
      stage.style.setProperty("--pos", pos.toFixed(2));
      handle.setAttribute("aria-valuenow", String(Math.round(pos)));
      handle.setAttribute("aria-valuetext", `${Math.round(pos)}٪ قبل`);
    };
    // "before" is anchored to the right edge, so position is measured from the right
    const fromPointer = (clientX) => {
      const r = stage.getBoundingClientRect();
      return ((r.right - clientX) / r.width) * 100;
    };

    let dragging = false;
    stage.addEventListener("dragstart", (e) => e.preventDefault());
    stage.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button")) return;
      dragging = true;
      stage.classList.add("is-dragging");
      stage.setPointerCapture(e.pointerId);
      setPos(fromPointer(e.clientX));
    });
    stage.addEventListener("pointermove", (e) => { if (dragging) setPos(fromPointer(e.clientX)); });
    const end = () => { dragging = false; stage.classList.remove("is-dragging"); };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);

    handle.addEventListener("keydown", (e) => {
      const map = { ArrowLeft: 5, ArrowRight: -5, PageUp: 20, PageDown: -20 };
      if (e.key in map) { setPos(pos + map[e.key]); e.preventDefault(); }
      else if (e.key === "Home") { setPos(100); e.preventDefault(); }
      else if (e.key === "End") { setPos(0); e.preventDefault(); }
    });

    const syncBtn = () => {
      const playing = !video.paused;
      pauseBtn.textContent = playing ? "إيقاف الفيديو" : "تشغيل الفيديو";
      pauseBtn.setAttribute("aria-pressed", String(!playing));
    };
    video.addEventListener("play", syncBtn);
    video.addEventListener("pause", syncBtn);
    pauseBtn.addEventListener("click", () => {
      loadVideo(video);
      if (video.paused) { userPaused = false; video.play().catch(() => {}); }
      else { userPaused = true; video.pause(); }
    });
    syncBtn();

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          loadVideo(video);
          if (!userPaused) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      }, { threshold: 0.25, rootMargin: "200px 0px" }).observe(stage);
    }
    setPos(50);
  });

  /* ---------- 9. Full-video dialog ---------- */
  const dialog = $("[data-video-dialog]");
  const dVideo = dialog ? $("video", dialog) : null;
  const dTitle = dialog ? $("[data-video-dialog-title]", dialog) : null;
  $$("[data-video-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.videoOpen;
      if (!dialog || typeof dialog.showModal !== "function") { window.open(src, "_blank", "noopener"); return; }
      dTitle.textContent = btn.dataset.videoTitle || "";
      dVideo.src = src;
      dialog.showModal();
      dVideo.play().catch(() => {});
    });
  });
  if (dialog) {
    $("[data-video-close]", dialog).addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => { dVideo.pause(); dVideo.removeAttribute("src"); dVideo.load(); });
  }

  /* ---------- 10. Video testimonial (plays with sound on tap) ---------- */
  $$("[data-tvideo]").forEach((card) => {
    const video = $("video", card);
    $("[data-tvideo-play]", card).addEventListener("click", () => {
      loadVideo(video);
      video.muted = false;
      video.controls = true;
      card.classList.add("is-playing");
      video.play().catch(() => {});
      video.focus({ preventScroll: true });
    });
  });

  /* ---------- 11. Comparison → stacked cards on mobile ---------- */
  const compare = $("[data-compare]");
  if (compare) {
    const table = $("table", compare);
    const cardsWrap = $("[data-compare-cards]", compare);
    const heads = $$("thead th", table);
    const rows = $$("tbody tr", table);
    heads.forEach((th, col) => {
      const featured = th.classList.contains("is-featured");
      const card = document.createElement("article");
      card.className = "card compare-card" + (featured ? " is-featured gradient-border" : "");
      const h = document.createElement("h3");
      h.textContent = th.textContent;
      card.appendChild(h);
      const dl = document.createElement("dl");
      rows.forEach((tr) => {
        const row = document.createElement("div");
        row.className = "row";
        const dt = document.createElement("dt");
        dt.textContent = $("th", tr).textContent;
        const dd = document.createElement("dd");
        dd.innerHTML = tr.children[col + 1].innerHTML;
        row.append(dt, dd);
        dl.appendChild(row);
      });
      card.appendChild(dl);
      cardsWrap.appendChild(card);
    });
  }

  /* ---------- 12. FAQ accordion ---------- */
  $$("[data-faq] .faq-item").forEach((item) => {
    const btn = $("button", item);
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-open", open);
    });
  });

  /* ---------- 13. Stage line draws on scroll ---------- */
  const stages = $("[data-stages]");
  if (stages) {
    const line = $(".stages-line", stages);
    if (reduceMotion) {
      line.style.setProperty("--draw", "1");
    } else {
      let raf = 0;
      const draw = () => {
        raf = 0;
        const r = stages.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = (vh * 0.75 - r.top) / (r.height || 1);
        line.style.setProperty("--draw", Math.max(0, Math.min(1, progress)).toFixed(3));
      };
      window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
      window.addEventListener("resize", draw);
      draw();
    }
  }

  /* ---------- 14. Desktop-only: card spotlight + hero parallax ---------- */
  if (finePointer) {
    document.documentElement.classList.add("has-spotlight");
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  }
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

  /* ---------- 15. Logo marquee: clone once for a seamless loop ---------- */
  const track = $(".marquee-track");
  if (track) {
    Array.from(track.children).forEach((li) => {
      const clone = li.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      $("img", clone).alt = "";
      track.appendChild(clone);
    });
  }
})();

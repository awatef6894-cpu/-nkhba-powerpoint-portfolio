/* =========================================================
   Pricing — the ONLY place the program price is defined.
   Everything on the page (pricing card, tracking events)
   reads from here.
   ========================================================= */
const PRICE_USD = 200;
const SAR_PEG_RATE = 3.75; // official fixed USD/SAR peg
const PRICE_SAR = Math.round(PRICE_USD * SAR_PEG_RATE); // = 750

const PRICING = Object.freeze({
  PRICE_USD,
  SAR_PEG_RATE,
  PRICE_SAR,
  currencyLabel: "ريال",
  currencyCode: "SAR",
});

if (typeof window !== "undefined") window.PRICING = PRICING;
if (typeof module !== "undefined") module.exports = PRICING;

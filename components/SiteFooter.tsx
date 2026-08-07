export function SiteFooter() {
  return (
    <footer className="border-t border-ink-900/8 bg-surface py-8 text-center">
      <p className="text-xs text-ink-700/70">
        © {new Date().getFullYear()} نخبة البوربوينت. جميع الحقوق محفوظة.
      </p>
    </footer>
  );
}

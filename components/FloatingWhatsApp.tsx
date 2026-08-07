import { WHATSAPP_LINK } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-teal-600 text-white shadow-glow-brand transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.35.68 4.55 1.87 6.4L4 29l7.8-1.83A11.9 11.9 0 0 0 16.02 27C22.63 27 28 21.63 28 15S22.63 3 16.02 3Zm0 21.7c-1.98 0-3.83-.55-5.4-1.5l-.39-.23-4.63 1.09 1.11-4.5-.25-.4A9.63 9.63 0 0 1 6.3 15c0-5.36 4.36-9.7 9.72-9.7 5.36 0 9.7 4.34 9.7 9.7 0 5.36-4.34 9.7-9.7 9.7Zm5.32-7.27c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.19.29-.76.95-.93 1.14-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.35-1.45-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.08-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.19 3.01.15.19 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
      </svg>
    </a>
  );
}

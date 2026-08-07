import type { Metadata } from "next";
import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://portfolio.powerpoint1.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "معرض أعمال نخبة البوربوينت",
  description:
    "لكل فكرة، حضور يليق بها. معرض أعمالنا الحقيقي في تصميم العروض التقديمية لجهات حكومية ومؤسسية وبنكية وخيرية.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: "معرض أعمال نخبة البوربوينت",
    title: "معرض أعمال نخبة البوربوينت",
    description: "لكل فكرة، حضور يليق بها. معرض أعمالنا الحقيقي في تصميم العروض التقديمية.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${elMessiri.variable} ${ibmPlexSansArabic.variable}`}>
      <body className="font-body antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

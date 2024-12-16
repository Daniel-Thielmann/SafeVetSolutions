'use client'

import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { CartProvider } from "src/context/cart";
import { usePathname } from "next/navigation";

const safeVetBunken = localFont({
  src: "../../public/fonts/bunkentechsansscwide-bold.ttf",
  weight: "700",
  variable: "--font-bunken",
});

const safeVetGoldplay = localFont({
  src: "../../public/fonts/Goldplay-Medium.ttf",
  weight: "600",
  variable: "--font-goldplay",
});

const safeVetGoldplayAlt = localFont({
  src: "../../public/fonts/GoldplayAlt-Thin.ttf",
  variable: "--font-goldplayalt",
});

const safeVetGoldplayRegular = localFont({
  src: "../../public/fonts/Goldplay-RegularIt.ttf",
  weight: "400",
  variable: "--font-goldplaymedium",
});

const safeVetManilla = localFont({
  src: "../../public/fonts/Manilla Cellos.otf",
  weight: "400",
  variable: "--font-manilla",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const pathname = usePathname();

const getPageTitle = () => {
  const segments = pathname.split("/").filter(Boolean); 

  if (pathname === "/") {
      return "Safe Vet";
  } else if (segments[0] === "dashboard") {
      if (segments.length === 1) {
          return `Safe Vet | Dashboard`;
      } else if (segments.length > 1) {
          const page = segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
          return `Safe Vet | ${page}`;
      }
  } else {
      const page = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
      return `Safe Vet | ${page}`;
  }

  return "Safe Vet";
};

  return (
    <html lang="en">
      <head>
        <title>{getPageTitle()}</title>
        <link rel="icon" href="/safevet.png" />
      </head>
      <body
        className={`${safeVetBunken.variable} ${safeVetGoldplay.variable} ${safeVetGoldplayAlt.variable} ${safeVetGoldplayRegular.variable} ${safeVetManilla.variable} font-sans space-y-12 bg-[#F2F7FB] `}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

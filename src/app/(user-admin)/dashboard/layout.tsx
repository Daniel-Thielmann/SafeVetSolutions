'use client';

import "../../globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/layout/navbar";
import { usePathname } from "next/navigation";

// Carregando as fontes locais
const safeVetBunken = localFont({
    src: "../../../../public/fonts/bunkentechsansscwide-bold.ttf",
    weight: "700",
    variable: "--font-bunken",
});

const safeVetGoldplay = localFont({
    src: "../../../../public/fonts/Goldplay-Medium.ttf",
    weight: "600",
    variable: "--font-goldplay",
});

const safeVetGoldplayAlt = localFont({
    src: "../../../../public/fonts/GoldplayAlt-Thin.ttf",
    variable: "--font-goldplayalt",
});

const safeVetGoldplayRegular = localFont({
    src: "../../../../public/fonts/Goldplay-RegularIt.ttf",
    weight: "400",
    variable: "--font-goldplaymedium",
});

const safeVetManilla = localFont({
    src: "../../../../public/fonts/Manilla Cellos.otf",
    weight: "400",
    variable: "--font-manilla",
});

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
            <body
                className={`${safeVetBunken.variable} ${safeVetGoldplay.variable} ${safeVetGoldplayAlt.variable} ${safeVetGoldplayRegular.variable} ${safeVetManilla.variable} font-sans bg-[#F2F7FB]`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}

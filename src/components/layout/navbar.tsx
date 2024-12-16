"use client";

import { ArrowDown, ArrowLeftFromLine, ChevronDown, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  {
    href: "/",
    label: <Image src="/safevet.png" alt="HOME" width={160} height={160} />,
  },
  { href: "/accreditation", label: "Certificação" },
  { href: "/#contact", label: "Contato" }, 
  {
    href: "/free-materials",
    label: "Conteúdos",
  },
  { href: "/store/ebooks", label: "Loja" },
  
  {
    href: "/login",
    label: "Entrar",
  },
  {
    href: "/dashboard",
    label:  "Dashboard"
  },
  {
    href: "/cart",
    icon: <ShoppingCart className=" font-bold"/>
  }
];

const links2 = [
  { href: "/", label: "Home" },
  { href: "/accreditation", label: "Certificação" },
  { href: "/#contact", label: "Contato" }, 
  {
    href: "/free-materials",
    label: "Conteúdos",
  },
  { href: "/store/ebooks", label: "Loja" },
  {
    href: "/login",
    label: "Entrar",
  },
  {
    href: "/dashboard",
    label:  "Dashboard"
  },
  {
    href: "/cart",
    label: "Carrinho",
    icon: <ShoppingCart className="w-6 lg:w-12 font-bold"/>
  }
];

export default function Navbar() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const router = useRouter();

  const toggleNavigation = () => setIsNavigationOpen(!isNavigationOpen);

  const handleNavigation = (href: string) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <header className="bg-[#F2F7FB] w-full flex pt-4 px-3 mb-12">
      <div className="w-full items-center bp:hidden">
        <Menu onClick={toggleNavigation} className="w-12 h-12 cursor-pointer" />
      </div>

      <div className="hidden bp:flex w-full items-center justify-center pt-6 gap-8 xl:gap-16">
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            onClick={handleNavigation(link.href)}
          >
            <span className="md:text-xs lg:text-sm xl:text-md text-black uppercase 2xl:text-lg flex items-center font-bunken hover:text-[#1C275F] transition-all hover:underline hover:underline-offset-4">
              {link.label}
              {link.icon}
            </span>
          </Link>
        ))}
      </div>

      {isNavigationOpen && (
        <div className="bp:hidden fixed inset-0 bg-[#C6DDED] flex flex-col gap-7 p-6 z-40 w-10/12">
          <div className="flex w-full justify-between items-center mb-6">
            <Image
              src="/safevet.png"
              alt="Logo do Blog"
              width={72.38}
              height={70}
            />
            <ArrowLeftFromLine
              onClick={toggleNavigation}
              className="w-12 h-12 cursor-pointer"
            />
          </div>

          {links2.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              onClick={(e) => {
                handleNavigation(link.href)(e);
                toggleNavigation();
              }}
            >
              <span className="text-2xl text-[#1C275F] font-goldplay bg-[#1C275F]/10 rounded-xl p-3 flex items-center">
                {link.label}
                {link.icon}
              </span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

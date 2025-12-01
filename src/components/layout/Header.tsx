"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navItems = [
  { href: "/about", label: "Acoruについて" },
  { href: "/service", label: "事業内容" },
  { href: "/cases", label: "導入事例" },
  { href: "/news", label: "お知らせ" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <Image
            src="/icon.png"
            alt="Acoruロゴ"
            width={40}
            height={40}
            className="h-9 w-9"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold tracking-[0.18em] text-slate-900">
              ACORU INC.
            </span>
            <span className="text-[11px] text-slate-500">
              RFID / NFC × AI × DX
            </span>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white/70 text-slate-900 shadow-sm shadow-slate-200/80 transition hover:-translate-y-0.5 hover:bg-slate-50 md:hidden"
          aria-label="メニューを開閉"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">メニュー</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-slate-900 transition-transform duration-200 ${
                isOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-slate-900 transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "top-1.5 opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-slate-900 transition-transform duration-200 ${
                isOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>

        <nav className="hidden items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-slate-500 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full px-3 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" className="px-4" variant="primary">
            お問い合わせ
          </Button>
        </nav>
      </Container>

      {isOpen && (
        <nav className="border-t border-slate-200 bg-white/95 shadow-sm shadow-slate-200/80 backdrop-blur md:hidden">
          <Container className="flex flex-col gap-2 py-4 text-[13px] font-semibold tracking-[0.14em] text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 transition hover:bg-slate-50"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" className="justify-center" onClick={closeMenu}>
              お問い合わせ
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}

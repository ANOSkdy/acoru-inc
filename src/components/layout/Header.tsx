"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { acoruMarkPaths } from "@/components/brand/acoru-mark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navItems = [
  { href: "/about", label: "Acoruについて" },
  { href: "/service", label: "事業内容" },
  { href: "/cases", label: "導入事例" },
  { href: "/news", label: "お知らせ" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
    {!isHome && <div className="acoru-header-spacer" aria-hidden="true" />}
    <header className="acoru-b-header">
      <Container className="acoru-b-header-inner flex items-center justify-between">
        <Link href="/" aria-label="Acoru合同会社 トップへ" className="acoru-header-brand flex items-center gap-2.5" onClick={closeMenu}>
          <svg
            data-acoru-header-logo
            viewBox="0 0 500 500"
            width={30}
            height={30}
            fill="currentColor"
            aria-hidden="true"
            className="h-[30px] w-[30px] shrink-0 text-[#534491]"
          >
            <path d={acoruMarkPaths.peak} />
            <path d={acoruMarkPaths.arc1} />
            <path d={acoruMarkPaths.arc2} />
          </svg>
          <span className="acoru-header-wordmark text-lg font-black tracking-[0.04em] text-slate-900">
            Acoru合同会社
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white/70 text-slate-900 shadow-sm shadow-slate-200/80 transition-[background-color,transform,box-shadow] motion-fast motion-spring-soft hover:-translate-y-0.5 hover:bg-slate-50 active:translate-y-0 md:hidden"
          aria-label="メニューを開閉"
          aria-expanded={isOpen}
          aria-controls="acoru-mobile-navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">メニュー</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-slate-900 transition-transform motion-fast motion-spring-snappy ${
                isOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-slate-900 transition-opacity motion-fast motion-spring-snappy ${
                isOpen ? "opacity-0" : "top-1.5 opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-slate-900 transition-transform motion-fast motion-spring-snappy ${
                isOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>

        <nav aria-label="メインナビゲーション" className="acoru-b-header-links hidden items-center md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full px-3 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" className="acoru-header-cta" variant="primary">お問い合わせ</Button>
        </nav>
      </Container>

      {isOpen && (
        <nav id="acoru-mobile-navigation" aria-label="モバイルナビゲーション" className="acoru-mobile-navigation menu-open-enter border-t border-slate-200 bg-white/95 shadow-sm shadow-slate-200/80 backdrop-blur md:hidden">
          <Container className="flex flex-col gap-2 py-4 text-[13px] font-semibold tracking-[0.14em] text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 transition-[background-color,color,transform] motion-fast motion-spring-soft hover:bg-slate-50"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" className="acoru-header-cta w-full justify-center" onClick={closeMenu}>
              お問い合わせ
            </Button>
          </Container>
        </nav>
      )}
    </header>
    </>
  );
}

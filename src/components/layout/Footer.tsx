import Link from "next/link";

import { Container } from "@/components/ui/Container";

const navItems = [
  { href: "/about", label: "Acoruについて" },
  { href: "/service", label: "事業内容" },
  { href: "/cases", label: "導入事例" },
  { href: "/news", label: "お知らせ" },
  { href: "/contact", label: "お問い合わせ" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col gap-2 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p className="shrink-0">© {year} Acoru inc.</p>
        <nav aria-label="フッターナビゲーション" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-8 items-center transition-colors hover:text-[#534491] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#534491]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}

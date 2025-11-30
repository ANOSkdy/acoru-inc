import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/about", label: "Acoruについて" },
  { href: "/service", label: "事業内容" },
  { href: "/cases", label: "導入事例" },
  { href: "/news", label: "お知らせ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
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

        <nav className="hidden items-center gap-6 text-[11px] font-medium tracking-[0.22em] text-slate-500 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-slate-900 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-white shadow-sm shadow-slate-400/40 transition hover:-translate-y-0.5 hover:bg黒"
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}

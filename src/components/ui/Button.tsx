import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const baseClasses =
  "inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors";

const variantClasses: Record<"primary" | "ghost", string> = {
  primary:
    "bg-[#534491] text-white shadow-sm shadow-[#534491]/40 hover:-translate-y-0.5 hover:bg-[#433676]",
  ghost:
    "border border-slate-300 bg-white text-slate-900 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-50",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className ?? ""}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

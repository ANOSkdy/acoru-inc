import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  narrow?: boolean;
}

export function Section({ children, id, className, narrow = false }: SectionProps) {
  const content = narrow ? <div className="max-w-3xl">{children}</div> : children;

  return (
    <section
      id={id}
      className={`py-10 sm:py-12 md:py-16 ${className ?? ""}`.trim()}
    >
      {content}
    </section>
  );
}

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { publicCaseHref } from "@/lib/case-urls";

export type RichTextProps = {
  source?: string;
  className?: string;
  preserveHeadingLevels?: boolean;
};

function combineClassName(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

/**
 * Markdownコンテンツを安全に描画するサーバーコンポーネント。
 */
export function RichText({ source, className, preserveHeadingLevels = false }: RichTextProps) {
  if (!source) return null;

  const containerClass = combineClassName(
    "space-y-4 text-[13px] leading-relaxed text-slate-700 md:text-[14px]",
    className
  );

  return (
    <div className={containerClass}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h2
              className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl"
              {...props}
            />
          ),
          h2: ({ ...props }) => preserveHeadingLevels ? (
            <h2 className="scroll-mt-24 border-b border-slate-200 pb-3 pt-6 text-xl font-semibold leading-relaxed text-slate-900" {...props} />
          ) : (
            <h3
              className="text-base font-semibold tracking-tight text-slate-900 md:text-lg"
              {...props}
            />
          ),
          h3: ({ ...props }) => preserveHeadingLevels ? (
            <h3 className="pt-3 text-lg font-semibold leading-relaxed text-slate-900" {...props} />
          ) : (
            <h4
              className="text-[15px] font-semibold tracking-tight text-slate-900"
              {...props}
            />
          ),
          p: ({ ...props }) => <p className="leading-relaxed" {...props} />,
          strong: ({ ...props }) => (
            <strong className="font-semibold text-slate-900" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc space-y-2 pl-5" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal space-y-2 pl-5" {...props} />
          ),
          li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
          table: ({ children, ...props }) => (
            <div role="region" aria-label="比較表（横にスクロールできます）" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-[#534491]">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm" {...props}>{children}</table>
            </div>
          ),
          th: ({ ...props }) => <th className="border-b border-slate-200 bg-[#534491]/10 px-4 py-3 font-semibold text-slate-900" {...props} />,
          td: ({ ...props }) => <td className="border-b border-slate-200 px-4 py-3 align-top" {...props} />,
          a: ({ href, ...props }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={publicCaseHref(href)}
                className="text-slate-900 underline underline-offset-2"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer noopener" : undefined}
                {...props}
              />
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export type RichTextProps = {
  source?: string;
  className?: string;
};

function combineClassName(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

/**
 * Airtableのリッチテキスト（Markdown）を安全に描画するサーバーコンポーネント。
 */
export function RichText({ source, className }: RichTextProps) {
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
          h2: ({ ...props }) => (
            <h3
              className="text-base font-semibold tracking-tight text-slate-900 md:text-lg"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
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
          a: ({ href, ...props }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
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

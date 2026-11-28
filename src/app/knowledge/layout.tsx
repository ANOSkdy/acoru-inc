import "./brand.generated.css";
import "./knowledge.css";

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="knowledge-shell">
      <div className="knowledge-container">{children}</div>
    </div>
  );
}

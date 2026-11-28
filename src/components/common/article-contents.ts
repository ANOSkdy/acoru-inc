import type { Element, ElementContent, Root } from "hast";

function plainText(node: ElementContent): string {
  if (node.type === "text") return node.value;
  if (node.type !== "element") return "";
  if (node.tagName === "img") return String(node.properties.alt ?? "");
  return node.children.map(plainText).join("");
}

// Use the rendered Markdown tree so reference links, inline code, repeated
// headings and fenced code examples agree with what the reader actually sees.
export function articleContents() {
  return (tree: Root) => {
    const items: Element[] = [];
    for (const node of tree.children) {
      if (node.type !== "element" || !["h1", "h2", "h3"].includes(node.tagName)) continue;
      const title = plainText(node).trim();
      if (!title) continue;
      const id = `section-${items.length + 1}`;
      node.properties.id = id;
      items.push({
        type: "element", tagName: "li", properties: {}, children: [{
          type: "element", tagName: "a", properties: { href: `#${id}` },
          children: [{ type: "text", value: title }],
        }],
      });
    }
    if (items.length === 0) return;
    tree.children.unshift({
      type: "element", tagName: "nav", properties: { ariaLabel: "目次", className: ["knowledge-toc"] },
      children: [
        { type: "element", tagName: "p", properties: {}, children: [{ type: "text", value: "目次" }] },
        { type: "element", tagName: "ol", properties: {}, children: items },
      ],
    });
  };
}

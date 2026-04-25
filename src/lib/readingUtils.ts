export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function computeWordCount(text: string): number {
  return text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
}

export function computeReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function extractHeadings(
  content: string,
  format: "html" | "stars" | "hash"
): Heading[] {
  const headings: Heading[] = [];

  if (format === "html") {
    const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, "").trim();
      if (text) {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        headings.push({ id, text, level: 2 });
      }
    }
  } else if (format === "stars") {
    content.split("\n\n").forEach((para) => {
      if (para.startsWith("**") && para.endsWith("**")) {
        const text = para.replace(/\*\*/g, "").trim();
        if (text) {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          headings.push({ id, text, level: 2 });
        }
      }
    });
  } else if (format === "hash") {
    content.split("\n\n").forEach((para) => {
      if (para.startsWith("## ")) {
        const text = para.replace(/^##\s*/, "").trim();
        if (text) {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          headings.push({ id, text, level: 2 });
        }
      }
    });
  }

  return headings;
}

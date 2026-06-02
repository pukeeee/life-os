import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Презентаційний рендерер Markdown (entities). Без бізнес-логіки — використовується
 * у віджетах journal-list і today-journal.
 */
export function JournalMarkdown({ content }: { content: string }) {
  if (!content.trim()) {
    return <p className="text-sm text-muted-foreground">Порожньо.</p>;
  }
  return (
    <div className="prose prose-sm max-w-none text-foreground [&_a]:text-primary [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading [&_li]:my-0.5 [&_p]:my-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

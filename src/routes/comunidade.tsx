import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { DEMO_POSTS } from "@/lib/demo";
import { uid, usePosts, type Category } from "@/lib/store";
import { PageHeader, btn, chip } from "@/components/elo";

const CATS: Category[] = ["Discussão", "Recomendação", "Dúvida"];

export const Route = createFileRoute("/comunidade")({
  head: () => ({
    meta: [
      { title: "Comunidade — Elo" },
      { name: "description", content: "Mural de discussões, recomendações e dúvidas sobre jogos." },
      { property: "og:title", content: "Comunidade — Elo" },
      { property: "og:description", content: "Mural de discussões, recomendações e dúvidas sobre jogos." },
    ],
  }),
  component: Comunidade,
});

function Comunidade() {
  const [posts, setPosts] = usePosts();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>("Discussão");
  const [filter, setFilter] = useState<Category | null>(null);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return setError("Preencha título e texto.");
    setPosts((p) => [{ id: uid(), title: title.trim(), text: text.trim(), category, createdAt: Date.now() }, ...p]);
    setTitle(""); setText(""); setError("");
  };
  const show = (c: Category) => !filter || filter === c;

  return (
    <div>
      <PageHeader kicker="Mural" title="Comunidade">Suas publicações ficam salvas apenas neste navegador.</PageHeader>
      <form onSubmit={submit} className="grid gap-3 rounded-xl border bg-card p-5">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => <button type="button" key={c} className={chip(category === c)} onClick={() => setCategory(c)}>{c}</button>)}
        </div>
        <input className="field" maxLength={120} placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="field min-h-24" maxLength={1000} placeholder="Escreva sua publicação…" value={text} onChange={(e) => setText(e.target.value)} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button className={`${btn} justify-self-start`}>Publicar</button>
      </form>

      <div className="mb-4 mt-10 flex flex-wrap gap-2">
        <button className={chip(!filter)} onClick={() => setFilter(null)}>Tudo</button>
        {CATS.map((c) => <button key={c} className={chip(filter === c)} onClick={() => setFilter(c)}>{c}</button>)}
      </div>
      <div className="grid gap-3">
        {posts.filter((p) => show(p.category)).map((p) => (
          <article key={p.id} className="rounded-xl border border-primary/40 bg-card p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">{p.category}</span>
              <span className="text-xs text-muted-foreground">Você · {new Date(p.createdAt).toLocaleDateString("pt-BR")}</span>
              <button aria-label="Excluir publicação" className="ml-auto text-muted-foreground hover:text-destructive" onClick={() => confirm("Excluir esta publicação?") && setPosts((l) => l.filter((x) => x.id !== p.id))}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <h2 className="mt-3 text-xl font-bold">{p.title}</h2>
            <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{p.text}</p>
          </article>
        ))}
        {DEMO_POSTS.filter((p) => show(p.category)).map((p) => (
          <article key={p.title} className="rounded-xl border bg-card p-5 opacity-80">
            <div className="flex gap-3">
              <span className="rounded-full border px-2.5 py-0.5 text-xs">{p.category}</span>
              <span className="rounded bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Exemplo de demonstração</span>
            </div>
            <h2 className="mt-3 text-xl font-bold">{p.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

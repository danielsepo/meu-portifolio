import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { GAMES, getGame } from "@/lib/games";
import { uid, useReviews } from "@/lib/store";
import { Empty, PageHeader, Stars, btn } from "@/components/elo";

export const Route = createFileRoute("/diario")({
  validateSearch: (s: Record<string, unknown>): { jogo?: string } => (typeof s.jogo === "string" ? { jogo: s.jogo } : {}),
  head: () => ({
    meta: [
      { title: "Diário e avaliações — Elo" },
      { name: "description", content: "Registre suas notas e análises dos jogos que você jogou." },
      { property: "og:title", content: "Diário e avaliações — Elo" },
      { property: "og:description", content: "Registre suas notas e análises dos jogos que você jogou." },
    ],
  }),
  component: Diario,
});

function Diario() {
  const { jogo } = Route.useSearch();
  const [reviews, setReviews, ready] = useReviews();
  const [gameId, setGameId] = useState(jogo && getGame(jogo) ? jogo : "");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameId) return setError("Escolha um jogo.");
    if (rating < 0.5) return setError("Dê uma nota de 0,5 a 5 estrelas.");
    if (text.trim().length < 3) return setError("Escreva algumas palavras na análise.");
    setReviews((r) => [{ id: uid(), gameId, rating, text: text.trim(), createdAt: Date.now() }, ...r]);
    setRating(0); setText(""); setError("");
  };

  return (
    <div>
      <PageHeader kicker="Seu diário" title="Diário e avaliações">Cada partida merece um registro.</PageHeader>
      <form onSubmit={submit} className="grid gap-4 rounded-xl border bg-card p-5">
        <select className="field" value={gameId} onChange={(e) => setGameId(e.target.value)} aria-label="Jogo">
          <option value="">Escolha o jogo…</option>
          {GAMES.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select>
        <div className="flex items-center gap-3">
          <Stars value={rating} onChange={setRating} />
          <span className="text-sm text-muted-foreground">{rating ? rating.toLocaleString("pt-BR") : "sem nota"}</span>
        </div>
        <textarea className="field min-h-28" maxLength={1000} placeholder="O que ficou com você depois de jogar?" value={text} onChange={(e) => setText(e.target.value)} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button className={`${btn} justify-self-start`}>Publicar avaliação</button>
      </form>

      <div className="mt-10">
        {ready && reviews.length === 0 ? (
          <Empty title="Nenhuma avaliação ainda" text="Sua primeira análise vai aparecer aqui." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <article key={r.id} className="rounded-xl border bg-card p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-xl font-bold">{getGame(r.gameId)?.title ?? "Jogo removido"}</p>
                    <Stars value={r.rating} />
                  </div>
                  <button aria-label="Excluir avaliação" className="rounded-lg p-2 text-muted-foreground hover:text-destructive" onClick={() => confirm("Excluir esta avaliação?") && setReviews((l) => l.filter((x) => x.id !== r.id))}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm">{r.text}</p>
                <p className="mt-3 text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { getGame } from "@/lib/games";
import { useLibrary } from "@/lib/store";
import { Cover, Stars, btn, btnGhost } from "@/components/elo";

export const Route = createFileRoute("/jogo/$id")({
  loader: ({ params }) => {
    const game = getGame(params.id);
    if (!game) throw notFound();
    return game;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Elo` },
          { name: "description", content: loaderData.synopsis },
          { property: "og:title", content: `${loaderData.title} — Elo` },
          { property: "og:description", content: loaderData.synopsis },
        ]
      : [{ title: "Jogo não encontrado — Elo" }, { name: "robots", content: "noindex" }],
  }),
  component: Jogo,
});

function Jogo() {
  const game = Route.useLoaderData();
  const [lib, setLib] = useLibrary();
  const inLib = lib.some((i) => i.gameId === game.id);
  return (
    <div>
      <Link to="/explorar" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Explorar</Link>
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <Cover game={game} className="mx-auto w-full max-w-[280px]" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">{game.genre} · {game.year}</p>
          <h1 className="mt-2 text-5xl font-extrabold md:text-6xl">{game.title}</h1>
          <div className="mt-4 flex items-center gap-3">
            <Stars value={Math.round(game.score * 2) / 2} />
            <span className="text-sm text-muted-foreground">{game.score.toFixed(1)} · nota demonstrativa</span>
          </div>
          <p className="mt-6 max-w-xl text-lg">{game.synopsis}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {inLib ? (
              <button className={btnGhost} onClick={() => setLib((l) => l.filter((i) => i.gameId !== game.id))}><Check className="h-4 w-4" /> Na biblioteca · remover</button>
            ) : (
              <button className={btn} onClick={() => setLib((l) => [...l, { gameId: game.id, status: "quero", addedAt: Date.now() }])}><Plus className="h-4 w-4" /> Adicionar à biblioteca</button>
            )}
            <Link to="/diario" search={{ jogo: game.id }} className={btnGhost}>Avaliar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

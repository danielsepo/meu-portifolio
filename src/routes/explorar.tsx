import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { GAMES, GENRES } from "@/lib/games";
import { Empty, GameCard, PageHeader, chip } from "@/components/elo";

export const Route = createFileRoute("/explorar")({
  head: () => ({
    meta: [
      { title: "Explorar jogos — Elo" },
      { name: "description", content: "Busque e filtre jogos por gênero no catálogo do Elo." },
      { property: "og:title", content: "Explorar jogos — Elo" },
      { property: "og:description", content: "Busque e filtre jogos por gênero no catálogo do Elo." },
    ],
  }),
  component: Explorar,
});

function Explorar() {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState<string | null>(null);
  const list = GAMES.filter((g) => (!genre || g.genre === genre) && g.title.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div>
      <PageHeader kicker="Catálogo" title="Explorar jogos">Doze clássicos e queridinhos para começar.</PageHeader>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input className="field pl-9" placeholder="Buscar por nome…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className={chip(!genre)} onClick={() => setGenre(null)}>Todos</button>
        {GENRES.map((g) => <button key={g} className={chip(genre === g)} onClick={() => setGenre(g)}>{g}</button>)}
      </div>
      <div className="mt-8">
        {list.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{list.map((g) => <GameCard key={g.id} game={g} />)}</div>
        ) : (
          <Empty title="Nada por aqui" text="Nenhum jogo combina com a busca. Tente outro nome ou gênero." />
        )}
      </div>
    </div>
  );
}

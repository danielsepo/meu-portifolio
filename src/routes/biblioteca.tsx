import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { getGame } from "@/lib/games";
import { STATUS_LABEL, useLibrary, type Status } from "@/lib/store";
import { Cover, Empty, PageHeader, btn, chip } from "@/components/elo";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Minha biblioteca — Elo" },
      { name: "description", content: "Organize seus jogos entre quero jogar, jogando e finalizado." },
      { property: "og:title", content: "Minha biblioteca — Elo" },
      { property: "og:description", content: "Organize seus jogos entre quero jogar, jogando e finalizado." },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  const [lib, setLib, ready] = useLibrary();
  const [filter, setFilter] = useState<Status | null>(null);
  const list = lib.filter((i) => !filter || i.status === filter);
  const setStatus = (id: string, status: Status) => setLib((l) => l.map((i) => (i.gameId === id ? { ...i, status } : i)));
  return (
    <div>
      <PageHeader kicker="Sua coleção" title="Minha biblioteca">Salva neste navegador.</PageHeader>
      <div className="mb-6 flex flex-wrap gap-2">
        <button className={chip(!filter)} onClick={() => setFilter(null)}>Todos ({lib.length})</button>
        {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
          <button key={s} className={chip(filter === s)} onClick={() => setFilter(s)}>
            {STATUS_LABEL[s]} ({lib.filter((i) => i.status === s).length})
          </button>
        ))}
      </div>
      {!ready ? null : list.length === 0 ? (
        <Empty
          title={lib.length ? "Nenhum jogo neste status" : "Sua estante está vazia"}
          text={lib.length ? "Mude o filtro ou atualize o status de algum jogo." : "Toda jornada começa com um jogo. Explore o catálogo e adicione o primeiro."}
          action={!lib.length && <Link to="/explorar" className={btn}>Explorar jogos</Link>}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((item) => {
            const g = getGame(item.gameId);
            if (!g) return null;
            return (
              <div key={g.id} className="flex gap-4 rounded-xl border bg-card p-3">
                <Link to="/jogo/$id" params={{ id: g.id }} className="w-20 shrink-0"><Cover game={g} /></Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="font-display text-lg font-bold">{g.title}</p>
                  <p className="text-xs text-muted-foreground">{g.genre} · {g.year}</p>
                  <div className="mt-auto flex items-center gap-2 pt-3">
                    <select aria-label="Status" className="field py-1.5" value={item.status} onChange={(e) => setStatus(g.id, e.target.value as Status)}>
                      {(Object.keys(STATUS_LABEL) as Status[]).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                    </select>
                    <button aria-label="Remover" className="rounded-lg border p-2 text-muted-foreground hover:text-destructive" onClick={() => setLib((l) => l.filter((i) => i.gameId !== g.id))}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

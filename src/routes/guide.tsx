import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Info, Send, Sparkles } from "lucide-react";
import { GAMES, getGame } from "@/lib/games";
import { PageHeader, btn, chip } from "@/components/elo";

const SPOILERS = ["Sem spoilers", "Spoilers leves", "Spoilers completos"] as const;
const SUGGESTIONS = ["Como resolvo este puzzle?", "Quem é esse personagem?", "Qual escolha leva ao melhor final?", "Onde fica a próxima missão?"];
type Msg = { from: "user" | "guide"; text: string };

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Elo Guide — assistente (demonstração)" },
      { name: "description", content: "Interface demonstrativa de um assistente para missões, histórias e puzzles." },
      { property: "og:title", content: "Elo Guide — assistente (demonstração)" },
      { property: "og:description", content: "Interface demonstrativa de um assistente para missões, histórias e puzzles." },
    ],
  }),
  component: Guide,
});

function Guide() {
  const [gameId, setGameId] = useState(GAMES[0].id);
  const [spoiler, setSpoiler] = useState<(typeof SPOILERS)[number]>("Sem spoilers");
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      { from: "user", text: `[${getGame(gameId)?.title} · ${spoiler}] ${text.trim()}` },
      { from: "guide", text: "Esta é uma demonstração: o Elo Guide ainda não está conectado a uma IA, então não gera respostas. A integração inteligente será adicionada futuramente. Sua pergunta foi registrada apenas nesta tela." },
    ]);
    setQ("");
  };

  return (
    <div>
      <PageHeader kicker="Assistente" title="Elo Guide">Ajuda para missões, histórias, personagens, escolhas e puzzles.</PageHeader>
      <div className="mb-6 flex gap-3 rounded-xl border border-primary bg-card p-4 text-sm">
        <Info className="h-5 w-5 shrink-0 text-primary" />
        <p><strong>Versão de demonstração.</strong> Esta interface não está conectada a uma IA real e não produz respostas. A integração inteligente será adicionada em uma versão futura.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-5">
          <label className="block text-sm font-semibold">Jogo
            <select className="field mt-2" value={gameId} onChange={(e) => setGameId(e.target.value)}>
              {GAMES.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
            </select>
          </label>
          <div>
            <p className="text-sm font-semibold">Spoilers</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SPOILERS.map((s) => <button key={s} className={chip(spoiler === s)} onClick={() => setSpoiler(s)}>{s}</button>)}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Sugestões</p>
            <div className="mt-2 flex flex-col gap-2">
              {SUGGESTIONS.map((s) => <button key={s} className="rounded-lg border px-3 py-2 text-left text-sm hover:border-primary" onClick={() => setQ(s)}>{s}</button>)}
            </div>
          </div>
        </div>
        <div className="flex min-h-[420px] flex-col rounded-xl border bg-card">
          <div className="flex-1 space-y-3 p-4">
            {msgs.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Sparkles className="h-8 w-8 text-primary" />
                <p className="mt-2 text-sm">Escolha um jogo e escreva sua pergunta.</p>
              </div>
            ) : msgs.map((m, i) => (
              <div key={i} className={m.from === "user" ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-sm text-primary-foreground" : "max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2 text-sm"}>
                {m.from === "guide" && <p className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">Aviso do sistema · demo</p>}
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(q); }} className="flex gap-2 border-t p-3">
            <input className="field" placeholder="Escreva sua pergunta…" value={q} onChange={(e) => setQ(e.target.value)} />
            <button className={btn} aria-label="Enviar" disabled={!q.trim()}><Send className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}

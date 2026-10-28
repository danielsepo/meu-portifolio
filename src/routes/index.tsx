import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { GAMES, getGame } from "@/lib/games";
import { DEMO_POSTS, DEMO_REVIEWS } from "@/lib/demo";
import { Cover, GameCard, Stars, btn, btnGhost } from "@/components/elo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elo — Não é só sobre zerar" },
      { name: "description", content: "Descubra jogos, monte sua biblioteca, escreva avaliações e converse com a comunidade no Elo." },
      { property: "og:title", content: "Elo — Não é só sobre zerar" },
      { property: "og:description", content: "Descubra jogos, monte sua biblioteca e registre cada partida." },
    ],
  }),
  component: Index,
});

function Section({ title, to, children }: { title: string; to: "/explorar" | "/diario" | "/comunidade"; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-3xl font-extrabold">{title}</h2>
        <Link to={to} className="flex items-center gap-1 text-sm text-primary">Ver tudo <ArrowRight className="h-4 w-4" /></Link>
      </div>
      {children}
    </section>
  );
}

function Index() {
  const featured = GAMES.slice(0, 3);
  return (
    <div>
      <section className="grid items-center gap-8 rounded-2xl bg-cream p-6 text-cream-foreground md:grid-cols-[1.3fr_1fr] md:p-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em]">Edição nº 01 · cultura gamer</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[0.95] md:text-7xl">
            Não é só sobre zerar.
          </h1>
          <p className="mt-4 text-lg md:text-xl">É sobre tudo o que acontece no caminho.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/explorar" className={btn}>Explorar jogos</Link>
            <Link to="/biblioteca" className="inline-flex items-center rounded-full border border-cream-foreground px-5 py-2.5 text-sm font-semibold">Minha biblioteca</Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {featured.map((g, i) => (
            <Link key={g.id} to="/jogo/$id" params={{ id: g.id }} className={i === 1 ? "translate-y-6" : ""}>
              <Cover game={g} />
            </Link>
          ))}
        </div>
      </section>

      <Section title="Em destaque" to="/explorar">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {GAMES.slice(3, 9).map((g) => <GameCard key={g.id} game={g} />)}
        </div>
      </Section>

      <Section title="Descobertas" to="/explorar">
        <div className="grid gap-4 md:grid-cols-3">
          {[["Para chorar no final", "outer-wilds"], ["Para jogar com calma", "stardew-valley"], ["Para testar seus reflexos", "celeste"]].map(([label, id]) => {
            const g = getGame(id)!;
            return (
              <Link key={id} to="/jogo/$id" params={{ id }} className="rounded-xl border bg-card p-5 transition hover:border-primary">
                <p className="text-xs uppercase tracking-widest text-primary">{label}</p>
                <p className="mt-2 font-display text-2xl font-bold">{g.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{g.synopsis}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title="Avaliações recentes" to="/diario">
        <div className="grid gap-4 md:grid-cols-3">
          {DEMO_REVIEWS.map((r) => (
            <article key={r.author} className="rounded-xl border bg-card p-5">
              <span className="rounded bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Demonstração</span>
              <p className="mt-3 font-display text-lg font-bold">{getGame(r.gameId)?.title}</p>
              <Stars value={r.rating} />
              <p className="mt-3 text-sm text-muted-foreground">“{r.text}”</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Discussões populares" to="/comunidade">
        <div className="divide-y rounded-xl border bg-card">
          {DEMO_POSTS.map((p) => (
            <div key={p.title} className="flex items-center gap-3 p-4">
              <span className="rounded-full border px-2 py-0.5 text-xs">{p.category}</span>
              <p className="flex-1 font-medium">{p.title}</p>
              <span className="hidden text-[10px] uppercase text-muted-foreground sm:block">Demo</span>
            </div>
          ))}
        </div>
      </Section>

      <section className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-primary p-8 md:flex-row md:items-center">
        <Sparkles className="h-10 w-10 text-primary" />
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold">Travou numa fase? Conheça o Elo Guide.</h2>
          <p className="mt-1 text-muted-foreground">Um assistente para missões, histórias e puzzles — com controle de spoilers.</p>
        </div>
        <Link to="/guide" className={btnGhost}>Conhecer</Link>
      </section>
    </div>
  );
}

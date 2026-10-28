import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GAMES } from "@/lib/games";
import { useLibrary, useProfile, useReviews } from "@/lib/store";
import { PageHeader, btn, chip } from "@/components/elo";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Elo" },
      { name: "description", content: "Seu perfil local com favoritos e estatísticas de jogo." },
      { property: "og:title", content: "Meu perfil — Elo" },
      { property: "og:description", content: "Seu perfil local com favoritos e estatísticas de jogo." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const [profile, setProfile, ready] = useProfile();
  const [lib] = useLibrary();
  const [reviews] = useReviews();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => { if (ready) { setName(profile.name); setBio(profile.bio); } }, [ready, profile.name, profile.bio]);

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const stats = [
    ["Na biblioteca", lib.length],
    ["Jogando", lib.filter((i) => i.status === "jogando").length],
    ["Finalizados", lib.filter((i) => i.status === "finalizado").length],
    ["Avaliações", reviews.length],
    ["Nota média", reviews.length ? avg.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) : "—"],
  ];
  const toggleFav = (id: string) =>
    setProfile((p) => ({ ...p, favorites: p.favorites.includes(id) ? p.favorites.filter((f) => f !== id) : [...p.favorites, id] }));

  return (
    <div>
      <PageHeader kicker="Perfil local" title={profile.name || "Meu perfil"}>Sem cadastro: tudo fica salvo neste navegador.</PageHeader>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-xl border bg-card p-4">
            <p className="font-display text-3xl font-extrabold text-primary">{v}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); setProfile((p) => ({ ...p, name: name.trim(), bio: bio.trim() })); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
        className="mt-8 grid gap-3 rounded-xl border bg-card p-5"
      >
        <label className="text-sm font-semibold">Nome<input className="field mt-2" maxLength={40} value={name} onChange={(e) => setName(e.target.value)} placeholder="Como quer ser chamado?" /></label>
        <label className="text-sm font-semibold">Biografia<textarea className="field mt-2 min-h-20" maxLength={200} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Uma frase sobre você e seus jogos." /></label>
        <div className="flex items-center gap-3">
          <button className={btn}>Salvar perfil</button>
          {saved && <span className="text-sm text-primary">Salvo!</span>}
        </div>
      </form>
      <section className="mt-8">
        <h2 className="text-2xl font-bold">Jogos favoritos</h2>
        <p className="mb-3 text-sm text-muted-foreground">Toque para marcar ou desmarcar.</p>
        <div className="flex flex-wrap gap-2">
          {GAMES.map((g) => <button key={g.id} className={chip(profile.favorites.includes(g.id))} onClick={() => toggleFav(g.id)}>{g.title}</button>)}
        </div>
      </section>
    </div>
  );
}

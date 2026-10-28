import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { coverClass, type Game } from "@/lib/games";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-2xl font-extrabold", className)}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <circle cx="9" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="15" cy="12" r="6" fill="none" className="stroke-primary" strokeWidth="3" />
      </svg>
      elo<span className="text-primary">.</span>
    </span>
  );
}

export function Cover({ game, className }: { game: Game; className?: string }) {
  return (
    <div className={cn("relative aspect-[3/4] overflow-hidden rounded-lg border", coverClass(game.id), className)}>
      <div className="absolute inset-x-0 bottom-0 bg-background/80 p-2 backdrop-blur-sm">
        <p className="font-display text-sm font-bold leading-tight">{game.title}</p>
      </div>
      <span className="absolute left-2 top-2 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
        {game.genre}
      </span>
    </div>
  );
}

export function GameCard({ game }: { game: Game }) {
  return (
    <Link to="/jogo/$id" params={{ id: game.id }} className="group block">
      <Cover game={game} className="transition-transform group-hover:-translate-y-1" />
      <p className="mt-2 text-xs text-muted-foreground">
        {game.year} · ★ {game.score.toFixed(1)}
      </p>
    </Link>
  );
}

export function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = value >= i ? 100 : value >= i - 0.5 ? 50 : 0;
        return (
          <span key={i} className="relative h-6 w-6">
            <Star className="absolute h-6 w-6 text-muted-foreground" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <Star className="h-6 w-6 fill-primary text-primary" />
            </span>
            {onChange && (
              <>
                <button type="button" aria-label={`${i - 0.5} estrelas`} className="absolute inset-y-0 left-0 w-1/2" onClick={() => onChange(i - 0.5)} />
                <button type="button" aria-label={`${i} estrelas`} className="absolute inset-y-0 right-0 w-1/2" onClick={() => onChange(i)} />
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}

export function PageHeader({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{kicker}</p>
      <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">{title}</h1>
      {children && <p className="mt-3 max-w-2xl text-muted-foreground">{children}</p>}
    </header>
  );
}

export function Empty({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <p className="font-display text-2xl font-bold">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export const btn = "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50";
export const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:bg-secondary";
export const chip = (active: boolean) =>
  cn("rounded-full border px-3 py-1.5 text-sm transition", active ? "border-primary bg-primary text-primary-foreground" : "hover:bg-secondary");

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { BookOpen, Compass, Home, Library, MessageSquare, Sparkles, User } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Logo, btn } from "@/components/elo";

const NAV = [
  { to: "/", label: "Início", icon: Home },
  { to: "/explorar", label: "Explorar", icon: Compass },
  { to: "/biblioteca", label: "Biblioteca", icon: Library },
  { to: "/diario", label: "Diário", icon: BookOpen },
  { to: "/comunidade", label: "Comunidade", icon: MessageSquare },
  { to: "/guide", label: "Elo Guide", icon: Sparkles },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

function NotFoundComponent() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-7xl font-extrabold">404</h1>
      <p className="mt-2 text-muted-foreground">Essa fase não existe.</p>
      <Link to="/" className={`${btn} mt-6`}>Voltar ao início</Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold">Game over inesperado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Algo deu errado ao carregar a página.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className={`${btn} mt-6`}>Tentar novamente</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Elo — descubra e acompanhe seus jogos" },
      { name: "description", content: "Não é só sobre zerar. É sobre tudo o que acontece no caminho." },
      { property: "og:title", content: "Elo — descubra e acompanhe seus jogos" },
      { property: "og:description", content: "Não é só sobre zerar. É sobre tudo o que acontece no caminho." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Instrument+Sans:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen md:pl-60">
        <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r bg-card p-5 md:flex">
          <Link to="/"><Logo /></Link>
          <nav className="mt-10 flex flex-col gap-1">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} activeOptions={{ exact: to === "/" }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground data-[status=active]:bg-primary data-[status=active]:font-semibold data-[status=active]:text-primary-foreground">
                <Icon className="h-4 w-4" />{label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto text-xs text-muted-foreground">Projeto acadêmico · dados salvos só neste navegador.</p>
        </aside>
        <header className="sticky top-0 z-20 flex items-center border-b bg-background/90 px-4 py-3 backdrop-blur md:hidden">
          <Link to="/"><Logo className="text-xl" /></Link>
        </header>
        <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:px-10 md:pb-16 md:pt-10">
          <Outlet />
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-7 border-t bg-card md:hidden">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 py-2 text-[9px] text-muted-foreground data-[status=active]:text-primary">
              <Icon className="h-5 w-5" />{label.replace("Elo ", "")}
            </Link>
          ))}
        </nav>
      </div>
    </QueryClientProvider>
  );
}

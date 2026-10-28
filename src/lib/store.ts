import { useCallback, useEffect, useState } from "react";

export type Status = "quero" | "jogando" | "finalizado";
export const STATUS_LABEL: Record<Status, string> = { quero: "Quero jogar", jogando: "Jogando", finalizado: "Finalizado" };
export type LibraryItem = { gameId: string; status: Status; addedAt: number };
export type Review = { id: string; gameId: string; rating: number; text: string; createdAt: number };
export type Category = "Discussão" | "Recomendação" | "Dúvida";
export type Post = { id: string; title: string; text: string; category: Category; createdAt: number };
export type Profile = { name: string; bio: string; favorites: string[] };

const EVT = "elo-storage";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Estado persistido no localStorage, sincronizado entre componentes. */
export function useLocal<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setValue(read(key, fallback));
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback(
    (update: (prev: T) => T) => {
      const next = update(read(key, fallback));
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        alert("Não foi possível salvar no navegador.");
      }
      window.dispatchEvent(new Event(EVT));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
  return [value, set, ready] as const;
}

export const uid = () => `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

export const useLibrary = () => useLocal<LibraryItem[]>("elo.library", []);
export const useReviews = () => useLocal<Review[]>("elo.reviews", []);
export const usePosts = () => useLocal<Post[]>("elo.posts", []);
export const useProfile = () => useLocal<Profile>("elo.profile", { name: "", bio: "", favorites: [] });

export type Game = { id: string; title: string; genre: string; year: number; score: number; synopsis: string };

export const GAMES: Game[] = [
  { id: "hollow-knight", title: "Hollow Knight", genre: "Metroidvania", year: 2017, score: 4.6, synopsis: "Um cavaleiro silencioso desce às ruínas de Hallownest, um reino de insetos tomado por uma praga misteriosa." },
  { id: "celeste", title: "Celeste", genre: "Plataforma", year: 2018, score: 4.7, synopsis: "Madeline escala a montanha Celeste enquanto enfrenta a própria ansiedade, em fases de precisão desafiadoras." },
  { id: "hades", title: "Hades", genre: "Roguelike", year: 2020, score: 4.8, synopsis: "Zagreu, filho de Hades, tenta fugir do submundo com a ajuda dos deuses do Olimpo, uma tentativa de cada vez." },
  { id: "the-witcher-3", title: "The Witcher 3", genre: "RPG", year: 2015, score: 4.7, synopsis: "Geralt de Rívia busca Ciri, sua filha adotiva, em um continente devastado pela guerra e por monstros." },
  { id: "zelda-botw", title: "Zelda: Breath of the Wild", genre: "Aventura", year: 2017, score: 4.8, synopsis: "Link desperta após cem anos e explora livremente Hyrule para derrotar a Calamidade Ganon." },
  { id: "stardew-valley", title: "Stardew Valley", genre: "Simulação", year: 2016, score: 4.6, synopsis: "Você herda a fazenda do avô e reconstrói a vida numa pequena vila, entre plantações, pesca e amizades." },
  { id: "disco-elysium", title: "Disco Elysium", genre: "RPG", year: 2019, score: 4.7, synopsis: "Um detetive amnésico investiga um assassinato enquanto discute com as vozes da própria mente." },
  { id: "portal-2", title: "Portal 2", genre: "Puzzle", year: 2011, score: 4.8, synopsis: "Chell volta aos laboratórios da Aperture Science para resolver testes com a arma de portais e a sarcástica GLaDOS." },
  { id: "outer-wilds", title: "Outer Wilds", genre: "Aventura", year: 2019, score: 4.7, synopsis: "Preso em um ciclo de 22 minutos, um astronauta explora um sistema solar para entender por que o sol explode." },
  { id: "elden-ring", title: "Elden Ring", genre: "RPG", year: 2022, score: 4.7, synopsis: "Um Maculado atravessa as Terras Intermédias em busca dos fragmentos do Anel Prístino." },
  { id: "street-fighter-6", title: "Street Fighter 6", genre: "Luta", year: 2023, score: 4.4, synopsis: "A clássica série de luta retorna com novos personagens, modo história em mundo aberto e controles modernos." },
  { id: "forza-horizon-5", title: "Forza Horizon 5", genre: "Corrida", year: 2021, score: 4.5, synopsis: "Um festival de corridas em mundo aberto pelas paisagens variadas do México." },
];

export const GENRES = Array.from(new Set(GAMES.map((g) => g.genre))).sort();
export const getGame = (id: string) => GAMES.find((g) => g.id === id);
export const coverClass = (id: string) => `cover-${GAMES.findIndex((g) => g.id === id) % 6}`;

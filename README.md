# Elo Game Discovery Club

Crie do zero um site chamado Elo, uma plataforma de descoberta e acompanhamento de jogos eletrônicos, com avaliações, biblioteca pessoal, comunidade gamer e uma interface demonstrativa de assistente de IA.

IMPORTANTE: este projeto deve ser simples, econômico em créditos e funcional desde a primeira geração. Não crie uma arquitetura complexa. Não configure Lovable Cloud, Supabase, autenticação, banco de dados externo, APIs, funções de backend ou serviços pagos. Não solicite cartão de crédito nem habilite cobranças.

Construa a aplicação diretamente com os recursos disponíveis no projeto, usando componentes reutilizáveis e armazenamento local do navegador ("localStorage") para persistir as interações.

IDENTIDADE VISUAL

Nome: Elo.

Slogan: “Não é só sobre zerar. É sobre tudo o que acontece no caminho.”

Personalidade jovem, independente, expressiva e irreverente.

Use uma estética editorial de cultura gamer, com referências visuais de revistas independentes e plataformas modernas de descoberta de jogos.

Paleta:

- Fundo grafite: #17191D.
- Superfícies: #22252A.
- Verde-lima: #C8FF45.
- Creme: #F2F0E8.
- Texto claro: #F5F5F0.
- Texto secundário: #969A9F.

Use títulos expressivos, capas de jogos, boa hierarquia visual, espaçamento consistente e cards bem organizados. Evite o estilo genérico de site gamer com excesso de neon, gradientes roxos e efeitos futuristas.

O logotipo será “elo.” em letras minúsculas, com um símbolo geométrico simples.

PÁGINAS

Implemente estas áreas em uma única aplicação:

1. Início.
2. Explorar jogos.
3. Minha biblioteca.
4. Diário e avaliações.
5. Comunidade.
6. Elo Guide.
7. Meu perfil.

Use navegação lateral no desktop e barra inferior no celular. Todas as páginas devem estar acessíveis e os links devem funcionar.

INÍCIO

Crie uma home visualmente marcante, com:

- Apresentação da marca Elo.
- Jogos em destaque.
- Seção de descobertas.
- Avaliações recentes de demonstração.
- Discussões populares.
- Chamada para conhecer o Elo Guide.

EXPLORAR JOGOS

Crie um catálogo com aproximadamente 12 jogos conhecidos de gêneros diferentes, usando dados locais.

Inclua título, gênero, ano e capa quando disponível. Permita buscar por nome e filtrar por gênero.

Cada jogo deve abrir uma página ou painel de detalhes com sinopse curta, gênero, ano, nota demonstrativa e botão para adicionar à biblioteca.

Se uma imagem não estiver disponível, use um espaço reservado visualmente consistente. Não dependa de APIs externas para carregar o site.

MINHA BIBLIOTECA

Permita adicionar e remover jogos e alterar seu status:

- Quero jogar.
- Jogando.
- Finalizado.

Salve as alterações com "localStorage", para que continuem disponíveis quando o usuário atualizar ou reabrir a página no mesmo navegador.

Inclua filtros por status e um estado vazio bem desenhado.

DIÁRIO E AVALIAÇÕES

Permita criar uma avaliação com:

- Jogo.
- Nota de 0,5 a 5 estrelas.
- Texto da análise.

Mostre as avaliações em cards com o nome do jogo, nota e texto. Permita excluir as próprias avaliações.

Salve as avaliações no armazenamento local do navegador.

COMUNIDADE

Crie um mural de publicações sobre jogos, com exemplos claramente identificados como demonstração.

Permita criar uma publicação com título e texto, visualizar publicações e excluir as próprias publicações. Inclua categorias visuais, como Discussão, Recomendação e Dúvida.

Salve as publicações criadas localmente. Não simule usuários reais nem sincronização entre dispositivos.

ELO GUIDE

Crie uma interface visual de assistente para ajudar jogadores com missões, histórias, personagens, escolhas e puzzles.

Inclua:

- Seleção de jogo.
- Campo para escrever uma pergunta.
- Sugestões de perguntas.
- Preferência de spoilers: sem spoilers, spoilers leves e spoilers completos.
- Área de conversa.

Nesta versão, deixe claro que o assistente é uma demonstração e não está conectado a uma IA real. Não finja gerar respostas por IA. Apresente uma mensagem explicando que a integração inteligente será adicionada futuramente.

MEU PERFIL

Crie um perfil local simples com nome editável, biografia curta, jogos favoritos e estatísticas calculadas a partir da biblioteca e das avaliações locais.

Não exija cadastro ou login.

REQUISITOS TÉCNICOS

- Use a estrutura e as ferramentas padrão do projeto.
- Evite dependências desnecessárias.
- Não crie serviços externos.
- Não implemente autenticação.
- Não crie páginas vazias ou links quebrados.
- Não use dados fictícios como se fossem informações reais do usuário.
- Não dependa de imagens remotas para a estrutura principal funcionar.
- Não crie funcionalidades que só aparentam funcionar.
- Trate os estados vazios e erros básicos.
- Garanta que a aplicação seja responsiva, principalmente em celulares.
- Mantenha o código simples e organizado.

PRIORIDADE ABSOLUTA

Entregue primeiro uma aplicação navegável, visualmente consistente e funcional. Prefira uma implementação simples que funcione a uma arquitetura ambiciosa que fique incompleta.

Não acrescente recursos além dos descritos. Não faça perguntas sobre detalhes estéticos menores. Não inicie integrações externas. Construa as páginas diretamente e verifique se os principais botões e formulários funcionam.

O resultado deve ser um site que eu possa apresentar como projeto acadêmico, demonstrando a proposta da marca Elo e seus principais fluxos de uso.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://elo-game-discovery-club.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1e3e00ec-e390-4ff1-92c9-7bd5ee2e41a9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

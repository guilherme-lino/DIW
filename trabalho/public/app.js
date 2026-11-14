/* =====================================================
   app.js — dados (JSON) + lógica das duas páginas
   Usado por index.html e detalhes.html
   ===================================================== */

const SPRITES = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

/* ===== ESTRUTURA JSON =====
   pokemons: entidade principal
   fotos:    entidade secundária (ligada ao pokémon por pokemonId) */
const dados = {
  "pokemons": [
    {
      "id": 1,
      "nome": "Bulbasaur",
      "descricao": "Carrega uma semente nas costas desde o nascimento, que cresce junto com ele.",
      "conteudo": "Bulbasaur absorve luz solar para alimentar a semente em suas costas. Nos primeiros dias de vida, ele vive dos nutrientes guardados nela. É um dos três iniciais de Kanto e uma ótima escolha para quem está começando a jornada.",
      "tipo": ["grama", "veneno"],
      "categoria": "Semente",
      "peso": 6.9,
      "altura": 0.7,
      "habilidade": "Overgrow",
      "stats": { "hp": 45, "ataque": 49, "defesa": 49, "velocidade": 45 },
      "destaque": false,
      "imagemPrincipal": "images/1.png"
    },
    {
      "id": 3,
      "nome": "Venusaur",
      "descricao": "A flor em suas costas libera um perfume que acalma quem está por perto.",
      "conteudo": "Venusaur é a evolução final de Bulbasaur. Sua flor enorme captura energia solar e a converte em força. Depois de chuvas, a flor fica ainda mais vistosa e o aroma se espalha por longas distâncias.",
      "tipo": ["grama", "veneno"],
      "categoria": "Semente",
      "peso": 100.0,
      "altura": 2.0,
      "habilidade": "Overgrow",
      "stats": { "hp": 80, "ataque": 82, "defesa": 83, "velocidade": 80 },
      "destaque": false,
      "imagemPrincipal": "images/3.png"
    },
    {
      "id": 4,
      "nome": "Charmander",
      "descricao": "A chama na ponta do rabo indica seu humor e vitalidade.",
      "conteudo": "Charmander prefere lugares quentes. Dizem que, quando chove, sai vapor da ponta de seu rabo. Se a chama se apagar, ele corre perigo, por isso treinadores experientes cuidam muito bem dela.",
      "tipo": ["fogo"],
      "categoria": "Lagarto",
      "peso": 8.5,
      "altura": 0.6,
      "habilidade": "Blaze",
      "stats": { "hp": 39, "ataque": 52, "defesa": 43, "velocidade": 65 },
      "destaque": false,
      "imagemPrincipal": "images/4.png"
    },
    {
      "id": 6,
      "nome": "Charizard",
      "descricao": "Voa em busca de adversários fortes e cospe fogo capaz de derreter qualquer coisa.",
      "conteudo": "Charizard é a evolução final de Charmander. Suas asas permitem voar a grandes altitudes e sua chama fica mais quente depois de duras batalhas. Ele só enfrenta oponentes à altura de sua força.",
      "tipo": ["fogo", "voador"],
      "categoria": "Chama",
      "peso": 90.5,
      "altura": 1.7,
      "habilidade": "Blaze",
      "stats": { "hp": 78, "ataque": 84, "defesa": 78, "velocidade": 100 },
      "destaque": true,
      "imagemPrincipal": "images/6.png"
    },
    {
      "id": 7,
      "nome": "Squirtle",
      "descricao": "Se retrai na concha ao se sentir ameaçado e ataca com jatos d'água certeiros.",
      "conteudo": "Depois de nascer, o casco de Squirtle endurece e fica elástico. Seus jatos d'água são precisos e fortes o bastante para acertar alvos a longa distância.",
      "tipo": ["agua"],
      "categoria": "Tartaruguinha",
      "peso": 9.0,
      "altura": 0.5,
      "habilidade": "Torrent",
      "stats": { "hp": 44, "ataque": 48, "defesa": 65, "velocidade": 43 },
      "destaque": false,
      "imagemPrincipal": "images/7.png"
    },
    {
      "id": 9,
      "nome": "Blastoise",
      "descricao": "Os canhões em seu casco disparam jatos d'água com força suficiente para atravessar aço.",
      "conteudo": "Blastoise é a evolução final de Squirtle. Ele esmaga os oponentes com o peso do corpo e dispara água pelos canhões do casco com pontaria impressionante.",
      "tipo": ["agua"],
      "categoria": "Marisco",
      "peso": 85.5,
      "altura": 1.6,
      "habilidade": "Torrent",
      "stats": { "hp": 79, "ataque": 83, "defesa": 100, "velocidade": 78 },
      "destaque": false,
      "imagemPrincipal": "images/9.png"
    },
    {
      "id": 25,
      "nome": "Pikachu",
      "descricao": "Armazena eletricidade nas bochechas e a libera em descargas poderosas.",
      "conteudo": "Pikachu costuma ser visto em grupos. Quando vários se juntam, a eletricidade acumulada pode provocar tempestades. É o Pokémon mais famoso do mundo e companheiro inseparável de muitos treinadores.",
      "tipo": ["eletrico"],
      "categoria": "Rato",
      "peso": 6.0,
      "altura": 0.4,
      "habilidade": "Static",
      "stats": { "hp": 35, "ataque": 55, "defesa": 40, "velocidade": 90 },
      "destaque": true,
      "imagemPrincipal": "images/25.png"
    },
    {
      "id": 94,
      "nome": "Gengar",
      "descricao": "Esconde-se nas sombras e pode baixar a temperatura do ambiente em alguns graus.",
      "conteudo": "Gengar gosta de se esconder nas sombras de quem está sozinho à noite. Se você sentir um calafrio repentino, pode ser que ele esteja por perto. Apesar da fama, é brincalhão.",
      "tipo": ["fantasma", "veneno"],
      "categoria": "Sombra",
      "peso": 40.5,
      "altura": 1.5,
      "habilidade": "Levitate",
      "stats": { "hp": 60, "ataque": 65, "defesa": 60, "velocidade": 110 },
      "destaque": true,
      "imagemPrincipal": "images/94.png"
    },
    {
      "id": 133,
      "nome": "Eevee",
      "descricao": "Seu corpo instável pode se adaptar a diferentes ambientes e evoluir de várias formas.",
      "conteudo": "Eevee tem uma composição genética rara, que permite mudanças repentinas quando exposto a certos elementos. Por isso, pode evoluir para formas diferentes e se adapta bem a qualquer clima.",
      "tipo": ["normal"],
      "categoria": "Evolução",
      "peso": 6.5,
      "altura": 0.3,
      "habilidade": "Run Away",
      "stats": { "hp": 55, "ataque": 55, "defesa": 50, "velocidade": 55 },
      "destaque": false,
      "imagemPrincipal": "images/133.png"
    },
    {
      "id": 143,
      "nome": "Snorlax",
      "descricao": "Come toneladas de comida por dia e só fica satisfeito depois de dormir.",
      "conteudo": "Snorlax só se levanta para comer. Depois de uma refeição enorme, volta a dormir. Seu estômago aguenta até comida estragada, e sua barriga é tão macia que crianças brincam sobre ela.",
      "tipo": ["normal"],
      "categoria": "Sonolento",
      "peso": 460.0,
      "altura": 2.1,
      "habilidade": "Immunity",
      "stats": { "hp": 160, "ataque": 110, "defesa": 65, "velocidade": 30 },
      "destaque": true,
      "imagemPrincipal": "images/143.png"
    },
    {
      "id": 150,
      "nome": "Mewtwo",
      "descricao": "Criado por engenharia genética, tem um dos maiores poderes psíquicos que se conhece.",
      "conteudo": "Mewtwo foi criado a partir do DNA de Mew depois de anos de experimentos. O resultado é um Pokémon com poder psíquico enorme, mas com um coração feroz, que nunca foi domado.",
      "tipo": ["psiquico"],
      "categoria": "Genético",
      "peso": 122.0,
      "altura": 2.0,
      "habilidade": "Pressure",
      "stats": { "hp": 106, "ataque": 110, "defesa": 90, "velocidade": 130 },
      "destaque": true,
      "imagemPrincipal": "images/150.png"
    },
    {
      "id": 151,
      "nome": "Mew",
      "descricao": "Dizem que carrega o código genético de todos os Pokémon e quase nunca é visto.",
      "conteudo": "Mew é tão raro que muitos especialistas duvidam de sua existência. Ele pode ficar invisível e voar sem ser notado, e só aparece para quem tem o coração puro.",
      "tipo": ["psiquico"],
      "categoria": "Novo Espécime",
      "peso": 4.0,
      "altura": 0.4,
      "habilidade": "Synchronize",
      "stats": { "hp": 100, "ataque": 100, "defesa": 100, "velocidade": 100 },
      "destaque": false,
      "imagemPrincipal": "images/151.png"
    }
  ],

  "fotos": [
    { "id": 1,  "pokemonId": 1,   "titulo": "Arte oficial",     "imagem": "images/1.png" },
    { "id": 2,  "pokemonId": 1,   "titulo": "Sprite de frente", "imagem": `${SPRITES}/1.png` },
    { "id": 3,  "pokemonId": 1,   "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/1.png` },
    { "id": 4,  "pokemonId": 1,   "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/1.png` },

    { "id": 5,  "pokemonId": 3,   "titulo": "Arte oficial",     "imagem": "images/3.png" },
    { "id": 6,  "pokemonId": 3,   "titulo": "Sprite de frente", "imagem": `${SPRITES}/3.png` },
    { "id": 7,  "pokemonId": 3,   "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/3.png` },
    { "id": 8,  "pokemonId": 3,   "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/3.png` },

    { "id": 9,  "pokemonId": 4,   "titulo": "Arte oficial",     "imagem": "images/4.png" },
    { "id": 10, "pokemonId": 4,   "titulo": "Sprite de frente", "imagem": `${SPRITES}/4.png` },
    { "id": 11, "pokemonId": 4,   "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/4.png` },
    { "id": 12, "pokemonId": 4,   "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/4.png` },

    { "id": 13, "pokemonId": 6,   "titulo": "Arte oficial",     "imagem": "images/6.png" },
    { "id": 14, "pokemonId": 6,   "titulo": "Sprite de frente", "imagem": `${SPRITES}/6.png` },
    { "id": 15, "pokemonId": 6,   "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/6.png` },
    { "id": 16, "pokemonId": 6,   "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/6.png` },

    { "id": 17, "pokemonId": 7,   "titulo": "Arte oficial",     "imagem": "images/7.png" },
    { "id": 18, "pokemonId": 7,   "titulo": "Sprite de frente", "imagem": `${SPRITES}/7.png` },
    { "id": 19, "pokemonId": 7,   "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/7.png` },
    { "id": 20, "pokemonId": 7,   "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/7.png` },

    { "id": 21, "pokemonId": 9,   "titulo": "Arte oficial",     "imagem": "images/9.png" },
    { "id": 22, "pokemonId": 9,   "titulo": "Sprite de frente", "imagem": `${SPRITES}/9.png` },
    { "id": 23, "pokemonId": 9,   "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/9.png` },
    { "id": 24, "pokemonId": 9,   "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/9.png` },

    { "id": 25, "pokemonId": 25,  "titulo": "Arte oficial",     "imagem": "images/25.png" },
    { "id": 26, "pokemonId": 25,  "titulo": "Sprite de frente", "imagem": `${SPRITES}/25.png` },
    { "id": 27, "pokemonId": 25,  "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/25.png` },
    { "id": 28, "pokemonId": 25,  "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/25.png` },

    { "id": 29, "pokemonId": 94,  "titulo": "Arte oficial",     "imagem": "images/94.png" },
    { "id": 30, "pokemonId": 94,  "titulo": "Sprite de frente", "imagem": `${SPRITES}/94.png` },
    { "id": 31, "pokemonId": 94,  "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/94.png` },
    { "id": 32, "pokemonId": 94,  "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/94.png` },

    { "id": 33, "pokemonId": 133, "titulo": "Arte oficial",     "imagem": "images/133.png" },
    { "id": 34, "pokemonId": 133, "titulo": "Sprite de frente", "imagem": `${SPRITES}/133.png` },
    { "id": 35, "pokemonId": 133, "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/133.png` },
    { "id": 36, "pokemonId": 133, "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/133.png` },

    { "id": 37, "pokemonId": 143, "titulo": "Arte oficial",     "imagem": "images/143.png" },
    { "id": 38, "pokemonId": 143, "titulo": "Sprite de frente", "imagem": `${SPRITES}/143.png` },
    { "id": 39, "pokemonId": 143, "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/143.png` },
    { "id": 40, "pokemonId": 143, "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/143.png` },

    { "id": 41, "pokemonId": 150, "titulo": "Arte oficial",     "imagem": "images/150.png" },
    { "id": 42, "pokemonId": 150, "titulo": "Sprite de frente", "imagem": `${SPRITES}/150.png` },
    { "id": 43, "pokemonId": 150, "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/150.png` },
    { "id": 44, "pokemonId": 150, "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/150.png` },

    { "id": 45, "pokemonId": 151, "titulo": "Arte oficial",     "imagem": "images/151.png" },
    { "id": 46, "pokemonId": 151, "titulo": "Sprite de frente", "imagem": `${SPRITES}/151.png` },
    { "id": 47, "pokemonId": 151, "titulo": "Sprite de costas", "imagem": `${SPRITES}/back/151.png` },
    { "id": 48, "pokemonId": 151, "titulo": "Versão shiny",     "imagem": `${SPRITES}/shiny/151.png` }
  ]
};

/* =====================================================
   FUNÇÕES AUXILIARES
   ===================================================== */

const TIPOS = {
  grama: "Grama",
  fogo: "Fogo",
  agua: "Água",
  eletrico: "Elétrico",
  fantasma: "Fantasma",
  psiquico: "Psíquico",
  normal: "Normal",
  veneno: "Veneno",
  voador: "Voador"
};

const STATS = [
  { chave: "hp", rotulo: "HP" },
  { chave: "ataque", rotulo: "Ataque" },
  { chave: "defesa", rotulo: "Defesa" },
  { chave: "velocidade", rotulo: "Velocidade" }
];

const STAT_MAXIMO = 160; // maior valor base possível entre os dados (Snorlax: 160 HP)

const numero = id => String(id).padStart(3, "0");
const decimal = n => n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const semAcento = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const arteOficial = id => `${SPRITES}/other/official-artwork/${id}.png`;

/* Monta uma <img>. Se o arquivo local não existir, usa a arte oficial da PokéAPI. */
function imagem(src, alt, classe, fallbackId) {
  const pixel = src.startsWith("images/") ? "" : " pixel";
  const erro = fallbackId
    ? ` onerror="this.onerror=null;this.src='${arteOficial(fallbackId)}';this.classList.remove('pixel')"`
    : "";
  return `<img src="${src}" alt="${alt}" class="${classe}${pixel}"${erro}>`;
}

function badgesTipo(pokemon) {
  return pokemon.tipo.map(t => `<span class="tipo tipo-${t}">${TIPOS[t]}</span>`).join("");
}

function linkDetalhes(pokemon) {
  return `detalhes.html?id=${pokemon.id}`;
}

/* =====================================================
   HOME (index.html)
   ===================================================== */

function renderCarrossel() {
  const destaques = dados.pokemons.filter(p => p.destaque);
  const indicadores = document.getElementById("destaques-indicadores");
  const slides = document.getElementById("destaques-slides");

  indicadores.innerHTML = destaques.map((p, i) => `
    <button type="button" data-bs-target="#carrosselDestaques" data-bs-slide-to="${i}"
            class="${i === 0 ? "active" : ""}" ${i === 0 ? 'aria-current="true"' : ""}
            aria-label="Destaque ${i + 1}: ${p.nome}"></button>
  `).join("");

  slides.innerHTML = destaques.map((p, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <div class="container">
        <div class="row align-items-center g-4">

          <div class="col-md-5 text-center">
            <a href="${linkDetalhes(p)}" class="destaque-imagem d-inline-flex justify-content-center p-4">
              ${imagem(p.imagemPrincipal, p.nome, "img-fluid", p.id)}
            </a>
          </div>

          <div class="col-md-7">
            <div class="tipos-linha">${badgesTipo(p)}</div>
            <h3 class="slide-nome"><a href="${linkDetalhes(p)}">${p.nome}</a></h3>
            <p class="slide-texto">${p.descricao}</p>
            <a href="${linkDetalhes(p)}" class="botao botao-pequeno">Ver detalhes</a>
          </div>

        </div>
      </div>
    </div>
  `).join("");
}

function criarCard(p) {
  return `
    <div class="col">
      <article class="card card-${p.tipo[0]} h-100 p-4 position-relative">
        <span class="numero">Nº ${numero(p.id)}</span>
        <div class="tipos">${badgesTipo(p)}</div>

        <a href="${linkDetalhes(p)}" aria-label="Ver detalhes de ${p.nome}">
          ${imagem(p.imagemPrincipal, p.nome, "img-fluid card-imagem", p.id)}
        </a>

        <h3><a href="${linkDetalhes(p)}">${p.nome}</a></h3>
        <p>${p.descricao}</p>

        <div class="card-info d-flex gap-3">
          <div><strong>${p.categoria}</strong>Categoria</div>
          <div><strong>${decimal(p.peso)} kg</strong>Peso</div>
          <div><strong>${decimal(p.altura)} m</strong>Altura</div>
        </div>

        <a href="${linkDetalhes(p)}" class="botao botao-pequeno botao-primario mt-3 text-center">Ver detalhes</a>
      </article>
    </div>
  `;
}

function renderCards(lista) {
  const container = document.getElementById("lista-pokemons");
  const vazio = document.getElementById("sem-resultados");
  const contagem = document.getElementById("contagem");

  container.innerHTML = lista.map(criarCard).join("");
  vazio.classList.toggle("d-none", lista.length > 0);
  contagem.textContent = lista.length === 1 ? "1 Pokémon encontrado" : `${lista.length} Pokémon encontrados`;
}

function iniciarBusca() {
  const form = document.getElementById("form-busca");
  const campoNome = document.getElementById("nome-pokemon");
  const campoTipo = document.getElementById("tipo-pokemon");

  // opções do select geradas a partir dos tipos que existem no JSON
  const tiposUsados = [...new Set(dados.pokemons.flatMap(p => p.tipo))];
  campoTipo.innerHTML += tiposUsados
    .map(t => `<option value="${t}">${TIPOS[t]}</option>`)
    .join("");

  function filtrar() {
    const nome = semAcento(campoNome.value.trim());
    const tipo = campoTipo.value;

    const resultado = dados.pokemons.filter(p =>
      semAcento(p.nome).includes(nome) && (tipo === "" || p.tipo.includes(tipo))
    );
    renderCards(resultado);
  }

  form.addEventListener("submit", e => { e.preventDefault(); filtrar(); });
  campoNome.addEventListener("input", filtrar);
  campoTipo.addEventListener("change", filtrar);
  document.getElementById("limpar-busca").addEventListener("click", () => {
    form.reset();
    filtrar();
  });
}

function iniciarHome() {
  renderCarrossel();
  renderCards(dados.pokemons);
  iniciarBusca();
}

/* =====================================================
   DETALHES (detalhes.html?id=N)
   ===================================================== */

function renderDetalhe(p) {
  document.title = `${p.nome} | Catálogo Pokémon`;
  document.getElementById("detalhe").classList.add(`card-${p.tipo[0]}`);

  const barras = STATS.map(s => {
    const valor = p.stats[s.chave];
    const largura = Math.round((valor / STAT_MAXIMO) * 100);
    return `
      <div class="stat-linha d-flex align-items-center gap-3">
        <span class="stat-nome">${s.rotulo}</span>
        <div class="stat-fundo flex-grow-1"><div class="stat-preenchida" style="width: ${largura}%;"></div></div>
        <span class="stat-valor">${valor}</span>
      </div>`;
  }).join("");

  document.getElementById("detalhe-conteudo").innerHTML = `
    <div class="col-lg-5 text-center">
      <div class="detalhe-imagem d-inline-flex justify-content-center p-4">
        ${imagem(p.imagemPrincipal, p.nome, "img-fluid", p.id)}
      </div>
    </div>

    <div class="col-lg-7">
      <span class="numero-grande">Nº ${numero(p.id)}</span>
      <h1 class="detalhe-nome">${p.nome}</h1>
      <div class="tipos-linha">${badgesTipo(p)}</div>

      <p class="detalhe-resumo">${p.descricao}</p>
      <p class="detalhe-texto">${p.conteudo}</p>

      <div class="row row-cols-2 row-cols-md-4 g-3 my-3">
        <div class="col"><div class="info-caixa"><span>Categoria</span><strong>${p.categoria}</strong></div></div>
        <div class="col"><div class="info-caixa"><span>Peso</span><strong>${decimal(p.peso)} kg</strong></div></div>
        <div class="col"><div class="info-caixa"><span>Altura</span><strong>${decimal(p.altura)} m</strong></div></div>
        <div class="col"><div class="info-caixa"><span>Habilidade</span><strong>${p.habilidade}</strong></div></div>
      </div>

      <h2 class="stats-titulo">Atributos base</h2>
      <div class="stats">${barras}</div>
    </div>
  `;
}

function renderFotos(p) {
  const fotos = dados.fotos.filter(f => f.pokemonId === p.id);

  document.getElementById("fotos-titulo").textContent = `Fotos de ${p.nome}`;
  document.getElementById("fotos-lista").innerHTML = fotos.map(f => `
    <div class="col">
      <article class="card foto-card h-100 p-3 text-center">
        ${imagem(f.imagem, `${f.titulo} de ${p.nome}`, "img-fluid foto-imagem", f.imagem.startsWith("images/") ? p.id : null)}
        <h3>${f.titulo}</h3>
      </article>
    </div>
  `).join("");
}

function iniciarDetalhes() {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const pokemon = dados.pokemons.find(p => p.id === id);

  if (!pokemon) {
    document.title = "Pokémon não encontrado | Catálogo Pokémon";
    document.getElementById("detalhe-conteudo").innerHTML = `
      <div class="col-12 text-center py-5">
        <h1 class="detalhe-nome">Pokémon não encontrado</h1>
        <p class="detalhe-texto">O endereço não tem um ID válido. Volte para a Pokédex e escolha um Pokémon da lista.</p>
        <a href="index.html#pokedex" class="botao botao-primario">Voltar para a Pokédex</a>
      </div>`;
    document.getElementById("fotos").classList.add("d-none");
    return;
  }

  renderDetalhe(pokemon);
  renderFotos(pokemon);
}

/* =====================================================
   INICIALIZAÇÃO: cada página só roda o que lhe pertence
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lista-pokemons")) iniciarHome();
  if (document.getElementById("detalhe-conteudo")) iniciarDetalhes();
});

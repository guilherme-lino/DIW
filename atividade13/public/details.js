/* =====================================================
   details.js — Página de detalhes (details.html?id=N)
   ===================================================== */

const STATS = [
  { chave: "hp", rotulo: "HP" },
  { chave: "ataque", rotulo: "Ataque" },
  { chave: "defesa", rotulo: "Defesa" },
  { chave: "velocidade", rotulo: "Velocidade" }
];
const STAT_MAXIMO = 160;

/* mensagem clara no lugar do conteúdo (sem id, item inexistente ou servidor fora do ar) */
function mostrarMensagem(titulo, texto) {
  document.title = `${titulo} | Catálogo Pokémon`;
  document.getElementById("detalhe-conteudo").innerHTML = `
    <div class="col-12 text-center py-5">
      <h1 class="detalhe-nome">${titulo}</h1>
      <p class="detalhe-texto">${texto}</p>
      <a href="index.html#pokedex" class="botao botao-primario">Voltar para a Pokédex</a>
    </div>`;
  document.getElementById("fotos").classList.add("d-none");
}

/* GET http://localhost:3000/pokemons/<id> */
async function fetchItem(id) {
  const resposta = await fetch(`${API_URL}/${COLECAO}/${encodeURIComponent(id)}`);
  if (resposta.status === 404) return null; // item não existe
  if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
  return resposta.json();
}

function renderBarras(stats) {
  if (!stats) return "";
  const barras = STATS.filter(s => stats[s.chave] !== undefined).map(s => {
    const valor = stats[s.chave];
    const largura = Math.min(100, Math.round((valor / STAT_MAXIMO) * 100));
    return `
      <div class="stat-linha d-flex align-items-center gap-3">
        <span class="stat-nome">${s.rotulo}</span>
        <div class="stat-fundo flex-grow-1"><div class="stat-preenchida" style="width: ${largura}%;"></div></div>
        <span class="stat-valor">${valor}</span>
      </div>`;
  }).join("");
  return barras ? `<h3 class="stats-titulo">Atributos base</h3>${barras}` : "";
}

function renderDetalhe(item) {
  document.title = `${item.nome} | Catálogo Pokémon`;
  document.getElementById("detalhe").classList.add(`card-${tiposDoItem(item)[0]}`);

  const tags = (item.tags || []).map(t => `<span class="chip">${escapar(t)}</span>`).join(" ");
  const habilidade = item.habilidade ? `
    <div class="col"><div class="info-caixa"><span>Habilidade</span><strong>${escapar(item.habilidade)}</strong></div></div>` : "";

  document.getElementById("detalhe-conteudo").innerHTML = `
    <!-- Caixa 1: imagem, nome e categoria -->
    <div class="col-12">
      <div class="caixa text-center p-4">
        <div class="detalhe-imagem d-inline-flex justify-content-center p-3">
          ${imagemTag(item, "img-fluid")}
        </div>
        <span class="numero-grande d-block mt-3">Nº ${numero(item.id)}</span>
        <h1 class="detalhe-nome">${escapar(item.nome)}</h1>
        <div class="tipos-linha justify-content-center">${badgesTipo(item)}</div>
        <p class="detalhe-resumo mb-0">${escapar(item.descricaoCurta)}</p>
      </div>
    </div>

    <!-- Caixa 2: outras informações -->
    <div class="col-12">
      <div class="caixa p-4">
        <h2 class="caixa-titulo">Outras informações</h2>
        <p class="detalhe-texto">${escapar(item.descricaoCompleta)}</p>

        <div class="row row-cols-2 row-cols-md-4 g-3 my-3">
          <div class="col"><div class="info-caixa"><span>Categoria</span><strong>${escapar(item.categoria)}</strong></div></div>
          <div class="col"><div class="info-caixa"><span>Peso</span><strong>${decimal(item.peso)} kg</strong></div></div>
          <div class="col"><div class="info-caixa"><span>Altura</span><strong>${decimal(item.altura)} m</strong></div></div>
          ${habilidade}
        </div>

        ${tags ? `<h3 class="stats-titulo">Tags</h3><div class="d-flex flex-wrap gap-2 mb-3">${tags}</div>` : ""}
        ${renderBarras(item.stats)}
      </div>
    </div>`;
}

function renderFotos(item) {
  const secao = document.getElementById("fotos");
  if (!item.fotos || item.fotos.length === 0) {
    secao.classList.add("d-none"); // itens cadastrados podem não ter fotos extras
    return;
  }

  document.getElementById("fotos-titulo").textContent = `Fotos de ${item.nome}`;
  document.getElementById("fotos-lista").innerHTML = item.fotos.map(f => {
    const local = f.imagem.startsWith("images/");
    const reserva = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`;
    const erro = local ? ` onerror="this.onerror=null;this.src='${reserva}'"` : "";
    return `
      <div class="col">
        <article class="card foto-card h-100 p-3 text-center">
          <img src="${escapar(f.imagem)}" alt="${escapar(f.titulo)} de ${escapar(item.nome)}" class="img-fluid foto-imagem${local ? "" : " pixel"}"${erro}>
          <h3>${escapar(f.titulo)}</h3>
        </article>
      </div>`;
  }).join("");
}

async function init() {
  // lê o id da query string: details.html?id=1
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    mostrarMensagem("Nenhum Pokémon informado", "O endereço não tem um id. Volte para a Pokédex e escolha um Pokémon da lista.");
    return;
  }

  try {
    const item = await fetchItem(id);
    if (!item) {
      mostrarMensagem("Pokémon não encontrado", `Não existe nenhum Pokémon com o id "${escapar(id)}". Volte para a Pokédex e escolha um da lista.`);
      return;
    }
    renderDetalhe(item);
    renderFotos(item);
  } catch (e) {
    console.error(e);
    mostrarMensagem("Não foi possível carregar", "Verifique se o JSON Server está rodando em http://localhost:3000 e tente novamente.");
  }
}

document.addEventListener("DOMContentLoaded", init);
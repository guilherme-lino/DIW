/* =====================================================
   script.js — Home (index.html)
   Busca os itens no JSON Server e monta os cards
   ===================================================== */

let todosOsItens = []; // guardados para a busca filtrar sem nova requisição

/* GET http://localhost:3000/pokemons */
async function fetchItems() {
  const resposta = await fetch(`${API_URL}/${COLECAO}`);
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar os itens`);
  }
  return resposta.json();
}

/* cria e retorna o elemento do card */
function createCard(item) {
  const coluna = document.createElement("div");
  coluna.className = "col";

  const link = `details.html?id=${item.id}`;

  coluna.innerHTML = `
    <article class="card card-${tiposDoItem(item)[0]} h-100 p-4 position-relative">
      <span class="numero">Nº ${numero(item.id)}</span>
      <div class="tipos">${badgesTipo(item)}</div>

      <a href="${link}" aria-label="Ver detalhes de ${escapar(item.nome)}">
        ${imagemTag(item, "img-fluid card-imagem")}
      </a>

      <h3><a href="${link}">${escapar(item.nome)}</a></h3>
      <p>${escapar(item.descricaoCurta)}</p>

      <div class="card-info d-flex gap-3">
        <div><strong>${escapar(item.categoria)}</strong>Categoria</div>
        <div><strong>${decimal(item.peso)} kg</strong>Peso</div>
        <div><strong>${decimal(item.altura)} m</strong>Altura</div>
      </div>

      <a href="${link}" class="botao botao-pequeno botao-primario mt-3 text-center">Ver detalhes</a>
    </article>`;

  return coluna;
}

/* limpa a lista e adiciona os cards na tela */
function renderCards(items) {
  const lista = document.getElementById("lista-pokemons");
  lista.innerHTML = "";
  items.forEach(item => lista.appendChild(createCard(item)));

  document.getElementById("sem-resultados").classList.toggle("d-none", items.length > 0);
  document.getElementById("contagem").textContent =
    items.length === 1 ? "1 Pokémon encontrado" : `${items.length} Pokémon encontrados`;
}

/* ---------- busca por nome e categoria (sobre os dados já carregados) ---------- */
function configurarBusca() {
  const form = document.getElementById("form-busca");
  const campoNome = document.getElementById("nome-pokemon");
  const campoCategoria = document.getElementById("categoria-pokemon");

  const categorias = [...new Set(todosOsItens.map(item => item.categoria))].sort();
  campoCategoria.innerHTML = `<option value="">Todas as categorias</option>` +
    categorias.map(c => `<option value="${escapar(c)}">${escapar(c)}</option>`).join("");

  function filtrar() {
    const nome = semAcento(campoNome.value.trim());
    const categoria = campoCategoria.value;
    renderCards(todosOsItens.filter(item =>
      semAcento(item.nome).includes(nome) && (categoria === "" || item.categoria === categoria)
    ));
  }

  form.addEventListener("submit", e => { e.preventDefault(); filtrar(); });
  campoNome.addEventListener("input", filtrar);
  campoCategoria.addEventListener("change", filtrar);
  document.getElementById("limpar-busca").addEventListener("click", () => { form.reset(); filtrar(); });
}

/* chama fetchItems() e depois renderCards() */
async function init() {
  const erro = document.getElementById("erro-carregamento");
  try {
    todosOsItens = await fetchItems();
    renderCards(todosOsItens);
    configurarBusca();
  } catch (e) {
    console.error(e);
    erro.classList.remove("d-none");
    document.getElementById("contagem").textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", init);
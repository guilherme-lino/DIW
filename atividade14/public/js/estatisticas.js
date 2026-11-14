/* =====================================================
   estatisticas.js — Página de estatísticas (estatisticas.html)
   Busca os dados no JSON Server e monta os gráficos com Chart.js
   ===================================================== */

/* mesmas cores usadas nas etiquetas de tipo do site (styles.css) */
const CORES_TIPO = {
  grama: "#5FAE4A", fogo: "#E8622C", agua: "#4592D6", eletrico: "#FFC72C",
  fantasma: "#6B5B9A", psiquico: "#E5568A", normal: "#8A8A78",
  veneno: "#9B4A9A", voador: "#7C95D6"
};
const COR_PADRAO = "#999999";

const ATRIBUTOS = [
  { chave: "hp", rotulo: "HP", cor: "#DC0A2D" },
  { chave: "ataque", rotulo: "Ataque", cor: "#E8622C" },
  { chave: "defesa", rotulo: "Defesa", cor: "#4592D6" },
  { chave: "velocidade", rotulo: "Velocidade", cor: "#FFC72C" }
];

let itens = [];
let graficoTipos = null;
let graficoAtributos = null;

/* GET http://localhost:3000/pokemons */
async function fetchItems() {
  const resposta = await fetch(`${API_URL}/${COLECAO}`);
  if (!resposta.ok) throw new Error(`Erro ${resposta.status} ao buscar os itens`);
  return resposta.json();
}

/* ---------- resumo (cards de números) ---------- */
function renderResumo() {
  const tiposDiferentes = new Set(itens.flatMap(tiposDoItem)).size;
  const emDestaque = itens.filter(i => i.destaque).length;
  const comStats = itens.filter(i => i.stats && i.stats.ataque !== undefined);
  const maisForte = comStats.reduce((a, b) => (b.stats.ataque > (a ? a.stats.ataque : -1) ? b : a), null);

  const cartoes = [
    ["Pokémon cadastrados", itens.length],
    ["Tipos diferentes", tiposDiferentes],
    ["Em destaque", emDestaque],
    ["Maior ataque", maisForte ? `${escapar(maisForte.nome)} (${maisForte.stats.ataque})` : "—"]
  ];

  document.getElementById("resumo").innerHTML = cartoes
    .map(([rotulo, valor]) => `<div class="col"><div class="kpi"><span>${rotulo}</span><strong>${valor}</strong></div></div>`)
    .join("");
}

/* ---------- gráfico de pizza: Pokémon por tipo ---------- */
function contarPorTipo(modo) {
  const contagem = {};
  itens.forEach(item => {
    const tipos = modo === "todos" ? tiposDoItem(item) : [tiposDoItem(item)[0]];
    tipos.forEach(t => { contagem[t] = (contagem[t] || 0) + 1; });
  });
  return contagem;
}

function renderGraficoTipos(modo) {
  const contagem = contarPorTipo(modo);
  const slugs = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]);

  if (graficoTipos) graficoTipos.destroy();
  graficoTipos = new Chart(document.getElementById("grafico-tipos"), {
    type: "pie",
    data: {
      labels: slugs.map(s => ROTULOS_TIPO[s] || s),
      datasets: [{
        data: slugs.map(s => contagem[s]),
        backgroundColor: slugs.map(s => CORES_TIPO[s] || COR_PADRAO),
        borderColor: "#1A1A1A",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: ctx => {
              const total = ctx.dataset.data.reduce((soma, v) => soma + v, 0);
              const pct = Math.round((ctx.parsed / total) * 100);
              return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

/* ---------- gráfico de barras: atributos por Pokémon ---------- */
function renderGraficoAtributos(tipo) {
  const filtrados = itens.filter(i => tipo === "" || tiposDoItem(i).includes(tipo));
  const comStats = filtrados.filter(i => i.stats);
  const semStats = filtrados.length - comStats.length;

  const aviso = document.getElementById("aviso-atributos");
  aviso.classList.toggle("d-none", semStats === 0);
  aviso.textContent = semStats === 1
    ? "1 Pokémon cadastrado sem atributos não aparece neste gráfico."
    : `${semStats} Pokémon cadastrados sem atributos não aparecem neste gráfico.`;

  if (graficoAtributos) graficoAtributos.destroy();
  graficoAtributos = new Chart(document.getElementById("grafico-atributos"), {
    type: "bar",
    data: {
      labels: comStats.map(i => i.nome),
      datasets: ATRIBUTOS.map(a => ({
        label: a.rotulo,
        data: comStats.map(i => i.stats[a.chave] ?? 0),
        backgroundColor: a.cor,
        borderColor: "#1A1A1A",
        borderWidth: 1.5
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { position: "bottom" } }
    }
  });
}

/* ---------- eventos e inicialização ---------- */
function configurarControles() {
  const filtro = document.getElementById("filtro-tipo");
  const tipos = [...new Set(itens.flatMap(tiposDoItem))].sort();
  filtro.innerHTML = `<option value="">Todos os tipos</option>` +
    tipos.map(t => `<option value="${t}">${ROTULOS_TIPO[t] || t}</option>`).join("");

  document.getElementById("modo-tipo").addEventListener("change", e => renderGraficoTipos(e.target.value));
  filtro.addEventListener("change", e => renderGraficoAtributos(e.target.value));
}

async function init() {
  const erro = document.getElementById("erro-carregamento");

  if (typeof Chart === "undefined") {
    erro.textContent = "Não foi possível carregar a biblioteca Chart.js. Verifique sua conexão com a internet.";
    erro.classList.remove("d-none");
    return;
  }

  try {
    itens = await fetchItems();
    renderResumo();
    configurarControles();
    renderGraficoTipos("principal");
    renderGraficoAtributos("");
  } catch (e) {
    console.error(e);
    erro.classList.remove("d-none");
  }
}

document.addEventListener("DOMContentLoaded", init);
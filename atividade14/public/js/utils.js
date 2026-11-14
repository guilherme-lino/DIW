/* =====================================================
   utils.js — configuração e funções comuns às páginas
   (carregado antes de script.js, details.js e cadastro.js)
   ===================================================== */

const API_URL = "http://localhost:3000";
const COLECAO = "pokemons"; // coleção principal do db.json

const ROTULOS_TIPO = {
  grama: "Grama", fogo: "Fogo", agua: "Água", eletrico: "Elétrico", fantasma: "Fantasma",
  psiquico: "Psíquico", normal: "Normal", veneno: "Veneno", voador: "Voador"
};

const numero = id => String(id).padStart(3, "0");
const decimal = n => Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const semAcento = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/* tipos do item (itens cadastrados sem "tipos" caem em "normal") */
const tiposDoItem = item => (item.tipos && item.tipos.length ? item.tipos : ["normal"]);

function badgesTipo(item) {
  return tiposDoItem(item)
    .map(t => `<span class="tipo tipo-${t}">${ROTULOS_TIPO[t] || t}</span>`)
    .join("");
}

/* <img> com plano B: se o arquivo local não existir, usa a arte oficial da PokéAPI */
function imagemTag(item, classe) {
  const reserva = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`;
  return `<img src="${item.imagem}" alt="${escapar(item.nome)}" class="${classe}" onerror="this.onerror=null;this.src='${reserva}'">`;
}

/* escapa texto digitado pelo usuário (itens cadastrados) antes de usar em innerHTML */
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
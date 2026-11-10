/* =====================================================
   cadastro.js — cadastro de Pokémon (cadastro_pokemon.html)
   ===================================================== */

let categorias = [];

function mostrarMensagem(tipo, html) {
  const caixa = document.getElementById("mensagem");
  caixa.className = `col-12 alert alert-${tipo}`;
  caixa.innerHTML = html;
}

/* GET http://localhost:3000/categorias para preencher o select */
async function carregarCategorias() {
  try {
    const resposta = await fetch(`${API_URL}/categorias`);
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    categorias = await resposta.json();

    document.getElementById("categoria").innerHTML =
      `<option value="">Selecione...</option>` +
      categorias.map(c => `<option value="${c.slug}">${escapar(c.nome)}</option>`).join("");
  } catch (e) {
    console.error(e);
    mostrarMensagem("danger", "Não foi possível carregar as categorias. Verifique se o JSON Server está rodando em <strong>http://localhost:3000</strong>.");
  }
}

function montarItem() {
  const slug = document.getElementById("categoria").value;
  const categoria = categorias.find(c => c.slug === slug);

  return {
    nome: document.getElementById("nome").value.trim(),
    descricaoCurta: document.getElementById("descricaoCurta").value.trim(),
    descricaoCompleta: document.getElementById("descricaoCompleta").value.trim(),
    imagem: document.getElementById("imagem").value.trim(),
    categoria: categoria.nome,
    peso: Number(document.getElementById("peso").value),
    altura: Number(document.getElementById("altura").value),
    tags: document.getElementById("tags").value.split(",").map(t => t.trim()).filter(Boolean),
    destaque: document.getElementById("destaque").checked,
    tipos: [slug],
    habilidade: document.getElementById("habilidade").value.trim()
  };
}

/* POST http://localhost:3000/pokemons (o JSON Server gera o id) */
async function cadastrar(event) {
  event.preventDefault();
  const form = event.target;

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    mostrarMensagem("warning", "Preencha todos os campos obrigatórios (*).");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/${COLECAO}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarItem())
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

    const criado = await resposta.json();
    form.reset();
    form.classList.remove("was-validated");
    mostrarMensagem("success", `Pokémon cadastrado com sucesso! <a href="details.html?id=${criado.id}"><strong>Ver detalhes</strong></a>`);
  } catch (e) {
    console.error(e);
    mostrarMensagem("danger", "Não foi possível cadastrar. Verifique se o JSON Server está rodando e tente novamente.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarCategorias();
  document.getElementById("form-cadastro").addEventListener("submit", cadastrar);
});
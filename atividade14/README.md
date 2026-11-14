# Catálogo Pokémon - Atividade 14: Apresentação dinâmica de dados
 
- Nome: Guilherme Lino de Castro Souza
- Matrícula: 912360
- Projeto: Catálogo Pokémon
O catálogo busca os dados em um **JSON Server** (`db/db.json`) usando a Fetch API, em vez de manter os dados dentro do JavaScript. A Home lista os Pokémon, a página de detalhes abre por `details.html?id=N`, e há uma página de cadastro.
 
## Como executar
 
```bash
npm install
npm start
```
 
O primeiro comando instala as dependências do projeto (só é preciso na primeira vez). O segundo sobe o JSON Server, que usa o `db/db.json` como base de dados e serve o site da pasta `public`.
 
Depois abra **http://localhost:3000** no navegador. A API fica em `http://localhost:3000/pokemons`.
 
## Estrutura de arquivos
 
| Caminho | Função |
|---|---|
| `db/db.json` | Back end: dados da aplicação |
| `public/index.html` + `script.js` | Home: busca e exibe os cards |
| `public/details.html` + `details.js` | Detalhes: lê o `id` com `URLSearchParams` e busca `/pokemons/<id>` |
| `public/cadastro_pokemon.html` + `cadastro.js` | Formulário de cadastro (`POST /pokemons`) |
| `public/estatisticas.html` + `estatisticas.js` | Estatísticas: gráficos com Chart.js a partir dos dados do JSON Server |
| `public/utils.js` | Configuração (`API_URL`) e funções comuns |
| `public/styles.css` | Estilos |
| `public/images/` | Imagens dos Pokémon (`ID.png`) |
 
## Estrutura do db.json
 
| Coleção | O que guarda |
|---|---|
| `pokemons` | Coleção principal: 12 Pokémon de Kanto, mostrados nos cards e nos detalhes |
| `categorias` | 7 categorias possíveis (Grama, Fogo, Água, Elétrico, Fantasma, Psíquico, Normal) |
| `comentarios` | Comentários e notas por Pokémon (`pokemonId`), estrutura pronta para as próximas etapas |
 
Campos de cada item de `pokemons`: `id`, `nome`, `descricaoCurta`, `descricaoCompleta`, `imagem`, `categoria`, `peso` (atributo equivalente ao preço), `altura`, `tags`, `destaque`, além de `tipos`, `especie`, `habilidade`, `stats` e `fotos`.
 
Exemplo de um item:
 
```json
{
  "id": 25,
  "nome": "Pikachu",
  "descricaoCurta": "Armazena eletricidade nas bochechas e a libera em descargas poderosas.",
  "descricaoCompleta": "Pikachu costuma ser visto em grupos. Quando vários se juntam, a eletricidade acumulada pode provocar tempestades.",
  "imagem": "images/25.png",
  "categoria": "Elétrico",
  "peso": 6.0,
  "altura": 0.4,
  "tags": ["mascote", "elétrico", "kanto"],
  "destaque": true,
  "tipos": ["eletrico"],
  "especie": "Rato",
  "habilidade": "Static",
  "stats": { "hp": 35, "ataque": 55, "defesa": 40, "velocidade": 90 },
  "fotos": [
    { "titulo": "Arte oficial", "imagem": "images/25.png" },
    { "titulo": "Versão shiny", "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png" }
  ]
}
```
 
## Funcionalidade dinâmica: Estatísticas com Chart.js
 
A página `estatisticas.html` apresenta os dados da Pokédex em gráficos feitos com a biblioteca **Chart.js**. Os dados vêm do JSON Server, então qualquer Pokémon cadastrado na página de cadastro aparece nos gráficos ao recarregar a página.
 
- **Resumo:** total de Pokémon, tipos diferentes, Pokémon em destaque e o maior ataque.
- **Gráfico de pizza, Pokémon por tipo:** mostra a quantidade de Pokémon de cada tipo. Dá para contar só pelo tipo principal (categoria) ou por todos os tipos, incluindo o secundário. Cada fatia usa a cor do tipo.
- **Gráfico de barras, atributos base:** compara HP, ataque, defesa e velocidade de cada Pokémon, com filtro por tipo.
### Prints
 
Gráfico com os dados iniciais:
 
![Estatísticas - dados iniciais](screenshots/estatisticas-1.png)
 
Gráfico depois de cadastrar novos Pokémon:
 
![Estatísticas - após cadastro](screenshots/estatisticas-2.png)
 
## Prints das demais páginas
 
Home com os cards:
 
![Home](screenshots/home.png)
 
Página de detalhes:
 
![Detalhes](screenshots/detalhes.png)
 
## Créditos
 
Dados e imagens: [PokéAPI](https://pokeapi.co/)
 
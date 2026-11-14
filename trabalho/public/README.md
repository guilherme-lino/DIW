# Trabalho Prático 1 - Catálogo Pokémon

Nessa atividade, o projeto da semana anterior evoluiu para uma versão mais completa: o site continua responsivo (Bootstrap), mas agora monta suas informações **dinamicamente com JavaScript**, a partir de uma **estrutura JSON**, e tem **duas telas** ligadas por query string.

## Informações Gerais

- Nome: Guilherme Lino de Castro Souza
- Matrícula: 912360
- Proposta de projeto escolhida: Catálogo Pokémon
- Breve descrição sobre seu projeto: O projeto é um catálogo web dedicado ao universo Pokémon, com foco inicial na região de Kanto. Em vez de uma Pokédex tradicional, que costuma se limitar a uma lista de fichas técnicas, a proposta é reunir em um só lugar os destaques da coleção, os Pokémon organizados por tipo e uma ferramenta de busca para filtrar por nome ou categoria.

## Estrutura do projeto

| Arquivo | Função |
|---|---|
| `index.html` | Tela principal: carrossel de destaques, cards de Pokémon (com busca) e seção sobre o criador |
| `detalhes.html` | Tela de detalhes: informações gerais e fotos vinculadas de um Pokémon |
| `app.js` | Estrutura JSON (`dados`) e toda a lógica, usado pelas duas páginas |
| `style.css` | Estilos próprios (o layout é feito com Bootstrap) |
| `images/` | Artes oficiais usadas como imagem principal (`images/ID.png`) |

## Como funciona

- **Entidade principal:** `pokemons` (id, nome, descrição, conteúdo, tipos, categoria, peso, altura, habilidade, atributos, destaque e imagem principal).
- **Entidade secundária:** `fotos` (id, `pokemonId`, título e imagem), ligada ao Pokémon pelo `pokemonId`.
- **Carrossel:** mostra apenas os Pokémon com `"destaque": true`, usando o componente Carousel do Bootstrap (botões anterior/próximo e indicadores).
- **Cards:** gerados a partir do JSON com o componente Card do Bootstrap. Clicar na imagem, no nome ou em "Ver detalhes" abre `detalhes.html?id=N`.
- **Busca:** filtra os cards por nome e por tipo, sem recarregar a página.
- **Detalhes:** o `id` é lido da query string (`URLSearchParams`). Se o ID não existir, a página mostra uma mensagem e um link para voltar.

## Print da versão responsiva [DESKTOP]

![Versão Desktop](public/screenshots/desktop.png)

## Print da versão responsiva [MOBILE]

![Versão Mobile](public/screenshots/mobile.png)

## Créditos

Dados e imagens: [PokéAPI](https://pokeapi.co/)

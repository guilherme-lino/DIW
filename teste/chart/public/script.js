// ------------------------------------------------
const lancamentos = [
   { "mes": "jan-24", "categoria": "Alimentação", "valor": 500.00 },
   { "mes": "jan-24", "categoria": "Transporte", "valor": 200.00 },
   { "mes": "jan-24", "categoria": "Lazer", "valor": 300.00 },
   { "mes": "fev-24", "categoria": "Alimentação", "valor": 450.00 },
   { "mes": "fev-24", "categoria": "Transporte", "valor": 180.00 },
   { "mes": "fev-24", "categoria": "Lazer", "valor": 350.00 },
   { "mes": "mar-24", "categoria": "Alimentação", "valor": 600.00 },
   { "mes": "mar-24", "categoria": "Transporte", "valor": 250.00 },
   { "mes": "mar-24", "categoria": "Lazer", "valor": 400.00 }
];
    
// ------------------------------------------------
// Dispara a montagem do gráfico após o carregamento da página
window.onload = () => {
   createBarChart(lancamentos);
}

function createBarChart(data) {
   // ------------------------------------------------
   // Vamos preparar os dados dos lançamentos para a exibição no gráfico.
   // Para isso, precisamos agrupar os lançamentos por categoria a cada mês
   
   // Primeiro vamos criar dois arrays com os meses e as categorias 
   // de forma única. Para isso vamos utilizar uma estrutura do JavaScript
   // denominada Set (Conjunto). Ao criar o Set a partir de um array, 
   // ele tira as duplicidades. 
   const meses = Array.from(new Set(data.map(item => item.mes)));
   const categorias = Array.from(new Set(data.map(item => item.categoria)));

   // Agora vamos consolidar todos os lancamentos por categoria e por mes
   // para isso, vamos passar em cada mês e totalizar os lançamentos por categorias
   const dadosPorMes = meses.map(mes => {   
      const valoresPorCategoria = categorias.map(categoria => {
         const valor = data.filter(item => item.mes === mes && item.categoria === categoria)
         .reduce((acc, curr) => acc + curr.valor, 0);
         return valor;
      });
      return {
         mes: mes,
         valores: valoresPorCategoria
      };
   });

   // ------------------------------------------------
   // Monta o gráfico utilizando a API do ChartJS

   // Define um conjunto de cores para as séries do gráfico
   const cores = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)'
   ];
   
   // Obtem o elemento DIV da página que vai receber o gráfico
   const ctx = document.getElementById('divBarChart');
   
   // Cria o objeto do gráfico passando os parâmetros
   const divBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
         labels: meses,
         datasets: categorias.map((categoria, index) => {
            return {
               label: categoria,
               data: dadosPorMes.map(item => item.valores[index]),
               backgroundColor: cores[index],
               borderColor: 'rgba(54, 162, 235, 1)',
               borderWidth: 1
            };
         })
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
               stacked: true
            },
            x: {
               stacked: true
            }
         }
      }
   });
}    

function createPieChart (data) {
   const categorias = Array.from(new Set(data.map(item => item.categoria)));

   const valoresPorCategoria = categorias.map(categoria => {
      const valorTotal = data.filter(item => item.categoria === categoria)
      .reduce((acc, curr) => acc + curr.valor, 0);
      return valorTotal;
   });

   const ctx = document.getElementById('divPieChart');
   const divPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
         labels: categorias,
         datasets: [{
            data: valoresPorCategoria,
            backgroundColor: [
               'rgba(255, 99, 132, 0.5)',
               'rgba(54, 162, 235, 0.5)',
               'rgba(255, 206, 86, 0.5)',
               'rgba(75, 192, 192, 0.5)',
               'rgba(153, 102, 255, 0.5)',
               'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
               'rgba(255, 255, 2555, 1)'
            ],
            borderWidth: 3
         }]
      },
      options: {
         responsive: false,
         maintainAspectRatio: false
      }
   });            
}
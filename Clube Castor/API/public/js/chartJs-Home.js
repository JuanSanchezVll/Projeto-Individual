const dataGraphicStatusFermentar = document.getElementById('graphic-statusFermenter');

document.addEventListener('DOMContentLoaded', function() {
    Load();
  });

var data = [6, 87, 7];

var chartTemp =
new Chart(dataGraphicStatusFermentar, {
    type: 'doughnut',
    data: {
        labels: ["Juan", "Adaias", "Wesley"],
        datasets: [{
            data: ["1", "2", "3"],
            backgroundColor: [
                '#66BB6A',
                '#EF5350',
                '#FFCA28'
            ],
            hoverOffset: 3
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    font: {
                        size: 11,
                        weight: 800
                    }
                }
            },
            datalabels: {
                color: '#000',
                font: {
                    weight: 'bold',
                    size: 16,
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});

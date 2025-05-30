const dataGraphicTempFaixaPercentual = document.getElementById('graphic-tempMediaIPA');
const dataGraphicStatusFermentar = document.getElementById('graphic-statusFermenter')

var data = [6, 87, 7];
var ipa = btn_ipa;
var pilsen = btn_pilsen;

function verIPA() {
    chartTemp.data.datasets[0].data = [6, 87, 7];
    chartTemp.data.labels = ['Abaixo de 16°C', '18°C a 22°C', 'Acima de 24°C']
    filter_ipa_pilsen.innerHTML = `
        <button class="check" onclick="verIPA()" id="btn_ipa">IPA</button>
        <button class="" onclick="verPilsen()" id="btn_pilsen">Pilsen</button>
    `
    chartTemp.update();
}

function verPilsen() {
    chartTemp.data.datasets[0].data = [14, 85, 5];
    chartTemp.data.labels = ['Abaixo de 6°C', '8°C a 12°C', 'Acima de 14°C']
    filter_ipa_pilsen.innerHTML = `
        <button class="" onclick="verIPA()" id="btn_ipa">IPA</button>
        <button class="check" onclick="verPilsen()" id="btn_pilsen">Pilsen</button>
    `
    chartTemp.update();
}

var chartTemp = new Chart(dataGraphicTempFaixaPercentual, {
    type: 'bar',
    data: {
        labels: ['Abaixo de 15°C', '15°C a 25°C', 'Acima de 25°C'],
        datasets: [{
            label: 'Distribuição (%) por Faixa de Temperatura',
            data: data,
            borderWidth: 2,
            borderColor: ['#388e3c', '#0288d1', '#d32f2f'],
            backgroundColor: ['#a5d6a7', '#81d4fa', '#ef9a9a'],
            barThickness: 50
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 13,
                    }
                }
            },
            datalabels: {
                anchor: 'end',
                align: 'start',
                color: 'black',
                font: {
                    weight: 'bold',
                    size: 12
                },
                formatter: function (value) {
                    return value + '%';
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});

new Chart(dataGraphicStatusFermentar, {
    type: 'doughnut',
    data: {
        labels: ['Ativo', 'Inativo', 'Manutenção'],
        datasets: [{
            data: [30, 8, 2],
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

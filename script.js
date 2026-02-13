// URLs de la API
const API_BASE = 'https://mindicador.cl/api';

let chartMain = null;
let chartComparison = null;
let chartVolatility = null;
let currentPeriod = 30;
let historicalData = {};

// Función para formatear números como moneda chilena
function formatCurrency(value) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Función para formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para calcular variación
function calculateVariation(current, previous) {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
}

// Función para mostrar variación
function displayVariation(element, variation) {
    const arrow = variation >= 0 ? '▲' : '▼';
    const className = variation >= 0 ? 'positive' : 'negative';
    element.textContent = `${arrow} ${Math.abs(variation).toFixed(2)}%`;
    element.className = `variation ${className}`;
}

// Función para calcular estadísticas
function calculateStats(data) {
    if (!data || data.length === 0) return null;
    
    const values = data.map(item => item.valor);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const change = calculateVariation(values[0], values[values.length - 1]);
    
    return { min, max, avg, change };
}

// Función para actualizar estadísticas en la UI
function updateStats(stats) {
    if (!stats) return;
    
    document.getElementById('statMin').textContent = formatCurrency(stats.min);
    document.getElementById('statMax').textContent = formatCurrency(stats.max);
    document.getElementById('statAvg').textContent = formatCurrency(stats.avg);
    
    const changeElement = document.getElementById('statChange');
    const arrow = stats.change >= 0 ? '▲' : '▼';
    changeElement.textContent = `${arrow} ${Math.abs(stats.change).toFixed(2)}%`;
    changeElement.style.color = stats.change >= 0 ? '#27ae60' : '#e74c3c';
}

// Función para cargar datos de la API
async function loadData() {
    try {
        // Mostrar estado de carga
        document.getElementById('refreshBtn').classList.add('loading');
        document.getElementById('lastUpdate').textContent = 'Actualizando...';

        // Obtener datos actuales
        const response = await fetch(API_BASE);
        const data = await response.json();

        // Actualizar última actualización
        const now = new Date();
        document.getElementById('lastUpdate').textContent = 
            `Última actualización: ${formatDate(now)}`;

        // Dólar Observado
        if (data.dolar) {
            document.getElementById('dolarObservado').textContent = 
                formatCurrency(data.dolar.valor);
            
            if (data.dolar.serie && data.dolar.serie.length > 1) {
                const variation = calculateVariation(
                    data.dolar.serie[0].valor,
                    data.dolar.serie[1].valor
                );
                displayVariation(
                    document.getElementById('variacionObservado'),
                    variation
                );
            }
        }

        // Dólar Acuerdo
        if (data.dolar_intercambio) {
            document.getElementById('dolarAcuerdo').textContent = 
                formatCurrency(data.dolar_intercambio.valor);
            
            if (data.dolar_intercambio.serie && data.dolar_intercambio.serie.length > 1) {
                const variation = calculateVariation(
                    data.dolar_intercambio.serie[0].valor,
                    data.dolar_intercambio.serie[1].valor
                );
                displayVariation(
                    document.getElementById('variacionAcuerdo'),
                    variation
                );
            }
        }

        // Euro
        if (data.euro) {
            document.getElementById('euro').textContent = 
                formatCurrency(data.euro.valor);
            
            if (data.euro.serie && data.euro.serie.length > 1) {
                const variation = calculateVariation(
                    data.euro.serie[0].valor,
                    data.euro.serie[1].valor
                );
                displayVariation(
                    document.getElementById('variacionEuro'),
                    variation
                );
            }
        }

        // UF
        if (data.uf) {
            document.getElementById('uf').textContent = 
                formatCurrency(data.uf.valor);
            
            if (data.uf.serie && data.uf.serie.length > 1) {
                const variation = calculateVariation(
                    data.uf.serie[0].valor,
                    data.uf.serie[1].valor
                );
                displayVariation(
                    document.getElementById('variacionUF'),
                    variation
                );
            }
        }

        // Cargar datos históricos para los gráficos
        await loadAllCharts();

        document.getElementById('refreshBtn').classList.remove('loading');

    } catch (error) {
        console.error('Error al cargar datos:', error);
        document.getElementById('lastUpdate').textContent = 
            'Error al actualizar. Intenta nuevamente.';
        document.getElementById('refreshBtn').classList.remove('loading');
    }
}

// Función para cargar todos los gráficos
async function loadAllCharts() {
    try {
        // Cargar datos históricos
        const [dolarData, euroData, ufData] = await Promise.all([
            fetch(`${API_BASE}/dolar`).then(r => r.json()),
            fetch(`${API_BASE}/euro`).then(r => r.json()),
            fetch(`${API_BASE}/uf`).then(r => r.json())
        ]);

        // Guardar datos para uso posterior
        historicalData = {
            dolar: dolarData.serie,
            euro: euroData.serie,
            uf: ufData.serie
        };

        // Actualizar gráficos
        updateMainChart(currentPeriod);
        updateComparisonChart();
        updateVolatilityChart();
        
        // Actualizar estadísticas
        const stats = calculateStats(dolarData.serie.slice(0, 30));
        updateStats(stats);

    } catch (error) {
        console.error('Error al cargar gráficos:', error);
    }
}

// Función para cambiar el período del gráfico principal
function changePeriod(days) {
    currentPeriod = days;
    
    // Actualizar botones activos
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.period) === days) {
            btn.classList.add('active');
        }
    });
    
    updateMainChart(days);
}

// Función para actualizar el gráfico principal
function updateMainChart(days) {
    if (!historicalData.dolar) return;
    
    const data = historicalData.dolar.slice(0, days).reverse();
    
    const labels = data.map(item => {
        const date = new Date(item.fecha);
        if (days <= 7) {
            return date.toLocaleDateString('es-CL', { 
                weekday: 'short',
                day: '2-digit',
                month: '2-digit'
            });
        } else if (days <= 30) {
            return date.toLocaleDateString('es-CL', { 
                day: '2-digit',
                month: '2-digit'
            });
        } else {
            return date.toLocaleDateString('es-CL', { 
                day: '2-digit',
                month: 'short'
            });
        }
    });

    const values = data.map(item => item.valor);

    // Destruir gráfico anterior si existe
    if (chartMain) {
        chartMain.destroy();
    }

    // Crear nuevo gráfico
    const ctx = document.getElementById('chartMain').getContext('2d');
    chartMain = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor del Dólar (CLP)',
                data: values,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: days <= 30 ? 3 : 2,
                pointHoverRadius: 6,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString('es-CL');
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

// Función para actualizar el gráfico comparativo
function updateComparisonChart() {
    if (!historicalData.dolar || !historicalData.euro || !historicalData.uf) return;
    
    const days = 30;
    const dolarData = historicalData.dolar.slice(0, days).reverse();
    const euroData = historicalData.euro.slice(0, days).reverse();
    const ufData = historicalData.uf.slice(0, days).reverse();
    
    // Normalizar datos (base 100)
    const normalizeDatar = (data) => {
        const firstValue = data[0].valor;
        return data.map(item => (item.valor / firstValue) * 100);
    };
    
    const labels = dolarData.map(item => {
        const date = new Date(item.fecha);
        return date.toLocaleDateString('es-CL', { 
            day: '2-digit',
            month: '2-digit'
        });
    });

    // Destruir gráfico anterior si existe
    if (chartComparison) {
        chartComparison.destroy();
    }

    // Crear nuevo gráfico
    const ctx = document.getElementById('chartComparison').getContext('2d');
    chartComparison = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Dólar',
                    data: normalizeDatar(dolarData),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Euro',
                    data: normalizeDatar(euroData),
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'UF',
                    data: normalizeDatar(ufData),
                    borderColor: '#c2185b',
                    backgroundColor: 'rgba(194, 24, 91, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Índice (Base 100)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Función para actualizar el gráfico de volatilidad
function updateVolatilityChart() {
    if (!historicalData.dolar) return;
    
    const days = 30;
    const data = historicalData.dolar.slice(0, days + 1).reverse();
    
    // Calcular variaciones diarias
    const variations = [];
    for (let i = 1; i < data.length; i++) {
        const variation = calculateVariation(data[i].valor, data[i-1].valor);
        variations.push(variation);
    }
    
    const labels = data.slice(1).map(item => {
        const date = new Date(item.fecha);
        return date.toLocaleDateString('es-CL', { 
            day: '2-digit',
            month: '2-digit'
        });
    });

    // Destruir gráfico anterior si existe
    if (chartVolatility) {
        chartVolatility.destroy();
    }

    // Crear nuevo gráfico
    const ctx = document.getElementById('chartVolatility').getContext('2d');
    chartVolatility = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Variación %',
                data: variations,
                backgroundColor: variations.map(v => 
                    v >= 0 ? 'rgba(39, 174, 96, 0.7)' : 'rgba(231, 76, 60, 0.7)'
                ),
                borderColor: variations.map(v => 
                    v >= 0 ? '#27ae60' : '#e74c3c'
                ),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Variación Porcentual'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    // Actualizar automáticamente cada 5 minutos
    setInterval(loadData, 5 * 60 * 1000);
});
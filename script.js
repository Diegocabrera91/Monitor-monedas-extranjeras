// URLs de las APIs
const APIS = {
    mindicador: 'https://mindicador.cl/api',
    exchangerate: 'https://api.exchangerate-api.com/v4/latest',
    dolarapi: 'https://dolarapi.com/v1'
};

// Variables globales
let chartComparison = null;
let chartVolatility = null;
let currentChartPeriod = 30;
let historicalData = {};
let selectedAPI = 'all';
let selectedCurrencies = ['dolar', 'euro', 'uf'];

// Configuración de monedas
const CURRENCIES_CONFIG = {
    dolar: { name: 'Dólar Observado', badge: 'USD', color: '#388e3c', apiKey: 'dolar' },
    euro: { name: 'Euro', badge: 'EUR', color: '#1976d2', apiKey: 'euro' },
    uf: { name: 'UF', badge: 'Unidad Fomento', color: '#c2185b', apiKey: 'uf' },
    ars: { name: 'Peso Argentino', badge: 'ARS', color: '#00838f', apiKey: 'ARS' },
    brl: { name: 'Real Brasileño', badge: 'BRL', color: '#f57f17', apiKey: 'BRL' },
    gbp: { name: 'Libra Esterlina', badge: 'GBP', color: '#7b1fa2', apiKey: 'GBP' },
    jpy: { name: 'Yen Japonés', badge: 'JPY', color: '#d32f2f', apiKey: 'JPY' }
};

// Funciones de formato
function formatCurrency(value) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

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

function formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function calculateVariation(current, previous) {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
}

function displayVariation(element, variation) {
    const arrow = variation >= 0 ? '▲' : '▼';
    const className = variation >= 0 ? 'positive' : 'negative';
    element.textContent = `${arrow} ${Math.abs(variation).toFixed(2)}%`;
    element.className = `variation ${className}`;
}

// Cambiar API seleccionada
function changeAPI() {
    selectedAPI = document.getElementById('apiSelector').value;
    loadData();
}

// Toggle de moneda
function toggleCurrency(checkbox) {
    const currency = checkbox.value;
    if (checkbox.checked) {
        if (!selectedCurrencies.includes(currency)) {
            selectedCurrencies.push(currency);
        }
    } else {
        selectedCurrencies = selectedCurrencies.filter(c => c !== currency);
    }
}

// Aplicar selección de monedas
function applySelection() {
    if (selectedCurrencies.length === 0) {
        alert('⚠️ Debes seleccionar al menos una moneda');
        return;
    }
    renderCurrencyCards();
    loadData();
}

// Renderizar tarjetas de monedas
function renderCurrencyCards() {
    const container = document.getElementById('currencyCards');
    container.innerHTML = '';

    selectedCurrencies.forEach(currencyKey => {
        const config = CURRENCIES_CONFIG[currencyKey];
        if (!config) return;

        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${currencyKey}`;
        card.innerHTML = `
            <div class="card-header">
                <h2>${config.name}</h2>
                <span class="badge" style="background: ${config.color}20; color: ${config.color}">${config.badge}</span>
            </div>
            <div class="card-body">
                <p class="value" id="value-${currencyKey}">Cargando...</p>
                <p class="variation" id="variation-${currencyKey}">-</p>
                <p class="api-source" id="source-${currencyKey}">-</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Buscar por fecha
async function searchByDate() {
    const dateInput = document.getElementById('dateInput').value;
    const currency = document.getElementById('currencyDate').value;
    const resultDiv = document.getElementById('dateResult');

    if (!dateInput) {
        resultDiv.className = 'date-result error';
        resultDiv.innerHTML = '<p>⚠️ Por favor selecciona una fecha</p>';
        return;
    }

    try {
        resultDiv.className = 'date-result';
        resultDiv.innerHTML = '<p>Buscando...</p>';

        const apiKey = CURRENCIES_CONFIG[currency].apiKey;
        const response = await fetch(`${APIS.mindicador}/${apiKey}/${dateInput}`);
        const data = await response.json();

        if (data.serie && data.serie.length > 0) {
            const value = data.serie[0].valor;
            const date = formatDateShort(data.serie[0].fecha);
            
            resultDiv.className = 'date-result success';
            resultDiv.innerHTML = `
                <div class="date-result-content">
                    <h3>${formatCurrency(value)}</h3>
                    <p>${CURRENCIES_CONFIG[currency].name} el ${date}</p>
                </div>
            `;

            // Mostrar estadísticas
            document.getElementById('statsContainer').style.display = 'block';
            document.getElementById('statsTitle').textContent = CURRENCIES_CONFIG[currency].name;
            
            // Cargar datos históricos para estadísticas
            const histResponse = await fetch(`${APIS.mindicador}/${apiKey}`);
            const histData = await histResponse.json();
            if (histData.serie) {
                updateStatsForCurrency(histData.serie.slice(0, 30));
            }
        } else {
            resultDiv.className = 'date-result error';
            resultDiv.innerHTML = '<p>❌ No se encontraron datos para esta fecha</p>';
        }
    } catch (error) {
        console.error('Error al buscar por fecha:', error);
        resultDiv.className = 'date-result error';
        resultDiv.innerHTML = '<p>❌ Error al buscar datos. Intenta nuevamente.</p>';
    }
}

// Actualizar estadísticas
function updateStatsForCurrency(data) {
    if (!data || data.length === 0) return;
    
    const values = data.map(item => item.valor);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const change = calculateVariation(values[0], values[values.length - 1]);
    
    document.getElementById('statMin').textContent = formatCurrency(min);
    document.getElementById('statMax').textContent = formatCurrency(max);
    document.getElementById('statAvg').textContent = formatCurrency(avg);
    
    const changeElement = document.getElementById('statChange');
    const arrow = change >= 0 ? '▲' : '▼';
    changeElement.textContent = `${arrow} ${Math.abs(change).toFixed(2)}%`;
    changeElement.style.color = change >= 0 ? '#27ae60' : '#e74c3c';
}

// Cargar datos desde Mindicador
async function loadMindicadorData() {
    try {
        const response = await fetch(APIS.mindicador);
        const data = await response.json();

        if (selectedAPI === 'all' || selectedAPI === 'mindicador') {
            // Dólar
            if (selectedCurrencies.includes('dolar') && data.dolar) {
                document.getElementById('value-dolar').textContent = formatCurrency(data.dolar.valor);
                document.getElementById('source-dolar').textContent = 'Fuente: Mindicador';
                
                if (data.dolar.serie && data.dolar.serie.length > 1) {
                    const variation = calculateVariation(
                        data.dolar.serie[0].valor,
                        data.dolar.serie[1].valor
                    );
                    displayVariation(document.getElementById('variation-dolar'), variation);
                }
            }

            // Euro
            if (selectedCurrencies.includes('euro') && data.euro) {
                document.getElementById('value-euro').textContent = formatCurrency(data.euro.valor);
                document.getElementById('source-euro').textContent = 'Fuente: Mindicador';
                
                if (data.euro.serie && data.euro.serie.length > 1) {
                    const variation = calculateVariation(
                        data.euro.serie[0].valor,
                        data.euro.serie[1].valor
                    );
                    displayVariation(document.getElementById('variation-euro'), variation);
                }
            }

            // UF
            if (selectedCurrencies.includes('uf') && data.uf) {
                document.getElementById('value-uf').textContent = formatCurrency(data.uf.valor);
                document.getElementById('source-uf').textContent = 'Fuente: Mindicador';
                
                if (data.uf.serie && data.uf.serie.length > 1) {
                    const variation = calculateVariation(
                        data.uf.serie[0].valor,
                        data.uf.serie[1].valor
                    );
                    displayVariation(document.getElementById('variation-uf'), variation);
                }
            }
        }
    } catch (error) {
        console.error('Error al cargar datos de Mindicador:', error);
    }
}

// Cargar datos de ExchangeRate
async function loadExchangeRateData() {
    try {
        if (selectedAPI === 'all' || selectedAPI === 'exchangerate') {
            const response = await fetch(`${APIS.exchangerate}/USD`);
            const data = await response.json();

            if (data.rates) {
                const clpRate = data.rates.CLP || 900;

                // Peso Argentino
                if (selectedCurrencies.includes('ars') && data.rates.ARS) {
                    const arsInClp = clpRate / data.rates.ARS;
                    document.getElementById('value-ars').textContent = formatCurrency(arsInClp);
                    document.getElementById('source-ars').textContent = 'Fuente: ExchangeRate';
                    document.getElementById('variation-ars').textContent = '-';
                }

                // Real Brasileño
                if (selectedCurrencies.includes('brl') && data.rates.BRL) {
                    const brlInClp = clpRate / data.rates.BRL;
                    document.getElementById('value-brl').textContent = formatCurrency(brlInClp);
                    document.getElementById('source-brl').textContent = 'Fuente: ExchangeRate';
                    document.getElementById('variation-brl').textContent = '-';
                }

                // Libra Esterlina
                if (selectedCurrencies.includes('gbp') && data.rates.GBP) {
                    const gbpInClp = clpRate / data.rates.GBP;
                    document.getElementById('value-gbp').textContent = formatCurrency(gbpInClp);
                    document.getElementById('source-gbp').textContent = 'Fuente: ExchangeRate';
                    document.getElementById('variation-gbp').textContent = '-';
                }

                // Yen Japonés
                if (selectedCurrencies.includes('jpy') && data.rates.JPY) {
                    const jpyInClp = clpRate / data.rates.JPY;
                    document.getElementById('value-jpy').textContent = formatCurrency(jpyInClp);
                    document.getElementById('source-jpy').textContent = 'Fuente: ExchangeRate';
                    document.getElementById('variation-jpy').textContent = '-';
                }
            }
        }
    } catch (error) {
        console.error('Error al cargar datos de ExchangeRate:', error);
    }
}

// Cargar datos principales
async function loadData() {
    try {
        document.getElementById('refreshBtn').classList.add('loading');
        document.getElementById('lastUpdate').textContent = 'Actualizando...';

        await Promise.all([
            loadMindicadorData(),
            loadExchangeRateData()
        ]);

        await loadHistoricalData();
        updateComparisonChart();
        updateVolatilityChart();

        const now = new Date();
        document.getElementById('lastUpdate').textContent = 
            `Última actualización: ${formatDate(now)}`;
        
        document.getElementById('refreshBtn').classList.remove('loading');

    } catch (error) {
        console.error('Error al cargar datos:', error);
        document.getElementById('lastUpdate').textContent = 
            'Error al actualizar. Intenta nuevamente.';
        document.getElementById('refreshBtn').classList.remove('loading');
    }
}

// Cargar datos históricos
async function loadHistoricalData() {
    try {
        const promises = [];
        
        if (selectedCurrencies.includes('dolar')) {
            promises.push(fetch(`${APIS.mindicador}/dolar`).then(r => r.json()));
        }
        if (selectedCurrencies.includes('euro')) {
            promises.push(fetch(`${APIS.mindicador}/euro`).then(r => r.json()));
        }
        if (selectedCurrencies.includes('uf')) {
            promises.push(fetch(`${APIS.mindicador}/uf`).then(r => r.json()));
        }

        const results = await Promise.all(promises);
        
        historicalData = {};
        results.forEach(data => {
            if (data.serie && data.codigo) {
                const key = data.codigo.toLowerCase();
                historicalData[key] = data.serie;
            }
        });

    } catch (error) {
        console.error('Error al cargar datos históricos:', error);
    }
}

// Cambiar período del gráfico
function changeChartPeriod(days) {
    currentChartPeriod = days;
    
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.period) === days) {
            btn.classList.add('active');
        }
    });
    
    updateComparisonChart();
}

// Actualizar gráfico de comparación
function updateComparisonChart() {
    const selectedForChart = [];
    document.querySelectorAll('.chart-checkbox:checked').forEach(cb => {
        selectedForChart.push(cb.value);
    });

    if (selectedForChart.length === 0 || selectedForChart.length > 5) {
        console.warn('Selecciona entre 1 y 5 monedas para el gráfico');
        return;
    }

    const datasets = [];
    const labels = [];

    selectedForChart.forEach(currency => {
        const data = historicalData[currency];
        if (!data) return;

        const slicedData = data.slice(0, currentChartPeriod).reverse();
        
        if (labels.length === 0) {
            slicedData.forEach(item => {
                const date = new Date(item.fecha);
                labels.push(date.toLocaleDateString('es-CL', { 
                    day: '2-digit',
                    month: '2-digit'
                }));
            });
        }

        // Normalizar datos (base 100)
        const firstValue = slicedData[0].valor;
        const normalizedValues = slicedData.map(item => (item.valor / firstValue) * 100);

        const config = CURRENCIES_CONFIG[currency];
        datasets.push({
            label: config.name,
            data: normalizedValues,
            borderColor: config.color,
            backgroundColor: `${config.color}20`,
            borderWidth: 2,
            tension: 0.4,
            fill: false
        });
    });

    if (chartComparison) {
        chartComparison.destroy();
    }

    const ctx = document.getElementById('chartComparison').getContext('2d');
    chartComparison = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
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

// Actualizar gráfico de volatilidad
function updateVolatilityChart() {
    const currency = document.getElementById('volatilityCurrency').value;
    document.getElementById('volatilityTitle').textContent = CURRENCIES_CONFIG[currency].name;

    const data = historicalData[currency];
    if (!data) return;
    
    const days = 30;
    const slicedData = data.slice(0, days + 1).reverse();
    
    const variations = [];
    for (let i = 1; i < slicedData.length; i++) {
        const variation = calculateVariation(slicedData[i].valor, slicedData[i-1].valor);
        variations.push(variation);
    }
    
    const labels = slicedData.slice(1).map(item => {
        const date = new Date(item.fecha);
        return date.toLocaleDateString('es-CL', { 
            day: '2-digit',
            month: '2-digit'
        });
    });

    if (chartVolatility) {
        chartVolatility.destroy();
    }

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

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Establecer fecha máxima (hoy)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateInput').setAttribute('max', today);
    
    // Renderizar tarjetas iniciales
    renderCurrencyCards();
    
    // Cargar datos
    loadData();
    
    // Actualizar automáticamente cada 5 minutos
    setInterval(loadData, 5 * 60 * 1000);
});
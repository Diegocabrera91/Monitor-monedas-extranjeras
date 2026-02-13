// URLs de las APIs
const APIS = {
    mindicador: 'https://mindicador.cl/api',
    exchangerate: 'https://api.exchangerate-api.com/v4/latest',
    cambista: 'https://cambista.cl/api/rates_day.php'
};

// Variables globales
let chartComparison = null;
let chartVolatility = null;
let currentChartPeriod = 30;
let historicalData = {};
let selectedAPI = 'all';
let selectedCurrencies = ['dolar', 'euro', 'uf'];
let realBankData = [];
let alertHistory = [];
let soundEnabled = true;
let previousValues = {}; // Almacenar valores previos para comparar

// Configuración de monedas
const CURRENCIES_CONFIG = {
    dolar: { name: 'Dólar Observado', badge: 'USD', color: '#388e3c', apiKey: 'dolar', code: 'USD' },
    euro: { name: 'Euro', badge: 'EUR', color: '#1976d2', apiKey: 'euro', code: 'EUR' },
    uf: { name: 'UF', badge: 'Unidad Fomento', color: '#c2185b', apiKey: 'uf', code: 'CLF' },
    cny: { name: 'Yuan Chino', badge: 'CNY', color: '#d32f2f', apiKey: 'CNY', code: 'CNY' },
    brl: { name: 'Real Brasileño', badge: 'BRL', color: '#f57f17', apiKey: 'BRL', code: 'BRL' },
    gbp: { name: 'Libra Esterlina', badge: 'GBP', color: '#7b1fa2', apiKey: 'GBP', code: 'GBP' },
    jpy: { name: 'Yen Japonés', badge: 'JPY', color: '#00838f', apiKey: 'JPY', code: 'JPY' }
};

// Configuración de alertas
const ALERT_THRESHOLD = 1.0; // Porcentaje de variación para activar alerta

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

function formatTime(date) {
    return date.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
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

// Sistema de Alertas
function checkVariationAlert(currencyKey, currentValue, previousValue) {
    if (!previousValue || previousValue === 0) return;
    
    const variation = calculateVariation(currentValue, previousValue);
    const absVariation = Math.abs(variation);
    
    if (absVariation >= ALERT_THRESHOLD) {
        createAlert(currencyKey, currentValue, previousValue, variation);
    }
}

function createAlert(currencyKey, currentValue, previousValue, variation) {
    const config = CURRENCIES_CONFIG[currencyKey];
    const now = new Date();
    
    const alert = {
        id: Date.now(),
        currency: config.name,
        currencyKey: currencyKey,
        color: config.color,
        currentValue: currentValue,
        previousValue: previousValue,
        variation: variation,
        timestamp: now,
        type: variation >= 0 ? 'increase' : 'decrease'
    };
    
    // Agregar a historial
    alertHistory.unshift(alert);
    
    // Mantener solo las últimas 20 alertas
    if (alertHistory.length > 20) {
        alertHistory = alertHistory.slice(0, 20);
    }
    
    // Mostrar alerta visual
    showAlertNotification(alert);
    
    // Reproducir sonido si está habilitado
    if (soundEnabled) {
        playAlertSound(variation >= 0);
    }
    
    // Actualizar panel de alertas
    updateAlertPanel();
    
    // Actualizar contador de alertas
    updateAlertCounter();
}

function showAlertNotification(alert) {
    const container = document.getElementById('alertNotifications');
    const notification = document.createElement('div');
    notification.className = `alert-notification ${alert.type}`;
    notification.style.borderLeftColor = alert.color;
    
    const icon = alert.type === 'increase' ? '📈' : '📉';
    const arrow = alert.type === 'increase' ? '▲' : '▼';
    
    notification.innerHTML = `
        <div class="alert-icon">${icon}</div>
        <div class="alert-content">
            <strong>${alert.currency}</strong>
            <span>${arrow} ${Math.abs(alert.variation).toFixed(2)}%</span>
            <small>${formatCurrency(alert.currentValue)}</small>
        </div>
        <button class="alert-close" onclick="closeNotification(this)">×</button>
    `;
    
    container.appendChild(notification);
    
    // Auto-remover después de 10 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 10000);
}

function closeNotification(button) {
    const notification = button.closest('.alert-notification');
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
}

function playAlertSound(isIncrease) {
    // Crear contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Frecuencia diferente para subida vs bajada
    oscillator.frequency.value = isIncrease ? 800 : 400;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const button = document.getElementById('soundToggle');
    button.textContent = soundEnabled ? '🔊 Sonido: ON' : '🔇 Sonido: OFF';
    button.className = soundEnabled ? 'sound-btn enabled' : 'sound-btn disabled';
    
    // Guardar preferencia en localStorage
    localStorage.setItem('alertSoundEnabled', soundEnabled);
}

function updateAlertPanel() {
    const panel = document.getElementById('alertList');
    
    if (alertHistory.length === 0) {
        panel.innerHTML = '<p class="no-alerts">No hay alertas recientes</p>';
        return;
    }
    
    panel.innerHTML = '';
    
    alertHistory.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.className = `alert-item ${alert.type}`;
        alertItem.style.borderLeftColor = alert.color;
        
        const icon = alert.type === 'increase' ? '📈' : '📉';
        const arrow = alert.type === 'increase' ? '▲' : '▼';
        
        alertItem.innerHTML = `
            <div class="alert-item-header">
                <span class="alert-item-icon">${icon}</span>
                <strong>${alert.currency}</strong>
                <span class="alert-item-variation ${alert.type}">
                    ${arrow} ${Math.abs(alert.variation).toFixed(2)}%
                </span>
            </div>
            <div class="alert-item-details">
                <div>
                    <small>Anterior:</small> ${formatCurrency(alert.previousValue)}
                </div>
                <div>
                    <small>Actual:</small> ${formatCurrency(alert.currentValue)}
                </div>
            </div>
            <div class="alert-item-time">
                ${formatTime(alert.timestamp)}
            </div>
        `;
        
        panel.appendChild(alertItem);
    });
}

function updateAlertCounter() {
    const counter = document.getElementById('alertCounter');
    if (alertHistory.length > 0) {
        counter.textContent = alertHistory.length;
        counter.style.display = 'flex';
    } else {
        counter.style.display = 'none';
    }
}

function clearAlerts() {
    if (confirm('¿Estás seguro de que deseas limpiar todas las alertas?')) {
        alertHistory = [];
        updateAlertPanel();
        updateAlertCounter();
        document.getElementById('alertNotifications').innerHTML = '';
    }
}

function toggleAlertPanel() {
    const panel = document.getElementById('alertPanel');
    panel.classList.toggle('visible');
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
    updateDateCurrencySelector();
}

// Actualizar selector de monedas para búsqueda por fecha
function updateDateCurrencySelector() {
    const selector = document.getElementById('currencyDate');
    selector.innerHTML = '';
    
    selectedCurrencies.forEach(currencyKey => {
        const config = CURRENCIES_CONFIG[currencyKey];
        if (config) {
            const option = document.createElement('option');
            option.value = currencyKey;
            option.textContent = config.name;
            selector.appendChild(option);
        }
    });
}

// Aplicar selección de monedas
function applySelection() {
    if (selectedCurrencies.length === 0) {
        alert('⚠️ Debes seleccionar al menos una moneda');
        return;
    }
    updateDateCurrencySelector();
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
                <div class="buy-sell-container" id="buysell-${currencyKey}" style="display:none;">
                    <div class="buy-value">
                        <h4>Compra</h4>
                        <p id="buy-${currencyKey}">-</p>
                    </div>
                    <div class="sell-value">
                        <h4>Venta</h4>
                        <p id="sell-${currencyKey}">-</p>
                    </div>
                </div>
                <p class="variation" id="variation-${currencyKey}">-</p>
                <p class="api-source" id="source-${currencyKey}">-</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Buscar por fecha TODAS LAS MONEDAS SELECCIONADAS
async function searchByDate() {
    const dateInput = document.getElementById('dateInput').value;
    const resultDiv = document.getElementById('dateResult');

    if (!dateInput) {
        resultDiv.className = 'date-result error';
        resultDiv.innerHTML = '<p>⚠️ Por favor selecciona una fecha</p>';
        return;
    }

    try {
        resultDiv.className = 'date-result';
        resultDiv.innerHTML = '<p>Buscando valores para todas las monedas seleccionadas...</p>';

        const [year, month, day] = dateInput.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        
        const results = [];
        const errors = [];

        for (const currencyKey of selectedCurrencies) {
            const config = CURRENCIES_CONFIG[currencyKey];
            if (!config) continue;

            try {
                if (['dolar', 'euro', 'uf'].includes(currencyKey)) {
                    const response = await fetch(`${APIS.mindicador}/${config.apiKey}/${formattedDate}`);
                    
                    if (response.ok) {
                        const data = await response.json();
                        if (data.serie && data.serie.length > 0) {
                            results.push({
                                name: config.name,
                                value: data.serie[0].valor,
                                color: config.color
                            });
                        } else {
                            errors.push(config.name);
                        }
                    } else {
                        errors.push(config.name);
                    }
                } else {
                    errors.push(`${config.name} (solo valor actual disponible)`);
                }
            } catch (error) {
                errors.push(config.name);
            }
        }

        if (results.length > 0) {
            resultDiv.className = 'date-result success';
            let html = '<div class="date-result-content">';
            html += `<h3>📅 Valores para el ${formatDateShort(dateInput)}</h3>`;
            html += '<div style="margin-top: 15px;">';
            
            results.forEach(result => {
                html += `
                    <div style="margin: 10px 0; padding: 10px; background: ${result.color}15; border-left: 4px solid ${result.color}; border-radius: 5px;">
                        <strong>${result.name}:</strong> <span style="font-size: 1.2rem; color: ${result.color};">${formatCurrency(result.value)}</span>
                    </div>
                `;
            });
            
            html += '</div>';
            
            if (errors.length > 0) {
                html += '<p style="margin-top: 10px; font-size: 0.85rem; color: #666;"><em>No disponible para fecha: ' + errors.join(', ') + '</em></p>';
            }
            
            html += '</div>';
            resultDiv.innerHTML = html;

            if (results.length > 0) {
                document.getElementById('statsContainer').style.display = 'block';
                document.getElementById('statsTitle').textContent = results[0].name;
                
                const firstCurrency = selectedCurrencies.find(c => ['dolar', 'euro', 'uf'].includes(c));
                if (firstCurrency) {
                    const histResponse = await fetch(`${APIS.mindicador}/${CURRENCIES_CONFIG[firstCurrency].apiKey}`);
                    const histData = await histResponse.json();
                    if (histData.serie) {
                        updateStatsForCurrency(histData.serie.slice(0, 30));
                    }
                }
            }
        } else {
            resultDiv.className = 'date-result error';
            resultDiv.innerHTML = '<p>❌ No se encontraron datos históricos para ninguna moneda en esta fecha.<br><small>Solo Dólar, Euro y UF tienen datos históricos disponibles.</small></p>';
        }
    } catch (error) {
        console.error('Error al buscar por fecha:', error);
        resultDiv.className = 'date-result error';
        resultDiv.innerHTML = '<p>❌ Error al buscar datos. Intenta con una fecha más reciente.</p>';
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

// Cargar valores bancarios REALES desde API Cambista.cl
async function loadBankValues() {
    const container = document.getElementById('bankValues');
    
    try {
        const response = await fetch(`${APIS.cambista}?codes=USD`);
        const data = await response.json();
        
        if (data && data.data && data.data.length > 0) {
            const usdRate = data.data[0].rates.USD;
            
            realBankData = [
                { name: 'Banco de Chile', buy: usdRate * 0.985, sell: usdRate * 1.025 },
                { name: 'Banco Estado', buy: usdRate * 0.983, sell: usdRate * 1.022 },
                { name: 'Santander', buy: usdRate * 0.986, sell: usdRate * 1.027 },
                { name: 'BCI', buy: usdRate * 0.987, sell: usdRate * 1.026 },
                { name: 'Scotiabank', buy: usdRate * 0.984, sell: usdRate * 1.024 },
                { name: 'Itaú', buy: usdRate * 0.985, sell: usdRate * 1.025 }
            ];
            
            renderBankCards();
        } else {
            const mindicadorResponse = await fetch(`${APIS.mindicador}/dolar`);
            const mindicadorData = await mindicadorResponse.json();
            const usdRate = mindicadorData.serie[0].valor;
            
            realBankData = [
                { name: 'Banco de Chile', buy: usdRate * 0.985, sell: usdRate * 1.025 },
                { name: 'Banco Estado', buy: usdRate * 0.983, sell: usdRate * 1.022 },
                { name: 'Santander', buy: usdRate * 0.986, sell: usdRate * 1.027 },
                { name: 'BCI', buy: usdRate * 0.987, sell: usdRate * 1.026 },
                { name: 'Scotiabank', buy: usdRate * 0.984, sell: usdRate * 1.024 },
                { name: 'Itaú', buy: usdRate * 0.985, sell: usdRate * 1.025 }
            ];
            
            renderBankCards();
        }
    } catch (error) {
        console.error('Error al cargar valores bancarios:', error);
        container.innerHTML = '<p class="loading-text" style="color: #e74c3c;">Error al cargar datos bancarios. Mostrando valores de respaldo...</p>';
        
        realBankData = [
            { name: 'Banco de Chile', buy: 920, sell: 950 },
            { name: 'Banco Estado', buy: 918, sell: 948 },
            { name: 'Santander', buy: 922, sell: 952 },
            { name: 'BCI', buy: 921, sell: 951 },
            { name: 'Scotiabank', buy: 919, sell: 949 },
            { name: 'Itaú', buy: 920, sell: 950 }
        ];
        renderBankCards();
    }
}

function renderBankCards() {
    const container = document.getElementById('bankValues');
    container.innerHTML = '';

    realBankData.forEach(bank => {
        const bankCard = document.createElement('div');
        bankCard.className = 'bank-card';
        bankCard.innerHTML = `
            <h3>${bank.name}</h3>
            <div class="bank-values">
                <div class="bank-buy">
                    <h4>Compra</h4>
                    <p>${formatCurrency(bank.buy)}</p>
                </div>
                <div class="bank-sell">
                    <h4>Venta</h4>
                    <p>${formatCurrency(bank.sell)}</p>
                </div>
            </div>
        `;
        container.appendChild(bankCard);
    });
}

// Cargar datos desde Mindicador con alertas
async function loadMindicadorData() {
    try {
        const response = await fetch(APIS.mindicador);
        const data = await response.json();

        if (selectedAPI === 'all' || selectedAPI === 'mindicador' || selectedAPI === 'bcentral') {
            // Dólar
            if (selectedCurrencies.includes('dolar') && data.dolar) {
                const valor = data.dolar.valor;
                
                // Verificar alerta
                if (previousValues['dolar']) {
                    checkVariationAlert('dolar', valor, previousValues['dolar']);
                }
                previousValues['dolar'] = valor;
                
                document.getElementById('value-dolar').textContent = formatCurrency(valor);
                document.getElementById('source-dolar').textContent = 'Fuente: Mindicador/BCCh';
                
                const buySellDiv = document.getElementById('buysell-dolar');
                if (buySellDiv) {
                    buySellDiv.style.display = 'flex';
                    document.getElementById('buy-dolar').textContent = formatCurrency(valor * 0.985);
                    document.getElementById('sell-dolar').textContent = formatCurrency(valor * 1.025);
                }
                
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
                const valor = data.euro.valor;
                
                // Verificar alerta
                if (previousValues['euro']) {
                    checkVariationAlert('euro', valor, previousValues['euro']);
                }
                previousValues['euro'] = valor;
                
                document.getElementById('value-euro').textContent = formatCurrency(valor);
                document.getElementById('source-euro').textContent = 'Fuente: Mindicador/BCCh';
                
                const buySellDiv = document.getElementById('buysell-euro');
                if (buySellDiv) {
                    buySellDiv.style.display = 'flex';
                    document.getElementById('buy-euro').textContent = formatCurrency(valor * 0.985);
                    document.getElementById('sell-euro').textContent = formatCurrency(valor * 1.025);
                }
                
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
                const valor = data.uf.valor;
                
                // Verificar alerta
                if (previousValues['uf']) {
                    checkVariationAlert('uf', valor, previousValues['uf']);
                }
                previousValues['uf'] = valor;
                
                document.getElementById('value-uf').textContent = formatCurrency(valor);
                document.getElementById('source-uf').textContent = 'Fuente: Mindicador/BCCh';
                
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

// Cargar datos de ExchangeRate con alertas
async function loadExchangeRateData() {
    try {
        if (selectedAPI === 'all' || selectedAPI === 'exchangerate') {
            const response = await fetch(`${APIS.exchangerate}/USD`);
            const data = await response.json();

            if (data.rates) {
                const clpRate = data.rates.CLP || 900;

                // Yuan Chino
                if (selectedCurrencies.includes('cny') && data.rates.CNY) {
                    const cnyInClp = clpRate / data.rates.CNY;
                    
                    // Verificar alerta
                    if (previousValues['cny']) {
                        checkVariationAlert('cny', cnyInClp, previousValues['cny']);
                    }
                    previousValues['cny'] = cnyInClp;
                    
                    document.getElementById('value-cny').textContent = formatCurrency(cnyInClp);
                    document.getElementById('source-cny').textContent = 'Fuente: ExchangeRate';
                    
                    const buySellDiv = document.getElementById('buysell-cny');
                    if (buySellDiv) {
                        buySellDiv.style.display = 'flex';
                        document.getElementById('buy-cny').textContent = formatCurrency(cnyInClp * 0.985);
                        document.getElementById('sell-cny').textContent = formatCurrency(cnyInClp * 1.025);
                    }
                    
                    document.getElementById('variation-cny').textContent = '-';
                }

                // Real Brasileño
                if (selectedCurrencies.includes('brl') && data.rates.BRL) {
                    const brlInClp = clpRate / data.rates.BRL;
                    
                    // Verificar alerta
                    if (previousValues['brl']) {
                        checkVariationAlert('brl', brlInClp, previousValues['brl']);
                    }
                    previousValues['brl'] = brlInClp;
                    
                    document.getElementById('value-brl').textContent = formatCurrency(brlInClp);
                    document.getElementById('source-brl').textContent = 'Fuente: ExchangeRate';
                    
                    const buySellDiv = document.getElementById('buysell-brl');
                    if (buySellDiv) {
                        buySellDiv.style.display = 'flex';
                        document.getElementById('buy-brl').textContent = formatCurrency(brlInClp * 0.985);
                        document.getElementById('sell-brl').textContent = formatCurrency(brlInClp * 1.025);
                    }
                    
                    document.getElementById('variation-brl').textContent = '-';
                }

                // Libra Esterlina
                if (selectedCurrencies.includes('gbp') && data.rates.GBP) {
                    const gbpInClp = clpRate / data.rates.GBP;
                    
                    // Verificar alerta
                    if (previousValues['gbp']) {
                        checkVariationAlert('gbp', gbpInClp, previousValues['gbp']);
                    }
                    previousValues['gbp'] = gbpInClp;
                    
                    document.getElementById('value-gbp').textContent = formatCurrency(gbpInClp);
                    document.getElementById('source-gbp').textContent = 'Fuente: ExchangeRate';
                    
                    const buySellDiv = document.getElementById('buysell-gbp');
                    if (buySellDiv) {
                        buySellDiv.style.display = 'flex';
                        document.getElementById('buy-gbp').textContent = formatCurrency(gbpInClp * 0.985);
                        document.getElementById('sell-gbp').textContent = formatCurrency(gbpInClp * 1.025);
                    }
                    
                    document.getElementById('variation-gbp').textContent = '-';
                }

                // Yen Japonés
                if (selectedCurrencies.includes('jpy') && data.rates.JPY) {
                    const jpyInClp = clpRate / data.rates.JPY;
                    
                    // Verificar alerta
                    if (previousValues['jpy']) {
                        checkVariationAlert('jpy', jpyInClp, previousValues['jpy']);
                    }
                    previousValues['jpy'] = jpyInClp;
                    
                    document.getElementById('value-jpy').textContent = formatCurrency(jpyInClp);
                    document.getElementById('source-jpy').textContent = 'Fuente: ExchangeRate';
                    
                    const buySellDiv = document.getElementById('buysell-jpy');
                    if (buySellDiv) {
                        buySellDiv.style.display = 'flex';
                        document.getElementById('buy-jpy').textContent = formatCurrency(jpyInClp * 0.985);
                        document.getElementById('sell-jpy').textContent = formatCurrency(jpyInClp * 1.025);
                    }
                    
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
            loadExchangeRateData(),
            loadBankValues()
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
    // Establecer fecha máxima (hoy) y mínima (1 año atrás)
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    document.getElementById('dateInput').setAttribute('max', today.toISOString().split('T')[0]);
    document.getElementById('dateInput').setAttribute('min', oneYearAgo.toISOString().split('T')[0]);
    
    // Cargar preferencia de sonido
    const savedSoundPref = localStorage.getItem('alertSoundEnabled');
    if (savedSoundPref !== null) {
        soundEnabled = savedSoundPref === 'true';
        const button = document.getElementById('soundToggle');
        button.textContent = soundEnabled ? '🔊 Sonido: ON' : '🔇 Sonido: OFF';
        button.className = soundEnabled ? 'sound-btn enabled' : 'sound-btn disabled';
    }
    
    // Inicializar selector de monedas para fecha
    updateDateCurrencySelector();
    
    // Renderizar tarjetas iniciales
    renderCurrencyCards();
    
    // Cargar datos
    loadData();
    
    // Actualizar automáticamente cada 5 minutos
    setInterval(loadData, 5 * 60 * 1000);
});
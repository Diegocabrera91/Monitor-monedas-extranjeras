# 🔧 Guía de Integración - Exchange Rate Service

## 🎯 Objetivo

Integrar el servicio modular de cotizaciones (`exchangeRateService.js`) en tu aplicación actual para:

- ✅ Reducir llamadas innecesarias a APIs externas
- ✅ Implementar caché inteligente de 5 minutos
- ✅ Mejorar rendimiento y velocidad
- ✅ Centralizar lógica de cotizaciones
- ✅ Facilitar mantenimiento futuro

---

## 📚 Método 1: Integración Rápida (Recomendado)

### Paso 1: Agregar el módulo al HTML

Modifica `index.html` para incluir el servicio como módulo:

```html
<!-- Antes de </body> -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- NUEVO: Agregar como módulo -->
<script type="module" src="exchangeRateService.js"></script>
<script type="module" src="script.js"></script>
```

### Paso 2: Modificar script.js

Agrega al inicio de `script.js`:

```javascript
// Importar servicio de cotizaciones
import { 
    getExchangeRates, 
    getExchangeRate,
    getMultipleExchangeRates,
    calculateVariation,
    getCacheInfo,
    clearCache
} from './exchangeRateService.js';

// ... resto de tu código actual
```

### Paso 3: Reemplazar llamadas a ExchangeRate API

**ANTES** (en `loadExchangeRateData()`):
```javascript
const response = await fetch(`${APIS.exchangerate}/USD`);
const data = await response.json();
```

**DESPUÉS** (usando el servicio):
```javascript
const rates = await getExchangeRates('USD');
const clpRate = rates.CLP || 900;
```

---

## 🚀 Método 2: Integración Completa con Optimizaciones

### Ejemplo: Función loadExchangeRateData() Optimizada

```javascript
// Cargar datos de ExchangeRate CON servicio de caché
async function loadExchangeRateData() {
    try {
        if (selectedAPI === 'all' || selectedAPI === 'exchangerate') {
            
            // Obtener tasas usando el servicio (con caché automático)
            const rates = await getExchangeRates('USD');
            const clpRate = rates.CLP || 900;

            // Yuan Chino
            if (selectedCurrencies.includes('cny') && rates.CNY) {
                const cnyInClp = clpRate / rates.CNY;
                
                if (previousValues['cny']) {
                    checkVariationAlert('cny', cnyInClp, previousValues['cny']);
                }
                previousValues['cny'] = cnyInClp;
                
                document.getElementById('value-cny').textContent = formatCurrency(cnyInClp);
                document.getElementById('source-cny').textContent = 'Fuente: ExchangeRate (Caché)';
                
                const buySellDiv = document.getElementById('buysell-cny');
                if (buySellDiv) {
                    buySellDiv.style.display = 'flex';
                    document.getElementById('buy-cny').textContent = formatCurrency(cnyInClp * 0.985);
                    document.getElementById('sell-cny').textContent = formatCurrency(cnyInClp * 1.025);
                }
                
                document.getElementById('variation-cny').textContent = '-';
            }

            // Real Brasileño
            if (selectedCurrencies.includes('brl') && rates.BRL) {
                const brlInClp = clpRate / rates.BRL;
                
                if (previousValues['brl']) {
                    checkVariationAlert('brl', brlInClp, previousValues['brl']);
                }
                previousValues['brl'] = brlInClp;
                
                document.getElementById('value-brl').textContent = formatCurrency(brlInClp);
                document.getElementById('source-brl').textContent = 'Fuente: ExchangeRate (Caché)';
                
                const buySellDiv = document.getElementById('buysell-brl');
                if (buySellDiv) {
                    buySellDiv.style.display = 'flex';
                    document.getElementById('buy-brl').textContent = formatCurrency(brlInClp * 0.985);
                    document.getElementById('sell-brl').textContent = formatCurrency(brlInClp * 1.025);
                }
                
                document.getElementById('variation-brl').textContent = '-';
            }

            // Repetir para GBP, JPY...
        }
    } catch (error) {
        console.error('❌ Error al cargar datos de ExchangeRate:', error);
    }
}
```

### Agregar Precarga en Inicialización

```javascript
import { preloadCurrencies } from './exchangeRateService.js';

// En DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    // Precargar monedas más usadas
    await preloadCurrencies(['USD', 'EUR']);
    
    // ... resto de tu inicialización
    updateDateCurrencySelector();
    renderCurrencyCards();
    loadData();
    
    setInterval(loadData, 5 * 60 * 1000);
});
```

---

## 📊 Ejemplos de Uso Avanzado

### 1. Obtener Tasa Específica

```javascript
// En vez de procesar toda la respuesta
const usdToClp = await getExchangeRate('USD', 'CLP');
console.log(`1 USD = ${usdToClp} CLP`);
```

### 2. Obtener Múltiples Tasas

```javascript
// Obtener solo las monedas que necesitas
const rates = await getMultipleExchangeRates('USD', ['CLP', 'EUR', 'CNY', 'BRL']);
console.log(rates); // { CLP: 950, EUR: 0.85, CNY: 7.2, BRL: 5.1 }
```

### 3. Convertir Montos

```javascript
import { convertCurrency } from './exchangeRateService.js';

// Convertir 100 USD a CLP
const amount = await convertCurrency(100, 'USD', 'CLP');
console.log(`100 USD = ${amount} CLP`); // 100 USD = 95000 CLP
```

### 4. Verificar Estado del Caché

```javascript
import { getCacheInfo, getCacheStats } from './exchangeRateService.js';

// Ver información detallada
const info = getCacheInfo();
console.log('Info de caché:', info);
/*
{
  USD: { age: 120000, ageMinutes: 2, valid: true, date: '2026-02-13' },
  EUR: { age: 350000, ageMinutes: 5.83, valid: false, date: '2026-02-13' }
}
*/

// Ver estadísticas generales
const stats = getCacheStats();
console.log(`${stats.validCount} monedas válidas de ${stats.totalCurrencies}`);
```

### 5. Limpiar Caché Manualmente

```javascript
import { clearCache, clearCacheForCurrency } from './exchangeRateService.js';

// Botón para forzar actualización
document.getElementById('refreshBtn').addEventListener('click', () => {
    clearCache(); // Limpia todo el caché
    loadData(); // Recarga datos frescos
});

// Limpiar solo una moneda
clearCacheForCurrency('USD');
```

---

## ⚡ Método 3: Sin Módulos ES6 (Compatibilidad Legacy)

Si prefieres NO usar módulos ES6, copia las funciones directamente a `script.js`:

```javascript
// Al inicio de script.js, antes de las URLs de APIs

// ============================================
// SERVICIO DE COTIZACIONES CON CACHÉ
// ============================================

const EXCHANGE_CACHE = {};
const EXCHANGE_CACHE_DURATION = 5 * 60 * 1000;

async function getCachedExchangeRates(baseCurrency) {
    // Verificar caché
    if (EXCHANGE_CACHE[baseCurrency]) {
        const { data, timestamp } = EXCHANGE_CACHE[baseCurrency];
        if (Date.now() - timestamp < EXCHANGE_CACHE_DURATION) {
            console.log(`✅ Usando caché para ${baseCurrency}`);
            return data;
        }
    }

    // Obtener datos frescos
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const jsonData = await response.json();
        
        EXCHANGE_CACHE[baseCurrency] = {
            data: jsonData.rates,
            timestamp: Date.now()
        };
        
        console.log(`✅ Datos actualizados para ${baseCurrency}`);
        return jsonData.rates;
    } catch (error) {
        // Fallback a caché expirado
        if (EXCHANGE_CACHE[baseCurrency]) {
            console.log(`⚠️ Usando caché expirado para ${baseCurrency}`);
            return EXCHANGE_CACHE[baseCurrency].data;
        }
        throw error;
    }
}

// Usar en tus funciones existentes
async function loadExchangeRateData() {
    try {
        const rates = await getCachedExchangeRates('USD');
        // ... resto de tu lógica
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 📊 Beneficios Esperados

### Antes de la Integración
```
Actualización cada 5 minutos:
- Llamada 1: Mindicador (Dólar, Euro, UF)
- Llamada 2: ExchangeRate (todas las monedas)
- Llamada 3: Cambista (valores bancarios)

Total: 3 llamadas API cada 5 minutos
En 1 hora: 36 llamadas
En 1 día: 864 llamadas
```

### Después de la Integración
```
Actualización cada 5 minutos:
- Llamada 1: Mindicador (sin cambios)
- Caché: ExchangeRate (reutiliza datos)
- Llamada 2: Cambista (sin cambios)

Total: 2 llamadas API cada 5 minutos
En 1 hora: 24 llamadas (-33%)
En 1 día: 576 llamadas (-33%)

✅ Reducción del 33% en llamadas API
✅ Carga más rápida
✅ Menor consumo de recursos
```

---

## 🛠️ Panel de Debug (Opcional)

Agrega un panel para monitorear el caché en tiempo real:

```html
<!-- En index.html, antes del footer -->
<div class="debug-panel" style="display:none;" id="debugPanel">
    <h3>🔍 Debug - Estado del Caché</h3>
    <button onclick="toggleDebug()">Mostrar/Ocultar</button>
    <button onclick="refreshDebugInfo()">Actualizar</button>
    <button onclick="clearAllCache()">Limpiar Caché</button>
    <pre id="debugInfo"></pre>
</div>
```

```javascript
// En script.js
import { getCacheInfo, getCacheStats, clearCache } from './exchangeRateService.js';

function toggleDebug() {
    const panel = document.getElementById('debugPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') {
        refreshDebugInfo();
    }
}

function refreshDebugInfo() {
    const info = getCacheInfo();
    const stats = getCacheStats();
    
    const output = {
        stats: stats,
        currencies: info
    };
    
    document.getElementById('debugInfo').textContent = JSON.stringify(output, null, 2);
}

function clearAllCache() {
    clearCache();
    alert('Caché limpiado. Los próximos datos se cargarán frescos.');
    refreshDebugInfo();
}

// Atajo de teclado: Ctrl+Shift+D
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        toggleDebug();
    }
});
```

---

## ⚙️ Configuración Personalizada

### Cambiar Duración del Caché

En `exchangeRateService.js`, línea 12:

```javascript
// Por defecto: 5 minutos
const CACHE_DURATION = 5 * 60 * 1000;

// Opciones:
const CACHE_DURATION = 1 * 60 * 1000;  // 1 minuto (más actualizaciones)
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos (menos llamadas)
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos (ultra conservador)
```

### Agregar Logging Avanzado

```javascript
// En exchangeRateService.js
const DEBUG_MODE = true; // Cambiar a false en producción

function log(message, level = 'info') {
    if (!DEBUG_MODE) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : '✅';
    console.log(`[${timestamp}] ${prefix} ${message}`);
}
```

---

## 📝 Checklist de Integración

- [ ] Crear archivo `exchangeRateService.js` en el repositorio
- [ ] Modificar `index.html` para cargar el servicio como módulo
- [ ] Agregar imports en `script.js`
- [ ] Reemplazar llamadas directas a ExchangeRate API
- [ ] Agregar precarga de monedas en inicialización
- [ ] Probar funcionamiento en navegador
- [ ] Verificar consola para logs de caché
- [ ] Monitorear reducción de llamadas API
- [ ] (Opcional) Agregar panel de debug
- [ ] (Opcional) Configurar duración de caché personalizada
- [ ] Actualizar README con nueva funcionalidad

---

## 🐛 Solución de Problemas

### Error: "Cannot use import statement outside a module"

**Solución**: Asegúrate de usar `type="module"` en las etiquetas script:

```html
<script type="module" src="exchangeRateService.js"></script>
<script type="module" src="script.js"></script>
```

### Error: "CORS policy blocked"

**Solución**: 
- Usa un servidor local (Live Server, Python HTTP Server)
- NO abras el HTML directamente con `file://`

### Caché no se actualiza

**Verificar**:
```javascript
import { getCacheInfo } from './exchangeRateService.js';
console.log(getCacheInfo());
```

**Limpiar manualmente**:
```javascript
import { clearCache } from './exchangeRateService.js';
clearCache();
```

---

## 🚀 Siguientes Pasos

1. **Implementar integración básica** (Método 1)
2. **Probar en desarrollo** con herramientas de red abiertas
3. **Verificar reducción de llamadas** API
4. **Optimizar con precarga** (Método 2)
5. **Agregar panel de debug** para monitoreo
6. **Documentar en README** la nueva funcionalidad

---

## 💬 Soporte

Si necesitas ayuda con la integración:

1. Revisa la consola del navegador para logs del servicio
2. Verifica que los imports estén correctos
3. Usa `getCacheInfo()` para debugging
4. Abre un issue en GitHub con detalles específicos

---

**Última actualización**: Febrero 13, 2026  
**Versión del servicio**: 1.0.0

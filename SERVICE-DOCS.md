# 💱 Exchange Rate Service - Documentación Completa

## 📚 Índice

1. [Introducción](#-introducción)
2. [Características](#-características)
3. [Instalación y Uso](#-instalación-y-uso)
   - [JavaScript (Versión Navegador)](#javascript-versión-navegador)
   - [JavaScript (Módulos ES6)](#javascript-módulos-es6)
   - [TypeScript](#typescript)
4. [API Reference](#-api-reference)
5. [Ejemplos Prácticos](#-ejemplos-prácticos)
6. [Comparación de Versiones](#-comparación-de-versiones)
7. [Demo Interactiva](#-demo-interactiva)

---

## 🌟 Introducción

Servicio modular para obtener cotizaciones de monedas extranjeras con sistema de caché inteligente, manejo robusto de errores y múltiples funcionalidades.

**Características destacadas:**
- 📂 Caché inteligente de 5 minutos
- 🔄 Reintentos automáticos en caso de fallo
- 📈 Estadísticas de uso y rendimiento
- ⚙️ Configuración flexible
- 📊 160+ monedas soportadas
- 🌍 API gratuita sin límites

---

## ✨ Características

### 💾 Caché Inteligente

```
Primera llamada  →  API (500ms)
Caché válido    →  Local (0ms) ✅
Caché expirado  →  API (500ms)
API caída       →  Caché viejo ⚠️
```

- **Duración**: 5 minutos por defecto (configurable)
- **Fallback**: Usa caché expirado si la API falla
- **Limpieza**: Manual o automática de entradas expiradas
- **Monitoreo**: Información detallada de cada entrada

### 🛡️ Manejo de Errores

- Reintentos automáticos (3 intentos por defecto)
- Delay configurable entre reintentos
- Fallback a caché expirado
- Mensajes descriptivos de error
- Logging opcional

### 📈 Estadísticas

```javascript
{
  totalEntries: 5,
  validEntries: 4,
  expiredEntries: 1,
  apiCalls: 12,
  cacheHits: 45,
  cacheMisses: 12,
  hitRate: 78.95
}
```

### ⚙️ Configuración

```typescript
interface ServiceConfig {
  cacheDuration?: number;      // Duración del caché (ms)
  apiBaseUrl?: string;         // URL base de la API
  enableLogging?: boolean;     // Habilitar logs
  retryAttempts?: number;      // Número de reintentos
  retryDelay?: number;         // Delay entre reintentos (ms)
}
```

---

## 🛠️ Instalación y Uso

### JavaScript (Versión Navegador)

**1. Incluir el script en tu HTML:**

```html
<script src="exchangeRateService.js"></script>
<script>
  // El servicio está disponible globalmente
  const service = window.ExchangeRateService;
  
  // Uso
  service.getExchangeRates('USD').then(rates => {
    console.log(rates);
  });
</script>
```

**Ejemplo completo:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Exchange Rate Demo</title>
</head>
<body>
    <h1>Convertidor de Monedas</h1>
    <input id="amount" type="number" value="100">
    <select id="from">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CLP">CLP</option>
    </select>
    <span>→</span>
    <select id="to">
        <option value="CLP">CLP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
    </select>
    <button onclick="convertir()">Convertir</button>
    <div id="result"></div>

    <script src="exchangeRateService.js"></script>
    <script>
        async function convertir() {
            const amount = document.getElementById('amount').value;
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            
            const result = await ExchangeRateService.convertCurrency(
                parseFloat(amount), from, to
            );
            
            document.getElementById('result').innerHTML = `
                <h2>${result.amount} ${result.fromCurrency} =</h2>
                <h1>${result.convertedAmount} ${result.toCurrency}</h1>
            `;
        }
    </script>
</body>
</html>
```

---

### JavaScript (Módulos ES6)

**1. Importar el módulo:**

```javascript
import * as ExchangeService from './exchangeRateService.js';

// O importar funciones específicas
import { 
  getExchangeRates,
  convertCurrency,
  getCacheInfo 
} from './exchangeRateService.js';
```

**2. Usar en tu aplicación:**

```javascript
// Obtener todas las tasas
const rates = await ExchangeService.getExchangeRates('USD');
console.log(rates.CLP); // 920.5

// Convertir moneda
const conversion = await ExchangeService.convertCurrency(100, 'USD', 'CLP');
console.log(conversion.convertedAmount); // 92050

// Ver caché
const cacheInfo = ExchangeService.getCacheInfo();
console.log(cacheInfo);
```

---

### TypeScript

**1. Instalar dependencias:**

```bash
npm install -D typescript
```

**2. Usar el servicio con tipos:**

```typescript
import { 
  getExchangeRates,
  convertCurrency,
  ConversionResult,
  ServiceStats
} from './typescript/exchangeRateService';

// Tipos automáticos
async function ejemplo() {
  // rates: Record<string, number>
  const rates = await getExchangeRates('USD');
  
  // conversion: ConversionResult
  const conversion = await convertCurrency(100, 'USD', 'EUR');
  
  console.log(conversion.convertedAmount); // Autocompletado!
}
```

**3. Configurar:**

```typescript
import { configure, ServiceConfig } from './typescript/exchangeRateService';

const config: ServiceConfig = {
  cacheDuration: 10 * 60 * 1000, // 10 minutos
  enableLogging: true,
  retryAttempts: 5
};

configure(config);
```

**4. Compilar:**

```bash
cd typescript
tsc
# Los archivos compilados estarán en typescript/dist/
```

---

## 📖 API Reference

### Funciones Principales

#### `getExchangeRates(baseCurrency: string): Promise<Record<string, number>>`

Obtiene todas las tasas de cambio para una moneda base.

```javascript
const rates = await getExchangeRates('USD');
// { EUR: 0.85, CLP: 920.5, GBP: 0.73, ... }
```

**Parámetros:**
- `baseCurrency` (string): Código de moneda base (ej: 'USD', 'EUR')

**Retorna:**
- `Promise<Record<string, number>>`: Objeto con tasas de cambio

---

#### `getExchangeRate(from: string, to: string): Promise<number>`

Obtiene la tasa de cambio entre dos monedas específicas.

```javascript
const rate = await getExchangeRate('USD', 'CLP');
// 920.5
```

**Parámetros:**
- `from` (string): Moneda origen
- `to` (string): Moneda destino

**Retorna:**
- `Promise<number>`: Tasa de cambio

---

#### `getMultipleExchangeRates(base: string, targets: string[]): Promise<Record<string, number>>`

Obtiene tasas para múltiples monedas específicas.

```javascript
const rates = await getMultipleExchangeRates('USD', ['EUR', 'GBP', 'CLP']);
// { EUR: 0.85, GBP: 0.73, CLP: 920.5 }
```

---

#### `convertCurrency(amount: number, from: string, to: string): Promise<ConversionResult>`

Convierte una cantidad de una moneda a otra.

```javascript
const result = await convertCurrency(100, 'USD', 'CLP');
/*
{
  amount: 100,
  fromCurrency: 'USD',
  toCurrency: 'CLP',
  rate: 920.5,
  convertedAmount: 92050,
  timestamp: '2026-02-13T13:00:00.000Z',
  inverse: {
    rate: 0.001086,
    amount: 100
  }
}
*/
```

---

#### `calculateVariation(current: number, previous: number): VariationResult`

Calcula la variación entre dos valores.

```javascript
const variation = calculateVariation(950, 920);
/*
{
  change: 30,
  changePercent: 3.26,
  direction: 'increase',
  formatted: '▲ 3.26%'
}
*/
```

---

### Funciones de Caché

#### `clearCache(): void`

Limpia todo el caché.

```javascript
clearCache();
// Caché limpiado (5 entradas eliminadas)
```

---

#### `clearExpiredCache(): void`

Limpia solo las entradas expiradas.

```javascript
clearExpiredCache();
// Limpiadas 2 entradas expiradas del caché
```

---

#### `getCacheInfo(): CacheInfo`

Obtiene información detallada del caché.

```javascript
const info = getCacheInfo();
/*
{
  USD: {
    age: 120,
    ageFormatted: '2m 0s',
    valid: true,
    expiresIn: 180,
    expiresInFormatted: '3m 0s',
    date: '2026-02-13',
    currencyCount: 162,
    base: 'USD'
  }
}
*/
```

---

#### `getServiceStats(): ServiceStats`

Obtiene estadísticas del servicio.

```javascript
const stats = getServiceStats();
/*
{
  totalEntries: 5,
  validEntries: 4,
  expiredEntries: 1,
  cacheDuration: 300,
  apiCalls: 12,
  cacheHits: 45,
  cacheMisses: 12,
  hitRate: 78.95,
  cacheDetails: { ... }
}
*/
```

---

### Funciones Auxiliares

#### `preloadCurrencies(currencies: string[]): Promise<PreloadResult>`

Precarga tasas para múltiples monedas.

```javascript
const result = await preloadCurrencies(['USD', 'EUR', 'GBP']);
/*
{
  success: ['USD', 'EUR', 'GBP'],
  failed: [],
  totalTime: 1250
}
*/
```

---

#### `isCurrencyAvailable(code: string): Promise<boolean>`

Verifica si una moneda está disponible.

```javascript
const available = await isCurrencyAvailable('BTC');
// true o false
```

---

#### `getAvailableCurrencies(): Promise<string[]>`

Obtiene lista de todas las monedas disponibles.

```javascript
const currencies = await getAvailableCurrencies();
// ['AED', 'AFN', 'ALL', ..., 'ZMW', 'ZWL']
```

---

#### `configure(config: ServiceConfig): void` (Solo TypeScript)

Configura el servicio.

```typescript
configure({
  cacheDuration: 10 * 60 * 1000,
  enableLogging: false,
  retryAttempts: 5,
  retryDelay: 2000
});
```

---

#### `resetStats(): void` (Solo TypeScript)

Reincia las estadísticas.

```typescript
resetStats();
```

---

## 💻 Ejemplos Prácticos

### Ejemplo 1: Convertidor Simple

```javascript
async function convertidor() {
  const amount = 100;
  const from = 'USD';
  const to = 'CLP';
  
  const result = await convertCurrency(amount, from, to);
  
  console.log(`${result.amount} ${result.fromCurrency} = ${result.convertedAmount} ${result.toCurrency}`);
  console.log(`Tasa: ${result.rate}`);
}
```

### Ejemplo 2: Comparador de Monedas

```javascript
async function compararMonedas(base, targets) {
  const rates = await getMultipleExchangeRates(base, targets);
  
  console.log(`Tasas para ${base}:`);
  Object.entries(rates).forEach(([currency, rate]) => {
    console.log(`  1 ${base} = ${rate.toFixed(4)} ${currency}`);
  });
}

compararMonedas('USD', ['EUR', 'GBP', 'CLP', 'JPY']);
```

### Ejemplo 3: Monitor de Variaciones

```javascript
let previousRate = null;

async function monitorear(from, to) {
  setInterval(async () => {
    const currentRate = await getExchangeRate(from, to);
    
    if (previousRate) {
      const variation = calculateVariation(currentRate, previousRate);
      console.log(`${from}/${to}: ${currentRate} ${variation.formatted}`);
      
      if (Math.abs(variation.changePercent) >= 1) {
        console.log('⚠️ ¡Alerta! Variación mayor al 1%');
      }
    }
    
    previousRate = currentRate;
  }, 60000); // Cada minuto
}

monitorear('USD', 'CLP');
```

### Ejemplo 4: Dashboard de Caché

```javascript
async function dashboardCache() {
  const stats = getServiceStats();
  const cacheInfo = getCacheInfo();
  
  console.log('📈 ESTADÍSTICAS DEL SERVICIO');
  console.log(`Total entradas: ${stats.totalEntries}`);
  console.log(`Válidas: ${stats.validEntries}`);
  console.log(`Expiradas: ${stats.expiredEntries}`);
  console.log(`Hit rate: ${stats.hitRate}%`);
  console.log(`API calls: ${stats.apiCalls}`);
  console.log(`Cache hits: ${stats.cacheHits}`);
  console.log(`Cache misses: ${stats.cacheMisses}`);
  
  console.log('\n📂 DETALLE DE CACHÉ');
  Object.entries(cacheInfo).forEach(([currency, info]) => {
    const status = info.valid ? '✅' : '⏰';
    console.log(`${status} ${currency}: ${info.ageFormatted} (${info.currencyCount} monedas)`);
  });
}
```

### Ejemplo 5: Precarga Inteligente

```javascript
async function precargarDatosInicio() {
  console.log('⏳ Precargando datos...');
  
  const monedas = ['USD', 'EUR', 'GBP', 'CLP'];
  const resultado = await preloadCurrencies(monedas);
  
  console.log(`✅ Precarga completada en ${resultado.totalTime}ms`);
  console.log(`Exitosas: ${resultado.success.join(', ')}`);
  
  if (resultado.failed.length > 0) {
    console.log(`❌ Fallidas: ${resultado.failed.map(f => f.currency).join(', ')}`);
  }
}

// Llamar al inicio de la app
precargarDatosInicio();
```

---

## 🔄 Comparación de Versiones

| Característica | JavaScript | TypeScript |
|-----------------|------------|------------|
| Tamaño archivo | 9.8 KB | 14.6 KB |
| Tipos | No | Sí ✅ |
| Autocompletado | Básico | Completo ✨ |
| Validación en compilación | No | Sí ✅ |
| Interfaces exportadas | No | Sí (14 tipos) |
| Configuración | No | Sí ⚙️ |
| Estadísticas avanzadas | Básicas | Completas 📈 |
| Hit rate tracking | No | Sí |
| Reintentos | No | Sí (3x) |
| Logging | Console | Configurable |
| Compatibilidad navegador | Directa | Requiere compilación |
| Documentación | JSDoc | TSDoc + Tipos |

### 🎯 Recomendaciones

**Usa JavaScript si:**
- ✅ Necesitas integración rápida
- ✅ Trabajas solo con HTML/CSS/JS
- ✅ No tienes proceso de build
- ✅ Proyecto pequeño o prototipo

**Usa TypeScript si:**
- ✅ Proyecto mediano/grande
- ✅ Equipo de desarrollo
- ✅ Requieres seguridad de tipos
- ✅ Quieres mejor autocompletado
- ✅ Ya usas TypeScript en el proyecto

---

## 🎮 Demo Interactiva

### Acceder a la Demo

🔗 [Abrir Demo Interactiva](./demo-service.html)

La demo incluye:
- 7 funcionalidades completas
- Console log visual
- Botón para cada función
- Resultados en tiempo real
- Información de caché
- Estadísticas del servicio

### Capturas de la Demo

```
┌──────────────────────────────┐
│  🔧 Exchange Rate Service   │
│         Demo                   │
├──────────────────────────────┤
│ 1️⃣ Obtener Todas las Tasas   │
│ 2️⃣ Tasa Específica           │
│ 3️⃣ Múltiples Tasas           │
│ 4️⃣ Convertir Moneda          │
│ 5️⃣ Información del Caché     │
│ 6️⃣ Estadísticas             │
│ 7️⃣ Monedas Disponibles       │
└──────────────────────────────┘
```

---

## 📝 Notas Finales

### Limitaciones

- **API gratuita**: Sin garantía de uptime 100%
- **Tasa de actualización**: Datos actualizados cada hora aprox.
- **Caché local**: Se pierde al recargar la página
- **Sin autenticación**: Cualquiera puede usar tu key si está expuesta

### Mejores Prácticas

1. **Usar caché**: No hacer llamadas innecesarias a la API
2. **Manejar errores**: Siempre usar try/catch
3. **Validar entradas**: Verificar códigos de moneda antes de llamar
4. **Precarga**: Cargar datos al inicio de la app
5. **Monitorear**: Revisar estadísticas para optimizar

### Próximas Mejoras

- [ ] Soporte para WebSockets (datos en tiempo real)
- [ ] Persistencia del caché en localStorage
- [ ] Historial de tasas
- [ ] Gráficos de tendencias
- [ ] Alertas personalizadas
- [ ] Múltiples proveedores de API
- [ ] Rate limiting configurable

---

## 💬 Soporte

**Desarrollador**: Diego Cabrera  
**GitHub**: [@Diegocabrera91](https://github.com/Diegocabrera91)  
**Repositorio**: [Monitor-monedas-extranjeras](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras)

**Issues**: [Reportar problema](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)

---

## 📜 Licencia

MIT License - Libre para uso comercial y personal

---

**Última actualización**: Febrero 13, 2026 | **Versión**: 2.0.0

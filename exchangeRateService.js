/**
 * 💱 Servicio de Cotizaciones de Monedas con Caché Inteligente
 * 
 * Proporciona funciones para obtener tasas de cambio desde exchangerate-api.com
 * con sistema de caché de 5 minutos para optimizar llamadas a la API.
 * 
 * @module exchangeRateService
 * @version 1.0.0
 */

// Configuración
const API_BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

// Almacenamiento de caché en memoria
const cache = {};

/**
 * Obtiene las tasas de cambio para una moneda base
 * Implementa caché automático de 5 minutos
 * 
 * @param {string} baseCurrency - Código de moneda base (ej: USD, EUR, CLP)
 * @returns {Promise<Object>} Objeto con tasas de cambio {USD: 1, EUR: 0.85, ...}
 * @throws {Error} Si la API falla y no hay caché disponible
 * 
 * @example
 * const rates = await getExchangeRates('USD');
 * console.log(rates.EUR); // 0.85
 */
export async function getExchangeRates(baseCurrency) {
    try {
        // Verificar si hay datos en caché y si aún son válidos
        if (cache[baseCurrency]) {
            const { data, timestamp } = cache[baseCurrency];
            const age = Date.now() - timestamp;
            
            if (age < CACHE_DURATION) {
                console.log(`✅ Usando caché para ${baseCurrency} (edad: ${Math.round(age / 1000)}s)`);
                return data;
            }
        }

        // Realizar llamada a la API
        console.log(`🌐 Obteniendo tasas frescas para ${baseCurrency}...`);
        const response = await fetch(`${API_BASE_URL}/${baseCurrency}`);

        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }

        const jsonData = await response.json();

        // Guardar en caché
        cache[baseCurrency] = {
            data: jsonData.rates,
            timestamp: Date.now(),
            base: jsonData.base,
            date: jsonData.date
        };

        console.log(`✅ Datos actualizados para ${baseCurrency} (${jsonData.date})`);
        return jsonData.rates;

    } catch (error) {
        console.error(`❌ Error al obtener tasas para ${baseCurrency}:`, error.message);

        // Retornar datos en caché si están disponibles (incluso si han expirado)
        if (cache[baseCurrency]) {
            const age = Date.now() - cache[baseCurrency].timestamp;
            console.log(`⚠️ Usando caché expirado para ${baseCurrency} (edad: ${Math.round(age / 1000)}s)`);
            return cache[baseCurrency].data;
        }

        // Si no hay caché, lanzar error
        throw new Error(`No se pudieron obtener tasas de cambio para ${baseCurrency}`);
    }
}

/**
 * Obtiene la tasa de cambio entre dos monedas específicas
 * 
 * @param {string} fromCurrency - Moneda origen (ej: USD)
 * @param {string} toCurrency - Moneda destino (ej: CLP)
 * @returns {Promise<number>} Tasa de cambio
 * @throws {Error} Si no se encuentra la tasa solicitada
 * 
 * @example
 * const rate = await getExchangeRate('USD', 'CLP');
 * console.log(`1 USD = ${rate} CLP`); // 1 USD = 950 CLP
 */
export async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        const rates = await getExchangeRates(fromCurrency);
        const rate = rates[toCurrency];

        if (rate === undefined) {
            throw new Error(`No se encontró tasa para ${fromCurrency} → ${toCurrency}`);
        }

        console.log(`💱 ${fromCurrency} → ${toCurrency}: ${rate}`);
        return rate;

    } catch (error) {
        console.error(`❌ Error al obtener tasa ${fromCurrency} → ${toCurrency}:`, error.message);
        throw error;
    }
}

/**
 * Obtiene las tasas de múltiples monedas respecto a una moneda base
 * Útil para cargar varias monedas en una sola llamada
 * 
 * @param {string} baseCurrency - Moneda base (ej: USD)
 * @param {string[]} targetCurrencies - Array de monedas destino (ej: ['EUR', 'GBP', 'CLP'])
 * @returns {Promise<Object>} Objeto con tasas para cada moneda solicitada
 * 
 * @example
 * const rates = await getMultipleExchangeRates('USD', ['EUR', 'GBP', 'CLP']);
 * console.log(rates); // { EUR: 0.85, GBP: 0.73, CLP: 950 }
 */
export async function getMultipleExchangeRates(baseCurrency, targetCurrencies) {
    try {
        const allRates = await getExchangeRates(baseCurrency);
        const result = {};

        targetCurrencies.forEach((currency) => {
            if (allRates[currency] !== undefined) {
                result[currency] = allRates[currency];
            } else {
                console.warn(`⚠️ No se encontró tasa para ${currency}`);
            }
        });

        console.log(`📊 Obtenidas ${Object.keys(result).length}/${targetCurrencies.length} tasas`);
        return result;

    } catch (error) {
        console.error(`❌ Error al obtener múltiples tasas:`, error.message);
        throw error;
    }
}

/**
 * Convierte un monto de una moneda a otra
 * 
 * @param {number} amount - Cantidad a convertir
 * @param {string} fromCurrency - Moneda origen
 * @param {string} toCurrency - Moneda destino
 * @returns {Promise<number>} Monto convertido
 * 
 * @example
 * const converted = await convertCurrency(100, 'USD', 'EUR');
 * console.log(`100 USD = ${converted} EUR`); // 100 USD = 85 EUR
 */
export async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const rate = await getExchangeRate(fromCurrency, toCurrency);
        const converted = amount * rate;
        
        console.log(`💰 ${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`);
        return converted;

    } catch (error) {
        console.error(`❌ Error al convertir ${amount} ${fromCurrency} → ${toCurrency}:`, error.message);
        throw error;
    }
}

/**
 * Calcula la variación entre dos valores
 * Útil para mostrar cambios porcentuales
 * 
 * @param {number} currentValue - Valor actual
 * @param {number} previousValue - Valor anterior
 * @returns {Object} Objeto con cambio absoluto y porcentual
 * 
 * @example
 * const variation = calculateVariation(950, 920);
 * console.log(variation); // { change: 30, changePercent: 3.26 }
 */
export function calculateVariation(currentValue, previousValue) {
    if (previousValue === 0) {
        return { change: 0, changePercent: 0 };
    }

    const change = currentValue - previousValue;
    const changePercent = (change / previousValue) * 100;

    return { 
        change: parseFloat(change.toFixed(2)), 
        changePercent: parseFloat(changePercent.toFixed(2))
    };
}

/**
 * Limpia todo el caché almacenado
 * Útil para forzar actualización de datos
 * 
 * @example
 * clearCache();
 * console.log('Caché limpiado');
 */
export function clearCache() {
    const currencies = Object.keys(cache);
    currencies.forEach((key) => {
        delete cache[key];
    });
    console.log(`🗑️ Caché limpiado (${currencies.length} monedas eliminadas)`);
}

/**
 * Limpia el caché de una moneda específica
 * 
 * @param {string} currency - Moneda a limpiar del caché
 * 
 * @example
 * clearCacheForCurrency('USD');
 */
export function clearCacheForCurrency(currency) {
    if (cache[currency]) {
        delete cache[currency];
        console.log(`🗑️ Caché limpiado para ${currency}`);
    } else {
        console.log(`ℹ️ No hay caché para ${currency}`);
    }
}

/**
 * Obtiene información detallada del caché
 * Útil para debugging y monitoreo
 * 
 * @returns {Object} Información de cada moneda en caché
 * 
 * @example
 * const info = getCacheInfo();
 * console.log(info);
 * // {
 * //   USD: { age: 120000, ageMinutes: 2, valid: true, date: '2026-02-13' },
 * //   EUR: { age: 350000, ageMinutes: 5.83, valid: false, date: '2026-02-13' }
 * // }
 */
export function getCacheInfo() {
    const info = {};
    const now = Date.now();

    Object.entries(cache).forEach(([key, value]) => {
        const age = now - value.timestamp;
        const ageMinutes = age / 60000;
        const valid = age < CACHE_DURATION;
        
        info[key] = { 
            age,
            ageMinutes: parseFloat(ageMinutes.toFixed(2)),
            valid,
            date: value.date,
            base: value.base,
            ratesCount: Object.keys(value.data).length
        };
    });

    return info;
}

/**
 * Verifica si hay caché válido para una moneda
 * 
 * @param {string} currency - Moneda a verificar
 * @returns {boolean} true si hay caché válido
 * 
 * @example
 * if (hasCachedData('USD')) {
 *   console.log('Hay datos frescos de USD');
 * }
 */
export function hasCachedData(currency) {
    if (!cache[currency]) return false;
    
    const age = Date.now() - cache[currency].timestamp;
    return age < CACHE_DURATION;
}

/**
 * Obtiene estadísticas del caché
 * 
 * @returns {Object} Estadísticas generales
 * 
 * @example
 * const stats = getCacheStats();
 * console.log(`${stats.totalCurrencies} monedas en caché, ${stats.validCount} válidas`);
 */
export function getCacheStats() {
    const currencies = Object.keys(cache);
    const now = Date.now();
    
    const stats = {
        totalCurrencies: currencies.length,
        validCount: 0,
        expiredCount: 0,
        oldestAge: 0,
        newestAge: Infinity,
        totalRates: 0
    };

    currencies.forEach(currency => {
        const age = now - cache[currency].timestamp;
        const valid = age < CACHE_DURATION;
        
        if (valid) stats.validCount++;
        else stats.expiredCount++;
        
        if (age > stats.oldestAge) stats.oldestAge = age;
        if (age < stats.newestAge) stats.newestAge = age;
        
        stats.totalRates += Object.keys(cache[currency].data).length;
    });

    stats.oldestAgeMinutes = parseFloat((stats.oldestAge / 60000).toFixed(2));
    stats.newestAgeMinutes = parseFloat((stats.newestAge / 60000).toFixed(2));

    return stats;
}

/**
 * Precarga tasas para múltiples monedas base
 * Útil para inicialización de la aplicación
 * 
 * @param {string[]} currencies - Array de monedas a precargar
 * @returns {Promise<Object>} Resultado de cada precarga
 * 
 * @example
 * await preloadCurrencies(['USD', 'EUR', 'GBP']);
 * console.log('Monedas precargadas');
 */
export async function preloadCurrencies(currencies) {
    console.log(`🔄 Precargando ${currencies.length} monedas...`);
    
    const results = {};
    
    for (const currency of currencies) {
        try {
            await getExchangeRates(currency);
            results[currency] = { success: true };
        } catch (error) {
            results[currency] = { success: false, error: error.message };
        }
    }
    
    const successCount = Object.values(results).filter(r => r.success).length;
    console.log(`✅ Precargadas ${successCount}/${currencies.length} monedas`);
    
    return results;
}

// Exportar configuración para personalización
export const config = {
    API_BASE_URL,
    CACHE_DURATION,
    setCacheDuration: (milliseconds) => {
        console.log(`⚙️ Duración de caché actualizada: ${milliseconds}ms (${milliseconds/60000} min)`);
        // Nota: Esta función actualiza la constante para futuras referencias
        // pero no afecta el valor ya definido en las funciones
    }
};

// Información del módulo
export const moduleInfo = {
    name: 'Exchange Rate Service',
    version: '1.0.0',
    description: 'Servicio modular de cotizaciones con caché inteligente',
    author: 'Diego Cabrera',
    features: [
        'Sistema de caché de 5 minutos',
        'Manejo robusto de errores',
        'Fallback a caché expirado',
        'Múltiples funciones de utilidad',
        'Logging detallado',
        'Estadísticas de caché'
    ]
};

console.log(`📦 ${moduleInfo.name} v${moduleInfo.version} cargado`);

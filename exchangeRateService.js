/**
 * Servicio para obtener cotizaciones reales de monedas
 * Usando la API gratuita de exchangerate-api.com
 * 
 * Características:
 * - Caché inteligente de 5 minutos
 * - Manejo robusto de errores
 * - Fallback a datos en caché expirados
 * - Funciones modulares y reutilizables
 * - Compatible con JavaScript ES6+
 */

const API_BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

// Objeto para almacenar datos en caché
const cache = {};

/**
 * Obtiene las tasas de cambio para una moneda base
 * @param {string} baseCurrency - Código de moneda base (ej: USD, EUR)
 * @returns {Promise<Object>} Objeto con tasas de cambio
 */
export async function getExchangeRates(baseCurrency) {
  try {
    // Verificar si hay datos en caché y si aún son válidos
    if (cache[baseCurrency]) {
      const { data, timestamp } = cache[baseCurrency];
      const age = Date.now() - timestamp;
      
      if (age < CACHE_DURATION) {
        console.log(`✅ Usando datos en caché para ${baseCurrency} (edad: ${Math.round(age/1000)}s)`);
        return data;
      } else {
        console.log(`⏰ Caché expirado para ${baseCurrency} (edad: ${Math.round(age/1000)}s)`);
      }
    }

    // Realizar llamada a la API
    console.log(`🌐 Obteniendo datos frescos para ${baseCurrency}...`);
    const response = await fetch(`${API_BASE_URL}/${baseCurrency}`);

    if (!response.ok) {
      throw new Error(`Error de API: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();

    // Guardar en caché
    cache[baseCurrency] = {
      data: responseData.rates,
      timestamp: Date.now(),
      base: responseData.base,
      date: responseData.date
    };

    console.log(`✅ Datos actualizados para ${baseCurrency} (${Object.keys(responseData.rates).length} monedas)`);
    return responseData.rates;

  } catch (error) {
    console.error(`❌ Error al obtener tasas de cambio para ${baseCurrency}:`, error.message);

    // Retornar datos en caché si están disponibles (incluso si han expirado)
    if (cache[baseCurrency]) {
      const age = Date.now() - cache[baseCurrency].timestamp;
      console.warn(`⚠️ Retornando datos en caché expirados para ${baseCurrency} (edad: ${Math.round(age/1000)}s)`);
      return cache[baseCurrency].data;
    }

    // Si no hay caché, lanzar error
    throw new Error(`No se pudieron obtener tasas de cambio para ${baseCurrency}`);
  }
}

/**
 * Obtiene la tasa de cambio entre dos monedas específicas
 * @param {string} fromCurrency - Moneda origen
 * @param {string} toCurrency - Moneda destino
 * @returns {Promise<number>} Tasa de cambio
 */
export async function getExchangeRate(fromCurrency, toCurrency) {
  try {
    const rates = await getExchangeRates(fromCurrency);
    const rate = rates[toCurrency];

    if (!rate) {
      throw new Error(`No se encontró tasa para ${fromCurrency} -> ${toCurrency}`);
    }

    console.log(`💱 Tasa ${fromCurrency}/${toCurrency}: ${rate}`);
    return rate;

  } catch (error) {
    console.error(`❌ Error al obtener tasa de cambio ${fromCurrency} -> ${toCurrency}:`, error.message);
    throw error;
  }
}

/**
 * Obtiene las tasas de múltiples monedas respecto a una moneda base
 * @param {string} baseCurrency - Moneda base
 * @param {string[]} targetCurrencies - Array de monedas destino
 * @returns {Promise<Object>} Objeto con tasas para cada moneda
 */
export async function getMultipleExchangeRates(baseCurrency, targetCurrencies) {
  try {
    const allRates = await getExchangeRates(baseCurrency);

    const result = {};
    let found = 0;
    
    targetCurrencies.forEach((currency) => {
      if (allRates[currency]) {
        result[currency] = allRates[currency];
        found++;
      } else {
        console.warn(`⚠️ Moneda ${currency} no encontrada en tasas de ${baseCurrency}`);
      }
    });

    console.log(`✅ Obtenidas ${found}/${targetCurrencies.length} tasas para ${baseCurrency}`);
    return result;

  } catch (error) {
    console.error(`❌ Error al obtener múltiples tasas de cambio:`, error.message);
    throw error;
  }
}

/**
 * Calcula la variación entre dos valores
 * @param {number} currentValue - Valor actual
 * @param {number} previousValue - Valor anterior
 * @returns {Object} Objeto con cambio absoluto y porcentual
 */
export function calculateVariation(currentValue, previousValue) {
  if (previousValue === 0 || !previousValue) {
    return { change: 0, changePercent: 0 };
  }

  const change = currentValue - previousValue;
  const changePercent = (change / previousValue) * 100;

  return { 
    change: parseFloat(change.toFixed(4)), 
    changePercent: parseFloat(changePercent.toFixed(2))
  };
}

/**
 * Limpia el caché completamente
 */
export function clearCache() {
  const keys = Object.keys(cache);
  keys.forEach((key) => {
    delete cache[key];
  });
  console.log(`🗑️ Caché limpiado (${keys.length} entradas eliminadas)`);
}

/**
 * Limpia solo las entradas expiradas del caché
 */
export function clearExpiredCache() {
  const now = Date.now();
  let cleared = 0;

  Object.entries(cache).forEach(([key, value]) => {
    const age = now - value.timestamp;
    if (age >= CACHE_DURATION) {
      delete cache[key];
      cleared++;
    }
  });

  console.log(`🗑️ Limpiadas ${cleared} entradas expiradas del caché`);
}

/**
 * Obtiene información detallada del caché
 * @returns {Object} Información del caché
 */
export function getCacheInfo() {
  const info = {};
  const now = Date.now();

  Object.entries(cache).forEach(([key, value]) => {
    const age = now - value.timestamp;
    const ageSeconds = Math.round(age / 1000);
    const valid = age < CACHE_DURATION;
    const expiresIn = valid ? Math.round((CACHE_DURATION - age) / 1000) : 0;

    info[key] = { 
      age: ageSeconds,
      ageFormatted: formatAge(ageSeconds),
      valid,
      expiresIn: expiresIn,
      expiresInFormatted: formatAge(expiresIn),
      date: value.date,
      currencyCount: Object.keys(value.data).length
    };
  });

  return info;
}

/**
 * Formatea edad en segundos a formato legible
 * @param {number} seconds - Segundos
 * @returns {string} Formato legible
 */
function formatAge(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}

/**
 * Obtiene estadísticas del servicio
 * @returns {Object} Estadísticas
 */
export function getServiceStats() {
  const cacheInfo = getCacheInfo();
  const totalEntries = Object.keys(cache).length;
  const validEntries = Object.values(cacheInfo).filter(info => info.valid).length;
  const expiredEntries = totalEntries - validEntries;

  return {
    totalEntries,
    validEntries,
    expiredEntries,
    cacheDuration: CACHE_DURATION / 1000,
    cacheDetails: cacheInfo
  };
}

/**
 * Convierte una cantidad de una moneda a otra
 * @param {number} amount - Cantidad a convertir
 * @param {string} fromCurrency - Moneda origen
 * @param {string} toCurrency - Moneda destino
 * @returns {Promise<Object>} Objeto con resultado de conversión
 */
export async function convertCurrency(amount, fromCurrency, toCurrency) {
  try {
    const rate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amount * rate;

    return {
      amount,
      fromCurrency,
      toCurrency,
      rate,
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error(`❌ Error al convertir ${amount} ${fromCurrency} a ${toCurrency}:`, error.message);
    throw error;
  }
}

/**
 * Precarga tasas para monedas específicas
 * @param {string[]} currencies - Array de códigos de monedas
 * @returns {Promise<Object>} Resultado de la precarga
 */
export async function preloadCurrencies(currencies) {
  console.log(`⏳ Precargando tasas para ${currencies.length} monedas...`);
  
  const results = {
    success: [],
    failed: []
  };

  for (const currency of currencies) {
    try {
      await getExchangeRates(currency);
      results.success.push(currency);
    } catch (error) {
      results.failed.push({ currency, error: error.message });
    }
  }

  console.log(`✅ Precarga completada: ${results.success.length} exitosas, ${results.failed.length} fallidas`);
  return results;
}

/**
 * Valida si una moneda está disponible
 * @param {string} currencyCode - Código de moneda
 * @returns {Promise<boolean>} True si está disponible
 */
export async function isCurrencyAvailable(currencyCode) {
  try {
    const rates = await getExchangeRates('USD');
    return currencyCode in rates || currencyCode === 'USD';
  } catch (error) {
    console.error(`❌ Error al validar moneda ${currencyCode}:`, error.message);
    return false;
  }
}

/**
 * Obtiene lista de todas las monedas disponibles
 * @returns {Promise<string[]>} Array de códigos de monedas
 */
export async function getAvailableCurrencies() {
  try {
    const rates = await getExchangeRates('USD');
    const currencies = Object.keys(rates);
    currencies.push('USD'); // Agregar la moneda base
    return currencies.sort();
  } catch (error) {
    console.error(`❌ Error al obtener monedas disponibles:`, error.message);
    throw error;
  }
}

// Para uso sin módulos ES6 (compatibilidad con navegadores)
if (typeof window !== 'undefined') {
  window.ExchangeRateService = {
    getExchangeRates,
    getExchangeRate,
    getMultipleExchangeRates,
    calculateVariation,
    clearCache,
    clearExpiredCache,
    getCacheInfo,
    getServiceStats,
    convertCurrency,
    preloadCurrencies,
    isCurrencyAvailable,
    getAvailableCurrencies
  };
}

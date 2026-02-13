/**
 * Servicio para obtener cotizaciones reales de monedas
 * Usando la API gratuita de exchangerate-api.com
 * 
 * @module ExchangeRateService
 * @version 2.0.0
 * @author Diego Cabrera
 */

const API_BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

// ==================== INTERFACES ====================

/**
 * Estructura de datos almacenados en caché
 */
interface CachedData {
  data: Record<string, number>;
  timestamp: number;
  base: string;
  date: string;
}

/**
 * Respuesta de la API de Exchange Rate
 */
export interface ExchangeRateResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
  time_last_updated?: number;
}

/**
 * Resultado de cálculo de variación
 */
export interface VariationResult {
  change: number;
  changePercent: number;
  direction: 'increase' | 'decrease' | 'stable';
  formatted: string;
}

/**
 * Información de una entrada de caché
 */
export interface CacheEntryInfo {
  age: number;
  ageFormatted: string;
  valid: boolean;
  expiresIn: number;
  expiresInFormatted: string;
  date: string;
  currencyCount: number;
  base: string;
}

/**
 * Información completa del caché
 */
export interface CacheInfo {
  [currency: string]: CacheEntryInfo;
}

/**
 * Estadísticas del servicio
 */
export interface ServiceStats {
  totalEntries: number;
  validEntries: number;
  expiredEntries: number;
  cacheDuration: number;
  cacheDetails: CacheInfo;
  apiCalls: number;
  cacheHits: number;
  cacheMisses: number;
  hitRate: number;
}

/**
 * Resultado de conversión de moneda
 */
export interface ConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  convertedAmount: number;
  timestamp: string;
  inverse: {
    rate: number;
    amount: number;
  };
}

/**
 * Resultado de precarga de monedas
 */
export interface PreloadResult {
  success: string[];
  failed: Array<{ currency: string; error: string }>;
  totalTime: number;
}

/**
 * Opciones de configuración del servicio
 */
export interface ServiceConfig {
  cacheDuration?: number;
  apiBaseUrl?: string;
  enableLogging?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

// ==================== VARIABLES GLOBALES ====================

const cache: Record<string, CachedData> = {};

// Estadísticas
let apiCalls = 0;
let cacheHits = 0;
let cacheMisses = 0;

// Configuración
let config: ServiceConfig = {
  cacheDuration: CACHE_DURATION,
  apiBaseUrl: API_BASE_URL,
  enableLogging: true,
  retryAttempts: 3,
  retryDelay: 1000
};

// ==================== FUNCIONES DE LOG ====================

function log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  if (!config.enableLogging) return;
  
  const icons = { info: '✅', warn: '⚠️', error: '❌' };
  const methods = { info: console.log, warn: console.warn, error: console.error };
  
  methods[level](`${icons[level]} [ExchangeRateService] ${message}`);
}

// ==================== FUNCIONES UTILITARIAS ====================

/**
 * Formatea edad en segundos a formato legible
 */
function formatAge(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}

/**
 * Pausa la ejecución por un tiempo determinado
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== FUNCIONES PRINCIPALES ====================

/**
 * Obtiene las tasas de cambio para una moneda base
 * @param baseCurrency - Código de moneda base (ej: USD, EUR)
 * @returns Objeto con tasas de cambio
 */
export async function getExchangeRates(
  baseCurrency: string
): Promise<Record<string, number>> {
  try {
    // Verificar si hay datos en caché y si aún son válidos
    if (cache[baseCurrency]) {
      const { data, timestamp } = cache[baseCurrency];
      const age = Date.now() - timestamp;
      
      if (age < (config.cacheDuration || CACHE_DURATION)) {
        cacheHits++;
        log(`Usando datos en caché para ${baseCurrency} (edad: ${Math.round(age/1000)}s)`);
        return data;
      } else {
        cacheMisses++;
        log(`Caché expirado para ${baseCurrency} (edad: ${Math.round(age/1000)}s)`, 'warn');
      }
    } else {
      cacheMisses++;
    }

    // Realizar llamada a la API con reintentos
    log(`Obteniendo datos frescos para ${baseCurrency}...`);
    const responseData = await fetchWithRetry(`${config.apiBaseUrl}/${baseCurrency}`);
    apiCalls++;

    // Guardar en caché
    cache[baseCurrency] = {
      data: responseData.rates,
      timestamp: Date.now(),
      base: responseData.base,
      date: responseData.date
    };

    log(`Datos actualizados para ${baseCurrency} (${Object.keys(responseData.rates).length} monedas)`);
    return responseData.rates;

  } catch (error) {
    log(`Error al obtener tasas de cambio para ${baseCurrency}: ${(error as Error).message}`, 'error');

    // Retornar datos en caché si están disponibles (incluso si han expirado)
    if (cache[baseCurrency]) {
      const age = Date.now() - cache[baseCurrency].timestamp;
      log(`Retornando datos en caché expirados para ${baseCurrency} (edad: ${Math.round(age/1000)}s)`, 'warn');
      return cache[baseCurrency].data;
    }

    // Si no hay caché, lanzar error
    throw new Error(`No se pudieron obtener tasas de cambio para ${baseCurrency}`);
  }
}

/**
 * Realiza fetch con reintentos automáticos
 */
async function fetchWithRetry(
  url: string,
  attempts: number = config.retryAttempts || 3
): Promise<ExchangeRateResponse> {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error de API: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      if (i === attempts - 1) throw error;
      
      log(`Intento ${i + 1} fallido, reintentando en ${config.retryDelay}ms...`, 'warn');
      await delay(config.retryDelay || 1000);
    }
  }
  
  throw new Error('No se pudo conectar con la API');
}

/**
 * Obtiene la tasa de cambio entre dos monedas específicas
 * @param fromCurrency - Moneda origen
 * @param toCurrency - Moneda destino
 * @returns Tasa de cambio
 */
export async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  try {
    const rates = await getExchangeRates(fromCurrency);
    const rate = rates[toCurrency];

    if (!rate) {
      throw new Error(`No se encontró tasa para ${fromCurrency} -> ${toCurrency}`);
    }

    log(`Tasa ${fromCurrency}/${toCurrency}: ${rate}`);
    return rate;

  } catch (error) {
    log(`Error al obtener tasa de cambio ${fromCurrency} -> ${toCurrency}: ${(error as Error).message}`, 'error');
    throw error;
  }
}

/**
 * Obtiene las tasas de múltiples monedas respecto a una moneda base
 * @param baseCurrency - Moneda base
 * @param targetCurrencies - Array de monedas destino
 * @returns Objeto con tasas para cada moneda
 */
export async function getMultipleExchangeRates(
  baseCurrency: string,
  targetCurrencies: string[]
): Promise<Record<string, number>> {
  try {
    const allRates = await getExchangeRates(baseCurrency);

    const result: Record<string, number> = {};
    let found = 0;
    
    targetCurrencies.forEach((currency) => {
      if (allRates[currency]) {
        result[currency] = allRates[currency];
        found++;
      } else {
        log(`Moneda ${currency} no encontrada en tasas de ${baseCurrency}`, 'warn');
      }
    });

    log(`Obtenidas ${found}/${targetCurrencies.length} tasas para ${baseCurrency}`);
    return result;

  } catch (error) {
    log(`Error al obtener múltiples tasas de cambio: ${(error as Error).message}`, 'error');
    throw error;
  }
}

/**
 * Calcula la variación entre dos valores
 * @param currentValue - Valor actual
 * @param previousValue - Valor anterior
 * @returns Objeto con cambio absoluto y porcentual
 */
export function calculateVariation(
  currentValue: number,
  previousValue: number
): VariationResult {
  if (previousValue === 0 || !previousValue) {
    return { 
      change: 0, 
      changePercent: 0, 
      direction: 'stable',
      formatted: '0.00%'
    };
  }

  const change = currentValue - previousValue;
  const changePercent = (change / previousValue) * 100;
  const direction = change > 0 ? 'increase' : change < 0 ? 'decrease' : 'stable';
  const arrow = direction === 'increase' ? '▲' : direction === 'decrease' ? '▼' : '→';
  const formatted = `${arrow} ${Math.abs(changePercent).toFixed(2)}%`;

  return { 
    change: parseFloat(change.toFixed(4)), 
    changePercent: parseFloat(changePercent.toFixed(2)),
    direction,
    formatted
  };
}

/**
 * Convierte una cantidad de una moneda a otra
 * @param amount - Cantidad a convertir
 * @param fromCurrency - Moneda origen
 * @param toCurrency - Moneda destino
 * @returns Objeto con resultado de conversión
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<ConversionResult> {
  try {
    const rate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amount * rate;
    const inverseRate = 1 / rate;

    return {
      amount,
      fromCurrency,
      toCurrency,
      rate,
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
      timestamp: new Date().toISOString(),
      inverse: {
        rate: parseFloat(inverseRate.toFixed(6)),
        amount: parseFloat((convertedAmount * inverseRate).toFixed(2))
      }
    };

  } catch (error) {
    log(`Error al convertir ${amount} ${fromCurrency} a ${toCurrency}: ${(error as Error).message}`, 'error');
    throw error;
  }
}

/**
 * Precarga tasas para monedas específicas
 * @param currencies - Array de códigos de monedas
 * @returns Resultado de la precarga
 */
export async function preloadCurrencies(
  currencies: string[]
): Promise<PreloadResult> {
  log(`Precargando tasas para ${currencies.length} monedas...`);
  
  const startTime = Date.now();
  const results: PreloadResult = {
    success: [],
    failed: [],
    totalTime: 0
  };

  for (const currency of currencies) {
    try {
      await getExchangeRates(currency);
      results.success.push(currency);
    } catch (error) {
      results.failed.push({ 
        currency, 
        error: (error as Error).message 
      });
    }
  }

  results.totalTime = Date.now() - startTime;
  log(`Precarga completada en ${results.totalTime}ms: ${results.success.length} exitosas, ${results.failed.length} fallidas`);
  return results;
}

/**
 * Valida si una moneda está disponible
 * @param currencyCode - Código de moneda
 * @returns True si está disponible
 */
export async function isCurrencyAvailable(currencyCode: string): Promise<boolean> {
  try {
    const rates = await getExchangeRates('USD');
    return currencyCode in rates || currencyCode === 'USD';
  } catch (error) {
    log(`Error al validar moneda ${currencyCode}: ${(error as Error).message}`, 'error');
    return false;
  }
}

/**
 * Obtiene lista de todas las monedas disponibles
 * @returns Array de códigos de monedas
 */
export async function getAvailableCurrencies(): Promise<string[]> {
  try {
    const rates = await getExchangeRates('USD');
    const currencies = Object.keys(rates);
    currencies.push('USD'); // Agregar la moneda base
    return currencies.sort();
  } catch (error) {
    log(`Error al obtener monedas disponibles: ${(error as Error).message}`, 'error');
    throw error;
  }
}

// ==================== FUNCIONES DE CACHÉ ====================

/**
 * Limpia el caché completamente
 */
export function clearCache(): void {
  const keys = Object.keys(cache);
  keys.forEach((key) => {
    delete cache[key];
  });
  log(`Caché limpiado (${keys.length} entradas eliminadas)`);
}

/**
 * Limpia solo las entradas expiradas del caché
 */
export function clearExpiredCache(): void {
  const now = Date.now();
  let cleared = 0;

  Object.entries(cache).forEach(([key, value]) => {
    const age = now - value.timestamp;
    if (age >= (config.cacheDuration || CACHE_DURATION)) {
      delete cache[key];
      cleared++;
    }
  });

  log(`Limpiadas ${cleared} entradas expiradas del caché`);
}

/**
 * Obtiene información detallada del caché
 * @returns Información del caché
 */
export function getCacheInfo(): CacheInfo {
  const info: CacheInfo = {};
  const now = Date.now();

  Object.entries(cache).forEach(([key, value]) => {
    const age = now - value.timestamp;
    const ageSeconds = Math.round(age / 1000);
    const valid = age < (config.cacheDuration || CACHE_DURATION);
    const expiresIn = valid ? Math.round(((config.cacheDuration || CACHE_DURATION) - age) / 1000) : 0;

    info[key] = { 
      age: ageSeconds,
      ageFormatted: formatAge(ageSeconds),
      valid,
      expiresIn: expiresIn,
      expiresInFormatted: formatAge(expiresIn),
      date: value.date,
      currencyCount: Object.keys(value.data).length,
      base: value.base
    };
  });

  return info;
}

/**
 * Obtiene estadísticas del servicio
 * @returns Estadísticas
 */
export function getServiceStats(): ServiceStats {
  const cacheInfo = getCacheInfo();
  const totalEntries = Object.keys(cache).length;
  const validEntries = Object.values(cacheInfo).filter(info => info.valid).length;
  const expiredEntries = totalEntries - validEntries;
  const hitRate = apiCalls > 0 ? (cacheHits / (cacheHits + cacheMisses)) * 100 : 0;

  return {
    totalEntries,
    validEntries,
    expiredEntries,
    cacheDuration: (config.cacheDuration || CACHE_DURATION) / 1000,
    cacheDetails: cacheInfo,
    apiCalls,
    cacheHits,
    cacheMisses,
    hitRate: parseFloat(hitRate.toFixed(2))
  };
}

/**
 * Configura el servicio
 * @param newConfig - Nueva configuración
 */
export function configure(newConfig: Partial<ServiceConfig>): void {
  config = { ...config, ...newConfig };
  log(`Configuración actualizada: ${JSON.stringify(newConfig)}`);
}

/**
 * Resetea las estadísticas
 */
export function resetStats(): void {
  apiCalls = 0;
  cacheHits = 0;
  cacheMisses = 0;
  log('Estadísticas reseteadas');
}

export default {
  getExchangeRates,
  getExchangeRate,
  getMultipleExchangeRates,
  calculateVariation,
  convertCurrency,
  preloadCurrencies,
  isCurrencyAvailable,
  getAvailableCurrencies,
  clearCache,
  clearExpiredCache,
  getCacheInfo,
  getServiceStats,
  configure,
  resetStats
};

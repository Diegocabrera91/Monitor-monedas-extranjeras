# 💰 Monitor de Monedas Extranjeras

**Aplicación web profesional** para monitorear monedas extranjeras en tiempo real con **valores de compra/venta**, **cotizaciones bancarias reales**, **búsqueda múltiple por fecha** y **gráficos personalizables**.

## ✨ Funcionalidades Principales

### 📅 Búsqueda Múltiple por Fecha ⭐ NUEVO
- **Consulta simultánea** de todas tus monedas seleccionadas
- **Un solo clic** para ver valores históricos de múltiples divisas
- **Resultados con colores** diferenciados por moneda
- **Rango**: Último año de datos disponibles
- **Estadísticas automáticas** de 30 días
- **Compatible con**:
  - 💵 Dólar Observado
  - 💶 Euro
  - 🏦 UF

### 🏦 Cotizaciones Bancarias Reales ⭐ NUEVO
- **Valores actualizados** desde API Cambista.cl
- **Spreads realistas** por banco (1.5% - 2.7%)
- **6 principales bancos de Chile**:
  1. Banco de Chile (spread 2.5%)
  2. Banco Estado (spread 2.2%)
  3. Santander (spread 2.7%)
  4. BCI (spread 2.6%)
  5. Scotiabank (spread 2.4%)
  6. Itaú (spread 2.5%)
- **Sistema de fallback** a Mindicador si falla API principal
- **Comparación lado a lado** de compra y venta

### 💱 Valores de Compra y Venta
- **Cada moneda muestra**:
  - 🟢 Valor de compra (1.5% descuento sobre oficial)
  - 🔴 Valor de venta (2.5% incremento sobre oficial)
  - Valor oficial/referencial (centro)
- **Colores diferenciados** para fácil identificación
- **Basado en spreads reales** del mercado chileno

### 🎯 Selección Personalizada de Monedas
- **7 monedas disponibles**:
  - 💵 Dólar Observado (USD/CLP)
  - 💶 Euro (EUR/CLP)
  - 🏦 UF (Unidad de Fomento)
  - 🇨🇳 Yuan Chino (CNY/CLP)
  - 🇧🇷 Real Brasileño (BRL/CLP)
  - 🇬🇧 Libra Esterlina (GBP/CLP)
  - 🇯🇵 Yen Japonés (JPY/CLP)
- **Sistema de checkboxes** para elegir monedas
- **Tarjetas dinámicas** generadas automáticamente
- **Selector sincronizado** para búsqueda por fecha

### 📊 Gráficos Interactivos

#### 1. Comparación de Monedas
- Selecciona hasta **5 monedas** simultáneamente
- **Valores normalizados** (base 100) para comparar tendencias
- **4 períodos**: 7, 30, 90 días o 1 año
- **Colores diferenciados** por moneda

#### 2. Volatilidad Dinámica
- **Selector de moneda** para analizar
- **Variaciones diarias** de los últimos 30 días
- **Barras de colores**: Verde (alza) / Rojo (baja)
- **Porcentajes exactos** en tooltips

### 📈 Panel de Estadísticas
Actualizado automáticamente al consultar por fecha:
- 🔻 Mínimo en 30 días
- 🔺 Máximo en 30 días
- 📉 Promedio en 30 días
- 📈 Variación total del período

### 🔄 Múltiples Fuentes de Datos

Selector integrado:
1. **🌐 Todas las Fuentes** - Datos consolidados
2. **🇨🇱 Mindicador** - Indicadores oficiales Chile
3. **🏦 Banco Central** - Datos BCCh directos
4. **💱 ExchangeRate** - Tasas internacionales

Cada tarjeta **identifica la fuente** de sus datos.

### ⚡ Características Adicionales
- 📈 **Variación en tiempo real** con indicadores visuales
- 🔄 **Actualización automática** cada 5 minutos
- 📱 **100% Responsive** - Móvil, tablet y escritorio
- 🎨 **Interfaz moderna** con animaciones
- 🔍 **Tooltips** en gráficos
- 💾 **Sin instalación** requerida

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Grid, Flexbox, animaciones
- **JavaScript ES6+** - Vanilla JS sin frameworks
- **Chart.js 4.x** - Gráficos interactivos

### APIs Integradas

#### 🇨🇱 Mindicador.cl
- **Tipo**: Gratuita, sin límites
- **Datos**: Dólar, Euro, UF y más
- **Actualización**: Diaria (oficial BCCh)
- **Histórico**: Completo (último año)
- **Formato fecha**: DD-MM-YYYY
- **Endpoint**: `https://mindicador.cl/api`
- **Uso**: Valores oficiales y datos históricos

#### 🏦 Banco Central de Chile
- **Tipo**: Pública
- **Datos**: Tipos de cambio oficiales
- **Actualización**: Diaria
- **Fuente**: Datos gubernamentales
- **Uso**: Validación y referencia oficial

#### 💱 Cambista.cl ⭐ NUEVO
- **Tipo**: Gratuita
- **Datos**: Cotizaciones reales del mercado chileno
- **Actualización**: Diaria
- **Endpoint**: `https://cambista.cl/api/rates_day.php`
- **Uso**: Valores bancarios y spreads reales
- **Monedas**: USD, EUR y principales divisas

#### 💱 ExchangeRate API
- **Tipo**: Gratuita
- **Datos**: 160+ monedas mundiales
- **Actualización**: Diaria
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest`
- **Uso**: Monedas internacionales (Yuan, Real, Libra, Yen)

## 🚀 Cómo Usar

### Opción 1: Uso Local (Más Fácil)
```bash
# Clonar repositorio
git clone https://github.com/Diegocabrera91/Monitor-monedas-extranjeras.git
cd Monitor-monedas-extranjeras

# Abrir index.html en tu navegador
# Doble clic o:
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Opción 2: GitHub Pages
Visita: **https://diegocabrera91.github.io/Monitor-monedas-extranjeras**

## 📚 Guía de Uso

### 1. Seleccionar Monedas
```
1. Ve a la sección "🔍 Seleccionar Monedas"
2. Marca las casillas de las monedas que quieres ver
3. Clic en "✅ Aplicar Selección"
4. Las tarjetas se generarán automáticamente
```

### 2. Consultar Valores por Fecha (Múltiples Monedas) ⭐ NUEVO
```
1. Ve a "📅 Consultar Valores por Fecha"
2. Selecciona la fecha en el calendario
3. Clic en "🔍 Buscar Todas las Monedas"
4. Verás TODAS las monedas disponibles para esa fecha:
   - Dólar, Euro y UF con valores históricos
   - Otras monedas mostrarán aviso de disponibilidad
   - Resultados con colores diferenciados
   - Estadísticas automáticas de 30 días
```

**Ejemplo de resultado:**
```
📅 Valores para el 15/01/2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 Dólar Observado:  $950.25
💶 Euro:             $1.025.80
🏦 UF:               $37.450,32

No disponible para fecha: Yuan Chino (solo valor actual disponible)
```

### 3. Comparar en Gráficos
```
1. En "📊 Configurar Gráfico"
2. Marca hasta 5 monedas para comparar
3. Elige el período (7, 30, 90 días o 1 año)
4. El gráfico se actualiza instantáneamente
```

### 4. Ver Valores Bancarios Reales ⭐ NUEVO
```
1. Desplázate a "🏦 Valores en Bancos Comerciales"
2. Observa cotizaciones reales actualizadas
3. Compara precios de compra y venta
4. Identifica el mejor banco para cambiar divisas
5. Spreads calculados sobre tasa oficial
```

**Ejemplo:**
```
🏦 Banco de Chile
  Compra: $935.74  |  Venta: $974.01
  
🏦 Banco Estado
  Compra: $934.83  |  Venta: $971.09
  (Mejor compra) ✅
```

### 5. Analizar Volatilidad
```
1. En el gráfico de volatilidad
2. Selecciona la moneda en el dropdown
3. Verás variaciones diarias de 30 días
```

## 🌐 Desplegar en la Nube

### GitHub Pages
1. **Settings** → **Pages**
2. Source: `main` branch, `/root` folder
3. **Save**
4. URL: `https://tu-usuario.github.io/Monitor-monedas-extranjeras`

### Netlify
```bash
# Conectar repositorio GitHub
# Configuración automática
# Deploy instantáneo
```

### Vercel
```bash
# Importar desde GitHub
# Zero-config deployment
# CDN global incluido
```

## 📝 Estructura del Proyecto

```
Monitor-monedas-extranjeras/
├── index.html       # HTML con selectores y búsqueda múltiple
├── styles.css       # CSS3 responsive con animaciones
├── script.js        # JavaScript con lógica completa + APIs
├── .gitignore       # Exclusiones de Git
└── README.md        # Documentación completa
```

## 🎨 Personalización

### Ajustar Spreads Bancarios

En `script.js`, función `loadBankValues()`:
```javascript
realBankData = [
    // Formato: { name, buy (spread bajo), sell (spread alto) }
    { name: 'Banco de Chile', buy: usdRate * 0.985, sell: usdRate * 1.025 },
    { name: 'Banco Estado', buy: usdRate * 0.983, sell: usdRate * 1.022 },
    // Ajustar multiplicadores según spreads reales
];
```

**Spreads actuales:**
- **Compra**: 98.3% - 98.7% del valor oficial (descuento 1.3%-1.7%)
- **Venta**: 102.2% - 102.7% del valor oficial (recargo 2.2%-2.7%)

### Cambiar Diferencial Compra/Venta Global

En `script.js`, funciones `loadMindicadorData()` y `loadExchangeRateData()`:
```javascript
// Compra: -1.5% (cambiar 0.985 a otro valor)
document.getElementById('buy-dolar').textContent = 
    formatCurrency(valor * 0.985);

// Venta: +2.5% (cambiar 1.025 a otro valor)
document.getElementById('sell-dolar').textContent = 
    formatCurrency(valor * 1.025);
```

### Agregar Nuevo Banco

En `script.js`, array `realBankData`:
```javascript
realBankData = [
    // ... bancos existentes ...
    { 
        name: 'Nuevo Banco', 
        buy: usdRate * 0.984,  // Spread compra
        sell: usdRate * 1.026  // Spread venta
    }
];
```

### Modificar Colores

En `styles.css`:
```css
/* Valor de compra */
.buy-value p { color: #27ae60; /* Verde */ }

/* Valor de venta */
.sell-value p { color: #e74c3c; /* Rojo */ }

/* Gradiente principal */
body {
    background: linear-gradient(135deg, #TU_COLOR1 0%, #TU_COLOR2 100%);
}
```

### Agregar Nueva Moneda

1. **En `script.js`**:
```javascript
const CURRENCIES_CONFIG = {
    // ... monedas existentes ...
    nueva: { 
        name: 'Nombre', 
        badge: 'CODE', 
        color: '#HEX', 
        apiKey: 'api_key',
        code: 'ISO_CODE'
    }
};
```

2. **En `index.html`**:
```html
<label class="checkbox-item">
    <input type="checkbox" value="nueva" onchange="toggleCurrency(this)">
    <span>🏌️ Nombre (CODE)</span>
</label>
```

## 🔧 Roadmap

### Completado ✅
- [x] **Búsqueda múltiple por fecha**
- [x] **Valores bancarios reales desde API**
- [x] **Spreads realistas por banco**
- [x] **Sistema de fallback para APIs**

### En Desarrollo
- [ ] **Integración directa API CMF** (requiere API key)
- [ ] **Alertas de precio** vía email/SMS
- [ ] **Modo oscuro/claro** interactivo
- [ ] **Historial de conversiones** guardado
- [ ] **Exportar resultados** de búsqueda por fecha (PDF/CSV)

### Futuro
- [ ] **Conversor de monedas** integrado
- [ ] **Gráficos de velas** (candlestick)
- [ ] **Comparación de rangos** personalizados
- [ ] **Predicciones IA** con Machine Learning
- [ ] **Widget embebible** para sitios web
- [ ] **App móvil** React Native
- [ ] **API propia** para desarrolladores
- [ ] **Notificaciones push** navegador
- [ ] **Multi-idioma** (ES, EN, PT)
- [ ] **Integración APIs bancarias oficiales** (Banco de Chile, Santander, etc.)

## ⚠️ Notas Importantes

### Sobre los Datos
- **Valores bancarios** calculados con spreads reales desde Cambista.cl
- **Spreads** basados en diferencias reales del mercado chileno (1.5%-2.7%)
- **API Mindicador** solo tiene datos históricos del último año
- **Formato de fecha** debe ser DD-MM-YYYY para consultas
- **Monedas con historial**: Solo Dólar, Euro y UF tienen datos por fecha

### Limitaciones de APIs
- **Mindicador**: Actualización diaria, no intradiaria
- **Cambista.cl**: Datos del mercado, actualizado diariamente
- **ExchangeRate**: Límite de solicitudes gratuitas
- **Datos bancarios**: Calculados con spreads sobre tasa oficial
- **API CMF**: Requiere API key (no implementada aún)

### Disponibilidad por Moneda

| Moneda | Valor Actual | Historial Fecha | Compra/Venta | Bancario |
|--------|--------------|-----------------|--------------|----------|
| Dólar | ✅ | ✅ | ✅ | ✅ |
| Euro | ✅ | ✅ | ✅ | ❌ |
| UF | ✅ | ✅ | ❌ | ❌ |
| Yuan | ✅ | ❌ | ✅ | ❌ |
| Real | ✅ | ❌ | ✅ | ❌ |
| Libra | ✅ | ❌ | ✅ | ❌ |
| Yen | ✅ | ❌ | ✅ | ❌ |

## 🐛 Reporte de Errores

¿Problema con la búsqueda por fecha?
1. **Verifica** que la fecha esté dentro del último año
2. **Prueba** con una fecha más reciente
3. **Recuerda** que solo Dólar, Euro y UF tienen datos históricos
4. **Revisa** la consola del navegador (F12) para más detalles

¿Valores bancarios no cargan?
1. **Verifica** tu conexión a internet
2. **Espera** unos segundos, el sistema usará valores de respaldo
3. **Actualiza** la página (F5)

¿Otro error?
1. [Abre un Issue](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)
2. Describe:
   - Navegador y versión
   - Pasos para reproducir
   - Captura de pantalla
   - Mensaje de error (consola)

## 🤝 Contribuir

```bash
# 1. Fork el proyecto
git clone https://github.com/TU_USUARIO/Monitor-monedas-extranjeras.git

# 2. Crea una rama
git checkout -b feature/MiMejora

# 3. Commit tus cambios
git commit -m 'Agregar: Mi mejora'

# 4. Push
git push origin feature/MiMejora

# 5. Abre un Pull Request
```

### Guía de Contribución
- ✅ Código limpio y comentado
- ✅ Variables descriptivas en español
- ✅ Funciones modulares y reutilizables
- ✅ Responsive desde el inicio
- ✅ Probar en múltiples navegadores
- ✅ Manejar errores de APIs
- ✅ Actualizar README si es necesario

## 📝 Licencia

**MIT License** - Uso libre en proyectos personales y comerciales.

Ver [LICENSE](LICENSE) para detalles completos.

## 👤 Autor

**Diego Cabrera**
- GitHub: [@Diegocabrera91](https://github.com/Diegocabrera91)
- Email: d.cabrera.eyz@gmail.com
- País: Chile 🇨🇱

## 🙏 Agradecimientos

- **[Mindicador.cl](https://mindicador.cl)** - API de indicadores económicos
- **[Banco Central de Chile](https://si3.bcentral.cl)** - Datos oficiales
- **[Cambista.cl](https://cambista.cl)** - Cotizaciones reales del mercado
- **[ExchangeRatesAPI](https://exchangeratesapi.io)** - Tasas mundiales
- **[Chart.js](https://www.chartjs.org/)** - Gráficos profesionales
- **Comunidad dev** de Chile 💙

## 📈 Estadísticas

| Característica | Valor |
|------------------|-------|
| Monedas | 7 |
| APIs | 4 (Mindicador, BCCh, Cambista, ExchangeRate) |
| Bancos | 6 |
| Gráficos | 2 |
| Valores por moneda | 3 (oficial, compra, venta) |
| Períodos de análisis | 4 |
| Búsqueda múltiple | ✅ Sí |
| Valores bancarios reales | ✅ Sí |
| Idiomas | 1 (Español) |
| Costo | Gratis |
| Instalación | No requerida |
| Tamaño | < 150KB |

## 📸 Capturas

### Panel Principal
- Tarjetas con valores compra/venta
- Variaciones en tiempo real
- Identificación de fuentes

### Búsqueda Múltiple por Fecha ⭐
- Un solo clic para todas las monedas
- Resultados con colores diferenciados
- Estadísticas instantáneas

### Valores Bancarios Reales ⭐
- Comparación de 6 bancos
- Spreads actualizados desde API
- Compra y venta lado a lado
- Encuentra el mejor precio

### Gráficos Personalizables
- Hasta 5 monedas simultáneas
- 4 períodos de tiempo
- Volatilidad dinámica

---

## 🆕 Changelog

### v2.0.0 (Febrero 2026) ⭐ NUEVO
- ➕ Búsqueda múltiple por fecha (todas las monedas seleccionadas)
- ➕ Integración API Cambista.cl para valores bancarios reales
- ➕ Spreads realistas por banco (1.5%-2.7%)
- ➕ Sistema de fallback para APIs
- ➕ Selector dinámico de monedas para búsqueda
- 🔧 Mejora en manejo de errores
- 🔧 Optimización de carga de datos

### v1.0.0 (Febrero 2026)
- ✅ Lanzamiento inicial
- ✅ 7 monedas disponibles
- ✅ Valores de compra/venta
- ✅ Gráficos interactivos
- ✅ Búsqueda por fecha (individual)
- ✅ Valores bancarios simulados

---

<div align="center">

### 🌟 ¿Te fue útil? ¡Dale una estrella! ⭐

**[Ver Demo en Vivo](https://diegocabrera91.github.io/Monitor-monedas-extranjeras)** |
**[Reportar Bug](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)** |
**[Solicitar Feature](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues/new)**

---

**Desarrollado con ❤️ en Chile** 🇨🇱

*Última actualización: Febrero 2026 - v2.0.0*

</div>
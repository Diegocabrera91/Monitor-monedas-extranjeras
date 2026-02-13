# 💰 Monitor de Monedas Extranjeras

**Aplicación web profesional** para monitorear monedas extranjeras en tiempo real con **valores de compra/venta**, **cotizaciones bancarias**, **consultas por fecha** y **gráficos personalizables**.

## ✨ Funcionalidades Principales

### 💱 Valores de Compra y Venta
- **Cada moneda muestra**:
  - 🟢 Valor de compra (precio al que puedes vender)
  - 🔴 Valor de venta (precio al que puedes comprar)
  - Diferencial calculado automáticamente
- **Colores diferenciados** para fácil identificación
- **Basado en datos** del Banco Central de Chile

### 🏦 Cotizaciones Bancarias
- **6 principales bancos de Chile**:
  - Banco de Chile
  - Banco Estado
  - Santander
  - BCI
  - Scotiabank
  - Itaú
- **Comparación lado a lado** de compra y venta
- **Encuentra el mejor precio** para cambiar divisas

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

### 📅 Consulta por Fecha
- **Buscar valor histórico** de cualquier moneda
- **Rango**: Último año de datos
- **Resultados con**:
  - Valor exacto en la fecha consultada
  - Estadísticas automáticas de 30 días
  - Validación de disponibilidad de datos
- **Formato correcto** DD-MM-YYYY compatible con API Mindicador

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
- **Histórico**: Completo
- **Formato fecha**: DD-MM-YYYY
- **Endpoint**: `https://mindicador.cl/api`

#### 🏦 Banco Central de Chile
- **Tipo**: Pública
- **Datos**: Tipos de cambio oficiales
- **Actualización**: Diaria
- **Fuente**: Datos gubernamentales

#### 💱 ExchangeRate API
- **Tipo**: Gratuita
- **Datos**: 160+ monedas mundiales
- **Actualización**: Diaria
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest`

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

### 2. Consultar Valor por Fecha
```
1. Ve a "📅 Consultar Valor por Fecha"
2. Selecciona la fecha en el calendario
3. Elige la moneda (Dólar, Euro o UF)
4. Clic en "🔍 Buscar"
5. Verás:
   - Valor exacto en esa fecha
   - Estadísticas de 30 días
```

**Nota**: La API solo tiene datos del último año. Si no encuentra datos, prueba con una fecha más reciente.

### 3. Comparar en Gráficos
```
1. En "📊 Configurar Gráfico"
2. Marca hasta 5 monedas para comparar
3. Elige el período (7, 30, 90 días o 1 año)
4. El gráfico se actualiza instantáneamente
```

### 4. Ver Valores Bancarios
```
1. Desplázate a "🏦 Valores en Bancos Comerciales"
2. Compara precios de compra y venta
3. Identifica el mejor banco para cambiar divisas
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
├── index.html       # HTML con selectores y estructura
├── styles.css       # CSS3 responsive con animaciones
├── script.js        # JavaScript con lógica completa
├── .gitignore       # Exclusiones de Git
└── README.md        # Documentación completa
```

## 🎨 Personalización

### Agregar Nuevo Banco

En `script.js`, modifica el array `BANK_DATA`:
```javascript
const BANK_DATA = [
    // ... bancos existentes ...
    { name: 'Nuevo Banco', buy: 920, sell: 950 }
];
```

### Cambiar Diferencial Compra/Venta

En `script.js`, ajusta el porcentaje (actualmente 2%):
```javascript
// Compra: -2%
document.getElementById('buy-dolar').textContent = 
    formatCurrency(valor * 0.98);

// Venta: +2%
document.getElementById('sell-dolar').textContent = 
    formatCurrency(valor * 1.02);
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
        apiKey: 'api_key' 
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

### En Desarrollo
- [ ] **Integración API real** de bancos comerciales
- [ ] **Alertas de precio** vía email/SMS
- [ ] **Modo oscuro/claro** interactivo
- [ ] **Historial de conversiones** guardado

### Futuro
- [ ] **Conversor de monedas** integrado
- [ ] **Exportar datos** (CSV, Excel, PDF)
- [ ] **Gráficos de velas** (candlestick)
- [ ] **Comparación de rangos** personalizados
- [ ] **Predicciones IA** con Machine Learning
- [ ] **Widget embebible** para sitios web
- [ ] **App móvil** React Native
- [ ] **API propia** para desarrolladores
- [ ] **Notificaciones push** navegador
- [ ] **Multi-idioma** (ES, EN, PT)

## ⚠️ Notas Importantes

### Sobre los Datos
- **Valores bancarios** son actualmente simulados para demo
- **Valores de compra/venta** calculados con diferencial estándar del 2%
- **API Mindicador** solo tiene datos del último año
- **Formato de fecha** debe ser DD-MM-YYYY para consultas

### Limitaciones de APIs
- **Mindicador**: Actualización diaria, no intradiaria
- **ExchangeRate**: Límite de solicitudes gratuitas
- **Datos bancarios**: Requieren integración con APIs propietarias

## 🐛 Reporte de Errores

¿Problema con la búsqueda por fecha?
1. **Verifica** que la fecha esté dentro del último año
2. **Prueba** con una fecha más reciente
3. **Revisa** que la moneda tenga datos históricos

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
- ✅ Funciones modulares
- ✅ Responsive desde el inicio
- ✅ Probar en múltiples navegadores
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
- **[ExchangeRatesAPI](https://exchangeratesapi.io)** - Tasas mundiales
- **[Chart.js](https://www.chartjs.org/)** - Gráficos profesionales
- **Comunidad dev** de Chile 💙

## 📈 Estadísticas

| Característica | Valor |
|------------------|-------|
| Monedas | 7 |
| APIs | 3 |
| Bancos | 6 |
| Gráficos | 2 |
| Valores por moneda | 3 (oficial, compra, venta) |
| Períodos de análisis | 4 |
| Idiomas | 1 (Español) |
| Costo | Gratis |
| Instalación | No requerida |
| Tamaño | < 100KB |

## 📸 Capturas

### Panel Principal
- Tarjetas con valores compra/venta
- Variaciones en tiempo real
- Identificación de fuentes

### Valores Bancarios
- Comparación de 6 bancos
- Compra y venta lado a lado
- Encuentra el mejor precio

### Búsqueda por Fecha
- Calendario intuitivo
- Resultados instantáneos
- Estadísticas automáticas

### Gráficos Personalizables
- Hasta 5 monedas simultáneas
- 4 períodos de tiempo
- Volatilidad dinámica

---

<div align="center">

### 🌟 ¿Te fue útil? ¡Dale una estrella! ⭐

**[Ver Demo en Vivo](https://diegocabrera91.github.io/Monitor-monedas-extranjeras)** |
**[Reportar Bug](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)** |
**[Solicitar Feature](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues/new)**

---

**Desarrollado con ❤️ en Chile** 🇨🇱

*Última actualización: Febrero 2026*

</div>
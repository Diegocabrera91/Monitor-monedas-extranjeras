# 💰 Monitor de Monedas Extranjeras

Aplicación web completa en tiempo real para monitorear **10 monedas y criptomonedas** desde **múltiples fuentes confiables**, con gráficos de evolución histórica interactivos.

## 🌟 Características Destacadas

### 💱 10 Monedas Monitoreadas

#### 🇨🇱 Indicadores Chile
- ✅ **Dólar Observado** (oficial del Banco Central)
- ✅ **Dólar Acuerdo** (intercambio)
- ✅ **Euro** (EUR)
- ✅ **UF** (Unidad de Fomento)

#### 🌎 Monedas Latinoamericanas
- 🇦🇷 **Peso Argentino** (ARS)
- 🇧🇷 **Real Brasileño** (BRL)

#### 🌍 Monedas Internacionales
- 🇬🇧 **Libra Esterlina** (GBP)
- 🇯🇵 **Yen Japonés** (JPY)

#### ₿ Criptomonedas
- **Bitcoin** (BTC)
- **Ethereum** (ETH)

### 🔄 Múltiples Fuentes de Datos

Selector integrado que permite elegir entre:
1. **🌐 Todas las APIs** - Datos consolidados de todas las fuentes
2. **🇨🇱 Mindicador** - API oficial de Chile para indicadores económicos
3. **₿ CoinGecko** - Datos de criptomonedas en tiempo real
4. **💱 ExchangeRate** - Tasas de cambio internacionales
5. **💵 DolarAPI** - Especializada en monedas latinoamericanas

Cada tarjeta muestra la **fuente de datos** utilizada para mayor transparencia.

### 📊 4 Gráficos Interactivos

1. **Evolución Histórica del Dólar**
   - Selector de período: 7 días, 30 días, 90 días, 1 año
   - Gráfico de líneas con datos históricos precisos

2. **Comparación de Monedas**
   - Dólar vs Euro vs UF
   - Valores normalizados (base 100) para comparar tendencias

3. **Volatilidad Diaria**
   - Variación porcentual día a día del dólar
   - Gráfico de barras con indicadores visuales

4. **Bitcoin vs Ethereum**
   - Comparación de precios en USD
   - Doble eje Y para mejor visualización
   - Últimos 7 días de datos

### 📊 Panel de Estadísticas
- 🔻 Valor mínimo en 30 días
- 🔺 Valor máximo en 30 días
- 📉 Promedio en 30 días
- 📈 Variación total del período

### ✨ Otras Características
- 📈 **Variación porcentual** en tiempo real con indicadores visuales
- 🔄 **Actualización automática** cada 5 minutos
- 📱 **Diseño responsive** perfecto para móvil y escritorio
- 🎨 **Interfaz moderna** con animaciones fluidas
- 🔍 **Tooltips informativos** en todos los gráficos
- 🔖 **Indicador de fuente** en cada moneda

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Diseño moderno con gradientes, animaciones y responsive
- **JavaScript (Vanilla)** - Lógica sin dependencias de frameworks
- **Chart.js** - Biblioteca líder para gráficos interactivos

### APIs Integradas
- **[Mindicador.cl](https://mindicador.cl)** - Indicadores económicos de Chile
- **[CoinGecko API](https://www.coingecko.com/api)** - Datos de criptomonedas
- **[ExchangeRate API](https://exchangeratesapi.io)** - Tasas de cambio mundiales
- **[DolarAPI](https://dolarapi.com)** - Monedas latinoamericanas

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente (Más Fácil)
1. Descarga o clona este repositorio
2. Abre el archivo `index.html` en tu navegador
3. ¡Listo! No requiere instalación ni servidor

### Opción 2: Clonar Repositorio
```bash
git clone https://github.com/Diegocabrera91/Monitor-monedas-extranjeras.git
cd Monitor-monedas-extranjeras
```

Luego abre `index.html` en tu navegador favorito.

### Opción 3: Ver en Vivo
Visita la versión desplegada en:
**https://diegocabrera91.github.io/Monitor-monedas-extranjeras**

## 🌐 Despliegue en la Nube

### GitHub Pages (Recomendado)
1. Ve a **Settings** de tu repositorio
2. Selecciona **Pages** en el menú lateral
3. En "Source", elige rama `main` y carpeta `/root`
4. Haz clic en **Save**
5. Tu app estará en: `https://tu-usuario.github.io/Monitor-monedas-extranjeras`

### Netlify (Despliegue Instantáneo)
1. Conecta tu repositorio de GitHub
2. El despliegue es automático
3. Obtén un dominio personalizado gratis

### Vercel (Alternativa Rápida)
1. Importa desde GitHub
2. Despliegue automático con cada push
3. CDN global incluido

## 📊 Detalles de las APIs

### 🇨🇱 Mindicador.cl
- **Tipo**: Gratuita, sin límites
- **Datos**: Dólar, Euro, UF y otros indicadores chilenos
- **Actualización**: Diaria (datos oficiales)
- **Histórico**: Hasta 1 año
- **Endpoint**: `https://mindicador.cl/api`

### ₿ CoinGecko
- **Tipo**: Gratuita con límites generosos
- **Datos**: 10,000+ criptomonedas
- **Actualización**: Cada minuto
- **Histórico**: Ilimitado
- **Endpoint**: `https://api.coingecko.com/api/v3`

### 💱 ExchangeRate API
- **Tipo**: Gratuita para uso básico
- **Datos**: 160+ monedas mundiales
- **Actualización**: Diaria
- **Formato**: JSON simple
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest`

### 💵 DolarAPI
- **Tipo**: Gratuita
- **Datos**: Monedas latinoamericanas
- **Actualización**: Tiempo real
- **Especialidad**: Argentina, Chile, Uruguay
- **Endpoint**: `https://dolarapi.com/v1`

## 📝 Estructura del Proyecto

```
Monitor-monedas-extranjeras/
│
├── index.html          # Página principal con estructura HTML
├── styles.css          # Estilos CSS3 con animaciones
├── script.js           # Lógica JavaScript e integración de APIs
├── .gitignore          # Archivos a ignorar en Git
└── README.md           # Documentación completa
```

## 🎨 Personalización

### Cambiar Colores
Edita `styles.css`:
```css
/* Gradiente principal del fondo */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Colores de tarjetas individuales */
.bitcoin .badge { 
    background: #fff3e0; 
    color: #ff6f00; 
}
```

### Agregar Nuevas Monedas
1. Añade una nueva tarjeta en `index.html`
2. Crea la función de carga en `script.js`
3. Integra la API correspondiente

### Modificar Períodos de Actualización
```javascript
// En script.js, cambiar de 5 a X minutos
setInterval(loadData, X * 60 * 1000);
```

## 🔧 Funcionalidades Futuras

- [ ] **Alertas por email/SMS** cuando una moneda alcance cierto valor
- [ ] **Modo oscuro/claro** con switch interactivo
- [ ] **Exportar datos** a CSV, Excel, PDF
- [ ] **Conversor de monedas** integrado
- [ ] **Comparación personalizada** de hasta 5 monedas
- [ ] **Más criptomonedas**: Cardano, Solana, Ripple
- [ ] **Predicciones con IA** usando Machine Learning
- [ ] **Widget embebible** para otros sitios
- [ ] **App móvil** con React Native
- [ ] **Notificaciones push** en el navegador

## 🐛 Reporte de Problemas

Si encuentras algún error o tienes sugerencias:
1. Abre un [Issue](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)
2. Describe el problema detalladamente
3. Incluye capturas de pantalla si es posible

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. **Fork** el proyecto
2. Crea una rama para tu feature:
   ```bash
   git checkout -b feature/NuevaFuncionalidad
   ```
3. **Commit** tus cambios:
   ```bash
   git commit -m 'Agregar nueva funcionalidad X'
   ```
4. **Push** a tu rama:
   ```bash
   git push origin feature/NuevaFuncionalidad
   ```
5. Abre un **Pull Request** con descripción detallada

### Guía de Contribución
- Mantén el código limpio y comentado
- Sigue las convenciones de nombres existentes
- Prueba en múltiples navegadores
- Actualiza el README si agregas features

## 📝 Licencia

Este proyecto está bajo la **Licencia MIT** - puedes usarlo libremente en proyectos personales y comerciales.

Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Diego Cabrera**
- GitHub: [@Diegocabrera91](https://github.com/Diegocabrera91)
- Email: d.cabrera.eyz@gmail.com
- Ubicación: Chile 🇨🇱

## 🙏 Agradecimientos

Gracias a estas plataformas por proporcionar APIs gratuitas:
- [mindicador.cl](https://mindicador.cl) - Indicadores económicos de Chile
- [CoinGecko](https://www.coingecko.com) - Datos de criptomonedas
- [ExchangeRatesAPI](https://exchangeratesapi.io) - Tasas de cambio
- [DolarAPI](https://dolarapi.com) - Monedas latinoamericanas
- [Chart.js](https://www.chartjs.org/) - Librería de gráficos

## 📈 Estadísticas del Proyecto

- **10 Monedas** monitoreadas
- **4 APIs** integradas
- **4 Gráficos** interactivos
- **100% Gratuito** y open source
- **0 Dependencias** de backend
- **Responsive** para todos los dispositivos

---

<div align="center">

### 🌟 Si este proyecto te resultó útil, ¡dale una estrella! ⭐

**[Ver Demo en Vivo](https://diegocabrera91.github.io/Monitor-monedas-extranjeras)** | **[Reportar Bug](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)** | **[Solicitar Feature](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)**

Hecho con ❤️ en Chile 🇨🇱

</div>
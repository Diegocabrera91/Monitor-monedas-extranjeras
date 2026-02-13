# 💰 Monitor de Monedas Extranjeras

**Aplicación web interactiva y personalizable** para monitorear monedas extranjeras en tiempo real con **selección flexible**, **consultas por fecha** y **gráficos dinámicos**.

## ✨ Funcionalidades Principales

### 🎯 Selección Personalizada de Monedas
- **Elige las monedas que quieres ver** con checkboxes intuitivos
- **Hasta 8 monedas disponibles** para monitorear:
  - 💵 Dólar Observado (USD/CLP)
  - 💶 Euro (EUR/CLP)
  - 🏦 UF (Unidad de Fomento)
  - 🇦🇷 Peso Argentino (ARS)
  - 🇧🇷 Real Brasileño (BRL)
  - 🇬🇧 Libra Esterlina (GBP)
  - 🇯🇵 Yen Japonés (JPY)
- **Aplicar selección** instantáneamente con un clic
- **Tarjetas dinámicas** que se generan automáticamente

### 📅 Consulta por Fecha Específica
- **Buscar valor histórico** de cualquier moneda
- **Selector de fecha** con calendario visual
- **Resultados instantáneos** con:
  - Valor exacto en la fecha seleccionada
  - Fecha formateada
  - Estadísticas de 30 días automáticas
- **Validación inteligente** de fechas disponibles

### 📊 Gráficos Personalizables

#### 1. Comparación de Monedas
- **Selecciona hasta 5 monedas** para comparar simultáneamente
- **Valores normalizados** (base 100) para comparar tendencias
- **Períodos ajustables**: 7, 30, 90 días o 1 año
- **Colores únicos** por cada moneda para fácil identificación

#### 2. Volatilidad Dinámica
- **Elige la moneda** a analizar
- **Visualización clara** de variaciones diarias
- **Colores semánticos**: Verde (alza) / Rojo (baja)
- **Últimos 30 días** de datos

### 📈 Panel de Estadísticas
Se actualiza automáticamente al consultar por fecha:
- 🔻 **Mínimo** en 30 días
- 🔺 **Máximo** en 30 días
- 📉 **Promedio** en 30 días
- 📈 **Variación total** del período

### 🔄 Múltiples Fuentes de Datos

Selector de API integrado:
1. **🌐 Todas las APIs** - Consolidado de todas las fuentes
2. **🇨🇱 Mindicador** - Indicadores oficiales de Chile
3. **💱 ExchangeRate** - Tasas de cambio internacionales
4. **💵 DolarAPI** - Monedas latinoamericanas

Cada tarjeta muestra la **fuente de datos** utilizada.

### ⚡ Características Adicionales
- 📈 **Variación en tiempo real** con indicadores visuales (▲▼)
- 🔄 **Actualización automática** cada 5 minutos
- 📱 **100% Responsive** - Perfecto en móvil, tablet y escritorio
- 🎨 **Interfaz moderna** con animaciones fluidas
- 🔍 **Tooltips informativos** en gráficos
- 💾 **Sin instalación** - Solo abre y usa

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica moderna
- **CSS3** - Diseño responsivo con Grid y Flexbox
- **JavaScript ES6+** - Lógica pura sin frameworks
- **Chart.js** - Gráficos interactivos profesionales

### APIs Integradas

#### 🇨🇱 Mindicador.cl
- **Gratuita y sin límites**
- Indicadores económicos oficiales de Chile
- Actualización diaria
- Histórico completo
- **Endpoint**: `https://mindicador.cl/api`

#### 💱 ExchangeRate API
- **Gratuita para uso básico**
- 160+ monedas mundiales
- Actualización diaria
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest`

#### 💵 DolarAPI
- **Gratuita**
- Especializada en América Latina
- Datos en tiempo real
- **Endpoint**: `https://dolarapi.com/v1`

## 🚀 Cómo Usar

### Opción 1: Uso Directo (Recomendado)
1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! No necesitas servidor ni instalaciones

```bash
git clone https://github.com/Diegocabrera91/Monitor-monedas-extranjeras.git
cd Monitor-monedas-extranjeras
# Abre index.html con doble clic o desde tu navegador
```

### Opción 2: Ver Demo en Vivo
Visita: **https://diegocabrera91.github.io/Monitor-monedas-extranjeras**

## 📚 Guía de Uso

### Seleccionar Monedas
1. En la sección **"🔍 Seleccionar Monedas"**
2. Marca/desmarca las casillas de las monedas deseadas
3. Haz clic en **"✅ Aplicar Selección"**
4. Las tarjetas se actualizarán automáticamente

### Consultar por Fecha
1. En la sección **"📅 Consultar Valor por Fecha"**
2. Selecciona la fecha deseada
3. Elige la moneda a consultar
4. Haz clic en **"🔍 Buscar"**
5. Verás el valor exacto y estadísticas automáticas

### Personalizar Gráficos
1. En **"📊 Configurar Gráfico de Comparación"**
2. Selecciona hasta 5 monedas para comparar
3. Elige el período: 7, 30, 90 días o 1 año
4. El gráfico se actualiza instantáneamente

### Analizar Volatilidad
1. Debajo del gráfico de volatilidad
2. Selecciona la moneda en el dropdown
3. El gráfico muestra variaciones diarias de 30 días

## 🌐 Despliegue

### GitHub Pages (Gratis)
1. Ve a **Settings** de tu repositorio
2. Selecciona **Pages**
3. Fuente: Rama `main`, carpeta `/root`
4. Guarda y espera 2-3 minutos
5. URL: `https://tu-usuario.github.io/Monitor-monedas-extranjeras`

### Netlify (Instantáneo)
1. Conecta tu repositorio GitHub
2. Despliegue automático
3. Dominio personalizado gratis
4. SSL incluido

### Vercel (Ultra Rápido)
1. Importa desde GitHub
2. Auto-deploy con cada commit
3. CDN global
4. Analytics incluido

## 📝 Estructura del Proyecto

```
Monitor-monedas-extranjeras/
│
├── index.html          # HTML con selectores y estructura
├── styles.css          # CSS3 con diseño responsive
├── script.js           # JavaScript con lógica dinámica
├── .gitignore          # Archivos ignorados por Git
└── README.md           # Documentación (este archivo)
```

## 🎨 Personalización

### Agregar Nueva Moneda

1. **En `script.js`**, agrega la configuración:
```javascript
const CURRENCIES_CONFIG = {
    // ... monedas existentes ...
    nueva_moneda: { 
        name: 'Nombre Completo', 
        badge: 'CODIGO', 
        color: '#HEX_COLOR', 
        apiKey: 'api_key' 
    }
};
```

2. **En `index.html`**, agrega el checkbox:
```html
<label class="checkbox-item">
    <input type="checkbox" value="nueva_moneda" onchange="toggleCurrency(this)">
    <span>🏌️ Nombre (CODIGO)</span>
</label>
```

### Cambiar Colores del Tema

En `styles.css`:
```css
/* Gradiente principal */
body {
    background: linear-gradient(135deg, #TU_COLOR1 0%, #TU_COLOR2 100%);
}

/* Botones */
.apply-btn {
    background: #TU_COLOR;
}
```

### Ajustar Período de Actualización

En `script.js`:
```javascript
// Cambiar de 5 a X minutos
setInterval(loadData, X * 60 * 1000);
```

## 🔧 Funcionalidades Futuras

- [ ] **Más criptomonedas** (Bitcoin, Ethereum, etc.) como opción
- [ ] **Alertas personalizadas** por email/SMS al alcanzar valores
- [ ] **Modo oscuro/claro** con toggle
- [ ] **Exportar datos** a CSV, Excel, PDF
- [ ] **Conversor integrado** entre todas las monedas
- [ ] **Comparación de rangos** de fechas personalizados
- [ ] **Predicciones con IA** basadas en histórico
- [ ] **Widget embebible** para otros sitios web
- [ ] **App móvil** nativa (React Native)
- [ ] **Notificaciones push** en navegador
- [ ] **Historial de consultas** guardado localmente
- [ ] **Favoritos** para acceso rápido

## 🐛 Reporte de Errores

¿Encontraste un bug?
1. Ve a [Issues](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)
2. Haz clic en "New Issue"
3. Describe el problema con:
   - Navegador y versión
   - Pasos para reproducir
   - Capturas de pantalla
   - Mensaje de error (si aplica)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** este repositorio
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/MiNuevaFuncionalidad
   ```
3. **Commit** tus cambios:
   ```bash
   git commit -m 'Agregar: Mi nueva funcionalidad'
   ```
4. **Push** a tu rama:
   ```bash
   git push origin feature/MiNuevaFuncionalidad
   ```
5. **Abre un Pull Request** con descripción detallada

### Guía de Estilo
- Código limpio y comentado
- Variables en español descriptivas
- Funciones modulares y reutilizables
- Responsive desde el inicio
- Prueba en Chrome, Firefox, Safari, Edge

## 📝 Licencia

Este proyecto está bajo la **Licencia MIT**.

Puedes:
- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

Ver [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Diego Cabrera**
- GitHub: [@Diegocabrera91](https://github.com/Diegocabrera91)
- Email: d.cabrera.eyz@gmail.com
- Ubicación: Chile 🇨🇱

## 🙏 Agradecimientos

Gracias a estas plataformas por proporcionar APIs gratuitas:

- **[Mindicador.cl](https://mindicador.cl)** - Indicadores económicos de Chile
- **[ExchangeRatesAPI](https://exchangeratesapi.io)** - Tasas de cambio globales
- **[DolarAPI](https://dolarapi.com)** - Monedas latinoamericanas
- **[Chart.js](https://www.chartjs.org/)** - Biblioteca de gráficos profesionales
- **Comunidad de desarrolladores** de Chile y Latinoamérica 💙

## 📈 Estadísticas

| Característica | Cantidad |
|------------------|----------|
| Monedas disponibles | 8 |
| APIs integradas | 3 |
| Gráficos interactivos | 2 |
| Tipos de consulta | 2 (tiempo real + fecha) |
| Períodos de análisis | 4 (7, 30, 90, 365 días) |
| Idiomas | Español |
| Costo | 100% Gratis |
| Dependencias backend | 0 |
| Compatibilidad | Todos los navegadores modernos |

## 👁️ Capturas de Pantalla

### Selección de Monedas
![Selector de monedas con checkboxes](#)

### Consulta por Fecha
![Búsqueda histórica con calendario](#)

### Gráficos Dinámicos
![Comparación de múltiples monedas](#)

### Vista Móvil
![Diseño responsive en smartphone](#)

---

<div align="center">

### 🌟 ¿Te gustó el proyecto? ¡Dale una estrella! ⭐

**[Ver Demo](https://diegocabrera91.github.io/Monitor-monedas-extranjeras)** | 
**[Reportar Bug](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues)** | 
**[Solicitar Feature](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras/issues/new)**

---

**Hecho con ❤️ y ☕ en Chile** 🇨🇱

*Última actualización: Febrero 2026*

</div>
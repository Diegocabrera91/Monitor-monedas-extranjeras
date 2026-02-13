# 💰 Monitor de Monedas Extranjeras v2.1.0

## 🌟 Características Principales

Aplicación web moderna y completa para monitorear valores de monedas extranjeras con:

### 🔔 **Sistema de Alertas Automáticas (NUEVO)**
- **Detección automática** de variaciones mayores al 1%
- **Notificaciones flotantes** en tiempo real con animaciones
- **Alertas sonoras** configurables (ON/OFF)
- **Historial completo** de las últimas 20 alertas
- **Panel lateral** deslizante para revisión detallada
- **Diferenciación visual** entre aumentos (📈 verde) y caídas (📉 rojo)
- **Contador en tiempo real** en botón flotante
- **Auto-cierre** de notificaciones después de 10 segundos

### 📅 **Búsqueda Múltiple por Fecha**
- Consulta simultánea de **todas las monedas seleccionadas**
- Datos históricos hasta 1 año atrás
- Resultados con colores diferenciados por moneda
- Estadísticas automáticas del primer resultado

### 💸 **Valores de Compra y Venta**
- Cotizaciones oficiales desde **API Cambista.cl**
- Spreads realistas aplicados a cada moneda
- Valores actualizados cada 5 minutos
- Comparación entre 6 bancos principales

### 🏛️ **Cotizaciones Bancarias Reales**
- Datos desde **Cambista.cl** con spreads del mercado:
  - **Banco Estado**: 1.7% compra / 2.2% venta
  - **BCI**: 1.3% compra / 2.6% venta
  - **Banco de Chile**: 1.5% compra / 2.5% venta
  - **Santander**: 1.4% compra / 2.7% venta
  - **Scotiabank**: 1.6% compra / 2.4% venta
  - **Itaú**: 1.5% compra / 2.5% venta

### 📊 **Gráficos Interactivos**
- Comparación de hasta 5 monedas simultáneas
- Volatilidad diaria con gráficos de barras
- Períodos configurables: 7, 30, 90 días y 1 año
- Valores normalizados para comparación precisa

### ⚙️ **Personalización Total**
- Selección de monedas a monitorear
- Múltiples fuentes de datos (Mindicador, BCCh, ExchangeRate, Cambista)
- Actualización automática cada 5 minutos
- Preferencias guardadas en navegador

---

## 🚨 Sistema de Alertas - Guía Detallada

### 🔔 **¿Cómo Funcionan las Alertas?**

1. **Detección Automática**
   - El sistema compara el valor actual con el valor anterior
   - Si la variación es **≥ 1% o ≤ -1%**, se activa una alerta
   - Aplica a todas las monedas seleccionadas

2. **Notificación Visual**
   - Aparece una **notificación flotante** en la esquina superior derecha
   - Muestra: nombre de moneda, porcentaje, valor actual
   - Se auto-cierra después de 10 segundos
   - Puedes cerrarla manualmente con el botón ×

3. **Alerta Sonora (Opcional)**
   - **Sonido agudo** (800Hz) para aumentos
   - **Sonido grave** (400Hz) para disminuciones
   - Activar/desactivar desde el panel de alertas

4. **Historial de Alertas**
   - Accede al historial con el **botón flotante rojo** (🔔)
   - Muestra las últimas 20 alertas
   - Detalles completos: variación, valor anterior, valor actual, hora
   - Contador visible cuando hay alertas activas

### 🎮 **Controles del Sistema de Alertas**

| Control | Función |
|---------|----------|
| 🔔 **Botón FAB** | Abre/cierra el panel lateral de historial |
| 🔊 **Sonido: ON/OFF** | Activa o desactiva alertas sonoras |
| 🗑️ **Limpiar** | Borra todas las alertas del historial |
| **×** (Notificación) | Cierra una notificación individual |

### 📊 **Ejemplo de Alerta**

```
📈 Dólar Observado
▲ 1.23%
$955.50

Anterior: $944.00
Actual: $955.50
09:45:32
```

---

## 💱 Monedas Disponibles

| Moneda | Código | Valor Actual | Historial | Compra/Venta | Bancario | Alertas |
|--------|---------|--------------|-----------|--------------|----------|---------|
| 💵 Dólar Observado | USD | ✅ | ✅ | ✅ | ✅ | ✅ |
| 💶 Euro | EUR | ✅ | ✅ | ✅ | ❌ | ✅ |
| 🏦 UF | CLF | ✅ | ✅ | ❌ | ❌ | ✅ |
| 🇨🇳 Yuan Chino | CNY | ✅ | ❌ | ✅ | ❌ | ✅ |
| 🇧🇷 Real Brasileño | BRL | ✅ | ❌ | ✅ | ❌ | ✅ |
| 🇬🇧 Libra Esterlina | GBP | ✅ | ❌ | ✅ | ❌ | ✅ |
| 🇯🇵 Yen Japonés | JPY | ✅ | ❌ | ✅ | ❌ | ✅ |

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Animaciones y gradientes modernos
- **JavaScript ES6+** - Lógica dinámica y async/await
- **Chart.js** - Visualizaciones interactivas
- **Web Audio API** - Sistema de alertas sonoras
- **LocalStorage** - Persistencia de preferencias

---

## 🚀 Instalación y Uso

### Opción 1: GitHub Pages (Recomendado)

1. Ve a **Settings** > **Pages**
2. Selecciona **Branch: main** > **/(root)**
3. Guarda y espera 2-3 minutos
4. Accede a: `https://diegocabrera91.github.io/Monitor-monedas-extranjeras/`

### Opción 2: Local

```bash
# Clonar repositorio
git clone https://github.com/Diegocabrera91/Monitor-monedas-extranjeras.git

# Abrir con servidor local
cd Monitor-monedas-extranjeras
python -m http.server 8000
# O usar Live Server de VS Code

# Abrir en navegador
http://localhost:8000
```

---

## 🔧 Configuración Avanzada

### Personalizar Umbral de Alertas

```javascript
// En script.js, línea ~23
const ALERT_THRESHOLD = 1.0; // Cambiar a 0.5 para alertas más sensibles
```

### Modificar Duración de Notificaciones

```javascript
// En script.js, función showAlertNotification(), línea ~136
setTimeout(() => {
    // ...
}, 10000); // Cambiar a 15000 para 15 segundos
```

### Cambiar Sonidos de Alerta

```javascript
// En script.js, función playAlertSound(), líneas ~151-152
oscillator.frequency.value = isIncrease ? 800 : 400;
// Probar: 1000/500 para tonos más marcados
```

### Ajustar Spreads Bancarios

```javascript
// En script.js, función loadBankValues(), líneas ~628-635
realBankData = [
    { 
        name: 'Banco de Chile', 
        buy: usdRate * 0.985,  // -1.5% (cambiar según necesidad)
        sell: usdRate * 1.025  // +2.5%
    },
    // ... demás bancos
];
```

### Aumentar Cantidad de Alertas en Historial

```javascript
// En script.js, función createAlert(), línea ~100
if (alertHistory.length > 20) { // Cambiar a 50 para más alertas
    alertHistory = alertHistory.slice(0, 20);
}
```

---

## 📚 APIs Utilizadas

### 1. **Mindicador.cl**
- **URL**: `https://mindicador.cl/api`
- **Uso**: Dólar, Euro, UF (valores actuales e históricos)
- **Límite**: Sin límite conocido
- **Datos**: Hasta 1 año de historial

### 2. **Cambista.cl**
- **URL**: `https://cambista.cl/api/rates_day.php`
- **Uso**: Cotizaciones reales de bancos chilenos
- **Actualización**: Diaria
- **Formato**: JSON con tasas oficiales

### 3. **ExchangeRate API**
- **URL**: `https://api.exchangerate-api.com/v4/latest/USD`
- **Uso**: Yuan, Real, Libra, Yen
- **Límite**: 1500 requests/mes (gratis)
- **Datos**: Valores actuales en tiempo real

### 4. **Banco Central de Chile**
- **Validación**: Datos oficiales cruzados
- **Uso**: Respaldo y verificación

---

## 📝 Historial de Versiones

### v2.1.0 (2026-02-13) - Sistema de Alertas
- ✅ Detección automática de variaciones >1%
- ✅ Notificaciones flotantes animadas
- ✅ Alertas sonoras configurables
- ✅ Panel lateral de historial
- ✅ Contador de alertas en tiempo real
- ✅ LocalStorage para preferencias
- ✅ Responsive completo para móviles

### v2.0.0 (2026-02-13) - Búsqueda Múltiple y Valores Reales
- ✅ Búsqueda simultánea de todas las monedas por fecha
- ✅ Valores bancarios reales desde API Cambista.cl
- ✅ Spreads realistas por banco (1.3%-2.7%)
- ✅ Sistema de fallback entre APIs
- ✅ Visualización mejorada con colores por moneda

### v1.0.0 (2026-02-12) - Lanzamiento Inicial
- ✅ Monitor de 7 monedas
- ✅ Gráficos comparativos
- ✅ Búsqueda por fecha individual
- ✅ Múltiples fuentes de datos

---

## 👥 Casos de Uso

### 💼 **Para Empresas**
- Monitoreo de tipos de cambio en tiempo real
- Alertas automáticas para decisiones de compra/venta
- Análisis de volatilidad para proyecciones
- Comparación de bancos para transferencias

### 💸 **Para Inversores**
- Seguimiento de múltiples divisas simultáneamente
- Historial de alertas para identificar patrones
- Gráficos de tendencia para estrategias
- Notificaciones de movimientos significativos

### ✈️ **Para Viajeros**
- Comparar mejores tasas entre bancos
- Planificar compra de divisas
- Monitorear monedas de destino

### 🏫 **Para Estudiantes/Investigadores**
- Datos históricos de hasta 1 año
- Exportación visual de gráficos
- Análisis de volatilidad
- Código abierto para aprendizaje

---

## ⚠️ Limitaciones y Consideraciones

### **Datos Históricos**
- Solo **Dólar, Euro y UF** tienen historial disponible
- **API Mindicador** solo guarda el último año
- Otras monedas muestran solo valor actual

### **Valores Bancarios**
- Basados en tasa oficial de **Cambista.cl**
- Spreads son **calculados** según promedios del mercado
- **No son cotizaciones exactas** de cada banco
- Para valores exactos, consultar directamente al banco

### **Alertas**
- Solo detectan variaciones cuando la página está abierta
- No son alertas push/notificaciones de navegador
- Se reinician al cerrar/recargar la página (excepto preferencias)

### **Actualización**
- Automática cada **5 minutos**
- Manual con botón "Actualizar"
- Algunas APIs pueden tener demoras de hasta 15 minutos

---

## 🐛 Solución de Problemas

### No aparecen alertas
1. Verifica que el umbral (1%) se haya superado
2. Asegúrate de que la página esté abierta y activa
3. Revisa la consola del navegador (F12) para errores

### No se escucha el sonido
1. Haz clic en "Sonido: ON" en el panel de alertas
2. Verifica que el navegador permita audio automático
3. Algunos navegadores requieren interacción previa del usuario

### Datos no cargan
1. Verifica tu conexión a internet
2. Algunas APIs pueden estar caídas (sistema usa fallback)
3. Intenta cambiar de fuente de datos en el selector

### Panel de alertas no se abre
1. Limpia caché del navegador (Ctrl + Shift + R)
2. Verifica que JavaScript esté habilitado
3. Prueba en modo incógnito

---

## 🚀 Próximas Mejoras Planificadas

- [ ] Exportación de alertas a CSV/Excel
- [ ] Alertas personalizadas por moneda (umbrales diferentes)
- [ ] Notificaciones push del navegador
- [ ] Modo oscuro
- [ ] Comparación con monedas cripto
- [ ] Widgets embebibles
- [ ] API propia para integraciones
- [ ] Historial de alertas con filtros avanzados

---

## 💬 Contacto y Contribuciones

**Desarrollador**: Diego Cabrera  
**GitHub**: [@Diegocabrera91](https://github.com/Diegocabrera91)  
**Repositorio**: [Monitor-monedas-extranjeras](https://github.com/Diegocabrera91/Monitor-monedas-extranjeras)

### 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar NuevaCaracteristica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

---

## 📜 Licencia

Este proyecto es de **código abierto** y está disponible bajo la licencia MIT.

---

## 🚀 Comienza Ahora

🔗 **[Abrir Aplicación](https://diegocabrera91.github.io/Monitor-monedas-extranjeras/)**

---

### ⭐ Si te resultó útil, ¡dale una estrella al repositorio!

---

**Última actualización**: Febrero 13, 2026 | **Versión**: 2.1.0
# 💵 Monitor de Monedas Extranjeras

Aplicación web en tiempo real para monitorear el valor del dólar, euro, UF y otros indicadores económicos en Chile con gráficos de evolución histórica interactivos.

## 🚀 Características

### 📊 Indicadores en Tiempo Real
- ✅ **Dólar Observado** (oficial del Banco Central)
- ✅ **Dólar Acuerdo** (intercambio)
- ✅ **Euro**
- ✅ **UF** (Unidad de Fomento)
- 🔄 Actualización automática cada 5 minutos
- 📈 Variación porcentual en tiempo real

### 📊 Gráficos Interactivos
1. **Evolución Histórica del Dólar**
   - Selector de período: 7 días, 30 días, 90 días, 1 año
   - Gráfico de líneas con datos precisos

2. **Comparación de Monedas**
   - Dólar vs Euro vs UF
   - Valores normalizados para comparar tendencias

3. **Volatilidad Diaria**
   - Variación porcentual día a día
   - Gráfico de barras con indicadores visuales

### 📊 Estadísticas
- Valor mínimo en 30 días
- Valor máximo en 30 días
- Promedio en 30 días
- Variación total del período

### ✨ Otras Características
- 📱 Diseño responsive (móvil y escritorio)
- 🎨 Interfaz moderna con animaciones
- ⚡ Datos en tiempo real desde API oficial
- 🔍 Tooltips informativos en gráficos

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con animaciones y gradientes
- **JavaScript (Vanilla JS)** - Lógica de aplicación
- **Chart.js** - Biblioteca para gráficos interactivos
- **API mindicador.cl** - Datos oficiales gratuitos y open source

## 📚 Cómo Usar

### Opción 1: Abrir directamente
1. Descarga o clona este repositorio
2. Abre el archivo `index.html` en tu navegador
3. ¡Listo! No requiere instalación de dependencias

### Opción 2: Clonar repositorio
```bash
git clone https://github.com/Diegocabrera91/Monitor-monedas-extranjeras.git
cd Monitor-monedas-extranjeras
```

Luego abre `index.html` en tu navegador favorito.

## 🌐 Despliegue

### GitHub Pages
1. Ve a la configuración de tu repositorio
2. En "Pages", selecciona la rama `main` y la carpeta `/root`
3. Guarda los cambios
4. Tu aplicación estará disponible en: `https://diegocabrera91.github.io/Monitor-monedas-extranjeras`

### Netlify / Vercel
Simplemente conecta tu repositorio de GitHub y el despliegue será automático.

## 📊 API Utilizada

Este proyecto utiliza la API gratuita de **mindicador.cl**:

- **Endpoint principal**: `https://mindicador.cl/api`
- **Dólar específico**: `https://mindicador.cl/api/dolar`
- **Euro**: `https://mindicador.cl/api/euro`
- **UF**: `https://mindicador.cl/api/uf`
- **Documentación**: [mindicador.cl](https://mindicador.cl)

La API proporciona:
- Datos históricos hasta 1 año
- Actualizaciones diarias
- Sin necesidad de API key
- Formato JSON

## 🎨 Personalización

Puedes personalizar los colores y estilos editando el archivo `styles.css`:

- **Colores principales**: Líneas 8-9 (gradiente del fondo)
- **Colores de tarjetas**: Líneas 106-125
- **Animaciones**: Líneas 204-235
- **Tamaños de fuente**: Ajusta `.value` y `.stat-value`

## 📝 Estructura del Proyecto

```
Monitor-monedas-extranjeras/
│
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Lógica de aplicación
├── .gitignore          # Archivos a ignorar en Git
└── README.md           # Documentación
```

## 🔧 Funcionalidades Futuras

- [ ] Agregar más monedas (Peso Argentino, Real Brasileño)
- [ ] Exportar datos a CSV/Excel
- [ ] Alertas por correo cuando el dólar alcance cierto valor
- [ ] Modo oscuro
- [ ] Comparación con dólar paralelo
- [ ] Predicción de tendencias con ML

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la **Licencia MIT**.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 👤 Autor

**Diego Cabrera**
- GitHub: [@Diegocabrera91](https://github.com/Diegocabrera91)

## 🙏 Agradecimientos

- [mindicador.cl](https://mindicador.cl) por proporcionar la API gratuita
- [Chart.js](https://www.chartjs.org/) por la librería de gráficos
- Comunidad de desarrolladores de Chile 🇨🇱

---

⭐ Si este proyecto te resultó útil, no olvides darle una estrella en GitHub!

👉 [Ver Demo en Vivo](https://diegocabrera91.github.io/Monitor-monedas-extranjeras)
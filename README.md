# Proyecto Académico: Explorador Global de Países (API REST)

### Información de la API Utilizada
* **Nombre de la API:** Rest Countries API (v3.1)
* **URL Oficial:** https://restcountries.com/

### Explicación del Funcionamiento de la Página
Esta aplicación web consta de una sola vista dinámica y responsive estructurada mediante HTML5 semántico y CSS Grid/Flexbox. Su propósito principal es el consumo interactivo y asíncrono de un servicio REST externo.

**Lógica de Programación Implementada:**
1. **Petición Asíncrona (`async/await`):** Se realiza una solicitud HTTP de forma segura a los endpoints de la API mediante funciones de flecha nativas.
2. **Transformación de Colecciones (`.map()`):** El arreglo masivo de datos crudos se procesa extrayendo únicamente las propiedades geográficas clave requeridas.
3. **Desestructuración de Objetos:** Se aplica desestructuración limpia directamente dentro de los bucles funcionales para aislar variables como nombres, banderas e idiomas, evitando redundancia de código.
4. **Segmentación Dinámica (`.filter()`):** Un componente selector permite al usuario realizar un filtrado en tiempo real según el continente seleccionado, recalculando los elementos en pantalla de manera inmediata.
5. **Generación Dinámica de Componentes (`.forEach()`):** Las tarjetas visuales no existen previamente en el archivo HTML; el script de JavaScript las inyecta en el DOM de manera automatizada.

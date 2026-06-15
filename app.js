// URL base de la API Pública de Países
const API_URL = 'https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/factbook.json';

// Almacenamiento local de datos para ejecutar filtros en tiempo real
let countriesData = [];

/**
 * 1. Consumo Asíncrono de la API mediante Async/Await y Función Flecha
 */
const fetchCountries = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error en el servicio de datos');
        
        const data = await response.json();
        
        // 2. Uso del método .map() para limpiar y transformar la estructura del arreglo original
        countriesData = data.map(country => {
            // Desestructuración de Objetos Avanzada (Extracción limpia de propiedades)
            const { name, capital, region, population, flags, languages } = country;
            
            return {
                commonName: name?.common || 'No Registrado',
                capitalName: capital ? capital[0] : 'N/A',
                regionName: region || 'N/A',
                populationCount: population?.toLocaleString() || '0',
                flagImg: flags?.png || '',
                langList: languages ? Object.values(languages).join(', ') : 'No especificado'
            };
        });

        // Renderizado inicial con todos los países obtenidos
        renderCards(countriesData);

    } catch (error) {
        console.error('Fallo en la carga:', error);
        document.getElementById('countries-grid').innerHTML = `
            <div class="loading" style="color: red;">
                Error crítico al conectar con la API Pública de Países.
            </div>`;
    }
};

/**
 * 3. Generación Dinámica de Tarjetas usando .forEach() y Funciones Flecha
 */
const renderCards = (list) => {
    const gridContainer = document.getElementById('countries-grid');
    gridContainer.innerHTML = ''; // Limpiar el contenedor (o quitar el mensaje de carga)

    if (list.length === 0) {
        gridContainer.innerHTML = '<div class="loading">No se encontraron registros para este filtro.</div>';
        return;
    }

    // Uso obligatorio de .forEach() para iterar y construir el DOM de forma dinámica
    list.forEach(country => {
        // Desestructuración del objeto ya formateado
        const { commonName, capitalName, regionName, populationCount, flagImg, langList } = country;

        // Construcción semántica de la tarjeta
        const cardElement = document.createElement('article');
        cardElement.classList.add('card');

        cardElement.innerHTML = `
            <img src="${flagImg}" alt="Bandera de ${commonName}" class="card-flag">
            <div class="card-content">
                <h2 class="card-title">${commonName}</h2>
                <p class="card-info"><strong>Capital:</strong> ${capitalName}</p>
                <p class="card-info"><strong>Región:</strong> ${regionName}</p>
                <p class="card-info"><strong>Población:</strong> ${populationCount}</p>
                <p class="card-info"><strong>Idiomas:</strong> ${langList}</p>
            </div>
        `;
        
        gridContainer.appendChild(cardElement);
    });
};

/**
 * 4. Implementación del método .filter() mediante Eventos de Selección
 */
document.getElementById('region-select').addEventListener('change', (e) => {
    const selectedRegion = e.target.value;

    if (selectedRegion === 'all') {
        renderCards(countriesData);
    } else {
        // Uso de .filter() para segmentar el arreglo dinámicamente
        const filteredCountries = countriesData.filter(c => c.regionName === selectedRegion);
        renderCards(filteredCountries);
    }
});

// Inicializar la ejecución del script al cargar la vista
fetchCountries();

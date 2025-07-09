function fetchBear() {
    try {
        const imageUrl = `https://placebear.com/200/300`;

        const resultsDiv = document.getElementById('results');
    
        resultsDiv.innerHTML = `
        <div class="bear-container">
            <img src="${imageUrl}" alt="Zufälliges Bärenbild" onload="console.log('Bild geladen')" onerror="console.log('Fehler beim Laden')">
            <p>Hier! ein Bär! 🐻</p>
        </div>
    `;
    } catch (error) {
        console.log(error);
        document.getElementById('results').innerHTML = '<p>Fehler beim Laden des Bärenbildes.</p>';
    }
}

async function fetchWeather() {
    try {
        //see https://open-meteo.com/en/docs/dwd-api?forecast_days=1&timezone=auto&latitude=50.1155&longitude=8.6842
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=50.1155&longitude=8.6842&hourly=temperature_2m&models=icon_seamless&timezone=auto&forecast_days=1");
        const weatherData = await response.json();
        console.log(weatherData);
        displayWeather(weatherData);
    } catch (error) {
        console.log(error);
        document.getElementById('results').innerHTML = '<p>Fehler beim Laden der Wetterdaten.</p>';
    }
}

function displayWeather(weatherData) {
    const resultsDiv = document.getElementById('results');
    
    if (!weatherData || !weatherData.hourly) {
        resultsDiv.innerHTML = '<p>Keine Wetterdaten verfügbar.</p>';
        return;
    }
    
    const temperatures = weatherData.hourly.temperature_2m;
    const times = weatherData.hourly.time;
    const currentTemp = temperatures[0];
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);
    
    resultsDiv.innerHTML = `
        <div class="weather-container">
            <h3>Wetterdaten für Frankfurt am Main</h3>
            <p><strong>Aktuelle Temperatur:</strong> ${currentTemp}°C</p>
            <p><strong>Höchsttemperatur heute:</strong> ${maxTemp}°C</p>
            <p><strong>Tiefsttemperatur heute:</strong> ${minTemp}°C</p>
        </div>
    `;
}

async function fetchNumberOfDay() {
    try {
        const response = await fetch("https://api.math.tools/numbers/nod");
        const numberData = await response.json();
        console.log(numberData);
        displayNumberOfDay(numberData);
    } catch (error) {
        console.log(error);
        document.getElementById('results').innerHTML = '<p>Fehler beim Laden der Zahl des Tages.</p>';
    }
}

function displayNumberOfDay(numberData) {
    const resultsDiv = document.getElementById('results');
    
    if (!numberData || !numberData.contents || !numberData.contents.nod) {
        resultsDiv.innerHTML = '<p>Keine Zahl des Tages verfügbar.</p>';
        return;
    }
    
    const numbers = numberData.contents.nod.numbers;
    const number = numbers.number;
    const cardinal = numbers.names.cardinal.value;
    const binary = numbers.bases.binary.value;
    const hexadecimal = numbers.bases.hexadecimal.value;
    const roman = numbers.numerals.roman.value;
    const chinese = numbers.numerals.chinese.value;
    const isEven = numbers["general-facts"].even.value;
    const isPrime = numbers["prime-facts"].prime.value;
    const digitsSum = numbers.recreational.digitssum.value;
    const reversed = numbers.recreational.reverse.value;
    
    resultsDiv.innerHTML = `
        <div class="number-container">
            <h3>Zahl des Tages</h3>
            <div class="number-display">${number}</div>
            <div class="number-details">
                <p><strong>Ausgeschrieben:</strong> ${cardinal}</p>
                <p><strong>Römisch:</strong> ${roman}</p>
                <p><strong>Chinesisch:</strong> ${chinese}</p>
                <p><strong>Binär:</strong> ${binary}</p>
                <p><strong>Hexadezimal:</strong> ${hexadecimal}</p>
                <p><strong>Eigenschaften:</strong> ${isEven ? 'Gerade' : 'Ungerade'}, ${isPrime ? 'Primzahl' : 'Keine Primzahl'}</p>
                <p><strong>Quersumme:</strong> ${digitsSum}</p>
                <p><strong>Rückwärts:</strong> ${reversed}</p>
            </div>
            <p>Deine besondere Zahl für heute! 🔢</p>
        </div>
    `;
}


function traduzirDescricao(descricao) {
    const traducoes = {
      'clear sky': 'Céu Limpo',
      'few clouds': 'Poucas Nuvens',
      'scattered clouds': 'Nuvens Dispersas',
      'broken clouds': 'Nuvens Quebradas',
      'shower rain': 'Chuva Rápida',
      'rain': 'Chuva',
      'thunderstorm': 'Trovoadas',
      'snow': 'Neve',
      'mist': 'Nevoeiro',
      'moderate rain': 'Chuva Moderada',
      'thunderstorm with rain': 'Chuva com Trovoada',
      'light rain': 'Chuva Leve',


    };
  

    if (traducoes.hasOwnProperty(descricao)) {
      return traducoes[descricao];
    }

    return descricao;
  }



async function fetchWeather() {
  const cityName = document.getElementById('city').value;


  if (!cityName) {
    alert('Por favor, insira o nome da cidade.');
    return;
  }

  const openCageApiKey = '2d567ed3b42245ef8f80f8314002061d'; 
  const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${openCageApiKey}`;

  try {
    const response = await fetch(openCageUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const latitude = data.results[0].geometry.lat;
      const longitude = data.results[0].geometry.lng;

      const openWeatherMapApiKey = 'da0a073cdfa7d2cde907c4af6f80174c'; 
      const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}&units=metric`;

      try {
        const weatherResponse = await fetch(openWeatherMapUrl);
        const weatherData = await weatherResponse.json();
        const descricaoTraduzida = traduzirDescricao(weatherData.weather[0].description);

        document.getElementById('city-name').textContent = weatherData.name;
        document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
        document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
        document.getElementById('wind').textContent = `${weatherData.wind.speed} m/s`;
     
        document.getElementById('description').textContent =descricaoTraduzida;

        
      } catch (error) {
        alert('Erro ao buscar informações meteorológicas.');
        console.error('Erro na requisição da API do OpenWeatherMap:', error);
      }
    } else {
      alert('Cidade não encontrada.');
    }
  } catch (error) {
    alert('Erro ao buscar informações de localização.');
    console.error('Erro na requisição da API do OpenCage Geocoding:', error);
  }
}

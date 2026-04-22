const API_KEY = 'dde92c2489c2a82f1fe15839b527dd1f';

const weatherGifs = {
  Clear:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M2N0M3Rianc3NGMyaWszYXBta2szbWFoNW92NTNkc2JqbGFqbmt3eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uvA9bmS8ZGbbrsCAtp/giphy.gif',
  Clouds:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NnRlbmQ5OXV2YmJwcm5ib3hvY283dDRhdmtkaGQxeTRzc3J3dDljZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j7CojS5pbO3mzdT9VQ/giphy.gif',
  Rain:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NnRlbmQ5OXV2YmJwcm5ib3hvY283dDRhdmtkaGQxeTRzc3J3dDljZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j7CojS5pbO3mzdT9VQ/giphy.gif',
  Drizzle:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NnRlbmQ5OXV2YmJwcm5ib3hvY283dDRhdmtkaGQxeTRzc3J3dDljZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j7CojS5pbO3mzdT9VQ/giphy.gif',
  Thunderstorm:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NnRlbmQ5OXV2YmJwcm5ib3hvY283dDRhdmtkaGQxeTRzc3J3dDljZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j7CojS5pbO3mzdT9VQ/giphy.gif',
  Snow:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M2N0M3Rianc3NGMyaWszYXBta2szbWFoNW92NTNkc2JqbGFqbmt3eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uvA9bmS8ZGbbrsCAtp/giphy.gif',
  Haze:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NnRlbmQ5OXV2YmJwcm5ib3hvY283dDRhdmtkaGQxeTRzc3J3dDljZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j7CojS5pbO3mzdT9VQ/giphy.gif',
  Mist:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NnRlbmQ5OXV2YmJwcm5ib3hvY283dDRhdmtkaGQxeTRzc3J3dDljZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j7CojS5pbO3mzdT9VQ/giphy.gif',
  Fog:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NnRlbmQ5OXV2YmJwcm5ib3hvY283dDRhdmtkaGQxeTRzc3J3dDljZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j7CojS5pbO3mzdT9VQ/giphy.gif',
  Default:
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M2N0M3Rianc3NGMyaWszYXBta2szbWFoNW92NTNkc2JqbGFqbmt3eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uvA9bmS8ZGbbrsCAtp/giphy.gif',
};

const weatherIcons = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️',
  Haze: '🌫️',
  Dust: '💨',
  Sand: '💨',
  Ash: '🌋',
  Squall: '💨',
  Tornado: '🌪️',
};

function setBackground(condition) {
  const gif = document.getElementById('bg-gif');
  gif.style.opacity = '0';
  setTimeout(() => {
    gif.src = weatherGifs[condition] || weatherGifs.Default;
    gif.style.opacity = '0.5';
  }, 400);
}

function hideAll() {
  ['weather-card', 'error-box', 'loading'].forEach((id) => {
    document.getElementById(id).classList.add('hidden');
  });
}

function showError(msg) {
  hideAll();
  const box = document.getElementById('error-box');
  box.textContent = '⚠ ' + msg;
  box.classList.remove('hidden');
}

async function fetchWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) {
    showError('Please enter a city name.');
    return;
  }
  if (!/^[a-zA-Z\s\-\.]+$/.test(city)) {
    showError('Please enter a valid city name (letters only).');
    return;
  }

  hideAll();
  document.getElementById('loading').classList.remove('hidden');

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    document.getElementById('loading').classList.add('hidden');

    if (res.status === 200) {
      const condition = data.weather[0].main;
      setBackground(condition);

      document.getElementById('w-city').textContent =
        data.name + ', ' + data.sys.country;
      document.getElementById('w-badge').textContent = condition;
      document.getElementById('w-icon').textContent =
        weatherIcons[condition] || '🌡️';
      document.getElementById('w-desc').textContent =
        data.weather[0].description;
      document.getElementById('w-temp').textContent =
        Math.round(data.main.temp) + '°C';
      document.getElementById('w-feels').textContent =
        Math.round(data.main.feels_like) + '°C';
      document.getElementById('w-humidity').textContent =
        data.main.humidity + '%';
      document.getElementById('w-wind').textContent =
        data.wind.speed + ' m/s';
      const vis = data.visibility
        ? (data.visibility / 1000).toFixed(1) + ' km'
        : 'N/A';
      document.getElementById('w-vis').textContent = vis;

      document.getElementById('weather-card').classList.remove('hidden');
    } else {
      showError(data.message || 'City not found. Please try again.');
    }
  } catch (e) {
    document.getElementById('loading').classList.add('hidden');
    showError('Network error. Please check your connection.');
  }
}

function resetApp() {
  document.getElementById('city-input').value = '';
  hideAll();
  const gif = document.getElementById('bg-gif');
  gif.style.opacity = '0';
  setTimeout(() => {
    gif.src = weatherGifs.Default;
    gif.style.opacity = '0.5';
  }, 300);
  document.getElementById('city-input').focus();
}

document.getElementById('city-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') fetchWeather();
});

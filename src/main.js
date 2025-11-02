const { useState, useEffect } = React;

// ===== WEATHER ICONS MAPPING =====
const weatherIcons = {
  'Clear': '☀️',
  'Clouds': '☁️',
  'Rain': '🌧️',
  'Drizzle': '🌦️',
  'Thunderstorm': '⛈️',
  'Snow': '❄️',
  'Mist': '🌫️',
  'Fog': '🌫️',
  'Haze': '🌫️',
  'Smoke': '🌫️',
};

// ===== I18N CONFIG =====
const translations = {
  uk: {
    loading: 'Завантаження погоди',
    error: 'Помилка',
    errorNotFound: 'Місто не знайдено. Перевірте назву та спробуйте ще раз.',
    errorNetwork: 'Помилка мережі. Перевірте підключення до інтернету.',
    errorApi: 'Помилка отримання даних. Спробуйте пізніше.',
    humidity: 'Вологість',
    wind: 'Вітер',
    feelsLike: 'Відчувається',
    searchPlaceholder: 'Введіть назву міста',
    searchButton: 'Знайти',
    retry: 'Спробувати знову',
    helpTooltip: 'Пишіть назву міста лише англійською',
  },
  ru: {
    loading: 'Загрузка погоды',
    error: 'Ошибка',
    errorNotFound: 'Город не найден. Проверьте название и попробуйте снова.',
    errorNetwork: 'Ошибка сети. Проверьте подключение к интернету.',
    errorApi: 'Ошибка получения данных. Попробуйте позже.',
    humidity: 'Влажность',
    wind: 'Ветер',
    feelsLike: 'Ощущается',
    searchPlaceholder: 'Введите название города',
    searchButton: 'Найти',
    retry: 'Попробовать снова',
    helpTooltip: 'Пишите название города только на английском',
  },
  en: {
    loading: 'Loading weather',
    error: 'Error',
    errorNotFound: 'City not found. Check the name and try again.',
    errorNetwork: 'Network error. Check your internet connection.',
    errorApi: 'Error fetching data. Try again later.',
    humidity: 'Humidity',
    wind: 'Wind',
    feelsLike: 'Feels like',
    searchPlaceholder: 'Enter city name',
    searchButton: 'Search',
    retry: 'Try again',
    helpTooltip: 'Write city name in English only',
  }
};

const availableLanguages = [
  { code: 'uk', flag: '🇺🇦' },
  { code: 'ru', flag: '🇷🇺' },
  { code: 'en', flag: '🇬🇧' }
];

// API Language mapping
const apiLangMap = {
  'uk': 'uk',
  'ru': 'ru',
  'en': 'en'
};

// ===== THEME CONFIG =====
const themes = {
  dark: {
    name: 'dark',
    icon: '🌙',
    colors: {
      bodyGradientStart: '#0a0e27',
      bodyGradientEnd: '#1a1d3a',
      cardBackground: 'rgba(255, 255, 255, 0.05)',
      cardBorder: 'rgba(255, 255, 255, 0.1)',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      accentPrimary: '#00f0ff',
      accentSecondary: '#8b5cf6',
      glowColor: 'rgba(0, 240, 255, 0.2)',
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      errorColor: '#ef4444',
      inputBackground: 'rgba(255, 255, 255, 0.08)',
      inputBorder: 'rgba(255, 255, 255, 0.15)',
    }
  },
  light: {
    name: 'light',
    icon: '☀️',
    colors: {
      bodyGradientStart: '#e0f2fe',
      bodyGradientEnd: '#bae6fd',
      cardBackground: 'rgba(255, 255, 255, 0.9)',
      cardBorder: 'rgba(0, 0, 0, 0.1)',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      accentPrimary: '#0ea5e9',
      accentSecondary: '#8b5cf6',
      glowColor: 'rgba(14, 165, 233, 0.15)',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      errorColor: '#dc2626',
      inputBackground: 'rgba(255, 255, 255, 0.8)',
      inputBorder: 'rgba(0, 0, 0, 0.15)',
    }
  }
};

// Застосування CSS змінних теми
const applyTheme = (themeName) => {
  const theme = themes[themeName];
  if (!theme) return;
  
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
};

// Визначення API endpoint залежно від середовища
const getApiEndpoint = () => {
  // Для локальної розробки
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000/api/weather';
  }
  // Для production на Vercel
  return '/api/weather';
};

// ===== WEATHER APP COMPONENT =====
function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [city, setCity] = useState('Lviv');
  const [inputCity, setInputCity] = useState('');
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('weatherLang');
    if (saved && translations[saved]) return saved;
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'uk';
  });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('weatherTheme');
    if (saved && themes[saved]) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'dark';
  });
  
  const [showTooltip, setShowTooltip] = useState(false);

  const t = translations[language];
  const API_ENDPOINT = getApiEndpoint();

  // ===== ЗАСТОСУВАННЯ ТЕМИ ПРИ ЗАВАНТАЖЕННІ =====
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // ===== ФУНКЦІЯ ОТРИМАННЯ ПОГОДИ =====
  const fetchWeather = async (cityName = city) => {
    setIsLoading(true);
    setError(null);
    setErrorType(null);

    try {
      const apiLang = apiLangMap[language];
      const response = await fetch(`${API_ENDPOINT}?city=${encodeURIComponent(cityName)}&lang=${apiLang}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        setErrorType(errorData.type || 'unknown');
        throw new Error(errorData.error || t.error);
      }

      const data = await response.json();
      setWeatherData(data);
      setCity(cityName);
      setInputCity('');
    } catch (err) {
      setError(err.message);
      if (!errorType) {
        setErrorType('network');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ===== ОБРОБКА ПОШУКУ МІСТА =====
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim().length > 0) {
      fetchWeather(inputCity.trim());
    }
  };

  // ===== ЗМІНА МОВИ =====
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('weatherLang', newLang);
  };

  // ===== ЗМІНА ТЕМИ =====
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('weatherTheme', newTheme);
  };

  // ===== ЗАВАНТАЖЕННЯ ДАНИХ ПРИ СТАРТІ АБО ЗМІНІ МОВИ =====
  useEffect(() => {
    fetchWeather();
  }, [language]);

  // ===== ОТРИМАННЯ ІКОНКИ ПОГОДИ =====
  const getWeatherIcon = () => {
    if (!weatherData) return '🌍';
    const condition = weatherData.weather[0].main;
    return weatherIcons[condition] || '🌍';
  };

  // ===== ОТРИМАННЯ ПОВІДОМЛЕННЯ ПРО ПОМИЛКУ =====
  const getErrorMessage = () => {
    switch(errorType) {
      case 'not_found':
        return t.errorNotFound;
      case 'network':
        return t.errorNetwork;
      case 'api_error':
      case 'auth':
      case 'config':
        return t.errorApi;
      default:
        return error || t.error;
    }
  };

  // ===== LOADING STATE =====
  if (isLoading && !weatherData) {
    return (
      <div className="weather-card">
        <div className="loading">{t.loading}</div>
      </div>
    );
  }

  // ===== ERROR STATE =====
  if (error && !weatherData) {
    return (
      <div className="weather-card">
        <div className="error">
          <div className="error-icon">❌</div>
          <div className="error-message">{getErrorMessage()}</div>
          <button className="retry-button" onClick={() => fetchWeather()}>
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  // ===== MAIN RENDER =====
  if (!weatherData) return null;

  return (
    <div className="weather-card">
      {/* HEADER */}
      <div className="weather-header">
        <div className="city-name">{weatherData.name}</div>
        
        <div className="controls">
          {/* THEME TOGGLE */}
          <button 
            className="theme-button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Світла тема' : 'Темна тема'}
          >
            {themes[theme].icon}
          </button>

          {/* LANGUAGE SELECTOR */}
          <div className="language-selector">
            {availableLanguages.map(lang => (
              <button
                key={lang.code}
                className={`lang-button ${language === lang.code ? 'active' : ''}`}
                onClick={() => changeLanguage(lang.code)}
                title={lang.code.toUpperCase()}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CITY SEARCH */}
      <form onSubmit={handleSearch} className="city-input-container">
        <div className="city-input-wrapper">
          <input
            type="text"
            className="city-input"
            placeholder={t.searchPlaceholder}
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            className="help-button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            ?
          </button>
          {showTooltip && (
            <div className="help-tooltip">
              {t.helpTooltip}
            </div>
          )}
        </div>
        <button 
          type="submit"
          className="search-button"
          disabled={isLoading || inputCity.trim().length === 0}
        >
          {isLoading ? '...' : t.searchButton}
        </button>
      </form>

      {/* MAIN CONTENT */}
      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon()}
        </div>
        <div className="temperature">
          {Math.round(weatherData.main.temp)}°
        </div>
        <div className="weather-description">
          {weatherData.weather[0].description}
        </div>
      </div>

      {/* FOOTER - ДОДАТКОВА ІНФОРМАЦІЯ */}
      <div className="weather-footer">
        <div className="weather-detail">
          <div className="detail-icon">💧</div>
          <div className="detail-value">{weatherData.main.humidity}%</div>
          <div className="detail-label">{t.humidity}</div>
        </div>
        
        <div className="weather-detail">
          <div className="detail-icon">💨</div>
          <div className="detail-value">{Math.round(weatherData.wind.speed)} м/с</div>
          <div className="detail-label">{t.wind}</div>
        </div>
        
        <div className="weather-detail">
          <div className="detail-icon">🌡️</div>
          <div className="detail-value">{Math.round(weatherData.main.feels_like)}°</div>
          <div className="detail-label">{t.feelsLike}</div>
        </div>
      </div>
    </div>
  );
}

// ===== RENDER APP =====
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WeatherApp />);

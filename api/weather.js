// api/weather.js - Serverless функція для Vercel
// Це backend код, який захищає API ключ

export default async function handler(req, res) {
  // Дозволяємо CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Обробка preflight запитів
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Отримуємо назву міста і мову з query параметрів
  const { city = 'Lviv', lang = 'uk' } = req.query;
  
  // Валідація назви міста
  if (!city || city.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Назва міста не може бути порожньою',
      type: 'validation'
    });
  }
  
  // API ключ береться з environment змінних Vercel (безпечно!)
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ 
      error: 'API ключ не налаштований на сервері',
      type: 'config'
    });
  }
  
  try {
    // Запит до OpenWeatherMap API з параметром мови
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=${lang}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      // Розрізняємо типи помилок
      if (response.status === 404) {
        return res.status(404).json({
          error: 'Місто не знайдено',
          type: 'not_found'
        });
      } else if (response.status === 401) {
        return res.status(500).json({
          error: 'Помилка автентифікації API',
          type: 'auth'
        });
      } else {
        return res.status(response.status).json({
          error: `Помилка OpenWeatherMap API: ${response.status}`,
          type: 'api_error'
        });
      }
    }
    
    const data = await response.json();
    
    // Повертаємо дані клієнту
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Помилка отримання погоди:', error);
    return res.status(500).json({ 
      error: 'Не вдалося отримати дані про погоду',
      details: error.message,
      type: 'network'
    });
  }
}

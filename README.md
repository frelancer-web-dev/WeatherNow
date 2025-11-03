# ☀️ WeatherNow

A minimalist weather widget with theme switching and multilingual support.

## ✨ Features

- 🌍 Real-time weather data via OpenWeatherMap API
- 🎨 Dark/Light theme with auto-detection
- 🌐 Multilingual support (English, Ukrainian, Russian)
- 🔍 City search functionality
- 💾 Settings saved in localStorage
- 📱 Fully responsive design
- 🔒 Secure API key protection via Vercel serverless function

## 🚀 Demo

[Live Demo]([https://weather-now-demo.vercel.app/])
## 🛠️ Tech Stack

- **Frontend**: React 18, Vanilla CSS
- **Backend**: Vercel Serverless Functions
- **API**: OpenWeatherMap API
- **Hosting**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weathernow.git
cd weathernow
```

2. Get your API key from [OpenWeatherMap](https://openweathermap.org/api)

3. Create `.env.local` file:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

4. Deploy to Vercel:
```bash
vercel
```

Or use the Vercel dashboard and add the environment variable there.

## 🎯 Usage

1. Open the app
2. Enter a city name in English (e.g., "London", "New York")
3. Click "Search" or press Enter
4. Switch themes with 🌙/☀️ button
5. Change language with flag buttons

## 📝 Project Structure

```
weathernow/
├── api/
│   └── weather.js          # Serverless API endpoint
├── src/
│   ├── main.js            # React application
│   ├── main.css           # Styles
│   └── favicon.png        # Icon
├── index.html             # Entry point
├── .gitignore
└── README.md
```

## 🌟 Key Features Explained

### 🔐 Security
API key is stored securely in Vercel environment variables and never exposed to the client.

### 🎨 Themes
- Auto-detects system theme preference
- Smooth transitions between themes
- Settings persist across sessions

### 🌍 Languages
- English, Ukrainian, Russian
- Auto-detects browser language
- API responses in selected language

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes.

## 👤 Author

**Mykola** — Frontend Developer & Designer

- 🐙 GitHub: [@frelancer-web-dev](https://github.com/frelancer-web-dev)
- 💼 Upwork: [Profile](https://www.upwork.com/freelancers/~01dec1110f4bac0e7d)
- 💬 Telegram: [@privatefanat_dep](https://t.me/privatefanat_dep)

## 🤝 AI Co-Author

Developed with support from **Jarvis AI Coder** — AI assistant for web development

---

## 📞 Support

If you have questions or suggestions:
- Create an [Issue](https://github.com/frelancer-web-dev/ai-portfolio-landing/issues)
- Message me on [Telegram](https://t.me/privatefanat_dep)

---

⭐ If this project was helpful, please star it on GitHub!

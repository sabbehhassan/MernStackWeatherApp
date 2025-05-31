import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Sun, CloudRain, Thermometer, Search, Droplet, Wind, Clock, CloudSun, Snowflake
} from 'lucide-react';

const Welcome = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.name) {
      setUser(storedUser.name);
      fetchWeather('Lahore');
    }
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/weather', {
        params: { city: cityName },
      });
      setWeather(res.data);
    } catch (err) {
      setError('City ka weather nahi mila, dobara try karo.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
      setCity('');
    }
  };

  const getWeatherIcon = (description) => {
    if (!description) return <CloudSun size={28} />;
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return <CloudRain size={28} />;
    if (desc.includes('sun')) return <Sun size={28} />;
    if (desc.includes('snow')) return <Snowflake size={28} />;
    return <CloudSun size={28} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#111827] text-white flex flex-col items-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
          🌤️ Welcome, <span className="text-yellow-300">{user}</span>
        </h1>
        <p className="text-center text-gray-300 mb-8 text-lg">Get real-time weather updates for any city</p>

        <motion.form
          onSubmit={handleSearch}
          whileHover={{ scale: 1.02 }}
          className="flex items-center max-w-xl mx-auto mb-12 bg-white rounded-full overflow-hidden shadow-lg border-2 border-yellow-400"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-grow px-5 py-3 text-black placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-5 py-3 transition"
          >
            <Search className="text-black" size={22} />
          </button>
        </motion.form>

        {loading ? (
          <p className="text-center text-lg animate-pulse">⏳ Fetching weather data...</p>
        ) : error ? (
          <p className="text-center text-red-400 font-semibold">{error}</p>
        ) : weather ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                {getWeatherIcon(weather.Description)} {weather.Location}
              </h2>
              <span className="text-sm px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-200">
                {weather.Description}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg font-medium text-gray-100">
              <div className="space-y-3">
                <p className="flex items-center gap-2"><Thermometer size={20} /> <span>Temp:</span> {weather.Temp}°C</p>
                <p className="flex items-center gap-2"><Sun size={20} /> <span>Feels Like:</span> {weather.FeelsLike}°C</p>
                <p className="flex items-center gap-2"><Droplet size={20} /> <span>Humidity:</span> {weather.Humidity}%</p>
                <p className="flex items-center gap-2"><Wind size={20} /> <span>Wind:</span> {weather.Wind} mph ({weather.WindDir})</p>
              </div>
              <div className="space-y-3">
                <p><strong>Pressure:</strong> {weather.Pressure} mb</p>
                <p><strong>UV Index:</strong> {weather.UV}</p>
                <p><strong>Visibility:</strong> {weather.Visibility} km</p>
                <p><strong>Cloud Cover:</strong> {weather.Cloud}%</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-300">
              <Clock size={18} /> <span className="font-medium">Local Time:</span> {weather.Localtime}
            </div>
          </motion.div>
        ) : (
          <p className="text-center text-lg text-gray-300">🔍 Enter a city name to get weather updates</p>
        )}
      </motion.div>
    </div>
  );
};

export default Welcome;

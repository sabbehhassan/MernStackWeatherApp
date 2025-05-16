import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Thermometer, Search, Droplet, Wind, Clock } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-800 to-purple-900 text-white flex flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 flex items-center gap-4">
          👋 Welcome, <span className="text-yellow-300">{user}</span>
        </h1>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          whileHover={{ scale: 1.02 }}
          className="flex items-center max-w-md mx-auto mb-10 bg-white rounded-full overflow-hidden shadow-md border-2 border-yellow-300"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="flex-grow px-5 py-3 text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-3 transition"
          >
            <Search className="text-black" size={20} />
          </button>
        </motion.form>

        {/* Weather card */}
        {loading ? (
          <p className="text-center text-lg animate-pulse">Loading weather data...</p>
        ) : error ? (
          <p className="text-center text-red-400 font-semibold">{error}</p>
        ) : weather ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CloudRain /> {weather.Location}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Thermometer size={20} /> <strong>Temp:</strong> {weather.Temp}°C
                </p>
                <p className="flex items-center gap-2">
                  <Sun size={20} /> <strong>Feels Like:</strong> {weather.FeelsLike}°C
                </p>
                <p className="flex items-center gap-2">
                  <Droplet size={20} /> <strong>Humidity:</strong> {weather.Humidity}%
                </p>
                <p className="flex items-center gap-2">
                  <Wind size={20} /> <strong>Wind:</strong> {weather.Wind} mph ({weather.WindDir})
                </p>
              </div>
              <div className="space-y-2">
                <p><strong>Pressure:</strong> {weather.Pressure} mb</p>
                <p><strong>UV Index:</strong> {weather.UV}</p>
                <p><strong>Visibility:</strong> {weather.Visibility} km</p>
                <p><strong>Cloud Cover:</strong> {weather.Cloud}%</p>
              </div>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-gray-300">
              <Clock size={18} /> Local Time: <span className="font-medium">{weather.Localtime}</span>
            </p>
          </motion.div>
        ) : (
          <p className="text-center text-lg">Search a city to check its weather 🌤️</p>
        )}
      </motion.div>
    </div>
  );
};

export default Welcome;

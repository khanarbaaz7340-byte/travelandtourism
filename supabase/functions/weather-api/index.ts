import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lon, city } = await req.json();
    const apiKey = Deno.env.get('OPENWEATHER_API_KEY');

    if (!apiKey) {
      throw new Error('OpenWeather API key not configured');
    }

    let weatherUrl: string;
    if (lat && lon) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else if (city) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else {
      throw new Error('Either coordinates (lat, lon) or city name is required');
    }

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      throw new Error(weatherData.message || 'Weather API error');
    }

    // Get 5-day forecast
    const forecastUrl = lat && lon 
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    // Determine best time to visit based on weather
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const weatherCondition = weatherData.weather[0].main;

    let bestTimeToVisit = "Good time to explore!";
    let travelSuggestion = "";

    if (temp < 15) {
      bestTimeToVisit = "Cool weather - perfect for indoor activities";
      travelSuggestion = "Visit museums, temples, or covered markets";
    } else if (temp >= 15 && temp <= 30) {
      if (humidity < 70) {
        bestTimeToVisit = "Perfect weather for sightseeing!";
        travelSuggestion = "Great time for outdoor activities and exploration";
      } else {
        bestTimeToVisit = "Comfortable but humid - stay hydrated";
        travelSuggestion = "Consider air-conditioned venues or shaded areas";
      }
    } else {
      bestTimeToVisit = "Hot weather - plan accordingly";
      travelSuggestion = "Visit early morning or evening, stay in shaded areas";
    }

    if (weatherCondition === "Rain") {
      bestTimeToVisit = "Rainy weather - indoor activities recommended";
      travelSuggestion = "Perfect time for museums, shopping malls, or cultural centers";
    }

    return new Response(JSON.stringify({
      current: weatherData,
      forecast: forecastData,
      bestTimeToVisit,
      travelSuggestion,
      location: {
        city: weatherData.name,
        country: weatherData.sys.country,
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in weather-api function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to fetch weather data' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
import { useState, useEffect } from "react";
import { Cloud, MapPin, Thermometer, Wind, Droplets, Eye, Calendar, Navigation, AlertTriangle, Search, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WeatherData {
  current: any;
  forecast: any;
  bestTimeToVisit: string;
  travelSuggestion: string;
  location: {
    city: string;
    country: string;
    lat: number;
    lon: number;
  };
}

const EnhancedWeatherNews = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const { toast } = useToast();

  // Indian cities for quick selection
  const popularCities = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Pune", 
    "Hyderabad", "Ahmedabad", "Jaipur", "Goa", "Kochi", "Agra"
  ];

  // Mock news data - can be enhanced with real news API
  const newsData = [
    {
      id: 1,
      title: "Incredible India Tourism Campaign Launched for 2024",
      summary: "Government launches new initiative to promote domestic and international tourism with focus on sustainable travel.",
      category: "Tourism",
      location: "New Delhi",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Digital Nomad Visa Program Extended",
      summary: "India extends digital nomad visa program making it easier for remote workers to explore the country.",
      category: "Travel Policy",
      location: "Mumbai",
      date: "2024-01-14",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "New High-Speed Rail Routes Announced",
      summary: "Government announces new bullet train routes connecting major tourist destinations across India.",
      category: "Infrastructure",
      location: "Gujarat",
      date: "2024-01-13",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Eco-Tourism Initiatives in Western Ghats",
      summary: "New eco-friendly tourism projects launched to promote sustainable travel in biodiversity hotspots.",
      category: "Environment",
      location: "Kerala",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=400",
      readTime: "6 min read"
    }
  ];

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          fetchWeatherData(undefined, undefined, "Delhi");
        }
      );
    } else {
      fetchWeatherData(undefined, undefined, "Delhi");
    }
  }, []);

  const fetchWeatherData = async (lat?: number, lon?: number, city?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('weather-api', {
        body: { lat, lon, city }
      });

      if (error) throw error;

      setWeatherData(data);
      toast({
        title: "Weather Updated",
        description: `Weather data fetched for ${data.location.city}`,
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Using Demo Data",
        description: "Real weather API integration will be available soon.",
        variant: "default",
      });
      
      // Fallback to demo data
      setWeatherData({
        current: {
          name: city || "Delhi",
          main: { temp: 28, humidity: 65, feels_like: 30 },
          weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
          wind: { speed: 3.5 },
          visibility: 10000,
          coord: { lat: lat || 28.6139, lon: lon || 77.2090 }
        },
        forecast: {
          list: [
            { dt_txt: "2024-01-15 12:00:00", main: { temp: 29 }, weather: [{ main: "Clear" }] },
            { dt_txt: "2024-01-16 12:00:00", main: { temp: 31 }, weather: [{ main: "Clouds" }] },
            { dt_txt: "2024-01-17 12:00:00", main: { temp: 27 }, weather: [{ main: "Rain" }] },
            { dt_txt: "2024-01-18 12:00:00", main: { temp: 30 }, weather: [{ main: "Clear" }] },
            { dt_txt: "2024-01-19 12:00:00", main: { temp: 32 }, weather: [{ main: "Sunny" }] }
          ]
        },
        bestTimeToVisit: "Perfect weather for sightseeing!",
        travelSuggestion: "Great time for outdoor activities and exploration",
        location: { city: city || "Delhi", country: "IN", lat: lat || 28.6139, lon: lon || 77.2090 }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = () => {
    if (selectedCity.trim()) {
      fetchWeatherData(undefined, undefined, selectedCity);
      setSelectedCity("");
    }
  };

  const handleQuickCitySelect = (city: string) => {
    fetchWeatherData(undefined, undefined, city);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return "☀️";
      case 'clouds':
      case 'cloudy':
        return "☁️";
      case 'rain':
        return "🌧️";
      case 'thunderstorm':
        return "⛈️";
      case 'snow':
        return "❄️";
      case 'mist':
      case 'haze':
        return "🌫️";
      default:
        return "🌤️";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Tourism": "bg-blue-500",
      "Travel Policy": "bg-green-500",
      "Infrastructure": "bg-purple-500",
      "Environment": "bg-emerald-500",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Weather & Travel News</h1>
        <p className="text-muted-foreground">Real-time weather updates and latest travel insights across India</p>
      </div>

      {/* Weather Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Weather Search
          </CardTitle>
          <CardDescription>Get real-time weather data for any Indian city</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
            />
            <Button onClick={handleCitySearch} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>
          
          {userLocation && (
            <Button 
              variant="outline" 
              onClick={() => fetchWeatherData(userLocation.lat, userLocation.lon)}
              disabled={loading}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
          )}

          {/* Quick City Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Popular Cities:</p>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((city) => (
                <Badge
                  key={city}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleQuickCitySelect(city)}
                >
                  {city}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Weather Display */}
      {weatherData && (
        <div className="grid gap-6">
          {/* Main Weather Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-6 w-6" />
                Current Weather - {weatherData.location.city}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Temperature Display */}
                <div className="text-center space-y-2">
                  <div className="text-6xl">{getWeatherIcon(weatherData.current.weather[0].main)}</div>
                  <div className="text-3xl font-bold">{Math.round(weatherData.current.main.temp)}°C</div>
                  <div className="text-muted-foreground capitalize">{weatherData.current.weather[0].description}</div>
                </div>
                
                {/* Weather Details */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      <span className="text-sm font-medium">Feels Like</span>
                    </div>
                    <div className="text-2xl font-bold">{Math.round(weatherData.current.main.feels_like)}°C</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Humidity</span>
                    </div>
                    <div className="text-2xl font-bold">{weatherData.current.main.humidity}%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Wind Speed</span>
                    </div>
                    <div className="text-2xl font-bold">{weatherData.current.wind.speed} m/s</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Travel Recommendations */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-600">Best Time to Visit</Badge>
                <p className="font-semibold text-green-800">{weatherData.bestTimeToVisit}</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <Badge className="mb-3 bg-blue-600">Travel Suggestion</Badge>
                <p className="font-semibold text-blue-800">{weatherData.travelSuggestion}</p>
              </CardContent>
            </Card>
          </div>

          {/* 5-Day Forecast */}
          {weatherData.forecast && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  5-Day Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4 text-center">
                  {weatherData.forecast.list.slice(0, 5).map((day: any, index: number) => {
                    const date = new Date(day.dt_txt);
                    const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="font-medium text-sm">{dayName}</div>
                        <div className="text-2xl">{getWeatherIcon(day.weather[0].main)}</div>
                        <div className="font-bold">{Math.round(day.main.temp)}°C</div>
                        <div className="text-xs text-muted-foreground capitalize">{day.weather[0].main}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Travel News Section */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Travel News</CardTitle>
          <CardDescription>Stay informed about travel updates and tourism developments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {newsData.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getCategoryColor(news.category)}>
                      {news.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{news.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{news.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {news.location}
                      </span>
                      <span>{news.date}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Travel Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
              <p className="font-semibold text-amber-800 flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Temperature Advisory
              </p>
              <p className="text-amber-700 mt-1">Stay hydrated and wear light, breathable clothing during outdoor activities.</p>
            </div>
            
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800 flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Monsoon Update
              </p>
              <p className="text-blue-700 mt-1">Monsoon season brings beautiful landscapes. Carry rain gear and check road conditions.</p>
            </div>
            
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-800 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Photography Tip
              </p>
              <p className="text-green-700 mt-1">Best photography hours are during golden hour (sunrise/sunset) for stunning landscape shots.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedWeatherNews;
import { useState, useEffect } from "react";
import { MapPin, Cloud, Navigation, MessageCircle, Phone, Languages } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

interface Place {
  place_id: string;
  name: string;
  rating: number;
  vicinity: string;
  photoUrl?: string;
  details?: any;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const SmartTravelAssistant = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<Place[]>([]);
  const [translatedText, setTranslatedText] = useState("");
  const [textToTranslate, setTextToTranslate] = useState("");
  const { toast } = useToast();

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          fetchWeatherData(latitude, longitude);
          fetchNearbyPlaces(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Access Denied",
            description: "Please enter a city name manually for weather and recommendations.",
            variant: "destructive",
          });
        }
      );
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
      if (data.location.lat && data.location.lon) {
        setUserLocation({ lat: data.location.lat, lon: data.location.lon });
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Weather Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyPlaces = async (lat: number, lon: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('places-api', {
        body: { lat, lon, type: 'tourist_attraction' }
      });

      if (error) throw error;

      setNearbyPlaces(data.results);
    } catch (error) {
      console.error('Places fetch error:', error);
      toast({
        title: "Places Error",
        description: "Failed to fetch nearby attractions.",
        variant: "destructive",
      });
    }
  };

  const handleCitySearch = () => {
    if (selectedCity.trim()) {
      fetchWeatherData(undefined, undefined, selectedCity);
    }
  };

  const addToTripPlan = (place: Place) => {
    if (!tripPlan.find(p => p.place_id === place.place_id)) {
      setTripPlan([...tripPlan, place]);
      toast({
        title: "Added to Trip",
        description: `${place.name} added to your trip plan!`,
      });
    }
  };

  const removeFromTripPlan = (placeId: string) => {
    setTripPlan(tripPlan.filter(p => p.place_id !== placeId));
  };

  const optimizeRoute = async () => {
    if (tripPlan.length < 2 || !userLocation) {
      toast({
        title: "Insufficient Data",
        description: "Add at least 2 places and ensure location is available.",
        variant: "destructive",
      });
      return;
    }

    try {
      const destinations = tripPlan.map(place => ({
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        name: place.name
      }));

      const { data, error } = await supabase.functions.invoke('route-optimizer', {
        body: {
          origin: userLocation,
          destinations
        }
      });

      if (error) throw error;

      toast({
        title: "Route Optimized",
        description: `Optimized route: ${data.totalDistance.text}, ${data.totalDuration.text}`,
      });
    } catch (error) {
      console.error('Route optimization error:', error);
      toast({
        title: "Route Error",
        description: "Failed to optimize route. Please try again.",
        variant: "destructive",
      });
    }
  };

  const translateText = async () => {
    if (!textToTranslate.trim()) return;

    try {
      const { data, error } = await supabase.functions.invoke('translate-api', {
        body: { text: textToTranslate, targetLanguage: 'hi' }
      });

      if (error) throw error;

      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation Error",
        description: "Failed to translate text.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Smart Travel Assistant</h1>
        <p className="text-muted-foreground">Your AI-powered companion for exploring India</p>
      </div>

      {/* Location & Weather Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Current Location & Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Enter city name..."
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
            />
            <Button onClick={handleCitySearch} disabled={loading}>
              Search
            </Button>
          </div>

          {weatherData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5" />
                    <div>
                      <p className="font-semibold">{weatherData.location.city}</p>
                      <p className="text-2xl font-bold">{weatherData.current.main.temp}°C</p>
                      <p className="text-sm text-muted-foreground">{weatherData.current.weather[0].description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <Badge className="mb-2">Travel Suggestion</Badge>
                  <p className="text-sm">{weatherData.bestTimeToVisit}</p>
                  <p className="text-xs text-muted-foreground mt-1">{weatherData.travelSuggestion}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm">
                    <span className="font-semibold">Humidity:</span> {weatherData.current.main.humidity}%
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Wind:</span> {weatherData.current.wind.speed} m/s
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Feels like:</span> {weatherData.current.main.feels_like}°C
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nearby Places Section */}
      <Card>
        <CardHeader>
          <CardTitle>Nearby Attractions</CardTitle>
          <CardDescription>Discover amazing places around you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyPlaces.map((place) => (
              <Card key={place.place_id} className="overflow-hidden">
                {place.photoUrl && (
                  <img
                    src={place.photoUrl}
                    alt={place.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{place.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{place.vicinity}</p>
                  {place.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm">{place.rating}</span>
                    </div>
                  )}
                  <Button
                    size="sm"
                    onClick={() => addToTripPlan(place)}
                    disabled={tripPlan.some(p => p.place_id === place.place_id)}
                  >
                    {tripPlan.some(p => p.place_id === place.place_id) ? 'Added' : 'Add to Trip'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trip Planner Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Trip Planner ({tripPlan.length} places)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tripPlan.length > 0 ? (
            <>
              <div className="space-y-2 mb-4">
                {tripPlan.map((place, index) => (
                  <div key={place.place_id} className="flex items-center justify-between p-2 bg-secondary rounded">
                    <span>{index + 1}. {place.name}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromTripPlan(place.place_id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              {tripPlan.length >= 2 && (
                <Button onClick={optimizeRoute}>
                  Optimize Route
                </Button>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">Add places from nearby attractions to create your trip plan</p>
          )}
        </CardContent>
      </Card>

      {/* Language Helper Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Language Helper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter text to translate to Hindi..."
                value={textToTranslate}
                onChange={(e) => setTextToTranslate(e.target.value)}
              />
              <Button onClick={translateText}>
                Translate
              </Button>
            </div>
            {translatedText && (
              <Card>
                <CardContent className="p-4">
                  <p className="font-semibold">Hindi Translation:</p>
                  <p className="text-lg">{translatedText}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16">
              <div>
                <p className="font-semibold">Police</p>
                <p>100</p>
              </div>
            </Button>
            <Button variant="outline" className="h-16">
              <div>
                <p className="font-semibold">Ambulance</p>
                <p>108</p>
              </div>
            </Button>
            <Button variant="outline" className="h-16">
              <div>
                <p className="font-semibold">Tourist Helpline</p>
                <p>1363</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartTravelAssistant;
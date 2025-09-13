import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CloudSun, 
  Thermometer, 
  Wind, 
  Droplets, 
  Newspaper,
  MapPin,
  Calendar
} from "lucide-react";

const WeatherNews = () => {
  const weatherData = [
    {
      city: "Mumbai",
      temp: "28°C",
      condition: "Partly Cloudy",
      humidity: "75%",
      wind: "12 km/h",
      icon: CloudSun
    },
    {
      city: "Delhi",
      temp: "32°C", 
      condition: "Sunny",
      humidity: "45%",
      wind: "8 km/h",
      icon: CloudSun
    },
    {
      city: "Bangalore",
      temp: "24°C",
      condition: "Pleasant",
      humidity: "65%",
      wind: "6 km/h",
      icon: CloudSun
    },
    {
      city: "Goa",
      temp: "29°C",
      condition: "Cloudy",
      humidity: "80%",
      wind: "15 km/h",
      icon: CloudSun
    }
  ];

  const newsData = [
    {
      id: 1,
      title: "New High-Speed Train Route Connects Mumbai to Ahmedabad",
      summary: "The bullet train project is set to revolutionize travel between major cities with 320 km/h speeds.",
      category: "Transport",
      date: "Today",
      location: "Mumbai"
    },
    {
      id: 2,
      title: "Goa Tourism Launches Eco-Friendly Beach Cleanup Initiative",
      summary: "Sustainable tourism practices being implemented across all major beaches in Goa.",
      category: "Tourism",
      date: "Yesterday",
      location: "Goa"
    },
    {
      id: 3,
      title: "Kerala Backwaters Open New Houseboat Routes",
      summary: "Experience pristine waterways with newly launched eco-friendly houseboat tours.",
      category: "Tourism",
      date: "2 days ago",
      location: "Kerala"
    },
    {
      id: 4,
      title: "Rajasthan Palace Hotels Offer Heritage Experiences",
      summary: "Historic palaces converted into luxury hotels showcase royal Indian heritage.",
      category: "Hospitality",
      date: "3 days ago",
      location: "Rajasthan"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold hero-text mb-4">Weather & Travel News</h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with real-time weather and latest travel news
          </p>
        </div>

        {/* Weather Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-primary" />
            Current Weather
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weatherData.map((weather) => (
              <Card key={weather.city} className="travel-shadow hover:travel-shadow-hover transition-smooth">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{weather.city}</span>
                    <weather.icon className="w-6 h-6 text-accent" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary">{weather.temp}</div>
                    <div className="text-sm text-muted-foreground">{weather.condition}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span>Humidity: {weather.humidity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Wind className="w-4 h-4 text-green-500" />
                      <span>Wind: {weather.wind}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* News Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-secondary" />
            Latest Travel News
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {newsData.map((news) => (
              <Card key={news.id} className="travel-shadow hover:travel-shadow-hover transition-smooth cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                      {news.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {news.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {news.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Weather Forecast */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Thermometer className="w-6 h-6 text-accent" />
            5-Day Forecast - Mumbai
          </h2>
          <Card className="travel-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-5 gap-4 text-center">
                {['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                  <div key={day} className="space-y-2">
                    <div className="font-medium text-sm">{day}</div>
                    <CloudSun className="w-8 h-8 mx-auto text-accent" />
                    <div className="font-bold">{28 + index}°</div>
                    <div className="text-xs text-muted-foreground">{22 + index}°</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default WeatherNews;
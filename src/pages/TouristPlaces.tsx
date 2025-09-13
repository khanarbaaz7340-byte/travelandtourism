import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Star, 
  Clock, 
  Camera, 
  Navigation,
  Search,
  Heart,
  Share
} from "lucide-react";

const TouristPlaces = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const placesData = [
    {
      id: 1,
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      rating: 4.9,
      category: "Heritage",
      timings: "6:00 AM - 7:00 PM",
      entryFee: "₹250",
      image: "🕌",
      description: "One of the Seven Wonders of the World, this ivory-white marble mausoleum is a symbol of eternal love.",
      highlights: ["Architecture", "History", "Photography", "UNESCO Site"],
      bestTime: "October to March"
    },
    {
      id: 2,
      name: "Goa Beaches",
      location: "Goa",
      rating: 4.7,
      category: "Beach",
      timings: "24 Hours",
      entryFee: "Free",
      image: "🏖️",
      description: "Stunning coastline with golden sand beaches, water sports, and vibrant nightlife.",
      highlights: ["Beach Activities", "Water Sports", "Nightlife", "Seafood"],
      bestTime: "November to February"
    },
    {
      id: 3,
      name: "Kerala Backwaters",
      location: "Alleppey, Kerala",
      rating: 4.8,
      category: "Nature",
      timings: "24 Hours",
      entryFee: "₹500",
      image: "🌴",
      description: "Serene network of lagoons and lakes, perfect for houseboat cruises and bird watching.",
      highlights: ["Houseboat", "Wildlife", "Photography", "Peace"],
      bestTime: "September to March"
    },
    {
      id: 4,
      name: "Jaipur City Palace",
      location: "Jaipur, Rajasthan",
      rating: 4.6,
      category: "Heritage",
      timings: "9:30 AM - 5:00 PM",
      entryFee: "₹700",
      image: "🏰",
      description: "Magnificent palace complex showcasing Rajput and Mughal architecture with museums and courtyards.",
      highlights: ["Royal Architecture", "Museums", "Culture", "Art"],
      bestTime: "October to March"
    },
    {
      id: 5,
      name: "Manali Valley",
      location: "Himachal Pradesh",
      rating: 4.5,
      category: "Adventure",
      timings: "24 Hours",
      entryFee: "Free",
      image: "🏔️",
      description: "Beautiful hill station with snow-capped peaks, adventure sports, and scenic landscapes.",
      highlights: ["Trekking", "Skiing", "Mountain Views", "Adventure"],
      bestTime: "May to October"
    },
    {
      id: 6,
      name: "Mysore Palace",
      location: "Mysore, Karnataka",
      rating: 4.7,
      category: "Heritage",
      timings: "10:00 AM - 5:30 PM",
      entryFee: "₹70",
      image: "👑",
      description: "Grand palace known for its Indo-Saracenic architecture and spectacular illumination.",
      highlights: ["Architecture", "Light Show", "History", "Gardens"],
      bestTime: "October to February"
    }
  ];

  const categories = ["All", "Heritage", "Beach", "Nature", "Adventure"];

  const toggleFavorite = (placeId: number) => {
    setFavorites(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Heritage": "bg-yellow-100 text-yellow-800",
      "Beach": "bg-blue-100 text-blue-800",
      "Nature": "bg-green-100 text-green-800",
      "Adventure": "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold hero-text mb-4">Tourist Places</h1>
          <p className="text-lg text-muted-foreground">
            Discover incredible destinations and plan your perfect trip
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8 travel-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button key={category} variant="outline" size="sm">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placesData.map((place) => (
            <Card key={place.id} className="travel-shadow hover:travel-shadow-hover transition-smooth overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl relative">
                {place.image}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-8 h-8 p-0 bg-white/80"
                    onClick={() => toggleFavorite(place.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.includes(place.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white/80">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{place.name}</CardTitle>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {place.location}
                  </div>
                  <Badge className={getCategoryColor(place.category)}>
                    {place.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {place.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Timings:</span>
                    <span className="text-muted-foreground">{place.timings}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Entry Fee:</span>
                    <span className="text-success font-semibold">{place.entryFee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Best Time:</span>
                    <span className="text-muted-foreground">{place.bestTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {place.highlights.slice(0, 3).map((highlight) => (
                    <Badge key={highlight} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 travel-gradient-primary border-0 text-white">
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Camera className="w-4 h-4 mr-2" />
                    Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Heritage Sites", count: "120+", icon: "🏛️", color: "border-yellow-200" },
              { name: "Beach Destinations", count: "85+", icon: "🏖️", color: "border-blue-200" },
              { name: "Hill Stations", count: "95+", icon: "⛰️", color: "border-green-200" },
              { name: "Adventure Spots", count: "150+", icon: "🎒", color: "border-red-200" }
            ].map((stat) => (
              <Card key={stat.name} className={`cursor-pointer hover:travel-shadow-hover transition-smooth ${stat.color} border-2`}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <h3 className="font-semibold text-lg">{stat.name}</h3>
                  <p className="text-2xl font-bold text-primary">{stat.count}</p>
                  <p className="text-sm text-muted-foreground">destinations</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TouristPlaces;
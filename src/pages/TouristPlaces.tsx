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

// Tourist Place Images
import tajMahalImage from "@/assets/taj-mahal.jpg";
import goaBeachImage from "@/assets/goa-beach.jpg";
import keralaBackwatersImage from "@/assets/kerala-backwaters.jpg";
import jaipurPalaceImage from "@/assets/jaipur-palace.jpg";
import manaliValleyImage from "@/assets/manali-valley.jpg";
import mysorePalaceImage from "@/assets/mysore-palace.jpg";

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
      entryFee: "₹250 (Indians), ₹1300 (Foreigners)",
      image: tajMahalImage,
      description: "One of the Seven Wonders of the World, this ivory-white marble mausoleum was built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. A UNESCO World Heritage Site and symbol of eternal love.",
      highlights: ["Mughal Architecture", "UNESCO World Heritage", "Photography Spot", "Historical Monument", "Marble Craftsmanship"],
      bestTime: "October to March",
      nearbyAttractions: ["Agra Fort", "Mehtab Bagh", "Itmad-ud-Daulah"],
      duration: "2-3 hours",
      accessibility: "Wheelchair accessible",
      languages: ["Hindi", "English", "Urdu"],
      specialNotes: "Closed on Fridays for prayers. Full moon nights offer special viewing."
    },
    {
      id: 2,
      name: "Goa Beaches",
      location: "Goa",
      rating: 4.7,
      category: "Beach",
      timings: "24 Hours",
      entryFee: "Free (Beach access)",
      image: goaBeachImage,
      description: "Goa's stunning coastline features pristine beaches with golden sand, swaying palm trees, vibrant shacks, and exciting water sports. From party beaches like Baga to serene spots like Palolem.",
      highlights: ["Water Sports", "Beach Parties", "Seafood Cuisine", "Sunset Views", "Portuguese Heritage", "Nightlife"],
      bestTime: "November to February",
      nearbyAttractions: ["Basilica of Bom Jesus", "Dudhsagar Falls", "Spice Plantations"],
      duration: "3-7 days",
      accessibility: "Beach wheelchairs available at select locations",
      languages: ["English", "Hindi", "Konkani", "Portuguese"],
      specialNotes: "Monsoon season (June-September) has rough seas. Night swimming not recommended."
    },
    {
      id: 3,
      name: "Kerala Backwaters",
      location: "Alleppey, Kerala",
      rating: 4.8,
      category: "Nature",
      timings: "24 Hours (Houseboat cruises start 12 PM)",
      entryFee: "₹500-₹15,000 (depending on houseboat package)",
      image: keralaBackwatersImage,
      description: "A network of interconnected canals, rivers, lakes and inlets forming a labyrinthine waterway. Experience traditional houseboat cruises through coconut groves, paddy fields, and traditional villages.",
      highlights: ["Houseboat Cruises", "Bird Watching", "Traditional Villages", "Coconut Groves", "Ayurvedic Spas", "Local Cuisine"],
      bestTime: "September to March",
      nearbyAttractions: ["Kumarakom Bird Sanctuary", "Vembanad Lake", "Chinese Fishing Nets"],
      duration: "1-3 days",
      accessibility: "Limited wheelchair access on houseboats",
      languages: ["Malayalam", "English", "Hindi", "Tamil"],
      specialNotes: "Advance booking required for houseboats. Mosquito repellent recommended."
    },
    {
      id: 4,
      name: "Jaipur City Palace",
      location: "Jaipur, Rajasthan",
      rating: 4.6,
      category: "Heritage",
      timings: "9:30 AM - 5:00 PM",
      entryFee: "₹700 (Indians), ₹2500 (Foreigners)",
      image: jaipurPalaceImage,
      description: "A magnificent palace complex built by Maharaja Sawai Jai Singh II, showcasing a perfect blend of Rajput and Mughal architecture. Houses museums displaying royal artifacts, textiles, and weapons.",
      highlights: ["Rajput Architecture", "Royal Museums", "Peacock Gate", "Crystal Gallery", "Textile Collection", "Weapon Display"],
      bestTime: "October to March",
      nearbyAttractions: ["Hawa Mahal", "Jantar Mantar", "Amber Fort"],
      duration: "2-3 hours",
      accessibility: "Partially wheelchair accessible",
      languages: ["Hindi", "English", "Rajasthani"],
      specialNotes: "Audio guides available in multiple languages. Photography charges apply for cameras."
    },
    {
      id: 5,
      name: "Manali Valley",
      location: "Himachal Pradesh",
      rating: 4.5,
      category: "Adventure",
      timings: "24 Hours",
      entryFee: "Free (Activity charges vary)",
      image: manaliValleyImage,
      description: "Nestled in the Beas River valley, Manali is a popular hill station offering breathtaking mountain views, adventure activities, and a perfect escape from the plains. Gateway to Lahaul-Spiti and Ladakh.",
      highlights: ["Trekking", "River Rafting", "Paragliding", "Skiing", "Mountain Biking", "Hot Springs"],
      bestTime: "March to June, October to February",
      nearbyAttractions: ["Rohtang Pass", "Solang Valley", "Hadimba Temple"],
      duration: "3-5 days",
      accessibility: "Limited accessibility in mountain areas",
      languages: ["Hindi", "English", "Himachali"],
      specialNotes: "Inner line permits required for certain areas. Weather can change quickly in mountains."
    },
    {
      id: 6,
      name: "Mysore Palace",
      location: "Mysore, Karnataka",
      rating: 4.7,
      category: "Heritage",
      timings: "10:00 AM - 5:30 PM",
      entryFee: "₹70 (Indians), ₹200 (Foreigners)",
      image: mysorePalaceImage,
      description: "The official residence of the Wadiyar dynasty, this architectural marvel is known for its Indo-Saracenic style. Famous for its grand Dasara celebrations and spectacular evening illumination with 97,000 bulbs.",
      highlights: ["Indo-Saracenic Architecture", "Evening Illumination", "Dasara Festival", "Royal Artifacts", "Durbar Hall", "Golden Throne"],
      bestTime: "October to February",
      nearbyAttractions: ["Chamundi Hills", "Brindavan Gardens", "St. Philomena's Church"],
      duration: "1-2 hours",
      accessibility: "Wheelchair accessible with assistance",
      languages: ["Kannada", "English", "Hindi", "Tamil"],
      specialNotes: "Palace illuminated on Sundays and public holidays (7-8 PM). Special entry fees during Dasara."
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
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
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
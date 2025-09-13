import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Hotel, 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  Search,
  Calendar,
  Users
} from "lucide-react";

const Hotels = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const hotelData = [
    {
      id: 1,
      name: "Royal Palace Heritage Hotel",
      location: "Udaipur, Rajasthan",
      rating: 4.8,
      price: "₹8,500",
      image: "🏰",
      amenities: ["Wifi", "Pool", "Restaurant", "Parking"],
      description: "Experience royal luxury in this converted palace with stunning lake views."
    },
    {
      id: 2,
      name: "Beachside Resort & Spa",
      location: "Goa",
      rating: 4.6,
      price: "₹6,200",
      image: "🏖️",
      amenities: ["Wifi", "Beach", "Spa", "Restaurant"],
      description: "Relax at this beautiful beachfront resort with world-class amenities."
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Manali, Himachal Pradesh",
      rating: 4.5,
      price: "₹4,800",
      image: "🏔️",
      amenities: ["Wifi", "Mountain View", "Restaurant", "Adventure"],
      description: "Cozy mountain retreat perfect for adventure enthusiasts and nature lovers."
    },
    {
      id: 4,
      name: "Backwater Paradise Resort",
      location: "Alleppey, Kerala",
      rating: 4.7,
      price: "₹7,200",
      image: "🌴",
      amenities: ["Wifi", "Backwater", "Ayurveda", "Boat"],
      description: "Traditional Kerala houseboat experience with modern luxury amenities."
    },
    {
      id: 5,
      name: "Business City Hotel",
      location: "Mumbai, Maharashtra",
      rating: 4.3,
      price: "₹5,500",
      image: "🏢",
      amenities: ["Wifi", "Business Center", "Gym", "Restaurant"],
      description: "Modern business hotel in the heart of Mumbai's financial district."
    },
    {
      id: 6,
      name: "Desert Camp Resort",
      location: "Jaisalmer, Rajasthan",
      rating: 4.4,
      price: "₹3,800",
      image: "🐪",
      amenities: ["Desert Safari", "Cultural Show", "Camping", "Restaurant"],
      description: "Authentic desert camping experience under the stars with camel safaris."
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: any } = {
      "Wifi": Wifi,
      "Pool": Waves,
      "Restaurant": Utensils,
      "Parking": Car,
      "Beach": Waves,
      "Spa": Star,
      "Mountain View": MapPin,
      "Adventure": Star,
      "Backwater": Waves,
      "Ayurveda": Star,
      "Boat": Waves,
      "Business Center": Star,
      "Gym": Star,
      "Desert Safari": Star,
      "Cultural Show": Star,
      "Camping": Star
    };
    const IconComponent = icons[amenity] || Star;
    return <IconComponent className="w-3 h-3" />;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold hero-text mb-4">Hotel Booking</h1>
          <p className="text-lg text-muted-foreground">
            Find and book the perfect accommodation for your journey
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 travel-shadow">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Where are you going?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input type="date" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input type="date" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="2 adults, 1 room" className="pl-10" />
                </div>
              </div>
            </div>
            <Button className="w-full md:w-auto mt-4 travel-gradient-primary border-0 text-white">
              <Search className="w-4 h-4 mr-2" />
              Search Hotels
            </Button>
          </CardContent>
        </Card>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelData.map((hotel) => (
            <Card key={hotel.id} className="travel-shadow hover:travel-shadow-hover transition-smooth cursor-pointer overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl">
                {hotel.image}
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{hotel.name}</CardTitle>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {hotel.location}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {hotel.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 4).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs flex items-center gap-1">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">{hotel.price}</div>
                    <div className="text-xs text-muted-foreground">per night</div>
                  </div>
                  <Button className="travel-gradient-primary border-0 text-white">
                    <Hotel className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Destinations */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {["Goa", "Kerala", "Rajasthan", "Himachal Pradesh"].map((destination) => (
              <Card key={destination} className="cursor-pointer hover:travel-shadow-hover transition-smooth">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📍</div>
                  <h3 className="font-semibold">{destination}</h3>
                  <p className="text-sm text-muted-foreground">150+ Hotels</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hotels;
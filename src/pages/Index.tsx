import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";
import tajMahalImage from "@/assets/taj-mahal.jpg";
import goaBeachImage from "@/assets/goa-beach.jpg";
import mysorePalaceImage from "@/assets/mysore-palace.jpg";
import manaliValleyImage from "@/assets/manali-valley.jpg";
import keralaBackwatersImage from "@/assets/kerala-backwaters.jpg";
import jaipurPalaceImage from "@/assets/jaipur-palace.jpg";
import luxuryHotel1Image from "@/assets/luxury-hotel-1.jpg";
import luxuryHotel2Image from "@/assets/luxury-hotel-2.jpg";
import { 
  Bot, 
  CloudSun, 
  Hotel, 
  MapPin, 
  Search,
  Star,
  Plane,
  Train,
  Car,
  Shield,
  Clock,
  Users,
  MessageCircle,
  Heart,
  Camera
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI Travel Assistant",
      description: "Get personalized recommendations and instant travel advice",
      href: "/ai-assistant",
      color: "text-primary"
    },
    {
      icon: CloudSun,
      title: "Weather & News",
      description: "Real-time weather updates and travel news for your destinations",
      href: "/weather-news",
      color: "text-secondary"
    },
    {
      icon: Hotel,
      title: "Hotel Booking",
      description: "Find and book the perfect accommodation for your journey",
      href: "/hotels",
      color: "text-accent"
    },
    {
      icon: MapPin,
      title: "Tourist Places",
      description: "Discover amazing destinations with detailed guides and reviews",
      href: "/places",
      color: "text-success"
    }
  ];

  const stats = [
    { 
      icon: Users, 
      label: "Happy Travelers", 
      value: "1.2M+",
      description: "Satisfied customers worldwide",
      details: "Join millions who trust us"
    },
    { 
      icon: MapPin, 
      label: "Destinations", 
      value: "650+",
      description: "Cities & tourist spots covered",
      details: "From mountains to beaches"
    },
    { 
      icon: Hotel, 
      label: "Hotel Partners", 
      value: "15K+",
      description: "Premium hotels worldwide",
      details: "Luxury to budget options"
    },
    { 
      icon: Star, 
      label: "Average Rating", 
      value: "4.9/5",
      description: "Based on 50K+ reviews",
      details: '"Amazing service!" - Sarah K.'
    }
  ];

  const touristPlaces = [
    {
      name: "Taj Mahal",
      location: "Agra, India",
      image: tajMahalImage,
      rating: 4.9,
      reviews: 25000
    },
    {
      name: "Goa Beaches",
      location: "Goa, India", 
      image: goaBeachImage,
      rating: 4.7,
      reviews: 18500
    },
    {
      name: "Mysore Palace",
      location: "Mysore, India",
      image: mysorePalaceImage,
      rating: 4.8,
      reviews: 12000
    },
    {
      name: "Manali Valley",
      location: "Himachal Pradesh, India",
      image: manaliValleyImage,
      rating: 4.6,
      reviews: 15000
    },
    {
      name: "Kerala Backwaters",
      location: "Kerala, India",
      image: keralaBackwatersImage,
      rating: 4.8,
      reviews: 20000
    },
    {
      name: "Jaipur City Palace",
      location: "Rajasthan, India",
      image: jaipurPalaceImage,
      rating: 4.7,
      reviews: 16000
    }
  ];

  const featuredHotels = [
    {
      name: "The Oberoi Rajvilas",
      location: "Jaipur",
      image: luxuryHotel1Image,
      rating: 4.9,
      price: "₹25,000/night"
    },
    {
      name: "Taj Lake Palace",
      location: "Udaipur",
      image: luxuryHotel2Image,
      rating: 4.8,
      price: "₹35,000/night"
    }
  ];

  const transportOptions = [
    { icon: Plane, label: "Flights", description: "Find the best flight deals" },
    { icon: Train, label: "Trains", description: "Book train tickets easily" },
    { icon: Car, label: "Cabs", description: "Local transport booking" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Your <span className="hero-text bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Smart Travel</span> Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            AI-powered travel assistant, real-time updates, and seamless booking - all in one platform
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="glass-effect border-white/20">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <Input 
                      placeholder="Where do you want to go?" 
                      className="pl-12 h-12 text-lg border-0 bg-white"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    className="travel-gradient-primary border-0 text-white px-8 h-12"
                    onClick={() => navigate('/places')}
                  >
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="travel-gradient-primary border-0 text-white px-8"
              onClick={() => navigate('/ai-assistant')}
            >
              <Bot className="w-5 h-5 mr-2" />
              Try AI Assistant
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={() => navigate('/hotels')}
            >
              <Hotel className="w-5 h-5 mr-2" />
              Find Hotels
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold hero-text mb-4">Everything You Need for Smart Travel</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive travel services powered by AI to make your journey seamless and memorable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card 
                key={feature.title}
                className="travel-shadow hover:travel-shadow-hover transition-smooth cursor-pointer group"
                onClick={() => navigate(feature.href)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full bg-background border-2 border-gray-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Options */}
      <section className="py-20 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Book Your Transport</h2>
            <p className="text-lg text-muted-foreground">Multiple transport options for every journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {transportOptions.map((transport) => (
              <Card key={transport.label} className="travel-shadow hover:travel-shadow-hover transition-smooth cursor-pointer">
                <CardContent className="p-6 text-center">
                  <transport.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{transport.label}</h3>
                  <p className="text-muted-foreground mb-4">{transport.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/transport')}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-3">
                <stat.icon className="w-12 h-12 mx-auto text-primary" />
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-lg font-medium">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
                <div className="text-xs text-muted-foreground italic">{stat.details}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Why Choose TravelSmart?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <Shield className="w-6 h-6 text-success" />
              <div className="text-center">
                <span className="font-medium block">Secure & Safe</span>
                <span className="text-sm text-muted-foreground">SSL Encrypted | PCI Compliant</span>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Clock className="w-6 h-6 text-success" />
              <div className="text-center">
                <span className="font-medium block">24/7 Support</span>
                <span className="text-sm text-muted-foreground">Live chat & phone support</span>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Star className="w-6 h-6 text-success" />
              <div className="text-center">
                <span className="font-medium block">Best Price Guarantee</span>
                <span className="text-sm text-muted-foreground">Match any competitor price</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold hero-text mb-4">Explore India's Iconic Destinations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most beautiful and culturally rich destinations across India
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {touristPlaces.map((place) => (
              <Card 
                key={place.name}
                className="travel-shadow hover:travel-shadow-hover transition-smooth cursor-pointer overflow-hidden group"
                onClick={() => navigate('/places')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                  <p className="text-muted-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {place.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      {place.reviews.toLocaleString()} reviews
                    </div>
                    <Button size="sm" variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      View Gallery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold hero-text mb-4">Luxury Hotel Partners</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience world-class hospitality at our premium partner hotels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredHotels.map((hotel) => (
              <Card 
                key={hotel.name}
                className="travel-shadow hover:travel-shadow-hover transition-smooth cursor-pointer overflow-hidden group"
                onClick={() => navigate('/hotels')}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold">{hotel.rating}</span>
                    </div>
                    <div className="text-sm font-medium text-primary">{hotel.price}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-muted-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-muted-foreground">Luxury Collection</span>
                    </div>
                    <Button>
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 travel-gradient-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of travelers who trust TravelSmart for their adventures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-secondary hover:bg-gray-100 px-8"
              onClick={() => navigate('/login')}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-secondary hover:bg-gray-100 px-8"
              onClick={() => navigate('/ai-assistant')}
            >
              Try AI Assistant
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";
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
  Users
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
    { icon: Users, label: "Happy Travelers", value: "1M+" },
    { icon: MapPin, label: "Destinations", value: "500+" },
    { icon: Hotel, label: "Hotel Partners", value: "10K+" },
    { icon: Star, label: "Average Rating", value: "4.8" }
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
              <div key={stat.label} className="space-y-2">
                <stat.icon className="w-12 h-12 mx-auto text-primary" />
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-lg text-muted-foreground">{stat.label}</div>
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
              <span className="font-medium">Secure & Safe</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Clock className="w-6 h-6 text-success" />
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Star className="w-6 h-6 text-success" />
              <span className="font-medium">Best Price Guarantee</span>
            </div>
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
              variant="outline" 
              className="border-white text-white hover:bg-white/20 px-8"
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
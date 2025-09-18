import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Train, 
  Car, 
  Search, 
  Clock, 
  IndianRupee, 
  Star,
  MapPin,
  Calendar,
  Users
} from "lucide-react";

// Import transport images
import airIndiaPlane from "@/assets/air-india-plane.jpg";
import indigoPlane from "@/assets/indigo-plane.jpg";
import spicejetPlane from "@/assets/spicejet-plane.jpg";
import rajdhaniExpress from "@/assets/rajdhani-express.jpg";
import olaCab from "@/assets/ola-cab.jpg";
import uberTaxi from "@/assets/uber-taxi.jpg";

const Transport = () => {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1"
  });

  // Mock data for different transport options
  const flightData = [
    {
      id: 1,
      airline: "IndiGo",
      flightNumber: "6E-2431",
      departure: "06:30",
      arrival: "08:45",
      from: "DEL",
      to: "BOM", 
      duration: "2h 15m",
      price: 4500,
      stops: "Non-stop",
      rating: 4.2,
      image: indigoPlane
    },
    {
      id: 2,
      airline: "Air India",
      flightNumber: "AI-131",
      departure: "09:15",
      arrival: "11:40",
      from: "DEL",
      to: "BOM",
      duration: "2h 25m", 
      price: 5200,
      stops: "Non-stop",
      rating: 4.0,
      image: airIndiaPlane
    },
    {
      id: 3,
      airline: "SpiceJet",
      flightNumber: "SG-8123",
      departure: "14:20",
      arrival: "16:55",
      from: "DEL",
      to: "BOM",
      duration: "2h 35m",
      price: 3900,
      stops: "Non-stop",
      rating: 3.8,
      image: spicejetPlane
    }
  ];

  const trainData = [
    {
      id: 1,
      name: "Rajdhani Express",
      number: "12951",
      departure: "16:55",
      arrival: "08:35+1",
      from: "NDLS",
      to: "MMCT",
      duration: "15h 40m",
      price: 3200,
      class: "3A",
      availability: "Available",
      image: rajdhaniExpress
    },
    {
      id: 2,
      name: "August Kranti Rajdhani",
      number: "12953",
      departure: "17:20",
      arrival: "09:15+1", 
      from: "NDLS",
      to: "MMCT",
      duration: "15h 55m",
      price: 3400,
      class: "2A", 
      availability: "Waiting List",
      image: rajdhaniExpress
    },
    {
      id: 3,
      name: "Mumbai Duronto",
      number: "12267",
      departure: "21:25",
      arrival: "12:50+1",
      from: "NDLS", 
      to: "MMCT",
      duration: "15h 25m",
      price: 2800,
      class: "SL",
      availability: "Available",
      image: rajdhaniExpress
    }
  ];

  const cabData = [
    {
      id: 1,
      provider: "Uber",
      carType: "UberGo",
      estimatedTime: "5 min",
      price: 180,
      rating: 4.5,
      features: ["AC", "4 Seats"],
      image: uberTaxi
    },
    {
      id: 2,
      provider: "Ola", 
      carType: "Prime Sedan",
      estimatedTime: "3 min",
      price: 220,
      rating: 4.3,
      features: ["AC", "4 Seats", "Premium"],
      image: olaCab
    },
    {
      id: 3,
      provider: "Uber",
      carType: "UberXL",
      estimatedTime: "7 min", 
      price: 280,
      rating: 4.4,
      features: ["AC", "6 Seats", "Spacious"],
      image: uberTaxi
    }
  ];

  const handleSearch = () => {
    // In a real app, this would trigger API calls
    console.log("Searching for:", searchData);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold hero-text mb-2">Transport Booking</h1>
          <p className="text-lg text-muted-foreground">Book flights, trains, and cabs all in one place</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 travel-shadow">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="from">From</Label>
                <Input
                  id="from"
                  placeholder="Delhi"
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  placeholder="Mumbai"
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="passengers">Passengers</Label>
                <Select value={searchData.passengers} onValueChange={(value) => setSearchData({...searchData, passengers: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4+ Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSearch} className="travel-gradient-primary text-white w-full md:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Search All Options
            </Button>
          </CardContent>
        </Card>

        {/* Transport Options Tabs */}
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="flights" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Flights
            </TabsTrigger>
            <TabsTrigger value="trains" className="flex items-center gap-2">
              <Train className="w-4 h-4" />
              Trains
            </TabsTrigger>
            <TabsTrigger value="cabs" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              Cabs
            </TabsTrigger>
          </TabsList>

          {/* Flights Tab */}
          <TabsContent value="flights">
            <div className="space-y-4">
              {flightData.map((flight) => (
                <Card key={flight.id} className="travel-shadow hover:travel-shadow-hover transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={flight.image} 
                          alt={`${flight.airline} aircraft`}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold">{flight.airline}</h3>
                            <Badge variant="outline">{flight.flightNumber}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{flight.rating}</span>
                            </div>
                          </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{flight.from} → {flight.to}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{flight.departure} - {flight.arrival}</span>
                          </div>
                          <span>{flight.duration}</span>
                          <Badge variant="secondary">{flight.stops}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary flex items-center">
                          <IndianRupee className="w-5 h-5" />
                          {flight.price.toLocaleString()}
                        </div>
                        <Button className="travel-gradient-primary text-white mt-2">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trains Tab */}
          <TabsContent value="trains">
            <div className="space-y-4">
              {trainData.map((train) => (
                <Card key={train.id} className="travel-shadow hover:travel-shadow-hover transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={train.image} 
                          alt={`${train.name} train`}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold">{train.name}</h3>
                            <Badge variant="outline">{train.number}</Badge>
                            <Badge variant={train.availability === "Available" ? "default" : "secondary"}>
                              {train.availability}
                            </Badge>
                          </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{train.from} → {train.to}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{train.departure} - {train.arrival}</span>
                          </div>
                          <span>{train.duration}</span>
                          <Badge variant="outline">{train.class}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary flex items-center">
                          <IndianRupee className="w-5 h-5" />
                          {train.price.toLocaleString()}
                        </div>
                        <Button 
                          className="travel-gradient-primary text-white mt-2"
                          disabled={train.availability === "Waiting List"}
                        >
                          {train.availability === "Available" ? "Book Now" : "Join Waitlist"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cabs Tab */}
          <TabsContent value="cabs">
            <div className="space-y-4">
              {cabData.map((cab) => (
                <Card key={cab.id} className="travel-shadow hover:travel-shadow-hover transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={cab.image} 
                          alt={`${cab.provider} ${cab.carType}`}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold">{cab.provider}</h3>
                            <Badge variant="outline">{cab.carType}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{cab.rating}</span>
                            </div>
                          </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Arrives in {cab.estimatedTime}</span>
                          </div>
                          <div className="flex gap-2">
                            {cab.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary flex items-center">
                          <IndianRupee className="w-5 h-5" />
                          {cab.price}
                        </div>
                        <Button className="travel-gradient-primary text-white mt-2">
                          Book Ride
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Comparison Section */}
        <Card className="mt-8 travel-shadow">
          <CardHeader>
            <CardTitle>Multi-Transport Comparison</CardTitle>
            <p className="text-muted-foreground">Compare all transport options for your route</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Plane className="w-8 h-8 mx-auto text-primary mb-2" />
                <h4 className="font-semibold">Fastest</h4>
                <p className="text-sm text-muted-foreground">Flight - 2h 15m</p>
                <p className="text-lg font-bold text-primary">₹3,900</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Train className="w-8 h-8 mx-auto text-secondary mb-2" />
                <h4 className="font-semibold">Most Comfortable</h4>
                <p className="text-sm text-muted-foreground">Train - 15h 25m</p>
                <p className="text-lg font-bold text-secondary">₹2,800</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Car className="w-8 h-8 mx-auto text-accent mb-2" />
                <h4 className="font-semibold">Most Convenient</h4>
                <p className="text-sm text-muted-foreground">Cab - Door to door</p>
                <p className="text-lg font-bold text-accent">₹180</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transport;
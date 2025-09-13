import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  MapPin, 
  AlertCircle, 
  Shield, 
  Heart, 
  Car,
  Building2,
  Globe,
  Clock,
  User,
  MessageCircle,
  Navigation,
  Wifi,
  Battery
} from "lucide-react";

const Emergency = () => {
  const [userLocation, setUserLocation] = useState("Mumbai, Maharashtra");
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "John Doe", relation: "Family", phone: "+91-98765-43210" },
    { name: "Jane Smith", relation: "Friend", phone: "+91-87654-32109" }
  ]);

  // Emergency numbers for different Indian states/regions
  const emergencyNumbers = [
    {
      service: "Police",
      number: "100", 
      icon: Shield,
      color: "text-blue-600",
      description: "For crime, law and order issues"
    },
    {
      service: "Fire Department",
      number: "101",
      icon: AlertCircle, 
      color: "text-red-600",
      description: "Fire emergencies and rescue"
    },
    {
      service: "Ambulance",
      number: "108",
      icon: Heart,
      color: "text-green-600", 
      description: "Medical emergencies"
    },
    {
      service: "Disaster Management",
      number: "108",
      icon: AlertCircle,
      color: "text-orange-600",
      description: "Natural disasters and evacuations"
    },
    {
      service: "Tourist Helpline",
      number: "1363", 
      icon: Globe,
      color: "text-purple-600",
      description: "Tourist assistance and information"
    },
    {
      service: "Women's Helpline",
      number: "1091",
      icon: Shield,
      color: "text-pink-600", 
      description: "Women's safety and support"
    }
  ];

  // Important contacts by location
  const locationContacts = {
    "Mumbai": [
      { name: "Mumbai Police Control Room", phone: "+91-22-2262-0111" },
      { name: "Mumbai Traffic Police", phone: "+91-22-2262-0302" },
      { name: "KEM Hospital", phone: "+91-22-2417-3401" },
      { name: "Lilavati Hospital", phone: "+91-22-2675-1000" },
      { name: "Mumbai Airport", phone: "+91-22-6685-1010" }
    ],
    "Delhi": [
      { name: "Delhi Police Control Room", phone: "+91-11-2691-4444" },
      { name: "Delhi Traffic Police", phone: "+91-11-2533-9100" },
      { name: "AIIMS Emergency", phone: "+91-11-2659-3257" },
      { name: "Indira Gandhi Airport", phone: "+91-11-2565-2011" }
    ]
  };

  const safetyTips = [
    {
      title: "Share Your Location",
      description: "Always inform someone about your travel plans and current location",
      icon: MapPin
    },
    {
      title: "Emergency Contacts",
      description: "Keep important phone numbers saved and easily accessible",
      icon: Phone
    },
    {
      title: "Stay Connected",
      description: "Ensure your phone is charged and you have backup power sources", 
      icon: Battery
    },
    {
      title: "Know Local Laws",
      description: "Be aware of local customs, laws, and emergency procedures",
      icon: Shield
    }
  ];

  const sos_features = [
    {
      title: "Quick SOS",
      description: "Send location and emergency alert to your contacts",
      action: "Activate SOS",
      icon: AlertCircle,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      buttonColor: "bg-red-600"
    },
    {
      title: "Share Live Location", 
      description: "Share real-time location with trusted contacts",
      action: "Start Sharing",
      icon: Navigation,
      bgColor: "bg-blue-50", 
      textColor: "text-blue-600",
      buttonColor: "bg-blue-600"
    },
    {
      title: "Emergency Chat",
      description: "Connect with local emergency services via chat",
      action: "Start Chat",
      icon: MessageCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-600", 
      buttonColor: "bg-green-600"
    }
  ];

  const handleEmergencyCall = (number: string) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${number}`);
  };

  const activateSOS = () => {
    // In a real app, this would send SMS/notifications to emergency contacts
    alert("SOS activated! Emergency contacts have been notified with your location.");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold hero-text mb-2">Emergency Support</h1>
          <p className="text-lg text-muted-foreground">Quick access to emergency services and safety tools</p>
        </div>

        {/* Current Location */}
        <Card className="mb-6 travel-shadow border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-medium">Current Location</span>
                  <p className="text-sm text-muted-foreground">{userLocation}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Wifi className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="safety">Safety Tips</TabsTrigger>
            <TabsTrigger value="sos">SOS Tools</TabsTrigger>
          </TabsList>

          {/* Emergency Numbers */}
          <TabsContent value="emergency">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {emergencyNumbers.map((emergency) => (
                <Card key={emergency.service} className="travel-shadow hover:travel-shadow-hover transition-smooth cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${emergency.color}`}>
                        <emergency.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{emergency.service}</h3>
                        <p className="text-2xl font-bold text-primary">{emergency.number}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{emergency.description}</p>
                    <Button 
                      onClick={() => handleEmergencyCall(emergency.number)}
                      className="w-full travel-gradient-primary text-white"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Local Emergency Contacts */}
            <Card className="travel-shadow">
              <CardHeader>
                <CardTitle>Local Emergency Contacts - {userLocation}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {(locationContacts[userLocation as keyof typeof locationContacts] || []).map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      </div>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleEmergencyCall(contact.phone)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Contacts */}
          <TabsContent value="contacts">
            <Card className="travel-shadow">
              <CardHeader>
                <CardTitle>Personal Emergency Contacts</CardTitle>
                <p className="text-muted-foreground">Manage your emergency contact list</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{contact.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge variant="outline">{contact.relation}</Badge>
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEmergencyCall(contact.phone)}>
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full travel-gradient-primary text-white">
                    <User className="w-4 h-4 mr-2" />
                    Add Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Tips */}
          <TabsContent value="safety">
            <div className="grid md:grid-cols-2 gap-6">
              {safetyTips.map((tip, index) => (
                <Card key={index} className="travel-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <tip.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                        <p className="text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 travel-shadow border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="w-5 h-5" />
                  Important Travel Safety Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                    Always carry identification documents and keep digital copies
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                    Research local emergency services and embassy contacts before traveling
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                    Keep emergency cash in local currency for urgent situations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                    Install offline maps and translation apps before traveling
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                    Register with your country's embassy when traveling abroad
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SOS Tools */}
          <TabsContent value="sos">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {sos_features.map((feature, index) => (
                <Card key={index} className={`travel-shadow ${feature.bgColor} border-l-4 border-l-current`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 ${feature.textColor}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${feature.textColor}`}>{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                    <Button 
                      className={`w-full text-white ${feature.buttonColor} hover:opacity-90`}
                      onClick={index === 0 ? activateSOS : undefined}
                    >
                      {feature.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Information */}
            <Card className="travel-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Emergency Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">What happens when SOS is activated?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Clock className="w-4 h-4 mt-0.5 text-primary" />
                        Immediate notification sent to all emergency contacts
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                        Current GPS location shared automatically
                      </li>
                      <li className="flex items-start gap-2">
                        <Phone className="w-4 h-4 mt-0.5 text-primary" />
                        Local emergency services contacted if needed
                      </li>
                      <li className="flex items-start gap-2">
                        <MessageCircle className="w-4 h-4 mt-0.5 text-primary" />
                        Continuous location updates every 5 minutes
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Before using SOS features:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <User className="w-4 h-4 mt-0.5 text-primary" />
                        Ensure emergency contacts are up to date
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                        Enable location services on your device
                      </li>
                      <li className="flex items-start gap-2">
                        <Battery className="w-4 h-4 mt-0.5 text-primary" />
                        Keep your device charged during travel
                      </li>
                      <li className="flex items-start gap-2">
                        <Wifi className="w-4 h-4 mt-0.5 text-primary" />
                        Test the feature in a safe environment first
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Emergency;
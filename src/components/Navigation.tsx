import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  CloudSun, 
  Hotel, 
  MapPin, 
  Menu, 
  X, 
  User,
  LogOut,
  Plane,
  DollarSign,
  AlertTriangle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { href: "/smart-travel", label: "Smart Travel", icon: Bot },
    { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
    { href: "/weather-news", label: "Weather & News", icon: CloudSun },
    { href: "/hotels", label: "Hotels", icon: Hotel },
    { href: "/places", label: "Tourist Places", icon: MapPin },
    { href: "/transport", label: "Transport", icon: Plane },
    { href: "/expense-tracker", label: "Expenses", icon: DollarSign },
    { href: "/emergency", label: "Emergency", icon: AlertTriangle },
  ];

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 travel-gradient-primary rounded-lg flex items-center justify-center transition-smooth group-hover:scale-110">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-poppins hero-text">
              TravelSmart
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={handleAuthClick}
              variant={isLoggedIn ? "outline" : "default"}
              className="transition-smooth"
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    )
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <Button 
                onClick={handleAuthClick}
                variant={isLoggedIn ? "outline" : "default"}
                className="mt-4 self-start transition-smooth"
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import AIAssistant from "./pages/AIAssistant";
import WeatherNews from "./pages/WeatherNews";
import Hotels from "./pages/Hotels";
import TouristPlaces from "./pages/TouristPlaces";
import Transport from "./pages/Transport";
import ExpenseTracker from "./pages/ExpenseTracker";
import Emergency from "./pages/Emergency";
import SmartTravelAssistant from "./pages/SmartTravelAssistant";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/ai-assistant" element={<Layout><AIAssistant /></Layout>} />
            <Route path="/weather-news" element={<Layout><WeatherNews /></Layout>} />
            <Route path="/hotels" element={<Layout><Hotels /></Layout>} />
            <Route path="/places" element={<Layout><TouristPlaces /></Layout>} />
            <Route path="/transport" element={<Layout><Transport /></Layout>} />
            <Route path="/expense-tracker" element={<Layout><ExpenseTracker /></Layout>} />
            <Route path="/emergency" element={<Layout><Emergency /></Layout>} />
            <Route path="/smart-travel" element={<Layout><SmartTravelAssistant /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

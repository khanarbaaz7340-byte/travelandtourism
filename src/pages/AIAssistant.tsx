import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2, MapPin, Calendar, Compass } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Travel Assistant powered by advanced machine learning. I can provide intelligent, context-aware travel recommendations, help with trip planning, and answer complex travel queries. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Enhanced user context for advanced personalization
  const [userContext, setUserContext] = useState({
    budget: '',
    preferences: '',
    travelStyle: '',
    location: '',
    weatherConditions: '',
    timeZone: '',
    behaviorPattern: {
      queryTypes: [] as string[],
      responsePreferences: 'detailed',
      interactionCount: 0
    }
  });

  useEffect(() => {
    // Enhanced context gathering for ML-like personalization
    const gatherEnhancedContext = async () => {
      // Get precise location data
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = `${position.coords.latitude},${position.coords.longitude}`;
            setUserContext(prev => ({
              ...prev,
              location: coords,
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }));
          },
          (error) => {
            console.log('Location access denied:', error);
            // Fallback to IP-based location or timezone
            setUserContext(prev => ({
              ...prev,
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }));
          }
        );
      }

      // Gather device and browser context
      const deviceContext = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenSize: `${screen.width}x${screen.height}`,
        connectionType: (navigator as any).connection?.effectiveType || 'unknown'
      };

      console.log('Device context gathered:', deviceContext);
    };

    gatherEnhancedContext();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = async (userMessage: string) => {
    try {
      // Enhanced context with behavioral patterns and real-time data
      const enhancedContext = {
        conversationHistory: messages.slice(-5),
        userPreferences: {
          ...userContext,
          behaviorPattern: {
            ...userContext.behaviorPattern,
            queryTypes: [...userContext.behaviorPattern.queryTypes, categorizeQuery(userMessage)],
            interactionCount: userContext.behaviorPattern.interactionCount + 1
          }
        },
        requestType: 'travel_assistance',
        sessionData: {
          sessionStart: new Date().toISOString(),
          messageCount: messages.length,
          responseTime: Date.now(),
          userEngagement: calculateEngagementScore()
        },
        realTimeFactors: {
          currentTime: new Date().toISOString(),
          deviceType: getDeviceType(),
          connectionQuality: getConnectionQuality()
        }
      };

      const { data, error } = await supabase.functions.invoke('enhanced-ai-assistant', {
        body: { 
          message: userMessage,
          context: enhancedContext
        }
      });

      if (error) throw error;
      
      // Update user context with learned preferences
      updateLearningProfile(userMessage, data.response);
      
      return data.response;
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "AI Assistant Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      return "I apologize, but I'm experiencing technical difficulties. Let me try to help you with a simplified response. Please try asking your question again, and I'll do my best to assist you.";
    }
  };

  // Helper functions for enhanced AI context
  const categorizeQuery = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hotel') || lowerMessage.includes('accommodation')) return 'accommodation';
    if (lowerMessage.includes('flight') || lowerMessage.includes('transport')) return 'transportation';
    if (lowerMessage.includes('food') || lowerMessage.includes('restaurant')) return 'dining';
    if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) return 'weather';
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost')) return 'budget';
    if (lowerMessage.includes('culture') || lowerMessage.includes('tradition')) return 'cultural';
    return 'general';
  };

  const calculateEngagementScore = (): number => {
    const messageCount = messages.length;
    const avgMessageLength = messages.reduce((sum, msg) => sum + msg.content.length, 0) / messageCount || 0;
    return Math.min(100, (messageCount * 10) + (avgMessageLength / 10));
  };

  const getDeviceType = (): string => {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
    return 'desktop';
  };

  const getConnectionQuality = (): string => {
    const connection = (navigator as any).connection;
    if (!connection) return 'unknown';
    return connection.effectiveType || 'unknown';
  };

  const updateLearningProfile = (query: string, response: string) => {
    // Update user preferences based on interaction patterns
    setUserContext(prev => ({
      ...prev,
      behaviorPattern: {
        ...prev.behaviorPattern,
        responsePreferences: response.length > 500 ? 'detailed' : 'concise',
        interactionCount: prev.behaviorPattern.interactionCount + 1
      }
    }));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputMessage("");

    // Get AI response
    const aiResponseContent = await getAIResponse(inputMessage);
    
    const aiResponse: Message = {
      id: messages.length + 2,
      type: 'ai',
      content: aiResponseContent,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold hero-text mb-4">AI Travel Assistant</h1>
          <p className="text-lg text-muted-foreground">
            Get personalized travel recommendations and expert advice
          </p>
        </div>

        <Card className="travel-shadow">
          <CardHeader className="travel-gradient-primary text-white">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              Smart Travel Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div className="bg-muted px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about travel..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="transition-smooth"
                  disabled={isLoading || !inputMessage.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Suggestions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5" />
            Quick Travel Assistance
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Best destinations for adventure travel in India",
              "Budget-friendly places to visit this month",
              "Cultural experiences in North India",
              "Weather and travel conditions for Kerala"
            ].map((suggestion) => (
              <Card 
                key={suggestion} 
                className="cursor-pointer hover:travel-shadow-hover transition-smooth hover:scale-105"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <CardContent className="p-4">
                  <p className="text-sm font-medium">{suggestion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Context Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground">
            <Bot className="w-4 h-4" />
            Powered by advanced AI for personalized travel recommendations
            {userContext.location && (
              <span className="flex items-center gap-1 ml-2">
                <MapPin className="w-3 h-3" />
                Location-aware
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
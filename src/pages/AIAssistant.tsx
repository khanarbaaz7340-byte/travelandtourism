import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";

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
      content: "Hello! I'm your AI Travel Assistant. I can help you plan trips, find destinations, suggest activities, and answer travel questions. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Dummy AI responses for demo
  const dummyResponses = [
    "Based on your preferences, I'd recommend visiting Goa for its beautiful beaches and vibrant nightlife. The best time to visit is from November to March.",
    "For adventure travel in India, consider Rishikesh for river rafting, Manali for trekking, or Ladakh for motorcycle tours. Each offers unique experiences!",
    "Here are some budget-friendly destinations: McLeod Ganj (₹1500/day), Pushkar (₹1200/day), Hampi (₹1000/day), and Varanasi (₹1300/day).",
    "For cultural experiences, I suggest visiting Rajasthan's golden triangle: Jaipur, Udaipur, and Jodhpur. Don't miss the local cuisine and traditional crafts!",
    "The monsoon season (June-September) is perfect for visiting Kerala's backwaters, the Western Ghats, and Northeast India for lush green landscapes."
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage("");
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
            <ScrollArea className="h-96 p-4">
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
                      <p className="text-sm">{message.content}</p>
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
                />
                <Button onClick={handleSendMessage} className="transition-smooth">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Suggestions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Popular Questions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Best time to visit Kerala",
              "Budget travel tips for India",
              "Adventure activities in Himachal",
              "Cultural destinations in Rajasthan"
            ].map((suggestion) => (
              <Card key={suggestion} className="cursor-pointer hover:travel-shadow-hover transition-smooth">
                <CardContent className="p-4">
                  <p className="text-sm font-medium">{suggestion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
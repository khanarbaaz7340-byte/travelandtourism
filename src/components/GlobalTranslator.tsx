import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Languages, Globe, Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Translation context for global state management
interface TranslationContextType {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  translateText: (text: string, targetLang?: string) => Promise<string>;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};

// Language options with enhanced coverage
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
];

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const translateText = async (text: string, targetLang?: string): Promise<string> => {
    if (!text.trim()) return text;
    
    const targetLanguage = targetLang || currentLanguage;
    if (targetLanguage === 'en') return text; // Assume source is English
    
    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke('translate-api', {
        body: {
          text,
          targetLanguage,
          sourceLanguage: 'en'
        }
      });

      if (error) throw error;
      return data.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation Error",
        description: "Failed to translate text. Showing original content.",
        variant: "destructive",
      });
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      setCurrentLanguage,
      translateText,
      isTranslating
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Translation component for text elements
interface TranslatableTextProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const TranslatableText = ({ 
  children, 
  className, 
  as: Component = 'span' 
}: TranslatableTextProps) => {
  const { translateText, currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(children);

  useEffect(() => {
    if (currentLanguage === 'en') {
      setTranslatedText(children);
      return;
    }

    const translate = async () => {
      const translated = await translateText(children);
      setTranslatedText(translated);
    };

    translate();
  }, [children, currentLanguage, translateText]);

  return (
    <Component className={className}>
      {translatedText}
    </Component>
  );
};

// Global language selector component
export const GlobalLanguageSelector = () => {
  const { currentLanguage, setCurrentLanguage } = useTranslation();
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <Card className="fixed top-20 right-4 z-50 travel-shadow">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Language</span>
        </div>
        <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
          <SelectTrigger className="w-48">
            <SelectValue>
              <div className="flex items-center gap-2">
                <span>{currentLang?.flag}</span>
                <span className="text-sm">{currentLang?.name}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="text-xs">
            <Languages className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// Quick phrase translator for travel scenarios
export const QuickPhraseTranslator = () => {
  const { translateText, currentLanguage } = useTranslation();
  const { toast } = useToast();

  const commonPhrases = [
    "Hello, how are you?",
    "Thank you very much",
    "Excuse me, where is the bathroom?", 
    "How much does this cost?",
    "I need help, please",
    "Where is the nearest restaurant?",
    "Can you help me with directions?",
    "I would like to book a room",
    "What time does this close?",
    "Do you speak English?"
  ];

  const handlePhraseClick = async (phrase: string) => {
    if (currentLanguage === 'en') {
      toast({
        title: "Translation",
        description: `Original: ${phrase}`,
      });
      return;
    }

    const translated = await translateText(phrase);
    toast({
      title: "Quick Translation",
      description: `${phrase} → ${translated}`,
      duration: 5000,
    });

    // Text-to-speech for pronunciation help
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translated);
      utterance.lang = currentLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="travel-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Quick Phrases</h3>
        </div>
        <div className="grid gap-2">
          {commonPhrases.map((phrase, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start h-auto p-2 text-left hover:bg-muted"
              onClick={() => handlePhraseClick(phrase)}
            >
              <span className="text-sm">{phrase}</span>
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Tap any phrase for instant translation and pronunciation
        </p>
      </CardContent>
    </Card>
  );
};

export default TranslationProvider;
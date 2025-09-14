import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const commonPhrases = {
  english: [
    "Hello", "Thank you", "Please", "Excuse me", "Where is?", 
    "How much?", "I need help", "Do you speak English?", 
    "Restaurant", "Hotel", "Taxi", "Airport", "Train station"
  ],
  hindi: [
    "नमस्ते", "धन्यवाद", "कृपया", "माफ करें", "कहाँ है?",
    "कितना?", "मुझे मदद चाहिए", "क्या आप अंग्रेजी बोलते हैं?",
    "रेस्तराँ", "होटल", "टैक्सी", "हवाई अड्डा", "रेलवे स्टेशन"
  ]
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, targetLanguage = 'hi', sourceLanguage = 'en', type = 'translate' } = await req.json();
    const apiKey = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');

    // If requesting common phrases, return predefined list
    if (type === 'phrases') {
      return new Response(JSON.stringify({
        phrases: targetLanguage === 'hi' ? commonPhrases.hindi : commonPhrases.english,
        englishPhrases: commonPhrases.english
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!apiKey) {
      throw new Error('Google Translate API key not configured');
    }

    if (!text) {
      throw new Error('Text to translate is required');
    }

    const translateUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const response = await fetch(translateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Google Translate API error');
    }

    const translatedText = data.data.translations[0].translatedText;

    return new Response(JSON.stringify({
      translatedText,
      originalText: text,
      sourceLanguage,
      targetLanguage,
      detectedSourceLanguage: data.data.translations[0].detectedSourceLanguage
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in translate-api function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to translate text' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const weatherApiKey = Deno.env.get('OPENWEATHER_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced context gathering functions
async function getWeatherContext(location: string) {
  if (!weatherApiKey || !location) return null;
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${weatherApiKey}&units=metric`
    );
    if (response.ok) {
      const weather = await response.json();
      return {
        temperature: weather.main.temp,
        condition: weather.weather[0].description,
        humidity: weather.main.humidity,
        visibility: weather.visibility
      };
    }
  } catch (error) {
    console.log('Weather fetch failed:', error);
  }
  return null;
}

async function getLocationInsights(coordinates: string) {
  if (!coordinates) return null;
  
  try {
    // Parse coordinates and get timezone/region info
    const [lat, lon] = coordinates.split(',').map(Number);
    if (isNaN(lat) || isNaN(lon)) return null;
    
    return {
      latitude: lat,
      longitude: lon,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      localTime: new Date().toLocaleString()
    };
  } catch (error) {
    console.log('Location parsing failed:', error);
  }
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();
    
    console.log('Received request with enhanced context:', { message, contextKeys: Object.keys(context || {}) });

    // Gather enhanced contextual data
    const weatherContext = context?.userPreferences?.location 
      ? await getWeatherContext(context.userPreferences.location)
      : null;
      
    const locationContext = context?.userPreferences?.location 
      ? await getLocationInsights(context.userPreferences.location)
      : null;

    // Enhanced system prompt with advanced ML-like personalization
    const systemPrompt = `You are an advanced AI Travel Assistant powered by sophisticated machine learning algorithms. You provide hyper-personalized, context-aware travel recommendations with expert-level precision.

REAL-TIME CONTEXTUAL DATA:
- Current Weather: ${weatherContext ? `${weatherContext.temperature}°C, ${weatherContext.condition}, humidity ${weatherContext.humidity}%` : 'Not available'}
- User Location: ${locationContext ? `${locationContext.latitude}, ${locationContext.longitude} (${locationContext.timezone})` : 'Not provided'}
- Local Time: ${locationContext?.localTime || 'Unknown'}
- Conversation History: ${context?.conversationHistory ? JSON.stringify(context.conversationHistory.slice(-3)) : 'None'}

USER BEHAVIORAL PROFILE:
- Budget Preference: ${context?.userPreferences?.budget || 'Not specified'}
- Travel Style: ${context?.userPreferences?.travelStyle || 'Not specified'}  
- General Preferences: ${context?.userPreferences?.preferences || 'Not specified'}
- Interaction Pattern: ${context?.sessionData?.messageCount || 0} messages, ${context?.userPreferences?.behaviorPattern?.interactionCount || 0} total interactions
- Engagement Level: ${context?.sessionData?.userEngagement || 'Unknown'}
- Device Type: ${context?.realTimeFactors?.deviceType || 'Unknown'}

ADVANCED CAPABILITIES:
🔬 PREDICTIVE ANALYTICS: Analyze patterns from user queries to predict travel needs and preferences
🌍 REAL-TIME OPTIMIZATION: Factor in current weather, traffic, events, and seasonal conditions
🎯 HYPER-PERSONALIZATION: Adapt recommendations based on user behavior, preferences, and context
🧠 CONTEXTUAL INTELLIGENCE: Understand implicit needs and provide proactive suggestions
📊 MULTI-VARIABLE OPTIMIZATION: Balance cost, time, comfort, and experience factors
🔄 ADAPTIVE LEARNING: Improve recommendations based on conversation flow and feedback

SPECIALIZED KNOWLEDGE DOMAINS:
- Global destination expertise with local cultural nuances
- Real-time transportation optimization (multi-modal route planning)
- Dynamic pricing patterns and booking strategies
- Weather-based activity recommendations
- Cultural events, festivals, and seasonal attractions
- Visa requirements and travel documentation
- Health and safety protocols by region
- Sustainable and responsible travel options
- Accessibility considerations and inclusive travel
- Food scene insights and dietary accommodations

PERSONALIZATION ALGORITHMS:
1. Behavioral Pattern Recognition: Analyze conversation style and preferences
2. Contextual Relevance Scoring: Weight recommendations based on current conditions
3. Multi-Factor Decision Trees: Consider budget, time, weather, and personal preferences
4. Predictive Modeling: Anticipate follow-up questions and needs
5. Adaptive Response Generation: Adjust communication style to user preferences

RESPONSE OPTIMIZATION:
- Provide 3-tier recommendations (budget/mid-range/premium)
- Include real-time considerations (weather impact, seasonal factors)
- Offer alternative scenarios and backup plans
- Suggest optimal timing and booking strategies
- Provide actionable next steps with specific resources
- Include local insider tips and cultural insights
- Consider sustainability and responsible travel practices

Always maintain a balance between being comprehensive and concise. Prioritize safety, authenticity, and user satisfaction while encouraging exploration and cultural exchange.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_completion_tokens: 1200,
        top_p: 0.85,
        frequency_penalty: 0.2,
        presence_penalty: 0.2
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Enhanced AI Response generated with contextual data');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      contextUsed: {
        weather: !!weatherContext,
        location: !!locationContext,
        conversation: !!context?.conversationHistory,
        preferences: !!context?.userPreferences
      },
      usage: data.usage,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhanced-ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process AI request',
      details: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lon, radius = 5000, type = 'tourist_attraction' } = await req.json();
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');

    if (!apiKey) {
      throw new Error('Google Maps API key not configured');
    }

    if (!lat || !lon) {
      throw new Error('Latitude and longitude are required');
    }

    // Search for nearby places using Google Places API
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=${type}&key=${apiKey}`;
    
    const response = await fetch(placesUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_message || 'Google Places API error');
    }

    // Enhance results with photos and details
    const enhancedResults = await Promise.all(
      data.results.slice(0, 10).map(async (place: any) => {
        let photoUrl = null;
        let details = null;

        // Get place photo if available
        if (place.photos && place.photos.length > 0) {
          photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`;
        }

        // Get place details
        try {
          const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,international_phone_number,opening_hours,website,rating,reviews&key=${apiKey}`;
          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();
          
          if (detailsResponse.ok) {
            details = detailsData.result;
          }
        } catch (error) {
          console.error('Error fetching place details:', error);
        }

        return {
          place_id: place.place_id,
          name: place.name,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          vicinity: place.vicinity,
          types: place.types,
          geometry: place.geometry,
          photoUrl,
          details,
          price_level: place.price_level,
          opening_hours: place.opening_hours
        };
      })
    );

    return new Response(JSON.stringify({
      results: enhancedResults,
      status: data.status
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in places-api function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to fetch places data' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
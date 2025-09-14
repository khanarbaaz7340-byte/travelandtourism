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
    const { origin, destinations, mode = 'driving' } = await req.json();
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');

    if (!apiKey) {
      throw new Error('Google Maps API key not configured');
    }

    if (!origin || !destinations || destinations.length === 0) {
      throw new Error('Origin and destinations are required');
    }

    // Format destinations for Google Directions API
    const waypoints = destinations.slice(0, -1).map((dest: any) => 
      `${dest.lat},${dest.lng}`
    ).join('|');
    
    const destination = destinations[destinations.length - 1];
    
    let directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=${mode}&key=${apiKey}`;
    
    if (waypoints) {
      directionsUrl += `&waypoints=optimize:true|${waypoints}`;
    }

    const response = await fetch(directionsUrl);
    const data = await response.json();

    if (!response.ok || data.status !== 'OK') {
      throw new Error(data.error_message || 'Google Directions API error');
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    // Calculate total distance and duration
    let totalDistance = 0;
    let totalDuration = 0;

    route.legs.forEach((leg: any) => {
      totalDistance += leg.distance.value;
      totalDuration += leg.duration.value;
    });

    // Extract waypoint order if optimization was used
    const waypointOrder = route.waypoint_order || [];

    // Create optimized itinerary
    const optimizedItinerary = [];
    
    // Add origin
    optimizedItinerary.push({
      location: origin,
      order: 0,
      arrivalTime: null,
      estimatedStayDuration: 0
    });

    // Add waypoints in optimized order
    waypointOrder.forEach((index: number, i: number) => {
      const destination = destinations[index];
      const legInfo = route.legs[i];
      
      optimizedItinerary.push({
        location: destination,
        order: i + 1,
        arrivalTime: legInfo.duration.text,
        estimatedStayDuration: destination.estimatedStayDuration || 60, // minutes
        distance: legInfo.distance,
        duration: legInfo.duration
      });
    });

    // Add final destination if it wasn't included in waypoints
    if (destinations.length > waypointOrder.length) {
      const finalDestination = destinations[destinations.length - 1];
      const finalLeg = route.legs[route.legs.length - 1];
      
      optimizedItinerary.push({
        location: finalDestination,
        order: optimizedItinerary.length,
        arrivalTime: finalLeg.duration.text,
        estimatedStayDuration: finalDestination.estimatedStayDuration || 60,
        distance: finalLeg.distance,
        duration: finalLeg.duration
      });
    }

    return new Response(JSON.stringify({
      optimizedRoute: route,
      totalDistance: {
        text: `${(totalDistance / 1000).toFixed(1)} km`,
        value: totalDistance
      },
      totalDuration: {
        text: `${Math.round(totalDuration / 60)} minutes`,
        value: totalDuration
      },
      optimizedItinerary,
      polyline: route.overview_polyline.points,
      bounds: route.bounds
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in route-optimizer function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to optimize route' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
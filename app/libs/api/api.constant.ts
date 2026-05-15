const API_BASE_URL =
  // `${process.env.NEXT_PUBLIC_API_URL}/api` ||
  // "https://sbserver-3303.onrender.com/api";
  "http://localhost:8080/api";

export const API_URLS = {
  upload: API_BASE_URL + "/upload",
  plan: API_BASE_URL + "/plans",
  provinces: API_BASE_URL + "/provinces",
  svgVectorMap: API_BASE_URL + "/svg-vector-map",
  planImage: API_BASE_URL + "/plan-images",
  planItinerary: API_BASE_URL + "/plan-Itineraries",
  locations: API_BASE_URL + "/locations",
  itineraries: API_BASE_URL + "/itineraries",
  activities: API_BASE_URL + "/activities",
};

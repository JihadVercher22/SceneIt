import axios from 'axios';

const SCENIC_API_KEY = 'YOUR_SCENIC_PROJECT_KEY';

export const fetchNearbyTrails = async (lat: number, lon: number) => {
  const response = await axios.get(
    `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=50&key=${HIKING_API_KEY}`
  );
  return response.data.trails;
};

export const fetchTrailDetails = async (trailId: string) => {
  const response = await axios.get(
    `https://www.hikingproject.com/data/get-trails-by-id?ids=${trailId}&key=${HIKING_API_KEY}`
  );
  return response.data.trails[0];
};
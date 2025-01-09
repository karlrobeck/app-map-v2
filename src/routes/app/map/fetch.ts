import * as maptilersdk from "@maptiler/sdk";
import type { GeoJson, GeoJsonCoordinates } from "../../../app";

export const initialState = { lng: 121.02904, lat: 14.69766, zoom: 17.5 };

export const userLocation = { long: 121.0298, lat: 14.6966 };

maptilersdk.config.apiKey = "17pE2Nv1XmrNauiHohBm";

export async function fetchMapData(): Promise<GeoJson> {
  const response = await fetch(`https://api.maptiler.com/data/649d5018-07ca-4356-bea4-0a0e9e396428/features.json?key=${maptilersdk.config.apiKey}`);

  if (!response.ok) {
    throw new Error('Failed to fetch map data');
  }

  return response.json();
}

export function generateCoordinates(mapData: GeoJson) {
  const coordinates: GeoJsonCoordinates[] = [];

  for (const feature of mapData.features) {
    feature.geometry.coordinates.map((coordinate) => {
      //@ts-ignore
      const coords: [number, number] = coordinate;

      coordinates.push({
        long: coords[0],
        lat: coords[1]
      });
    })
  }

  return coordinates;
}

export const loadMap = () => {
  const map = new maptilersdk.Map({
    container: "mainMapContainer",
    style: "81f6dc3d-e229-4e80-b504-d0b750984104",
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom,
  });
  return map;
}
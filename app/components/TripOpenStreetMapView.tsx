"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export type PositionItem = {
  latitude: number;
  longitude: number;
  label?: string;
};

type TripOpenStreetMapViewProps = {
  positions?: PositionItem[];
  zoom?: number;
};

function FitBounds({ positions }: { positions: PositionItem[] }) {
  const map = useMap();

  useEffect(() => {
    if (!positions.length) return;

    const bounds = L.latLngBounds(
      positions.map((item) => [item.latitude, item.longitude]),
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
    });
  }, [positions, map]);

  return null;
}

export default function TripOpenStreetMapView({
  positions = [],
  zoom = 15,
}: TripOpenStreetMapViewProps) {
  const validPositions = positions.filter(
    (item) => item.latitude !== 0 && item.longitude !== 0,
  );

  const center: [number, number] =
    validPositions.length > 0
      ? [validPositions[0].latitude, validPositions[0].longitude]
      : [10.762622, 106.660172];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds positions={validPositions} />

      {validPositions.map((item, index) => (
        <Marker key={index} position={[item.latitude, item.longitude]}>
          <Popup autoPan>
            {item.label ??
              `Marker (lat, lng): ${item.latitude} - ${item.longitude}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

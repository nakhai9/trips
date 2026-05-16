"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export type PositionItem = {
  latitude: number;
  longitude: number;
  label?: string;
};

type TbOpenStreetMapViewProps = {
  positions?: PositionItem[];
  zoom?: number;
};

export default function TripOpenStreetMapView({
  positions = [],
  zoom = 18,
}: TbOpenStreetMapViewProps) {
  const center =
    positions.length > 0
      ? [positions[0].latitude, positions[0].longitude]
      : [10.762622, 106.660172];

  return (
    <MapContainer
      center={center as [number, number]}
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

      {/* render nhiều marker */}
      {positions.map((item, index) => (
        <Marker key={index} position={[item.latitude, item.longitude]}>
          <Popup>{item.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

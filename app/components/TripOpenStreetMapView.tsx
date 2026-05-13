"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

// Props
type TbOpenStreetMapViewProps = {
  longitude?: number;
  latitude?: number;
};

// 👉 Hàm tính khoảng cách (km)
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 👉 Component auto fit 2 điểm
function FitBounds({
  pointA,
  pointB,
}: {
  pointA: [number, number];
  pointB: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    if (!pointA || !pointB) return;

    map.fitBounds([pointA, pointB], {
      padding: [50, 50],
      animate: true,
      duration: 1.5,
    });
  }, [pointA, pointB, map]);

  return null;
}

export default function TripOpenStreetMapView({
  longitude = 105.7233534,
  latitude = 9.2841226,
}: TbOpenStreetMapViewProps) {
  // 👉 Điểm A (từ props)
  const pointA: [number, number] = [latitude, longitude];

  // 👉 Điểm B (demo – thay bằng dữ liệu thật)
  const pointB: [number, number] = [10.0452, 105.7469];

  // 👉 Khoảng cách
  const distance = getDistance(pointA[0], pointA[1], pointB[0], pointB[1]);

  return (
    <MapContainer
      center={pointA} // chỉ để init, sẽ bị fitBounds override
      zoom={13}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "100%",
        marginTop: 4,
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 👉 Auto focus 2 điểm */}
      <FitBounds pointA={pointA} pointB={pointB} />

      {/* Marker A */}
      <Marker position={pointA}>
        <Popup>Điểm A</Popup>
      </Marker>

      {/* Marker B */}
      <Marker position={pointB}>
        <Popup>
          Điểm B <br />
          Khoảng cách: {distance.toFixed(2)} km
        </Popup>
      </Marker>

      {/* Đường nối */}
      <Polyline positions={[pointA, pointB]} />
    </MapContainer>
  );
}

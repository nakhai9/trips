"use client";

import RootLayout from "@/components/layout/RootLayout";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useBaseModalStore } from "@/libs/components/modal/BaseModalStore";
import { useGlobalStore } from "@/store/global-store";
import { Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

function useFetchTrips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useGlobalStore();

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      setIsLoading(true);
      setError(null);

      const data = await HttpClient.get<any>(API_URLS.plan);

      setTrips(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }, []);

  return { trips, loading, error, onLoadTrips: fetchTrips };
}

export default function TripDetailPage() {
  const { trips, loading, error, onLoadTrips } = useFetchTrips();

  const { open } = useBaseModalStore();

  useEffect(() => {
    onLoadTrips();
  }, [onLoadTrips]);
  return (
    <RootLayout>
      <Stack direction="column" spacing={2}></Stack>
    </RootLayout>
  );
}

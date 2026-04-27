export type LookupItem = {
  label: string;
  value: any;
  [key: string]: any;
};

export type ObjectId = {
  objectId?: string;
};

export type Ref = {
  id: string;
  name: string;
};

export type LocationInfo = {
  name: string;
  codeName: string;
  status?: "UPCOMING" | "VISITED" | "NOT_VISITED";
};

export type LocationModel = {
  id?: number;
  name: string;
  codeName: string;
  svgData: string;
};

export type Location = {
  id: string;
  codeName: string;
  name: string;
  mergedInto: string;
  isMerged: boolean;
  countryCode: string;
};

//
export type Plan = {
  id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  accessCode?: string;
  userId?: string;
  canView?: boolean;
};

export type ItineraryNotUse = {
  day: number;
  planId?: string;
  destination: {
    codeName: string | "UNSET";
    name: string | "UNSET";
  };
  activities: ItineraryActivity[];
} & ObjectId;

export type ItineraryActivity = {
  id?: string;
  description: string;
  endTime?: Date;
  startTime?: Date;
  sequence: number;
  itineraryId: string;
  latitude?: number;
  longitude?: number;
  isCompleted?: boolean;
};

export type Itinerary = {
  dayNumber: number;
  id?: string;
  location: Ref | null;
  planId: string;

  activities?: ItineraryActivity[];
} & ObjectId;

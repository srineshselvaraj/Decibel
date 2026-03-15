export type NoiseMotionLevel = "Low" | "Medium" | "High";

export type UserProfile = {
  name: string;
  major: string;
  year: string;
  preferredNoise: NoiseMotionLevel;
  preferredMotion: NoiseMotionLevel;
  preferredAmenities: string[];
};

const initialProfile: UserProfile = {
  name: "Guest Student",
  major: "Computer Science",
  year: "Junior",
  preferredNoise: "Low",
  preferredMotion: "Low",
  preferredAmenities: ["Wi-Fi", "Outlets", "Whiteboard"],
};

let profile: UserProfile = { ...initialProfile };
let viewHistory: string[] = ["3", "2", "1"];
let viewCounts: Record<string, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
};
let savedRoomIds: string[] = [];

export const getProfile = () => profile;

export const updateProfile = (updates: Partial<UserProfile>) => {
  profile = { ...profile, ...updates };
};

export const toggleAmenityPreference = (amenity: string) => {
  if (profile.preferredAmenities.includes(amenity)) {
    profile = {
      ...profile,
      preferredAmenities: profile.preferredAmenities.filter((item) => item !== amenity),
    };
  } else {
    profile = {
      ...profile,
      preferredAmenities: [...profile.preferredAmenities, amenity],
    };
  }
};

export const recordRoomView = (roomId: string) => {
  viewHistory = [roomId, ...viewHistory.filter((id) => id !== roomId)].slice(0, 10);
  viewCounts = {
    ...viewCounts,
    [roomId]: (viewCounts[roomId] ?? 0) + 1,
  };
};

export const getRecentlyViewedRoomIds = (limit = 3) => viewHistory.slice(0, limit);

export const getRoomViewCounts = () => viewCounts;

export const getSavedRoomIds = () => savedRoomIds;

export const isRoomSaved = (roomId: string) => savedRoomIds.includes(roomId);

export const toggleSavedRoom = (roomId: string) => {
  if (savedRoomIds.includes(roomId)) {
    savedRoomIds = savedRoomIds.filter((id) => id !== roomId);
  } else {
    savedRoomIds = [roomId, ...savedRoomIds];
  }
};

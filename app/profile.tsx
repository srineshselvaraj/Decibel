import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    getProfile,
    getSavedRoomIds,
    toggleAmenityPreference,
    updateProfile,
    type NoiseMotionLevel,
} from "../data/profile-store";

const levels: NoiseMotionLevel[] = ["Low", "Medium", "High"];
const amenities = ["Wi-Fi", "TV", "Whiteboard", "Outlets", "Computers", "Printer"];

const roomNames: Record<string, string> = {
  "1": "Study Room 1",
  "2": "Commuter Lounge",
  "3": "Room 3052",
  "4": "Computer Lab",
  "5": "CKB Lounge",
  "6": "Lower Lounge",
  "7": "IDS 2",
  "8": "Highlander Pub",
  "9": "Technology Lab",
  "10": "Littman Library",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(getProfile());

  const savedRooms = useMemo(() => {
    return getSavedRoomIds().slice(0, 3).map((id) => roomNames[id] ?? `Room ${id}`);
  }, [profile]);

  const setNoise = (value: NoiseMotionLevel) => {
    updateProfile({ preferredNoise: value });
    setProfile({ ...getProfile() });
  };

  const setMotion = (value: NoiseMotionLevel) => {
    updateProfile({ preferredMotion: value });
    setProfile({ ...getProfile() });
  };

  const onToggleAmenity = (amenity: string) => {
    toggleAmenityPreference(amenity);
    setProfile({ ...getProfile() });
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileHeaderRow}>
          <View style={styles.avatarPlaceholder}>
            <Image source={require("../assets/images/pfp.png")} style={styles.avatarImage} resizeMode="cover" />
          </View>
          <View style={styles.profileHeaderInfo}>
            <Text style={styles.name}>{profile.name.trim().length > 0 ? profile.name : "Guest Profile"}</Text>
            <Text style={styles.meta}>{profile.major} • {profile.year}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Study Preferences</Text>

        <Text style={styles.label}>Preferred Noise Level</Text>
        <View style={styles.chipRow}>
          {levels.map((level) => (
            <TouchableOpacity
              key={`noise-${level}`}
              style={[styles.chip, profile.preferredNoise === level && styles.chipActive]}
              onPress={() => setNoise(level)}
            >
              <Text style={[styles.chipText, profile.preferredNoise === level && styles.chipTextActive]}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Preferred Motion Level</Text>
        <View style={styles.chipRow}>
          {levels.map((level) => (
            <TouchableOpacity
              key={`motion-${level}`}
              style={[styles.chip, profile.preferredMotion === level && styles.chipActive]}
              onPress={() => setMotion(level)}
            >
              <Text style={[styles.chipText, profile.preferredMotion === level && styles.chipTextActive]}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Preferred Amenities</Text>
        <View style={styles.chipRowWrap}>
          {amenities.map((amenity) => {
            const selected = profile.preferredAmenities.includes(amenity);
            return (
              <TouchableOpacity
                key={amenity}
                style={[styles.chip, selected && styles.chipActive]}
                onPress={() => onToggleAmenity(amenity)}
              >
                <Text style={[styles.chipText, selected && styles.chipTextActive]}>{amenity}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.savedHeaderRow}>
          <Text style={styles.sectionTitle}>Saved Rooms</Text>
          <TouchableOpacity onPress={() => router.push('/saved' as any)}>
            <Text style={styles.viewAllSavedText}>View all</Text>
          </TouchableOpacity>
        </View>
        {savedRooms.length === 0 ? (
          <View style={styles.savedItem}>
            <Text style={styles.snapshotValue}>No saved rooms yet.</Text>
          </View>
        ) : (
          savedRooms.map((room, index) => (
            <View key={`${room}-${index}`} style={styles.savedItem}>
              <Text style={styles.savedIcon}>★</Text>
              <Text style={styles.snapshotValue}>{room}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#1a0f2e",
  },
  container: {
    padding: 20,
    paddingBottom: 32,
    gap: 16,
  },
  profileCard: {
    backgroundColor: "#2d1f47",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#4a3566",
    padding: 18,
  },
  profileHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileHeaderInfo: {
    flex: 1,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3d2857",
    borderWidth: 1,
    borderColor: "#5c4280",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#e8d4ff",
    fontFamily: "System",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: "#b8a3d1",
    fontFamily: "System",
    marginBottom: 2,
  },
  sectionCard: {
    backgroundColor: "#2d1f47",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#4a3566",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#e8d4ff",
    fontFamily: "System",
    marginBottom: 12,
  },
  savedHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  viewAllSavedText: {
    color: "#b8a3d1",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "System",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#c7b3e0",
    fontFamily: "System",
    marginBottom: 8,
    marginTop: 6,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
  },
  chipRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: "#3d2857",
    borderWidth: 1,
    borderColor: "#5c4280",
  },
  chipActive: {
    backgroundColor: "#8b5cf6",
    borderColor: "#9d71f7",
  },
  chipText: {
    color: "#c7b3e0",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "System",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  savedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3d2857",
    borderWidth: 1,
    borderColor: "#5c4280",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  savedIcon: {
    color: "#fbbf24",
    marginRight: 8,
    fontSize: 16,
    lineHeight: 16,
  },
  snapshotValue: {
    fontSize: 14,
    color: "#b8a3d1",
    fontFamily: "System",
    marginBottom: 0,
  },
});

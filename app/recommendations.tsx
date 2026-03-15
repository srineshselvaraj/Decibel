import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getProfile, getRecentlyViewedRoomIds, getRoomViewCounts, getSavedRoomIds, toggleSavedRoom } from "../data/profile-store";

type BaseRoom = {
  id: string;
  name: string;
  location: string;
  icon: any;
  noiseLevel: "Low" | "Medium" | "High";
  motionLevel: "Low" | "Medium" | "High";
  amenities: { icon: any; name: string }[];
};

const allRooms: BaseRoom[] = [
  {
    id: "3",
    name: "Room 3052",
    location: "Van Houten Library",
    icon: require("../assets/images/room.png"),
    noiseLevel: "Low",
    motionLevel: "Low",
    amenities: [
      { icon: require("../assets/images/wifi.png"), name: "Wi-Fi" },
      { icon: require("../assets/images/tv.png"), name: "TV" },
      { icon: require("../assets/images/whiteboard.png"), name: "Whiteboard" },
    ],
  },
  {
    id: "2",
    name: "Commuter Lounge",
    location: "Campus Center",
    icon: require("../assets/images/lounge.png"),
    noiseLevel: "High",
    motionLevel: "High",
    amenities: [
      { icon: require("../assets/images/wifi.png"), name: "Wi-Fi" },
      { icon: require("../assets/images/outlet.png"), name: "Outlets" },
    ],
  },
  {
    id: "4",
    name: "Computer Lab",
    location: "Van Houten Library",
    icon: require("../assets/images/keyboard.png"),
    noiseLevel: "Low",
    motionLevel: "Medium",
    amenities: [
      { icon: require("../assets/images/wifi.png"), name: "Wi-Fi" },
      { icon: require("../assets/images/keyboard.png"), name: "Computers" },
      { icon: require("../assets/images/outlet.png"), name: "Outlets" },
      { icon: require("../assets/images/printer.png"), name: "Printer" },
    ],
  },
  {
    id: "1",
    name: "Study Room 1",
    location: "Maple Hall",
    icon: require("../assets/images/room.png"),
    noiseLevel: "Medium",
    motionLevel: "Low",
    amenities: [
      { icon: require("../assets/images/wifi.png"), name: "Wi-Fi" },
      { icon: require("../assets/images/tv.png"), name: "TV" },
      { icon: require("../assets/images/outlet.png"), name: "Outlets" },
    ],
  },
  {
    id: "5",
    name: "CKB Lounge",
    location: "Central King Building",
    icon: require("../assets/images/lounge.png"),
    noiseLevel: "Medium",
    motionLevel: "High",
    amenities: [{ icon: require("../assets/images/wifi.png"), name: "Wi-Fi" }],
  },
  {
    id: "6",
    name: "Lower Lounge",
    location: "Kupfrian Hall",
    icon: require("../assets/images/lounge.png"),
    noiseLevel: "Medium",
    motionLevel: "Medium",
    amenities: [
      { icon: require("../assets/images/wifi.png"), name: "Wi-Fi" },
      { icon: require("../assets/images/outlet.png"), name: "Outlets" },
    ],
  },
  {
    id: "7",
    name: "IDS 2",
    location: "Martinson Hall",
    icon: require("../assets/images/room.png"),
    noiseLevel: "Low",
    motionLevel: "High",
    amenities: [
      { icon: require("../assets/images/wifi.png"), name: "Wi-Fi" },
      { icon: require("../assets/images/outlet.png"), name: "Outlets" },
      { icon: require("../assets/images/tv.png"), name: "TV" },
      { icon: require("../assets/images/whiteboard.png"), name: "Whiteboard" },
    ],
  },
  {
    id: "8",
    name: "Highlander Pub",
    location: "Campus Center",
    icon: require("../assets/images/lounge.png"),
    noiseLevel: "High",
    motionLevel: "Low",
    amenities: [{ icon: require("../assets/images/wifi.png"), name: "Wi-Fi" }],
  },
  {
    id: "9",
    name: "Technology Lab",
    location: "PC Mall",
    icon: require("../assets/images/keyboard.png"),
    noiseLevel: "Low",
    motionLevel: "Low",
    amenities: [
      { icon: require("../assets/images/wifi.png"), name: "Wi-Fi" },
      { icon: require("../assets/images/outlet.png"), name: "Outlets" },
      { icon: require("../assets/images/keyboard.png"), name: "Computers" },
      { icon: require("../assets/images/printer.png"), name: "Printer" },
    ],
  },
  {
    id: "10",
    name: "Littman Library",
    location: "Weston Hall",
    icon: require("../assets/images/room.png"),
    noiseLevel: "Low",
    motionLevel: "Low",
    amenities: [
      { icon: require("../assets/images/wifi.png"), name: "Wi-Fi" },
      { icon: require("../assets/images/outlet.png"), name: "Outlets" },
      { icon: require("../assets/images/whiteboard.png"), name: "Whiteboard" },
      { icon: require("../assets/images/keyboard.png"), name: "Computers" },
      { icon: require("../assets/images/printer.png"), name: "Printer" },
    ],
  },
];

const getRoomScore = (room: BaseRoom) => {
  const profile = getProfile();
  const recentIds = getRecentlyViewedRoomIds(3);
  const viewCounts = getRoomViewCounts();

  let score = 0;

  if (room.noiseLevel === profile.preferredNoise) score += 4;
  if (room.motionLevel === profile.preferredMotion) score += 4;

  const roomAmenities = room.amenities.map((item) => item.name);
  const amenityMatches = profile.preferredAmenities.filter((amenity) => roomAmenities.includes(amenity)).length;
  score += amenityMatches * 2;

  if (recentIds.includes(room.id)) score += 2;
  score += (viewCounts[room.id] ?? 0) * 0.5;

  return score;
};

const getLevelStyle = (level: string) => {
  switch (level) {
    case "Low":
      return styles.levelLow;
    case "Medium":
      return styles.levelMedium;
    case "High":
      return styles.levelHigh;
    default:
      return {};
  }
};

export default function RecommendationsPage() {
  const [savedRoomIds, setSavedRoomIds] = useState<string[]>(getSavedRoomIds());

  const handleToggleSave = (roomId: string) => {
    toggleSavedRoom(roomId);
    setSavedRoomIds([...getSavedRoomIds()]);
  };

  const recommendedRooms: BaseRoom[] = [...allRooms]
    .filter((room) => !savedRoomIds.includes(room.id))
    .sort((a, b) => getRoomScore(b) - getRoomScore(a))
    .slice(0, 3);

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <View style={styles.introCard}>
        <Text style={styles.introTitle}>Recommended For You</Text>
        <Text style={styles.introText}>
          These picks are based on your selected preferences and recent room activity.
        </Text>
      </View>

      {recommendedRooms.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No new recommendations right now</Text>
          <Text style={styles.emptyText}>You’ve already saved the current top matches. Try updating your preferences or browsing more rooms.</Text>
        </View>
      ) : recommendedRooms.map((room) => (
        <Pressable
          key={room.id}
          style={({ pressed }) => [styles.roomCard, pressed && styles.roomCardPressed]}
          onPress={() => router.push(`/room/${room.id}?name=${encodeURIComponent(room.name)}` as any)}
        >
          <View style={styles.roomHeader}>
            <Image source={room.icon} style={styles.iconPlaceholder} resizeMode="contain" />
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomLocation}>{room.location}</Text>
            </View>
            <TouchableOpacity style={styles.bookmarkButton} onPress={() => handleToggleSave(room.id)}>
              <Text style={styles.bookmarkIcon}>{savedRoomIds.includes(room.id) ? "★" : "☆"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.levelsContainer}>
            <View style={styles.levelItem}>
              <Image source={require("../assets/images/noise.png")} style={styles.iconPlaceholderSmall} resizeMode="contain" />
              <View style={styles.levelInfo}>
                <Text style={styles.levelLabel}>Noise</Text>
                <Text style={[styles.levelValue, getLevelStyle(room.noiseLevel)]}>{room.noiseLevel}</Text>
              </View>
            </View>
            <View style={styles.levelItem}>
              <Image source={require("../assets/images/motion.png")} style={styles.iconPlaceholderSmall} resizeMode="contain" />
              <View style={styles.levelInfo}>
                <Text style={styles.levelLabel}>Motion</Text>
                <Text style={[styles.levelValue, getLevelStyle(room.motionLevel)]}>{room.motionLevel}</Text>
              </View>
            </View>
          </View>

          <View style={styles.amenitiesContainer}>
            {room.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityBox}>
                <Image source={amenity.icon} style={styles.iconPlaceholderTiny} resizeMode="contain" />
                <Text style={styles.amenityText}>{amenity.name}</Text>
              </View>
            ))}
          </View>
        </Pressable>
      ))}

      <TouchableOpacity style={styles.viewMoreButton} onPress={() => router.push('/rooms' as any)}>
        <Text style={styles.viewMoreButtonText}>View More Rooms</Text>
      </TouchableOpacity>
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
    paddingBottom: 30,
  },
  introCard: {
    backgroundColor: "#2d1f47",
    borderWidth: 1,
    borderColor: "#4a3566",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e8d4ff",
    marginBottom: 6,
    fontFamily: "System",
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#c7b3e0",
    fontFamily: "System",
  },
  emptyCard: {
    backgroundColor: "#2d1f47",
    borderWidth: 1,
    borderColor: "#4a3566",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e8d4ff",
    marginBottom: 6,
    fontFamily: "System",
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#b8a3d1",
    fontFamily: "System",
  },
  roomCard: {
    padding: 20,
    backgroundColor: "#2d1f47",
    borderWidth: 1,
    borderColor: "#4a3566",
    borderRadius: 16,
    marginBottom: 20,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  roomCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  roomHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  roomInfo: {
    flex: 1,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#e8d4ff",
    padding: 8,
  },
  roomName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#e8d4ff",
    fontFamily: "System",
  },
  roomLocation: {
    fontSize: 16,
    color: "#b8a3d1",
    fontFamily: "System",
  },
  bookmarkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3d2857",
    borderWidth: 1,
    borderColor: "#5c4280",
  },
  bookmarkIcon: {
    fontSize: 18,
    color: "#fbbf24",
  },
  levelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#4a3566",
  },
  levelItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  levelInfo: {
    alignItems: "center",
  },
  iconPlaceholderSmall: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: "#e8d4ff",
    padding: 4,
  },
  levelLabel: {
    fontSize: 12,
    color: "#9d88b8",
    marginBottom: 4,
    textTransform: "uppercase",
    fontFamily: "System",
  },
  levelValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e8d4ff",
    fontFamily: "System",
    minWidth: 70,
    textAlign: "center",
  },
  levelLow: {
    color: "#4ade80",
  },
  levelMedium: {
    color: "#fbbf24",
  },
  levelHigh: {
    color: "#f87171",
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3d2857",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5c4280",
  },
  iconPlaceholderTiny: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: "#e8d4ff",
    padding: 2,
  },
  amenityText: {
    fontSize: 14,
    color: "#c7b3e0",
    fontWeight: "500",
    fontFamily: "System",
  },
  viewMoreButton: {
    backgroundColor: "#8b5cf6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  viewMoreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
});

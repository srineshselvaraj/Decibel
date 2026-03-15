import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

export default function DeciBotSuggestion() {
  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <View style={styles.responseCard}>
        <Text style={styles.responseTitle}>DeciBot Response</Text>
        <Text style={styles.responseText}>
          AI search is not available yet, but a great place to start is the Commuter Lounge since it's one of the most common study spots on campus.
        </Text>
      </View>

      <Text style={styles.sectionLabel}>Suggested Room</Text>

      <Pressable
        style={({ pressed }) => [styles.roomCard, pressed && styles.roomCardPressed]}
        onPress={() => router.push('/room/2?name=Commuter%20Lounge' as any)}
      >
        <View style={styles.roomHeader}>
          <Image source={require('../assets/images/lounge.png')} style={styles.iconPlaceholder} />
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>Commuter Lounge</Text>
            <Text style={styles.roomLocation}>Campus Center</Text>
          </View>
        </View>

        <View style={styles.levelsContainer}>
          <View style={styles.levelItem}>
            <Image source={require('../assets/images/noise.png')} style={styles.iconPlaceholderSmall} />
            <View style={styles.levelInfo}>
              <Text style={styles.levelLabel}>Noise</Text>
              <Text style={[styles.levelValue, getLevelStyle('High')]}>High</Text>
            </View>
          </View>
          <View style={styles.levelItem}>
            <Image source={require('../assets/images/motion.png')} style={styles.iconPlaceholderSmall} />
            <View style={styles.levelInfo}>
              <Text style={styles.levelLabel}>Motion</Text>
              <Text style={[styles.levelValue, getLevelStyle('High')]}>High</Text>
            </View>
          </View>
        </View>

        <View style={styles.amenitiesContainer}>
          <View style={styles.amenityBox}>
            <Image source={require('../assets/images/wifi.png')} style={styles.iconPlaceholderTiny} />
            <Text style={styles.amenityText}>Wi-Fi</Text>
          </View>
          <View style={styles.amenityBox}>
            <Image source={require('../assets/images/outlet.png')} style={styles.iconPlaceholderTiny} />
            <Text style={styles.amenityText}>Outlets</Text>
          </View>
        </View>
      </Pressable>

      <TouchableOpacity style={styles.browseButton} onPress={() => router.push('/rooms' as any)}>
        <Text style={styles.browseButtonText}>Browse More Rooms</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1a0f2e',
  },
  container: {
    padding: 20,
    paddingBottom: 30,
  },
  responseCard: {
    backgroundColor: '#2d1f47',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4a3566',
    padding: 18,
    marginBottom: 22,
  },
  responseTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e8d4ff',
    marginBottom: 8,
    fontFamily: 'System',
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#c7b3e0',
    fontFamily: 'System',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e8d4ff',
    marginBottom: 10,
    fontFamily: 'System',
  },
  roomCard: {
    padding: 20,
    backgroundColor: '#2d1f47',
    borderWidth: 1,
    borderColor: '#4a3566',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  roomInfo: {
    flex: 1,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e8d4ff',
    padding: 8,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#e8d4ff',
    fontFamily: 'System',
  },
  roomLocation: {
    fontSize: 16,
    color: '#b8a3d1',
    fontFamily: 'System',
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#4a3566',
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  levelInfo: {
    alignItems: 'center',
  },
  iconPlaceholderSmall: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#e8d4ff',
    padding: 4,
  },
  levelLabel: {
    fontSize: 12,
    color: '#9d88b8',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontFamily: 'System',
  },
  levelValue: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
    minWidth: 70,
    textAlign: 'center',
  },
  levelLow: {
    color: '#4ade80',
  },
  levelMedium: {
    color: '#fbbf24',
  },
  levelHigh: {
    color: '#f87171',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d2857',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5c4280',
  },
  iconPlaceholderTiny: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: '#e8d4ff',
    padding: 2,
  },
  amenityText: {
    fontSize: 14,
    color: '#c7b3e0',
    fontWeight: '500',
    fontFamily: 'System',
  },
  browseButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
});

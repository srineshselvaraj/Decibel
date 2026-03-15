import { router } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Decibel</Text>
        <Text style={styles.slogan}>Innovating through pure sound</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.aiCard}>
          <View style={styles.aiLabelContainer}>
            <Image source={require('../assets/images/robot.png')} style={styles.deciBotIcon} />
            <Text style={styles.aiLabel}>Ask DeciBot</Text>
          </View>
          <View style={styles.aiSection}>
            <TextInput 
              style={styles.promptInput}
              placeholder="Hi! What room are you looking for?" 
              placeholderTextColor="#9d88b8"
              multiline
            />
            <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/decibot' as any)}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomActions}>
          <Text style={styles.actionsHeading}>Quick Access</Text>

          <View style={styles.topActionRow}>
            <TouchableOpacity 
              style={styles.actionHalfButton}
              onPress={() => router.push('/profile' as any)}
            >
              <Text style={styles.actionHalfButtonText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionHalfButton}
              onPress={() => router.push('/recommendations' as any)}
            >
              <Text style={styles.actionHalfButtonText}>Recommendations</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/rooms' as any)}
          >
            <Text style={styles.viewAllButtonText}>View All Rooms</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.disclaimerText}>
        Prototype note: Some features are still in development and may not be fully functional yet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a0f2e",
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 26,
  },
  headerSection: {
    marginTop: 50,
    marginBottom: 22,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#e8d4ff",
    fontFamily: "System",
    textAlign: "center",
    marginBottom: 6,
  },
  slogan: {
    fontSize: 15,
    color: "#b8a3d1",
    fontFamily: "System",
    textAlign: "center",
    fontStyle: "italic",
  },
  aiCard: {
    backgroundColor: "#25173c",
    borderWidth: 1,
    borderColor: "#4a3566",
    borderRadius: 18,
    padding: 16,
  },
  aiSection: {
    marginTop: 6,
  },
  aiLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  deciBotIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e8d4ff",
    marginRight: 8,
    padding: 4,
  },
  aiLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e8d4ff",
    fontFamily: "System",
  },
  promptInput: {
    backgroundColor: "#2d1f47",
    borderRadius: 16,
    padding: 16,
    color: "#e8d4ff",
    fontFamily: "System",
    fontSize: 16,
    minHeight: 110,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#4a3566",
    marginBottom: 14,
  },
  searchButton: {
    backgroundColor: "#8b5cf6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a78bfa",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "System",
  },
  bottomActions: {
    marginTop: 16,
    gap: 10,
  },
  actionsHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#b8a3d1",
    fontFamily: "System",
    marginBottom: 2,
  },
  topActionRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionHalfButton: {
    flex: 1,
    backgroundColor: "#2b1d45",
    borderWidth: 1,
    borderColor: "#5c4280",
    borderRadius: 12,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  actionHalfButtonText: {
    color: "#d9c2ff",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
  },
  viewAllButton: {
    backgroundColor: "#2f2150",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#6d4ba3",
  },
  viewAllButtonText: {
    color: "#efe4ff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
  disclaimerText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16,
    color: "#9d88b8",
    fontFamily: "System",
  },
});
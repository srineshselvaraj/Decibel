import { router } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Decibel</Text>
        <Text style={styles.slogan}>Innovating through pure sound</Text>
        <View style={styles.aiLabelContainer}>
          <Image source={require('../assets/images/robot.png')} style={styles.deciBotIcon} />
          <Text style={styles.aiLabel}>Ask DeciBot:</Text>
        </View>
        <View style={styles.aiSection}>
          <TextInput 
            style={styles.promptInput}
            placeholder="Hi! What room are you looking for today?" 
            placeholderTextColor="#9d88b8"
            multiline
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.viewAllButton}
        onPress={() => router.push('/rooms' as any)}
      >
        <Text style={styles.viewAllButtonText}>View All Rooms</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a0f2e",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#e8d4ff",
    fontFamily: "System",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 30,
  },
  slogan: {
    fontSize: 16,
    color: "#b8a3d1",
    fontFamily: "System",
    textAlign: "center",
    marginBottom: 40,
    fontStyle: "italic",
  },
  aiSection: {
    marginTop: 8,
  },
  aiLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
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
    minHeight: 120,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#4a3566",
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: "#8b5cf6",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "System",
  },
  viewAllButton: {
    backgroundColor: "#2d1f47",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4a3566",
    marginTop: 20,
  },
  viewAllButtonText: {
    color: "#e8d4ff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "System",
  },
});
import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const roomsData = [
    {
        id: "1",
        name: "Study Room 1",
        location: "Maple Hall",
        icon: require('../assets/images/room.png'),
        noiseLevel: "Medium",
        motionLevel: "Low",
        amenities: [
            { icon: require('../assets/images/wifi.png'), name: "Wi-Fi" },
            { icon: require('../assets/images/tv.png'), name: "TV" },
            { icon: require('../assets/images/outlet.png'), name: "Outlets" },
        ]
    },
    {
        id: "2",
        name: "Commuter Lounge",
        location: "Campus Center",
        icon: require('../assets/images/lounge.png'),
        noiseLevel: "High",
        motionLevel: "High",
        amenities: [
            { icon: require('../assets/images/wifi.png'), name: "Wi-Fi" },
            { icon: require('../assets/images/outlet.png'), name: "Outlets" },
        ]
    },
    {
        id: "3",
        name: "Room 3052",
        location: "Van Houten Library",
        icon: require('../assets/images/room.png'),
        noiseLevel: "Low",
        motionLevel: "Low",
        amenities: [
            { icon: require('../assets/images/wifi.png'), name: "Wi-Fi" },
            { icon: require('../assets/images/tv.png'), name: "TV" },
            { icon: require('../assets/images/whiteboard.png'), name: "Whiteboard" },
            { icon: require('../assets/images/outlet.png'), name: "Outlets" },
        ]
    },
];

const getLevelStyle = (level: string) => {
    switch(level) {
        case "Low": return styles.levelLow;
        case "Medium": return styles.levelMedium;
        case "High": return styles.levelHigh;
        default: return {};
    }
};

export default function Rooms() {
    const handleRoomPress = (room: typeof roomsData[0]) => {
        router.push(`/room/${room.id}?name=${encodeURIComponent(room.name)}` as any);
    };

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Available Rooms</Text>
            {roomsData.map((room) => (
                <Pressable 
                    key={room.id}
                    style={({ pressed }) => [
                        styles.roomCard,
                        pressed && styles.roomCardPressed
                    ]}
                    onPress={() => handleRoomPress(room)}
                >
                    <View style={styles.roomHeader}>
                        <Image source={room.icon} style={styles.iconPlaceholder} />
                        <View style={styles.roomInfo}>
                            <Text style={styles.roomName} numberOfLines={2} ellipsizeMode="tail">
                                {room.name}
                            </Text>
                            <Text style={styles.roomLocation}>{room.location}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.levelsContainer}>
                        <View style={styles.levelItem}>
                            <Image source={require('../assets/images/noise.png')} style={styles.iconPlaceholderSmall} />
                            <View style={styles.levelInfo}>
                                <Text style={styles.levelLabel}>Noise</Text>
                                <Text style={[styles.levelValue, getLevelStyle(room.noiseLevel)]}>
                                    {room.noiseLevel}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.levelItem}>
                            <Image source={require('../assets/images/motion.png')} style={styles.iconPlaceholderSmall} />
                            <View style={styles.levelInfo}>
                                <Text style={styles.levelLabel}>Motion</Text>
                                <Text style={[styles.levelValue, getLevelStyle(room.motionLevel)]}>
                                    {room.motionLevel}
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.amenitiesContainer}>
                        {room.amenities.map((amenity, index) => (
                            <View key={index} style={styles.amenityBox}>
                                <Image source={amenity.icon} style={styles.iconPlaceholderTiny} />
                                <Text style={styles.amenityText}>{amenity.name}</Text>
                            </View>
                        ))}
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "#1a0f2e",
    },
    container: {
        paddingTop: 70,
        paddingBottom: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#e8d4ff",
        fontFamily: "System",
    },
    roomCard: {
        padding: 20,
        backgroundColor: "#2d1f47",
        borderWidth: 1,
        borderColor: "#4a3566",
        borderRadius: 16,
        marginBottom: 20,
        width: 350,
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
        marginTop: 8,
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
});
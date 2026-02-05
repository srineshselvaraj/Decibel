import { router } from "expo-router";
import { useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    {
        id: "4",
        name: "Computer Lab",
        location: "Van Houten Library",
        icon: require('../assets/images/keyboard.png'),
        noiseLevel: "Low",
        motionLevel: "Medium",
        amenities: [
            { icon: require('../assets/images/wifi.png'), name: "Wi-Fi" },
            { icon: require('../assets/images/outlet.png'), name: "Outlets" },
            { icon: require('../assets/images/keyboard.png'), name: "Computers" },
        ]
    },
    {
        id: "5",
        name: "CKB Lounge",
        location: "Central King Building",
        icon: require('../assets/images/lounge.png'),
        noiseLevel: "Medium",
        motionLevel: "High",
        amenities: [
            { icon: require('../assets/images/wifi.png'), name: "Wi-Fi" },
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
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedNoise, setSelectedNoise] = useState<string[]>([]);
    const [selectedMotion, setSelectedMotion] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const locations = ["Maple Hall", "Campus Center", "Van Houten Library", "Central King Building"];
    const noiseLevels = ["Low", "Medium", "High"];
    const motionLevels = ["Low", "Medium", "High"];
    const amenities = ["Wi-Fi", "TV", "Whiteboard", "Outlets", "Computers"];

    const handleRoomPress = (room: typeof roomsData[0]) => {
        router.push(`/room/${room.id}?name=${encodeURIComponent(room.name)}` as any);
    };

    const toggleFilter = (value: string, selected: string[], setSelected: (arr: string[]) => void) => {
        if (selected.includes(value)) {
            setSelected(selected.filter(item => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    const clearAllFilters = () => {
        setSelectedLocations([]);
        setSelectedNoise([]);
        setSelectedMotion([]);
        setSelectedAmenities([]);
    };

    const getActiveFilterCount = () => {
        return selectedLocations.length + selectedNoise.length + selectedMotion.length + selectedAmenities.length;
    };

    const filteredRooms = roomsData.filter(room => {
        // Location filter
        if (selectedLocations.length > 0 && !selectedLocations.includes(room.location)) {
            return false;
        }
        // Noise filter
        if (selectedNoise.length > 0 && !selectedNoise.includes(room.noiseLevel)) {
            return false;
        }
        // Motion filter
        if (selectedMotion.length > 0 && !selectedMotion.includes(room.motionLevel)) {
            return false;
        }
        // Amenities filter - room must have ALL selected amenities
        if (selectedAmenities.length > 0) {
            const roomAmenityNames = room.amenities.map(a => a.name);
            const hasAllAmenities = selectedAmenities.every(amenity => roomAmenityNames.includes(amenity));
            if (!hasAllAmenities) {
                return false;
            }
        }
        return true;
    });

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Available Rooms</Text>
            
            {/* Filter Button */}
            <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
                <Image source={require('../assets/images/filter.png')} style={styles.filterIcon} />
                <Text style={styles.filterButtonText}>Filter</Text>
                {getActiveFilterCount() > 0 && (
                    <View style={styles.filterBadge}>
                        <Text style={styles.filterBadgeText}>{getActiveFilterCount()}</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Room Cards */}
            {filteredRooms.length === 0 ? (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No rooms match your filters</Text>
                    <TouchableOpacity onPress={clearAllFilters}>
                        <Text style={styles.clearFiltersText}>Clear all filters</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                filteredRooms.map((room) => (
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
                                <Image source={amenity.icon} style={styles.iconPlaceholderTiny} resizeMode="contain" />
                                <Text style={styles.amenityText}>{amenity.name}</Text>
                            </View>
                        ))}
                    </View>
                </Pressable>
            ))
            )}

            {/* Filter Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Filter Rooms</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalScroll}>
                            {/* Location Filter */}
                            <View style={styles.filterSection}>
                                <Text style={styles.filterSectionTitle}>Location</Text>
                                <View style={styles.filterOptions}>
                                    {locations.map(location => (
                                        <TouchableOpacity
                                            key={location}
                                            style={[
                                                styles.filterChip,
                                                selectedLocations.includes(location) && styles.filterChipActive
                                            ]}
                                            onPress={() => toggleFilter(location, selectedLocations, setSelectedLocations)}
                                        >
                                            <Text style={[
                                                styles.filterChipText,
                                                selectedLocations.includes(location) && styles.filterChipTextActive
                                            ]}>
                                                {location}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Noise Level Filter */}
                            <View style={styles.filterSection}>
                                <Text style={styles.filterSectionTitle}>Noise Level</Text>
                                <View style={styles.filterOptions}>
                                    {noiseLevels.map(level => (
                                        <TouchableOpacity
                                            key={level}
                                            style={[
                                                styles.filterChip,
                                                selectedNoise.includes(level) && styles.filterChipActive
                                            ]}
                                            onPress={() => toggleFilter(level, selectedNoise, setSelectedNoise)}
                                        >
                                            <Text style={[
                                                styles.filterChipText,
                                                selectedNoise.includes(level) && styles.filterChipTextActive
                                            ]}>
                                                {level}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Motion Level Filter */}
                            <View style={styles.filterSection}>
                                <Text style={styles.filterSectionTitle}>Motion Level</Text>
                                <View style={styles.filterOptions}>
                                    {motionLevels.map(level => (
                                        <TouchableOpacity
                                            key={level}
                                            style={[
                                                styles.filterChip,
                                                selectedMotion.includes(level) && styles.filterChipActive
                                            ]}
                                            onPress={() => toggleFilter(level, selectedMotion, setSelectedMotion)}
                                        >
                                            <Text style={[
                                                styles.filterChipText,
                                                selectedMotion.includes(level) && styles.filterChipTextActive
                                            ]}>
                                                {level}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Amenities Filter */}
                            <View style={styles.filterSection}>
                                <Text style={styles.filterSectionTitle}>Amenities</Text>
                                <View style={styles.filterOptions}>
                                    {amenities.map(amenity => (
                                        <TouchableOpacity
                                            key={amenity}
                                            style={[
                                                styles.filterChip,
                                                selectedAmenities.includes(amenity) && styles.filterChipActive
                                            ]}
                                            onPress={() => toggleFilter(amenity, selectedAmenities, setSelectedAmenities)}
                                        >
                                            <Text style={[
                                                styles.filterChipText,
                                                selectedAmenities.includes(amenity) && styles.filterChipTextActive
                                            ]}>
                                                {amenity}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity 
                                style={styles.clearButton}
                                onPress={clearAllFilters}
                            >
                                <Text style={styles.clearButtonText}>Clear All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.applyButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.applyButtonText}>Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "#1a0f2e",
    },
    container: {
        paddingTop: 20,
        paddingBottom: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 15,
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
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#8b5cf6",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff",
        fontFamily: "System",
    },
    filterIcon: {
        width: 18,
        height: 18,
        borderRadius: 4,
        marginRight: 8,
        backgroundColor: "#ffffff",
        padding: 3,
    },
    filterBadge: {
        backgroundColor: "#ff4757",
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    filterBadgeText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: "System",
    },
    noResultsContainer: {
        alignItems: "center",
        paddingVertical: 60,
    },
    noResultsText: {
        fontSize: 18,
        color: "#b8a3d1",
        marginBottom: 12,
        fontFamily: "System",
    },
    clearFiltersText: {
        fontSize: 16,
        color: "#8b5cf6",
        fontWeight: "600",
        textDecorationLine: "underline",
        fontFamily: "System",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#2d1f47",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: "80%",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#4a3566",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#4a3566",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#e8d4ff",
        fontFamily: "System",
    },
    closeButton: {
        fontSize: 28,
        color: "#b8a3d1",
        fontWeight: "300",
    },
    modalScroll: {
        padding: 20,
    },
    filterSection: {
        marginBottom: 24,
    },
    filterSectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#e8d4ff",
        marginBottom: 12,
        fontFamily: "System",
    },
    filterOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    filterChip: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#3d2857",
        borderWidth: 2,
        borderColor: "#5c4280",
    },
    filterChipActive: {
        backgroundColor: "#8b5cf6",
        borderColor: "#9d71f7",
    },
    filterChipText: {
        fontSize: 14,
        color: "#c7b3e0",
        fontWeight: "500",
        fontFamily: "System",
    },
    filterChipTextActive: {
        color: "#ffffff",
        fontWeight: "600",
    },
    modalFooter: {
        flexDirection: "row",
        padding: 20,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: "#4a3566",
    },
    clearButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#3d2857",
        borderWidth: 1,
        borderColor: "#5c4280",
        alignItems: "center",
    },
    clearButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#b8a3d1",
        fontFamily: "System",
    },
    applyButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#8b5cf6",
        alignItems: "center",
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff",
        fontFamily: "System",
    },
});
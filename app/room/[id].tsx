import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isRoomSaved, recordRoomView, toggleSavedRoom } from "../../data/profile-store";
const getRoomData = (id: string) => {
    const rooms: any = {
        "1": {
            name: "Study Room 1",
            location: "Maple Hall",
            icon: require('../../assets/images/room.png'),
            noiseLevel: "Medium",
            motionLevel: "Low",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
                { icon: require('../../assets/images/tv.png'), name: "TV" },
                { icon: require('../../assets/images/outlet.png'), name: "Outlets" },
            ],
            rating: 4.5,
            reviewCount: 18,
            activityData: [
                { time: "8am", level: 40 },
                { time: "10am", level: 60 },
                { time: "12pm", level: 75 },
                { time: "2pm", level: 85 },
                { time: "4pm", level: 70 },
                { time: "6pm", level: 50 },
                { time: "8pm", level: 30 },
            ],
            activityBadge: { text: "↓ 12% quieter than usual", color: "#4ade80" },
            comments: [
                {
                    user: "Alex T.",
                    date: "3 days ago",
                    rating: 5,
                    comment: "Perfect for group projects! The TV is great for presentations and the room is spacious."
                },
                {
                    user: "Jordan P.",
                    date: "1 week ago",
                    rating: 4,
                    comment: "Usually available in the mornings. Good WiFi and plenty of outlets for laptops."
                },
                {
                    user: "Casey R.",
                    date: "2 weeks ago",
                    rating: 4,
                    comment: "Nice study space, but can get a bit warm in the afternoon. Otherwise great!"
                },
            ]
        },
        "2": {
            name: "Commuter Lounge",
            location: "Campus Center",
            icon: require('../../assets/images/lounge.png'),
            noiseLevel: "High",
            motionLevel: "High",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
                { icon: require('../../assets/images/outlet.png'), name: "Outlets" },
            ],
            rating: 3.8,
            reviewCount: 32,
            activityData: [
                { time: "8am", level: 50 },
                { time: "10am", level: 70 },
                { time: "12pm", level: 95 },
                { time: "2pm", level: 85 },
                { time: "4pm", level: 90 },
                { time: "6pm", level: 60 },
                { time: "8pm", level: 45 },
            ],
            activityBadge: { text: "↑ 23% busier than usual", color: "#f87171" },
            comments: [
                {
                    user: "Taylor M.",
                    date: "1 day ago",
                    rating: 4,
                    comment: "Great social atmosphere! Perfect for meeting friends between classes. Can be loud though."
                },
                {
                    user: "Sam K.",
                    date: "5 days ago",
                    rating: 3,
                    comment: "Convenient location but gets very crowded during lunch hours. Not ideal for focused studying."
                },
                {
                    user: "Morgan L.",
                    date: "1 week ago",
                    rating: 4,
                    comment: "Love the vibe here! Good place to relax and grab a snack. WiFi is reliable."
                },
            ]
        },
        "3": {
            name: "Room 3052",
            location: "Van Houten Library",
            icon: require('../../assets/images/room.png'),
            noiseLevel: "Low",
            motionLevel: "Low",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
                { icon: require('../../assets/images/tv.png'), name: "TV" },
                { icon: require('../../assets/images/whiteboard.png'), name: "Whiteboard" },
                { icon: require('../../assets/images/outlet.png'), name: "Outlets" },
            ],
            rating: 4.9,
            reviewCount: 27,
            activityData: [
                { time: "8am", level: 25 },
                { time: "10am", level: 45 },
                { time: "12pm", level: 55 },
                { time: "2pm", level: 65 },
                { time: "4pm", level: 80 },
                { time: "6pm", level: 90 },
                { time: "8pm", level: 85 },
            ],
            activityBadge: { text: "→ Normal activity levels", color: "#fbbf24" },
            comments: [
                {
                    user: "Sarah M.",
                    date: "2 days ago",
                    rating: 5,
                    comment: "Best study room in the library! Super quiet and the whiteboards are perfect for working through problems."
                },
                {
                    user: "Mike J.",
                    date: "1 week ago",
                    rating: 5,
                    comment: "Love this room for late night study sessions. Very peaceful and well-maintained."
                },
                {
                    user: "Emma L.",
                    date: "2 weeks ago",
                    rating: 5,
                    comment: "My go-to spot for finals week. Always quiet and has everything you need for productive studying."
                },
            ]
        },
        "4": {
            name: "Computer Lab",
            location: "Van Houten Library",
            icon: require('../../assets/images/keyboard.png'),
            noiseLevel: "Low",
            motionLevel: "Medium",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
                { icon: require('../../assets/images/outlet.png'), name: "Outlets" },
                { icon: require('../../assets/images/keyboard.png'), name: "Computers" },
                { icon: require('../../assets/images/printer.png'), name: "Printer" },
            ],
            rating: 4.3,
            reviewCount: 41,
            activityData: [
                { time: "8am", level: 20 },
                { time: "10am", level: 55 },
                { time: "12pm", level: 80 },
                { time: "2pm", level: 95 },
                { time: "4pm", level: 85 },
                { time: "6pm", level: 65 },
                { time: "8pm", level: 70 },
            ],
            activityBadge: { text: "→ Normal activity levels", color: "#fbbf24" },
            comments: [
                {
                    user: "Chris B.",
                    date: "1 day ago",
                    rating: 5,
                    comment: "All computers have updated software and dual monitors. Great for coding projects!"
                },
                {
                    user: "Maya S.",
                    date: "4 days ago",
                    rating: 4,
                    comment: "Good lab with fast computers. Can get crowded in the afternoon but usually a seat available."
                },
                {
                    user: "Dev P.",
                    date: "1 week ago",
                    rating: 4,
                    comment: "Solid workspace for CS assignments. Quiet environment, everyone respects the study vibe."
                },
            ]
        },
        "5": {
            name: "CKB Lounge",
            location: "Central King Building",
            icon: require('../../assets/images/lounge.png'),
            noiseLevel: "Medium",
            motionLevel: "High",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
            ],
            rating: 3.6,
            reviewCount: 24,
            activityData: [
                { time: "8am", level: 35 },
                { time: "10am", level: 65 },
                { time: "12pm", level: 90 },
                { time: "2pm", level: 75 },
                { time: "4pm", level: 85 },
                { time: "6pm", level: 55 },
                { time: "8pm", level: 40 },
            ],
            activityBadge: { text: "↑ 15% busier than usual", color: "#f87171" },
            comments: [
                {
                    user: "Riley D.",
                    date: "2 days ago",
                    rating: 4,
                    comment: "Chill spot to hang out and do light reading. Not for serious studying but good for breaks!"
                },
                {
                    user: "Jamie L.",
                    date: "5 days ago",
                    rating: 3,
                    comment: "Gets pretty noisy with people chatting. Fine if you're just reviewing notes between classes."
                },
                {
                    user: "Pat K.",
                    date: "1 week ago",
                    rating: 4,
                    comment: "Comfortable seating and decent WiFi. I come here to work on creative projects when I need a change of scenery."
                },
            ]
        },
        "6": {
            name: "Lower Lounge",
            location: "Kupfrian Hall",
            icon: require('../../assets/images/lounge.png'),
            noiseLevel: "Medium",
            motionLevel: "Medium",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
                { icon: require('../../assets/images/outlet.png'), name: "Outlets" },
            ],
            rating: 4.0,
            reviewCount: 19,
            activityData: [
                { time: "8am", level: 30 },
                { time: "10am", level: 55 },
                { time: "12pm", level: 70 },
                { time: "2pm", level: 75 },
                { time: "4pm", level: 65 },
                { time: "6pm", level: 50 },
                { time: "8pm", level: 35 },
            ],
            activityBadge: { text: "→ Steady midday activity", color: "#fbbf24" },
            comments: [
                {
                    user: "Nina H.",
                    date: "2 days ago",
                    rating: 4,
                    comment: "Good in-between spot for studying after classes. Usually enough seating."
                },
                {
                    user: "Ari M.",
                    date: "6 days ago",
                    rating: 4,
                    comment: "Nice balance of quiet and movement. Great if you don't want total silence."
                },
                {
                    user: "Leo P.",
                    date: "1 week ago",
                    rating: 4,
                    comment: "Outlets are easy to find and Wi-Fi is stable."
                },
            ]
        },
        "7": {
            name: "IDS 2",
            location: "Martinson Hall",
            icon: require('../../assets/images/room.png'),
            noiseLevel: "Low",
            motionLevel: "High",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
                { icon: require('../../assets/images/outlet.png'), name: "Outlets" },
                { icon: require('../../assets/images/tv.png'), name: "TV" },
                { icon: require('../../assets/images/whiteboard.png'), name: "Whiteboard" },
            ],
            rating: 4.4,
            reviewCount: 28,
            activityData: [
                { time: "8am", level: 20 },
                { time: "10am", level: 45 },
                { time: "12pm", level: 80 },
                { time: "2pm", level: 90 },
                { time: "4pm", level: 85 },
                { time: "6pm", level: 60 },
                { time: "8pm", level: 40 },
            ],
            activityBadge: { text: "↑ Busy during class blocks", color: "#f87171" },
            comments: [
                {
                    user: "Zoe K.",
                    date: "1 day ago",
                    rating: 5,
                    comment: "Excellent for team work. Whiteboard + TV setup is super useful."
                },
                {
                    user: "Ryan T.",
                    date: "4 days ago",
                    rating: 4,
                    comment: "Room stays quiet enough, but there’s frequent foot traffic nearby."
                },
                {
                    user: "Mia C.",
                    date: "1 week ago",
                    rating: 4,
                    comment: "Great collaborative space, especially for project meetings."
                },
            ]
        },
        "8": {
            name: "Highlander Pub",
            location: "Campus Center",
            icon: require('../../assets/images/lounge.png'),
            noiseLevel: "High",
            motionLevel: "Low",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
            ],
            rating: 3.7,
            reviewCount: 22,
            activityData: [
                { time: "8am", level: 15 },
                { time: "10am", level: 35 },
                { time: "12pm", level: 65 },
                { time: "2pm", level: 75 },
                { time: "4pm", level: 80 },
                { time: "6pm", level: 90 },
                { time: "8pm", level: 85 },
            ],
            activityBadge: { text: "↑ Louder in late afternoon", color: "#f87171" },
            comments: [
                {
                    user: "Owen D.",
                    date: "2 days ago",
                    rating: 4,
                    comment: "Not ideal for deep focus, but nice if you like studying with ambient noise."
                },
                {
                    user: "Grace L.",
                    date: "5 days ago",
                    rating: 3,
                    comment: "Comfortable spot and good Wi-Fi, but definitely louder than most study areas."
                },
                {
                    user: "Noah B.",
                    date: "1 week ago",
                    rating: 4,
                    comment: "Good for casual review sessions and quick laptop work."
                },
            ]
        },
        "9": {
            name: "Technology Lab",
            location: "PC Mall",
            icon: require('../../assets/images/keyboard.png'),
            noiseLevel: "Low",
            motionLevel: "Low",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
                { icon: require('../../assets/images/outlet.png'), name: "Outlets" },
                { icon: require('../../assets/images/keyboard.png'), name: "Computers" },
                { icon: require('../../assets/images/printer.png'), name: "Printer" },
            ],
            rating: 4.8,
            reviewCount: 34,
            activityData: [
                { time: "8am", level: 25 },
                { time: "10am", level: 40 },
                { time: "12pm", level: 55 },
                { time: "2pm", level: 60 },
                { time: "4pm", level: 65 },
                { time: "6pm", level: 50 },
                { time: "8pm", level: 35 },
            ],
            activityBadge: { text: "↓ Quieter than average", color: "#4ade80" },
            comments: [
                {
                    user: "Priya N.",
                    date: "1 day ago",
                    rating: 5,
                    comment: "Perfect for technical work. The printer access is super convenient."
                },
                {
                    user: "Ethan W.",
                    date: "3 days ago",
                    rating: 5,
                    comment: "Very productive environment with solid computers and low distractions."
                },
                {
                    user: "Sofia R.",
                    date: "1 week ago",
                    rating: 4,
                    comment: "Reliable setup and plenty of outlets. Great for long sessions."
                },
            ]
        },
        "10": {
            name: "Littman Library",
            location: "Weston Hall",
            icon: require('../../assets/images/room.png'),
            noiseLevel: "Low",
            motionLevel: "Low",
            amenities: [
                { icon: require('../../assets/images/wifi.png'), name: "Wi-Fi" },
                { icon: require('../../assets/images/outlet.png'), name: "Outlets" },
                { icon: require('../../assets/images/whiteboard.png'), name: "Whiteboard" },
                { icon: require('../../assets/images/keyboard.png'), name: "Computers" },
                { icon: require('../../assets/images/printer.png'), name: "Printer" },
            ],
            rating: 4.9,
            reviewCount: 37,
            activityData: [
                { time: "8am", level: 15 },
                { time: "10am", level: 25 },
                { time: "12pm", level: 35 },
                { time: "2pm", level: 45 },
                { time: "4pm", level: 55 },
                { time: "6pm", level: 50 },
                { time: "8pm", level: 30 },
            ],
            activityBadge: { text: "↓ One of the quietest spaces", color: "#4ade80" },
            comments: [
                {
                    user: "Daniel S.",
                    date: "1 day ago",
                    rating: 5,
                    comment: "Incredible quiet zone. Best place for concentrated study on campus."
                },
                {
                    user: "Hana J.",
                    date: "4 days ago",
                    rating: 5,
                    comment: "Love having computers and printer nearby while still keeping a calm atmosphere."
                },
                {
                    user: "Isaac M.",
                    date: "1 week ago",
                    rating: 5,
                    comment: "My top pick for exams prep — quiet, clean, and very reliable amenities."
                },
            ]
        },
    };
    return rooms[id];
};

const getLevelStyle = (level: string) => {
    switch(level) {
        case "Low": return styles.levelLow;
        case "Medium": return styles.levelMedium;
        case "High": return styles.levelHigh;
        default: return {};
    }
};

const StarRating = ({ rating, onPress }: { rating: number, onPress?: (star: number) => void }) => {
    return (
        <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => {
                const StarComponent = onPress ? TouchableOpacity : View;
                return (
                    <StarComponent 
                        key={star} 
                        onPress={onPress ? () => onPress(star) : undefined}
                    >
                        <Text style={styles.star}>
                            {star <= rating ? "★" : "☆"}
                        </Text>
                    </StarComponent>
                );
            })}
        </View>
    );
};

export default function RoomDetail() {
    const { id } = useLocalSearchParams();
    const room = getRoomData(id as string);
    const [selectedRating, setSelectedRating] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (id) {
            recordRoomView(id as string);
            setIsSaved(isRoomSaved(id as string));
        }
    }, [id]);

    const handleToggleSave = () => {
        if (!id) return;
        toggleSavedRoom(id as string);
        setIsSaved(isRoomSaved(id as string));
    };

    if (!room) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Room not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            {/* Room Info Section */}
            <View style={styles.infoCard}>
                <View style={styles.roomHeader}>
                    <Image source={room.icon} style={styles.roomIcon} resizeMode="contain" />
                    <View style={styles.roomTitleSection}>
                        <Text style={styles.roomName}>{room.name}</Text>
                        <Text style={styles.roomLocation}>{room.location}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookmarkButton} onPress={handleToggleSave}>
                        <Text style={styles.bookmarkIcon}>{isSaved ? "★" : "☆"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.levelsSection}>
                    <View style={styles.levelBox}>
                        <Image source={require('../../assets/images/noise.png')} style={styles.levelIcon} resizeMode="contain" />
                        <Text style={styles.levelLabel}>Noise Level</Text>
                        <Text style={[styles.levelValue, getLevelStyle(room.noiseLevel)]}>
                            {room.noiseLevel}
                        </Text>
                    </View>
                    <View style={styles.levelBox}>
                        <Image source={require('../../assets/images/motion.png')} style={styles.levelIcon} resizeMode="contain" />
                        <Text style={styles.levelLabel}>Motion Level</Text>
                        <Text style={[styles.levelValue, getLevelStyle(room.motionLevel)]}>
                            {room.motionLevel}
                        </Text>
                    </View>
                </View>

                <View style={styles.amenitiesSection}>
                    <Text style={styles.sectionTitle}>Amenities</Text>
                    <View style={styles.amenitiesGrid}>
                        {room.amenities.map((amenity: any, index: number) => (
                            <View key={index} style={styles.amenityItem}>
                                <Image source={amenity.icon} style={styles.amenityIcon} resizeMode="contain" />
                                <Text style={styles.amenityText}>{amenity.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Activity Graph Section */}
            <View style={styles.graphCard}>
                <View style={styles.graphHeader}>
                    <Text style={styles.sectionTitle}>Activity Today</Text>
                    <View style={[styles.activityBadge, { backgroundColor: room.activityBadge.color }]}>
                        <Text style={styles.activityBadgeText}>{room.activityBadge.text}</Text>
                    </View>
                </View>
                
                <View style={styles.chartContainer}>
                    <View style={styles.yAxisLabels}>
                        <Text style={styles.yAxisLabel}>High</Text>
                        <Text style={styles.yAxisLabel}>Med</Text>
                        <Text style={styles.yAxisLabel}>Low</Text>
                    </View>
                    <View style={styles.chartBars}>
                        {room.activityData.map((data: any, index: number) => (
                            <View key={index} style={styles.barWrapper}>
                                <View style={styles.barContainer}>
                                    <View style={[styles.bar, { height: `${data.level}%` }]} />
                                </View>
                                <Text style={styles.xAxisLabel}>{data.time}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Reviews Section */}
            <View style={styles.reviewsCard}>
                <View style={styles.ratingOverview}>
                    <View style={styles.ratingScore}>
                        <Text style={styles.ratingNumber}>{room.rating}</Text>
                        <StarRating rating={Math.round(room.rating)} />
                        <Text style={styles.ratingCount}>Based on {room.reviewCount} reviews</Text>
                    </View>
                </View>

                <View style={styles.writeReview}>
                    <Text style={styles.sectionTitle}>Write a Review</Text>
                    <StarRating rating={selectedRating} onPress={setSelectedRating} />
                    <TextInput
                        style={styles.reviewInput}
                        placeholder="Share your experience..."
                        placeholderTextColor="#9d88b8"
                        multiline
                        numberOfLines={4}
                    />
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit Review</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.commentsSection}>
                    <Text style={styles.sectionTitle}>Recent Reviews</Text>
                    {room.comments.map((comment: any, index: number) => (
                        <View key={index} style={styles.commentCard}>
                            <View style={styles.commentHeader}>
                                <View style={styles.userAvatar}>
                                    <Text style={styles.userInitials}>{comment.user.substring(0, 2)}</Text>
                                </View>
                                <View style={styles.commentMeta}>
                                    <Text style={styles.userName}>{comment.user}</Text>
                                    <Text style={styles.commentDate}>{comment.date}</Text>
                                </View>
                                <StarRating rating={comment.rating} />
                            </View>
                            <Text style={styles.commentText}>{comment.comment}</Text>
                        </View>
                    ))}
                </View>
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
        paddingBottom: 40,
    },
    errorText: {
        color: "#e8d4ff",
        fontSize: 18,
    },
    
    // Room Info Card
    infoCard: {
        backgroundColor: "#2d1f47",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#4a3566",
    },
    roomHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    roomIcon: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: "#e8d4ff",
        padding: 12,
        marginRight: 16,
    },
    roomTitleSection: {
        flex: 1,
    },
    bookmarkButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3d2857",
        borderWidth: 1,
        borderColor: "#5c4280",
    },
    bookmarkIcon: {
        fontSize: 20,
        color: "#fbbf24",
    },
    roomName: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#e8d4ff",
        fontFamily: "System",
        marginBottom: 4,
    },
    roomLocation: {
        fontSize: 18,
        color: "#b8a3d1",
        fontFamily: "System",
    },
    levelsSection: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 24,
    },
    levelBox: {
        flex: 1,
        backgroundColor: "#3d2857",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#5c4280",
    },
    levelIcon: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: "#e8d4ff",
        padding: 6,
        marginBottom: 8,
    },
    levelLabel: {
        fontSize: 12,
        color: "#9d88b8",
        textTransform: "uppercase",
        fontFamily: "System",
        marginBottom: 4,
    },
    levelValue: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "System",
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
    amenitiesSection: {
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e8d4ff",
        fontFamily: "System",
        marginBottom: 12,
    },
    amenitiesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    amenityItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3d2857",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#5c4280",
    },
    amenityIcon: {
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: "#e8d4ff",
        padding: 3,
        marginRight: 8,
    },
    amenityText: {
        fontSize: 14,
        color: "#c7b3e0",
        fontWeight: "500",
        fontFamily: "System",
    },

    // Graph Card
    graphCard: {
        backgroundColor: "#2d1f47",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#4a3566",
    },
    graphHeader: {
        marginBottom: 20,
    },
    activityBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: "flex-start",
        marginTop: 8,
    },
    activityBadgeText: {
        color: "#1a0f2e",
        fontSize: 12,
        fontWeight: "600",
        fontFamily: "System",
    },
    chartContainer: {
        flexDirection: "row",
        height: 180,
    },
    yAxisLabels: {
        justifyContent: "space-between",
        paddingRight: 8,
        paddingVertical: 10,
    },
    yAxisLabel: {
        fontSize: 10,
        color: "#9d88b8",
        fontFamily: "System",
    },
    chartBars: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    barWrapper: {
        flex: 1,
        alignItems: "center",
    },
    barContainer: {
        width: "80%",
        height: 150,
        justifyContent: "flex-end",
    },
    bar: {
        backgroundColor: "#8b5cf6",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        width: "100%",
    },
    xAxisLabel: {
        fontSize: 10,
        color: "#9d88b8",
        marginTop: 4,
        fontFamily: "System",
    },

    // Reviews Card
    reviewsCard: {
        backgroundColor: "#2d1f47",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#4a3566",
    },
    ratingOverview: {
        alignItems: "center",
        marginBottom: 24,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#4a3566",
    },
    ratingScore: {
        alignItems: "center",
    },
    ratingNumber: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#e8d4ff",
        fontFamily: "System",
    },
    ratingCount: {
        fontSize: 12,
        color: "#9d88b8",
        marginTop: 4,
        fontFamily: "System",
    },
    starsContainer: {
        flexDirection: "row",
        gap: 4,
    },
    star: {
        fontSize: 20,
        color: "#fbbf24",
    },
    writeReview: {
        marginBottom: 24,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#4a3566",
    },
    reviewInput: {
        backgroundColor: "#3d2857",
        borderRadius: 12,
        padding: 12,
        color: "#e8d4ff",
        fontFamily: "System",
        fontSize: 14,
        marginTop: 12,
        marginBottom: 12,
        minHeight: 100,
        textAlignVertical: "top",
        borderWidth: 1,
        borderColor: "#5c4280",
    },
    submitButton: {
        backgroundColor: "#8b5cf6",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "System",
    },
    commentsSection: {
        gap: 16,
    },
    commentCard: {
        backgroundColor: "#3d2857",
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#5c4280",
    },
    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#8b5cf6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    userInitials: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "System",
    },
    commentMeta: {
        flex: 1,
    },
    userName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#e8d4ff",
        fontFamily: "System",
    },
    commentDate: {
        fontSize: 12,
        color: "#9d88b8",
        fontFamily: "System",
    },
    commentText: {
        fontSize: 14,
        color: "#c7b3e0",
        lineHeight: 20,
        fontFamily: "System",
    },
});

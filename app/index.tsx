import Rooms from "@/components/rooms";
import { ScrollView } from "react-native";

export default function Index() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#1a0f2e",
      }}
    >
      <Rooms />
    </ScrollView>
  );
}

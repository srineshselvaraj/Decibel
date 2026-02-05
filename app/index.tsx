import Home from "@/components/home";
import { ScrollView } from "react-native";

export default function Index() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#1a0f2e",
      }}
    >
      <Home />
    </ScrollView>
  );
}

import { Colors } from "@/constants/theme";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Static — defined outside component so it's not recreated on every render
const GRID_IMAGES = [
  {
    key: "android-bg",
    source: require("../../assets/images/android-icon-background.png"),
  },
  {
    key: "android-mono",
    source: require("../../assets/images/android-icon-monochrome.png"),
  },
  { key: "react", source: require("../../assets/images/react-logo.png") },
  {
    key: "android-fg",
    source: require("../../assets/images/android-icon-foreground.png"),
  },
  { key: "splash", source: require("../../assets/images/splash-icon.png") },
  {
    key: "partial",
    source: require("../../assets/images/partial-react-logo.png"),
  },
] as const;

const TABS = ["Gallery", "Preview"] as const;
type Tab = (typeof TABS)[number];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("Gallery");

  const handleTabPress = (tab: Tab) => {
    Alert.alert("Tab Pressed", `${tab} tab is active`);
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View>
          <View style={{ alignItems: "center", marginBottom: 24 }}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.profileImage}
              resizeMode="cover"
              accessibilityLabel="Profile picture"
            />
            <Text style={styles.profileLabel}>Profile Name</Text>
          </View>

          {/* Tab Section */}
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
            {TABS.map((tab) => (
              <Pressable
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab ? styles.activeTab : styles.inactiveTab,
                ]}
                onPress={() => handleTabPress(tab)}
                accessibilityRole="tab"
                accessibilityLabel={`${tab} tab`}
                accessibilityState={{ selected: activeTab === tab }}
              >
                <Text style={styles.tabText}>{tab}</Text>
              </Pressable>
            ))}
          </View>

          {/* Content Section — 2 rows × 3 columns */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 10,
            }}
          >
            {GRID_IMAGES.map((item) => (
              <View key={item.key} style={styles.gridCell}>
                <Image
                  source={item.source}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  accessibilityLabel={item.key}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <Pressable
        style={styles.bottomButton}
        onPress={() => Alert.alert("Action", "Continue button pressed")}
        accessibilityRole="button"
        accessibilityLabel="Continue"
      >
        <Text style={styles.bottomButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  profileImage: {
    width: 110,
    height: 110,
    marginBottom: 12,
    borderRadius: 10,
  },
  profileLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTab: { backgroundColor: Colors.light.tint },
  inactiveTab: { backgroundColor: "#9e9e9e" },
  tabText: { fontWeight: "700", fontSize: 15, color: "#ffffff" },
  gridCell: {
    width: "32%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#3a3a3c",
  },
  bottomButton: {
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#111111",
    alignItems: "center",
  },
  bottomButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
});

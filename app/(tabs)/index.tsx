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

const GRID_IMAGES = [
  { key: "img1", source: require("../../assets/images/img/1.jpg") },
  { key: "img2", source: require("../../assets/images/img/2.jpg") },
  { key: "img3", source: require("../../assets/images/img/4.jpg") },
  { key: "img4", source: require("../../assets/images/img/5.jpg") },
  { key: "img5", source: require("../../assets/images/img/6.jpg") },
  { key: "img6", source: require("../../assets/images/img/8.jpg") },
] as const;

const TABS = ["Button 1", "Button 2"] as const;
type Tab = (typeof TABS)[number];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("Button 1");

  const handleTabPress = (tab: Tab) => {
    Alert.alert("Tab Pressed", `${tab} tab is active`);
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View>
          <View style={styles.profileSection}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.profileImage}
              resizeMode="cover"
              accessibilityLabel="Profile picture"
            />
            <Text style={styles.profileLabel}>Profile Name</Text>
          </View>

          {/* Tab Section */}
          <View style={styles.tabSection}>
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
          <View style={styles.gridSection}>
            {GRID_IMAGES.map((item) => (
              <View key={item.key} style={styles.gridCell}>
                <Image
                  source={item.source}
                  style={styles.gridImage}
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
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
  tabSection: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
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
  gridSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  gridCell: {
    width: "32%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#3a3a3c",
  },
  gridImage: {
    width: "100%",
    height: "100%",
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

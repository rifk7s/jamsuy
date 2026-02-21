import { useAudioPlayer } from "expo-audio";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AUDIO_SOURCE = require("../../assets/audio/gluesong.mp3");

export default function TabTwoScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useAudioPlayer(AUDIO_SOURCE);

  const handleTogglePlay = () => {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
      return;
    }

    player.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    return () => {
      player.pause();
    };
  }, [player]);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Newsreader-style heading — italic serif + pink underline + hellokitty */}
        <View style={styles.headingRow}>
          <Text style={styles.headingText}>Music Player Component</Text>
          <Image
            source={require("../../assets/images/hellokitty.png")}
            style={styles.hellokittyImage}
            resizeMode="contain"
            accessibilityLabel="Hello Kitty"
          />
        </View>
        <Text style={styles.headingSubtitle}>from: rifky.dev/archives/ui</Text>

        <View style={styles.playerCard}>
          {/* Row: image left + play button right — mirrors web flex justify-between */}
          <View style={styles.cardRow}>
            <Image
              source={require("../../assets/images/gluesong.png")}
              style={styles.coverImage}
              resizeMode="cover"
              accessibilityLabel="Music cover"
            />
            <Pressable
              style={styles.playButton}
              onPress={handleTogglePlay}
              accessibilityRole="button"
              accessibilityLabel={isPlaying ? "Pause music" : "Play music"}
            >
              <SymbolView
                name={isPlaying ? "pause.fill" : "play.fill"}
                style={{ width: 14, height: 14 }}
                tintColor="#ffffff"
              />
            </Pressable>
          </View>

          {/* Meta text below — mirrors web flex-col mt-2 */}
          <View style={styles.metaTextWrap}>
            <Text style={styles.songTitle}>Glue Song</Text>
            <Text style={styles.singer}>beabadoobee</Text>
          </View>
        </View>

        <Text style={styles.paragraphText}>
          Glue Song is a track by Filipino-British singer-songwriter
          beabadoobee, released in 2019. Known for its dreamy indie pop sound
          and tender lyrics, it became one of her most beloved songs.
        </Text>

        {/* Pinkbow separator — 4 bows like the web Seperator component */}
        <View style={styles.bowRow}>
          {["bow-0", "bow-1", "bow-2", "bow-3"].map((id) => (
            <Image
              key={id}
              source={require("../../assets/images/pinkbow.png")}
              style={styles.bowImage}
              resizeMode="contain"
            />
          ))}
        </View>

        {/* Poem line above quote — mirrors web Newsreader italic centered */}
        <Text style={styles.poemLine}>~ Lorem ipsum dolor sit amet. ~</Text>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            "Custom Quote Component - a quote component."
          </Text>
        </View>

        {/* Tag component */}
        <View style={styles.tagRow}>
          {["tag", "component", "here"].map((tag) => (
            <View key={tag} style={styles.tagPill}>
              <Text style={styles.tagText} numberOfLines={1}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 32,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  headingSubtitle: {
    fontSize: 13,
    color: "#667085",
    marginBottom: 20,
  },
  headingText: {
    flexShrink: 1,
    fontSize: 20,
    fontFamily: "Newsreader_400Regular_Italic",
    textDecorationLine: "underline",
    textDecorationColor: "#f9a8d4",
    color: "#101828",
    lineHeight: 28,
  },
  hellokittyImage: {
    width: 36,
    height: 36,
    marginTop: 2,
  },
  playerCard: {
    backgroundColor: "#111318",
    borderRadius: 14,
    padding: 8,
    // matches web sm:w-[304px] — compact card, not full screen width
    maxWidth: 304,
    width: "100%",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  coverImage: {
    // web big: w-[260px] h-[260px] on mobile, sm:w-[200px] sm:h-[200px]
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  metaTextWrap: {
    marginTop: 8,
  },
  songTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  singer: {
    color: "#d0d5dd",
    fontSize: 14,
    marginTop: 2,
  },
  playButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a2432",
    borderWidth: 1,
    borderColor: "#2f3743",
  },
  paragraphText: {
    marginTop: 18,
    color: "#475467",
    fontSize: 16,
    lineHeight: 28,
  },
  bowRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
    marginBottom: 4,
  },
  bowImage: {
    width: 32,
    height: 32,
  },
  poemLine: {
    marginTop: 20,
    marginBottom: 6,
    textAlign: "center",
    fontFamily: "Newsreader_400Regular_Italic",
    fontSize: 16,
    color: "#344054",
  },
  quoteCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    backgroundColor: "#f8f9fb",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  quoteText: {
    color: "#344054",
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Newsreader_400Regular_Italic",
    textAlign: "center",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 20,
    marginBottom: 32,
  },
  tagPill: {
    backgroundColor: "#1c2333",
    borderRadius: 3,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tagText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontStyle: "italic",
  },
});

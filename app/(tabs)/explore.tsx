import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { SymbolView } from "expo-symbols";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const AUDIO_SOURCE = require("../../assets/audio/gluesong.mp3");

function SpotifyIcon() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path
        fill="#1ED760"
        d="M12.001 2C6.50098 2 2.00098 6.5 2.00098 12C2.00098 17.5 6.50098 22 12.001 22C17.501 22 22.001 17.5 22.001 12C22.001 6.5 17.551 2 12.001 2ZM15.751 16.65C13.401 15.2 10.451 14.8992 6.95014 15.6992C6.60181 15.8008 6.30098 15.55 6.20098 15.25C6.10098 14.8992 6.35098 14.6 6.65098 14.5C10.451 13.6492 13.751 14 16.351 15.6C16.701 15.75 16.7501 16.1492 16.6018 16.45C16.4018 16.7492 16.0518 16.85 15.751 16.65ZM16.7501 13.95C14.051 12.3 9.95098 11.8 6.80098 12.8C6.40181 12.9 5.95098 12.7 5.85098 12.3C5.75098 11.9 5.95098 11.4492 6.35098 11.3492C10.001 10.25 14.501 10.8008 17.601 12.7C17.9018 12.8508 18.051 13.35 17.8018 13.7C17.551 14.05 17.101 14.2 16.7501 13.95ZM6.30098 9.75083C5.80098 9.9 5.30098 9.6 5.15098 9.15C5.00098 8.64917 5.30098 8.15 5.75098 7.99917C9.30098 6.94917 15.151 7.14917 18.8518 9.35C19.301 9.6 19.451 10.2 19.201 10.65C18.9518 11.0008 18.351 11.1492 17.9018 10.9C14.701 9 9.35098 8.8 6.30098 9.75083Z"
      />
    </Svg>
  );
}

export default function TabTwoScreen() {
  const player = useAudioPlayer(AUDIO_SOURCE);
  const status = useAudioPlayerStatus(player);
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleTogglePlay = async () => {
    if (status.playing) {
      player.pause();
      return;
    }

    const hasReachedEnd =
      status.didJustFinish ||
      (status.duration > 0 && status.currentTime >= status.duration - 0.05);

    if (hasReachedEnd) {
      await player.seekTo(0);
    }

    player.play();
  };

  useEffect(() => {
    return () => {
      player.pause();
    };
  }, [player]);

  useEffect(() => {
    if (!status.playing) {
      spinValue.stopAnimation();
      spinValue.setValue(0);
      return;
    }

    const loop = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    loop.start();

    return () => {
      loop.stop();
      spinValue.setValue(0);
    };
  }, [status.playing, spinValue]);

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
          {/* Cover image with play button + Spotify icon overlaid absolutely */}
          <View style={styles.coverWrap}>
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
              accessibilityLabel={status.playing ? "Pause music" : "Play music"}
            >
              <SymbolView
                name={status.playing ? "pause.fill" : "play.fill"}
                style={styles.playSymbol}
                tintColor="#ffffff"
                fallback={
                  <Text style={styles.playFallback}>
                    {status.playing ? "⏸" : "▶"}
                  </Text>
                }
              />
            </Pressable>
          </View>

          {/* Meta row: title+artist left, spinning Spotify right when playing */}
          <View style={styles.metaTextWrap}>
            <View style={styles.metaRow}>
              <View>
                <Text style={styles.songTitle}>Glue Song</Text>
                <Text style={styles.singer}>beabadoobee</Text>
              </View>
              {status.playing ? (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.spotifyIconWrap,
                    { transform: [{ rotate: spin }] },
                  ]}
                >
                  <SpotifyIcon />
                </Animated.View>
              ) : null}
            </View>
          </View>
        </View>

        <Text style={styles.paragraphText}>
          A clean music player with smooth animations and responsive design.
          Built with modern mobile UI patterns for an intuitive listening
          experience.
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
    maxWidth: 250,
    width: "100%",
  },
  coverWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  metaTextWrap: {
    marginTop: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    position: "absolute",
    top: 8,
    right: 8,
    width: 38,
    height: 38,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a2432",
    borderWidth: 1,
    borderColor: "#2f3743",
  },
  playSymbol: {
    width: 14,
    height: 14,
  },
  playFallback: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },
  spotifyIconWrap: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
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

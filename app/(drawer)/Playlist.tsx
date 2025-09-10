import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const playlists = [
  {
    id: "1",
    title: "Island",
    image:
      "https://t2.genius.com/unsafe/788x0/https%3A%2F%2Fimages.genius.com%2Fd312abed63b88ec9e28eacf3d8bd0bc0.1000x1000x1.png",
  },
  {
    id: "2",
    title: "Dash",
    image:
"https://t2.genius.com/unsafe/788x0/https%3A%2F%2Fimages.genius.com%2F409cf3806e7caf40866d9becce7a68b1.1000x1000x1.png",
  },
  {
    id: "3",
    title: "Wait for You",
    image:
"https://t2.genius.com/unsafe/788x0/https%3A%2F%2Fimages.genius.com%2Ffa39fc4ea337b92c6e9d781a8fca52f9.1000x1000x1.png",
  },
  {
    id: "4",
    title: "6th Summer",
    image:
"https://t2.genius.com/unsafe/788x0/https%3A%2F%2Fimages.genius.com%2F87765ca9c98574e239b2b7503d320406.1000x1000x1.png",  },
];

export default function PlaylistsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="musical-notes" size={28} color="#1DB954" />
        <Text style={styles.headerText}>Playlists</Text>
      </View>

      {/* Playlist List */}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.playlistItem}>
            <Image source={{ uri: item.image }} style={styles.coverImage} />
            <Text style={styles.playlistTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
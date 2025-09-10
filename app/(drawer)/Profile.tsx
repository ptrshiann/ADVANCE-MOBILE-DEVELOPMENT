import React from "react";
import {router} from "expo-router";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Spotify-like icons

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={28} color="#1DB954" />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Picture */}
     <Image
       source={require('@/assets/images/bamby.webp')}
       style={styles.profilePic}
     />

      {/* User Info */}
      <Text style={styles.name}>Bamby</Text>
      <Text style={styles.email}>bamby2025@example.com</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => router.replace("/Settings")}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 60,
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    marginTop: 40,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
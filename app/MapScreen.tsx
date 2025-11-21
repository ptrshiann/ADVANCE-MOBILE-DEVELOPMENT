import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

// Import map styles
import lightMapStyle from "./mapStyles/lightMapStyle";
import darkMapStyle from "./mapStyles/darkMapStyle";

export default function MapScreen() {
  const [region, setRegion] = useState(null);

  // Default = DARK MODE
  const [mapStyle, setMapStyle] = useState(darkMapStyle);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 2,
        },
        (newLoc) => {
          setRegion((prev) => ({
            ...prev,
            latitude: newLoc.coords.latitude,
            longitude: newLoc.coords.longitude,
          }));
        }
      );
    })();
  }, []);

  if (!region) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        customMapStyle={mapStyle}
        zoomEnabled={true}
        zoomControlEnabled={true}  // <-- FIX
        toolbarEnabled={true}
      />

      {/* SWITCH BUTTONS */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={() => setMapStyle(lightMapStyle)}
        >
          <Text style={styles.lightText}>Light</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#000" }]}
          onPress={() => setMapStyle(darkMapStyle)}
        >
          <Text style={styles.darkText}>Dark</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  switchContainer: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  lightText: {
    color: "#000",
    fontWeight: "bold",
  },

  darkText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

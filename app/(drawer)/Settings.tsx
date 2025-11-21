import React, { useState } from "react";
import { router } from "expo-router";

import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  setTheme,
  setAccentColor,
  addCustomColor,
  removeCustomColor,
} from "../../redux/themeSlice";
import ColorPicker from "react-native-wheel-color-picker";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { mode, accentColor, customColors } = useSelector(
    (state: any) => state.theme
  );

  const darkMode = mode === "dark";

  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(accentColor);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#121212" : "#fff" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="bars" size={30} color={accentColor} />
        <Text style={[styles.headerText, { color: darkMode ? "#fff" : "#000" }]}>
          Settings
        </Text>
      </View>

      {/* Dark Mode */}
      <View style={styles.setting}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000" }]}>
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={(v) => dispatch(setTheme(v ? "dark" : "light"))}
          thumbColor={accentColor}
        />
      </View>

      {/* Accent Color */}
      <Text style={[styles.sectionLabel, { color: darkMode ? "#fff" : "#000" }]}>
        Accent Color
      </Text>

      {/* Current color preview */}
      <TouchableOpacity
        style={[styles.colorPreview, { backgroundColor: accentColor }]}
        onPress={() => {
          setSelectedColor(accentColor);
          setPickerVisible(true);
        }}
      />

      {/* Custom color list */}
      <View style={styles.colorList}>
        {customColors.map((c: string) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorCircle,
              {
                backgroundColor: c,
                borderColor: c === accentColor ? accentColor : "#ccc",
                borderWidth: c === accentColor ? 3 : 1,
              },
            ]}
            onPress={() => dispatch(setAccentColor(c))}
            onLongPress={() =>
              Alert.alert("Delete Color", "Remove this color?", [
                { text: "Cancel" },
                {
                  text: "Delete",
                  onPress: () => dispatch(removeCustomColor(c)),
                },
              ])
            }
          />
        ))}
      </View>

      {/* Add Custom Color */}
      <TouchableOpacity
        style={[styles.addColorBtn, { backgroundColor: accentColor }]}
        onPress={() => {
          setSelectedColor(accentColor);
          setPickerVisible(true);
        }}
      >
        <Text style={styles.addColorText}>+ Add Custom Color</Text>
      </TouchableOpacity>

      {/* Color Picker Modal */}
      <Modal visible={pickerVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: darkMode ? "#222" : "#fff" },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: darkMode ? "#fff" : "#000" },
              ]}
            >
              Pick a Custom Color
            </Text>

            <ColorPicker
              color={selectedColor}
              onColorChange={(c) => setSelectedColor(c)}
              thumbSize={30}
              sliderSize={30}
              style={styles.colorPicker}
            />

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: accentColor }]}
              onPress={() => {
                if (!customColors.includes(selectedColor)) {
                  dispatch(addCustomColor(selectedColor));
                }
                dispatch(setAccentColor(selectedColor));
                setPickerVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* GENERAL Section */}
      <Text style={[styles.sectionLabel, { color: darkMode ? "#fff" : "#000" }]}>
        General
      </Text>

      {/* Location Map button */}
      <TouchableOpacity
        style={styles.menuButton(darkMode)}
        onPress={() => router.push("/MapScreen")}
      >
        <FontAwesome name="map-marker" size={22} color={accentColor} />
        <Text style={[styles.menuText, { color: darkMode ? "#fff" : "#000" }]}>
          Location Map
        </Text>
        <FontAwesome name="chevron-right" size={20} color={accentColor} />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.logout, { backgroundColor: accentColor }]}
        onPress={() => router.replace("/SignIn")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

/* =============== STYLES =============== */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 22, marginLeft: 10 },
  text: { fontSize: 16 },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  sectionLabel: { marginTop: 25, marginBottom: 10, fontSize: 16 },

  /* Color selector */
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  colorList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  addColorBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
  },
  addColorText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    padding: 20,
    borderRadius: 20,
  },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  colorPicker: { height: 250 },
  modalButton: {
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: { color: "#fff", textAlign: "center", fontSize: 16 },

  /* Menu (fixed) */
  menuButton: (darkMode: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    backgroundColor: darkMode ? "#222" : "#f2f2f2",
    marginTop: 10,
  }),
  menuText: { flex: 1, marginLeft: 15, fontSize: 18 },

  /* Logout */
  logout: {
    marginTop: 35,
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});

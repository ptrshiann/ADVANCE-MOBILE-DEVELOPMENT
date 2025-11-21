import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, DrawerActions, useTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const goodMorning = [
  { id: "1", title: "Daily Mix ", image: "https://picsum.photos/200/200?random=10" },
  { id: "2", title: "Plbbuu", image: "https://picsum.photos/200/200?random=22" },
];
const recent = [
  { id: "3", title: "Way for Love", subtitle: "Plave", image: "https://picsum.photos/200/200?random=56" },
  { id: "4", title: "Fever", subtitle: "Enhypen", image: "https://picsum.photos/200/200?random=34" },
  { id: "5", title: "Dash", subtitle: "Plave", image: "https://picsum.photos/200/200?random=87" },
];
const madeForYou = [
  { id: "6", title: "Island", subtitle: "Songs you can’t get enough of", image: "https://picsum.photos/200/200?random=6" },
  { id: "7", title: "Chacone", subtitle: "Your weekly mixtape", image: "https://picsum.photos/200/200?random=46" },
];
const popular = [
  { id: "8", title: "Feelin' Good", image: "https://picsum.photos/200/200?random=66" },
  { id: "9", title: "Oldies", image: "https://picsum.photos/200/200?random=29" },
  { id: "10", title: "Chill Mix", image: "https://picsum.photos/200/200?random=665" },
];

export default function PlaylistsScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { accentColor } = useSelector((state: any) => state.theme);

  const [playlists, setPlaylists] = useState<{ id: string; name: string; image: string }[]>([]);

  useEffect(() => {
    const loadPlaylists = async () => {
      const stored = await AsyncStorage.getItem("playlists");
      if (stored) setPlaylists(JSON.parse(stored));
    };
    loadPlaylists();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const addPlaylist = (name: string) => {
    if (!name.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name,
      image: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`,
    };
    setPlaylists([...playlists, newItem]);
  };

  const removePlaylist = (id: string) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <FontAwesome name="bars" size={20} color={accentColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Good morning</Text>
      </View>

      <View style={styles.grid}>
        {goodMorning.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.gridItem, { backgroundColor: colors.card }]}>
            <Image source={{ uri: item.image }} style={styles.gridImage} />
            <Text style={[styles.gridText, { color: colors.text }]}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Your recent rotation</Text>
      <FlatList
        data={recent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.listImage} />
            <View style={styles.listTextContainer}>
              <Text style={[styles.listTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.listSubtitle, { color: colors.border }]}>{item.subtitle}</Text>
            </View>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={18} color={colors.border} />
            </TouchableOpacity>
          </View>
        )}
        scrollEnabled={false}
      />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Made For You</Text>
      <FlatList
        horizontal
        data={madeForYou}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.cardSubtitle, { color: colors.border }]}>{item.subtitle}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular playlists</Text>
      <FlatList
        horizontal
        data={popular}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 15, marginTop: 10 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginLeft: 10 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridItem: { width: "48%", flexDirection: "row", alignItems: "center", marginBottom: 10, borderRadius: 6, overflow: "hidden", paddingRight: 10 },
  gridImage: { width: 50, height: 50 },
  gridText: { marginLeft: 10, flexShrink: 1 },
  card: { marginRight: 15, width: 140, borderRadius: 6, padding: 5 },
  cardImage: { width: "100%", height: 140, borderRadius: 6, marginBottom: 8 },
  cardTitle: { fontWeight: "600", fontSize: 14 },
  cardSubtitle: { fontSize: 12 },
  listItem: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  listImage: { width: 55, height: 55, borderRadius: 6, marginRight: 15 },
  listTextContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: "600" },
  listSubtitle: { fontSize: 14 },
});

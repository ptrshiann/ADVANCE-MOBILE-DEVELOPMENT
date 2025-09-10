import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet } from 'react-native';

export default function ComponentShowcase() {
  const [showProfiles, setShowProfiles] = useState(false); // ← State to control visibility

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Component Showcase</Text>

      <Image
        source={require('@/assets/images/plave2.jpg')}
        style={styles.image}
      />


      <View style={styles.box}>
        <Text style={styles.text}>
          PLAVE (플레이브) is a virtual 5-member boy group under VLAST, consisting of: Yejun, Noah, Bamby, Eunho, and Hamin. They debuted on March 12, 2023, with their first single album, Asterum. The PLAVE members are not AI-generated. They utilise motion capture technology to track the movements and expressions of each member.
        </Text>
      </View>


      <Button
        title="MEMBER'S PROFILE"
        onPress={() => setShowProfiles(!showProfiles)} //
      />








      {showProfiles && (
        <View style={styles.profilesContainer}>


<View style={styles.memberBox}>
  <Image
    source={require('@/assets/images/YEJUN.jpg')}
    style={styles.imageMem}
  />
  <Text style={styles.text}>
    Stage Name: Yejun (예준){"\n"}
    Birth Name: Nam Ye-jun (남예준){"\n"}
    Position(s): Leader, Main Vocalist{"\n"}
    Birthday: September 12, 2001{"\n"}
    Zodiac Sign: Virgo{"\n"}
    Height: 183 cm (6’0″){"\n"}
    Blood Type: B{"\n"}
    MBTI Type: ISTJ-T (previously ISFJ-T){"\n"}
    Representative Animal: Dolphin{"\n"}
    Representative Emojis: 🐬 / 💙
  </Text>
</View>

<View style={styles.memberBox}>
  <Image
    source={require('@/assets/images/NOAH.jpg')}
    style={styles.imageMem}
  />
  <Text style={styles.text}>
Stage Name: Noah (노아){"\n"}
Birth Name: Han Noah (한노아){"\n"}
Position(s): Main Vocalist{"\n"}
Birthday: February 10, 2001{"\n"}
Zodiac Sign: Aquarius{"\n"}
Height: 179 cm (5’10″){"\n"}
Blood Type: O{"\n"}
MBTI Type: ISFJ-A (previously ISTJ-A){"\n"}
Representative Animal: Alpaca{"\n"}
Representative Emojis: 🦙/💜
  </Text>
</View>

<View style={styles.memberBox}>
  <Image
    source={require('@/assets/images/BAMBY.jpg')}
    style={styles.imageMem}
  />
  <Text style={styles.text}>
Stage Name: Bamby (밤비){"\n"}
Birth Name: Chae Bong-gu (채봉구){"\n"}
Position(s): Main Dancer, Vocalist{"\n"}
Birthday: July 15, 2002{"\n"}
Zodiac Sign: Cancer{"\n"}
Height: 174 cm (5’9″){"\n"}
Blood Type:  B{"\n"}
MBTI Type: INTJ-A (previously INFP-T){"\n"}
Representative Animal: Deer{"\n"}
Representative Emojis: 🦌/💗
  </Text>
</View>

<View style={styles.memberBox}>
  <Image
    source={require('@/assets/images/EUNHO.jpg')}
    style={styles.imageMem}
  />
  <Text style={styles.text}>
Stage Name: Eunho (은호){"\n"}
Birth Name: Do Eun-ho (도은호){"\n"}
Position(s): Main Rapper, Vocalist{"\n"}
Birthday: May 24, 2003{"\n"}
Zodiac Sign: Gemini{"\n"}
Height: 184 cm (6’0″){"\n"}
Blood Type:  A{"\n"}
MBTI Type: ENTP-A (previously ENTP-T){"\n"}
Representative Animal: Wolf{"\n"}
Representative Emojis: 🐺/❤️
  </Text>
</View>

<View style={styles.memberBox}>
  <Image
    source={require('@/assets/images/HAMIN.jpg')}
    style={styles.imageMem}
  />
  <Text style={styles.text}>
Stage Name: Hamin (하민){"\n"}
Birth Name: Yu Ha-min (유하민){"\n"}
Position(s): Main Dancer, Lead Rapper, Maknae{"\n"}
Birthday: November 1{"\n"}
Zodiac Sign: Scorpio{"\n"}
Height: 185 cm (6’1″){"\n"}
Blood Type: AB{"\n"}
MBTI Type: INFJ-T (previously ISFJ-A){"\n"}
Representative Animal: Black cat{"\n"}
Representative Emojis: 🐈‍⬛/🖤
  </Text>
</View>



        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  image: {
    width: 400,
    height: 250,
    alignSelf: 'center',
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profilesContainer: {
    marginTop: 20,
  },
  memberTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  memberBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  imageMem: {
          width: 250,
          height: 250,
          alignSelf: 'center',
          marginBottom: 0,
      }
});

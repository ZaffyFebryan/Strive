import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


// ============================================================
// ACHIEVEMENTS SCREEN
// ============================================================

export default function AchievementsScreen({
  navigation,
  route,
}) {


  // ==========================================================
  // USER DATA
  // ==========================================================

  const user =
    route?.params?.user || {};


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Tombol kembali
    back:
      require('../../../assets/kembali.png'),

    // Achievement
    baja:
      require('../../../assets/baja.png'),

    masterLatihan:
      require('../../../assets/masterlatihan.png'),

    pahlawanNutrisi:
      require('../../../assets/pahlawannutrisi.png'),

    pejuangFajar:
      require('../../../assets/pejuangfajar.png'),

  };


  // ==========================================================
  // ACHIEVEMENT DATA
  // ==========================================================

  const achievements = [

    {
      id: 'baja',

      title: 'Konsistensi Baja',

      image: ICONS.baja,
    },


    {
      id: 'master',

      title: 'Master Latihan',

      image: ICONS.masterLatihan,
    },


    {
      id: 'nutrition',

      title: 'Pahlawan Nutrisi',

      image: ICONS.pahlawanNutrisi,
    },


    {
      id: 'fajar',

      title: 'Pejuang Fajar',

      image: ICONS.pejuangFajar,
    },

  ];


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // RENDER ACHIEVEMENT
  // ==========================================================

  const renderAchievement = (achievement) => {

    return (

      <View
        key={achievement.id}
        style={styles.achievementItem}
      >

        {/* ==================================================
            ACHIEVEMENT CIRCLE
        ================================================== */}

        <View style={styles.achievementCircle}>

          <Image
            source={achievement.image}
            style={styles.achievementImage}
            resizeMode="contain"
          />

        </View>


        {/* ==================================================
            ACHIEVEMENT TITLE
        ================================================== */}

        <Text
          style={styles.achievementTitle}
          numberOfLines={2}
        >
          {achievement.title}
        </Text>

      </View>

    );

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View style={styles.header}>


        {/* ==================================================
            BACK BUTTON
        ================================================== */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >

          <Image
            source={ICONS.back}
            style={styles.backIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>


        {/* ==================================================
            HEADER TITLE
        ================================================== */}

        <Text style={styles.headerTitle}>

          Pencapaian

        </Text>

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.achievementGrid}>

          {achievements.map(
            renderAchievement
          )}

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // SCREEN
  // ==========================================================

  safe: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 80,

    paddingHorizontal: 17,

    marginTop: 32,

    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#E2E3E3',

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 38,

    height: 50,

    alignItems: 'flex-start',

    justifyContent: 'center',
  },


  // ==========================================================
  // BACK ICON
  // ==========================================================

  backIcon: {
    width: 25,

    height: 25,
  },


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
    marginLeft: 2,

    fontSize: 24,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },


  scrollContent: {
    paddingTop: 32,

    paddingBottom: 60,
  },


  // ==========================================================
  // ACHIEVEMENT GRID
  // ==========================================================

  achievementGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    paddingHorizontal: 20,

    justifyContent: 'flex-start',
  },


  // ==========================================================
  // ACHIEVEMENT ITEM
  // ==========================================================

  achievementItem: {
    width: '33.3333%',

    alignItems: 'center',

    marginBottom: 28,
  },


  // ==========================================================
  // ACHIEVEMENT CIRCLE
  // ==========================================================

  achievementCircle: {
    width: 100,

    height: 100,

    borderRadius: 50,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',

    justifyContent: 'center',

    borderWidth: 1,

    borderColor: '#E1E1E1',
  },


  // ==========================================================
  // ACHIEVEMENT IMAGE
  // ==========================================================

  achievementImage: {
    width: 88,

    height: 88,
  },


  // ==========================================================
  // ACHIEVEMENT TITLE
  // ==========================================================

  achievementTitle: {
    marginTop: 11,

    width: 110,

    fontSize: 17,

    lineHeight: 25,

    color: '#4D4F55',

    textAlign: 'center',

    fontWeight: '400',
  },

});
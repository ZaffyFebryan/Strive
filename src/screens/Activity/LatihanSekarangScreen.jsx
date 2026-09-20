import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// LATIHAN SEKARANG SCREEN
// ============================================================

export default function LatihanSekarang({ navigation }) {


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // START WORKOUT
  // ==========================================================

  const handleStartWorkout = () => {

    // Nanti bisa diarahkan ke halaman latihan pertama.
    //
    // Contoh:
    //
    // navigation.navigate('ExerciseWorkout');

  };


  // ==========================================================
  // CHANGE VARIATION
  // ==========================================================

  const handleChangeVariation = () => {

    // Nanti bisa diarahkan ke halaman pemilihan variasi.
    //
    // navigation.navigate('WorkoutVariation');

  };


  // ==========================================================
  // EXERCISE DATA
  // ==========================================================

  const exercises = [

    {
      id: '1',
      title: 'Lat Pulldown',
      category: 'Back',
      duration: '10 Menit',
      image: require('../../../assets/latpulldown.png'),
    },

    {
      id: '2',
      title: 'Pull Up',
      category: 'Back',
      duration: '10 Menit',
      image: require('../../../assets/pullup.png'),
    },

    {
      id: '3',
      title: 'Barbell Row',
      category: 'Back',
      duration: '10 Menit',
      image: require('../../../assets/barbellrow.png'),
    },

    {
      id: '4',
      title: 'Incline Dumbell Row',
      category: 'Biceps',
      duration: '10 Menit',
      image: require('../../../assets/inclinedumbellrow.png'),
    },

    {
      id: '5',
      title: 'Preacher Curl',
      category: 'Biceps',
      duration: '10 Menit',
      image: require('../../../assets/preachercurl.png'),
    },

  ];


  // ==========================================================
  // RENDER
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

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >

          <Feather
            name="chevron-left"
            size={31}
            color="#003F34"
          />

        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Latihan Sekarang
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


        {/* ==================================================
            WORKOUT SUMMARY CARD
        ================================================== */}

        <View style={styles.workoutCard}>


          {/* =================================================
              BADGES
          ================================================= */}

          <View style={styles.badgeContainer}>


            {/* 5 VARIASI */}

            <View style={styles.infoBadge}>

              <Feather
                name="zap"
                size={16}
                color="#003F34"
              />

              <Text style={styles.infoBadgeText}>
                5 variasi
              </Text>

            </View>


            {/* 60 MNT */}

            <View style={styles.infoBadge}>

              <Feather
                name="watch"
                size={16}
                color="#003F34"
              />

              <Text style={styles.infoBadgeText}>
                60 mnt
              </Text>

            </View>

          </View>


          {/* =================================================
              WORKOUT NAME
          ================================================= */}

          <Text style={styles.workoutName}>
            Punggung dan Bisep
          </Text>


          {/* =================================================
              START BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('StartWorkoutCountdown')}
            activeOpacity={0.85}
          >

            <Text style={styles.startButtonText}>
              Mulai Latihan
            </Text>


            <View style={styles.startArrowCircle}>

              <Feather
                name="arrow-right"
                size={20}
                color="#FFFFFF"
              />

            </View>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            CONNECTED DEVICE
        ================================================== */}

        <View style={styles.deviceSection}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.deviceSectionTitle}>
            Terhubung dengan:
          </Text>


          {/* =================================================
              DEVICE CARD
          ================================================= */}

          <View style={styles.deviceCard}>


            {/* DEVICE IMAGE */}

            <View style={styles.deviceImageContainer}>

              <Image
                source={require('../../../assets/corospace4.png')}
                style={styles.deviceImage}
                resizeMode="contain"
              />

            </View>


            {/* DEVICE NAME */}

            <Text style={styles.deviceName}>
              Coros Pace 4
            </Text>

          </View>

        </View>


        {/* ==================================================
            VARIATION HEADER
        ================================================== */}

        <View style={styles.variationHeader}>

          <Text style={styles.variationTitle}>
            Variasi Latihan
          </Text>


          <TouchableOpacity
            onPress={() => navigation.navigate('UbahVariasi')}
            activeOpacity={0.7}
          >

            <Text style={styles.changeVariationText}>
              Ubah variasi latihan
            </Text>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            EXERCISE LIST
        ================================================== */}

        <View style={styles.exerciseList}>

          {exercises.map((exercise) => (

            <ExerciseItem
              key={exercise.id}
              title={exercise.title}
              category={exercise.category}
              duration={exercise.duration}
              image={exercise.image}
            />

          ))}

        </View>


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

        <View style={styles.bottomSpace} />

      </ScrollView>

    </SafeAreaView>

  );

}


// ============================================================
// EXERCISE ITEM
// ============================================================

function ExerciseItem({
  title,
  category,
  duration,
  image,
}) {

  return (

    <TouchableOpacity
      style={styles.exerciseItem}
      activeOpacity={0.85}
    >


      {/* =====================================================
          EXERCISE IMAGE
      ===================================================== */}

      <Image
        source={image}
        style={styles.exerciseImage}
        resizeMode="cover"
      />


      {/* =====================================================
          EXERCISE INFORMATION
      ===================================================== */}

      <View style={styles.exerciseInfo}>


        {/* ===================================================
            TITLE
        =================================================== */}

        <Text
          style={styles.exerciseTitle}
          numberOfLines={1}
        >
          {title}
        </Text>


        {/* ===================================================
            META INFORMATION
        =================================================== */}

        <View style={styles.exerciseMeta}>


          {/* CATEGORY */}

          <View style={styles.categoryBadge}>

            <Text style={styles.categoryBadgeText}>
              {category}
            </Text>

          </View>


          {/* DURATION */}

          <View style={styles.durationContainer}>

            <Feather
              name="watch"
              size={17}
              color="#303336"
            />

            <Text style={styles.durationText}>
              {duration}
            </Text>

          </View>

        </View>

      </View>

    </TouchableOpacity>

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
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E6E6',
    backgroundColor: '#FFFFFF',
    marginTop: 26,
  },


  backButton: {
    width: 40,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  headerTitle: {
    marginLeft: 13,
    fontSize: 23,
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
    paddingTop: 22,
    paddingBottom: 40,
  },


  // ==========================================================
  // WORKOUT CARD
  // ==========================================================

  workoutCard: {
    marginHorizontal: 14,
    minHeight: 276,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: '#F7F7F7',
    overflow: 'hidden',
  },


  // ==========================================================
  // BADGES
  // ==========================================================

  badgeContainer: {
    alignItems: 'flex-end',
    gap: 9,
  },


  infoBadge: {
    height: 32,
    paddingHorizontal: 15,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#62D5AE',
  },


  infoBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // WORKOUT NAME
  // ==========================================================

  workoutName: {
    marginTop: 60,
    fontSize: 19,
    fontWeight: '500',
    color: '#23816F',
  },


  // ==========================================================
  // START BUTTON
  // ==========================================================

  startButton: {
    height: 63,
    marginTop: 13,
    paddingLeft: 27,
    paddingRight: 8,
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#003F34',
  },


  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  startArrowCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00352C',
  },


  // ==========================================================
  // DEVICE SECTION
  // ==========================================================

  deviceSection: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingTop: 27,
    paddingBottom: 25,
    borderRadius: 21,
    backgroundColor: '#EAF3F0',
  },


  deviceSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // DEVICE CARD
  // ==========================================================

  deviceCard: {
    height: 65,
    marginTop: 11,
    borderWidth: 2,
    borderColor: '#D6D7D7',
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },


  deviceImageContainer: {
    width: 100,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },


  deviceImage: {
    width: 95,
    height: 75,
  },


  deviceName: {
    marginLeft: 12,
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // VARIATION HEADER
  // ==========================================================

  variationHeader: {
    marginHorizontal: 20,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  variationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003F34',
  },


  changeVariationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#16483E',
  },


  // ==========================================================
  // EXERCISE LIST
  // ==========================================================

  exerciseList: {
    marginHorizontal: 20,
    marginTop: 10,
    gap: 9,
  },


  // ==========================================================
  // EXERCISE ITEM
  // ==========================================================

  exerciseItem: {
    height: 94,
    borderWidth: 1,
    borderColor: '#D7D8D8',
    borderRadius: 17,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },


  // ==========================================================
  // EXERCISE IMAGE
  // ==========================================================

  exerciseImage: {
    width: 116,
    height: 78,
    borderRadius: 10,
  },


  // ==========================================================
  // EXERCISE INFO
  // ==========================================================

  exerciseInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
    minWidth: 0,
  },


  exerciseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // EXERCISE META
  // ==========================================================

  exerciseMeta: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },


  // ==========================================================
  // CATEGORY BADGE
  // ==========================================================

  categoryBadge: {
    height: 30,
    paddingHorizontal: 14,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#62D5AE',
  },


  categoryBadgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#003F34',
  },


  // ==========================================================
  // DURATION
  // ==========================================================

  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },


  durationText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#303336',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 35,
  },

});
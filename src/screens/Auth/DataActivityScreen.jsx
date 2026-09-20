import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// COMPONENT
// ============================================================

export default function UserDataActivity({ navigation, route }) {

  // =====================================================
  // DATA DARI HALAMAN SEBELUMNYA
  // =====================================================

  const {
    name,
    email,
    password,
    gender,
    age,
    weight,
    height,
  } = route?.params || {};


  // =====================================================
  // STATE AKTIVITAS
  // =====================================================

  const [activity, setActivity] = useState(null);


  // =====================================================
  // CEK DATA SUDAH DIPILIH
  // =====================================================

  const isFormComplete = activity !== null;


  // =====================================================
  // PILIH AKTIVITAS
  // =====================================================

  const handleActivitySelect = (value) => {
    setActivity(value);
  };


  // =====================================================
  // LANJUT
  // =====================================================

  const handleNext = () => {

    if (!isFormComplete) {
      return;
    }

    navigation.navigate('DataGoal', {
      name,
      email,
      password,
      gender,
      age,
      weight,
      height,
      activity,
    });

  };


  // =====================================================
  // LEWATI
  // =====================================================

  const handleSkip = () => {

    navigation.navigate('DataGoal', {
      name,
      email,
      password,
      gender,
      age,
      weight,
      height,
      activity: null,
    });

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>

        {/* BACK BUTTON */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >

          <Feather
            name="chevron-left"
            size={31}
            color="#064C42"
          />

        </TouchableOpacity>


        {/* PROGRESS TEXT */}

        <Text style={styles.progressText}>
          4 dari 5
        </Text>

      </View>


      {/* =====================================================
          PROGRESS BAR + LEWATI
      ===================================================== */}

      <View style={styles.progressRow}>

        <View style={styles.progressContainer}>

          <View style={styles.progressBackground}>

            <View style={styles.progressActive} />

          </View>

        </View>


        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >

          <Text style={styles.skipText}>
            Lewati
          </Text>

        </TouchableOpacity>

      </View>


      {/* =====================================================
          TITLE
      ===================================================== */}

      <View style={styles.titleContainer}>

        <Text style={styles.title}>
          Bagaimana aktivitas harian Anda?
        </Text>


        <Text style={styles.subtitle}>
          Pilih aktivitas yang menggambarkan rutinitas
          {'\n'}
          rutinitas Anda di luar waktu latihan.
        </Text>

      </View>


      {/* =====================================================
          ACTIVITY OPTIONS
      ===================================================== */}

      <View style={styles.activityContainer}>


        {/* =================================================
            JARANG BERGERAK
        ================================================= */}

        <TouchableOpacity
          style={[
            styles.activityCard,
            activity === 'jarang_bergerak' &&
              styles.activityCardSelected,
          ]}
          onPress={() => handleActivitySelect('jarang_bergerak')}
          activeOpacity={0.8}
        >

          <Image
            source={require('../../../assets/Low.png')}
            style={styles.activityImage}
            resizeMode="contain"
          />


          <View style={styles.activityTextContainer}>

            <Text
              style={[
                styles.activityTitle,
                activity === 'jarang_bergerak' &&
                  styles.activityTitleSelected,
              ]}
            >
              Jarang bergerak
            </Text>


            <Text
              style={[
                styles.activityDescription,
                activity === 'jarang_bergerak' &&
                  styles.activityDescriptionSelected,
              ]}
            >
              Pekerja kantoran, lebih banyak duduk sepanjang hari
            </Text>

          </View>

        </TouchableOpacity>


        {/* =================================================
            AKTIF MODERAT
        ================================================= */}

        <TouchableOpacity
          style={[
            styles.activityCard,
            activity === 'aktif_moderat' &&
              styles.activityCardSelected,
          ]}
          onPress={() => handleActivitySelect('aktif_moderat')}
          activeOpacity={0.8}
        >

          <Image
            source={require('../../../assets/Moderat.png')}
            style={styles.activityImage}
            resizeMode="contain"
          />


          <View style={styles.activityTextContainer}>

            <Text
              style={[
                styles.activityTitle,
                activity === 'aktif_moderat' &&
                  styles.activityTitleSelected,
              ]}
            >
              Aktif moderat
            </Text>


            <Text
              style={[
                styles.activityDescription,
                activity === 'aktif_moderat' &&
                  styles.activityDescriptionSelected,
              ]}
            >
              Banyak berdiri, sering berjalan, atau mengurus rumah tangga.
            </Text>

          </View>

        </TouchableOpacity>


        {/* =================================================
            SANGAT AKTIF
        ================================================= */}

        <TouchableOpacity
          style={[
            styles.activityCard,
            activity === 'sangat_aktif' &&
              styles.activityCardSelected,
          ]}
          onPress={() => handleActivitySelect('sangat_aktif')}
          activeOpacity={0.8}
        >

          <Image
            source={require('../../../assets/High.png')}
            style={styles.activityImage}
            resizeMode="contain"
          />


          <View style={styles.activityTextContainer}>

            <Text
              style={[
                styles.activityTitle,
                activity === 'sangat_aktif' &&
                  styles.activityTitleSelected,
              ]}
            >
              Sangat aktif
            </Text>


            <Text
              style={[
                styles.activityDescription,
                activity === 'sangat_aktif' &&
                  styles.activityDescriptionSelected,
              ]}
            >
              Pekerja fisik, atlet, atau bergerak aktif tanpa henti.
            </Text>

          </View>

        </TouchableOpacity>

      </View>


      {/* =====================================================
          BUTTON
      ===================================================== */}

      <View style={styles.bottomContainer}>

        <TouchableOpacity
          style={[
            styles.nextButton,
            !isFormComplete && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          activeOpacity={isFormComplete ? 0.8 : 1}
          disabled={!isFormComplete}
        >

          <Text style={styles.nextButtonText}>
            Lanjut
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // =====================================================
  // SCREEN
  // =====================================================

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  // =====================================================
  // HEADER
  // =====================================================

  header: {
    height: 130,
    paddingHorizontal: 27,
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },


  backButton: {
    width: 35,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  progressText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
    color: '#063F37',
    marginLeft: -35,
  },


  // =====================================================
  // PROGRESS BAR
  // =====================================================

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 27,
    marginTop: -32,
  },


  progressContainer: {
    flex: 1,
    marginRight: 22,
  },


  progressBackground: {
    width: '100%',
    height: 8,
    borderRadius: 10,
    backgroundColor: '#D5D5D5',
    overflow: 'hidden',
  },


  progressActive: {
    width: '80%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#1F6F5C',
  },


  skipButton: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },


  skipText: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '400',
    color: '#003125',
  },


  // =====================================================
  // TITLE
  // =====================================================

  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 46,
    alignItems: 'center',
  },


  title: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
    color: '#003125',
    textAlign: 'center',
    letterSpacing: -0.6,
  },


  subtitle: {
    marginTop: 17,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    color: '#003125',
    textAlign: 'center',
    letterSpacing: -0.25,
  },


  // =====================================================
  // ACTIVITY CONTAINER
  // =====================================================

  activityContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 14,
  },


  // =====================================================
  // ACTIVITY CARD
  // =====================================================

  activityCard: {
    width: '100%',
    minHeight: 100,
    borderWidth: 2,
    borderColor: '#B0B0B5',
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 15,
  },


  // =====================================================
  // ACTIVITY CARD SELECTED
  // =====================================================

  activityCardSelected: {
    borderColor: '#699F92',
    backgroundColor: '#E9F1EF',
  },


  // =====================================================
  // ACTIVITY IMAGE
  // =====================================================

  activityImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },


  // =====================================================
  // ACTIVITY TEXT
  // =====================================================

  activityTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 5,
  },


  activityTitle: {
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '700',
    color: '#002D22',
    marginBottom: 4,
    letterSpacing: -0.3,
  },


  activityTitleSelected: {
    color: '#002D22',
  },


  activityDescription: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: '#003125',
    letterSpacing: -0.2,
  },


  activityDescriptionSelected: {
    color: '#002D22',
  },


  // =====================================================
  // BOTTOM BUTTON
  // =====================================================

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingBottom: 47,
    marginBottom: 16,
  },


  // =====================================================
  // BUTTON AKTIF
  // =====================================================

  nextButton: {
    width: '100%',
    height: 60,
    borderRadius: 32,
    backgroundColor: '#1F6F5C',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // =====================================================
  // BUTTON NONAKTIF
  // =====================================================

  nextButtonDisabled: {
    backgroundColor: '#8A8A91',
  },


  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

});
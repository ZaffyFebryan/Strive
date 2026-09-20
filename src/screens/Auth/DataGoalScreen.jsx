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

export default function UserDataGoal({ navigation, route }) {

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
    activity,
  } = route?.params || {};


  // =====================================================
  // STATE TARGET KEBUGARAN
  // =====================================================

  const [goal, setGoal] = useState(null);


  // =====================================================
  // CEK DATA SUDAH DIPILIH
  // =====================================================

  const isFormComplete = goal !== null;


  // =====================================================
  // PILIH TARGET
  // =====================================================

  const handleGoalSelect = (value) => {
    setGoal(value);
  };


  // =====================================================
  // LANJUT
  // =====================================================

  const handleNext = () => {

    if (!isFormComplete) {
      return;
    }

    navigation.navigate('Main', {
      name,
      email,
      password,
      gender,
      age,
      weight,
      height,
      activity,
      goal,
    });

  };


  // =====================================================
  // LEWATI
  // =====================================================

  const handleSkip = () => {

    navigation.navigate('Main', {
      name,
      email,
      password,
      gender,
      age,
      weight,
      height,
      activity,
      goal: null,
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
          5 dari 5
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
          Apa target kebugaran Anda?
        </Text>


        <Text style={styles.subtitle}>
          Strive akan menyusun program latihan beban dan
          pemantauan pola makan yang dirancang khusus untuk
          mencapai target Anda.
        </Text>

      </View>


      {/* =====================================================
          GOAL OPTIONS
      ===================================================== */}

      <View style={styles.goalContainer}>


        {/* =================================================
            MENURUNKAN BERAT BADAN
        ================================================= */}

        <TouchableOpacity
          style={[
            styles.goalCard,
            goal === 'menurunkan_berat_badan' &&
              styles.goalCardSelected,
          ]}
          onPress={() => handleGoalSelect('menurunkan_berat_badan')}
          activeOpacity={0.8}
        >

          <Image
            source={require('../../../assets/Cut.png')}
            style={styles.goalImage}
            resizeMode="contain"
          />


          <View style={styles.goalTextContainer}>

            <Text
              style={[
                styles.goalTitle,
                goal === 'menurunkan_berat_badan' &&
                  styles.goalTitleSelected,
              ]}
            >
              Menurunkan Berat Badan
            </Text>


            <Text
              style={[
                styles.goalDescription,
                goal === 'menurunkan_berat_badan' &&
                  styles.goalDescriptionSelected,
              ]}
            >
              Fokus membakar lemak tubuh dan mengencangkan otot
            </Text>

          </View>

        </TouchableOpacity>


        {/* =================================================
            MEMBANGUN MASSA OTOT
        ================================================= */}

        <TouchableOpacity
          style={[
            styles.goalCard,
            goal === 'membangun_massa_otot' &&
              styles.goalCardSelected,
          ]}
          onPress={() => handleGoalSelect('membangun_massa_otot')}
          activeOpacity={0.8}
        >

          <Image
            source={require('../../../assets/Bulk.png')}
            style={styles.goalImage}
            resizeMode="contain"
          />


          <View style={styles.goalTextContainer}>

            <Text
              style={[
                styles.goalTitle,
                goal === 'membangun_massa_otot' &&
                  styles.goalTitleSelected,
              ]}
            >
              Membangun Massa Otot
            </Text>


            <Text
              style={[
                styles.goalDescription,
                goal === 'membangun_massa_otot' &&
                  styles.goalDescriptionSelected,
              ]}
            >
              Fokus meningkatkan kekuatan fisik dan ukuran otot
            </Text>

          </View>

        </TouchableOpacity>


        {/* =================================================
            MENJAGA KEBUGARAN
        ================================================= */}

        <TouchableOpacity
          style={[
            styles.goalCard,
            goal === 'menjaga_kebugaran' &&
              styles.goalCardSelected,
          ]}
          onPress={() => handleGoalSelect('menjaga_kebugaran')}
          activeOpacity={0.8}
        >

          <Image
            source={require('../../../assets/Maintain.png')}
            style={styles.goalImage}
            resizeMode="contain"
          />


          <View style={styles.goalTextContainer}>

            <Text
              style={[
                styles.goalTitle,
                goal === 'menjaga_kebugaran' &&
                  styles.goalTitleSelected,
              ]}
            >
              Menjaga Kebugaran
            </Text>


            <Text
              style={[
                styles.goalDescription,
                goal === 'menjaga_kebugaran' &&
                  styles.goalDescriptionSelected,
              ]}
            >
              Fokus mempertahankan stamina dan vitalitas tubuh
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
    width: '100%',
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
  // GOAL CONTAINER
  // =====================================================

  goalContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 14,
  },


  // =====================================================
  // GOAL CARD
  // =====================================================

  goalCard: {
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
  // GOAL CARD SELECTED
  // =====================================================

  goalCardSelected: {
    borderColor: '#699F92',
    backgroundColor: '#E9F1EF',
  },


  // =====================================================
  // GOAL IMAGE
  // =====================================================

  goalImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },


  // =====================================================
  // GOAL TEXT
  // =====================================================

  goalTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 5,
  },


  goalTitle: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '700',
    color: '#003125',
    marginBottom: 5,
    letterSpacing: -0.3,
  },


  goalTitleSelected: {
    color: '#002D22',
  },


  goalDescription: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: '#003125',
    letterSpacing: -0.2,
  },


  goalDescriptionSelected: {
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
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// COMPONENT
// ============================================================

export default function UserDataWeight({ navigation, route }) {

  // =====================================================
  // DATA DARI HALAMAN SEBELUMNYA
  // =====================================================

  const {
    name,
    email,
    password,
    gender,
    age,
  } = route?.params || {};


  // =====================================================
  // STATE BERAT & TINGGI
  // =====================================================

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');


  // =====================================================
  // CEK DATA SUDAH LENGKAP
  // =====================================================

  const isFormComplete =
    weight.trim() !== '' &&
    height.trim() !== '';


  // =====================================================
  // LANJUT
  // =====================================================

  const handleNext = () => {

    // Jangan lanjut kalau data belum lengkap
    if (!isFormComplete) {
      return;
    }

    navigation.navigate('DataActivity', {
      name,
      email,
      password,
      gender,
      age,
      weight,
      height,
    });

  };


  // =====================================================
  // LEWATI
  // =====================================================

  const handleSkip = () => {

    navigation.navigate('DataActivity', {
      name,
      email,
      password,
      gender,
      age,
      weight: null,
      height: null,
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
          3 dari 5
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
          Berapa berat dan tinggi badan
          {'\n'}
          Anda?
        </Text>


        <Text style={styles.subtitle}>
          Data ini digunakan untuk memantau
          {'\n'}
          perkembangan fisik dan menghitung target kalori
          Anda.
        </Text>

      </View>


      {/* =====================================================
          INPUT BERAT & TINGGI
      ===================================================== */}

      <View style={styles.inputRow}>

        {/* ================= BERAT ================= */}

        <View style={styles.inputColumn}>

          <Text style={styles.inputLabel}>
            Berat badan
          </Text>


          <View
            style={[
              styles.inputContainer,
              weight.length > 0 && styles.inputContainerFilled,
            ]}
          >

            <TextInput
              style={[
                styles.input,
                weight.length > 0 && styles.inputFilled,
              ]}
              value={weight}
              onChangeText={setWeight}
              placeholder="--"
              placeholderTextColor="#B0B0B5"
              keyboardType="numeric"
              maxLength={3}
              selectTextOnFocus
            />


            <Text
              style={[
                styles.unitText,
                weight.length > 0 && styles.unitTextFilled,
              ]}
            >
              kg
            </Text>

          </View>

        </View>


        {/* ================= TINGGI ================= */}

        <View style={styles.inputColumn}>

          <Text style={styles.inputLabel}>
            Tinggi badan
          </Text>


          <View
            style={[
              styles.inputContainer,
              height.length > 0 && styles.inputContainerFilled,
            ]}
          >

            <TextInput
              style={[
                styles.input,
                height.length > 0 && styles.inputFilled,
              ]}
              value={height}
              onChangeText={setHeight}
              placeholder="--"
              placeholderTextColor="#B0B0B5"
              keyboardType="numeric"
              maxLength={3}
              selectTextOnFocus
            />


            <Text
              style={[
                styles.unitText,
                height.length > 0 && styles.unitTextFilled,
              ]}
            >
              cm
            </Text>

          </View>

        </View>

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
    width: '60%',
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
  // INPUT ROW
  // =====================================================

  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 46,
    gap: 19,
  },


  inputColumn: {
    flex: 1,
  },


  inputLabel: {
    marginBottom: 10,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '600',
    color: '#003125',
    letterSpacing: -0.3,
  },


  // =====================================================
  // INPUT CONTAINER
  // DEFAULT
  // =====================================================

  inputContainer: {
    height: 52,
    width: '100%',
    borderWidth: 2,
    borderColor: '#B0B0B5',
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },


  // =====================================================
  // INPUT CONTAINER
  // TERISI
  // =====================================================

  inputContainerFilled: {
    borderColor: '#699F92',
    backgroundColor: '#E9F1EF',
  },


  // =====================================================
  // INPUT
  // =====================================================

  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 34,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: '600',
    color: '#B0B0B5',
    textAlign: 'left',
  },


  // =====================================================
  // INPUT SAAT TERISI
  // =====================================================

  inputFilled: {
    color: '#002D22',
  },


  // =====================================================
  // UNIT
  // =====================================================

  unitText: {
    marginRight: 22,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '400',
    color: '#B0B0B5',
  },


  // =====================================================
  // UNIT SAAT TERISI
  // =====================================================

  unitTextFilled: {
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
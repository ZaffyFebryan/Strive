import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  SafeAreaView,
} from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function UserDataScreen({ navigation, route }) {

  // =====================================================
  // DATA DARI REGISTER
  // =====================================================

  const registerData = route?.params || {};

  const {
    name,
    email,
    password,
  } = registerData;


  // =====================================================
  // STATE
  // =====================================================

  const [gender, setGender] = useState('');


  // =====================================================
  // PILIH JENIS KELAMIN
  // =====================================================

  const handleSelectGender = (value) => {
    setGender(value);
  };


  // =====================================================
  // LANJUT
  // =====================================================

    const handleNext = () => {

    // Kalau gender belum dipilih,
    // jangan lanjut ke halaman berikutnya
    if (!gender) return;

    navigation.navigate('DataAge', {
        name,
        email,
        password,
        gender,
    });
    };


  // =====================================================
  // LEWATI
  // =====================================================

  const handleSkip = () => {

    navigation.navigate('UserDataAge', {
      name,
      email,
      password,
      gender: null,
    });
  };

  


  // =====================================================
  // UI
  // =====================================================

  return (
    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


{/* =================================================
    HEADER
================================================= */}

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


  {/* PROGRESS TITLE */}

  <Text style={styles.progressText}>
    1 dari 5
  </Text>

</View>


{/* =================================================
    PROGRESS BAR + SKIP
================================================= */}

<View style={styles.progressRow}>

  {/* PROGRESS BAR */}

  <View style={styles.progressContainer}>

    <View style={styles.progressBackground}>

      <View style={styles.progressActive} />

    </View>

  </View>


  {/* SKIP */}

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


{/* =================================================
    TITLE
================================================= */}

<View style={styles.titleContainer}>

  <Text style={styles.title}>
    Apa jenis kelamin Anda?
  </Text>

  <Text style={styles.subtitle}>
    Data jenis kelamin digunakan untuk menghitung
    kebutuhan kalori harian dan program latihan
    beban Anda.
  </Text>

</View>


      {/* =================================================
          GENDER OPTIONS
      ================================================= */}

      <View style={styles.genderContainer}>


        {/* =================================================
            PRIA
        ================================================= */}

        <TouchableOpacity
        style={[
            styles.genderCard,
            gender === 'Pria' &&
            styles.genderCardActive,
        ]}
        onPress={() => handleSelectGender('Pria')}
        activeOpacity={0.8}
        >

        <Image
            source={require('../../../assets/Pria.png')}
            style={styles.genderIcon}
            resizeMode="contain"
        />

        <Text
            style={[
            styles.genderText,
            gender === 'Pria' &&
                styles.genderTextActive,
            ]}
        >
            Pria
        </Text>

        </TouchableOpacity>


        {/* =================================================
            WANITA
        ================================================= */}

        <TouchableOpacity
        style={[
            styles.genderCard,
            gender === 'Wanita' &&
            styles.genderCardActive,
        ]}
        onPress={() => handleSelectGender('Wanita')}
        activeOpacity={0.8}
        >

        <Image
            source={require('../../../assets/Wanita.png')}
            style={styles.genderIcon}
            resizeMode="contain"
        />

        <Text
            style={[
            styles.genderText,
            gender === 'Wanita' &&
                styles.genderTextActive,
            ]}
        >
            Wanita
        </Text>

        </TouchableOpacity>

      </View>

      


      {/* =================================================
          NEXT BUTTON
      ================================================= */}

      <View style={styles.bottomContainer}>

        <TouchableOpacity
          style={[
            styles.nextButton,

            !gender &&
              styles.nextButtonDisabled,

            gender &&
              styles.nextButtonEnabled,
          ]}
          onPress={handleNext}
          disabled={!gender}
          activeOpacity={0.8}
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
    height: 130,
    paddingHorizontal: 27,
    paddingTop: 30,
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


    // ==========================================================
    // PROGRESS ROW
    // Progress bar + Lewati
    // ==========================================================

    progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 27,
    marginTop: -32,
    },


    // ==========================================================
    // PROGRESS CONTAINER
    // ==========================================================

    progressContainer: {
    flex: 1,
    marginRight: 20,
    },


    // ==========================================================
    // PROGRESS BACKGROUND
    // ==========================================================

    progressBackground: {
    width: '100%',
    height: 8,
    borderRadius: 10,
    backgroundColor: '#D5D5D5',
    overflow: 'hidden',
    },


    // ==========================================================
    // PROGRESS ACTIVE
    // ==========================================================

    progressActive: {
    width: '20%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#1F6F5C',
    },


    // ==========================================================
    // SKIP
    // ==========================================================

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


  // ==========================================================
  // TITLE
  // ==========================================================

  titleContainer: {
    paddingHorizontal: 25,
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
    marginTop: 16,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    color: '#003125',
    textAlign: 'center',
    letterSpacing: -0.25,
  },


  // ==========================================================
  // GENDER CONTAINER
  // ==========================================================

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 46,
    paddingHorizontal: 40,
  },


  // ==========================================================
  // GENDER CARD
  // ==========================================================

  genderCard: {
    width: 162,
    height: 162,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#B8B8BD',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // GENDER CARD ACTIVE
  // ==========================================================

  genderCardActive: {
    borderWidth: 2,
    borderColor: '#699F92',
    backgroundColor: '#E9F1EF',
  },


  // ==========================================================
  // GENDER ICON
  // ==========================================================

    genderIcon: {
    width: 78,
    height: 78,
    resizeMode: 'contain',
    marginBottom: 8,
    },


  // ==========================================================
  // GENDER TEXT
  // ==========================================================

  genderText: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    color: '#003125',
    letterSpacing: -0.3,
  },


  genderTextActive: {
    color: '#003125',
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingBottom: 64,
  },


  // ==========================================================
  // NEXT BUTTON
  // ==========================================================

  nextButton: {
    width: '100%',
    height: 60,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },


  nextButtonDisabled: {
    backgroundColor: '#D0D0D0',
  },


  nextButtonEnabled: {
    backgroundColor: '#1F6F5C',
  },


  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

});
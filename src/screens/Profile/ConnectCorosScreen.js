import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';


// ============================================================
// CONNECT COROS SCREEN
// ============================================================

export default function ConnectCorosScreen({ navigation }) {


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // ========================================================
    // BACK
    // ========================================================

    back:
      require('../../../assets/kembali.png'),


    // ========================================================
    // COROS LOGO
    // ========================================================

    coros:
      require('../../../assets/coros.png'),

  };


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // HANDLE CONNECT COROS
  // ==========================================================

  const handleConnect = () => {

    console.log('Menghubungkan akun COROS...');

    // Untuk sementara belum diarahkan
    // ke proses autentikasi COROS.

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


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >

          <Image
            source={ICONS.back}
            style={styles.backIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>


        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.headerTitle}>
          Hubungkan Coros
        </Text>


        {/* =================================================
            HEADER SPACER
        ================================================= */}

        <View style={styles.headerSpacer} />

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <View style={styles.content}>


        {/* ==================================================
            COROS INFORMATION
        ================================================== */}

        <View style={styles.corosSection}>


          {/* =================================================
              COROS LOGO
          ================================================= */}

          <Image
            source={ICONS.coros}
            style={styles.corosLogo}
            resizeMode="contain"
          />


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Text style={styles.description}>
            Sambungkan akun COROS Anda untuk
            menyinkronkan data metrik latihan beban secara
            instan.
          </Text>

        </View>


        {/* ==================================================
            CONNECT BUTTON
        ================================================== */}

        <View style={styles.bottomContainer}>

          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => navigation.navigate('ConnectingCoros')}
            activeOpacity={0.85}
          >

            <Text style={styles.connectButtonText}>
              Sambungkan
            </Text>

          </TouchableOpacity>

        </View>

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
    height: 80,

    paddingHorizontal: 20,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    borderBottomWidth: 1,

    borderBottomColor: '#E2E3E3',

    backgroundColor: '#FFFFFF',
    marginTop: 26,
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 40,

    height: 40,

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
    flex: 1,

    marginLeft: 7,

    fontSize: 24,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // HEADER SPACER
  // ==========================================================

  headerSpacer: {
    width: 40,

    height: 40,
  },


  // ==========================================================
  // CONTENT
  // ==========================================================

  content: {
    flex: 1,

    paddingHorizontal: 20,
  },


  // ==========================================================
  // COROS SECTION
  // ==========================================================

  corosSection: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    paddingBottom: 55,
  },


  // ==========================================================
  // COROS LOGO
  // ==========================================================

  corosLogo: {
    width: 210,

    height: 70,
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    width: '100%',

    marginTop: 25,

    paddingHorizontal: 5,

    fontSize: 18,

    lineHeight: 24,

    fontWeight: '400',

    color: '#16483E',

    textAlign: 'center',
  },


  // ==========================================================
  // BOTTOM CONTAINER
  // ==========================================================

  bottomContainer: {
    paddingBottom: 34,

    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },


  // ==========================================================
  // CONNECT BUTTON
  // ==========================================================

  connectButton: {
    width: '100%',

    height: 60,

    borderRadius: 32,

    backgroundColor: '#227B68',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // CONNECT BUTTON TEXT
  // ==========================================================

  connectButtonText: {
    fontSize: 19,

    fontWeight: '700',

    color: '#FFFFFF',
  },

});
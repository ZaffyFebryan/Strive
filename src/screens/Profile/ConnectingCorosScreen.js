import React, { useEffect, useState } from 'react';

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
// CONNECTING COROS SCREEN
// ============================================================

export default function ConnectingCorosScreen({ navigation }) {


  // ==========================================================
  // PROGRESS
  // ==========================================================

  const [progress, setProgress] =
    useState(0);


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Back
    back:
      require('../../../assets/kembali.png'),

    // Icon aktivitas / beban
    workout:
      require('../../../assets/logostrive.png'),

    // Icon sinkronisasi
    sync:
      require('../../../assets/sinkronisasi.png'),

    // Logo COROS
    coros:
      require('../../../assets/coros2.png'),

  };


  // ==========================================================
  // CONNECTING PROCESS
  // ==========================================================

  useEffect(() => {

    const interval = setInterval(() => {

      setProgress((currentProgress) => {

        // ====================================================
        // JIKA SUDAH 100%
        // ====================================================

        if (currentProgress >= 100) {

          clearInterval(interval);

          return 100;

        }


        // ====================================================
        // TAMBAH PROGRESS
        // ====================================================

        return currentProgress + 5;

      });

    }, 250);


    // ========================================================
    // CLEANUP
    // ========================================================

    return () => {

      clearInterval(interval);

    };

  }, []);


  // ==========================================================
  // NAVIGATE AFTER 100%
  // ==========================================================

  useEffect(() => {

    if (progress >= 100) {

      const timeout = setTimeout(() => {

        navigation.navigate('ConnectedDevice');

      }, 500);


      return () => {

        clearTimeout(timeout);

      };

    }

  }, [progress, navigation]);


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // PROGRESS WIDTH
  // ==========================================================

  const progressWidth =
    `${progress}%`;


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
            DEVICE CONNECTION VISUAL
        ================================================== */}

        <View style={styles.connectionVisual}>


          {/* =================================================
              WORKOUT ICON
          ================================================= */}

          <Image
            source={ICONS.workout}
            style={styles.workoutIcon}
            resizeMode="contain"
          />


          {/* =================================================
              SYNC ICON
          ================================================= */}

          <Image
            source={ICONS.sync}
            style={styles.syncIcon}
            resizeMode="contain"
          />


          {/* =================================================
              COROS LOGO
          ================================================= */}

          <Image
            source={ICONS.coros}
            style={styles.corosIcon}
            resizeMode="contain"
          />

        </View>


        {/* ==================================================
            CONNECTION STATUS
        ================================================== */}

        <View style={styles.progressSection}>


          {/* =================================================
              STATUS TITLE
          ================================================= */}

          <Text style={styles.connectingTitle}>
            Menghubungkan
          </Text>


          {/* =================================================
              PROGRESS ROW
          ================================================= */}

          <View style={styles.progressRow}>


            {/* ==============================================
                PROGRESS BAR
            ============================================== */}

            <View style={styles.progressBarBackground}>

              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: progressWidth,
                  },
                ]}
              />

            </View>


            {/* ==============================================
                PERCENTAGE
            ============================================== */}

            <Text style={styles.progressText}>
              {progress}%
            </Text>

          </View>

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
  // CONNECTION VISUAL
  // ==========================================================

  connectionVisual: {
    marginTop: 210,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // WORKOUT ICON
  // ==========================================================

  workoutIcon: {
    width: 68,

    height: 60,
  },


  // ==========================================================
  // SYNC ICON
  // ==========================================================

  syncIcon: {
    width: 30,

    height: 30,

    marginHorizontal: 26,
  },


  // ==========================================================
  // COROS ICON
  // ==========================================================

  corosIcon: {
    width: 60,

    height: 60,
  },


  // ==========================================================
  // PROGRESS SECTION
  // ==========================================================

  progressSection: {
    marginTop: 68,
  },


  // ==========================================================
  // CONNECTING TITLE
  // ==========================================================

  connectingTitle: {
    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',

    marginBottom: 17,
  },


  // ==========================================================
  // PROGRESS ROW
  // ==========================================================

  progressRow: {
    flexDirection: 'row',

    alignItems: 'center',

    width: '100%',
  },


  // ==========================================================
  // PROGRESS BAR BACKGROUND
  // ==========================================================

  progressBarBackground: {
    flex: 1,

    height: 8,

    borderRadius: 8,

    backgroundColor: '#D9DADC',

    overflow: 'hidden',
  },


  // ==========================================================
  // PROGRESS BAR FILL
  // ==========================================================

  progressBarFill: {
    height: '100%',

    borderRadius: 8,

    backgroundColor: '#227B68',
  },


  // ==========================================================
  // PROGRESS TEXT
  // ==========================================================

  progressText: {
    width: 55,

    marginLeft: 13,

    fontSize: 20,

    fontWeight: '600',

    color: '#003F34',

    textAlign: 'right',
  },

});
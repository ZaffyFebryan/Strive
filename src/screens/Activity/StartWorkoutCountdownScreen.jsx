import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';


// ============================================================
// START WORKOUT COUNTDOWN SCREEN
// ============================================================

export default function StartWorkoutCountdownScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // COUNTDOWN
  // ==========================================================
  //
  // Countdown dimulai dari 5 detik.
  //
  // Jika halaman ini dibuka:
  //
  // 5 → 4 → 3 → 2 → 1 → 0
  //
  // Setelah mencapai 0, user diarahkan ke halaman latihan.
  // ==========================================================

  const [countdown, setCountdown] = useState(5);


  // ==========================================================
  // COUNTDOWN TIMER
  // ==========================================================

  useEffect(() => {

    // Jika countdown sudah mencapai 0,
    // jangan membuat interval baru.

    if (countdown <= 0) {

      // ======================================================
      // PINDAH KE HALAMAN SESI LATIHAN
      // ======================================================
      //
      // GANTI "WorkoutSessionScreen" jika nama screen
      // halaman latihan kamu berbeda.
      //
      // Data dari halaman sebelumnya juga bisa diteruskan
      // menggunakan route.params.
      // ======================================================

      const timer = setTimeout(() => {

        navigation.replace(
          'DataWorkout',
          {
            ...route?.params,
          }
        );

      }, 300);

      return () => clearTimeout(timer);
    }


    // ========================================================
    // KURANGI 1 DETIK
    // ========================================================

    const timer = setTimeout(() => {

      setCountdown((previous) => previous - 1);

    }, 1000);


    // Bersihkan timer ketika component unmount
    // atau countdown berubah.

    return () => clearTimeout(timer);

  }, [
    countdown,
    navigation,
    route,
  ]);


  // ==========================================================
  // TAMBAH 15 DETIK
  // ==========================================================

  const handleAddTime = () => {

    setCountdown((previous) => {

      return previous + 15;

    });

  };


  // ==========================================================
  // BATALKAN LATIHAN
  // ==========================================================

  const handleCancelWorkout = () => {

    navigation.goBack();

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      {/* ====================================================
          STATUS BAR
      ==================================================== */}

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />


      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <View style={styles.container}>


        {/* ==================================================
            COUNTDOWN CONTENT
        ================================================== */}

        <View style={styles.countdownContainer}>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Text style={styles.description}>
            Latihan dimulai dalam hitungan
          </Text>


          {/* =================================================
              COUNTDOWN NUMBER
          ================================================= */}

          <Text style={styles.countdownNumber}>
            {countdown}
          </Text>

        </View>


        {/* ==================================================
            BOTTOM BUTTONS
        ================================================== */}

        <View style={styles.bottomContainer}>


          {/* =================================================
              ADD 15 SECOND BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTime}
            activeOpacity={0.85}
          >

            <Text style={styles.addButtonText}>
              Tambah 15 detik
            </Text>

          </TouchableOpacity>


          {/* =================================================
              CANCEL BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelWorkout}
            activeOpacity={0.85}
          >

            <Text style={styles.cancelButtonText}>
              Batalkan latihan
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
  // MAIN CONTAINER
  // ==========================================================

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },


  // ==========================================================
  // COUNTDOWN
  // ==========================================================

  countdownContainer: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    fontSize: 18,
    fontWeight: '400',

    color: '#003F34',

    textAlign: 'center',

    marginBottom: 28,
  },


  // ==========================================================
  // COUNTDOWN NUMBER
  // ==========================================================

  countdownNumber: {
    fontSize: 64,
    fontWeight: '700',

    color: '#003F34',

    lineHeight: 72,

    textAlign: 'center',
  },


  // ==========================================================
  // BOTTOM CONTAINER
  // ==========================================================

  bottomContainer: {
    paddingHorizontal: 20,

    paddingBottom: 58,

    gap: 16,
  },


  // ==========================================================
  // ADD TIME BUTTON
  // ==========================================================

  addButton: {
    height: 60,

    borderRadius: 32,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#227B68',
  },


  addButtonText: {
    fontSize: 18,
    fontWeight: '600',

    color: '#FFFFFF',

    textAlign: 'center',
  },


  // ==========================================================
  // CANCEL BUTTON
  // ==========================================================

  cancelButton: {
    height: 60,

    borderRadius: 32,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F44343',
  },


  cancelButtonText: {
    fontSize: 18,
    fontWeight: '600',

    color: '#FFFFFF',

    textAlign: 'center',
  },

});
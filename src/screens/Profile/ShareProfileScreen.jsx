import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// SHARE PROFILE SCREEN
// ============================================================

export default function ShareProfileScreen({ navigation }) {


  // ==========================================================
  // SUCCESS NOTIFICATION
  // ==========================================================

  const [showNotification, setShowNotification] =
    useState(false);


  // ==========================================================
  // ANIMATION
  // ==========================================================

  const notificationOpacity =
    useRef(new Animated.Value(0)).current;


  // ==========================================================
  // QR CODE ASSET
  // ==========================================================

  const qrCodeImage =
    require('../../../assets/kodeqr.png');


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // HANDLE SAVE QR
  // ==========================================================

  const handleSaveQRCode = () => {

    // ========================================================
    // SHOW NOTIFICATION
    // ========================================================

    setShowNotification(true);


    // ========================================================
    // FADE IN
    // ========================================================

    Animated.timing(
      notificationOpacity,
      {
        toValue: 1,

        duration: 250,

        useNativeDriver: true,
      }
    ).start();


    // ========================================================
    // HIDE AFTER FEW SECONDS
    // ========================================================

    setTimeout(() => {

      Animated.timing(
        notificationOpacity,
        {
          toValue: 0,

          duration: 300,

          useNativeDriver: true,
        }
      ).start(() => {

        setShowNotification(false);

      });

    }, 2500);

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#EAF8F4"
        translucent={false}
      />


      {/* ====================================================
          SUCCESS NOTIFICATION
      ==================================================== */}

      {showNotification && (

        <Animated.View
          style={[
            styles.notification,

            {
              opacity:
                notificationOpacity,
            },
          ]}
        >

          {/* =================================================
              SUCCESS ICON
          ================================================= */}

          <View style={styles.notificationIconContainer}>

            <Feather
              name="check"
              size={18}
              color="#003F34"
            />

          </View>


          {/* =================================================
              NOTIFICATION TEXT
          ================================================= */}

          <Text style={styles.notificationText}>

            Kode QR berhasil disimpan

          </Text>

        </Animated.View>

      )}


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

          <Feather
            name="chevron-left"
            size={32}
            color="#003F34"
          />

        </TouchableOpacity>


        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.headerTitle}>

          Bagikan Profil

        </Text>


        {/* =================================================
            CAMERA BUTTON
        ================================================= */}

        <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => navigation.navigate('QRScanner')}
        activeOpacity={0.8}
        >

        <Image
            source={require('../../../assets/kamera.png')}
            style={styles.cameraIcon}
            resizeMode="contain"
        />

        </TouchableOpacity>

      </View>


      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <View style={styles.content}>


        {/* ==================================================
            QR CARD
        ================================================== */}

        <View style={styles.qrCard}>


          {/* =================================================
              QR CODE CONTAINER
          ================================================= */}

          <View style={styles.qrContainer}>

            <Image
              source={qrCodeImage}
              style={styles.qrImage}
              resizeMode="contain"
            />

          </View>


          {/* =================================================
              SAVE QR BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveQRCode}
            activeOpacity={0.85}
          >

            <Text style={styles.saveButtonText}>

              Simpan kode QR

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

    backgroundColor: '#EAF8F4',

  },


  // ==========================================================
  // SUCCESS NOTIFICATION
  // ==========================================================

  notification: {

    position: 'absolute',

    top: 0,

    left: 18,

    right: 18,

    zIndex: 100,

    height: 52,

    marginHorizontal: 0,

    backgroundColor: '#EAF3F0',

    borderWidth: 1,

    borderColor: '#207B6A',

    borderRadius: 12,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 36,

    shadowColor: '#000000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.12,

    shadowRadius: 6,

    elevation: 6,
    marginTop: 52,

  },


  notificationIconContainer: {

    width: 25,

    height: 25,

    borderRadius: 13,

    borderWidth: 1.5,

    borderColor: '#003F34',

    alignItems: 'center',

    justifyContent: 'center',

    marginRight: 18,

  },


  notificationText: {

    fontSize: 17,

    fontWeight: '600',

    color: '#003F34',

  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {

    height: 76,

    paddingHorizontal: 20,

    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#D5E5E1',

    backgroundColor: '#EAF8F4',
    marginTop: 32,

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
  // HEADER TITLE
  // ==========================================================

  headerTitle: {

    flex: 1,

    marginLeft: 7,

    fontSize: 25,

    fontWeight: '700',

    color: '#003F34',

  },


  // ==========================================================
  // CAMERA BUTTON
  // ==========================================================

  cameraButton: {

    width: 49,

    height: 49,

    borderRadius: 25,

    backgroundColor: '#F4FBF9',

    alignItems: 'center',

    justifyContent: 'center',

  },

  cameraIcon: {
  width: 23,
  height: 23,
},


  // ==========================================================
  // CONTENT
  // ==========================================================

  content: {

    flex: 1,

    paddingHorizontal: 20,

    paddingTop: 58,

  },


  // ==========================================================
  // QR CARD
  // ==========================================================

  qrCard: {

    width: '100%',

    height: 456,

    borderRadius: 36,

    backgroundColor: '#BDEBD9',

    alignItems: 'center',

    paddingTop: 53,

  },


  // ==========================================================
  // QR CONTAINER
  // ==========================================================

  qrContainer: {

    width: 260,

    height: 260,

    borderRadius: 25,

    backgroundColor: '#F5FCF9',

    alignItems: 'center',

    justifyContent: 'center',

    shadowColor: '#000000',

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.15,

    shadowRadius: 10,

    elevation: 7,

  },


  // ==========================================================
  // QR IMAGE
  // ==========================================================

  qrImage: {

    width: 215,

    height: 215,

  },


  // ==========================================================
  // SAVE BUTTON
  // ==========================================================

  saveButton: {

    width: 260,

    height: 61,

    marginTop: 32,

    borderRadius: 32,

    backgroundColor: '#227B68',

    alignItems: 'center',

    justifyContent: 'center',

  },


  // ==========================================================
  // SAVE BUTTON TEXT
  // ==========================================================

  saveButtonText: {

    fontSize: 19,

    fontWeight: '500',

    color: '#FFFFFF',

  },

});
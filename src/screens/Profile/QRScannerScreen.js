import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';


// ============================================================
// QR SCANNER SCREEN
// ============================================================

export default function QRScannerScreen({ navigation }) {


  // ==========================================================
  // CAMERA PERMISSION
  // ==========================================================

  const [permission, requestPermission] =
    useCameraPermissions();


  // ==========================================================
  // SCANNING STATE
  // ==========================================================

  const [scanned, setScanned] =
    useState(false);


  // ==========================================================
  // HANDLE BARCODE SCANNED
  // ==========================================================

  const handleBarcodeScanned = ({ type, data }) => {

    if (scanned) {
      return;
    }

    setScanned(true);


    Alert.alert(
      'QR Code Terdeteksi',
      data,
      [
        {
          text: 'OK',
          onPress: () => {
            setScanned(false);
          },
        },
      ]
    );

  };


  // ==========================================================
  // PERMISSION LOADING
  // ==========================================================

  if (!permission) {

    return (

      <SafeAreaView style={styles.permissionContainer}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F0FAF7"
        />

        <Text style={styles.permissionText}>
          Memuat kamera...
        </Text>

      </SafeAreaView>

    );

  }


  // ==========================================================
  // PERMISSION NOT GRANTED
  // ==========================================================

  if (!permission.granted) {

    return (

      <SafeAreaView style={styles.permissionContainer}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F0FAF7"
        />

        <View style={styles.permissionContent}>

          <Text style={styles.permissionTitle}>
            Akses Kamera Diperlukan
          </Text>

          <Text style={styles.permissionDescription}>
            Izinkan aplikasi menggunakan kamera
            untuk memindai kode QR.
          </Text>


          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
            activeOpacity={0.85}
          >

            <Text style={styles.permissionButtonText}>
              Izinkan Kamera
            </Text>

          </TouchableOpacity>

        </View>

      </SafeAreaView>

    );

  }


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
        translucent
      />


      {/* ====================================================
          CAMERA
      ==================================================== */}

      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"

        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}

        onBarcodeScanned={
          scanned
            ? undefined
            : handleBarcodeScanned
        }
      />


      {/* ====================================================
          DARK OVERLAY
      ==================================================== */}

      <View
        style={styles.overlay}
        pointerEvents="box-none"
      >


        {/* ==================================================
            TOP HEADER
        ================================================== */}

        <SafeAreaView style={styles.topArea}>

          <View style={styles.header}>


            {/* BACK BUTTON */}

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >

              <Text style={styles.backIcon}>
                ‹
              </Text>

            </TouchableOpacity>


            {/* TITLE */}

            <Text style={styles.headerTitle}>
              Pindai QR
            </Text>


            {/* SPACER */}

            <View style={styles.headerSpacer} />

          </View>

        </SafeAreaView>


        {/* ==================================================
            SCANNER AREA
        ================================================== */}

        <View style={styles.scannerArea}>


          {/* SCANNER FRAME */}

          <View style={styles.scannerFrame}>


            {/* TOP LEFT */}

            <View
              style={[
                styles.corner,
                styles.cornerTopLeft,
              ]}
            />


            {/* TOP RIGHT */}

            <View
              style={[
                styles.corner,
                styles.cornerTopRight,
              ]}
            />


            {/* BOTTOM LEFT */}

            <View
              style={[
                styles.corner,
                styles.cornerBottomLeft,
              ]}
            />


            {/* BOTTOM RIGHT */}

            <View
              style={[
                styles.corner,
                styles.cornerBottomRight,
              ]}
            />


            {/* SCAN LINE */}

            {!scanned && (
              <View style={styles.scanLine} />
            )}

          </View>


          {/* INSTRUCTION */}

          <Text style={styles.scanTitle}>
            Pindai kode QR
          </Text>

          <Text style={styles.scanDescription}>
            Arahkan kamera ke kode QR profil
          </Text>

        </View>


        {/* ==================================================
            BOTTOM
        ================================================== */}

        <View style={styles.bottomArea}>

          <Text style={styles.bottomText}>
            Pastikan kode QR berada di dalam
            area pemindaian
          </Text>

        </View>

      </View>

    </View>

  );

}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // CONTAINER
  // ==========================================================

  container: {
    flex: 1,

    backgroundColor: '#000000',
  },


  // ==========================================================
  // OVERLAY
  // ==========================================================

  overlay: {
    flex: 1,

    backgroundColor: 'transparent',

    justifyContent: 'space-between',
  },


  // ==========================================================
  // TOP AREA
  // ==========================================================

  topArea: {
    width: '100%',
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
    marginTop: 30,
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 45,

    height: 45,

    borderRadius: 23,

    backgroundColor: 'rgba(0,0,0,0.35)',

    alignItems: 'center',

    justifyContent: 'center',
  },


  backIcon: {
    fontSize: 38,

    lineHeight: 40,

    color: '#FFFFFF',

    fontWeight: '300',

    marginTop: -4,
  },


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
    fontSize: 24,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  // ==========================================================
  // HEADER SPACER
  // ==========================================================

  headerSpacer: {
    width: 45,

    height: 45,
  },


  // ==========================================================
  // SCANNER AREA
  // ==========================================================

  scannerArea: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: -30,
  },


  // ==========================================================
  // SCANNER FRAME
  // ==========================================================

  scannerFrame: {
    width: 270,

    height: 270,

    position: 'relative',
  },


  // ==========================================================
  // CORNER
  // ==========================================================

  corner: {
    position: 'absolute',

    width: 42,

    height: 42,

    borderColor: '#FFFFFF',
  },


  // ==========================================================
  // TOP LEFT
  // ==========================================================

  cornerTopLeft: {
    top: 0,

    left: 0,

    borderTopWidth: 4,

    borderLeftWidth: 4,

    borderTopLeftRadius: 10,
  },


  // ==========================================================
  // TOP RIGHT
  // ==========================================================

  cornerTopRight: {
    top: 0,

    right: 0,

    borderTopWidth: 4,

    borderRightWidth: 4,

    borderTopRightRadius: 10,
  },


  // ==========================================================
  // BOTTOM LEFT
  // ==========================================================

  cornerBottomLeft: {
    bottom: 0,

    left: 0,

    borderBottomWidth: 4,

    borderLeftWidth: 4,

    borderBottomLeftRadius: 10,
  },


  // ==========================================================
  // BOTTOM RIGHT
  // ==========================================================

  cornerBottomRight: {
    bottom: 0,

    right: 0,

    borderBottomWidth: 4,

    borderRightWidth: 4,

    borderBottomRightRadius: 10,
  },


  // ==========================================================
  // SCAN LINE
  // ==========================================================

  scanLine: {
    position: 'absolute',

    left: 15,

    right: 15,

    top: '50%',

    height: 2,

    backgroundColor: '#20C997',

    opacity: 0.9,
  },


  // ==========================================================
  // SCAN TITLE
  // ==========================================================

  scanTitle: {
    marginTop: 35,

    fontSize: 24,

    fontWeight: '700',

    color: '#FFFFFF',

    textAlign: 'center',
  },


  // ==========================================================
  // SCAN DESCRIPTION
  // ==========================================================

  scanDescription: {
    marginTop: 8,

    fontSize: 15,

    color: '#FFFFFF',

    opacity: 0.9,

    textAlign: 'center',
  },


  // ==========================================================
  // BOTTOM AREA
  // ==========================================================

  bottomArea: {
    paddingHorizontal: 40,

    paddingBottom: 45,

    alignItems: 'center',
  },


  bottomText: {
    fontSize: 14,

    lineHeight: 20,

    color: '#FFFFFF',

    opacity: 0.85,

    textAlign: 'center',
  },


  // ==========================================================
  // PERMISSION
  // ==========================================================

  permissionContainer: {
    flex: 1,

    backgroundColor: '#F0FAF7',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 30,
  },


  permissionContent: {
    width: '100%',

    alignItems: 'center',
  },


  permissionTitle: {
    fontSize: 22,

    fontWeight: '700',

    color: '#003F34',

    textAlign: 'center',
  },


  permissionDescription: {
    marginTop: 10,

    fontSize: 15,

    lineHeight: 22,

    color: '#74777D',

    textAlign: 'center',
  },


  permissionButton: {
    marginTop: 25,

    width: 220,

    height: 48,

    borderRadius: 25,

    backgroundColor: '#227B68',

    alignItems: 'center',

    justifyContent: 'center',
  },


  permissionButtonText: {
    fontSize: 16,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  permissionText: {
    fontSize: 16,

    color: '#003F34',
  },

});
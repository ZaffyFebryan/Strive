import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  Pressable,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import Svg, {
  Circle,
} from 'react-native-svg';


// ============================================================
// CONSTANT
// ============================================================

// Target durasi tidur = 7 jam
const TARGET_SLEEP_SECONDS =
  7 * 60 * 60;


// ============================================================
// HELPER
// ============================================================


// ------------------------------------------------------------
// Format durasi menjadi HH:MM:SS
// ------------------------------------------------------------

const formatDuration = (totalSeconds) => {

  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds =
    totalSeconds % 60;


  return `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`;

};


// ------------------------------------------------------------
// Hitung kualitas tidur
//
// Target = 7 jam
//
// 00:00:00 = 0%
// 01:00:00 = 14%
// 03:30:00 = 50%
// 06:30:00 = 93%
// 07:00:00 = 100%
//
// Maksimal = 100%
// ------------------------------------------------------------

const calculateSleepQuality = (
  durationSeconds
) => {

  const percentage =
    (durationSeconds /
      TARGET_SLEEP_SECONDS) *
    100;


  return Math.min(
    Math.round(percentage),
    100
  );

};


// ============================================================
// SLEEP MONITORING SCREEN
// ============================================================

export default function SleepMonitoringScreen({
  navigation,
}) {


  // ==========================================================
  // SLEEP DURATION
  // ==========================================================

  // ----------------------------------------------------------
  // DIMULAI DARI 0 DETIK
  //
  // 00:00:00
  // ----------------------------------------------------------

  const [sleepDuration, setSleepDuration] =
    useState(0);


  // ==========================================================
  // STOP MODAL
  // ==========================================================

  const [showStopModal, setShowStopModal] =
    useState(false);


  // ==========================================================
  // MONITORING STATUS
  // ==========================================================

  const [isMonitoring, setIsMonitoring] =
    useState(true);


  // ==========================================================
  // TIMER
  // ==========================================================

  useEffect(() => {

    // --------------------------------------------------------
    // Jika monitoring dihentikan,
    // timer tidak berjalan.
    // --------------------------------------------------------

    if (!isMonitoring) {
      return;
    }


    // --------------------------------------------------------
    // Timer mulai dari 0 dan bertambah setiap 1 detik.
    // --------------------------------------------------------

    const timer = setInterval(() => {

      setSleepDuration(
        (previousDuration) => {

          // --------------------------------------------------
          // Maksimal sampai target 7 jam.
          // --------------------------------------------------

          if (
            previousDuration >=
            TARGET_SLEEP_SECONDS
          ) {

            return TARGET_SLEEP_SECONDS;

          }


          return previousDuration + 1;

        }
      );

    }, 1000);


    // --------------------------------------------------------
    // Bersihkan timer ketika component unmount
    // atau monitoring dihentikan.
    // --------------------------------------------------------

    return () => {
      clearInterval(timer);
    };

  }, [isMonitoring]);


  // ==========================================================
  // SLEEP QUALITY
  // ==========================================================

  const sleepQuality =
    calculateSleepQuality(
      sleepDuration
    );


  // ==========================================================
  // PROGRESS CIRCLE
  // ==========================================================

  const CIRCLE_SIZE = 194;

  const CIRCLE_STROKE = 20;

  const CIRCLE_RADIUS =
    (CIRCLE_SIZE - CIRCLE_STROKE) / 2;

  const CIRCLE_CIRCUMFERENCE =
    2 * Math.PI * CIRCLE_RADIUS;


  // ----------------------------------------------------------
  // Hitung bagian lingkaran yang sudah terisi.
  //
  // 0%   = lingkaran kosong
  // 50%  = setengah lingkaran
  // 100% = penuh
  // ----------------------------------------------------------

  const strokeDashoffset =
    CIRCLE_CIRCUMFERENCE -
    (
      sleepQuality / 100
    ) *
    CIRCLE_CIRCUMFERENCE;


  // ==========================================================
  // STOP BUTTON
  // ==========================================================

  const handleStop = () => {

    setShowStopModal(true);

  };


  // ==========================================================
  // CANCEL STOP
  // ==========================================================

  const handleCancelStop = () => {

    setShowStopModal(false);

  };


  // ==========================================================
  // FINISH MONITORING
  // ==========================================================

  const handleFinishMonitoring = () => {

    // --------------------------------------------------------
    // Hentikan timer
    // --------------------------------------------------------

    setIsMonitoring(false);


    // --------------------------------------------------------
    // Tutup modal
    // --------------------------------------------------------

    setShowStopModal(false);


    // --------------------------------------------------------
    // Data hasil pemantauan
    // --------------------------------------------------------

    const monitoringResult = {

      duration:
        sleepDuration,

      durationText:
        formatDuration(
          sleepDuration
        ),

      quality:
        sleepQuality,

      target:
        TARGET_SLEEP_SECONDS,

      targetText:
        formatDuration(
          TARGET_SLEEP_SECONDS
        ),

    };


    console.log(
      'Hasil Pemantauan Tidur:',
      monitoringResult
    );


    // --------------------------------------------------------
    // Kembali ke halaman sebelumnya.
    // --------------------------------------------------------

    if (
      navigation &&
      typeof navigation.goBack === 'function'
    ) {

      navigation.goBack();

    }

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <SafeAreaView
      style={styles.safe}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View
        style={styles.header}
      >

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {

            if (
              navigation &&
              typeof navigation.goBack === 'function'
            ) {

              navigation.goBack();

            }

          }}
          activeOpacity={0.7}
        >

          <Feather
            name="chevron-left"
            size={31}
            color="#003F34"
          />

        </TouchableOpacity>


        <Text
          style={styles.headerTitle}
        >
          Pemantauan Tidur
        </Text>

      </View>


      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <View
        style={styles.content}
      >


        {/* ==================================================
            1. WEARABLE DEVICE
        ================================================== */}

        <View
          style={styles.wearableCard}
        >

          <Text
            style={styles.wearableTitle}
          >
            Terhubung dengan:
          </Text>


          <View
            style={styles.connectedDevice}
          >

            <View
              style={styles.watchContainer}
            >

              <Image
                source={require(
                  '../../../assets/corospace4.png'
                )}
                style={styles.watchImage}
                resizeMode="contain"
              />

            </View>


            <Text
              style={styles.deviceName}
            >
              Coros Pace 4
            </Text>

          </View>

        </View>


        {/* ==================================================
            2. SLEEP QUALITY
        ================================================== */}

        <View
          style={styles.sleepQualitySection}
        >


          {/* ================================================
              PROGRESS CIRCLE
          ================================================ */}

          <View
            style={styles.progressCircle}
          >

            {/* ------------------------------------------------
                SVG CIRCLE
            ------------------------------------------------ */}

            <Svg
              width={CIRCLE_SIZE}
              height={CIRCLE_SIZE}
              viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
              style={styles.progressSvg}
            >

              {/* ----------------------------------------------
                  BACKGROUND CIRCLE
              ---------------------------------------------- */}

              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={CIRCLE_RADIUS}
                stroke="#DDE7E4"
                strokeWidth={CIRCLE_STROKE}
                fill="none"
              />


              {/* ----------------------------------------------
                  PROGRESS CIRCLE
              ---------------------------------------------- */}

              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={CIRCLE_RADIUS}
                stroke="#214F45"
                strokeWidth={CIRCLE_STROKE}
                fill="none"

                // Ujung progress dibuat membulat
                strokeLinecap="round"

                strokeDasharray={
                  CIRCLE_CIRCUMFERENCE
                }

                strokeDashoffset={
                  strokeDashoffset
                }

                // Mulai dari bagian atas
                rotation="-90"

                origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
              />

            </Svg>


            {/* ------------------------------------------------
                INNER CIRCLE
            ------------------------------------------------ */}

            <View
              style={
                styles.progressCircleInner
              }
            >

              <Text
                style={styles.qualityTitle}
              >
                Kualitas
              </Text>


              <Text
                style={styles.qualityValue}
              >
                {sleepQuality}%
              </Text>

            </View>

          </View>


          {/* ================================================
              DURATION TITLE
          ================================================ */}

          <Text
            style={styles.durationTitle}
          >
            Durasi tidur
          </Text>


          {/* ================================================
              DURATION
          ================================================ */}

          <View
            style={styles.durationContainer}
          >

            <Text
              style={styles.durationText}
            >
              {formatDuration(
                sleepDuration
              )}
            </Text>

          </View>

        </View>


        {/* ==================================================
            3. STOP BUTTON
        ================================================== */}

        <View
          style={styles.stopContainer}
        >

          <TouchableOpacity
            style={styles.stopButton}
            onPress={handleStop}
            activeOpacity={0.8}
          >

            <Text
              style={styles.stopButtonText}
            >
              Stop
            </Text>

          </TouchableOpacity>

        </View>

      </View>


      {/* ====================================================
          STOP CONFIRMATION MODAL
      ==================================================== */}

      <Modal
        visible={showStopModal}
        transparent
        animationType="fade"
        onRequestClose={
          handleCancelStop
        }
      >

        <Pressable
          style={styles.modalOverlay}
          onPress={
            handleCancelStop
          }
        >

          {/* ------------------------------------------------
              POPUP
          ------------------------------------------------ */}

          <Pressable
            style={styles.stopModal}
            onPress={(event) =>
              event.stopPropagation()
            }
          >


            {/* ==============================================
                MOON ICON
            ============================================== */}

            <View
              style={
                styles.moonIconContainer
              }
            >

              <Feather
                name="moon"
                size={51}
                color="#003F34"
              />


              <View
                style={styles.starOne}
              >

                <Feather
                  name="star"
                  size={14}
                  color="#003F34"
                  fill="#003F34"
                />

              </View>


              <View
                style={styles.starTwo}
              >

                <Feather
                  name="star"
                  size={9}
                  color="#003F34"
                  fill="#003F34"
                />

              </View>

            </View>


            {/* ==============================================
                POPUP TITLE
            ============================================== */}

            <Text
              style={styles.modalTitle}
            >
              Akhiri Pemantauan Tidur?
            </Text>


            {/* ==============================================
                POPUP DESCRIPTION
            ============================================== */}

            <Text
              style={styles.modalDescription}
            >
              Seluruh data siklus tidur Anda malam ini
              akan langsung disimpan.
            </Text>


            {/* ==============================================
                MODAL BUTTONS
            ============================================== */}

            <View
              style={styles.modalButtons}
            >


              {/* --------------------------------------------
                  BELUM, KEMBALI
              -------------------------------------------- */}

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.cancelButton,
                ]}
                onPress={
                  handleCancelStop
                }
                activeOpacity={0.8}
              >

                <Text
                  style={[
                    styles.modalButtonText,
                    styles.cancelButtonText,
                  ]}
                >
                  Belum, Kembali
                </Text>

              </TouchableOpacity>


              {/* --------------------------------------------
                  YA, AKHIRI
              -------------------------------------------- */}

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                ]}
                onPress={
                  handleFinishMonitoring
                }
                activeOpacity={0.8}
              >

                <Text
                  style={[
                    styles.modalButtonText,
                    styles.confirmButtonText,
                  ]}
                >
                  Ya, Akhiri
                </Text>

              </TouchableOpacity>

            </View>

          </Pressable>

        </Pressable>

      </Modal>

    </SafeAreaView>

  );

}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // GENERAL
  // ==========================================================

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 80,
    marginTop: 32,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
  },


  backButton: {
    width: 38,
    height: 45,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  headerTitle: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // WEARABLE CARD
  // ==========================================================

  wearableCard: {
    marginTop: 24,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 24,
    borderRadius: 20,
    backgroundColor: '#EAF3F0',
  },


  wearableTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  connectedDevice: {
    height: 65,
    marginTop: 10,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },


  watchContainer: {
    width: 95,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },


  watchImage: {
    width: 80,
    height: 60,
  },


  deviceName: {
    marginLeft: 17,
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // SLEEP QUALITY SECTION
  // ==========================================================

  sleepQualitySection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },


  // ==========================================================
  // PROGRESS CIRCLE
  // ==========================================================

  progressCircle: {
    width: 194,
    height: 194,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 42,
  },


  progressSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },


  progressCircleInner: {
    width: 154,
    height: 154,
    borderRadius: 77,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },


  qualityTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  qualityValue: {
    marginTop: 3,
    fontSize: 27,
    fontWeight: '500',
    color: '#27816F',
  },


  // ==========================================================
  // DURATION
  // ==========================================================

  durationTitle: {
    marginTop: 27,
    fontSize: 20,
    fontWeight: '500',
    color: '#003F34',
  },


  durationContainer: {
    width: 194,
    height: 61,
    marginTop: 8,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#77787D',
    backgroundColor: '#AEAEB5',
    alignItems: 'center',
    justifyContent: 'center',
  },


  durationText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
  },


  // ==========================================================
  // STOP BUTTON
  // ==========================================================

  stopContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },


  stopButton: {
    height: 60,
    borderRadius: 32,
    backgroundColor: '#227B68',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },


  stopButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // MODAL OVERLAY
  // ==========================================================

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },


  // ==========================================================
  // STOP MODAL
  // ==========================================================

  stopModal: {
    width: '90%',
    maxWidth: 376,
    minHeight: 289,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingTop: 27,
    paddingBottom: 36,

    shadowColor: '#000000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.10,

    shadowRadius: 8,

    elevation: 6,
  },


  // ==========================================================
  // MOON ICON
  // ==========================================================

  moonIconContainer: {
    width: 75,
    height: 62,
    alignSelf: 'center',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },


  starOne: {
    position: 'absolute',
    top: 4,
    right: 8,
  },


  starTwo: {
    position: 'absolute',
    top: 23,
    right: 0,
  },


  // ==========================================================
  // MODAL TEXT
  // ==========================================================

  modalTitle: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  modalDescription: {
    marginTop: 3,
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
    color: '#174E43',
  },


  // ==========================================================
  // MODAL BUTTONS
  // ==========================================================

  modalButtons: {
    marginTop: 22,
    flexDirection: 'row',
    gap: 8,
  },


  modalButton: {
    flex: 1,
    height: 50,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // CANCEL
  // ==========================================================

  cancelButton: {
    backgroundColor: '#B0B0B7',
  },


  cancelButtonText: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // CONFIRM
  // ==========================================================

  confirmButton: {
    backgroundColor: '#227B68',
  },


  confirmButtonText: {
    color: '#FFFFFF',
  },


  modalButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },

});
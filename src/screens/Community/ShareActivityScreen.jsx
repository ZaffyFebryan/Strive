import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Image,
} from 'react-native';


// ============================================================
// ASSETS
// ============================================================

const ASSETS = {

  // Ikon aktivitas latihan
  dumbbell:
    require('../../../assets/dumbel.png'),

  // Ikon aktivitas nutrisi
  nutrition:
    require('../../../assets/makan.png'),

// Ikon centang
  check:
require('../../../assets/centangijo.png'),

  // Ikon warning
  warning:
    require('../../../assets/peringatan.png'),

};


// ============================================================
// SHARE ACTIVITY SCREEN
// ============================================================

export default function ShareActivityScreen({
  navigation,
}) {


  // ==========================================================
  // SELECTED ACTIVITY
  // ==========================================================

  /*
    Hanya menyimpan SATU ID aktivitas.

    Sebelumnya menggunakan array.
    Sekarang cukup satu string/null karena
    user hanya boleh memilih satu aktivitas.
  */

  const [selectedActivity, setSelectedActivity] =
    useState(null);


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  const [description, setDescription] =
    useState('');


  // ==========================================================
  // MODAL STATE
  // ==========================================================

  const [showSaveProgressModal, setShowSaveProgressModal] =
    useState(false);


  // ==========================================================
  // NOTIFICATION STATE
  // ==========================================================

  const [notification, setNotification] =
    useState(null);


  // ==========================================================
  // ACTIVITY DATA
  // ==========================================================

  const trainingData = [

    {
      id: 'pull-day',

      type: 'training',

      title: 'Pull Day',

      date: '13 Juni 2026',

      variants: '8/8',

      detail: 'Dumbbel Curl 25kg',

      icon: ASSETS.dumbbell,
    },


    {
      id: 'push-day',

      type: 'training',

      title: 'Push Day',

      date: '12 Juni 2026',

      variants: '8/8',

      detail: 'Bench Press 60kg',

      icon: ASSETS.dumbbell,
    },


    {
      id: 'leg-day',

      type: 'training',

      title: 'Leg Day',

      date: '11 Juni 2026',

      variants: '6/6',

      detail: 'Squat 100kg',

      icon: ASSETS.dumbbell,
    },

  ];


  // ==========================================================
  // NUTRITION DATA
  // ==========================================================

  const nutritionData = [

    {
      id: 'makan-pagi',

      type: 'nutrition',

      title: 'Makan Pagi',

      date: '12 Juni 2026',

      detail:
        'Estimasi kalori / protein: 1200/200',

      menu:
        'Ayam panggang',

      icon: ASSETS.nutrition,
    },


    {
      id: 'makan-siang',

      type: 'nutrition',

      title: 'Makan Siang',

      date: '12 Juni 2026',

      detail:
        'Estimasi kalori / protein: 1200/200',

      menu:
        'Ayam panggang',

      icon: ASSETS.nutrition,
    },


    {
      id: 'makan-malam',

      type: 'nutrition',

      title: 'Makan Malam',

      date: '11 Juni 2026',

      detail:
        'Estimasi kalori / protein: 1000/150',

      menu:
        'Nasi dan ayam',

      icon: ASSETS.nutrition,
    },

  ];


  // ==========================================================
  // HANDLE SELECT ACTIVITY
  // ==========================================================

  const handleSelectActivity = (activity) => {

    /*
      Kalau aktivitas yang sama diklik lagi,
      maka pilihan dibatalkan.
    */

    if (selectedActivity === activity.id) {

      setSelectedActivity(null);

      setDescription('');

      return;

    }


    /*
      Kalau memilih aktivitas lain,
      pilihan sebelumnya langsung diganti.

      Jadi user TIDAK bisa memilih lebih dari satu.
    */

    setSelectedActivity(activity.id);

    setDescription('');

  };


  // ==========================================================
  // HANDLE DESCRIPTION
  // ==========================================================

  const handleDescriptionChange = (text) => {

    setDescription(text);

  };


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    setShowSaveProgressModal(true);

  };


  // ==========================================================
  // HANDLE EXIT WITHOUT SAVE
  // ==========================================================

  const handleExitWithoutSave = () => {

    setShowSaveProgressModal(false);

    navigation.navigate('Community');

  };


  // ==========================================================
  // SHOW NOTIFICATION
  // ==========================================================

  const showNotification = (message) => {

    setNotification(message);

  };


  // ==========================================================
  // AUTO CLOSE NOTIFICATION
  // ==========================================================

  useEffect(() => {

    if (!notification) {
      return;
    }


    const timer = setTimeout(() => {

      setNotification(null);

      navigation.navigate('Community');

    }, 2200);


    return () => clearTimeout(timer);

  }, [notification, navigation]);


  // ==========================================================
  // HANDLE SAVE DRAFT
  // ==========================================================

  const handleSaveDraft = () => {

    setShowSaveProgressModal(false);

    showNotification(
      'Postingan disimpan didraft'
    );

  };


  // ==========================================================
  // HANDLE SHARE
  // ==========================================================

  const handleShare = () => {

    /*
      Tidak bisa lanjut kalau belum memilih
      aktivitas.
    */

    if (!selectedActivity) {

      return;

    }


    showNotification(
      'Aktivitas berhasil dibagikan'
    );

  };


  // ==========================================================
  // CHECK SELECTED
  // ==========================================================

  const isSelected = (activityId) => {

    return selectedActivity === activityId;

  };


  // ==========================================================
  // RENDER ACTIVITY
  // ==========================================================

  const renderActivity = (activity) => {

    const selected =
      isSelected(activity.id);


    return (

      <View
        key={activity.id}
        style={[
          styles.activityWrapper,

          selected &&
            styles.activityWrapperSelected,
        ]}
      >


        {/* ==================================================
            ACTIVITY CARD
        ================================================== */}

        <TouchableOpacity
          style={[
            styles.activityCard,

            selected &&
              styles.activityCardSelected,
          ]}
          onPress={() =>
            handleSelectActivity(activity)
          }
          activeOpacity={0.85}
        >


          {/* =================================================
              ACTIVITY ICON
          ================================================= */}

          <View style={styles.activityIconContainer}>

            <Image
              source={activity.icon}
              style={styles.activityIcon}
              resizeMode="contain"
            />

          </View>


          {/* =================================================
              ACTIVITY CONTENT
          ================================================= */}

          <View style={styles.activityContent}>


            {/* ===============================================
                TITLE + DATE
            =============================================== */}

            <View style={styles.activityTitleRow}>

              <Text style={styles.activityTitle}>
                {activity.title}
              </Text>


              <View style={styles.dot} />


              <Text style={styles.activityDate}>
                {activity.date}
              </Text>

            </View>


            {/* ===============================================
                DETAIL
            =============================================== */}

            {activity.type === 'training' ? (

              <>

                <Text style={styles.activityDetail}>
                  Jumlah variasi : {activity.variants}
                </Text>


                <Text style={styles.activityDetail}>
                  Angkatan terberat : {activity.detail}
                </Text>

              </>

            ) : (

              <>

                <Text style={styles.activityDetail}>
                  Menu : {activity.menu}
                </Text>


                <Text style={styles.activityDetail}>
                  {activity.detail}
                </Text>

              </>

            )}

          </View>


          {/* =================================================
              CHECK
          ================================================= */}

          {selected && (

            <View style={styles.checkCircle}>

              <Image
                source={ASSETS.check}
                style={styles.checkImage}
                resizeMode="contain"
              />

            </View>

          )}

        </TouchableOpacity>


        {/* ==================================================
            DESCRIPTION INPUT
        ================================================== */}

        {selected && (

          <TextInput
            style={styles.descriptionInput}
            placeholder="Tulis keterangan tambahan di sini..."
            placeholderTextColor="#26816F"
            value={description}
            onChangeText={
              handleDescriptionChange
            }
            multiline
            textAlignVertical="top"
          />

        )}

      </View>

    );

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
            BACK
        ================================================= */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >

          <Image
            source={
              require('../../../assets/kembali.png')
            }
            style={styles.backIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>


        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.headerTitle}>
          Bagikan Aktivitas
        </Text>


        {/* =================================================
            DRAFT
        ================================================= */}

        <TouchableOpacity
          style={styles.draftButton}
          activeOpacity={0.7}
        >

          <Text style={styles.draftText}>
            Draft Anda
          </Text>

        </TouchableOpacity>

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >


        {/* ==================================================
            DATA LATIHAN
        ================================================== */}

        <Text style={styles.sectionTitle}>
          Data latihan terbaru
        </Text>


        {trainingData.map(renderActivity)}


        {/* ==================================================
            DATA NUTRISI
        ================================================== */}

        <Text
          style={[
            styles.sectionTitle,
            styles.nutritionSectionTitle,
          ]}
        >
          Data nutrisi terbaru
        </Text>


        {nutritionData.map(renderActivity)}


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

        <View style={styles.bottomSpace} />

      </ScrollView>


      {/* ====================================================
          BOTTOM BUTTON
      ==================================================== */}

      <View style={styles.bottomContainer}>

        <TouchableOpacity
          style={[
            styles.continueButton,

            selectedActivity &&
              styles.continueButtonActive,
          ]}
          onPress={handleShare}
          disabled={!selectedActivity}
          activeOpacity={0.85}
        >

          <Text style={styles.continueText}>
            Lanjut
          </Text>

        </TouchableOpacity>

      </View>


      {/* ====================================================
          MODAL - SIMPAN PROGRES
      ==================================================== */}

      <Modal
        visible={showSaveProgressModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowSaveProgressModal(false)
        }
      >

        <View style={styles.modalOverlay}>

          <View style={styles.saveProgressModal}>


            {/* =================================================
                WARNING IMAGE
            ================================================= */}

            <View style={styles.warningContainer}>

              <Image
                source={ASSETS.warning}
                style={styles.warningImage}
                resizeMode="contain"
              />

            </View>


            {/* =================================================
                TITLE
            ================================================= */}

            <Text style={styles.modalTitle}>
              Simpan Progres Anda?
            </Text>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <Text style={styles.modalDescription}>
              Postingan belum diunggah. Simpan
              sebagai draft agar bisa melanjutkannya
              nanti tanpa harus mengulang.
            </Text>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <View style={styles.modalButtonRow}>


              {/* ===============================================
                  TETAP KELUAR
              =============================================== */}

              <TouchableOpacity
                style={styles.exitButton}
                onPress={
                  handleExitWithoutSave
                }
                activeOpacity={0.85}
              >

                <Text style={styles.exitButtonText}>
                  Tetap Keluar
                </Text>

              </TouchableOpacity>


              {/* ===============================================
                  SIMPAN DRAFT
              =============================================== */}

              <TouchableOpacity
                style={styles.saveDraftButton}
                onPress={handleSaveDraft}
                activeOpacity={0.85}
              >

                <Text style={styles.saveDraftButtonText}>
                  Simpan Draft
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>


      {/* ====================================================
          NOTIFICATION
      ==================================================== */}

      {notification && (

        <View
          style={styles.notificationOverlay}
          pointerEvents="none"
        >

          <View style={styles.notificationBox}>


            {/* ===============================================
                CHECK IMAGE
            =============================================== */}

            <View style={styles.notificationIcon}>

              <Image
                source={ASSETS.check}
                style={styles.notificationCheckImage}
                resizeMode="contain"
              />

            </View>


            {/* ===============================================
                MESSAGE
            =============================================== */}

            <Text style={styles.notificationText}>
              {notification}
            </Text>

          </View>

        </View>

      )}

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
    height: 88,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
    backgroundColor: '#FFFFFF',
    marginTop: 32,
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 38,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  // ==========================================================
  // BACK ICON
  // ==========================================================

  backIcon: {
    width: 30,
    height: 30,
  },


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#003F34',
    marginLeft: 2,
    flex: 1,
  },


  // ==========================================================
  // DRAFT BUTTON
  // ==========================================================

  draftButton: {
    paddingHorizontal: 4,
    justifyContent: 'center',
  },


  draftText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003F34',
    textDecorationLine: 'underline',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 25,
    paddingBottom: 20,
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
    marginBottom: 10,
  },


  nutritionSectionTitle: {
    marginTop: 17,
  },


  // ==========================================================
  // ACTIVITY WRAPPER
  // ==========================================================

  activityWrapper: {
    width: '100%',
    marginBottom: 8,
  },


  activityWrapperSelected: {
    borderRadius: 11,
    overflow: 'hidden',
  },


  // ==========================================================
  // ACTIVITY CARD
  // ==========================================================

  activityCard: {
    minHeight: 108,
    width: '100%',
    borderWidth: 1,
    borderColor: '#8E9194',
    borderRadius: 11,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // SELECTED CARD
  // ==========================================================

  activityCardSelected: {
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },


  // ==========================================================
  // ACTIVITY ICON CONTAINER
  // ==========================================================

  activityIconContainer: {
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },


  // ==========================================================
  // ACTIVITY ICON
  // ==========================================================

  activityIcon: {
    width: 55,
    height: 55,
  },


  // ==========================================================
  // ACTIVITY CONTENT
  // ==========================================================

  activityContent: {
    flex: 1,
    justifyContent: 'center',
  },


  // ==========================================================
  // TITLE ROW
  // ==========================================================

  activityTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  activityTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // DOT
  // ==========================================================

  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#003F34',
    marginHorizontal: 11,
  },


  // ==========================================================
  // DATE
  // ==========================================================

  activityDate: {
    fontSize: 14,
    color: '#003F34',
    flexShrink: 1,
  },


  // ==========================================================
  // DETAIL
  // ==========================================================

  activityDetail: {
    fontSize: 14,
    lineHeight: 20,
    color: '#06483E',
  },


  // ==========================================================
  // CHECK IMAGE
  // ==========================================================

  checkImage: {
    width: 17,
    height: 17,
  },


  // ==========================================================
  // DESCRIPTION INPUT
  // ==========================================================

  descriptionInput: {
    width: '100%',
    minHeight: 64,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#69A99A',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    paddingHorizontal: 17,
    paddingVertical: 12,
    fontSize: 17,
    lineHeight: 22,
    color: '#227B68',
    backgroundColor: '#F0F9F6',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 100,
  },


  // ==========================================================
  // BOTTOM CONTAINER
  // ==========================================================

  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 46,
  },


  // ==========================================================
  // CONTINUE BUTTON
  // ==========================================================

  continueButton: {
    width: '100%',
    height: 60,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#929399',
  },


  continueButtonActive: {
    backgroundColor: '#227B68',
  },


  // ==========================================================
  // CONTINUE TEXT
  // ==========================================================

  continueText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  // ==========================================================
  // MODAL OVERLAY
  // ==========================================================

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },


  // ==========================================================
  // SAVE PROGRESS MODAL
  // ==========================================================

  saveProgressModal: {
    width: '100%',
    maxWidth: 320,
    paddingHorizontal: 15,
    paddingTop: 26,
    paddingBottom: 16,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },


  // ==========================================================
  // WARNING
  // ==========================================================

  warningContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },


  // ==========================================================
  // WARNING IMAGE
  // ==========================================================

  warningImage: {
    width: 46,
    height: 46,
  },


  // ==========================================================
  // MODAL TITLE
  // ==========================================================

  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#003F34',
    textAlign: 'center',
    marginBottom: 4,
  },


  // ==========================================================
  // MODAL DESCRIPTION
  // ==========================================================

  modalDescription: {
    fontSize: 15,
    lineHeight: 21,
    color: '#31534D',
    textAlign: 'center',
    paddingHorizontal: 5,
    marginBottom: 20,
  },


  // ==========================================================
  // MODAL BUTTON ROW
  // ==========================================================

  modalButtonRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },


  // ==========================================================
  // EXIT BUTTON
  // ==========================================================

  exitButton: {
    flex: 1,
    height: 44,
    borderRadius: 23,
    backgroundColor: '#B0B1B6',
    alignItems: 'center',
    justifyContent: 'center',
  },


  exitButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // SAVE DRAFT BUTTON
  // ==========================================================

  saveDraftButton: {
    flex: 1,
    height: 44,
    borderRadius: 23,
    backgroundColor: '#F5A000',
    alignItems: 'center',
    justifyContent: 'center',
  },


  saveDraftButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // NOTIFICATION OVERLAY
  // ==========================================================

  notificationOverlay: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
    elevation: 20,
  },


  // ==========================================================
  // NOTIFICATION BOX
  // ==========================================================

  notificationBox: {
    width: '88%',
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#8FC2B7',
    borderRadius: 10,
    backgroundColor: '#EAF3F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },


  // ==========================================================
  // NOTIFICATION ICON
  // ==========================================================

  notificationIcon: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // NOTIFICATION CHECK IMAGE
  // ==========================================================

  notificationCheckImage: {
    width: 24,
    height: 24,
  },


  // ==========================================================
  // NOTIFICATION TEXT
  // ==========================================================

  notificationText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#31534D',
  },

});
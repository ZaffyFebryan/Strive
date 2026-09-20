import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';


// ============================================================
// CONNECTED DEVICE SCREEN
// ============================================================

export default function ConnectedDeviceScreen({ navigation }) {


  // ==========================================================
  // DISCONNECT POPUP
  // ==========================================================

  const [disconnectVisible, setDisconnectVisible] =
    useState(false);


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Back
    back:
      require('../../../assets/kembali.png'),

    // Connected / check
    check:
      require('../../../assets/terhubung.png'),

    // Disconnect
    disconnect:
      require('../../../assets/putuskan.png'),

    // COROS logo
    coros:
      require('../../../assets/coros.png'),

    // COROS watch
    corosWatch:
      require('../../../assets/corospace4.png'),

  };


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    // Langsung kembali ke halaman Profil
    navigation.navigate('Profile');

  };


  // ==========================================================
  // HANDLE DISCONNECT
  // ==========================================================

  const handleDisconnect = () => {

    setDisconnectVisible(true);

  };


  // ==========================================================
  // HANDLE CANCEL DISCONNECT
  // ==========================================================

  const handleCancelDisconnect = () => {

    setDisconnectVisible(false);

  };


  // ==========================================================
  // HANDLE CONFIRM DISCONNECT
  // ==========================================================

  const handleConfirmDisconnect = () => {

    setDisconnectVisible(false);

    // Setelah perangkat diputus,
    // kembali ke halaman Wearable Device.
    navigation.navigate('WearableDevice');

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
          Coros
        </Text>


        {/* =================================================
            HEADER SPACER
        ================================================= */}

        <View style={styles.headerSpacer} />

      </View>


      {/* ====================================================
          SCROLL CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >


        {/* ==================================================
            CONNECTION STATUS
        ================================================== */}

        <View style={styles.statusSection}>


          {/* =================================================
              CHECK CIRCLE
          ================================================= */}

          <View style={styles.checkCircle}>

            <Image
              source={ICONS.check}
              style={styles.checkIcon}
              resizeMode="contain"
            />

          </View>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.connectedTitle}>
            Perangkat terhubung
          </Text>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Text style={styles.connectedDescription}>
            Data akan sinkron secara otomatis.
          </Text>

        </View>


        {/* ==================================================
            DEVICE CARD
        ================================================== */}

        <View style={styles.deviceCard}>


          {/* =================================================
              WATCH IMAGE
          ================================================= */}

          <Image
            source={ICONS.corosWatch}
            style={styles.watchImage}
            resizeMode="contain"
          />


          {/* =================================================
              DEVICE INFORMATION
          ================================================= */}

          <View style={styles.deviceInfo}>

            <Text style={styles.deviceName}>
              Coros Pace 4
            </Text>


            {/* ===============================================
                ACTIVE BADGE
            =============================================== */}

            <View style={styles.activeBadge}>

              <Text style={styles.activeText}>
                Aktif
              </Text>

            </View>

          </View>

        </View>


        {/* ==================================================
            SYNC HISTORY
        ================================================== */}

        <View style={styles.historyCard}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.historyTitle}>
            Riwayat sinkronisasi
          </Text>


          {/* =================================================
              HISTORY ITEM 1
          ================================================= */}

          <Text style={styles.historyText}>
            1 jam yang lalu - Sukses
          </Text>


          {/* =================================================
              HISTORY ITEM 2
          ================================================= */}

          <Text style={styles.historyText}>
            4 jam yang lalu - Gagal
          </Text>

        </View>


        {/* ==================================================
            DISCONNECT BUTTON
        ================================================== */}

        <TouchableOpacity
          style={styles.disconnectButton}
          onPress={handleDisconnect}
          activeOpacity={0.85}
        >

          <Text style={styles.disconnectButtonText}>
            Putuskan
          </Text>

        </TouchableOpacity>


      </ScrollView>


      {/* ====================================================
          DISCONNECT MODAL
      ==================================================== */}

      <Modal
        visible={disconnectVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDisconnect}
      >

        <View style={styles.modalOverlay}>


          {/* ==================================================
              MODAL CARD
          ================================================== */}

          <View style={styles.disconnectModal}>


            {/* =================================================
                DISCONNECT ICON
            ================================================= */}

            <View style={styles.modalIconContainer}>

              <Image
                source={ICONS.disconnect}
                style={styles.modalDisconnectIcon}
                resizeMode="contain"
              />

            </View>


            {/* =================================================
                MODAL TITLE
            ================================================= */}

            <Text style={styles.modalTitle}>
              Putuskan perangkat
            </Text>


            {/* =================================================
                MODAL DESCRIPTION
            ================================================= */}

            <Text style={styles.modalDescription}>
              Anda akan memutuskan koneksi jam
            </Text>

            <Text style={styles.modalDescription}>
              tangan ini dari aplikasi
            </Text>


            {/* =================================================
                MODAL BUTTONS
            ================================================= */}

            <View style={styles.modalButtons}>


              {/* =============================================
                  KEEP CONNECTED
              ============================================= */}

              <TouchableOpacity
                style={styles.keepConnectedButton}
                onPress={handleCancelDisconnect}
                activeOpacity={0.8}
              >

                <Text style={styles.keepConnectedText}>
                  Tetap Terhubung
                </Text>

              </TouchableOpacity>


              {/* =============================================
                  CONFIRM DISCONNECT
              ============================================= */}

              <TouchableOpacity
                style={styles.confirmDisconnectButton}
                onPress={handleConfirmDisconnect}
                activeOpacity={0.8}
              >

                <Text style={styles.confirmDisconnectText}>
                  Ya, Putuskan!
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

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
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // SCROLL CONTENT
  // ==========================================================

  scrollContent: {
    paddingHorizontal: 20,

    paddingBottom: 35,
  },


  // ==========================================================
  // STATUS SECTION
  // ==========================================================

  statusSection: {
    alignItems: 'center',

    marginTop: 41,
  },


  // ==========================================================
  // CHECK CIRCLE
  // ==========================================================

  checkCircle: {
    width: 100,

    height: 100,

    borderRadius: 50,

    backgroundColor: '#A9CCC5',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // CHECK ICON
  // ==========================================================

  checkIcon: {
    width: 57,

    height: 57,
  },


  // ==========================================================
  // CONNECTED TITLE
  // ==========================================================

  connectedTitle: {
    marginTop: 21,

    fontSize: 25,

    fontWeight: '700',

    color: '#003F34',

    textAlign: 'center',
  },


  // ==========================================================
  // CONNECTED DESCRIPTION
  // ==========================================================

  connectedDescription: {
    marginTop: 3,

    fontSize: 19,

    fontWeight: '400',

    color: '#16483E',

    textAlign: 'center',
  },


  // ==========================================================
  // DEVICE CARD
  // ==========================================================

  deviceCard: {
    width: '100%',

    height: 129,

    marginTop: 26,

    borderRadius: 12,

    backgroundColor: '#EAF3F0',

    flexDirection: 'row',

    alignItems: 'center',

    overflow: 'hidden',
  },


  // ==========================================================
  // WATCH IMAGE
  // ==========================================================

  watchImage: {
    width: 166,

    height: 116,

    marginLeft: 0,
  },


  // ==========================================================
  // DEVICE INFO
  // ==========================================================

  deviceInfo: {
    flex: 1,

    marginLeft: 10,

    justifyContent: 'center',
  },


  // ==========================================================
  // DEVICE NAME
  // ==========================================================

  deviceName: {
    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // ACTIVE BADGE
  // ==========================================================

  activeBadge: {
    alignSelf: 'flex-start',

    minWidth: 84,

    height: 35,

    marginTop: 8,

    paddingHorizontal: 20,

    borderRadius: 20,

    backgroundColor: '#227B68',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // ACTIVE TEXT
  // ==========================================================

  activeText: {
    fontSize: 16,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  // ==========================================================
  // HISTORY CARD
  // ==========================================================

  historyCard: {
    width: '100%',

    minHeight: 144,

    marginTop: 16,

    paddingHorizontal: 20,

    paddingVertical: 22,

    borderRadius: 12,

    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // HISTORY TITLE
  // ==========================================================

  historyTitle: {
    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',

    marginBottom: 19,
  },


  // ==========================================================
  // HISTORY TEXT
  // ==========================================================

  historyText: {
    fontSize: 18,

    fontWeight: '400',

    color: '#16483E',

    marginBottom: 8,
  },


  // ==========================================================
  // DISCONNECT BUTTON
  // ==========================================================

  disconnectButton: {
    width: '100%',

    height: 60,

    marginTop: 166,

    borderRadius: 32,

    backgroundColor: '#F04444',

    alignItems: 'center',

    justifyContent: 'center',
    marginTop: 60,
  },


  // ==========================================================
  // DISCONNECT BUTTON TEXT
  // ==========================================================

  disconnectButtonText: {
    fontSize: 19,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  // ==========================================================
  // MODAL OVERLAY
  // ==========================================================

  modalOverlay: {
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.08)',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 0,
  },


  // ==========================================================
  // DISCONNECT MODAL
  // ==========================================================

  disconnectModal: {
    width: '94%',

    minHeight: 290,

    paddingHorizontal: 18,

    paddingTop: 38,

    paddingBottom: 38,

    borderRadius: 27,

    borderWidth: 1,

    borderColor: '#D8D8D8',

    backgroundColor: '#FFFFFF',

    alignItems: 'center',

    elevation: 8,

    shadowColor: '#000000',

    shadowOffset: {
      width: 0,

      height: 3,
    },

    shadowOpacity: 0.12,

    shadowRadius: 8,
  },


  // ==========================================================
  // MODAL ICON CONTAINER
  // ==========================================================

  modalIconContainer: {
    width: 55,

    height: 55,

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // MODAL DISCONNECT ICON
  // ==========================================================

  modalDisconnectIcon: {
    width: 53,

    height: 53,
  },


  // ==========================================================
  // MODAL TITLE
  // ==========================================================

  modalTitle: {
    marginTop: 16,

    fontSize: 19,

    fontWeight: '700',

    color: '#003F34',

    textAlign: 'center',
  },


  // ==========================================================
  // MODAL DESCRIPTION
  // ==========================================================

  modalDescription: {
    marginTop: 2,

    fontSize: 17,

    fontWeight: '400',

    color: '#16483E',

    textAlign: 'center',

    lineHeight: 24,
  },


  // ==========================================================
  // MODAL BUTTONS
  // ==========================================================

  modalButtons: {
    width: '100%',

    flexDirection: 'row',

    gap: 9,

    marginTop: 24,
  },


  // ==========================================================
  // KEEP CONNECTED BUTTON
  // ==========================================================

  keepConnectedButton: {
    flex: 1,

    height: 50,

    borderRadius: 27,

    backgroundColor: '#B7B7BB',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // KEEP CONNECTED TEXT
  // ==========================================================

  keepConnectedText: {
    fontSize: 15,

    fontWeight: '700',

    color: '#FFFFFF',

    textAlign: 'center',
  },


  // ==========================================================
  // CONFIRM DISCONNECT BUTTON
  // ==========================================================

  confirmDisconnectButton: {
    flex: 1,

    height: 50,

    borderRadius: 27,

    backgroundColor: '#F04444',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // CONFIRM DISCONNECT TEXT
  // ==========================================================

  confirmDisconnectText: {
    fontSize: 15,

    fontWeight: '700',

    color: '#FFFFFF',

    textAlign: 'center',
  },

});
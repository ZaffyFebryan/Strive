import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';


// ============================================================
// SETTINGS SCREEN
// ============================================================

export default function SettingsScreen({ navigation }) {


  // ==========================================================
  // LOGOUT POPUP
  // ==========================================================

  const [logoutVisible, setLogoutVisible] =
    useState(false);


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Back
    back:
      require('../../../assets/kembali.png'),

    // General
    notification:
      require('../../../assets/notifikasi.png'),

    appearance:
      require('../../../assets/tampilan.png'),

    language:
      require('../../../assets/bahasa.png'),

    // Security
    biometric:
      require('../../../assets/kunci.png'),

    password:
      require('../../../assets/sandi.png'),

    connectedDevice:
      require('../../../assets/perangkat.png'),

    // Legal & Help
    privacy:
      require('../../../assets/kebijakan.png'),

    helpCenter:
      require('../../../assets/bantuan.png'),

    faq:
      require('../../../assets/faq.png'),

    contact:
      require('../../../assets/hubungi.png'),

    // Logout
    logout:
      require('../../../assets/keluar.png'),

    // Right arrow
    arrowRight:
      require('../../../assets/panahkananabu.png'),

  };


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // HANDLE LOGOUT
  // ==========================================================

  const handleLogout = () => {

    setLogoutVisible(true);

  };


  // ==========================================================
  // HANDLE CANCEL LOGOUT
  // ==========================================================

  const handleCancelLogout = () => {

    setLogoutVisible(false);

  };


  // ==========================================================
  // HANDLE CONFIRM LOGOUT
  // ==========================================================

  const handleConfirmLogout = () => {

    setLogoutVisible(false);

    navigation.navigate('Login');

  };


  // ==========================================================
  // HANDLE SETTINGS ITEM
  // ==========================================================

  const handleSettingItem = (item) => {

    // Untuk sementara item belum diarahkan
    // ke halaman masing-masing.

    console.log(item);

  };


  // ==========================================================
  // RENDER SETTING ITEM
  // ==========================================================

  const renderSettingItem = (
    icon,
    title,
    itemKey
  ) => {

    return (

      <TouchableOpacity
        key={itemKey}
        style={styles.settingItem}
        activeOpacity={0.7}
        onPress={() =>
          handleSettingItem(itemKey)
        }
      >

        {/* ================================================
            ICON
        ================================================= */}

        <View style={styles.settingIconContainer}>

          <Image
            source={icon}
            style={styles.settingIcon}
            resizeMode="contain"
          />

        </View>


        {/* ================================================
            TITLE
        ================================================= */}

        <Text
          style={styles.settingTitle}
          numberOfLines={1}
        >
          {title}
        </Text>


        {/* ================================================
            ARROW
        ================================================= */}

        <Image
          source={ICONS.arrowRight}
          style={styles.arrowIcon}
          resizeMode="contain"
        />

      </TouchableOpacity>

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
          Pengaturan
        </Text>


        {/* =================================================
            HEADER SPACER
        ================================================= */}

        <View style={styles.headerSpacer} />

      </View>


      {/* ====================================================
          SCROLLABLE CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >


        {/* ==================================================
            UMUM
        ================================================== */}

        <Text style={styles.sectionTitle}>
          Umum
        </Text>


        <View style={styles.settingCard}>

          {renderSettingItem(
            ICONS.notification,
            'Notifikasi',
            'notification'
          )}

          {renderSettingItem(
            ICONS.appearance,
            'Tampilan',
            'appearance'
          )}

          {renderSettingItem(
            ICONS.language,
            'Bahasa',
            'language'
          )}

        </View>


        {/* ==================================================
            KEAMANAN
        ================================================== */}

        <Text
          style={[
            styles.sectionTitle,
            styles.securitySectionTitle,
          ]}
        >
          Keamanan
        </Text>


        <View style={styles.settingCard}>

          {renderSettingItem(
            ICONS.biometric,
            'Kunci Biometrik',
            'biometric'
          )}

          {renderSettingItem(
            ICONS.password,
            'Kata Sandi',
            'password'
          )}

          {renderSettingItem(
            ICONS.connectedDevice,
            'Perangkat Terhubung',
            'connectedDevice'
          )}

        </View>


        {/* ==================================================
            HUKUM DAN BANTUAN
        ================================================== */}

        <Text
          style={[
            styles.sectionTitle,
            styles.helpSectionTitle,
          ]}
        >
          Hukum dan Bantuan
        </Text>


        <View style={styles.settingCard}>

          {renderSettingItem(
            ICONS.privacy,
            'Kebijakan Privasi',
            'privacy'
          )}

          {renderSettingItem(
            ICONS.helpCenter,
            'Pusat Bantuan',
            'helpCenter'
          )}

          {renderSettingItem(
            ICONS.faq,
            'FAQ',
            'faq'
          )}

          {renderSettingItem(
            ICONS.contact,
            'Hubungi Kami',
            'contact'
          )}

        </View>


        {/* ==================================================
            LOGOUT
        ================================================== */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >

          <Image
            source={ICONS.logout}
            style={styles.logoutIcon}
            resizeMode="contain"
          />

          <Text style={styles.logoutText}>
            Keluar
          </Text>

        </TouchableOpacity>


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

        <View style={styles.bottomSpace} />

      </ScrollView>


      {/* ====================================================
          LOGOUT MODAL
      ==================================================== */}

      <Modal
        visible={logoutVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelLogout}
      >

        <View style={styles.modalOverlay}>


          {/* ==================================================
              MODAL CARD
          ================================================== */}

          <View style={styles.logoutModal}>


            {/* =================================================
                LOGOUT ICON
            ================================================= */}

            <View style={styles.modalIconContainer}>

              <Image
                source={ICONS.logout}
                style={styles.modalLogoutIcon}
                resizeMode="contain"
              />

            </View>


            {/* =================================================
                TITLE
            ================================================= */}

            <Text style={styles.modalTitle}>
              Keluar Akun
            </Text>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <Text style={styles.modalDescription}>
              Anda akan keluar dari akun Anda saat ini
            </Text>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <View style={styles.modalButtons}>


              {/* =============================================
                  CANCEL
              ============================================= */}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelLogout}
                activeOpacity={0.8}
              >

                <Text style={styles.cancelButtonText}>
                  Tidak, Tetap Masuk
                </Text>

              </TouchableOpacity>


              {/* =============================================
                  CONFIRM
              ============================================= */}

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmLogout}
                activeOpacity={0.8}
              >

                <Text style={styles.confirmButtonText}>
                  Ya, Keluar!
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

    backgroundColor: '#F8F9F9',
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

    backgroundColor: '#F8F9F9',
  },


  // ==========================================================
  // SCROLL CONTENT
  // ==========================================================

  scrollContent: {
    paddingHorizontal: 20,

    paddingTop: 26,

    paddingBottom: 35,
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    marginLeft: 3,

    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // SECTION SPACING
  // ==========================================================

  securitySectionTitle: {
    marginTop: 20,
  },


  helpSectionTitle: {
    marginTop: 20,
  },


  // ==========================================================
  // SETTING CARD
  // ==========================================================

  settingCard: {
    marginTop: 10,

    borderRadius: 13,

    backgroundColor: '#FFFFFF',

    paddingVertical: 10,

    overflow: 'hidden',
  },


  // ==========================================================
  // SETTING ITEM
  // ==========================================================

  settingItem: {
    minHeight: 56,

    paddingHorizontal: 20,

    flexDirection: 'row',

    alignItems: 'center',
  },


  // ==========================================================
  // SETTING ICON CONTAINER
  // ==========================================================

  settingIconContainer: {
    width: 40,

    height: 40,

    borderRadius: 12,

    backgroundColor: '#EAF3F0',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // SETTING ICON
  // ==========================================================

  settingIcon: {
    width: 25,

    height: 25,
  },


  // ==========================================================
  // SETTING TITLE
  // ==========================================================

  settingTitle: {
    flex: 1,

    marginLeft: 17,

    fontSize: 19,

    fontWeight: '400',

    color: '#003F34',
  },


  // ==========================================================
  // RIGHT ARROW
  // ==========================================================

  arrowIcon: {
    width: 20,

    height: 20,
  },


  // ==========================================================
  // LOGOUT BUTTON
  // ==========================================================

  logoutButton: {
    alignSelf: 'center',

    marginTop: 19,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingVertical: 8,

    paddingHorizontal: 20,
  },


  // ==========================================================
  // LOGOUT ICON
  // ==========================================================

  logoutIcon: {
    width: 25,

    height: 25,
  },


  // ==========================================================
  // LOGOUT TEXT
  // ==========================================================

  logoutText: {
    marginLeft: 12,

    fontSize: 19,

    fontWeight: '600',

    color: '#F04444',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 30,
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
  // LOGOUT MODAL
  // ==========================================================

  logoutModal: {
    width: '92%',

    minHeight: 290,

    paddingHorizontal: 18,

    paddingTop: 45,

    paddingBottom: 47,

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
  // MODAL ICON
  // ==========================================================

  modalIconContainer: {
    width: 55,

    height: 55,

    alignItems: 'center',

    justifyContent: 'center',
  },


  modalLogoutIcon: {
    width: 53,

    height: 53,
  },


  // ==========================================================
  // MODAL TITLE
  // ==========================================================

  modalTitle: {
    marginTop: 18,

    fontSize: 19,

    fontWeight: '700',

    color: '#003F34',

    textAlign: 'center',
  },


  // ==========================================================
  // MODAL DESCRIPTION
  // ==========================================================

  modalDescription: {
    marginTop: 4,

    fontSize: 17,

    fontWeight: '400',

    color: '#16483E',

    textAlign: 'center',
  },


  // ==========================================================
  // MODAL BUTTONS
  // ==========================================================

  modalButtons: {
    width: '100%',

    flexDirection: 'row',

    gap: 9,

    marginTop: 25,
  },


  // ==========================================================
  // CANCEL BUTTON
  // ==========================================================

  cancelButton: {
    flex: 1,

    height: 50,

    borderRadius: 27,

    backgroundColor: '#B7B7BB',

    alignItems: 'center',

    justifyContent: 'center',
  },


  cancelButtonText: {
    fontSize: 14,

    fontWeight: '700',

    color: '#FFFFFF',

    textAlign: 'center',
  },


  // ==========================================================
  // CONFIRM BUTTON
  // ==========================================================

  confirmButton: {
    flex: 1,

    height: 50,

    borderRadius: 27,

    backgroundColor: '#F04444',

    alignItems: 'center',

    justifyContent: 'center',
  },


  confirmButtonText: {
    fontSize: 14,

    fontWeight: '700',

    color: '#FFFFFF',

    textAlign: 'center',
  },

});
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


// ============================================================
// WEARABLE DEVICE SCREEN
// ============================================================

export default function WearableDeviceScreen({ navigation }) {


  // ==========================================================
  // ICON / LOGO ASSETS
  // ==========================================================

  const ICONS = {

    // ========================================================
    // BACK
    // ========================================================

    back:
      require('../../../assets/kembali.png'),


    // ========================================================
    // WEARABLE LOGOS
    // ========================================================

    appleWatch:
      require('../../../assets/applewatch.png'),

    garmin:
      require('../../../assets/garmin.png'),

    coros:
      require('../../../assets/coros.png'),

    samsung:
      require('../../../assets/samsungwatch.png'),

    huawei:
      require('../../../assets/huawei.png'),

    amazfit:
      require('../../../assets/amazfit.png'),

    oura:
      require('../../../assets/oura.png'),


    // ========================================================
    // PLUS
    // ========================================================

    plus:
      require('../../../assets/tambah.png'),

  };


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // HANDLE DEVICE
  // ==========================================================

  const handleDevicePress = (device) => {

    console.log(
      `Pilih perangkat: ${device}`
    );

    // Untuk sementara belum diarahkan
    // ke proses koneksi perangkat.

  };


  // ==========================================================
  // HANDLE OTHER DEVICE
  // ==========================================================

  const handleOtherDevice = () => {

    console.log('Pilih perangkat lainnya');

    // Untuk sementara belum diarahkan.

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
          Wearable Device
        </Text>


        {/* =================================================
            HEADER SPACER
        ================================================= */}

        <View style={styles.headerSpacer} />

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >


        {/* ==================================================
            DESCRIPTION SECTION
        ================================================== */}

        <View style={styles.descriptionSection}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.descriptionTitle}>
            Hubungkan perangkat dan aplikasi
          </Text>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Text style={styles.descriptionText}>
            Gunakan data dari jam tangan pintar Anda untuk
            mengoptimalkan perhitungan latihan dengan
            lebih tepat. Proses penyambungan hanya
            membutuhkan waktu satu menit dan
            data Anda tetap aman.
          </Text>

        </View>


        {/* ==================================================
            DEVICE GRID
        ================================================== */}

        <View style={styles.deviceGrid}>


          {/* =================================================
              APPLE WATCH
          ================================================= */}

          <TouchableOpacity
            style={styles.deviceButton}
            activeOpacity={0.75}
            onPress={() =>
              handleDevicePress('Apple Watch')
            }
          >

            <Image
              source={ICONS.appleWatch}
              style={styles.appleWatchLogo}
              resizeMode="contain"
            />

          </TouchableOpacity>


          {/* =================================================
              GARMIN
          ================================================= */}

          <TouchableOpacity
            style={styles.deviceButton}
            activeOpacity={0.75}
            onPress={() =>
              handleDevicePress('Garmin')
            }
          >

            <Image
              source={ICONS.garmin}
              style={styles.garminLogo}
              resizeMode="contain"
            />

          </TouchableOpacity>


          {/* =================================================
              COROS
          ================================================= */}

          <TouchableOpacity
            style={styles.deviceButton}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate('ConnectCoros')
            }
          >

            <Image
              source={ICONS.coros}
              style={styles.corosLogo}
              resizeMode="contain"
            />

          </TouchableOpacity>


          {/* =================================================
              SAMSUNG
          ================================================= */}

          <TouchableOpacity
            style={styles.deviceButton}
            activeOpacity={0.75}
            onPress={() =>
              handleDevicePress('Samsung Galaxy Watch')
            }
          >

            <Image
              source={ICONS.samsung}
              style={styles.samsungLogo}
              resizeMode="contain"
            />

          </TouchableOpacity>


          {/* =================================================
              HUAWEI
          ================================================= */}

          <TouchableOpacity
            style={styles.deviceButton}
            activeOpacity={0.75}
            onPress={() =>
              handleDevicePress('Huawei')
            }
          >

            <Image
              source={ICONS.huawei}
              style={styles.huaweiLogo}
              resizeMode="contain"
            />

          </TouchableOpacity>


          {/* =================================================
              AMAZFIT
          ================================================= */}

          <TouchableOpacity
            style={styles.deviceButton}
            activeOpacity={0.75}
            onPress={() =>
              handleDevicePress('Amazfit')
            }
          >

            <Image
              source={ICONS.amazfit}
              style={styles.amazfitLogo}
              resizeMode="contain"
            />

          </TouchableOpacity>


          {/* =================================================
              OURA
          ================================================= */}

          <TouchableOpacity
            style={styles.deviceButton}
            activeOpacity={0.75}
            onPress={() =>
              handleDevicePress('Oura')
            }
          >

            <Image
              source={ICONS.oura}
              style={styles.ouraLogo}
              resizeMode="contain"
            />

          </TouchableOpacity>


          {/* =================================================
              LAINNYA
          ================================================= */}

          <TouchableOpacity
            style={[
              styles.deviceButton,
              styles.otherDeviceButton,
            ]}
            activeOpacity={0.75}
            onPress={handleOtherDevice}
          >


            {/* =================================================
                PLUS
            ================================================= */}

            <Image
              source={ICONS.plus}
              style={styles.plusIcon}
              resizeMode="contain"
            />


            {/* =================================================
                TEXT
            ================================================= */}

            <Text style={styles.otherDeviceText}>
              Lainnya
            </Text>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

        <View style={styles.bottomSpace} />

      </ScrollView>

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
    height: 76,

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
    paddingBottom: 40,
  },


  // ==========================================================
  // DESCRIPTION SECTION
  // ==========================================================

  descriptionSection: {
    paddingHorizontal: 20,

    paddingTop: 34,
  },


  // ==========================================================
  // DESCRIPTION TITLE
  // ==========================================================

  descriptionTitle: {
    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // DESCRIPTION TEXT
  // ==========================================================

  descriptionText: {
    marginTop: 9,

    fontSize: 18,

    lineHeight: 24,

    fontWeight: '400',

    color: '#16483E',
  },


  // ==========================================================
  // DEVICE GRID
  // ==========================================================

  deviceGrid: {
    paddingHorizontal: 23,

    marginTop: 39,

    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',

    rowGap: 16,
  },


  // ==========================================================
  // DEVICE BUTTON
  // ==========================================================

  deviceButton: {
    width: '47.5%',

    height: 60,

    borderRadius: 32,

    borderWidth: 1,

    borderColor: '#8C9092',

    backgroundColor: '#FFFFFF',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // APPLE WATCH
  // ==========================================================

  appleWatchLogo: {
    width: 96,

    height: 42,
  },


  // ==========================================================
  // GARMIN
  // ==========================================================

  garminLogo: {
    width: 100,

    height: 42,
  },


  // ==========================================================
  // COROS
  // ==========================================================

  corosLogo: {
    width: 106,

    height: 42,
  },


  // ==========================================================
  // SAMSUNG
  // ==========================================================

  samsungLogo: {
    width: 96,

    height: 47,
  },


  // ==========================================================
  // HUAWEI
  // ==========================================================

  huaweiLogo: {
    width: 100,

    height: 45,
  },


  // ==========================================================
  // AMAZFIT
  // ==========================================================

  amazfitLogo: {
    width: 150,

    height: 45,
  },


  // ==========================================================
  // OURA
  // ==========================================================

  ouraLogo: {
    width: 90,

    height: 45,
  },


  // ==========================================================
  // OTHER DEVICE BUTTON
  // ==========================================================

  otherDeviceButton: {
    backgroundColor: '#EAF3F0',

    borderColor: '#69A99A',

    flexDirection: 'row',
  },


  // ==========================================================
  // PLUS ICON
  // ==========================================================

  plusIcon: {
    width: 22,

    height: 22,

    marginRight: 10,
  },


  // ==========================================================
  // OTHER DEVICE TEXT
  // ==========================================================

  otherDeviceText: {
    fontSize: 18,

    fontWeight: '600',

    color: '#111111',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 30,
  },

});
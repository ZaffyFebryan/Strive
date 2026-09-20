import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// EDIT PROFILE SCREEN
// ============================================================

export default function EditProfileScreen({ navigation }) {


  // ==========================================================
  // USER DATA
  // ==========================================================

  const [fullName, setFullName] =
    useState('Andi Pratama');

  const [age, setAge] =
    useState('38');

  const [weight, setWeight] =
    useState('175');

  const [height, setHeight] =
    useState('74');


  // ==========================================================
  // NOTIFICATION
  // ==========================================================

  const [showNotification, setShowNotification] =
    useState(false);


  // ==========================================================
  // FORM VALIDATION
  // ==========================================================

  const isFormValid =
    fullName.trim() !== '' &&
    age.trim() !== '' &&
    weight.trim() !== '' &&
    height.trim() !== '';


  // ==========================================================
  // HANDLE SAVE
  // ==========================================================

  const handleSave = () => {

    // Jangan jalankan proses jika form belum lengkap
    if (!isFormValid) {
      return;
    }


    // Menampilkan notifikasi
    setShowNotification(true);


    // Setelah notifikasi tampil beberapa detik,
    // otomatis kembali ke halaman Profil
    setTimeout(() => {

      setShowNotification(false);

      navigation.navigate('Profile');

    }, 2500);

  };


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // HANDLE EDIT PHOTO
  // ==========================================================

  const handleEditPhoto = () => {

    // Untuk sementara belum diarahkan
    // ke pemilihan foto.

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
          NOTIFICATION
      ==================================================== */}

      {showNotification && (

        <View style={styles.notificationContainer}>

          {/* =================================================
              CHECK ICON
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
            Perubahan berhasil disimpan
          </Text>

        </View>

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
          Edit Profil
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
            PROFILE PHOTO
        ================================================== */}

        <View style={styles.profilePhotoContainer}>


          {/* =================================================
              PROFILE IMAGE
          ================================================= */}

          <Image
            source={require('../../../assets/andi.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />


          {/* =================================================
              EDIT PHOTO BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.editPhotoButton}
            onPress={handleEditPhoto}
            activeOpacity={0.8}
          >

            <Feather
              name="edit-2"
              size={14}
              color="#003F34"
            />

          </TouchableOpacity>

        </View>


        {/* ==================================================
            FORM
        ================================================== */}

        <View style={styles.form}>


          {/* =================================================
              NAMA LENGKAP
          ================================================= */}

          <View style={styles.inputGroup}>

            <Text style={styles.inputLabel}>
              Nama Lengkap
            </Text>


            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={[
                styles.fullNameInput,

                fullName.trim() === '' &&
                  styles.inputEmpty,
              ]}
              placeholder="Nama Lengkap"
              placeholderTextColor="#74777D"
              selectionColor="#227B68"
            />

          </View>


          {/* =================================================
              DATA USER
          ================================================= */}

          <View style={styles.dataRow}>


            {/* ==============================================
                UMUR
            ============================================== */}

            <View style={styles.dataItem}>

              <Text style={styles.dataLabel}>
                Umur
              </Text>


              <TextInput
                value={age}
                onChangeText={setAge}
                style={[
                  styles.dataInput,

                  age.trim() === '' &&
                    styles.inputEmpty,
                ]}
                keyboardType="numeric"
                maxLength={3}
                placeholder="Umur"
                placeholderTextColor="#74777D"
                selectionColor="#227B68"
              />

            </View>


            {/* ==============================================
                BERAT
            ============================================== */}

            <View style={styles.dataItem}>

              <Text style={styles.dataLabel}>
                Berat
              </Text>


              <TextInput
                value={weight}
                onChangeText={setWeight}
                style={[
                  styles.dataInput,

                  weight.trim() === '' &&
                    styles.inputEmpty,
                ]}
                keyboardType="numeric"
                maxLength={3}
                placeholder="Berat"
                placeholderTextColor="#74777D"
                selectionColor="#227B68"
              />

            </View>


            {/* ==============================================
                TINGGI
            ============================================== */}

            <View style={styles.dataItem}>

              <Text style={styles.dataLabel}>
                Tinggi
              </Text>


              <TextInput
                value={height}
                onChangeText={setHeight}
                style={[
                  styles.dataInput,

                  height.trim() === '' &&
                    styles.inputEmpty,
                ]}
                keyboardType="numeric"
                maxLength={3}
                placeholder="Tinggi"
                placeholderTextColor="#74777D"
                selectionColor="#227B68"
              />

            </View>

          </View>

        </View>

      </View>


      {/* ====================================================
          SAVE BUTTON
      ==================================================== */}

      <View style={styles.bottomContainer}>

        <TouchableOpacity
          style={[
            styles.saveButton,

            !isFormValid &&
              styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!isFormValid}
          activeOpacity={0.85}
        >

          <Text
            style={[
              styles.saveButtonText,

              !isFormValid &&
                styles.saveButtonTextDisabled,
            ]}
          >
            Simpan Perubahan
          </Text>

        </TouchableOpacity>

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
  // NOTIFICATION
  // ==========================================================

  notificationContainer: {
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
  },


  notificationText: {
    marginLeft: 17,

    fontSize: 16,

    fontWeight: '500',

    color: '#003F34',
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
    marginTop: 28,
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
  // PROFILE PHOTO
  // ==========================================================

  profilePhotoContainer: {
    width: 120,

    height: 120,

    alignSelf: 'center',

    marginTop: 32,

    position: 'relative',
  },


  profileImage: {
    width: 120,

    height: 120,

    borderRadius: 60,
  },


  // ==========================================================
  // EDIT PHOTO BUTTON
  // ==========================================================

  editPhotoButton: {
    position: 'absolute',

    right: -1,

    bottom: 1,

    width: 32,

    height: 32,

    borderRadius: 16,

    backgroundColor: '#EAF3F0',

    borderWidth: 1,

    borderColor: '#74A99E',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // FORM
  // ==========================================================

  form: {
    marginTop: 32,
  },


  // ==========================================================
  // INPUT GROUP
  // ==========================================================

  inputGroup: {
    width: '100%',
  },


  // ==========================================================
  // INPUT LABEL
  // ==========================================================

  inputLabel: {
    marginBottom: 9,

    fontSize: 20,

    fontWeight: '600',

    color: '#74777D',
  },


  // ==========================================================
  // FULL NAME INPUT
  // ==========================================================

  fullNameInput: {
    width: '100%',

    height: 59,

    paddingHorizontal: 29,

    borderRadius: 30,

    borderWidth: 1,

    borderColor: '#69A99A',

    backgroundColor: '#EAF3F0',

    fontSize: 17,

    fontWeight: '600',

    color: '#003F34',
  },


  // ==========================================================
  // EMPTY INPUT
  // ==========================================================

  inputEmpty: {
    borderColor: '#A8ABAD',

    backgroundColor: '#EEEEEE',

    color: '#74777D',
  },


  // ==========================================================
  // DATA ROW
  // ==========================================================

  dataRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    gap: 16,

    marginTop: 13,
  },


  // ==========================================================
  // DATA ITEM
  // ==========================================================

  dataItem: {
    flex: 1,
  },


  // ==========================================================
  // DATA LABEL
  // ==========================================================

  dataLabel: {
    marginBottom: 9,

    fontSize: 20,

    fontWeight: '600',

    color: '#74777D',
  },


  // ==========================================================
  // DATA INPUT
  // ==========================================================

  dataInput: {
    width: '100%',

    height: 59,

    paddingHorizontal: 29,

    borderRadius: 30,

    borderWidth: 1,

    borderColor: '#69A99A',

    backgroundColor: '#EAF3F0',

    fontSize: 17,

    fontWeight: '600',

    color: '#003F34',

    textAlign: 'left',
  },


  // ==========================================================
  // BOTTOM CONTAINER
  // ==========================================================

  bottomContainer: {
    paddingHorizontal: 20,

    paddingBottom: 34,

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // SAVE BUTTON
  // ==========================================================

  saveButton: {
    width: '100%',

    height: 60,

    borderRadius: 32,

    backgroundColor: '#227B68',

    alignItems: 'center',

    justifyContent: 'center',
    marginBottom: 24,
  },


  // ==========================================================
  // SAVE BUTTON DISABLED
  // ==========================================================

  saveButtonDisabled: {
    backgroundColor: '#929399',
  },


  // ==========================================================
  // SAVE BUTTON TEXT
  // ==========================================================

  saveButtonText: {
    fontSize: 18,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  // ==========================================================
  // SAVE BUTTON TEXT DISABLED
  // ==========================================================

  saveButtonTextDisabled: {
    color: '#E5E5E5',
  },

});
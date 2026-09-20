import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  Modal,
} from 'react-native';

export default function NewPasswordScreen({ navigation }) {

  // =====================================================
  // FORM STATE
  // =====================================================

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [successVisible, setSuccessVisible] =
    useState(false);


  // =====================================================
  // PASSWORD VISIBILITY
  // =====================================================

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  // =====================================================
  // FORM VALIDATION
  // =====================================================

  // Password pertama sudah diisi
  const isPasswordFilled =
    password.trim().length > 0;

  // Password konfirmasi sudah diisi
  const isConfirmFilled =
    confirmPassword.trim().length > 0;

  // Password sama
  const isPasswordMatch =
    isConfirmFilled &&
    password === confirmPassword;

  // Password tidak sama
  const isPasswordNotMatch =
    isConfirmFilled &&
    password !== confirmPassword;

  // Form valid
  const isFormValid =
    isPasswordFilled &&
    isConfirmFilled &&
    isPasswordMatch;


  // =====================================================
  // PASSWORD CHANGE
  // =====================================================

  const handleChangePassword = (text) => {
    setPassword(text);
  };


  // =====================================================
  // CONFIRM PASSWORD CHANGE
  // =====================================================

  const handleChangeConfirm = (text) => {
    setConfirmPassword(text);
  };


  // =====================================================
  // SAVE PASSWORD
  // =====================================================

  const handleSave = async () => {

    if (!isFormValid) {
      return;
    }

    setLoading(true);

    try {

      // =================================================
      // TODO:
      // Hubungkan dengan API reset password di sini.
      //
      // Contoh:
      //
      // await api.resetPassword({
      //   password,
      // });
      // =================================================


      // Tampilkan popup berhasil
      setSuccessVisible(true);

    } catch (error) {

      console.log(
        'Reset password error:',
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <View style={styles.container}>

      {/* =================================================
          STATUS BAR
      ================================================= */}

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />


      {/* =================================================
          BACKGROUND
      ================================================= */}

      <ImageBackground
        source={require('../../../assets/BG-LOG.png')}
        style={styles.background}
        resizeMode="cover"
      >

        {/* Dark Overlay */}

        <View style={styles.darkOverlay} />


        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.topHeader}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >

            <Text style={styles.backIcon}>
              ‹
            </Text>

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
            Kata Sandi Baru
          </Text>

        </View>


        {/* =================================================
            HERO
        ================================================= */}

        <View style={styles.hero}>

          <Text style={styles.title}>
            Buat Kata Sandi Baru
          </Text>


          <Text style={styles.subtitle}>
            Silakan masukkan kata sandi baru Anda.
            {'\n'}
            Pastikan kata sandi ini mudah Anda ingat.
          </Text>

        </View>


        {/* =================================================
            FORM PANEL
        ================================================= */}

        <KeyboardAvoidingView
          style={styles.panelWrapper}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
        >

          <View style={styles.panel}>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={
                styles.formContent
              }
            >


              {/* =================================================
                  KATA SANDI BARU
              ================================================= */}

              <View style={styles.field}>

                <Text style={styles.label}>
                  Kata Sandi Baru
                </Text>


                <View
                  style={[
                    styles.inputContainer,

                    // Jika sudah diisi → hijau
                    isPasswordFilled &&
                      styles.inputContainerFilled,
                  ]}
                >

                  {/* Gembok */}

                  <Image
                    source={require('../../../assets/Gembok.png')}
                    style={[
                      styles.inputIcon,

                      isPasswordFilled &&
                        styles.inputIconFilled,
                    ]}
                  />


                  {/* Text Input */}

                  <TextInput
                    style={[
                      styles.input,

                      isPasswordFilled &&
                        styles.inputTextFilled,
                    ]}
                    value={password}
                    onChangeText={
                      handleChangePassword
                    }
                    placeholder="Masukkan kata sandi baru"
                    placeholderTextColor="#AAAAAA"
                    secureTextEntry={
                      !showPassword
                    }
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                  />


                  {/* Eye */}

                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    activeOpacity={0.7}
                  >

                    <Image
                      source={require('../../../assets/Hash.png')}
                      style={[
                        styles.eyeIcon,

                        isPasswordFilled &&
                          styles.eyeIconFilled,
                      ]}
                    />

                  </TouchableOpacity>

                </View>

              </View>


              {/* =================================================
                  KONFIRMASI KATA SANDI
              ================================================= */}

              <View style={styles.field}>

                <Text style={styles.label}>
                  Konfirmasi Kata Sandi Baru
                </Text>


                <View
                  style={[
                    styles.inputContainer,

                    // Jika diisi → hijau
                    isConfirmFilled &&
                      styles.inputContainerFilled,

                    // Jika tidak sama → merah
                    isPasswordNotMatch &&
                      styles.inputContainerError,
                  ]}
                >

                  {/* Gembok */}

                  <Image
                    source={require('../../../assets/Gembok.png')}
                    style={[
                      styles.inputIcon,

                      // Hijau
                      isConfirmFilled &&
                        styles.inputIconFilled,

                      // Merah
                      isPasswordNotMatch &&
                        styles.inputIconError,
                    ]}
                  />


                  {/* Text Input */}

                  <TextInput
                    style={[
                      styles.input,

                      // Hijau
                      isConfirmFilled &&
                        styles.inputTextFilled,

                      // Merah
                      isPasswordNotMatch &&
                        styles.inputTextError,
                    ]}
                    value={confirmPassword}
                    onChangeText={
                      handleChangeConfirm
                    }
                    placeholder="Masukkan kata sandi baru"
                    placeholderTextColor="#AAAAAA"
                    secureTextEntry={
                      !showConfirmPassword
                    }
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                  />


                  {/* Eye */}

                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    activeOpacity={0.7}
                  >

                    <Image
                      source={require('../../../assets/Hash.png')}
                      style={[
                        styles.eyeIcon,

                        // Hijau
                        isConfirmFilled &&
                          styles.eyeIconFilled,

                        // Merah
                        isPasswordNotMatch &&
                          styles.eyeIconError,
                      ]}
                    />

                  </TouchableOpacity>

                </View>


                {/* =================================================
                    ERROR MESSAGE
                ================================================= */}

                {isPasswordNotMatch && (

                  <View style={styles.errorRow}>

                    {/* Error Icon */}

                    <View
                      style={styles.errorIconCircle}
                    >

                      <Text
                        style={styles.errorIconText}
                      >
                        !
                      </Text>

                    </View>


                    {/* Error Text */}

                    <Text style={styles.errorText}>
                      Kata sandi yang Anda masukkan
                      tidak sesuai!
                    </Text>

                  </View>

                )}

              </View>


              {/* =================================================
                  SAVE BUTTON
              ================================================= */}

              <TouchableOpacity
                style={[
                  styles.saveButton,

                  // Disabled
                  !isFormValid &&
                    styles.saveButtonDisabled,

                  // Enabled
                  isFormValid &&
                    styles.saveButtonEnabled,
                ]}
                onPress={handleSave}
                disabled={
                  !isFormValid ||
                  loading
                }
                activeOpacity={0.8}
              >

                <Text style={styles.saveButtonText}>

                  {loading
                    ? 'Menyimpan...'
                    : 'Simpan Kata Sandi Baru'}

                </Text>

              </TouchableOpacity>

            </ScrollView>

          </View>

        </KeyboardAvoidingView>

      </ImageBackground>


      {/* =====================================================
          SUCCESS MODAL
      ===================================================== */}

      <Modal
        visible={successVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >

        {/* =================================================
            DARK OVERLAY
        ================================================= */}

        <View style={styles.modalOverlay}>


          {/* =================================================
              MODAL CARD
          ================================================= */}

          <View style={styles.modalCard}>


            {/* =================================================
                SUCCESS ICON
            ================================================= */}

            <View style={styles.successIconCircle}>

              <Text style={styles.successCheck}>
                ✓
              </Text>

            </View>


            {/* =================================================
                TITLE
            ================================================= */}

            <Text style={styles.modalTitle}>
              Kata Sandi Berhasil Diubah
            </Text>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <Text style={styles.modalSubtitle}>
              Akun Anda kini sudah aman.
              {'\n'}
              Silakan masuk kembali dengan
              {'\n'}
              kata sandi baru Anda.
            </Text>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {

                setSuccessVisible(false);

                navigation.navigate('Login');

              }}
              activeOpacity={0.8}
            >

              <Text style={styles.modalButtonText}>
                Masuk Sekarang
              </Text>

            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // SCREEN
  // ==========================================================

  container: {
    flex: 1,
    backgroundColor: '#000000',
  },


  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },


  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      'rgba(0, 0, 0, 0.42)',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  topHeader: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? 66
        : 48,
    left: 16,
    right: 12,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },


  backButton: {
    width: 30,
    height: 35,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  backIcon: {
    color: '#FFFFFF',
    fontSize: 37,
    fontWeight: '300',
    lineHeight: 35,
    marginTop: -4,
  },


  headerTitle: {
    marginLeft: -2,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: -0.2,
  },


  // ==========================================================
  // HERO
  // ==========================================================

  hero: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    alignItems: 'center',
  },


  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.7,
  },


  subtitle: {
    marginTop: 9,
    color: '#E5E5E5',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: -0.2,
  },


  // ==========================================================
  // FORM PANEL
  // ==========================================================

  panelWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },


  panel: {
    height: '67%',
    minHeight: 580,
    backgroundColor:
      'rgba(255, 255, 255, 0.94)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },


  formContent: {
    paddingTop: 39,
    paddingHorizontal: 26,
    paddingBottom: 50,
  },


  // ==========================================================
  // FIELD
  // ==========================================================

  field: {
    marginBottom: 12,
  },


  label: {
    marginBottom: 7,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '500',
    color: '#696969',
    letterSpacing: -0.3,
  },


  // ==========================================================
  // INPUT
  // ==========================================================

  inputContainer: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 30,
    backgroundColor:
      'rgba(255, 255, 255, 0.72)',
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ==========================================================
  // INPUT FILLED
  // ==========================================================

  inputContainerFilled: {
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // INPUT ERROR
  // ==========================================================

  inputContainerError: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF0F0',
  },


  // ==========================================================
  // INPUT ICON
  // ==========================================================

  inputIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 27,
    marginRight: 15,
  },


  inputIconFilled: {
    tintColor: '#27816F',
  },


  inputIconError: {
    tintColor: '#FF5C5C',
  },


  // ==========================================================
  // TEXT INPUT
  // ==========================================================

  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    paddingRight: 5,
    fontSize: 17,
    color: '#555555',
    fontWeight: '400',
  },


  inputTextFilled: {
    color: '#1F6F5C',
    fontWeight: '600',
  },


  inputTextError: {
    color: '#E84D4D',
    fontWeight: '600',
  },


  // ==========================================================
  // EYE BUTTON
  // ==========================================================

  eyeButton: {
    width: 45,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },


  eyeIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },


  eyeIconFilled: {
    tintColor: '#27816F',
  },


  eyeIconError: {
    tintColor: '#FF5C5C',
  },


  // ==========================================================
  // ERROR
  // ==========================================================

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 2,
  },


  errorIconCircle: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#FFAAAA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },


  errorIconText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 17,
    textAlign: 'center',
  },


  errorText: {
    color: '#E84D4D',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    flex: 1,
  },


  // ==========================================================
  // SAVE BUTTON
  // ==========================================================

  saveButton: {
    width: '100%',
    height: 60,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },


  saveButtonDisabled: {
    backgroundColor: '#929399',
  },


  saveButtonEnabled: {
    backgroundColor: '#227B68',
  },


  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
  },


  // ==========================================================
  // MODAL OVERLAY
  // ==========================================================

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0, 0, 0, 0.60)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },


  // ==========================================================
  // MODAL CARD
  // ==========================================================

  modalCard: {
    width: '100%',
    maxWidth: 375,
    minHeight: 378,
    backgroundColor: '#EEF8F6',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#8FC5B9',
    paddingHorizontal: 28,
    paddingTop: 42,
    paddingBottom: 37,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },


  // ==========================================================
  // SUCCESS ICON
  // ==========================================================

  successIconCircle: {
    width: 69,
    height: 69,
    borderRadius: 35,
    backgroundColor: '#9BC9C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },


  successCheck: {
    color: '#227B68',
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '700',
    marginTop: -3,
  },


  // ==========================================================
  // MODAL TITLE
  // ==========================================================

  modalTitle: {
    color: '#004C40',
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.2,
  },


  // ==========================================================
  // MODAL DESCRIPTION
  // ==========================================================

  modalSubtitle: {
    color: '#4F5554',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 31,
    letterSpacing: -0.2,
  },


  // ==========================================================
  // MODAL BUTTON
  // ==========================================================

  modalButton: {
    width: '100%',
    height: 60,
    borderRadius: 31,
    backgroundColor: '#227B68',
    alignItems: 'center',
    justifyContent: 'center',
  },


  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

});
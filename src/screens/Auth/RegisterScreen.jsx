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
} from 'react-native';

export default function RegisterScreen({ navigation }) {

  // =====================================================
  // FORM STATE
  // =====================================================

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Digunakan untuk mengetahui field yang sedang aktif
  const [focusedField, setFocusedField] = useState(null);


  // =====================================================
  // FORM VALIDATION
  // =====================================================

  const isFormValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    agree;


  // =====================================================
  // REGISTER
  // =====================================================

  const handleRegister = async () => {

    if (!isFormValid) return;

    setLoading(true);

    try {

      // =================================================
      // LANJUT KE HALAMAN PENGISIAN DATA PENGGUNA
      // =================================================

      navigation.navigate('DataGender', {
        fullName: fullName,
        email: email,
        password: password,
      });

    } catch (error) {

      console.log(
        'Register error:',
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // CHECK FIELD STATE
  // =====================================================

  const isFullNameFilled =
    fullName.trim().length > 0;

  const isEmailFilled =
    email.trim().length > 0;

  const isPasswordFilled =
    password.trim().length > 0;


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

        {/* Dark overlay */}

        <View style={styles.darkOverlay} />


        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          {/* Brand */}

          <View style={styles.brandRow}>

            <Image
              source={require('../../../assets/Logo.png')}
              style={styles.brandIcon}
            />

            <Text style={styles.brandText}>
              Strive
            </Text>

          </View>


          {/* Title */}

          <Text style={styles.title}>
            Buat Akun
          </Text>


          {/* Subtitle */}

          <Text style={styles.subtitle}>
            Bangun rutinitas latihan beban dan pencatatan
            {'\n'}
            nutrisi Anda dengan Strive!
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
                  NAMA LENGKAP
              ================================================= */}

              <View style={styles.field}>

                <Text style={styles.label}>
                  Nama Lengkap
                </Text>

                <View
                  style={[
                    styles.inputContainer,

                    isFullNameFilled &&
                      styles.inputContainerFilled,
                  ]}
                >

                  <Image
                    source={require('../../../assets/User.png')}
                    style={[
                      styles.inputIcon,

                      isFullNameFilled &&
                        styles.inputIconFilled,
                    ]}
                  />

                  <TextInput
                    style={[
                      styles.input,

                      isFullNameFilled &&
                        styles.inputTextFilled,
                    ]}
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() =>
                      setFocusedField('fullName')
                    }
                    onBlur={() =>
                      setFocusedField(null)
                    }
                    placeholder="Masukkan nama lengkap Anda"
                    placeholderTextColor="#AAAAAA"
                    autoCapitalize="words"
                    autoCorrect={false}
                    returnKeyType="next"
                  />

                </View>

              </View>


              {/* =================================================
                  EMAIL
              ================================================= */}

              <View style={styles.field}>

                <Text style={styles.label}>
                  Email
                </Text>

                <View
                  style={[
                    styles.inputContainer,

                    isEmailFilled &&
                      styles.inputContainerFilled,
                  ]}
                >

                  <Image
                    source={require('../../../assets/Pesan.png')}
                    style={[
                      styles.inputIcon,

                      isEmailFilled &&
                        styles.inputIconFilled,
                    ]}
                  />

                  <TextInput
                    style={[
                      styles.input,

                      isEmailFilled &&
                        styles.inputTextFilled,
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() =>
                      setFocusedField('email')
                    }
                    onBlur={() =>
                      setFocusedField(null)
                    }
                    placeholder="Masukkan email Anda"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                  />

                </View>

              </View>


              {/* =================================================
                  KATA SANDI
              ================================================= */}

              <View style={styles.fieldPassword}>

                <Text style={styles.label}>
                  Kata Sandi
                </Text>

                <View
                  style={[
                    styles.inputContainer,

                    isPasswordFilled &&
                      styles.inputContainerFilled,
                  ]}
                >

                  <Image
                    source={require('../../../assets/Gembok.png')}
                    style={[
                      styles.inputIcon,

                      isPasswordFilled &&
                        styles.inputIconFilled,
                    ]}
                  />

                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,

                      isPasswordFilled &&
                        styles.inputTextFilled,
                    ]}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() =>
                      setFocusedField('password')
                    }
                    onBlur={() =>
                      setFocusedField(null)
                    }
                    placeholder="Masukkan kata sandi Anda"
                    placeholderTextColor="#AAAAAA"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                  />


                  {/* Password visibility */}

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
                  AGREEMENT
              ================================================= */}

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  setAgree((prev) => !prev)
                }
                activeOpacity={0.7}
              >

                <View
                  style={[
                    styles.checkbox,

                    agree &&
                      styles.checkboxActive,
                  ]}
                >

                  {agree && (
                    <Image
                      source={require('../../../assets/Cek.png')}
                      style={styles.checkIcon}
                    />
                  )}

                </View>


                <Text style={styles.checkboxText}>

                  Saya setuju dengan{' '}


                  {/* KEBIJAKAN PRIVASI */}

                  <Text
                    style={styles.link}
                    onPress={() =>
                      navigation.navigate(
                        'KebijakanPrivasi'
                      )
                    }
                  >
                    Kebijakan Privasi
                  </Text>


                  {' '}dan{' '}


                  {/* PERJANJIAN PENGGUNA */}

                  <Text
                    style={styles.link}
                    onPress={() =>
                      navigation.navigate(
                        'PerjanjianPengguna'
                      )
                    }
                  >
                    Perjanjian Pengguna
                  </Text>

                </Text>

              </TouchableOpacity>


              {/* =================================================
                  CREATE ACCOUNT BUTTON
              ================================================= */}

              <TouchableOpacity
                style={[
                  styles.registerButton,

                  !isFormValid &&
                    styles.registerButtonDisabled,

                  isFormValid &&
                    styles.registerButtonEnabled,
                ]}
                onPress={handleRegister}
                disabled={
                  !isFormValid || loading
                }
                activeOpacity={0.8}
              >

                <Text style={styles.registerButtonText}>
                  {loading
                    ? 'Memproses...'
                    : 'Buat akun'}
                </Text>

              </TouchableOpacity>


              {/* =================================================
                  OR
              ================================================= */}

              <Text style={styles.orText}>
                Atau lanjutkan dengan
              </Text>


              {/* =================================================
                  GOOGLE BUTTON
              ================================================= */}

              <TouchableOpacity
                style={styles.googleButton}
                activeOpacity={0.8}
                onPress={() => {}}
              >

                <Image
                  source={require('../../../assets/Google.png')}
                  style={styles.googleIcon}
                />

                <Text style={styles.googleText}>
                  Google
                </Text>

              </TouchableOpacity>


              {/* =================================================
                  LOGIN
              ================================================= */}

              <View style={styles.loginRow}>

                <Text style={styles.loginText}>
                  Sudah punya akun?
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Login')
                  }
                  activeOpacity={0.7}
                >

                  <Text style={styles.loginLink}>
                    Masuk
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>

          </View>

        </KeyboardAvoidingView>

      </ImageBackground>

    </View>
  );
}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

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

  header: {
    height: 274,
    paddingTop:
      Platform.OS === 'ios'
        ? 90
        : 70,
    paddingHorizontal: 16,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: -20,
  },

  brandIcon: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },

  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },

  title: {
    marginTop: 14,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '700',
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    color: '#E8E8E8',
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '400',
    letterSpacing: -0.2,
  },


  // ==========================================================
  // FORM PANEL
  // ==========================================================

  panelWrapper: {
    flex: 1,
  },

  panel: {
    flex: 1,
    backgroundColor:
      'rgba(255, 255, 255, 0.94)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    marginTop: -60,
  },

  formContent: {
    paddingTop: 36,
    paddingHorizontal: 26,
    paddingBottom: 40,
  },


  // ==========================================================
  // FORM FIELD
  // ==========================================================

  field: {
    marginBottom: 8,
  },

  fieldPassword: {
    marginBottom: 17,
  },

  label: {
    marginBottom: 9,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '600',
    color: '#6D6D6D',
    letterSpacing: -0.3,
  },


  // ==========================================================
  // INPUT
  // ==========================================================

  inputContainer: {
    height: 54,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 31,
    backgroundColor:
      'rgba(255, 255, 255, 0.68)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainerFilled: {
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // INPUT ICON
  // ==========================================================

  inputIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
    marginLeft: 27,
    marginRight: 18,
  },

  inputIconFilled: {
    tintColor: '#27816F',
  },


  // ==========================================================
  // TEXT INPUT
  // ==========================================================

  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    paddingRight: 20,
    fontSize: 17,
    color: '#1F6F5C',
    fontWeight: '400',
  },

  inputTextFilled: {
    color: '#1F6F5C',
    fontWeight: '600',
  },

  passwordInput: {
    paddingRight: 0,
  },


  // ==========================================================
  // PASSWORD EYE
  // ==========================================================

  eyeButton: {
    width: 45,
    height: 54,
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


  // ==========================================================
  // AGREEMENT
  // ==========================================================

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 33,
  },

  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#777777',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  checkboxActive: {
    backgroundColor: '#227B68',
    borderColor: '#227B68',
  },

  checkIcon: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
  },

  checkboxText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: '#333333',
    letterSpacing: -0.1,
  },

  link: {
    color: '#087D73',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },


  // ==========================================================
  // REGISTER BUTTON
  // ==========================================================

  registerButton: {
    height: 54,
    width: '100%',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerButtonDisabled: {
    backgroundColor: '#929399',
  },

  registerButtonEnabled: {
    backgroundColor: '#227B68',
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
  },


  // ==========================================================
  // OR
  // ==========================================================

  orText: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    color: '#333333',
    fontSize: 14,
    fontWeight: '400',
  },


  // ==========================================================
  // GOOGLE
  // ==========================================================

  googleButton: {
    height: 54,
    width: '100%',
    borderRadius: 31,
    borderWidth: 1,
    borderColor: '#D2D2D2',
    backgroundColor:
      'rgba(255, 255, 255, 0.70)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 16,
  },

  googleText: {
    fontSize: 19,
    color: '#999999',
    fontWeight: '400',
  },


  // ==========================================================
  // LOGIN
  // ==========================================================

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  loginText: {
    fontSize: 14,
    color: '#333333',
  },

  loginLink: {
    marginLeft: 3,
    fontSize: 14,
    color: '#222222',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

});
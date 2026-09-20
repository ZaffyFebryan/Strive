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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid =
    email.trim().length > 0 &&
    password.trim().length > 0;

  const handleLogin = async () => {
    if (!isFormValid) return;

    setLoading(true);

    try {
      navigation.navigate('Home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ImageBackground
        source={require('../../../assets/BG-LOG.png')}
        style={styles.background}
        resizeMode="cover"
      >

        <View style={styles.darkOverlay} />

        {/* ================= HEADER ================= */}

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
            Selamat Datang Kembali
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Masuk untuk melanjutkan pemantauan latihan
            {'\n'}
            beban dan pola makan Anda
          </Text>

        </View>

        {/* ================= FORM PANEL ================= */}

        <KeyboardAvoidingView
          style={styles.panelWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

          <View style={styles.panel}>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.formContent}
            >

              {/* ================= EMAIL ================= */}

              <View style={styles.field}>

                <Text style={styles.label}>
                  Email
                </Text>

                <View
                  style={[
                    styles.inputContainer,
                    email.trim().length > 0 &&
                      styles.inputContainerActive,
                  ]}
                >

                  <Image
                    source={require('../../../assets/Pesan.png')}
                    style={[
                      styles.inputIcon,
                      email.trim().length > 0 &&
                        styles.inputIconActive,
                    ]}
                  />

                  <TextInput
                    style={[
                      styles.input,
                      email.trim().length > 0 &&
                        styles.inputActive,
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Masukkan email Anda"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                  />

                </View>

              </View>

              {/* ================= PASSWORD ================= */}

              <View style={styles.fieldPassword}>

                <Text style={styles.label}>
                  Kata Sandi
                </Text>

                <View
                  style={[
                    styles.inputContainer,
                    password.trim().length > 0 &&
                      styles.inputContainerActive,
                  ]}
                >

                  <Image
                    source={require('../../../assets/Gembok.png')}
                    style={[
                      styles.inputIcon,
                      password.trim().length > 0 &&
                        styles.inputIconActive,
                    ]}
                  />

                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      password.trim().length > 0 &&
                        styles.inputActive,
                    ]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Masukkan kata sandi Anda"
                    placeholderTextColor="#AAAAAA"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    returnKeyType="done"
                  />

                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() =>
                      setShowPassword(!showPassword)
                    }
                    activeOpacity={0.7}
                  >
                    <Image
                      source={require('../../../assets/Hash.png')}
                      style={[
                        styles.eyeIcon,
                        password.trim().length > 0 &&
                          styles.eyeIconActive,
                      ]}
                    />
                  </TouchableOpacity>

                </View>

              </View>

              {/* ================= FORGOT PASSWORD ================= */}

              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() =>
                  navigation.navigate('ForgotPassword')
                }
                activeOpacity={0.7}
              >
                <Text style={styles.forgotText}>
                  Lupa Kata Sandi?
                </Text>
              </TouchableOpacity>

              {/* ================= LOGIN BUTTON ================= */}

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isFormValid &&
                    styles.loginButtonActive,
                ]}
                onPress={handleLogin}
                disabled={!isFormValid || loading}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.loginButtonText,
                    isFormValid &&
                      styles.loginButtonTextActive,
                  ]}
                >
                  {loading ? 'Memproses...' : 'Masuk'}
                </Text>
              </TouchableOpacity>

              {/* ================= OR ================= */}

              <Text style={styles.orText}>
                Atau lanjutkan dengan
              </Text>

              {/* ================= GOOGLE ================= */}

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

              {/* ================= REGISTER ================= */}

              <View style={styles.registerRow}>

                <Text style={styles.registerText}>
                  Belum punya akun?
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Register')
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.registerLink}>
                    Daftar
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

const styles = StyleSheet.create({

  // =====================================================
  // SCREEN
  // =====================================================

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
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },

  // =====================================================
  // HEADER
  // =====================================================

  header: {
    height: 274,
    paddingTop: Platform.OS === 'ios' ? 90 : 70,
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
    marginTop: 30,
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

  // =====================================================
  // FORM PANEL
  // =====================================================

  panelWrapper: {
    flex: 1,
  },

  panel: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    marginTop: -40,
  },

  formContent: {
    paddingTop: 36,
    paddingHorizontal: 26,
    paddingBottom: 40,
  },

  // =====================================================
  // FORM FIELD
  // =====================================================

  field: {
    marginBottom: 8,
  },

  fieldPassword: {
    marginBottom: 5,
  },

  label: {
    marginBottom: 9,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '600',
    color: '#6D6D6D',
    letterSpacing: -0.3,
  },

  inputContainer: {
    height: 54,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 31,
    backgroundColor: 'rgba(255, 255, 255, 0.68)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainerActive: {
    borderColor: '#1F6F5C',
    backgroundColor: '#E9F1EF',
  },

  inputIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
    marginLeft: 27,
    marginRight: 18,
    opacity: 0.65,
  },

  inputIconActive: {
    tintColor: '#1F6F5C',
    opacity: 1,
  },

  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    paddingRight: 20,
    fontSize: 17,
    color: '#555555',
    fontWeight: '400',
  },

  inputActive: {
    color: '#1F6F5C',
  },

  passwordInput: {
    paddingRight: 0,
  },

  eyeButton: {
    width: 45,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  eyeIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
    opacity: 0.55,
  },

  eyeIconActive: {
    tintColor: '#1F6F5C',
    opacity: 1,
  },

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 9,
    marginBottom: 28,
  },

  forgotText: {
    color: '#1F6F5C',
    fontSize: 13,
    fontWeight: '700',
  },

  // =====================================================
  // LOGIN BUTTON
  // =====================================================

  loginButton: {
    height: 54,
    width: '100%',
    borderRadius: 32,
    backgroundColor: '#929399',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonActive: {
    backgroundColor: '#1F6F5C',
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
  },

  loginButtonTextActive: {
    color: '#fff',
  },

  // =====================================================
  // OR
  // =====================================================

  orText: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    color: '#333333',
    fontSize: 14,
    fontWeight: '400',
  },

  // =====================================================
  // GOOGLE
  // =====================================================

  googleButton: {
    height: 54,
    width: '100%',
    borderRadius: 31,
    borderWidth: 1,
    borderColor: '#D2D2D2',
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
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

  // =====================================================
  // REGISTER
  // =====================================================

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  registerText: {
    fontSize: 14,
    color: '#333333',
  },

  registerLink: {
    marginLeft: 3,
    fontSize: 14,
    color: '#222222',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

});
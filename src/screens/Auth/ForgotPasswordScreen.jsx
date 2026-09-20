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
import { Feather } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // =====================================================
  // FORM VALIDATION
  // =====================================================

  const isEmailFilled = email.trim().length > 0;

  const isFormValid = email.trim().length > 0;

  // =====================================================
  // SEND VERIFICATION CODE
  // =====================================================

  const handleSendCode = async () => {
    if (!isFormValid) return;

    setLoading(true);

    try {
      // TODO:
      // Hubungkan dengan API reset password kamu di sini.
      //
      // Contoh:
      //
      // await api.sendResetCode({
      //   email,
      // });

      navigation.navigate('OTPVerification', {
        email,
        mode: 'reset-password',
      });
    } catch (error) {
      console.log('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <View style={styles.container}>

      {/* =====================================================
          STATUS BAR
      ===================================================== */}

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <ImageBackground
        source={require('../../../assets/BG-FOR.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark overlay */}
        <View style={styles.darkOverlay} />

        {/* =====================================================
            TOP HEADER
        ===================================================== */}

        <View style={styles.topHeader}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Feather
              name="chevron-left"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Lupa Kata Sandi
          </Text>

        </View>

        {/* =====================================================
            HERO / TITLE
        ===================================================== */}

        <View style={styles.hero}>

          <Text style={styles.title}>
            Lupa Kata Sandi?
          </Text>

          <Text style={styles.subtitle}>
            Jangan khawatir. Masukkan email untuk 
            {'\n'}
            menerima kode pemulihan.
          </Text>

        </View>

        {/* =====================================================
            FORM PANEL
        ===================================================== */}

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
              contentContainerStyle={styles.formContent}
            >

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
                  isEmailFilled && styles.inputContainerFilled,
                ]}
              >
                <Image
                  source={require('../../../assets/Pesan.png')}
                  style={[
                    styles.inputIcon,
                    isEmailFilled && styles.inputIconFilled,
                  ]}
                />

                <TextInput
                  style={[
                    styles.input,
                    isEmailFilled && styles.inputTextFilled,
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Masukkan alamat email Anda"
                  placeholderTextColor="#AAAAAA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                />
              </View>
            </View>

              {/* =================================================
                  SEND CODE BUTTON
              ================================================= */}

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !isFormValid && styles.sendButtonDisabled,
                  isFormValid && styles.sendButtonEnabled,
                ]}
                onPress={() => {
                  if (!isFormValid) return;

                  navigation.navigate('OTPVerification', {
                    email: email.trim(),
                    mode: 'reset-password',
                  });
                }}
                disabled={!isFormValid || loading}
                activeOpacity={0.8}
              >
                <Text style={styles.sendButtonText}>
                  {loading
                    ? 'Memproses...'
                    : 'Kirim kode verifikasi'}
                </Text>
              </TouchableOpacity>

              {/* =================================================
                  LOGIN
              ================================================= */}

              <View style={styles.footerRow}>

                <Text style={styles.footerText}>
                  Ingat kata sandi Anda?
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
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },

  // ==========================================================
  // TOP HEADER
  // ==========================================================

  topHeader: {
    position: 'absolute',

    top:
      Platform.OS === 'ios'
        ? 66
        : 48,
    left: 12,
    right: 20,
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

  headerTitle: {
    marginLeft: 5,
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
    top: 220,
    left: 10,
    right: 10,
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '700',
    letterSpacing: -0.6,
  },

  subtitle: {
    marginTop: 16,
    textAlign: 'center',
    color: '#E5E5E5',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: -0.1,
  },

  // ==========================================================
  // FORM PANEL
  // ==========================================================

  panelWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  panel: {
    height: '55%',
    minHeight: 417,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },

  formContent: {
    paddingTop: 30,
    paddingHorizontal: 32,
    paddingBottom: 40,
  },

  // ==========================================================
  // EMAIL FIELD
  // ==========================================================

  field: {
    marginBottom: 24,
  },

  label: {
    marginBottom: 7,
    fontSize: 19,
    lineHeight: 20,
    fontWeight: '600',
    color: '#696969',
    letterSpacing: -0.2,
  },

  // ==========================================================
  // INPUT
  // ==========================================================

  inputContainer: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D2D2D2',
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // ==========================================================
  // INPUT SUDAH DIISI
  // ==========================================================

  inputContainerFilled: {
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
  },

  // ==========================================================
  // EMAIL ICON
  // ==========================================================

inputIcon: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
  marginLeft: 26,
  marginRight: 8,
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
    paddingRight: 16,
    fontSize: 17,
    color: '#555555',
    fontWeight: '400',
  },

  inputTextFilled: {
    color: '#1F6F5C',
    fontWeight: '600',
  },

  // ==========================================================
  // SEND BUTTON
  // ==========================================================

  sendButton: {
    height: 60,
    width: '100%',
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ==========================================================
  // BUTTON DISABLED
  // ==========================================================

  sendButtonDisabled: {
    backgroundColor: '#929399',
  },

  // ==========================================================
  // BUTTON ENABLED
  // ==========================================================

  sendButtonEnabled: {
    backgroundColor: '#227B68',
  },

  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.1,
  },

  // ==========================================================
  // FOOTER
  // ==========================================================

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  footerText: {
    fontSize: 14,
    color: '#555555',
    letterSpacing: -0.1,
  },

  loginLink: {
    marginLeft: 3,
    fontSize: 14,
    color: '#222222',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
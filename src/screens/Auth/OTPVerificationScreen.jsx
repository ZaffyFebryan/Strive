import React, { useRef, useState } from 'react';
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
} from 'react-native';

export default function OTPVerificationScreen({
  navigation,
  route,
}) {
  // =====================================================
  // EMAIL DARI HALAMAN SEBELUMNYA
  // =====================================================

  const email =
    route?.params?.email || 'andi.pratama@email.com';

  // =====================================================
  // OTP STATE
  // =====================================================

  const [otp, setOtp] = useState([
    '',
    '',
    '',
    '',
  ]);

  const [loading, setLoading] = useState(false);

  // =====================================================
  // INPUT REFS
  // =====================================================

  const inputRefs = useRef([]);

  // =====================================================
  // OTP VALIDATION
  // =====================================================

  const isOtpComplete =
    otp.every((digit) => digit.length === 1);

  // =====================================================
  // HANDLE OTP CHANGE
  // =====================================================

  const handleOtpChange = (value, index) => {
    // Hanya izinkan angka
    const numericValue = value.replace(/[^0-9]/g, '');

    const newOtp = [...otp];

    // Jika user menghapus angka
    if (numericValue.length === 0) {
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // Ambil hanya 1 digit
    newOtp[index] = numericValue.slice(-1);

    setOtp(newOtp);

    // Pindah ke input berikutnya
    if (
      index < 3 &&
      numericValue.length > 0
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =====================================================
  // HANDLE BACKSPACE
  // =====================================================

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (
      nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerify = async () => {
    if (!isOtpComplete) return;

    setLoading(true);

    try {
      const otpCode = otp.join('');

      console.log('OTP:', otpCode);
      console.log('Email:', email);

      // TODO:
      // Hubungkan dengan API verifikasi OTP.
      //
      // Contoh:
      //
      // await api.verifyOtp({
      //   email,
      //   otp: otpCode,
      // });

      // Setelah berhasil:
      // navigation.navigate('ResetPassword', { email });

    } catch (error) {
      console.log('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResend = async () => {
    try {
      // TODO:
      // Hubungkan dengan API kirim ulang OTP.
      //
      // await api.sendResetCode({ email });

      console.log('Resend OTP:', email);
    } catch (error) {
      console.log('Resend OTP error:', error);
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
        source={require('../../../assets/BG-FOR.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark overlay */}
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
            Verifikasi OTP
          </Text>

        </View>

        {/* =================================================
            HERO
        ================================================= */}

        <View style={styles.hero}>

          <Text style={styles.title}>
            Verifikasi OTP
          </Text>

          <Text style={styles.subtitle}>
            Kami telah mengirimkan kode verifikasi
            {'\n'}
            4-digit ke email{' '}
            <Text style={styles.emailText}>
              {email}
            </Text>
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
                  OTP INPUT
              ================================================= */}

              <View style={styles.otpContainer}>

                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={[
                      styles.otpInput,

                      digit.length > 0 &&
                        styles.otpInputFilled,
                    ]}
                    value={digit}
                    onChangeText={(value) =>
                      handleOtpChange(
                        value,
                        index
                      )
                    }
                    onKeyPress={(event) =>
                      handleKeyPress(
                        event,
                        index
                      )
                    }
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    selectTextOnFocus
                  />
                ))}

              </View>

              {/* =================================================
                  RESEND
              ================================================= */}

              <View style={styles.resendContainer}>

                <TouchableOpacity
                  onPress={handleResend}
                  activeOpacity={0.7}
                >
                  <Text style={styles.resendText}>
                    Kirim ulang
                  </Text>
                </TouchableOpacity>

              </View>

              {/* =================================================
                  VERIFY BUTTON
              ================================================= */}

              <TouchableOpacity
                style={[
                  styles.verifyButton,
                  !isOtpComplete && styles.verifyButtonDisabled,
                  isOtpComplete && styles.verifyButtonEnabled,
                ]}
                onPress={() => {
                  if (!isOtpComplete) return;

                  navigation.navigate('NewPassword', {
                    email: route?.params?.email,
                    mode: 'reset-password',
                  });
                }}
                disabled={!isOtpComplete || loading}
                activeOpacity={0.8}
              >
                <Text style={styles.verifyButtonText}>
                  {loading
                    ? 'Memverifikasi...'
                    : 'Verifikasi'}
                </Text>
              </TouchableOpacity>

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
  // HEADER
  // ==========================================================

  topHeader: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? 66
        : 48,
    left: 16,
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
    top: 220,
    left: 20,
    right: 20,
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 30,
    fontWeight: '700',
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 16,
    textAlign: 'center',
    color: '#E5E5E5',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: -0.2,
  },

  emailText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // ==========================================================
  // PANEL
  // ==========================================================

  panelWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  panel: {
    height: '55%',
    minHeight: 417,
    backgroundColor:
      'rgba(255, 255, 255, 0.94)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },

  formContent: {
    paddingTop: 69,
    paddingHorizontal: 32,
    paddingBottom: 40,
  },

  // ==========================================================
  // OTP CONTAINER
  // ==========================================================

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  // ==========================================================
  // OTP INPUT
  // ==========================================================

  otpInput: {
    width: 72,
    height: 60,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 18,
    backgroundColor:
      'rgba(255, 255, 255, 0.72)',
    fontSize: 24,
    fontWeight: '600',
    color: '#555555',
  },

  // ==========================================================
  // OTP FILLED
  // ==========================================================

  otpInputFilled: {
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
    color: '#1F6F5C',
  },

  // ==========================================================
  // RESEND
  // ==========================================================

  resendContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 17,
    marginBottom: 31,
  },

  resendText: {
    color: '#187A68',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },

  // ==========================================================
  // VERIFY BUTTON
  // ==========================================================

  verifyButton: {
    width: '100%',
    height: 60,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  verifyButtonDisabled: {
    backgroundColor: '#929399',
  },

  verifyButtonEnabled: {
    backgroundColor: '#227B68',
  },

  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
  },
});
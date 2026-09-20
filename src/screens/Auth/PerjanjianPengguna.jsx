import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';

export default function UserAgreementScreen({ navigation }) {

  // =====================================================
  // SAFE AREA
  // Digunakan agar konten tidak tertutup navigation bar
  // bawaan HP / gesture bar
  // =====================================================

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe}>

      {/* =====================================================
          STATUS BAR
      ===================================================== */}

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather
            name="chevron-left"
            size={30}
            color="#064C42"
          />
        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Perjanjian Pengguna
        </Text>

      </View>


      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <View style={styles.divider} />


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <ScrollView
        style={styles.scroll}

        contentContainerStyle={[
          styles.content,

          // Tambahkan ruang berdasarkan safe area HP
          {
            paddingBottom: insets.bottom + 40,
          },
        ]}

        showsVerticalScrollIndicator={false}
      >

        {/* =================================================
            PEMBUKA
        ================================================= */}

        <Text style={styles.paragraph}>
          Selamat datang di Strive. Dengan mengunduh, mendaftar, dan/atau 
          menggunakan aplikasi Strive, Anda secara otomatis menyatakan 
          bahwa Anda telah membaca, memahami, dan menyetujui seluruh 
          ketentuan layanan yang kami buat. Kebijakan ini dirancang demi 
          menjaga keamanan, kenyamanan, dan ketertiban bersama dalam 
          ekosistem Strive. Jika Anda tidak menyetujui salah satu poin 
          di bawah ini, kami menyarankan untuk tidak melanjutkan penggunaan 
          layanan kami.
        </Text>


        {/* =================================================
            SECTION 1
        ================================================= */}

        <Text style={styles.sectionTitle}>
          1. Ketentuan dan Keamanan Akun Pengguna
        </Text>

        {/* =================================================
            BULLET 1
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Tanggung Jawab Akun:
            </Text>{' '}
            Anda bertanggung jawab penuh secara 
            pribadi untuk menjaga kerahasiaan 
            kredensial akun, termasuk nama pengguna 
            (username) dan kata sandi (password).
          </Text>

        </View>


        {/* =================================================
            BULLET 2
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Aktivitas Akun:
            </Text>{' '}
            Segala bentuk aktivitas, transaksi, atau 
            perubahan data yang terjadi di dalam akun 
            Anda akan dianggap sebagai tindakan sah 
            yang dilakukan oleh Anda sendiri.
          </Text>

        </View>


        {/* =================================================
            BULLET 3
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Penyalahgunaan:
            </Text>{' '}
            Strive tidak bertanggung jawab atas kerugian 
            atau kerugian pihak ketiga yang timbul akibat 
            kelalaian pengguna dalam menjaga keamanan akun. 
            Jika Anda mendeteksi adanya akses tanpa izin 
            atau kebocoran keamanan, Anda wajib segera 
            melaporkannya kepada tim dukungan kami.
          </Text>

        </View>


        {/* =================================================
            SECTION 2
        ================================================= */}

        <Text style={styles.sectionTitle}>
          2. Batasan Fungsi dan Penggunaan Layanan
        </Text>

        {/* =================================================
            BULLET 1
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Alat Bantu Kebugaran:
            </Text>{' '}
            Seluruh fitur yang tersedia di dalam aplikasi 
            Strive—termasuk program latihan beban, pelacakan 
            nutrisi (pantau makan), kalkulator kalori, dan 
            rekomendasi harian—murni berfungsi sebagai alat 
            bantu (tools) untuk mendukung gaya hidup sehat 
            Anda.
          </Text>

        </View>


        {/* =================================================
            BULLET 2
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Bukan Pengganti Saran Medis:
            </Text>{' '}
            Informasi yang disajikan oleh Strive bukan 
            merupakan dan tidak dapat menggantikan saran 
            medis profesional, diagnosis, atau perawatan 
            dari dokter, ahli gizi berlisensi, maupun 
            tenaga kesehatan ahli.
          </Text>

        </View>


        {/* =================================================
            BULLET 3
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Kondisi Kesehatan Khusus:
            </Text>{' '}
            Kami sangat menyarankan Anda untuk berkonsultasi 
            dengan profesional medis sebelum memulai program 
            latihan baru atau mengubah pola makan secara 
            drastis, terutama jika Anda memiliki riwayat 
            medis tertentu.
          </Text>

        </View>


        {/* =================================================
            SECTION 3
        ================================================= */}

        <Text style={styles.sectionTitle}>
          3. Batasan Tanggung Jawab dan Risiko
        </Text>

        {/* =================================================
            BULLET 1
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Risiko Fisik:
            </Text>{' '}
            Latihan beban dan aktivitas fisik memiliki risiko 
            cedera bawaan. Strive tidak bertanggung jawab 
            atas segala bentuk cedera fisik, gangguan kesehatan, 
            atau kerugian materiil yang dialami oleh pengguna 
            akibat kesalahan teknis mandiri, kelalaian, atau 
            pemaksaan intensitas saat melakukan gerakan latihan.
          </Text>

        </View>


        {/* =================================================
            BULLET 2
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Kepatuhan Panduan:
            </Text>{' '}
            Pengguna diharapkan mengikuti panduan visual dan 
            instruksi yang tersedia di aplikasi dengan bijak, 
            serta memahami batasan fisik masing-masing saat 
            mengeksekusi program latihan.
          </Text>

        </View>


        {/* =================================================
            BULLET 3
        ================================================= */}

        <View style={styles.bulletRow}>

          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.bulletText}>
            <Text style={styles.bold}>
              Pelepasan Tuntutan:
            </Text>{' '}
            Dengan menyetujui ketentuan ini, Anda membebaskan 
            Strive beserta seluruh tim pengembang dari segala 
            tuntutan hukum terkait dampak fisik atau medis yang 
            terjadi selama masa penggunaan aplikasi.
          </Text>

        </View>


        {/* =================================================
            PENUTUP
        ================================================= */}

        <Text style={styles.paragraph}>
          Ketentuan ini dapat berubah sewaktu-waktu demi 
          peningkatan layanan, dan pembaruan akan diinformasikan 
          melalui aplikasi.
        </Text>


        {/* =================================================
            TIDAK PERLU bottomSpace LAGI
            Karena paddingBottom sudah mengikuti safe area
        ================================================= */}

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
    marginTop: 16,
    height: 76,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },


  backButton: {
    width: 34,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  headerTitle: {
    marginLeft: 6,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: '#064C42',
    letterSpacing: -0.6,
  },


  // ==========================================================
  // DIVIDER
  // ==========================================================

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    width: '100%',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },


  // ==========================================================
  // PARAGRAPH
  // ==========================================================

  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#123F38',
    letterSpacing: -0.15,
    marginBottom: 17,
    textAlign: 'left',
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '700',
    color: '#103F38',
    letterSpacing: -0.4,
    marginTop: 1,
    marginBottom: 10,
  },


  // ==========================================================
  // BULLET
  // ==========================================================

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 5,
    marginBottom: 2,
  },


  bullet: {
    width: 13,
    fontSize: 18,
    lineHeight: 20,
    color: '#103F38',
    fontWeight: '700',
  },


  // ==========================================================
  // BULLET TEXT
  // ==========================================================

  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#123F38',
    letterSpacing: -0.15,
    paddingRight: 1,
  },


  // ==========================================================
  // BOLD TEXT
  // ==========================================================

  bold: {
    fontWeight: '700',
    color: '#0B3F37',
  },

});
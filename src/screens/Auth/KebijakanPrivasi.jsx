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

export default function PrivacyPolicyScreen({ navigation }) {

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
          Kebijakan Privasi
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
          Selamat datang di Strive. Kami sangat menghargai privasi
          Anda dan berkomitmen penuh untuk melindungi seluruh data
          pribadi Anda yang mempercayakan perjalanannya bersama
          kami. Kebijakan Privasi ini dirancang untuk membantu Anda
          memahami bagaimana kami mengumpulkan, menggunakan,
          dan menjaga informasi personal Anda secara aman. Dengan
          menggunakan layanan Strive, Anda menyatakan setuju atas
          pengumpulan dan penggunaan informasi sesuai dengan
          kebijakan ini.
        </Text>


        {/* =================================================
            SECTION 1
        ================================================= */}

        <Text style={styles.sectionTitle}>
          1. Jenis Data Pribadi yang Dikumpulkan
        </Text>


        <Text style={styles.paragraph}>
          Untuk memberikan pengalaman pemantauan kebugaran
          yang dipersonalisasi dan akurat, Strive mengumpulkan
          beberapa informasi fisik dan data pendukung pengguna,
          yang meliputi:
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
              Informasi Fisik Dasar:
            </Text>{' '}
            Data antropometri seperti berat
            badan, tinggi badan, usia, serta jenis kelamin.
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
              Data Aktivitas Fisik:
            </Text>{' '}
            Riwayat latihan beban, volume
            angkatan, frekuensi olahraga, serta catatan performa
            harian Anda.
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
              Data Nutrisi:
            </Text>{' '}
            Catatan asupan makanan harian, target
            kalori, dan preferensi diet yang Anda masukkan secara
            mandiri ke dalam sistem.
          </Text>

        </View>


        {/* =================================================
            SECTION 2
        ================================================= */}

        <Text style={styles.sectionTitle}>
          2. Tujuan Penggunaan Data Pengguna
        </Text>


        <Text style={styles.paragraph}>
          Seluruh data yang telah dikumpulkan murni digunakan untuk
          kepentingan optimalisasi fitur aplikasi demi mendukung
          pencapaian target Anda, antara lain:
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
              Personalisasi Program:
            </Text>{' '}
            Membantu algoritma sistem
            dalam menghitung kebutuhan kalori harian (TDEE/BMR)
            serta menyusun rekomendasi intensitas latihan yang
            sesuai.
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
              Pelacakan Kemajuan (Progress Tracking):
            </Text>{' '}
            Memantau
            perkembangan latihan, grafik perubahan berat badan,
            dan evaluasi pola makan dari waktu ke waktu.
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
              Peningkatan Layanan:
            </Text>{' '}
            Menganalisis tren penggunaan
            untuk membantu pengembangan dan peningkatan kualitas
            layanan Strive.
          </Text>

        </View>


        {/* =================================================
            SECTION 3
        ================================================= */}

        <Text style={styles.sectionTitle}>
          3. Keamanan, Kerahasiaan, dan Perlindungan Data
        </Text>


        <Text style={styles.paragraph}>
          Kami menaruh perhatian besar pada keamanan informasi
          Anda dan menerapkan standar proteksi digital yang ketat:
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
              Personalisasi Program:
            </Text>{' '}
            Strive menjamin bahwa seluruh data
            Anda disimpan dengan aman menggunakan enkripsi
            berbasis server untuk mencegah risiko kebocoran,
            modifikasi, atau akses tanpa izin.
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
              Kebijakan Pihak Ketiga:
            </Text>{' '}
            Kami berkomitmen penuh bahwa
            data pribadi Anda tidak akan pernah dijual, disewakan,
            dimanfaatkan untuk iklan komersial, atau dibagikan
            kepada pihak ketiga mana pun tanpa persetujuan
            eksplisit dari Anda.
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
              Kontrol Pengguna:
            </Text>{' '}
            Anda memegang hak penuh atas data
            Anda sendiri, termasuk hak untuk memperbarui informasi
            fisik atau menghapus akun beserta seluruh data di
            dalamnya kapan saja melalui menu pengaturan aplikasi.
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
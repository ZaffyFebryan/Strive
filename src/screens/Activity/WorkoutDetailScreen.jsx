import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// WORKOUT DETAIL SCREEN
// ============================================================

export default function WorkoutDetailScreen({
  navigation,
  route,
}) {

  // ============================================================
  // DATA VARIASI LATIHAN
  // ============================================================

  const exercise = route?.params?.exercise || {
    id: 1,
    name: 'Lat Pull Down',
    category: ['Back', 'Biceps'],

    image: require('../../../assets/tutoriallatpulldown.png'),

    description:
      'Lat pull down adalah gerakan latihan beban utama yang sangat efektif untuk membangun kekuatan dan melebarkan otot punggung Anda. Latihan ini meniru gerakan pull-up, namun memiliki tingkat keamanan yang jauh lebih tinggi dan beban yang lebih mudah disesuaikan bagi pengguna dewasa.',

    benefits: [
      'Membangun kekuatan dan melebarkan otot punggung secara efektif.',
      'Melatih otot bisep (lengan depan) dan bahu bagian belakang.',
      'Memperbaiki postur tubuh agar lebih tegap.',
    ],

    instructions: [
      {
        title: 'Posisi Duduk',
        description:
          'Duduk tegak di mesin, kunci paha Anda di bawah bantalan, lalu genggam stang bar sedikit lebih lebar dari bahu dengan telapak tangan menghadap ke depan.',
      },
      {
        title: 'Gerakan Menarik',
        description:
          'Tarik stang bar ke bawah menuju dada bagian atas sambil membusungkan dada Anda, lalu pastikan siku bergerak lurus mengarah ke lantai (bukan ke belakang).',
      },
      {
        title: 'Gerakan Kembali',
        description:
          'Lepaskan kembali stang bar ke atas secara perlahan dan terkontrol selama 2–3 detik untuk merasakan regangan maksimal pada otot punggung Anda.',
      },
    ],

    intensityGuide: [
      {
        title: 'Pemula',
        description:
          'Mulailah dengan beban ringan yang bisa digerakkan sebanyak 10–12 kali repetisi dalam 3 set.',
      },
      {
        title: 'Fokus',
        description:
          'Jaga agar gerakan tetap lambat dan terkontrol, jangan menghentak beban.',
      },
    ],

    warnings: [
      'Jangan menarik stang besi ke belakang leher karena berisiko tinggi mencederai sendi bahu dan leher.',
      'Bagi orang dewasa atau pengguna dengan riwayat cedera bahu, pilih beban yang tidak memicu nyeri persendian saat tangan lurus ke atas.',
      'Gunakan sabuk pengaman paha dengan rapat agar badan tidak terangkat saat menarik beban berat.',
    ],
  };


  // ============================================================
  // HANDLE BACK
  // ============================================================

  const handleBack = () => {
    navigation.goBack();
  };


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      {/* ======================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >

          <Feather
            name="chevron-left"
            size={30}
            color="#003F34"
          />

        </TouchableOpacity>


        <Text
          style={styles.headerTitle}
          numberOfLines={1}
        >
          {exercise.name}
        </Text>

      </View>


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ====================================================
            CATEGORY
        ==================================================== */}

        <View style={styles.categoryContainer}>

          {exercise.category.map((category, index) => (

            <View
              key={`${category}-${index}`}
              style={styles.categoryBadge}
            >

              <Text style={styles.categoryText}>
                {category}
              </Text>

            </View>

          ))}

        </View>


        {/* ====================================================
            VIDEO / IMAGE PANDUAN
        ==================================================== */}

        <Text style={styles.sectionTitle}>
          Video Panduan Gerakan
        </Text>


        <View style={styles.videoContainer}>

          <Image
            source={exercise.image}
            style={styles.videoImage}
            resizeMode="cover"
          />


          {/* PLAY BUTTON */}

          <View style={styles.playButton}>

            <Feather
              name="play"
              size={42}
              color="#FFFFFF"
              style={styles.playIcon}
            />

          </View>

        </View>


        {/* ====================================================
            DESKRIPSI VARIASI
        ==================================================== */}

        <Text style={styles.sectionTitle}>
          Deskripsi Variasi
        </Text>

        <Text style={styles.bodyText}>
          {exercise.description}
        </Text>


        {/* ====================================================
            MANFAAT LATIHAN
        ==================================================== */}

        <Text style={styles.sectionTitle}>
          Manfaat Latihan
        </Text>

        <View style={styles.numberedList}>

          {exercise.benefits.map((benefit, index) => (

            <View
              key={index}
              style={styles.listRow}
            >

              <Text style={styles.numberText}>
                {index + 1}.
              </Text>

              <Text style={styles.listText}>
                {benefit}
              </Text>

            </View>

          ))}

        </View>


        {/* ====================================================
            CARA MELAKUKAN GERAKAN
        ==================================================== */}

        <Text style={styles.sectionTitle}>
          Cara Melakukan Gerakan
        </Text>

        <View style={styles.numberedList}>

          {exercise.instructions.map((instruction, index) => (

            <View
              key={index}
              style={styles.listRow}
            >

              <Text style={styles.numberText}>
                {index + 1}.
              </Text>

              <Text style={styles.listText}>

                <Text style={styles.boldText}>
                  {instruction.title}:
                </Text>

                {' '}

                {instruction.description}

              </Text>

            </View>

          ))}

        </View>


        {/* ====================================================
            PANDUAN INTENSITAS
        ==================================================== */}

        <Text style={styles.sectionTitle}>
          Panduan Intensitas
        </Text>

        <View style={styles.bulletList}>

          {exercise.intensityGuide.map((item, index) => (

            <View
              key={index}
              style={styles.bulletRow}
            >

              <Text style={styles.bullet}>
                •
              </Text>

              <Text style={styles.bulletText}>

                <Text style={styles.boldText}>
                  {item.title}:
                </Text>

                {' '}

                {item.description}

              </Text>

            </View>

          ))}

        </View>


        {/* ====================================================
            PERINGATAN KEAMANAN
        ==================================================== */}

        <Text style={styles.sectionTitle}>
          Peringatan Keamanan
        </Text>

        <View style={styles.bulletList}>

          {exercise.warnings.map((warning, index) => (

            <View
              key={index}
              style={styles.bulletRow}
            >

              <Text style={styles.bullet}>
                •
              </Text>

              <Text style={styles.bulletText}>
                {warning}
              </Text>

            </View>

          ))}

        </View>


        {/* ====================================================
            BOTTOM SPACE
        ==================================================== */}

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
  // SAFE AREA
  // ==========================================================

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 64,

    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
    marginTop: 38,
  },

  backButton: {
    width: 38,
    height: 44,

    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    flex: 1,

    marginLeft: 8,

    fontSize: 24,
    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },


  // ==========================================================
  // CATEGORY
  // ==========================================================

  categoryContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,

    marginTop: 12,
    marginBottom: 28,
  },

  categoryBadge: {
    minWidth: 92,
    height: 36,

    paddingHorizontal: 20,

    borderRadius: 20,

    backgroundColor: '#62D5AE',

    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryText: {
    fontSize: 16,
    fontWeight: '500',

    color: '#003F34',
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    marginTop: 0,
    marginBottom: 14,

    fontSize: 20,
    lineHeight: 26,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // VIDEO / IMAGE
  // ==========================================================

  videoContainer: {
    width: '100%',
    height: 228,

    marginBottom: 26,

    borderRadius: 14,

    overflow: 'hidden',

    backgroundColor: '#111111',

    position: 'relative',
  },

  videoImage: {
    width: '100%',
    height: '100%',
  },

  playButton: {
    position: 'absolute',

    left: '50%',
    top: '50%',

    width: 68,
    height: 68,

    marginLeft: -34,
    marginTop: -34,

    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    marginLeft: 4,
  },


  // ==========================================================
  // BODY TEXT
  // ==========================================================

  bodyText: {
    marginBottom: 28,

    fontSize: 19,

    lineHeight: 29,

    color: '#315C54',
  },


  // ==========================================================
  // NUMBERED LIST
  // ==========================================================

  numberedList: {
    marginBottom: 28,
  },

  listRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginBottom: 4,
  },

  numberText: {
    width: 28,

    fontSize: 19,
    lineHeight: 29,

    color: '#315C54',
  },

  listText: {
    flex: 1,

    fontSize: 19,
    lineHeight: 29,

    color: '#315C54',
  },

  boldText: {
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // BULLET LIST
  // ==========================================================

  bulletList: {
    marginBottom: 28,
  },

  bulletRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginBottom: 5,
  },

  bullet: {
    width: 24,

    fontSize: 24,
    lineHeight: 28,

    color: '#315C54',

    textAlign: 'center',
  },

  bulletText: {
    flex: 1,

    fontSize: 19,
    lineHeight: 29,

    color: '#315C54',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 30,
  },

});
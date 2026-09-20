import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


// =====================================================
// COACH MARK
// =====================================================

export default function Coachmark({
  visible,
  step,
  onNext,
  onFinish,
}) {

  if (!visible) {
    return null;
  }


  // =====================================================
  // DATA TUTORIAL
  // =====================================================

  const tutorialData = [

    // =================================================
    // STEP 1 - BERANDA
    // =================================================

    {
      title: 'Selamat Datang di Strive!',
      description:
        'Pantau ringkasan aktivitas harian Anda, mulai dari target kalori, histori latihan terbaru, hingga kualitas tidur dalam satu halaman utama.',
      target: 'home',
    },


    // =================================================
    // STEP 2 - ARTIKEL
    // =================================================

    {
      title: 'Perkaya Wawasan Kebugaran Anda',
      description:
        'Temukan tips latihan beban yang aman, panduan nutrisi harian, hingga artikel seputar kesehatan otot dan pemulihan tubuh.',
      target: 'article',
    },


    // =================================================
    // STEP 3 - CATAT
    // =================================================

    {
      title: 'Mulai Catat Progress Anda!',
      description:
        'Ketuk tombol ini setiap kali Anda ingin mencatat sesi latihan beban, menambah hidangan makanan, dan memulai pemantauan tidur.',
      target: 'add',
    },


    // =================================================
    // STEP 4 - KOMUNITAS
    // =================================================

    {
      title: 'Temukan Teman Seperjuangan',
      description:
        'Bagikan pencapaian latihan Anda, berdiskusi seputar program olahraga bersama pengguna lain, dan saling dukung untuk menjaga konsistensi.',
      target: 'community',
    },


    // =================================================
    // STEP 5 - PROFIL
    // =================================================

    {
      title: 'Atur Target & Perangkat Anda',
      description:
        'Kelola informasi fisik Anda, pantauan konsistensi latihan, dan hubungkan wearable device Anda di sini.',
      target: 'profile',
    },


    // =================================================
    // STEP 6 - SELESAI
    // =================================================

    {
      title: 'Siap Menggunakan Strive?',
      description:
        'Sekarang Anda sudah siap menggunakan Strive untuk membantu menjaga konsistensi latihan, nutrisi, dan pola hidup sehat.',
      target: 'finish',
    },

  ];


  const currentTutorial = tutorialData[step];


  // =====================================================
  // TOTAL STEP
  // =====================================================

  const totalStep = tutorialData.length;


  // =====================================================
  // PROGRESS DOTS
  // =====================================================

  const renderDots = () => {

    return (

      <View style={styles.dotsContainer}>

        {tutorialData.map((_, index) => (

          <View
            key={index}
            style={[
              styles.dot,

              index === step
                ? styles.activeDot
                : styles.inactiveDot,
            ]}
          />

        ))}

      </View>

    );

  };


  // =====================================================
  // POSISI COACHMARK
  // =====================================================

  const getPositionStyle = () => {

    switch (currentTutorial.target) {


      // =================================================
      // STEP 1
      // =================================================

      case 'home':
        return {
          bottom: 118,
          left: 20,
          right: 20,
          pointerPosition: 'left',
        };


      // =================================================
      // STEP 2
      // =================================================

      case 'article':
        return {
          bottom: 118,
          left: 20,
          right: 20,
          pointerPosition: 'article',

        };


      // =================================================
      // STEP 3
      // =================================================

      case 'add':
        return {
          bottom: 118,
          left: 20,
          right: 20,
          pointerPosition: 'add',

        };


      // =================================================
      // STEP 4
      // =================================================

      case 'community':
        return {
          bottom: 118,
          left: 20,
          right: 20,
          pointerPosition: 'community',

        };


      // =================================================
      // STEP 5
      // =================================================

      case 'profile':
        return {
          bottom: 118,
          left: 20,
          right: 20,
          pointerPosition: 'profile',

        };


      // =================================================
      // STEP 6
      // =================================================

      case 'finish':
        return {
          bottom: 118,
          left: 20,
          right: 20,
          pointerPosition: 'none',
        };

      default:
        return {
          bottom: 118,
          left: 20,
          right: 20,
          pointerPosition: 'none',
        };
    }
  };


  const position = getPositionStyle();


  // =====================================================
  // NEXT
  // =====================================================

  const handleButtonPress = () => {
    if (step === totalStep - 1) {
      onFinish();
      return;
    }

    onNext();

  };


  // =====================================================
  // POINTER
  // =====================================================

  const renderPointer = () => {

    if (position.pointerPosition === 'none') {
      return null;
    }


    return (

      <View
        style={[
          styles.pointer,

          position.pointerPosition === 'left' &&
            styles.pointerLeft,

          position.pointerPosition === 'article' &&
            styles.pointerArticle,

          position.pointerPosition === 'add' &&
            styles.pointerAdd,

          position.pointerPosition === 'community' &&
            styles.pointerCommunity,

          position.pointerPosition === 'profile' &&
            styles.pointerProfile,

        ]}
      />

    );

  };


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <View
      style={styles.overlay}
      pointerEvents="box-none"
    >


      {/* =================================================
          DARK OVERLAY
      ================================================= */}

      <View
        style={styles.darkOverlay}
      />


      {/* =================================================
          COACHMARK CONTENT
      ================================================= */}

      <View
        style={[
          styles.contentWrapper,
          {
            bottom: position.bottom,
            left: position.left,
            right: position.right,
          },
        ]}
      >


        {/* =================================================
            DOTS
        ================================================= */}

        {renderDots()}


        {/* =================================================
            BUTTON LANJUT
        ================================================= */}

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleButtonPress}
          activeOpacity={0.8}
        >

          <Text style={styles.nextButtonText}>

            {step === totalStep - 1
              ? 'Saya Siap!'
              : 'Lanjut'}

          </Text>

        </TouchableOpacity>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <View style={styles.descriptionCard}>

          <Text style={styles.descriptionTitle}>
            {currentTutorial.title}
          </Text>


          <Text style={styles.descriptionText}>
            {currentTutorial.description}
          </Text>

        </View>


        {/* =================================================
            POINTER
        ================================================= */}

        {renderPointer()}

      </View>

    </View>

  );

}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // OVERLAY
  // ==========================================================

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 999,
  },


  // ==========================================================
  // DARK OVERLAY
  // ==========================================================

  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 138,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
  },


  // ==========================================================
  // CONTENT
  // ==========================================================

  contentWrapper: {
    position: 'absolute',
    width: 'auto',
    marginBottom: 56,
  },


  // ==========================================================
  // DOTS
  // ==========================================================

  dotsContainer: {
    height: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },


  dot: {
    height: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },


  activeDot: {
    width: 42,
    backgroundColor: '#62D6A8',
  },


  inactiveDot: {
    width: 6,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // NEXT BUTTON
  // ==========================================================

  nextButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#68DBA9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },


  nextButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#003125',
  },


  // ==========================================================
  // DESCRIPTION CARD
  // ==========================================================

  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 20,
    minHeight: 110,
  },


  descriptionTitle: {
    fontSize: 17,
    lineHeight: 18,
    fontWeight: '800',
    color: '#003125',
    marginBottom: 7,
  },


  descriptionText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    color: '#145548',
  },


  // ==========================================================
  // POINTER
  // ==========================================================

  pointer: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    bottom: -24,
  },


  // ==========================================================
  // POINTER BERANDA
  // ==========================================================

  pointerLeft: {
    left: 15,
  },


  // ==========================================================
  // POINTER ARTIKEL
  // ==========================================================

  pointerArticle: {
    left: '26%',
  },


  // ==========================================================
  // POINTER CATAT
  // ==========================================================

  pointerAdd: {
    left: '50%',
    marginLeft: -12,
  },


  // ==========================================================
  // POINTER KOMUNITAS
  // ==========================================================

  pointerCommunity: {
    left: '67%',
  },


  // ==========================================================
  // POINTER PROFIL
  // ==========================================================

  pointerProfile: {
    right: 15,
  },

});
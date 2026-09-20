import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    image: require('../../../assets/OP1.png'),
    title: 'Mulai lebih sehat, sesuai ritme Anda',
    description:
      'Dapatkan panduan latihan dan nutrisi yang disesuaikan dengan tujuan serta perkembangan Anda.',
  },
  {
    id: '2',
    image: require('../../../assets/OP2.png'),
    title: 'Latihan beban yang lebih terarah',
    description:
      'Pilih program latihan beban sesuai tujuan, kemampuan, dan jadwal yang Anda miliki.',
  },
  {
    id: '3',
    image: require('../../../assets/OP3.png'),
    title: 'Pantau asupan dengan lebih mudah',
    description:
      'Catat makanan dan lihat kebutuhan kalori, protein, serta nutrisi harian Anda dalam satu tempat.',
  },
  {
    id: '4',
    image: require('../../../assets/OP4.png'),
    title: 'Lihat perkembangan secara berkala',
    description:
      'Pantau riwayat latihan, asupan nutrisi, dan pencapaian untuk menjaga konsistensi Anda.',
  },
  {
    id: '5',
    image: require('../../../assets/OP5.png'),
    title: 'Bangun kebiasaan sehat secara konsisten',
    description:
      'Tetapkan target yang realistis dan mulai langkah kecil menuju kebugaran yang lebih baik.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const index = viewableItems[0].index;

      if (index !== null && index !== undefined) {
        setCurrentIndex(index);
      }
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace('Register');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
  navigation.replace('Register');
  };

  const renderItem = ({ item }) => {
    const isFirstPage = currentIndex === 0;
    const isLastPage = currentIndex === onboardingData.length - 1;

    return (
      <View style={styles.page}>
        <ImageBackground
          source={item.image}
          style={styles.backgroundImage}
          imageStyle={styles.image}
        >
          <View style={styles.darkOverlay} />

          <LinearGradient
            colors={[
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.15)',
              'rgba(0,0,0,0.60)',
              'rgba(0,0,0,0.92)',
            ]}
            locations={[0, 0.35, 0.65, 1]}
            style={StyleSheet.absoluteFill}
          />

          <SafeAreaView
            style={styles.safeArea}
            edges={['top', 'bottom']}
          >
            {/* ================= HEADER ================= */}

            <View style={styles.header}>
              <Image
                source={require('../../../assets/Logo.png')}
                style={styles.logo}
              />

              {!isLastPage && (
                <TouchableOpacity
                  onPress={handleSkip}
                  activeOpacity={0.7}
                >
                  <Text style={styles.skipText}>
                    Lewati
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* ================= CONTENT ================= */}

            <View style={styles.content}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              {/* ================= BOTTOM ROW ================= */}

              <View style={styles.bottomRow}>

                {/* LEFT SIDE */}

                <View style={styles.leftBottom}>
                  {!isFirstPage && (
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={handleBack}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={require('../../../assets/Panah-Kiri.png')}
                        style={styles.arrowIcon}
                      />
                    </TouchableOpacity>
                  )}

                  {/* PAGINATION */}
                  <View
                    style={[
                      styles.indicatorContainer,
                      currentIndex > 0 && styles.indicatorCentered,
                    ]}
                  >
                    {onboardingData.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          currentIndex === index && styles.activeDot,
                        ]}
                      />
                    ))}
                  </View>
                </View>

                {/* RIGHT SIDE */}

                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    isLastPage && styles.startButton,
                  ]}
                  onPress={handleNext}
                  activeOpacity={0.8}
                >
                  {isLastPage ? (
                    <Text style={styles.startText}>
                      Mulai
                    </Text>
                  ) : (
                    <Image
                      source={require('../../../assets/Panah-Kanan.png')}
                      style={styles.arrowIcon}
                    />
                  )}
                </TouchableOpacity>

              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  // =====================================================
  // CONTAINER
  // =====================================================

  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  page: {
    width: width,
    height: height,
  },

  backgroundImage: {
    flex: 1,
  },

  image: {
    resizeMode: 'cover',
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // =====================================================
  // HEADER
  // =====================================================

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 48,
  },

  logo: {
    width: 52,
    height: 32,
    resizeMode: 'contain',
  },

  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },

  // =====================================================
  // CONTENT
  // =====================================================

  content: {
    flex: 1,
    justifyContent: 'flex-end',

    paddingBottom: 18,
  },

  title: {
    color: '#FFFFFF',

    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600',

    marginBottom: 24,

    maxWidth: '92%',
  },

  description: {
    color: '#E6E6E6',

    fontSize: 19,
    lineHeight: 28,
    fontWeight: '300',

    marginBottom: 26,

    maxWidth: '96%',
  },

  // =====================================================
  // BOTTOM ROW
  // =====================================================

  bottomRow: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    position: 'relative',
  },

  leftBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  // =====================================================
  // PAGINATION
  // =====================================================

  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  indicatorCentered: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -26 }],
  },

  indicatorWithBack: {
    marginLeft: 18,
  },

  dot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: '#FFFFFF',
    opacity: 0.95,

    marginRight: 5,
  },

  activeDot: {
    width: 58,

    backgroundColor: '#56E39F',

    opacity: 1,
  },

  // =====================================================
  // BACK BUTTON
  // =====================================================

  backButton: {
    width: 64,
    height: 64,

    borderRadius: 36,

    borderWidth: 1.5,
    borderColor: '#56E39F',

    justifyContent: 'center',
    alignItems: 'center',
  },

  // =====================================================
  // ARROW ICON
  // =====================================================

  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  // =====================================================
  // NEXT BUTTON
  // =====================================================

  nextButton: {
    width: 66,
    height: 66,

    borderRadius: 36,

    backgroundColor: '#56E39F',

    justifyContent: 'center',
    alignItems: 'center',
  },

  // =====================================================
  // LAST PAGE
  // =====================================================

  startButton: {
    width: 116,
    height: 56,

    borderRadius: 30,
  },

  startText: {
    color: '#000000',
    fontSize: 19,
    fontWeight: '600',
  },

});
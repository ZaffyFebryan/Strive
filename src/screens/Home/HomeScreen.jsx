import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Circle, Svg } from 'react-native-svg';

import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomNavigation from '../../components/navigation/BottomNavigation';
import AddActivitySheet from '../../components/activity/AddActivitySheet';
import Coachmark from '../../components/tutorial/CoachMark';


// =====================================================
// HOME SCREEN
// =====================================================

export default function HomeScreen({ navigation }) {


  // =====================================================
  // STATE
  // =====================================================

  const [showAddActivity, setShowAddActivity] = useState(false);

  const [showCoachmark, setShowCoachmark] = useState(false);

  const [coachmarkStep, setCoachmarkStep] = useState(0);

  const [checkingCoachmark, setCheckingCoachmark] = useState(true);


  // =====================================================
  // CEK STATUS COACHMARK
  // =====================================================

  useEffect(() => {

    const checkCoachmarkStatus = async () => {

      try {

        const tutorialCompleted =
          await AsyncStorage.getItem(
            'coachmark_completed'
          );


        // =================================================
        // JIKA TUTORIAL BELUM PERNAH SELESAI
        // =================================================

        if (tutorialCompleted !== 'true') {

          setShowCoachmark(true);

        }

      } catch (error) {

        console.log(
          'Gagal membaca status coachmark:',
          error
        );

        // Jika terjadi error,
        // tutorial tetap ditampilkan

        setShowCoachmark(true);

      } finally {

        setCheckingCoachmark(false);

      }

    };


    checkCoachmarkStatus();

  }, []);


  // =====================================================
  // CATAT
  // =====================================================

  const handleOpenAddActivity = () => {

    setShowAddActivity(true);

  };


  const handleCloseAddActivity = () => {

    setShowAddActivity(false);

  };


  // =====================================================
  // COACHMARK - NEXT
  // =====================================================

  const handleCoachmarkNext = () => {

    setCoachmarkStep(
      (previousStep) => previousStep + 1
    );

  };


  // =====================================================
  // COACHMARK - FINISH
  // =====================================================

  const handleCoachmarkFinish = async () => {

    try {

      // Simpan status tutorial
      await AsyncStorage.setItem(
        'coachmark_completed',
        'true'
      );

    } catch (error) {

      console.log(
        'Gagal menyimpan status coachmark:',
        error
      );

    }


    // Tutup tutorial

    setShowCoachmark(false);


    // Reset step

    setCoachmarkStep(0);

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* =================================================
          HEADER
          TIDAK IKUT SCROLL
      ================================================= */}

      <View style={styles.header}>

        <View style={styles.profileContainer}>


          {/* =================================================
              FOTO PROFIL
          ================================================= */}

          <View style={styles.profileImageContainer}>

            <Image
              source={require('../../../assets/Foto-Profil.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />

          </View>


          {/* =================================================
              NAMA USER
          ================================================= */}

          <View>

            <Text style={styles.greeting}>
              Selamat pagi!
            </Text>

            <Text style={styles.userName}>
              Andi Pratama
            </Text>

          </View>

        </View>


        {/* =================================================
            HEADER ACTIONS
        ================================================= */}

        <View style={styles.headerActions}>


          {/* =================================================
              NOTIFICATION
          ================================================= */}

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() =>
              navigation.navigate('Notification')
            }
            activeOpacity={0.7}
          >

            <Image
              source={require('../../../assets/Notif.png')}
              style={styles.headerIcon}
              resizeMode="contain"
            />

          </TouchableOpacity>

        </View>

      </View>


      {/* =================================================
          CONTENT BERANDA
          BAGIAN INI YANG SCROLL
      ================================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >


        {/* =================================================
            AKTIVITAS HARI INI
        ================================================= */}

        <View style={styles.todayCard}>

          <Text style={styles.todayTitle}>
            Aktivitas hari ini
          </Text>


          <View style={styles.todayContent}>

            <View style={styles.activityList}>


              {/* =================================================
                  MAKAN PAGI
              ================================================= */}

              <View style={styles.activityRow}>

                <Image
                  source={require('../../../assets/centang.png')}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />

                <Text style={styles.activityDone}>
                  Makan pagi
                </Text>

              </View>


              {/* =================================================
                  MAKAN SIANG
              ================================================= */}

              <View style={styles.activityRow}>

                <Image
                  source={require('../../../assets/Seru.png')}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />

                <Text style={styles.activityPending}>
                  Makan siang
                </Text>

              </View>


              {/* =================================================
                  MAKAN MALAM
              ================================================= */}

              <View style={styles.activityRow}>

                <Image
                  source={require('../../../assets/Seru.png')}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />

                <Text style={styles.activityPending}>
                  Makan malam
                </Text>

              </View>


              {/* =================================================
                  LATIHAN BEBAN
              ================================================= */}

              <View style={styles.activityRow}>

                <Image
                  source={require('../../../assets/Seru.png')}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />

                <Text style={styles.activityPending}>
                  Latihan beban
                </Text>

              </View>

            </View>


            {/* =================================================
                PROGRESS 25%
            ================================================= */}

            <View style={styles.progressCircle}>

              <Svg
                width={120}
                height={120}
                viewBox="0 0 120 120"
              >

                {/* LINGKARAN DASAR */}

                <Circle
                  cx="60"
                  cy="60"
                  r="47"
                  stroke="#237C69"
                  strokeWidth="18"
                  fill="none"
                />


                {/* LINGKARAN PROGRESS */}

                <Circle
                  cx="60"
                  cy="60"
                  r="47"
                  stroke="#003F34"
                  strokeWidth="18"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 47}`}
                  strokeDashoffset={`${2 * Math.PI * 47 * (1 - 0.25)}`}
                  strokeLinecap="round"
                  rotation="-90"
                  origin="60, 60"
                />

              </Svg>


              {/* ANGKA */}

              <View style={styles.progressCircleCenter}>

                <Text style={styles.progressPercentage}>
                  25%
                </Text>

              </View>

            </View>

          </View>


          {/* =================================================
              QUOTE
          ================================================= */}

          <View style={styles.quoteContainer}>

            <Text style={styles.quote}>
              “ Latihan hari ini adalah investasi
              {'\n'}
              tubuh di masa depan ”
            </Text>

          </View>

        </View>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <View style={styles.progressCard}>

          <View style={styles.cardHeader}>

            <Text style={styles.cardTitle}>
              Progress
            </Text>


            <TouchableOpacity
              style={styles.weekButton}
              activeOpacity={0.8}
            >

              <Text style={styles.weekText}>
                Minggu Ini
              </Text>


              <Image
                source={require('../../../assets/panah-bawah-baru.png')}
                style={styles.weekIcon}
                resizeMode="contain"
              />

            </TouchableOpacity>

          </View>


          {/* =================================================
              GRAFIK
          ================================================= */}

          <View style={styles.chartContainer}>

            <Image
              source={require('../../../assets/grafik.png')}
              style={styles.progressChart}
              resizeMode="contain"
            />

          </View>

        </View>


        {/* =================================================
            LATIHAN BEBAN
        ================================================= */}

        <View style={styles.contentCard}>

          <View style={styles.recommendationBadge}>

            <Image
              source={require('../../../assets/petir.png')}
              style={styles.recommendationIcon}
              resizeMode="contain"
            />

            <Text style={styles.recommendationText}>
              Rekomendasi Latihan
            </Text>

          </View>


          <Text style={styles.sectionTitle}>
            Latihan beban
          </Text>


          <Text style={styles.description}>
            Punggung, Bisep

            <Text style={styles.descriptionGreen}>
              {' '}• Estimasi 320 kkal
            </Text>
          </Text>


          <View style={styles.statusRow}>

            <Image
              source={require('../../../assets/titik-abu.png')}
              style={styles.statusIcon}
              resizeMode="contain"
            />

            <Text style={styles.statusText}>
              Belum dimulai
            </Text>

          </View>


          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Workout')}
            activeOpacity={0.8}
          >

            <Text style={styles.primaryButtonText}>
              Latihan sekarang
            </Text>


            <View style={styles.arrowButton}>

              <Image
                source={require('../../../assets/panah-kanan-baru.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />

            </View>

          </TouchableOpacity>

        </View>


        {/* =================================================
            RIWAYAT LATIHAN
        ================================================= */}

        <View style={styles.historyCard}>

          <Text style={styles.sectionTitle}>
            Riwayat Latihan beban
          </Text>


          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('WorkoutHistory')}
            activeOpacity={0.8}
          >

            <Text style={styles.primaryButtonText}>
              Lihat riwayat latihan
            </Text>


            <View style={styles.arrowButton}>

              <Image
                source={require('../../../assets/panah-kanan-baru.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />

            </View>

          </TouchableOpacity>

        </View>


        {/* =================================================
            NUTRISI
        ================================================= */}

        <View style={styles.contentCard}>

          <View style={styles.recommendationBadge}>

            <Image
              source={require('../../../assets/petir.png')}
              style={styles.recommendationIcon}
              resizeMode="contain"
            />

            <Text style={styles.recommendationText}>
              Rekomendasi Nutrisi
            </Text>

          </View>


          <Text style={styles.sectionTitle}>
            Nutrisi
          </Text>


          <View style={styles.statusRow}>

            <Image
              source={require('../../../assets/titik-merah.png')}
              style={styles.statusIcon}
              resizeMode="contain"
            />

            <Text style={styles.nutritionStatus}>
              Belum tercapai
            </Text>

          </View>


          <View style={styles.calorieRow}>

            <Text style={styles.calorieLabel}>
              Kalori
            </Text>

            <Text style={styles.calorieValue}>
              1.880 / 2.360
            </Text>

          </View>


          <View style={styles.calorieBar}>

            <View style={styles.calorieProgress} />

          </View>


          <View style={styles.nutritionRow}>

            <View style={styles.proteinnutritionBox}>

              <Text style={styles.nutritionLabel}>
                Protein
              </Text>

              <Text style={styles.nutritionValue}>
                93g
              </Text>

            </View>


            <View style={styles.karbonutritionBox}>

              <Text style={styles.nutritionLabel}>
                Karbo
              </Text>

              <Text style={styles.nutritionValue}>
                145g
              </Text>

            </View>


            <View style={styles.seratnutritionBox}>

              <Text style={styles.nutritionLabel}>
                Serat
              </Text>

              <Text style={styles.nutritionValue}>
                38g
              </Text>

            </View>

          </View>


          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Nutrition')}
            activeOpacity={0.8}
          >

            <Text style={styles.primaryButtonText}>
              Cek detail nutrisi
            </Text>


            <View style={styles.arrowButton}>

              <Image
                source={require('../../../assets/panah-kanan-baru.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />

            </View>

          </TouchableOpacity>

        </View>


        {/* =================================================
            RIWAYAT NUTRISI
        ================================================= */}

        <View style={styles.historyCard}>

          <Text style={styles.sectionTitle}>
            Riwayat Nutrisi
          </Text>


          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('RiwayatNutrisi')}
            activeOpacity={0.8}
          >

            <Text style={styles.primaryButtonText}>
              Lihat riwayat nutrisi
            </Text>


            <View style={styles.arrowButton}>

              <Image
                source={require('../../../assets/panah-kanan-baru.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />

            </View>

          </TouchableOpacity>

        </View>

      </ScrollView>


      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <BottomNavigation
        activeTab="home"
        navigation={navigation}
        onPressAdd={handleOpenAddActivity}
      />


      {/* =================================================
          ADD ACTIVITY SHEET
      ================================================= */}

      <AddActivitySheet
        visible={showAddActivity}
        onClose={handleCloseAddActivity}
      />


      {/* =================================================
          TUTORIAL COACHMARK
      ================================================= */}

      {!checkingCoachmark && (

        <Coachmark
          visible={showCoachmark}
          step={coachmarkStep}
          onNext={handleCoachmarkNext}
          onFinish={handleCoachmarkFinish}
        />

      )}

    </SafeAreaView>

  );

}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // =====================================================
  // SCREEN
  // =====================================================

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  // =====================================================
  // SCROLL CONTENT
  // =====================================================

  scrollContent: {
    paddingTop: 20,
    paddingBottom: 160,
  },


  // =====================================================
  // HEADER
  // =====================================================

  header: {
    height: 96,
    marginTop: 40,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8DA',
    backgroundColor: '#FFFFFF',
  },


  // =====================================================
  // PROFILE
  // =====================================================

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  profileImageContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#D8E6E2',
    marginRight: 12,
    overflow: 'hidden',
  },


  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },


  greeting: {
    fontSize: 17,
    color: '#929399',
  },


  userName: {
    marginTop: -1,
    fontSize: 19,
    fontWeight: '800',
    color: '#003125',
  },


  // =====================================================
  // HEADER ACTIONS
  // =====================================================

  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },


  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 32,
    backgroundColor: '#EAF3F0',
    alignItems: 'center',
    justifyContent: 'center',
  },


  headerIcon: {
    width: 22,
    height: 22,
  },


  // =====================================================
  // AKTIVITAS HARI INI
  // =====================================================

  todayCard: {
    marginHorizontal: 24,
    marginTop: 20,
    padding: 20,
    borderRadius: 17,
    backgroundColor: '#63D6AA',
  },


  todayTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003125',
  },


  todayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },


  activityList: {
    flex: 1,
  },


  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },


  activityIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },


  activityDone: {
    fontSize: 17,
    lineHeight: 24,
    color: '#003125',
  },


  activityPending: {
    fontSize: 17,
    lineHeight: 24,
    color: '#418B73',
  },


  // =====================================================
  // PROGRESS CIRCLE
  // =====================================================

  progressCircle: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },


  progressCircleCenter: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#63D6AA',
    alignItems: 'center',
    justifyContent: 'center',
  },


  progressPercentage: {
    fontSize: 23,
    fontWeight: '700',
    color: '#003125',
  },


  // =====================================================
  // QUOTE
  // =====================================================

  quoteContainer: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#EAF3F0',
  },


  quote: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600',
    color: '#003125',
    textAlign: 'left',
  },


  // =====================================================
  // PROGRESS
  // =====================================================

  progressCard: {
    marginHorizontal: 24,
    marginTop: 14,
    padding: 24,
    borderRadius: 17,
    backgroundColor: '#EFFAF6',
  },


  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003125',
    marginBottom: 16,
  },


  weekButton: {
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#003F34',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },


  weekText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
    color: '#FFFFFF',
  },


  weekIcon: {
    width: 17,
    height: 17,
  },


  // =====================================================
  // GRAPH
  // =====================================================

  chartContainer: {
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },


  progressChart: {
    width: '100%',
    height: '100%',
  },


  // =====================================================
  // CONTENT CARD
  // =====================================================

  contentCard: {
    marginHorizontal: 24,
    marginTop: 14,
    padding: 20,
    borderRadius: 17,
    backgroundColor: '#F7F7F7',
  },


  // =====================================================
  // HISTORY CARD
  // =====================================================

  historyCard: {
    marginHorizontal: 24,
    marginTop: 14,
    padding: 20,
    borderRadius: 17,
    backgroundColor: '#EFFAF6',
  },


  // =====================================================
  // RECOMMENDATION BADGE
  // =====================================================

  recommendationBadge: {
    alignSelf: 'flex-end',
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 32,
    backgroundColor: '#003F34',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 45,
  },


  recommendationIcon: {
    width: 16,
    height: 16,
  },


  recommendationText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 6,
    marginRight: 6,
  },


  // =====================================================
  // SECTION TITLE
  // =====================================================

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003125',
  },


  description: {
    marginTop: 5,
    fontSize: 17,
    color: '#3B917D',
  },


  descriptionGreen: {
    color: '#3B917D',
  },


  // =====================================================
  // STATUS
  // =====================================================

  statusRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },


  statusIcon: {
    width: 15,
    height: 15,
    marginRight: 7,
  },


  statusText: {
    fontSize: 17,
    color: '#777777',
  },


  nutritionStatus: {
    fontSize: 15,
    color: '#E94D50',
  },


  // =====================================================
  // NUTRITION
  // =====================================================

  calorieRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  calorieLabel: {
    fontSize: 17,
    color: '#3B917D',
  },


  calorieValue: {
    fontSize: 17,
    color: '#777777',
  },


  calorieBar: {
    height: 9,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#D8D8D8',
    overflow: 'hidden',
  },


  calorieProgress: {
    width: '80%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#003F34',
  },


  nutritionRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
  },


  proteinnutritionBox: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#699F92',
    backgroundColor: '#E9F1EF',
    borderRadius: 9,
    alignItems: 'center',
  },


  karbonutritionBox: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#A69254',
    backgroundColor: '#F2EFE6',
    borderRadius: 9,
    alignItems: 'center',
  },


  seratnutritionBox: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#9AE7C5',
    backgroundColor: '#F0FBF6',
    borderRadius: 9,
    alignItems: 'center',
  },


  nutritionLabel: {
    fontSize: 14,
    color: '#466A63',
  },


  nutritionValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#003125',
  },


  // =====================================================
  // SLEEP
  // =====================================================

  sleepBadge: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#003F34',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 45,
  },


  sleepBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },


  sleepIcon: {
    width: 16,
    height: 16,
  },


  sleepText: {
    marginTop: 5,
    fontSize: 17,
    color: '#3B917D',
  },


  // =====================================================
  // PRIMARY BUTTON
  // =====================================================

  primaryButton: {
    height: 60,
    marginTop: 18,
    paddingLeft: 20,
    paddingRight: 12,
    borderRadius: 32,
    backgroundColor: '#1F6F5C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
  },


  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#003125',
    alignItems: 'center',
    justifyContent: 'center',
  },


  arrowIcon: {
    width: 24,
    height: 24,
  },

});
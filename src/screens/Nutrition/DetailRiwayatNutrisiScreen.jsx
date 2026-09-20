import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// DETAIL RIWAYAT NUTRISI SCREEN
// ============================================================

export default function DetailRiwayatNutrisiScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // DATA RIWAYAT
  // ==========================================================

  /*
    Data ini dibuat sebagai contoh sesuai tampilan screenshot.

    Jika nanti halaman Riwayat Nutrisi mengirim data melalui
    route.params, data tersebut bisa digunakan di sini.
  */

  const historyData = route?.params?.data || {

    date: '20 Juli 2026',

    status: 'Tercapai',

    calories: {
      current: '2.360',
      target: '2.360',
    },

    protein: {
      current: '105',
      target: '105',
    },

    fiber: {
      current: '52',
      target: '52',
    },

    carbohydrate: {
      current: '396',
      target: '396',
    },

  };


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // GO TO LATIHAN BEBAN
  // ==========================================================

  const handleWeightTraining = () => {

    navigation.navigate('LatihanBeban');

  };


  // ==========================================================
  // RENDER NUTRITION CIRCLE
  // ==========================================================

  const renderNutritionCircle = () => {

    return (

      <View style={styles.circleWrapper}>

        {/* ==================================================
            OUTER CIRCLE
        ================================================== */}

        <View style={styles.circleOuter}>

          {/* ==================================================
              SECOND CIRCLE
          ================================================== */}

          <View style={styles.circleSecond}>

            {/* ==================================================
                THIRD CIRCLE
            ================================================== */}

            <View style={styles.circleThird}>

              {/* ==================================================
                  INNER CIRCLE
              ================================================== */}

              <View style={styles.circleInner}>

                <View
                  style={
                    styles.circleInnerCenter
                  }
                />

              </View>

            </View>

          </View>

        </View>

      </View>

    );

  };


  // ==========================================================
  // RENDER STATUS
  // ==========================================================

  const renderStatus = () => {

    return (

      <View style={styles.statusRow}>

        <View style={styles.statusDot} />

        <Text style={styles.statusText}>
          {historyData.status}
        </Text>

      </View>

    );

  };


  // ==========================================================
  // RENDER NUTRITION CARD
  // ==========================================================

  const renderNutritionCard = () => {

    return (

      <View style={styles.nutritionCard}>

        {/* ==================================================
            CIRCLE
        ================================================== */}

        {renderNutritionCircle()}


        {/* ==================================================
            STATUS
        ================================================== */}

        {renderStatus()}


        {/* ==================================================
            NUTRITION VALUES
        ================================================== */}

        <View style={styles.nutritionGrid}>

          {/* ==================================================
              KALORI
          ================================================== */}

          <View
            style={[
              styles.nutritionBox,
              styles.calorieBox,
            ]}
          >

            <Text style={styles.nutritionLabel}>
              Kalori
            </Text>

            <Text style={styles.nutritionValue}>
              {historyData.calories.current}
              {' / '}
              {historyData.calories.target}
              g
            </Text>

          </View>


          {/* ==================================================
              PROTEIN
          ================================================== */}

          <View
            style={[
              styles.nutritionBox,
              styles.proteinBox,
            ]}
          >

            <Text style={styles.nutritionLabel}>
              Protein
            </Text>

            <Text style={styles.nutritionValue}>
              {historyData.protein.current}
              {' / '}
              {historyData.protein.target}
              g
            </Text>

          </View>


          {/* ==================================================
              SERAT
          ================================================== */}

          <View
            style={[
              styles.nutritionBox,
              styles.fiberBox,
            ]}
          >

            <Text style={styles.nutritionLabel}>
              Serat
            </Text>

            <Text style={styles.nutritionValue}>
              {historyData.fiber.current}
              {' / '}
              {historyData.fiber.target}
              g
            </Text>

          </View>


          {/* ==================================================
              KARBOHIDRAT
          ================================================== */}

          <View
            style={[
              styles.nutritionBox,
              styles.carbohydrateBox,
            ]}
          >

            <Text style={styles.nutritionLabel}>
              Karbohidrat
            </Text>

            <Text style={styles.nutritionValue}>
              {historyData.carbohydrate.current}
              {' / '}
              {historyData.carbohydrate.target}
              g
            </Text>

          </View>

        </View>

      </View>

    );

  };


  // ==========================================================
  // RENDER RECOMMENDATION CARD
  // ==========================================================

  const renderRecommendationCard = () => {

    return (

      <View style={styles.recommendationCard}>

        {/* ==================================================
            TEXT
        ================================================== */}

        <Text style={styles.recommendationTitle}>
          Kebutuhan kalorimu sudah memenuhi target.
        </Text>


        <Text style={styles.recommendationDescription}>
          Jangan lupa lanjutkan dengan latihan beban
          untuk membantu menjaga dan membangun massa ototmu.
        </Text>


        {/* ==================================================
            BUTTON
        ================================================== */}

        <TouchableOpacity
          style={styles.trainingButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Workout')}
        >

          <Text style={styles.trainingButtonText}>
            Latihan beban
          </Text>


          <View style={styles.trainingButtonIcon}>

            <Feather
              name="arrow-right"
              size={21}
              color="#FFFFFF"
            />

          </View>

        </TouchableOpacity>

      </View>

    );

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={handleBack}
        >

          <Feather
            name="chevron-left"
            size={30}
            color="#003F34"
          />

        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Riwayat Nutrisi
        </Text>

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >

        {/* ==================================================
            DATE
        ================================================== */}

        <Text style={styles.dateText}>
          {historyData.date}
        </Text>


        {/* ==================================================
            NUTRITION CARD
        ================================================== */}

        {renderNutritionCard()}


        {/* ==================================================
            RECOMMENDATION
        ================================================== */}

        {renderRecommendationCard()}


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

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
  // GENERAL
  // ==========================================================

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 80,
    marginTop: 32,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
  },

  backButton: {
    width: 40,
    height: 45,
    justifyContent: 'center',
    marginRight: 14,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // DATE
  // ==========================================================

  dateText: {
    marginTop: 27,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // NUTRITION CARD
  // ==========================================================

  nutritionCard: {
    marginTop: 18,
    marginHorizontal: 20,
    minHeight: 430,
    paddingTop: 24,
    paddingBottom: 33,
    paddingHorizontal: 20,
    borderRadius: 17,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },


  // ==========================================================
  // NUTRITION CIRCLE
  // ==========================================================

  circleWrapper: {
    height: 175,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleOuter: {
    width: 165,
    height: 165,
    borderRadius: 83,
    backgroundColor: '#244F45',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleSecond: {
    width: 133,
    height: 133,
    borderRadius: 67,
    backgroundColor: '#6E9F7B',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleThird: {
    width: 101,
    height: 101,
    borderRadius: 51,
    backgroundColor: '#D6BA72',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleInner: {
    width: 69,
    height: 69,
    borderRadius: 35,
    backgroundColor: '#4D8782',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleInnerCenter: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#E8ECEA',
  },


  // ==========================================================
  // STATUS
  // ==========================================================

  statusRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
  },

  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#247D68',
    marginRight: 16,
  },

  statusText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#247D68',
  },


  // ==========================================================
  // NUTRITION GRID
  // ==========================================================

  nutritionGrid: {
    marginTop: 17,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },


  // ==========================================================
  // NUTRITION BOX
  // ==========================================================

  nutritionBox: {
    height: 72,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  calorieBox: {
    width: '53%',
    backgroundColor: '#244F45',
    borderColor: '#244F45',
  },

  proteinBox: {
    width: '45%',
    backgroundColor: '#B0D2B2',
    borderColor: '#4D9673',
  },

  fiberBox: {
    width: '44%',
    backgroundColor: '#9AC1C0',
    borderColor: '#257E7D',
  },

  carbohydrateBox: {
    width: '54%',
    backgroundColor: '#E7D59B',
    borderColor: '#A58724',
  },

  nutritionLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#183E38',
  },

  nutritionValue: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: '700',
    color: '#183E38',
  },

  calorieBox: {
    width: '53%',
    backgroundColor: '#68DBA9',
    borderColor: '#257d57',
  },

  calorieBoxText: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // RECOMMENDATION CARD
  // ==========================================================

  recommendationCard: {
    marginTop: 18,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 22,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
  },

  recommendationTitle: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: '700',
    color: '#003F34',
  },

  recommendationDescription: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '400',
    color: '#28554C',
  },


  // ==========================================================
  // TRAINING BUTTON
  // ==========================================================

  trainingButton: {
    marginTop: 18,
    height: 60,
    borderRadius: 30,
    paddingLeft: 22,
    paddingRight: 8,
    backgroundColor: '#237A67',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  trainingButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  trainingButtonIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: '#005546',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomSpace: {
    height: 35,
  },

});
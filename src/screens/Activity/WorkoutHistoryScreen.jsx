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
// DETAIL WORKOUT HISTORY SCREEN
// ============================================================

export default function DetailWorkoutHistoryScreen({
  navigation,
  route,
}) {


  // ==========================================================
  // DATA RIWAYAT
  // ==========================================================

  const workoutData = {

    date:
      route?.params?.date ||
      '22 Juni 2026',

    workoutName:
      'Pull Day',

    muscleGroup:
      'Punggung dan Bisep',

    calories:
      322,

    heartRate:
      125,

    duration:
      '49:42',

    totalVariation:
      '8/8',

  };


  // ==========================================================
  // DATA EXERCISE
  // ==========================================================

  const exercises = [

    {
      id: 1,

      name:
        'Lat Pulldown',

      category:
        'Back',

      image:
        require('../../../assets/latpulldown.png'),

      graph:
        require('../../../assets/grafikriwayatlatihan.png'),

      sets: [

        {
          set: '1',
          kg: '35',
          reps: '12',
          rpe: '7',
        },

        {
          set: '2',
          kg: '40',
          reps: '12',
          rpe: '8',
        },

        {
          set: '3',
          kg: '45',
          reps: '8',
          rpe: '6',
        },

      ],
    },


    {
      id: 2,

      name:
        'Pull Up',

      category:
        'Back',

      image:
        require('../../../assets/pullup.png'),

      graph:
        require('../../../assets/grafikriwayatlatihan.png'),

      sets: [

        {
          set: '1',
          kg: '35',
          reps: '12',
          rpe: '7',
        },

        {
          set: '2',
          kg: '40',
          reps: '12',
          rpe: '8',
        },

        {
          set: '3',
          kg: '45',
          reps: '8',
          rpe: '6',
        },

      ],
    },


    {
      id: 3,

      name:
        'Barbell Row',

      category:
        'Back',

      image:
        require('../../../assets/barbellrow.png'),

      graph:
        require('../../../assets/grafikriwayatlatihan.png'),

      sets: [

        {
          set: '1',
          kg: '35',
          reps: '12',
          rpe: '7',
        },

        {
          set: '2',
          kg: '40',
          reps: '10',
          rpe: '8',
        },

        {
          set: '3',
          kg: '45',
          reps: '8',
          rpe: '7',
        },

      ],
    },


    {
      id: 4,

      name:
        'Incline Dumbell Row',

      category:
        'Biceps',

      image:
        require('../../../assets/inclinedumbellrow.png'),

      graph:
        require('../../../assets/grafikriwayatlatihan.png'),

      sets: [

        {
          set: '1',
          kg: '12',
          reps: '12',
          rpe: '7',
        },

        {
          set: '2',
          kg: '14',
          reps: '10',
          rpe: '8',
        },

        {
          set: '3',
          kg: '16',
          reps: '8',
          rpe: '7',
        },

      ],
    },


    {
      id: 5,

      name:
        'Preacher Curl',

      category:
        'Biceps',

      image:
        require('../../../assets/preachercurl.png'),

      graph:
        require('../../../assets/grafikriwayatlatihan.png'),

      sets: [

        {
          set: '1',
          kg: '15',
          reps: '12',
          rpe: '7',
        },

        {
          set: '2',
          kg: '17',
          reps: '10',
          rpe: '8',
        },

        {
          set: '3',
          kg: '20',
          reps: '8',
          rpe: '7',
        },

      ],
    },

  ];


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // OPEN MEAL PAGE
  // ==========================================================

  const handleOpenMeal = () => {

    navigation.navigate(
      'MealScreen',
      {
        date:
          workoutData.date,
      }
    );

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <SafeAreaView
      style={styles.safe}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View
        style={styles.header}
      >

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
        >
          Riwayat Latihan
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
            SUMMARY CARD
        ================================================== */}

        <View
          style={styles.summaryCard}
        >

          {/* =================================================
              SUMMARY HEADER
          ================================================= */}

          <View
            style={styles.summaryTopRow}
          >

            <View>

              <Text
                style={styles.workoutName}
              >
                {workoutData.workoutName}
              </Text>


              <Text
                style={styles.workoutDate}
              >
                {workoutData.date}
              </Text>

            </View>


            {/* =================================================
                CALORIES
            ================================================= */}

            <View
              style={styles.calorieContainer}
            >

              <Text
                style={styles.calorieValue}
              >
                {workoutData.calories}
              </Text>


              <Text
                style={styles.calorieLabel}
              >
                Kalori terbakar
              </Text>

            </View>

          </View>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <View
            style={styles.summaryDivider}
          />


          {/* =================================================
              SUMMARY STATISTICS
          ================================================= */}

          <View
            style={styles.summaryStats}
          >

            {/* TOTAL VARIATION */}

            <View
              style={styles.summaryStat}
            >

              <Text
                style={styles.summaryStatValue}
              >
                {workoutData.totalVariation}
              </Text>


              <Text
                style={styles.summaryStatLabel}
              >
                Variasi
              </Text>

            </View>


            {/* HEART RATE */}

            <View
              style={styles.summaryStat}
            >

              <Text
                style={styles.summaryStatValue}
              >
                {workoutData.heartRate}
              </Text>


              <Text
                style={styles.summaryStatLabel}
              >
                Detak Jantung
              </Text>

            </View>


            {/* DURATION */}

            <View
              style={styles.summaryStat}
            >

              <Text
                style={styles.summaryStatValue}
              >
                {workoutData.duration}
              </Text>


              <Text
                style={styles.summaryStatLabel}
              >
                Waktu
              </Text>

            </View>

          </View>


          {/* =================================================
              WORKOUT DETAIL
          ================================================= */}

          <View
            style={styles.summaryBottom}
          >

            <View
              style={styles.summaryBottomItem}
            >

              <Text
                style={styles.summaryBottomValue}
              >
                Lat Pulldown
              </Text>


              <Text
                style={styles.summaryBottomLabel}
              >
                Angkatan terberat
              </Text>

            </View>


            <View
              style={styles.summaryBottomItem}
            >

              <Text
                style={styles.summaryBottomValue}
              >
                55 Kg
              </Text>


              <Text
                style={styles.summaryBottomLabel}
              >
                Beban
              </Text>

            </View>

          </View>

        </View>


        {/* ==================================================
            NUTRITION REMINDER
        ================================================== */}

        <View
          style={styles.nutritionCard}
        >

          {/* =================================================
              TEXT CONTENT
          ================================================= */}

          <View
            style={styles.nutritionContent}
          >

            {/* =================================================
                TITLE
            ================================================= */}

            <Text
              style={styles.nutritionTitle}
            >
              Jangan lupa penuhi kebutuhan
              {'\n'}
              nutrisimu!
            </Text>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <Text
              style={styles.nutritionDescription}
            >
              Kalori yang terbakar pada sesi ini
              cukup banyak ({workoutData.calories} kkal).
              Jangan lupa penuhi kebutuhan energi dan
              nutrisi harianmu.
            </Text>


            {/* =================================================
                BUTTON
            ================================================= */}

            <TouchableOpacity
              style={styles.nutritionButton}
              onPress={() =>
              navigation.navigate('Nutrition')
            }
              activeOpacity={0.85}
            >

              <Text
                style={styles.nutritionButtonText}
              >
                Lihat Pola Makan
              </Text>


              {/* =================================================
                  ARROW
              ================================================= */}

              <View
                style={styles.nutritionArrow}
              >

                <Feather
                  name="arrow-right"
                  size={19}
                  color="#FFFFFF"
                />

              </View>

            </TouchableOpacity>

          </View>

        </View>


        {/* ==================================================
            EXERCISE LIST
        ================================================== */}

        {exercises.map(
          (exercise) => (

            <ExerciseHistoryCard
              key={exercise.id}
              exercise={exercise}
            />

          )
        )}


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

        <View
          style={styles.bottomSpace}
        />

      </ScrollView>

    </SafeAreaView>

  );

}


// ============================================================
// EXERCISE HISTORY CARD
// ============================================================

function ExerciseHistoryCard({
  exercise,
}) {

  return (

    <View
      style={styles.exerciseHistoryCard}
    >

      {/* ====================================================
          EXERCISE HEADER
      ==================================================== */}

      <View
        style={styles.exerciseHeader}
      >

        {/* IMAGE */}

        <Image
          source={exercise.image}
          style={styles.exerciseImage}
          resizeMode="cover"
        />


        {/* NAME + CATEGORY */}

        <View
          style={styles.exerciseHeaderInfo}
        >

          <Text
            style={styles.exerciseName}
          >
            {exercise.name}
          </Text>


          <View
            style={styles.categoryBadge}
          >

            <Text
              style={styles.categoryBadgeText}
            >
              {exercise.category}
            </Text>

          </View>

        </View>

      </View>


      {/* ====================================================
          SET TABLE
      ==================================================== */}

      <View
        style={styles.setTable}
      >

        {/* ==================================================
            TABLE HEADER
        ================================================== */}

        <View
          style={styles.setHeaderRow}
        >

          <View
            style={styles.setColumn}
          >

            <Text
              style={styles.setHeaderText}
            >
              Set
            </Text>

          </View>


          <View
            style={styles.setColumn}
          >

            <Text
              style={styles.setHeaderText}
            >
              KG
            </Text>

          </View>


          <View
            style={styles.setColumn}
          >

            <Text
              style={styles.setHeaderText}
            >
              Reps
            </Text>

          </View>


          <View
            style={styles.setColumn}
          >

            <Text
              style={styles.setHeaderText}
            >
              RPE
            </Text>

          </View>


          <View
            style={styles.checkColumn}
          />

        </View>


        {/* ==================================================
            SET ROWS
        ================================================== */}

        {exercise.sets.map(
          (setData) => (

            <View
              key={setData.set}
              style={styles.setRow}
            >

              {/* SET */}

              <View
                style={styles.setBox}
              >

                <Text
                  style={styles.setBoxText}
                >
                  {setData.set}
                </Text>


                <Feather
                  name="chevron-down"
                  size={15}
                  color="#003F34"
                />

              </View>


              {/* KG */}

              <View
                style={styles.setBox}
              >

                <Text
                  style={styles.setBoxText}
                >
                  {setData.kg}
                </Text>

              </View>


              {/* REPS */}

              <View
                style={styles.setBox}
              >

                <Text
                  style={styles.setBoxText}
                >
                  {setData.reps}
                </Text>

              </View>


              {/* RPE */}

              <View
                style={styles.setBox}
              >

                <Text
                  style={styles.setBoxText}
                >
                  {setData.rpe}
                </Text>


                <Feather
                  name="chevron-down"
                  size={15}
                  color="#003F34"
                />

              </View>


              {/* CHECK */}

              <View
                style={styles.checkCircle}
              >

                <Feather
                  name="check"
                  size={15}
                  color="#247767"
                />

              </View>

            </View>

          )
        )}

      </View>

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

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 80,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
    backgroundColor: '#FFFFFF',
    marginTop: 32,
  },


  backButton: {
    width: 38,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  headerTitle: {
    marginLeft: 3,
    fontSize: 22,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  scrollContent: {
    paddingTop: 23,
    paddingBottom: 40,
  },


  // ==========================================================
  // SUMMARY CARD
  // ==========================================================

  summaryCard: {
    marginHorizontal: 20,
    minHeight: 292,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 22,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
  },


  // ==========================================================
  // SUMMARY TOP
  // ==========================================================

  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },


  workoutName: {
    fontSize: 25,
    fontWeight: '700',
    color: '#003F34',
  },


  workoutDate: {
    marginTop: 4,
    fontSize: 18,
    color: '#23816F',
  },


  // ==========================================================
  // CALORIE
  // ==========================================================

  calorieContainer: {
    alignItems: 'flex-end',
  },


  calorieValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  calorieLabel: {
    marginTop: 4,
    fontSize: 16,
    color: '#003F34',
  },


  // ==========================================================
  // DIVIDER
  // ==========================================================

  summaryDivider: {
    height: 1,
    marginTop: 20,
    backgroundColor: '#9A9D9D',
  },


  // ==========================================================
  // SUMMARY STATS
  // ==========================================================

  summaryStats: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  summaryStat: {
    flex: 1,
    alignItems: 'center',
  },


  summaryStatValue: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  summaryStatLabel: {
    marginTop: 6,
    fontSize: 15,
    color: '#003F34',
  },


  // ==========================================================
  // SUMMARY BOTTOM
  // ==========================================================

  summaryBottom: {
    marginTop: 27,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },


  summaryBottomItem: {
    alignItems: 'center',
  },


  summaryBottomValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#003F34',
  },


  summaryBottomLabel: {
    marginTop: 5,
    fontSize: 15,
    color: '#003F34',
  },


  // ==========================================================
  // NUTRITION CARD
  // ==========================================================

  nutritionCard: {
    marginHorizontal: 20,
    marginTop: 16,

    paddingHorizontal: 38,
    paddingTop: 30,
    paddingBottom: 29,

    borderRadius: 19,

    borderWidth: 1,
    borderColor: '#69A99A',

    backgroundColor: '#EAF4F1',
  },


  // ==========================================================
  // NUTRITION CONTENT
  // ==========================================================

  nutritionContent: {
    width: '100%',
  },


  // ==========================================================
  // NUTRITION TITLE
  // ==========================================================

  nutritionTitle: {
    fontSize: 19,
    lineHeight: 29,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // NUTRITION DESCRIPTION
  // ==========================================================

  nutritionDescription: {
    marginTop: 13,

    fontSize: 18,
    lineHeight: 29,

    color: '#174E44',
  },


  // ==========================================================
  // NUTRITION BUTTON
  // ==========================================================

  nutritionButton: {
    height: 59,

    marginTop: 30,

    paddingLeft: 27,
    paddingRight: 7,

    borderRadius: 32,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#227B68',
  },


  nutritionButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // NUTRITION ARROW
  // ==========================================================

  nutritionArrow: {
    width: 43,
    height: 43,

    borderRadius: 22,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#005542',
  },


  // ==========================================================
  // EXERCISE HISTORY CARD
  // ==========================================================

  exerciseHistoryCard: {
    marginHorizontal: 20,
    marginTop: 16,

    paddingHorizontal: 19,
    paddingTop: 19,
    paddingBottom: 18,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: '#69A99A',

    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // EXERCISE HEADER
  // ==========================================================

  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  exerciseImage: {
    width: 116,
    height: 78,
    borderRadius: 11,
    backgroundColor: '#D5D8D8',
  },


  exerciseHeaderInfo: {
    flex: 1,
    marginLeft: 16,
  },


  exerciseName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  categoryBadge: {
    alignSelf: 'flex-start',
    marginTop: 7,

    paddingHorizontal: 14,
    paddingVertical: 7,

    borderRadius: 18,

    backgroundColor: '#62D5AE',
  },


  categoryBadgeText: {
    fontSize: 13,
    color: '#003F34',
  },


  // ==========================================================
  // SET TABLE
  // ==========================================================

  setTable: {
    marginTop: 20,
  },


  // ==========================================================
  // TABLE HEADER
  // ==========================================================

  setHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },


  setHeaderText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#003F34',
  },


  setColumn: {
    flex: 1,
    alignItems: 'center',
  },


  checkColumn: {
    width: 31,
  },


  // ==========================================================
  // SET ROW
  // ==========================================================

  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },


  // ==========================================================
  // SET BOX
  // ==========================================================

  setBox: {
    flex: 1,

    height: 44,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#23816F',

    backgroundColor: '#F1F8F6',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 5,
  },


  setBoxText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // CHECK CIRCLE
  // ==========================================================

  checkCircle: {
    width: 26,
    height: 26,

    borderRadius: 13,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#9BCBC0',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 40,
  },

});
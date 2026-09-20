import React, { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  Modal,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// LATIHAN SCREEN
// ============================================================

export default function WorkoutScreen({
  navigation,
  route,
}) {

  const initialExercises = [
    {
      id: 1,
      name: 'Lat Pulldown',
      category: 'Back',
      image: require('../../../assets/latpulldown.png'),
      sets: [
        { set: '1', kg: '35', reps: '12', rpe: '7' },
        { set: '2', kg: '40', reps: '12', rpe: '8' },
        { set: '3', kg: '', reps: '', rpe: '' },
      ],
    },
    {
      id: 2,
      name: 'Pull Up',
      category: 'Back',
      image: require('../../../assets/pullup.png'),
      sets: [
        { set: '1', kg: '', reps: '', rpe: '' },
        { set: '2', kg: '', reps: '', rpe: '' },
        { set: '3', kg: '', reps: '', rpe: '' },
      ],
    },
    {
      id: 3,
      name: 'Barbell Row',
      category: 'Back',
      image: require('../../../assets/barbellrow.png'),
      sets: [
        { set: '1', kg: '', reps: '', rpe: '' },
        { set: '2', kg: '', reps: '', rpe: '' },
        { set: '3', kg: '', reps: '', rpe: '' },
      ],
    },
    {
      id: 4,
      name: 'Incline Dumbell Row',
      category: 'Biceps',
      image: require('../../../assets/inclinedumbellrow.png'),
      sets: [
        { set: '1', kg: '', reps: '', rpe: '' },
        { set: '2', kg: '', reps: '', rpe: '' },
        { set: '3', kg: '', reps: '', rpe: '' },
      ],
    },
    {
      id: 5,
      name: 'Preacher Curl',
      category: 'Biceps',
      image: require('../../../assets/preachercurl.png'),
      sets: [
        { set: '1', kg: '', reps: '', rpe: '' },
        { set: '2', kg: '', reps: '', rpe: '' },
        { set: '3', kg: '', reps: '', rpe: '' },
      ],
    },
  ];

  const [exercises, setExercises] = useState(initialExercises);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  // ==========================================================
  // TIMER
  // ==========================================================

  useEffect(() => {

    if (isPaused) return;

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [isPaused]);


  const formatTime = (totalSeconds) => {

    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;

  };


  // ==========================================================
  // CHECK DATA
  // ==========================================================

  const isSetComplete = (setData) => {

    return (
      setData.kg.trim() !== '' &&
      setData.reps.trim() !== '' &&
      setData.rpe.trim() !== ''
    );

  };


  const isExerciseComplete = (exercise) => {

    return (
      exercise.sets.length > 0 &&
      exercise.sets.every(set => isSetComplete(set))
    );

  };


  const completedVariations = useMemo(() => {

    return exercises.filter(
      exercise => isExerciseComplete(exercise)
    ).length;

  }, [exercises]);


  const allExercisesComplete =
    completedVariations === exercises.length;


  // ==========================================================
  // UPDATE SET
  // ==========================================================

  const updateSetValue = (
    exerciseId,
    setIndex,
    field,
    value
  ) => {

    setExercises(previous =>
      previous.map(exercise => {

        if (exercise.id !== exerciseId) {
          return exercise;
        }

        const updatedSets = exercise.sets.map(
          (setData, index) => {

            if (index !== setIndex) {
              return setData;
            }

            return {
              ...setData,
              [field]: value,
            };

          }
        );

        return {
          ...exercise,
          sets: updatedSets,
        };

      })
    );

  };


  // ==========================================================
  // ADD SET
  // ==========================================================

  const addSet = (exerciseId) => {

    setExercises(previous =>
      previous.map(exercise => {

        if (exercise.id !== exerciseId) {
          return exercise;
        }

        const allComplete =
          exercise.sets.every(
            set => isSetComplete(set)
          );

        if (!allComplete) {
          return exercise;
        }

        return {
          ...exercise,
          sets: [
            ...exercise.sets,
            {
              set: String(exercise.sets.length + 1),
              kg: '',
              reps: '',
              rpe: '',
            },
          ],
        };

      })
    );

  };


  const canAddSet = (exercise) =>
    exercise.sets.every(
      set => isSetComplete(set)
    );


  // ==========================================================
  // PAUSE
  // ==========================================================

  const togglePause = () => {

    setIsPaused(prev => !prev);

  };


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    if (!allExercisesComplete) {

      setShowIncompleteModal(true);

      return;
    }

    navigation.goBack();

  };


  const handleCompleteData = () => {

    setShowIncompleteModal(false);

  };


  // ==========================================================
  // SAVE INCOMPLETE
  // ==========================================================

  const handleSaveIncomplete = () => {

    setShowIncompleteModal(false);

    navigation.navigate(
      'Workout',
      {
        workoutStatus: 'ongoing',
      }
    );

  };


  // ==========================================================
  // FINISH WORKOUT
  // ==========================================================

  const handleFinishWorkout = () => {

    if (!allExercisesComplete) {
      return;
    }

    setShowFinishModal(true);

  };


  const handleConfirmFinish = () => {

    setShowFinishModal(false);

    setShowSuccessModal(true);

    setTimeout(() => {

      setShowSuccessModal(false);

      navigation.navigate(
        'Workout',
        {
          workoutStatus: 'completed',
        }
      );

    }, 1800);

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


      {/* ======================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >

          <Feather
            name="chevron-left"
            size={30}
            color="#003F34"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Latihan
        </Text>

      </View>


      {/* ======================================================
          TOP CONTENT
      ====================================================== */}

      <View style={styles.topContent}>

        <Text style={styles.pullDayTitle}>
          Pull Day
        </Text>

        <View style={styles.progressContainer}>

          {exercises.map((exercise, index) => {

            const completed =
              isExerciseComplete(exercise);

            return (

              <View
                key={exercise.id}
                style={[
                  styles.progressLine,

                  completed &&
                    styles.progressLineActive,

                  !completed &&
                    index === completedVariations &&
                    styles.progressLineCurrent,
                ]}
              />

            );

          })}

        </View>

      </View>


      {/* ======================================================
          EXERCISE LIST
      ====================================================== */}

      <ScrollView
        style={styles.exerciseScroll}
        contentContainerStyle={styles.exerciseScrollContent}
        showsVerticalScrollIndicator={false}
      >

        {exercises.map(exercise => (

          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            canAdd={canAddSet(exercise)}
            onAddSet={() =>
              addSet(exercise.id)
            }
            onUpdateSet={(
              setIndex,
              field,
              value
            ) =>
              updateSetValue(
                exercise.id,
                setIndex,
                field,
                value
              )
            }
          />

        ))}

        <View style={styles.scrollBottomSpace} />

      </ScrollView>


      {/* ======================================================
          FIXED SUMMARY CARD
      ====================================================== */}

      <View style={styles.fixedSummaryCard}>

        <View style={styles.summaryHeader}>

          <View>

            <Text style={styles.summaryTitle}>
              Punggung dan Bisep
            </Text>

            <Text style={styles.summaryConnection}>
              Terhubung Coros Pace 4
            </Text>

          </View>


          <View style={styles.pauseContainer}>

            <TouchableOpacity
              style={styles.pauseButton}
              onPress={togglePause}
            >

              <Feather
                name={
                  isPaused
                    ? 'play'
                    : 'pause'
                }
                size={21}
                color="#003F34"
              />

            </TouchableOpacity>

            <Text style={styles.pauseText}>
              {isPaused ? 'Lanjut' : 'Jeda'}
            </Text>

          </View>

        </View>


        <View style={styles.summaryDivider} />


        <View style={styles.summaryStats}>

          <View style={styles.summaryStatItem}>

            <Text style={styles.summaryStatValue}>
              {completedVariations}/{exercises.length}
            </Text>

            <Text style={styles.summaryStatLabel}>
              Variasi
            </Text>

          </View>


          <View style={styles.summaryStatItem}>

            <Text style={styles.summaryStatValue}>
              125
            </Text>

            <Text style={styles.summaryStatLabel}>
              Detak Jantung
            </Text>

          </View>


          <View style={styles.summaryStatItem}>

            <Text style={styles.summaryStatValue}>
              {formatTime(seconds)}
            </Text>

            <Text style={styles.summaryStatLabel}>
              Waktu
            </Text>

          </View>

        </View>


        <TouchableOpacity
          style={[
            styles.finishButton,

            allExercisesComplete
              ? styles.finishButtonActive
              : styles.finishButtonDisabled,
          ]}
          disabled={!allExercisesComplete}
          onPress={handleFinishWorkout}
        >

          <Text
            style={[
              styles.finishButtonText,

              allExercisesComplete
                ? styles.finishButtonTextActive
                : styles.finishButtonTextDisabled,
            ]}
          >
            Selesaikan Latihan
          </Text>

        </TouchableOpacity>

      </View>


      {/* ======================================================
          INCOMPLETE MODAL
      ====================================================== */}

      <Modal
        visible={showIncompleteModal}
        transparent
        animationType="fade"
      >

        <View style={styles.modalOverlay}>

          <View style={styles.incompleteModal}>

            <View style={styles.warningIcon}>

              <Feather
                name="alert-triangle"
                size={32}
                color="#F59E0B"
              />

            </View>


            <Text style={styles.modalTitle}>
              Data Belum Lengkap
            </Text>


            <Text style={styles.modalDescription}>
              Masih ada sesi latihan yang belum terisi atau dicentang.
              Apakah Anda yakin ingin tetap menyimpannya?
            </Text>


            <View style={styles.modalButtonRow}>

              <TouchableOpacity
                style={styles.completeModalButton}
                onPress={handleCompleteData}
              >

                <Text style={styles.completeModalText}>
                  Lengkapi Data
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                style={styles.saveModalButton}
                onPress={handleSaveIncomplete}
              >

                <Text style={styles.saveModalText}>
                  Tetap Simpan
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>


      {/* ======================================================
          FINISH MODAL
      ====================================================== */}

      <Modal
        visible={showFinishModal}
        transparent
        animationType="fade"
      >

        <View style={styles.modalOverlay}>

          <View style={styles.finishModal}>

            <View style={styles.finishIcon}>

              <Feather
                name="check-circle"
                size={32}
                color="#227B68"
              />

            </View>


            <Text style={styles.modalTitle}>
              Akhiri latihan?
            </Text>


            <Text style={styles.modalDescription}>
              Semua data latihan yang telah Anda isi akan disimpan
              sebagai riwayat latihan.
            </Text>


            <View style={styles.finishModalButtons}>

              <TouchableOpacity
                style={styles.cancelFinishButton}
                onPress={() =>
                  setShowFinishModal(false)
                }
              >

                <Text style={styles.cancelFinishText}>
                  Kembali
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                style={styles.confirmFinishButton}
                onPress={handleConfirmFinish}
              >

                <Text style={styles.confirmFinishText}>
                  Iya, Akhiri
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>


      {/* ======================================================
          SUCCESS MODAL
          POSISI DI BAGIAN ATAS
      ====================================================== */}

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
      >

        <View style={styles.successModalOverlay}>

          <View style={styles.successModal}>

            <View style={styles.successIcon}>

              <Feather
                name="check-circle"
                size={30}
                color="#227B68"
              />

            </View>


            <Text style={styles.successTitle}>
              Latihan berhasil disimpan
            </Text>

          </View>

        </View>

      </Modal>

    </SafeAreaView>

  );

}


// ============================================================
// EXERCISE CARD
// ============================================================

function ExerciseCard({
  exercise,
  canAdd,
  onAddSet,
  onUpdateSet,
}) {

  return (

    <View style={styles.exerciseCard}>

      {/* ======================================================
          EXERCISE HEADER
      ====================================================== */}

      <View style={styles.exerciseHeader}>

        <Image
          source={exercise.image}
          style={styles.exerciseImage}
        />

        <View style={styles.exerciseInfo}>

          <Text style={styles.exerciseName}>
            {exercise.name}
          </Text>

          <View style={styles.categoryBadge}>

            <Text style={styles.categoryText}>
              {exercise.category}
            </Text>

          </View>

        </View>

      </View>


      {/* ======================================================
          TABLE HEADER
      ====================================================== */}

      <View style={styles.tableHeader}>

        {['Set', 'KG', 'Reps', 'RPE'].map(item => (

          <View
            key={item}
            style={styles.tableColumn}
          >

            <Text style={styles.tableHeaderText}>
              {item}
            </Text>

          </View>

        ))}

        <View style={styles.checkColumn} />

      </View>


      {/* ======================================================
          SET ROWS
      ====================================================== */}

      {exercise.sets.map((setData, index) => {

        const complete =
          isSetCompleteLocal(setData);

        return (

          <View
            key={index}
            style={styles.setRow}
          >

            {/* SET */}

            <View style={styles.setBox}>

              <Text style={styles.setNumber}>
                {setData.set}
              </Text>

            </View>


            {/* KG */}

            <TextInput
              style={[
                styles.inputBox,

                setData.kg !== '' &&
                  styles.inputBoxFilled,
              ]}
              value={setData.kg}
              onChangeText={(value) =>
                onUpdateSet(
                  index,
                  'kg',
                  value.replace(
                    /[^0-9.]/g,
                    ''
                  )
                )
              }
              keyboardType="numeric"
              placeholder="-"
              placeholderTextColor="#003F34"
            />


            {/* REPS */}

            <TextInput
              style={[
                styles.inputBox,

                setData.reps !== '' &&
                  styles.inputBoxFilled,
              ]}
              value={setData.reps}
              onChangeText={(value) =>
                onUpdateSet(
                  index,
                  'reps',
                  value.replace(
                    /[^0-9]/g,
                    ''
                  )
                )
              }
              keyboardType="numeric"
              placeholder="-"
              placeholderTextColor="#003F34"
            />


            {/* RPE */}

            <View style={styles.rpeBox}>

              <TextInput
                style={styles.rpeInput}
                value={setData.rpe}
                onChangeText={(value) =>
                  onUpdateSet(
                    index,
                    'rpe',
                    value.replace(
                      /[^0-9.]/g,
                      ''
                    )
                  )
                }
                keyboardType="numeric"
                placeholder="-"
                placeholderTextColor="#003F34"
              />

              <Feather
                name="chevron-down"
                size={15}
                color="#003F34"
              />

            </View>


            {/* CHECK */}

            <View
              style={[
                styles.checkCircle,

                complete
                  ? styles.checkCircleComplete
                  : styles.checkCircleIncomplete,
              ]}
            >

              <Feather
                name="check"
                size={15}
                color={
                  complete
                    ? '#247767'
                    : '#777A7D'
                }
              />

            </View>

          </View>

        );

      })}


      {/* ======================================================
          ADD SET BUTTON
      ====================================================== */}

      <TouchableOpacity
        style={[
          styles.addSetButton,

          canAdd
            ? styles.addSetButtonActive
            : styles.addSetButtonDisabled,
        ]}
        disabled={!canAdd}
        onPress={onAddSet}
      >

        <Text
          style={[
            styles.addSetText,

            canAdd
              ? styles.addSetTextActive
              : styles.addSetTextDisabled,
          ]}
        >
          Tambah
        </Text>

      </TouchableOpacity>

    </View>

  );

}


// ============================================================
// LOCAL CHECK
// ============================================================

function isSetCompleteLocal(setData) {

  return (
    setData.kg.trim() !== '' &&
    setData.reps.trim() !== '' &&
    setData.rpe.trim() !== ''
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
    marginTop: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
  },

  backButton: {
    width: 38,
    height: 44,
    justifyContent: 'center',
  },

  headerTitle: {
    marginLeft: 3,
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // TOP CONTENT
  // ==========================================================

  topContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },

  pullDayTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },

  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
  },

  progressLine: {
    flex: 1,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#B7B8BA',
  },

  progressLineActive: {
    backgroundColor: '#62D5AE',
  },

  progressLineCurrent: {
    backgroundColor: '#62D5AE',
  },


  // ==========================================================
  // EXERCISE SCROLL
  // ==========================================================

  exerciseScroll: {
    flex: 1,
  },

  exerciseScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },

  scrollBottomSpace: {
    height: 20,
  },


  // ==========================================================
  // EXERCISE CARD
  // ==========================================================

  exerciseCard: {
    marginBottom: 16,
    paddingHorizontal: 19,
    paddingTop: 22,
    paddingBottom: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
  },

  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  exerciseImage: {
    width: 116,
    height: 78,
    borderRadius: 11,
  },

  exerciseInfo: {
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

  categoryText: {
    fontSize: 13,
    color: '#003F34',
  },


  // ==========================================================
  // TABLE
  // ==========================================================

  tableHeader: {
    marginTop: 20,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  tableColumn: {
    flex: 1,
    alignItems: 'center',
  },

  tableHeaderText: {
    fontSize: 15,
    color: '#003F34',
  },

  checkColumn: {
    width: 26,
  },

  setRow: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  setBox: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#23816F',
    backgroundColor: '#F1F8F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  setNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003F34',
  },

  inputBox: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A8ACAE',
    backgroundColor: '#F1F8F6',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#003F34',
  },

  inputBoxFilled: {
    borderColor: '#23816F',
  },

  rpeBox: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A8ACAE',
    backgroundColor: '#F1F8F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
  },

  rpeInput: {
    flex: 1,
    textAlign: 'center',
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
  },

  checkCircleComplete: {
    backgroundColor: '#9BCBC0',
  },

  checkCircleIncomplete: {
    backgroundColor: '#D4D6D7',
  },


  // ==========================================================
  // ADD SET
  // ==========================================================

  addSetButton: {
    height: 53,
    marginTop: 16,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addSetButtonActive: {
    backgroundColor: '#227B68',
  },

  addSetButtonDisabled: {
    backgroundColor: '#AEB0B4',
  },

  addSetText: {
    fontSize: 16,
    fontWeight: '700',
  },

  addSetTextActive: {
    color: '#FFFFFF',
  },

  addSetTextDisabled: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // FIXED SUMMARY
  // ==========================================================

  fixedSummaryCard: {
    paddingHorizontal: 20,
    paddingTop: 19,
    paddingBottom: 14,
    backgroundColor: '#EAF3F0',
    borderTopWidth: 1,
    borderTopColor: '#69A99A',
  },

  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#003F34',
  },

  summaryConnection: {
    marginTop: 5,
    fontSize: 17,
    color: '#003F34',
  },

  pauseContainer: {
    alignItems: 'center',
  },

  pauseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5FAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pauseText: {
    marginTop: 3,
    fontSize: 13,
    color: '#003F34',
  },

  summaryDivider: {
    height: 1,
    marginTop: 12,
    backgroundColor: '#AAB4B1',
  },

  summaryStats: {
    marginTop: 13,
    flexDirection: 'row',
  },

  summaryStatItem: {
    flex: 1,
    alignItems: 'center',
  },

  summaryStatValue: {
    fontSize: 21,
    fontWeight: '700',
    color: '#003F34',
  },

  summaryStatLabel: {
    marginTop: 4,
    fontSize: 16,
    color: '#003F34',
    marginBottom: 16,
  },


  // ==========================================================
  // FINISH BUTTON
  // ==========================================================

  finishButton: {
    height: 60,
    marginTop: 13,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },

  finishButtonActive: {
    backgroundColor: '#227B68',
  },

  finishButtonDisabled: {
    backgroundColor: '#AEB0B4',
  },

  finishButtonText: {
    fontSize: 17,
    fontWeight: '700',
  },

  finishButtonTextActive: {
    color: '#FFFFFF',
  },

  finishButtonTextDisabled: {
    color: '#EDEDED',
  },


  // ==========================================================
  // GENERAL MODAL
  // ==========================================================

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },


  // ==========================================================
  // INCOMPLETE MODAL
  // ==========================================================

  incompleteModal: {
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 22,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },

  warningIcon: {
    alignSelf: 'center',
    marginBottom: 14,
  },

  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },

  modalDescription: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 25,
    color: '#003F34',
  },

  modalButtonRow: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 8,
  },

  completeModalButton: {
    flex: 1,
    height: 50,
    borderRadius: 27,
    backgroundColor: '#AEB0B4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  completeModalText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  saveModalButton: {
    flex: 1,
    height: 50,
    borderRadius: 27,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveModalText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // FINISH MODAL
  // ==========================================================

  finishModal: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 22,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },

  finishIcon: {
    alignSelf: 'center',
    marginBottom: 12,
  },

  finishModalButtons: {
    marginTop: 22,
    flexDirection: 'row',
    gap: 8,
  },

  cancelFinishButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#AEB0B4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelFinishText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  confirmFinishButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#227B68',
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmFinishText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // SUCCESS MODAL
  // ==========================================================

  /*
    INI YANG BERUBAH.

    Sebelumnya success modal menggunakan:
    styles.modalOverlay

    Karena modalOverlay menggunakan:
    justifyContent: 'center'

    maka popup muncul di tengah.

    Sekarang success popup menggunakan overlay khusus
    yang menempatkannya di bagian atas.
  */

  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.10)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 40,
  },

  successModal: {
    width: '98%',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 22,
    backgroundColor: '#EAF3F0',
    borderWidth: 1,
    borderColor: '#69A99A',
    flexDirection: 'row',
    alignItems: 'center',
  },

  successIcon: {
    marginRight: 13,
  },

  successTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#003F34',
  },

});
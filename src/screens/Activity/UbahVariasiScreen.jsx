import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// SCREEN HEIGHT
// ============================================================

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


// ============================================================
// UBAH VARIASI SCREEN
// ============================================================

export default function UbahVariasiScreen({
  navigation,
}) {

  // ==========================================================
  // DATA LATIHAN AWAL
  // ==========================================================

  const [exercises, setExercises] = useState([

    {
      id: 1,
      name: 'Lat Pulldown',
      category: 'Back',
      duration: '10 Menit',
      image: require('../../../assets/latpulldown.png'),
    },

    {
      id: 2,
      name: 'Pull Up',
      category: 'Back',
      duration: '10 Menit',
      image: require('../../../assets/pullup.png'),
    },

    {
      id: 3,
      name: 'Barbell Row',
      category: 'Back',
      duration: '10 Menit',
      image: require('../../../assets/barbellrow.png'),
    },

    {
      id: 4,
      name: 'Incline Dumbell Row',
      category: 'Biceps',
      duration: '10 Menit',
      image: require('../../../assets/inclinedumbellrow.png'),
    },

    {
      id: 5,
      name: 'Preacher Curl',
      category: 'Biceps',
      duration: '10 Menit',
      image: require('../../../assets/preachercurl.png'),
    },

  ]);


  // ==========================================================
  // DAFTAR LATIHAN ALTERNATIF
  // ==========================================================

  const availableExercises = [

    {
      id: 6,
      name: 'Back Extension',
      category: 'Back',
      duration: '10 Menit',
      image: require('../../../assets/backextension.png'),
    },

    {
      id: 7,
      name: 'Conventional Deadlift',
      category: 'Back',
      duration: '10 Menit',
      image: require('../../../assets/conventionaldeadlift.png'),
    },

    {
      id: 8,
      name: 'Concentration Curl',
      category: 'Biceps',
      duration: '10 Menit',
      image: require('../../../assets/concentrationcurl.png'),
    },

    {
      id: 9,
      name: 'Spider Curl',
      category: 'Biceps',
      duration: '10 Menit',
      image: require('../../../assets/spidercurl.png'),
    },

  ];


  // ==========================================================
  // STATE CARD YANG DIPILIH
  // ==========================================================

  const [selectedExerciseId, setSelectedExerciseId] =
    useState(null);


  // ==========================================================
  // STATE BOTTOM SHEET
  //
  // replace = Ganti Variasi
  // add     = Tambah Variasi
  // ==========================================================

  const [sheetMode, setSheetMode] =
    useState(null);


  // ==========================================================
  // STATE LATIHAN YANG DIPILIH DI BOTTOM SHEET
  // ==========================================================

  const [selectedReplacement, setSelectedReplacement] =
    useState(null);


  // ==========================================================
  // STATE SUCCESS MESSAGE
  // ==========================================================

  const [successVisible, setSuccessVisible] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState('');


  // ==========================================================
  // ANIMATION BOTTOM SHEET
  // ==========================================================

  const sheetAnimation =
    useRef(
      new Animated.Value(SCREEN_HEIGHT)
    ).current;


  // ==========================================================
  // OPEN BOTTOM SHEET
  // ==========================================================

  const openSheet = (mode) => {

    setSheetMode(mode);

    setSelectedReplacement(null);

    Animated.timing(
      sheetAnimation,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();

  };


  // ==========================================================
  // CLOSE BOTTOM SHEET
  // ==========================================================

  const closeSheet = () => {

    Animated.timing(
      sheetAnimation,
      {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }
    ).start(() => {

      setSheetMode(null);

      setSelectedReplacement(null);

    });

  };


  // ==========================================================
  // SELECT MAIN EXERCISE
  // ==========================================================

  const handleSelectExercise = (id) => {

    setSelectedExerciseId(
      previous =>
        previous === id
          ? null
          : id
    );

  };


  // ==========================================================
  // OPEN REPLACE
  // ==========================================================

  const handleOpenReplace = () => {

    if (!selectedExerciseId) {
      return;
    }

    openSheet('replace');

  };


  // ==========================================================
  // OPEN ADD
  // ==========================================================

  const handleOpenAdd = () => {

    openSheet('add');

  };


  // ==========================================================
  // SELECT ALTERNATIVE
  // ==========================================================

  const handleSelectAlternative = (exercise) => {

    setSelectedReplacement(exercise);

  };


  // ==========================================================
  // GET AVAILABLE EXERCISES
  // ==========================================================

  const getAvailableAlternatives = () => {

    return availableExercises.filter(
      alternative => {

        const alreadyExists =
          exercises.some(
            exercise =>
              exercise.id === alternative.id
          );

        return !alreadyExists;

      }
    );

  };


  // ==========================================================
  // CONFIRM REPLACE
  // ==========================================================

  const handleConfirmReplace = () => {

    if (
      !selectedExerciseId ||
      !selectedReplacement
    ) {
      return;
    }


    setExercises(
      previousExercises =>

        previousExercises.map(
          exercise => {

            if (
              exercise.id ===
              selectedExerciseId
            ) {

              return {
                ...selectedReplacement,
              };

            }

            return exercise;

          }
        )

    );


    // --------------------------------------------------------
    // CLOSE SHEET
    // --------------------------------------------------------

    closeSheet();


    // --------------------------------------------------------
    // RESET SELECTED CARD
    // --------------------------------------------------------

    setSelectedExerciseId(null);


    // --------------------------------------------------------
    // SUCCESS MESSAGE
    // --------------------------------------------------------

    setSuccessMessage(
      'Variasi berhasil diganti'
    );

    setSuccessVisible(true);

  };


  // ==========================================================
  // CONFIRM ADD
  // ==========================================================

  const handleConfirmAdd = () => {

    if (!selectedReplacement) {
      return;
    }


    setExercises(
      previousExercises => [

        ...previousExercises,

        {
          ...selectedReplacement,
        },

      ]
    );


    // --------------------------------------------------------
    // CLOSE SHEET
    // --------------------------------------------------------

    closeSheet();


    // --------------------------------------------------------
    // RESET SELECTED CARD
    // --------------------------------------------------------

    setSelectedExerciseId(null);


    // --------------------------------------------------------
    // SUCCESS MESSAGE
    // --------------------------------------------------------

    setSuccessMessage(
      'Latihan berhasil ditambahkan'
    );

    setSuccessVisible(true);

  };


  // ==========================================================
  // HAPUS VARIASI
  // ==========================================================

  const handleDeleteExercise = () => {

    // Tidak melakukan apa-apa jika belum memilih card
    if (!selectedExerciseId) {
      return;
    }


    // --------------------------------------------------------
    // HAPUS LATIHAN YANG DIPILIH
    // --------------------------------------------------------

    setExercises(
      previousExercises =>

        previousExercises.filter(
          exercise =>
            exercise.id !==
            selectedExerciseId
        )

    );


    // --------------------------------------------------------
    // RESET PILIHAN
    // --------------------------------------------------------

    setSelectedExerciseId(null);


    // --------------------------------------------------------
    // TAMPILKAN PESAN BERHASIL
    // --------------------------------------------------------

    setSuccessMessage(
      'Variasi berhasil dihapus'
    );

    setSuccessVisible(true);

  };


  // ==========================================================
  // SUCCESS MESSAGE AUTO HIDE
  // ==========================================================

  useEffect(() => {

    if (!successVisible) {
      return;
    }


    const timer =
      setTimeout(() => {

        setSuccessVisible(false);

      }, 2200);


    return () => {

      clearTimeout(timer);

    };

  }, [successVisible]);


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

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


        <Text style={styles.headerTitle}>
          Ubah Variasi
        </Text>

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >


        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <View style={styles.sectionHeader}>

          {/* ------------------------------------------------
              REKOMENDASI
          ------------------------------------------------ */}

          <Text style={styles.sectionTitle}>
            Rekomendasi
          </Text>


          {/* ------------------------------------------------
              DELETE BUTTON
              HANYA MUNCUL JIKA CARD DIPILIH
          ------------------------------------------------ */}

          {selectedExerciseId !== null && (

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteExercise}
              activeOpacity={0.75}
            >

              <Feather
                name="trash-2"
                size={17}
                color="#D95353"
              />

              <Text style={styles.deleteButtonText}>
                Hapus Variasi
              </Text>

            </TouchableOpacity>

          )}

        </View>


        {/* ==================================================
            EXERCISE LIST
        ================================================== */}

        {exercises.map(
          exercise => (

            <ExerciseCard

              key={exercise.id}

              exercise={exercise}

              selected={
                selectedExerciseId ===
                exercise.id
              }

              onPress={() =>
                handleSelectExercise(
                  exercise.id
                )
              }

            />

          )
        )}


        {/* ==================================================
            ADD BUTTON
        ================================================== */}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleOpenAdd}
          activeOpacity={0.85}
        >

          <Feather
            name="plus"
            size={27}
            color="#1F2625"
          />

          <Text style={styles.addButtonText}>
            Tambah Variasi
          </Text>

        </TouchableOpacity>


        {/* ==================================================
            REPLACE BUTTON
        ================================================== */}

        {selectedExerciseId !== null && (

          <TouchableOpacity
            style={styles.replaceMainButton}
            onPress={handleOpenReplace}
            activeOpacity={0.85}
          >

            <Feather
              name="repeat"
              size={25}
              color="#FFFFFF"
            />

            <Text style={styles.replaceMainButtonText}>
              Ganti Variasi
            </Text>

          </TouchableOpacity>

        )}


        <View style={styles.bottomSpace} />

      </ScrollView>


      {/* ====================================================
          BOTTOM SHEET
      ==================================================== */}

      <Modal
        visible={sheetMode !== null}
        transparent
        animationType="none"
        onRequestClose={closeSheet}
      >

        <View style={styles.modalContainer}>


          {/* ==================================================
              DARK OVERLAY
          ================================================== */}

          <Pressable
            style={styles.modalOverlay}
            onPress={closeSheet}
          />


          {/* ==================================================
              BOTTOM SHEET
          ================================================== */}

          <Animated.View
            style={[
              styles.bottomSheet,

              {
                transform: [
                  {
                    translateY:
                      sheetAnimation,
                  },
                ],
              },

            ]}
          >


            {/* =================================================
                HANDLE
            ================================================= */}

            <View style={styles.sheetHandle} />


            {/* =================================================
                SHEET TITLE
            ================================================= */}

            <Text style={styles.sheetTitle}>

              {sheetMode === 'replace'
                ? 'Ganti Variasi'
                : 'Tambah Variasi'
              }

            </Text>


            <Text style={styles.sheetDescription}>

              {sheetMode === 'replace'
                ? 'Pilih latihan untuk menggantikan variasi sebelumnya.'
                : 'Pilih latihan yang ingin ditambahkan.'
              }

            </Text>


            {/* =================================================
                ALTERNATIVE LIST
            ================================================= */}

            <ScrollView
              style={styles.sheetScroll}
              contentContainerStyle={
                styles.sheetScrollContent
              }
              showsVerticalScrollIndicator={false}
            >

              {getAvailableAlternatives().map(
                exercise => (

                  <AlternativeCard

                    key={exercise.id}

                    exercise={exercise}

                    selected={
                      selectedReplacement?.id ===
                      exercise.id
                    }

                    onPress={() =>
                      handleSelectAlternative(
                        exercise
                      )
                    }

                  />

                )
              )}

            </ScrollView>


            {/* =================================================
                CONFIRM BUTTON
            ================================================= */}

            <TouchableOpacity

              style={[
                styles.sheetConfirmButton,

                !selectedReplacement &&
                  styles.sheetConfirmButtonDisabled,

              ]}

              disabled={
                !selectedReplacement
              }

              onPress={
                sheetMode === 'replace'
                  ? handleConfirmReplace
                  : handleConfirmAdd
              }

              activeOpacity={0.85}
            >

              <Text
                style={[
                  styles.sheetConfirmText,

                  !selectedReplacement &&
                    styles.sheetConfirmTextDisabled,

                ]}
              >

                {sheetMode === 'replace'
                  ? 'Ganti Variasi'
                  : 'Tambah Variasi'
                }

              </Text>

            </TouchableOpacity>


          </Animated.View>

        </View>

      </Modal>


      {/* ====================================================
          SUCCESS TOAST
      ==================================================== */}

      {successVisible && (

        <View style={styles.successToast}>

          <View style={styles.successIcon}>

            <Feather
              name="check"
              size={18}
              color="#003F34"
            />

          </View>


          <Text style={styles.successText}>
            {successMessage}
          </Text>

        </View>

      )}

    </SafeAreaView>

  );

}


// ============================================================
// EXERCISE CARD
// ============================================================

function ExerciseCard({
  exercise,
  selected,
  onPress,
}) {

  return (

    <TouchableOpacity
      style={[
        styles.exerciseCard,

        selected &&
          styles.exerciseCardSelected,

      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >


      {/* ====================================================
          DRAG HANDLE
      ==================================================== */}

      <View style={styles.dragHandle}>

        <View style={styles.dragColumn}>

          <View style={styles.dragDot} />
          <View style={styles.dragDot} />
          <View style={styles.dragDot} />
          <View style={styles.dragDot} />

        </View>


        <View style={styles.dragColumn}>

          <View style={styles.dragDot} />
          <View style={styles.dragDot} />
          <View style={styles.dragDot} />
          <View style={styles.dragDot} />

        </View>

      </View>


      {/* ====================================================
          IMAGE
      ==================================================== */}

      <Image
        source={exercise.image}
        style={styles.exerciseImage}
        resizeMode="cover"
      />


      {/* ====================================================
          INFORMATION
      ==================================================== */}

      <View style={styles.exerciseInfo}>

        <Text
          style={styles.exerciseName}
          numberOfLines={1}
        >
          {exercise.name}
        </Text>


        <View style={styles.exerciseMeta}>

          <View style={styles.categoryBadge}>

            <Text style={styles.categoryBadgeText}>
              {exercise.category}
            </Text>

          </View>


          <View style={styles.durationContainer}>

            <Feather
              name="clock"
              size={17}
              color="#1F2625"
            />

            <Text style={styles.durationText}>
              {exercise.duration}
            </Text>

          </View>

        </View>

      </View>

    </TouchableOpacity>

  );

}


// ============================================================
// ALTERNATIVE CARD
// ============================================================

function AlternativeCard({
  exercise,
  selected,
  onPress,
}) {

  return (

    <TouchableOpacity

      style={[
        styles.alternativeCard,

        selected &&
          styles.alternativeCardSelected,

      ]}

      onPress={onPress}

      activeOpacity={0.85}
    >


      {/* ====================================================
          IMAGE
      ==================================================== */}

      <Image
        source={exercise.image}
        style={styles.alternativeImage}
        resizeMode="cover"
      />


      {/* ====================================================
          INFORMATION
      ==================================================== */}

      <View style={styles.alternativeInfo}>

        <Text
          style={styles.alternativeName}
          numberOfLines={1}
        >
          {exercise.name}
        </Text>


        <View style={styles.alternativeMeta}>

          <View style={styles.categoryBadge}>

            <Text style={styles.categoryBadgeText}>
              {exercise.category}
            </Text>

          </View>


          <View style={styles.durationContainer}>

            <Feather
              name="clock"
              size={17}
              color="#1F2625"
            />

            <Text style={styles.durationText}>
              {exercise.duration}
            </Text>

          </View>

        </View>

      </View>


      {/* ====================================================
          SELECTED CHECK
      ==================================================== */}

      {selected && (

        <View style={styles.selectedCheck}>

          <Feather
            name="check"
            size={17}
            color="#FFFFFF"
          />

        </View>

      )}

    </TouchableOpacity>

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
    paddingTop: 34,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },


  // ==========================================================
  // SECTION HEADER
  // ==========================================================

  sectionHeader: {
    minHeight: 28,
    marginBottom: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -12,
  },


  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // DELETE BUTTON
  // ==========================================================

  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },


  deleteButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#D95353',
  },


  // ==========================================================
  // EXERCISE CARD
  // ==========================================================

  exerciseCard: {
    minHeight: 94,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D7DADA',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },


  exerciseCardSelected: {
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // DRAG HANDLE
  // ==========================================================

  dragHandle: {
    width: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },


  dragColumn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },


  dragDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#003F34',
  },


  // ==========================================================
  // EXERCISE IMAGE
  // ==========================================================

  exerciseImage: {
    width: 100,
    height: 68,
    borderRadius: 11,
    backgroundColor: '#D7DADA',
  },


  // ==========================================================
  // EXERCISE INFO
  // ==========================================================

  exerciseInfo: {
    flex: 1,
    marginLeft: 16,
    minWidth: 0,
  },


  exerciseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003F34',
  },


  exerciseMeta: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ==========================================================
  // CATEGORY BADGE
  // ==========================================================

  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#62D5AE',
  },


  categoryBadgeText: {
    fontSize: 14,
    color: '#003F34',
  },


  // ==========================================================
  // DURATION
  // ==========================================================

  durationContainer: {
    marginLeft: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },


  durationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#1F2625',
  },


  // ==========================================================
  // ADD BUTTON
  // ==========================================================

  addButton: {
    height: 60,
    marginTop: 16,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },


  addButtonText: {
    marginLeft: 16,
    fontSize: 19,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // REPLACE MAIN BUTTON
  // ==========================================================

  replaceMainButton: {
    height: 60,
    marginTop: 16,
    borderRadius: 31,
    backgroundColor: '#227B68',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },


  replaceMainButtonText: {
    marginLeft: 16,
    fontSize: 19,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 40,
  },


  // ==========================================================
  // MODAL
  // ==========================================================

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },


  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },


  // ==========================================================
  // BOTTOM SHEET
  // ==========================================================

  bottomSheet: {
    maxHeight: SCREEN_HEIGHT * 0.82,
    minHeight: SCREEN_HEIGHT * 0.64,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // SHEET HANDLE
  // ==========================================================

  sheetHandle: {
    alignSelf: 'center',
    width: 75,
    height: 5,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#8D9094',
  },


  // ==========================================================
  // SHEET TITLE
  // ==========================================================

  sheetTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  sheetDescription: {
    marginTop: 5,
    marginBottom: 17,
    fontSize: 14,
    lineHeight: 20,
    color: '#51746D',
  },


  // ==========================================================
  // SHEET SCROLL
  // ==========================================================

  sheetScroll: {
    flex: 1,
  },


  sheetScrollContent: {
    paddingBottom: 15,
  },


  // ==========================================================
  // ALTERNATIVE CARD
  // ==========================================================

  alternativeCard: {
    minHeight: 92,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#D7DADA',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },


  alternativeCardSelected: {
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // ALTERNATIVE IMAGE
  // ==========================================================

  alternativeImage: {
    width: 100,
    height: 68,
    borderRadius: 11,
    backgroundColor: '#D7DADA',
  },


  // ==========================================================
  // ALTERNATIVE INFO
  // ==========================================================

  alternativeInfo: {
    flex: 1,
    marginLeft: 16,
    minWidth: 0,
  },


  alternativeName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  alternativeMeta: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ==========================================================
  // SELECTED CHECK
  // ==========================================================

  selectedCheck: {
    width: 30,
    height: 30,
    marginRight: 6,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#227B68',
  },


  // ==========================================================
  // SHEET CONFIRM BUTTON
  // ==========================================================

  sheetConfirmButton: {
    height: 60,
    marginTop: 12,
    borderRadius: 31,
    backgroundColor: '#227B68',
    alignItems: 'center',
    justifyContent: 'center',
  },


  sheetConfirmButtonDisabled: {
    backgroundColor: '#929399',
  },


  sheetConfirmText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  sheetConfirmTextDisabled: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // SUCCESS TOAST
  // ==========================================================

  successToast: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 42,
    marginHorizontal: 20,
    minHeight: 60,
    paddingHorizontal: 16,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    elevation: 10,
  },


  successIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#003F34',
    alignItems: 'center',
    justifyContent: 'center',
  },


  successText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#003F34',
  },

});
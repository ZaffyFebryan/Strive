import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// WORKOUT HISTORY SCREEN
// ============================================================

export default function WorkoutHistoryScreen({ navigation }) {


  // ==========================================================
  // DATA RIWAYAT LATIHAN
  // ==========================================================

  const workoutHistory = [
    {
      id: '1',
      date: '20 Juli 2026',
      muscle: 'Punggung dan Bisep',
    },

    {
      id: '2',
      date: '21 Juli 2026',
      muscle: 'Dada, Bahu, dan Trisep',
    },

    {
      id: '3',
      date: '22 Juli 2026',
      muscle: 'Dada, Bahu, dan Trisep',
    },

    {
      id: '4',
      date: '23 Juli 2026',
      muscle: 'Punggung dan Bisep',
    },

    {
      id: '5',
      date: '24 Juli 2026',
      muscle: 'Dada, Bahu, dan Trisep',
    },
  ];


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // OPEN WORKOUT DETAIL
  // ==========================================================

  const handleOpenHistory = (item) => {

    // ========================================================
    // NANTI BISA DIARAHKAN KE HALAMAN DETAIL
    // ========================================================
    //
    // Contoh:
    //
    // navigation.navigate(
    //   'WorkoutHistoryDetail',
    //   {
    //     workout: item,
    //   }
    // );
    //
    // ========================================================

    console.log(
      'Buka riwayat latihan:',
      item.date
    );

  };


  // ==========================================================
  // RENDER HISTORY CARD
  // ==========================================================

  const renderWorkoutHistory = ({
    item,
  }) => {

    return (

      <View style={styles.historyCard}>


        {/* ==================================================
            BADGE ROW
        ================================================== */}

        <View style={styles.badgeRow}>


          {/* =================================================
              STATUS BADGE
          ================================================= */}

          <View style={styles.statusBadge}>

            <Text style={styles.statusBadgeText}>
              Selesai
            </Text>

          </View>


          {/* =================================================
              DATE BADGE
          ================================================= */}

          <View style={styles.dateBadge}>

            <Text style={styles.dateBadgeText}>
              {item.date}
            </Text>

          </View>


        </View>


        {/* ==================================================
            WORKOUT INFORMATION
        ================================================== */}

        <View style={styles.workoutInfo}>

          <Text style={styles.workoutTitle}>
            Latihan beban
          </Text>


          <Text style={styles.workoutMuscle}>
            {item.muscle}
          </Text>

        </View>


        {/* ==================================================
            DETAIL BUTTON
        ================================================== */}

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('DetailWorkoutHistory')}
          activeOpacity={0.85}
        >

          <Text style={styles.historyButtonText}>
            Lihat riwayat latihan
          </Text>


          {/* =================================================
              ARROW CIRCLE
          ================================================= */}

          <View style={styles.arrowCircle}>

            <Feather
              name="arrow-right"
              size={20}
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

    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View style={styles.header}>


        {/* ==================================================
            BACK BUTTON
        ================================================== */}

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


        {/* ==================================================
            TITLE
        ================================================== */}

        <Text style={styles.headerTitle}>
          Riwayat Latihan
        </Text>


      </View>


      {/* ====================================================
          HISTORY LIST
      ==================================================== */}

      <FlatList
        data={workoutHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkoutHistory}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={
          styles.listContent
        }

      />

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

  safeArea: {
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

    backgroundColor: '#FFFFFF',

    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',

    marginTop: 32,
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 40,
    height: 44,

    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
    marginLeft: 10,

    fontSize: 24,
    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // LIST
  // ==========================================================

  listContent: {
    paddingHorizontal: 20,

    paddingTop: 23,

    paddingBottom: 40,
  },


  // ==========================================================
  // HISTORY CARD
  // ==========================================================

  historyCard: {
    minHeight: 274,

    marginBottom: 8,

    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,

    borderRadius: 19,

    backgroundColor: '#F7F7F7',

    overflow: 'hidden',
  },


  // ==========================================================
  // BADGE ROW
  // ==========================================================

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,
  },


  // ==========================================================
  // STATUS BADGE
  // ==========================================================

  statusBadge: {
    height: 32,

    paddingHorizontal: 23,

    borderRadius: 18,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#62D5AE',
  },


  statusBadgeText: {
    fontSize: 14,

    fontWeight: '500',

    color: '#003F34',
  },


  // ==========================================================
  // DATE BADGE
  // ==========================================================

  dateBadge: {
    height: 32,

    paddingHorizontal: 17,

    borderRadius: 18,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#62D5AE',
  },


  dateBadgeText: {
    fontSize: 14,

    fontWeight: '500',

    color: '#003F34',
  },


  // ==========================================================
  // WORKOUT INFO
  // ==========================================================

  workoutInfo: {
    marginTop: 63,
  },


  // ==========================================================
  // WORKOUT TITLE
  // ==========================================================

  workoutTitle: {
    fontSize: 24,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // MUSCLE GROUP
  // ==========================================================

  workoutMuscle: {
    marginTop: 3,

    fontSize: 19,

    fontWeight: '400',

    color: '#23816F',
  },


  // ==========================================================
  // HISTORY BUTTON
  // ==========================================================

  historyButton: {
    height: 60,

    marginTop: 10,

    paddingLeft: 29,
    paddingRight: 7,

    borderRadius: 32,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#227B68',
  },


  // ==========================================================
  // BUTTON TEXT
  // ==========================================================

  historyButtonText: {
    fontSize: 19,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  // ==========================================================
  // ARROW CIRCLE
  // ==========================================================

  arrowCircle: {
    width: 46,
    height: 46,

    borderRadius: 23,

    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#003125',
  },

});
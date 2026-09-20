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
// RIWAYAT NUTRISI SCREEN
// ============================================================

export default function RiwayatNutrisiScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // DATA RIWAYAT NUTRISI
  // ==========================================================

  const historyData = [

    {
      id: 'history-1',
      status: 'Tercapai',
      statusType: 'success',
      date: '20 Juli 2026',
      calories: '2.360',
      target: '2.360',
    },

    {
      id: 'history-2',
      status: 'Hampir Tercapai',
      statusType: 'warning',
      date: '21 Juli 2026',
      calories: '2.260',
      target: '2.360',
    },

    {
      id: 'history-3',
      status: 'Belum Tercapai',
      statusType: 'danger',
      date: '22 Juli 2026',
      calories: '1.260',
      target: '2.360',
    },

  ];


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // LIHAT RIWAYAT NUTRISI
  // ==========================================================

  const handleViewHistory = (item) => {

    /*
      Nanti di sini bisa diarahkan ke halaman
      detail riwayat nutrisi.

      Contoh:

      navigation.navigate(
        'DetailRiwayatNutrisi',
        {
          historyId: item.id,
        }
      );

    */

  };


  // ==========================================================
  // STATUS STYLE
  // ==========================================================

  const getStatusStyle = (type) => {

    switch (type) {

      case 'success':

        return {
          backgroundColor:
            '#61D7AE',

          textColor:
            '#003F34',
        };


      case 'warning':

        return {
          backgroundColor:
            '#FFA313',

          textColor:
            '#000000',
        };


      case 'danger':

        return {
          backgroundColor:
            '#FF4048',

          textColor:
            '#000000',
        };


      default:

        return {
          backgroundColor:
            '#61D7AE',

          textColor:
            '#003F34',
        };

    }

  };


  // ==========================================================
  // RENDER HISTORY CARD
  // ==========================================================

  const renderHistoryCard = (item) => {

    const statusStyle =
      getStatusStyle(
        item.statusType
      );


    return (

      <View
        key={item.id}
        style={styles.historyCard}
      >

        {/* ==================================================
            TOP BADGES
        ================================================== */}

        <View style={styles.badgeRow}>

          {/* STATUS */}

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  statusStyle.backgroundColor,
              },
            ]}
          >

            <Text
              style={[
                styles.statusText,
                {
                  color:
                    statusStyle.textColor,
                },
              ]}
            >
              {item.status}
            </Text>

          </View>


          {/* DATE */}

          <View style={styles.dateBadge}>

            <Text style={styles.dateText}>
              {item.date}
            </Text>

          </View>

        </View>


        {/* ==================================================
            NUTRISI
        ================================================== */}

        <View style={styles.nutritionContent}>

          <Text style={styles.nutritionTitle}>
            Nutrisi
          </Text>


          <Text style={styles.calorieText}>
            Kalori {item.calories} / {item.target}g
          </Text>

        </View>


        {/* ==================================================
            VIEW BUTTON
        ================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.viewButton}
          onPress={() => navigation.navigate('DetailRiwayatNutrisi')}
        >

          <Text style={styles.viewButtonText}>
            Lihat riwayat nutrisi
          </Text>


          {/* ARROW CIRCLE */}

          <View style={styles.arrowCircle}>

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
            size={31}
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

        {historyData.map(
          item =>
            renderHistoryCard(item)
        )}


        {/* BOTTOM SPACE */}

        <View
          style={styles.bottomSpace}
        />

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
    paddingTop: 14,
    paddingBottom: 20,
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 64,
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
    marginTop: 32,
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
  // HISTORY CARD
  // ==========================================================

  historyCard: {
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 10,

    minHeight: 274,

    paddingTop: 24,
    paddingHorizontal: 19,
    paddingBottom: 24,

    borderRadius: 19,

    backgroundColor: '#F7F7F7',
  },


  // ==========================================================
  // BADGE ROW
  // ==========================================================

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ==========================================================
  // STATUS BADGE
  // ==========================================================

  statusBadge: {
    minHeight: 34,

    paddingHorizontal: 19,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },

  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },


  // ==========================================================
  // DATE BADGE
  // ==========================================================

  dateBadge: {
    minHeight: 34,

    marginLeft: 8,

    paddingHorizontal: 18,

    borderRadius: 20,

    backgroundColor: '#61D7AE',

    alignItems: 'center',
    justifyContent: 'center',
  },

  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#003F34',
  },


  // ==========================================================
  // NUTRITION CONTENT
  // ==========================================================

  nutritionContent: {
    marginTop: 61,
    marginLeft: 1,
  },

  nutritionTitle: {
    fontSize: 24,
    lineHeight: 29,

    fontWeight: '700',

    color: '#003F34',
  },

  calorieText: {
    marginTop: 3,

    fontSize: 19,
    lineHeight: 24,

    fontWeight: '400',

    color: '#25806D',
  },


  // ==========================================================
  // VIEW BUTTON
  // ==========================================================

  viewButton: {
    height: 61,

    marginTop: 10,

    paddingLeft: 29,
    paddingRight: 10,

    borderRadius: 32,

    backgroundColor: '#237A67',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  viewButtonText: {
    fontSize: 18,
    fontWeight: '700',

    color: '#FFFFFF',
  },


  // ==========================================================
  // ARROW CIRCLE
  // ==========================================================

  arrowCircle: {
    width: 43,
    height: 43,

    borderRadius: 22,

    backgroundColor: '#004F42',

    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomSpace: {
    height: 20,
  },

});
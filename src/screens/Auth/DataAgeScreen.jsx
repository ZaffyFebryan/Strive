import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// KONSTANTA
// ============================================================

const ITEM_HEIGHT = 42;


// ============================================================
// COMPONENT
// ============================================================

export default function UserDataAge({ navigation, route }) {

  // =====================================================
  // DATA DARI HALAMAN SEBELUMNYA
  // =====================================================

  const {
    name,
    email,
    password,
    gender,
  } = route?.params || {};


  // =====================================================
  // DATA USIA
  // =====================================================

  const ages = Array.from(
    { length: 83 },
    (_, index) => index + 18
  );


  // =====================================================
  // STATE USIA
  // =====================================================

  const [age, setAge] = useState(36);


  // =====================================================
  // INITIAL INDEX
  // =====================================================

  const INITIAL_INDEX = ages.indexOf(36);


  // =====================================================
  // HANDLE SCROLL USIA
  // =====================================================

  const handleAgeScroll = (event) => {

    const offsetY = event.nativeEvent.contentOffset.y;

    const index = Math.round(
      offsetY / ITEM_HEIGHT
    );

    if (ages[index] !== undefined) {
      setAge(ages[index]);
    }

  };


  // =====================================================
  // LANJUT
  // =====================================================

  const handleNext = () => {

    navigation.navigate('DataHW', {
      name,
      email,
      password,
      gender,
      age,
    });

  };


  // =====================================================
  // LEWATI
  // =====================================================

  const handleSkip = () => {

    navigation.navigate('DataHW', {
      name,
      email,
      password,
      gender,
      age: null,
    });

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


      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>

        {/* BACK BUTTON */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >

          <Feather
            name="chevron-left"
            size={31}
            color="#064C42"
          />

        </TouchableOpacity>


        {/* PROGRESS TEXT */}

        <Text style={styles.progressText}>
          2 dari 5
        </Text>

      </View>


      {/* =====================================================
          PROGRESS BAR + LEWATI
      ===================================================== */}

      <View style={styles.progressRow}>

        <View style={styles.progressContainer}>

          <View style={styles.progressBackground}>

            <View style={styles.progressActive} />

          </View>

        </View>


        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >

          <Text style={styles.skipText}>
            Lewati
          </Text>

        </TouchableOpacity>

      </View>


      {/* =====================================================
          TITLE
      ===================================================== */}

      <View style={styles.titleContainer}>

        <Text style={styles.title}>
          Berapa usia Anda saat ini?
        </Text>


        <Text style={styles.subtitle}>
          Data Usia membantu sistem menyesuaikan
          {'\n'}
          intensitas latihan beban serta pemulihan otot
          {'\n'}
          Anda.
        </Text>

      </View>


      {/* =====================================================
          AGE PICKER
      ===================================================== */}

      <View style={styles.ageContainer}>

        <FlatList
          data={ages}

          keyExtractor={(item) => item.toString()}

          showsVerticalScrollIndicator={false}

          snapToInterval={ITEM_HEIGHT}

          decelerationRate="fast"

          onScroll={handleAgeScroll}

          scrollEventThrottle={16}

          initialScrollIndex={INITIAL_INDEX}

          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}

          contentContainerStyle={styles.ageListContent}

          renderItem={({ item }) => {

            const isSelected = item === age;

            return (
              <View style={styles.ageItem}>

                {!isSelected && (

                  <Text
                    style={[
                      styles.ageSide,

                      item > age &&
                        styles.ageSideDark,
                    ]}
                  >
                    {item}
                  </Text>

                )}

              </View>
            );

          }}

        />


        {/* =================================================
            ACTIVE AGE BOX
        ================================================= */}

        <View style={styles.ageActiveBox}>

          <Text style={styles.ageActive}>
            {age}
          </Text>

        </View>

      </View>


      {/* =====================================================
          BOTTOM BUTTON
      ===================================================== */}

      <View style={styles.bottomContainer}>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >

          <Text style={styles.nextButtonText}>
            Lanjut
          </Text>

        </TouchableOpacity>

      </View>

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
  // HEADER
  // =====================================================

  header: {
    height: 130,
    paddingHorizontal: 27,
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },


  backButton: {
    width: 35,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  progressText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
    color: '#063F37',
    marginLeft: -35,
  },


  // =====================================================
  // PROGRESS BAR
  // =====================================================

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 27,
    marginTop: -32,
  },


  progressContainer: {
    flex: 1,
    marginRight: 22,
  },


  progressBackground: {
    width: '100%',
    height: 8,
    borderRadius: 10,
    backgroundColor: '#D5D5D5',
    overflow: 'hidden',
  },


  progressActive: {
    width: '40%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#1F6F5C',
  },


  skipButton: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },


  skipText: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '400',
    color: '#003125',
  },


  // =====================================================
  // TITLE
  // =====================================================

  titleContainer: {
    paddingHorizontal: 25,
    marginTop: 46,
    alignItems: 'center',
  },


  title: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
    color: '#003125',
    textAlign: 'center',
    letterSpacing: -0.6,
  },


  subtitle: {
    marginTop: 16,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    color: '#003125',
    textAlign: 'center',
    letterSpacing: -0.25,
  },


  // =====================================================
  // AGE PICKER
  // =====================================================

  ageContainer: {
    height: 260,
    marginTop: 46,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },


  ageListContent: {
    paddingTop: 94,
    paddingBottom: 94,
  },


  ageItem: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },


  ageSide: {
    fontSize: 28,
    lineHeight: 42,
    color: '#929399',
    fontWeight: '500',
  },


  ageSideDark: {
    color: '#003125',
  },


  // =====================================================
  // ACTIVE AGE BOX
  // =====================================================

  ageActiveBox: {
    position: 'absolute',
    top: 94,
    width: 132,
    height: 84,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#699F92',
    backgroundColor: '#E9F1EF',
    alignItems: 'center',
    justifyContent: 'center',
  },


  ageActive: {
    fontSize: 44,
    lineHeight: 52,
    fontWeight: '700',
    color: '#003125',
  },


  // =====================================================
  // BOTTOM BUTTON
  // =====================================================

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingBottom: 47,
    marginBottom: 16,
  },


  nextButton: {
    width: '100%',
    height: 60,
    borderRadius: 32,
    backgroundColor: '#1F6F5C',
    alignItems: 'center',
    justifyContent: 'center',
  },


  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

});
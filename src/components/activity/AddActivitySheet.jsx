import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


// ============================================================
// ADD ACTIVITY SHEET
// ============================================================

export default function AddActivitySheet({
  visible,
  onClose,
}) {

  // ==========================================================
  // NAVIGATION
  // ==========================================================

  const navigation = useNavigation();


  // ==========================================================
  // HANDLE LATIHAN BEBAN
  // ==========================================================

  const handleWorkout = () => {

    // Tutup Add Activity Sheet terlebih dahulu
    onClose();

    // Arahkan user ke halaman Latihan Beban
    navigation.navigate('Workout');

  };

  const handleNutrition = () => {

    // Tutup Add Activity Sheet terlebih dahulu
    onClose();

    // Arahkan user ke halaman Latihan Beban
    navigation.navigate('Nutrition');

  };

  // DIHAPUS SAJA
  const handleSleep = () => {

    // Tutup Add Activity Sheet terlebih dahulu
    onClose();

    // Arahkan user ke halaman Latihan Beban
    navigation.navigate('Sleep');

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >

      <View style={styles.overlay}>

        {/* ==================================================
            BACKGROUND OVERLAY
        ================================================== */}

        <TouchableOpacity
          style={styles.background}
          activeOpacity={1}
          onPress={onClose}
        />


        {/* ==================================================
            BOTTOM SHEET
        ================================================== */}

        <View style={styles.sheet}>


          {/* =================================================
              HANDLE
          ================================================= */}

          <View style={styles.handle} />


          {/* =================================================
              LATIHAN BEBAN
          ================================================= */}

          <TouchableOpacity
            style={styles.option}
            onPress={handleWorkout}
            activeOpacity={0.7}
          >

            <Image
              source={require('../../../assets/Beban.png')}
              style={styles.Beban}
              resizeMode="contain"
            />

            <Text style={styles.bebanText}>
              Latihan Beban
            </Text>

          </TouchableOpacity>


          {/* =================================================
              NUTRISI
          ================================================= */}

          <TouchableOpacity
            style={styles.option}
            onPress={handleNutrition}
            activeOpacity={0.7}
          >

            <Image
              source={require('../../../assets/Apel.png')}
              style={styles.Apel}
              resizeMode="contain"
            />

            <Text style={styles.apelText}>
              Asupan Nutrisi
            </Text>

          </TouchableOpacity>


          {/* =================================================
              TUTUP
          ================================================= */}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >

            <View style={styles.closeIcon}>

              <Feather
                name="x"
                size={16}
                color="#003F34"
              />

            </View>

            <Text style={styles.closeText}>
              Tutup
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </Modal>

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
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.35)',

    justifyContent: 'flex-end',
  },


  // ==========================================================
  // BACKGROUND
  // ==========================================================

  background: {
    flex: 1,
  },


  // ==========================================================
  // SHEET
  // ==========================================================

  sheet: {
    backgroundColor: '#F7F9FC',

    borderTopLeftRadius: 20,

    borderTopRightRadius: 20,

    paddingHorizontal: 21,

    paddingTop: 25,

    paddingBottom: 48,

    borderTopWidth: 2,

    borderRightWidth: 1,

    borderLeftWidth: 1,

    borderTopColor: '#699F92',
  },


  // ==========================================================
  // HANDLE
  // ==========================================================

  handle: {
    width: 70,

    height: 4,

    borderRadius: 4,

    backgroundColor: '#A7A9AD',

    alignSelf: 'center',

    marginBottom: 25,
  },


  // ==========================================================
  // OPTION
  // ==========================================================

  option: {
    height: 66,

    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#BFC5C3',
  },


  // ==========================================================
  // OPTION ICON
  // ==========================================================

  Beban: {
    width: 38,

    height: 38,
  },


  Apel: {
    width: 26,

    height: 26,

    marginLeft: 6,
  },


  Bulan: {
    width: 26,

    height: 26,

    marginLeft: 4,
  },


  // ==========================================================
  // OPTION TEXT
  // ==========================================================

  bebanText: {
    marginLeft: 16,

    fontSize: 19,

    fontWeight: '600',

    color: '#003125',
  },


  apelText: {
    marginLeft: 22,

    fontSize: 19,

    fontWeight: '600',

    color: '#003125',
  },


  bulanText: {
    marginLeft: 24,

    fontSize: 19,

    fontWeight: '600',

    color: '#003125',
  },


  // ==========================================================
  // CLOSE BUTTON
  // ==========================================================

  closeButton: {
    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 24,
  },


  // ==========================================================
  // CLOSE ICON
  // ==========================================================

  closeIcon: {
    marginTop: 24,

    width: 28,

    height: 28,

    borderRadius: 32,

    borderWidth: 2,

    borderColor: '#003F34',

    alignItems: 'center',

    justifyContent: 'center',
  },


  // ==========================================================
  // CLOSE TEXT
  // ==========================================================

  closeText: {
    marginTop: 5,

    fontSize: 17,

    fontWeight: '600',

    color: '#003125',
  },

});
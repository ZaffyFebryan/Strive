import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// TAMBAH HIDANGAN SCREEN
// ============================================================

export default function HidanganScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // NAMA HIDANGAN
  // ==========================================================

  const [dishName, setDishName] = useState('');


  // ==========================================================
  // FOCUS INPUT
  // ==========================================================

  const [nameFocused, setNameFocused] = useState(false);


  // ==========================================================
  // SELECTED FOODS
  // ==========================================================

  const [selectedFoods, setSelectedFoods] = useState([]);


  // ==========================================================
  // NOTIFICATION
  // ==========================================================

  const [showSuccess, setShowSuccess] = useState(false);


  // ==========================================================
  // FOOD DATA
  // ==========================================================

  const foods = [
    {
      id: 'food-nasi',
      name: 'Nasi',
      calories: 80,
    },

    {
      id: 'food-ayam-bakar',
      name: 'Ayam Bakar',
      calories: 140,
    },

    {
      id: 'food-telur',
      name: 'Telur',
      calories: 75,
    },
  ];


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // SELECT FOOD
  // ==========================================================

  const handleSelectFood = (id) => {

    setSelectedFoods(previous => {

      // Jika sudah dipilih,
      // maka batalkan pilihan.

      if (previous.includes(id)) {

        return previous.filter(
          item => item !== id
        );

      }


      // Jika belum dipilih,
      // tambahkan ke array.

      return [
        ...previous,
        id,
      ];

    });

  };


  // ==========================================================
  // VALIDATION
  // ==========================================================

  const hasDishName =
    dishName.trim().length > 0;


  const hasFoodSelection =
    selectedFoods.length > 0;


  const canSubmit =
    hasDishName &&
    hasFoodSelection;


  // ==========================================================
  // ADD DISH
  // ==========================================================

  const handleAddDish = () => {

    // Jangan lakukan apa-apa
    // jika form belum lengkap.

    if (!canSubmit) {
      return;
    }


    // Tampilkan popup berhasil.

    setShowSuccess(true);


    // Popup hilang setelah 2,5 detik.

    setTimeout(() => {

      navigation.goBack();

    }, 2000);

  };


  // ==========================================================
  // RENDER FOOD ITEM
  // ==========================================================

  const renderFoodItem = (food) => {

    const selected =
      selectedFoods.includes(food.id);


    return (

      <TouchableOpacity
        key={food.id}
        activeOpacity={0.8}
        onPress={() =>
          handleSelectFood(food.id)
        }
        style={[
          styles.foodCard,

          selected &&
            styles.foodCardSelected,
        ]}
      >

        {/* ==================================================
            RADIO
        ================================================== */}

        <View
          style={[
            styles.radioCircle,

            selected &&
              styles.radioCircleSelected,
          ]}
        >

          {selected && (

            <View
              style={
                styles.radioInner
              }
            />

          )}

        </View>


        {/* ==================================================
            FOOD INFORMATION
        ================================================== */}

        <View style={styles.foodTextContainer}>

          <Text style={styles.foodName}>
            {food.name}
          </Text>


          <Text style={styles.foodCalories}>
            {food.calories} kkal
          </Text>

        </View>

      </TouchableOpacity>

    );

  };


  // ==========================================================
  // SUCCESS NOTIFICATION
  // ==========================================================

  const renderSuccessNotification = () => {

    if (!showSuccess) {
      return null;
    }


    return (

      <View
        pointerEvents="none"
        style={styles.notificationWrapper}
      >

        <View style={styles.notification}>

          {/* ==================================================
              CHECK ICON
          ================================================== */}

          <View
            style={
              styles.notificationIcon
            }
          >

            <Feather
              name="check"
              size={18}
              color="#003F34"
            />

          </View>


          {/* ==================================================
              TEXT
          ================================================== */}

          <Text
            style={
              styles.notificationText
            }
          >
            Hidangan berhasil ditambahkan
          </Text>

        </View>

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


      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

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
            Tambah Hidangan
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
          keyboardShouldPersistTaps="handled"
        >

          {/* ==================================================
              NAMA HIDANGAN
          ================================================== */}

          <TextInput
            value={dishName}
            onChangeText={setDishName}
            placeholder="Masukkan nama hidangan"
            placeholderTextColor="#B2B3B8"
            style={[
              styles.nameInput,

              (
                nameFocused ||
                hasDishName
              ) &&
                styles.nameInputActive,
            ]}
            onFocus={() =>
              setNameFocused(true)
            }
            onBlur={() =>
              setNameFocused(false)
            }
            autoCapitalize="sentences"
            returnKeyType="done"
          />


          {/* ==================================================
              DAFTAR MAKANAN
          ================================================== */}

          <View style={styles.foodList}>

            {foods.map(food =>
              renderFoodItem(food)
            )}

          </View>


          {/* ==================================================
              TOMBOL TAMBAHKAN
          ================================================== */}

          <TouchableOpacity
            activeOpacity={
              canSubmit
                ? 0.8
                : 1
            }
            disabled={!canSubmit}
            onPress={handleAddDish}
            style={[
              styles.addButton,

              canSubmit &&
                styles.addButtonActive,
            ]}
          >

            <Text
              style={[
                styles.addButtonText,

                canSubmit &&
                  styles.addButtonTextActive,
              ]}
            >
              Tambahkan
            </Text>

          </TouchableOpacity>


          {/* ==================================================
              BOTTOM SPACE
          ================================================== */}

          <View
            style={
              styles.bottomSpace
            }
          />

        </ScrollView>

      </KeyboardAvoidingView>


      {/* ======================================================
          SUCCESS POPUP
      ====================================================== */}

      {renderSuccessNotification()}

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

  keyboard: {
    flex: 1,
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
  // NAMA HIDANGAN
  // ==========================================================

  nameInput: {
    height: 70,
    marginTop: 32,
    marginHorizontal: 20,
    paddingHorizontal: 27,
    borderWidth: 1,
    borderColor: '#A9ADB0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
    color: '#003F34',
  },

  nameInputActive: {
    borderColor: '#237A67',
    backgroundColor: '#EAF3F0',
    borderWidth: 2,
  },


  // ==========================================================
  // FOOD LIST
  // ==========================================================

  foodList: {
    marginTop: 28,
    paddingHorizontal: 20,
  },


  // ==========================================================
  // FOOD CARD
  // ==========================================================

  foodCard: {
    width: '52%',
    minHeight: 70,
    marginLeft: '48%',
    marginBottom: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#B8BBC0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  foodCardSelected: {
    borderColor: '#237A67',
    backgroundColor: '#EAF3F0',
    borderWidth: 2,
  },


  // ==========================================================
  // RADIO
  // ==========================================================

  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B8BBC0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioCircleSelected: {
    borderColor: '#237A67',
    backgroundColor: '#237A67',
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // FOOD TEXT
  // ==========================================================

  foodTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  foodName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
  },

  foodCalories: {
    marginTop: 2,
    fontSize: 16,
    color: '#173F37',
  },


  // ==========================================================
  // ADD BUTTON
  // ==========================================================

  addButton: {
    height: 60,
    marginTop: 14,
    marginHorizontal: 20,
    borderRadius: 32,
    backgroundColor: '#92939A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonActive: {
    backgroundColor: '#237A67',
  },

  addButtonText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  addButtonTextActive: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // SUCCESS NOTIFICATION
  // ==========================================================

  notificationWrapper: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
    elevation: 100,
  },

  notification: {
    width: '91%',
    minHeight: 60,
    paddingHorizontal: 18,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#003F34',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  notificationText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomSpace: {
    height: 40,
  },

});
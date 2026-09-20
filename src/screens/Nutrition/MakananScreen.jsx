import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// TAMBAH MAKANAN SCREEN
// ============================================================

export default function MakananScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // FORM
  // ==========================================================

  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbohydrate, setCarbohydrate] = useState('');
  const [protein, setProtein] = useState('');
  const [fiber, setFiber] = useState('');


  // ==========================================================
  // FOCUS
  // ==========================================================

  const [focusedField, setFocusedField] = useState(null);


  // ==========================================================
  // SUCCESS POPUP
  // ==========================================================

  const [showSuccess, setShowSuccess] = useState(false);


  // ==========================================================
  // CLEANUP TIMER
  // ==========================================================

  useEffect(() => {

    return () => {
      // Tidak ada timer yang perlu dibersihkan
      // karena timer disimpan secara lokal pada handleAdd.
    };

  }, []);


  // ==========================================================
  // CHECK FORM
  // ==========================================================

  const isFormComplete =
    foodName.trim().length > 0 &&
    calories.trim().length > 0 &&
    carbohydrate.trim().length > 0 &&
    protein.trim().length > 0 &&
    fiber.trim().length > 0;


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    if (showSuccess) {
      return;
    }

    navigation.goBack();

  };


  // ==========================================================
  // ADD FOOD
  // ==========================================================

  const handleAdd = () => {

    if (!isFormComplete || showSuccess) {
      return;
    }


    // ========================================================
    // DATA MAKANAN BARU
    // ========================================================

    const newFood = {
      id: `food-${Date.now()}`,
      name: foodName.trim(),
      calories: Number(calories),
      carbohydrate: Number(carbohydrate),
      protein: Number(protein),
      fiber: Number(fiber),
    };


    // ========================================================
    // KIRIM DATA KE HALAMAN SEBELUMNYA
    // ========================================================

    if (
      route?.params?.onFoodAdded &&
      typeof route.params.onFoodAdded === 'function'
    ) {

      route.params.onFoodAdded(newFood);

    }


    // ========================================================
    // TAMPILKAN POPUP
    // ========================================================

    setShowSuccess(true);


    // ========================================================
    // KEMBALI KE HALAMAN MAKANAN SAYA
    // ========================================================

    setTimeout(() => {

      navigation.goBack();

    }, 2000);

  };


  // ==========================================================
  // FIELD STYLE HELPER
  // ==========================================================

  const getFieldStyle = (fieldName, value) => {

    const isActive =
      focusedField === fieldName ||
      value.trim().length > 0;


    return [
      styles.inputBox,
      isActive && styles.inputBoxActive,
    ];

  };


  // ==========================================================
  // RENDER TEXT INPUT
  // ==========================================================

  const renderInput = ({
    fieldName,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
  }) => {

    return (

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B5B6BB"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={!showSuccess}
        style={getFieldStyle(fieldName, value)}
        onFocus={() => setFocusedField(fieldName)}
        onBlur={() => setFocusedField(null)}
        selectionColor="#237A67"
      />

    );

  };


  // ==========================================================
  // RENDER NUTRITION ROW
  // ==========================================================

  const renderNutritionRow = ({
    label,
    fieldName,
    value,
    onChangeText,
    unit,
  }) => {

    const isActive =
      focusedField === fieldName ||
      value.trim().length > 0;


    return (

      <View style={styles.nutritionRow}>

        <Text style={styles.nutritionLabel}>
          {label}
        </Text>


        <View
          style={[
            styles.nutritionInputWrapper,

            isActive &&
              styles.nutritionInputWrapperActive,
          ]}
        >

          <TextInput
            value={value}
            onChangeText={text => {

              // Hanya angka dan titik desimal
              const cleaned = text.replace(
                /[^0-9.]/g,
                ''
              );

              onChangeText(cleaned);

            }}
            keyboardType="decimal-pad"
            editable={!showSuccess}
            style={styles.nutritionInput}
            onFocus={() =>
              setFocusedField(fieldName)
            }
            onBlur={() =>
              setFocusedField(null)
            }
            selectionColor="#237A67"
          />


          <Text
            style={[
              styles.unitText,

              isActive &&
                styles.unitTextActive,
            ]}
          >
            {unit}
          </Text>

        </View>

      </View>

    );

  };


  // ==========================================================
  // SUCCESS POPUP
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

          <View style={styles.notificationIcon}>

            <Feather
              name="check"
              size={18}
              color="#003F34"
            />

          </View>


          {/* ==================================================
              TEXT
          ================================================== */}

          <Text style={styles.notificationText}>
            Makanan berhasil ditambahkan
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
        style={styles.keyboardContainer}
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
            disabled={showSuccess}
          >

            <Feather
              name="chevron-left"
              size={30}
              color="#003F34"
            />

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
            Tambah Makanan
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
              NAMA MAKANAN
          ================================================== */}

          <View style={styles.foodNameContainer}>

            {renderInput({
              fieldName: 'foodName',
              value: foodName,
              onChangeText: setFoodName,
              placeholder:
                'Masukkan nama makanan',
              keyboardType: 'default',
              autoCapitalize: 'sentences',
            })}

          </View>


          {/* ==================================================
              NUTRITION FORM
          ================================================== */}

          <View style={styles.nutritionContainer}>


            {/* =================================================
                KALORI
            ================================================= */}

            {renderNutritionRow({
              label: 'Kalori per porsi',
              fieldName: 'calories',
              value: calories,
              onChangeText: setCalories,
              unit: 'kkal',
            })}


            {/* =================================================
                KARBOHIDRAT
            ================================================= */}

            {renderNutritionRow({
              label: 'Karbohidrat',
              fieldName: 'carbohydrate',
              value: carbohydrate,
              onChangeText: setCarbohydrate,
              unit: 'g',
            })}


            {/* =================================================
                PROTEIN
            ================================================= */}

            {renderNutritionRow({
              label: 'Protein',
              fieldName: 'protein',
              value: protein,
              onChangeText: setProtein,
              unit: 'g',
            })}


            {/* =================================================
                SERAT
            ================================================= */}

            {renderNutritionRow({
              label: 'Serat',
              fieldName: 'fiber',
              value: fiber,
              onChangeText: setFiber,
              unit: 'g',
            })}

          </View>


          {/* ==================================================
              TAMBAHKAN BUTTON
          ================================================== */}

          <TouchableOpacity
            activeOpacity={
              isFormComplete
                ? 0.8
                : 1
            }
            disabled={
              !isFormComplete ||
              showSuccess
            }
            onPress={handleAdd}
            style={[
              styles.addButton,

              isFormComplete &&
                styles.addButtonActive,
            ]}
          >

            <Text
              style={[
                styles.addButtonText,

                isFormComplete &&
                  styles.addButtonTextActive,
              ]}
            >
              Tambahkan
            </Text>

          </TouchableOpacity>


          {/* ==================================================
              BOTTOM SPACE
          ================================================== */}

          <View style={styles.bottomSpace} />

        </ScrollView>

      </KeyboardAvoidingView>


      {/* ======================================================
          SUCCESS NOTIFICATION
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

  keyboardContainer: {
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
  // FOOD NAME
  // ==========================================================

  foodNameContainer: {
    marginTop: 32,
    marginHorizontal: 20,
  },

  inputBox: {
    width: '100%',
    height: 70,
    paddingHorizontal: 27,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#B4B5BA',
    backgroundColor: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    color: '#003F34',
  },

  inputBoxActive: {
    borderColor: '#237A67',
    backgroundColor: '#EAF3F0',
    borderWidth: 1.5,
  },


  // ==========================================================
  // NUTRITION
  // ==========================================================

  nutritionContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  nutritionRow: {
    minHeight: 76,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nutritionLabel: {
    flex: 1,
    fontSize: 19,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // NUTRITION INPUT
  // ==========================================================

  nutritionInputWrapper: {
    width: 171,
    height: 60,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#B4B5BA',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  nutritionInputWrapperActive: {
    borderColor: '#237A67',
    backgroundColor: '#EAF3F0',
    borderWidth: 1.5,
  },

  nutritionInput: {
    flex: 1,
    height: 58,
    paddingLeft: 17,
    paddingRight: 4,
    fontSize: 18,
    fontWeight: '600',
    color: '#003F34',
    textAlign: 'left',
  },

  unitText: {
    paddingRight: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#003F34',
  },

  unitTextActive: {
    color: '#003F34',
  },


  // ==========================================================
  // ADD BUTTON
  // ==========================================================

  addButton: {
    marginTop: 17,
    marginHorizontal: 20,
    height: 60,
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
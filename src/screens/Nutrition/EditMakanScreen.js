import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// EDIT MAKAN SCREEN
// ============================================================

export default function EditMakanScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // FOOD DATA
  // ==========================================================

  const mealType =
    route?.params?.mealType || 'Makan Pagi';


  // ==========================================================
  // FOOD STATE
  // ==========================================================

  const [foods, setFoods] = useState([
    {
      id: 1,
      name: 'Nasi',
      calories: 120,
      portion: 1.5,
    },

    {
      id: 2,
      name: 'Steik Dada Ayam',
      calories: 243,
      portion: 1,
    },
  ]);


  // ==========================================================
  // CHANGE PORTION
  // ==========================================================

  const increasePortion = (id) => {

    setFoods(previousFoods =>
      previousFoods.map(food => {

        if (food.id !== id) {
          return food;
        }

        return {
          ...food,
          portion:
            Math.round(
              (food.portion + 0.5) * 10
            ) / 10,
        };

      })
    );
  };


  const decreasePortion = (id) => {

    setFoods(previousFoods =>
      previousFoods.map(food => {

        if (food.id !== id) {
          return food;
        }

        const newPortion =
          Math.round(
            (food.portion - 0.5) * 10
          ) / 10;

        return {
          ...food,
          portion:
            newPortion < 0.5
              ? 0.5
              : newPortion,
        };

      })
    );
  };


  // ==========================================================
  // TOTAL NUTRITION
  // ==========================================================

  const totalCalories =
    363;

  const totalProtein =
    36;

  const totalFiber =
    9;

  const totalCarbohydrate =
    122;


  // ==========================================================
  // PORTION TEXT
  // ==========================================================

  const getPortionText = (portion) => {

    return Number.isInteger(portion)
      ? `${portion} Porsi`
      : `${portion.toString().replace('.', ',')} Porsi`;

  };


  // ==========================================================
  // ADD FOOD
  // ==========================================================

  const handleAddFood = () => {

    // Tempat untuk membuka halaman
    // pencarian / pemilihan makanan.
    //
    // Untuk saat ini dibuat sebagai tombol
    // sesuai desain screenshot.

  };


  // ==========================================================
  // FINISH
  // ==========================================================

  const handleFinish = () => {

    navigation.goBack();

  };


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // RENDER FOOD
  // ==========================================================

  const renderFood = (food) => {

    return (

      <View
        key={food.id}
        style={styles.foodCard}
      >

        {/* ================================================
            FOOD INFORMATION
        ================================================= */}

        <View style={styles.foodInformation}>

          <Text style={styles.foodName}>
            {food.name}
          </Text>

          <Text style={styles.foodDetail}>

            {food.calories} kkal

            {'  |  '}

            {getPortionText(food.portion)}

          </Text>

        </View>


        {/* ================================================
            QUANTITY CONTROL
        ================================================= */}

        <View style={styles.quantityContainer}>

          <TouchableOpacity
            style={styles.quantityButton}
            activeOpacity={0.7}
            onPress={() =>
              decreasePortion(food.id)
            }
          >

            <Feather
              name="minus"
              size={25}
              color="#003F34"
            />

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.quantityButton}
            activeOpacity={0.7}
            onPress={() =>
              increasePortion(food.id)
            }
          >

            <Feather
              name="plus"
              size={25}
              color="#003F34"
            />

          </TouchableOpacity>

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
          Edit Makanan
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
            JUMLAH NUTRISI
        ================================================== */}

        <Text style={styles.sectionTitle}>
          Jumlah nutrisi
        </Text>


        {/* ==================================================
            NUTRITION ROW 1
        ================================================== */}

        <View style={styles.nutritionRow}>

          {/* KALORI */}

          <View
            style={[
              styles.nutritionBox,
              styles.calorieBox,
            ]}
          >

            <Text style={styles.calorieLabel}>
              Kalori
            </Text>

            <Text style={styles.calorieValue}>
              {totalCalories}g
            </Text>

          </View>


          {/* PROTEIN */}

          <View
            style={[
              styles.nutritionBox,
              styles.proteinBox,
            ]}
          >

            <Text style={styles.darkNutritionLabel}>
              Protein
            </Text>

            <Text style={styles.darkNutritionValue}>
              {totalProtein}g
            </Text>

          </View>

        </View>


        {/* ==================================================
            NUTRITION ROW 2
        ================================================== */}

        <View style={styles.nutritionRowBottom}>

          {/* SERAT */}

          <View
            style={[
              styles.nutritionBox,
              styles.fiberBox,
            ]}
          >

            <Text style={styles.darkNutritionLabel}>
              Serat
            </Text>

            <Text style={styles.darkNutritionValue}>
              {totalFiber}g
            </Text>

          </View>


          {/* KARBOHIDRAT */}

          <View
            style={[
              styles.nutritionBox,
              styles.carbBox,
            ]}
          >

            <Text style={styles.darkNutritionLabel}>
              Karbohidrat
            </Text>

            <Text style={styles.darkNutritionValue}>
              {totalCarbohydrate}g
            </Text>

          </View>

        </View>


        {/* ==================================================
            MAKANAN
        ================================================== */}

        <Text style={styles.foodSectionTitle}>
          Makanan
        </Text>


        {/* ==================================================
            FOOD LIST
        ================================================== */}

        <View style={styles.foodList}>

          {foods.map(food =>
            renderFood(food)
          )}

        </View>


        {/* ==================================================
            TAMBAH MAKANAN
        ================================================== */}

        <TouchableOpacity
          style={styles.addFoodButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('TambahMakanan')}
        >

          <Feather
            name="plus"
            size={25}
            color="#003F34"
          />

          <Text style={styles.addFoodText}>
            Tambah makanan
          </Text>

        </TouchableOpacity>


        {/* ==================================================
            SELESAI
        ================================================== */}

        <TouchableOpacity
          style={styles.finishButton}
          activeOpacity={0.85}
          onPress={handleFinish}
        >

          <Text style={styles.finishText}>
            Selesai
          </Text>

        </TouchableOpacity>


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
    paddingBottom: 20,
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
  // SECTION
  // ==========================================================

  sectionTitle: {
    marginTop: 34,
    marginHorizontal: 20,
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // NUTRITION
  // ==========================================================

  nutritionRow: {
    marginTop: 11,
    marginHorizontal: 19,
    flexDirection: 'row',
    gap: 9,
  },

  nutritionRowBottom: {
    marginTop: 8,
    marginHorizontal: 19,
    flexDirection: 'row',
    gap: 9,
  },

  nutritionBox: {
    height: 72,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calorieBox: {
    flex: 1.2,
    backgroundColor: '#28554A',
  },

  proteinBox: {
    flex: 1,
    backgroundColor: '#A5CDAA',
    borderWidth: 1,
    borderColor: '#58945F',
  },

  fiberBox: {
    flex: 0.8,
    backgroundColor: '#99C0BE',
    borderWidth: 1,
    borderColor: '#237D78',
  },

  carbBox: {
    flex: 1,
    backgroundColor: '#E4D39A',
    borderWidth: 1,
    borderColor: '#A88B2B',
  },

  calorieLabel: {
    fontSize: 17,
    color: '#FFFFFF',
  },

  calorieValue: {
    marginTop: 2,
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  darkNutritionLabel: {
    fontSize: 17,
    color: '#173F37',
  },

  darkNutritionValue: {
    marginTop: 2,
    fontSize: 19,
    fontWeight: '700',
    color: '#173F37',
  },


  // ==========================================================
  // FOOD
  // ==========================================================

  foodSectionTitle: {
    marginTop: 19,
    marginHorizontal: 20,
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },

  foodList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  foodCard: {
    minHeight: 70,
    marginBottom: 12,
    paddingLeft: 28,
    paddingRight: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  foodInformation: {
    flex: 1,
    justifyContent: 'center',
  },

  foodName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
  },

  foodDetail: {
    marginTop: 2,
    fontSize: 16,
    color: '#173F37',
  },


  // ==========================================================
  // QUANTITY
  // ==========================================================

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 39,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // ADD FOOD
  // ==========================================================

  addFoodButton: {
    marginTop: 0,
    marginHorizontal: 21,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A9ADB0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  addFoodText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#003F34',
  },


  // ==========================================================
  // FINISH
  // ==========================================================

  finishButton: {
    marginTop: 32,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 32,
    backgroundColor: '#237A67',
    alignItems: 'center',
    justifyContent: 'center',
  },

  finishText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomSpace: {
    height: 30,
  },

});
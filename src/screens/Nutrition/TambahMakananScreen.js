import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// TAMBAH MAKANAN SCREEN
// ============================================================

export default function TambahMakananScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // TAB
  // ==========================================================

  const [activeTab, setActiveTab] =
    useState('food');


  // ==========================================================
  // SEARCH
  // ==========================================================

  const [searchText, setSearchText] =
    useState('');


  // ==========================================================
  // SELECTED FOOD
  // ==========================================================

  const [selectedFoods, setSelectedFoods] =
    useState([]);


  // ==========================================================
  // SELECTED DISH
  // ==========================================================

  const [selectedDishes, setSelectedDishes] =
    useState([]);


  // ==========================================================
  // SUCCESS NOTIFICATION
  // ==========================================================

  const [showSuccess, setShowSuccess] =
    useState(false);


  // ==========================================================
  // SAVE TIMER
  // ==========================================================

  const saveTimerRef = useRef(null);


  // ==========================================================
  // CLEANUP TIMER
  // ==========================================================

  useEffect(() => {

    return () => {

      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

    };

  }, []);


  // ==========================================================
  // FOOD DATA
  // ==========================================================

  const favoriteFoods = [
    {
      id: 'food-nasi',
      name: 'Nasi',
      calories: 80,
    },

    {
      id: 'food-ayam',
      name: 'Ayam',
      calories: 120,
    },
  ];


  const otherFoods = [
    {
      id: 'food-telur',
      name: 'Telur',
      calories: 75,
    },
  ];


  // ==========================================================
  // DISH DATA
  // ==========================================================

  const dishes = [
    {
      id: 'dish-nasi-telur',
      name: 'Nasi telur',
      calories: 155,
    },
  ];


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // CHANGE TAB
  // ==========================================================

  const handleChangeTab = (tab) => {

    setActiveTab(tab);

    setSearchText('');

  };


  // ==========================================================
  // SELECT FOOD
  // ==========================================================

  const handleSelectFood = (id) => {

    setSelectedFoods(previous => {

      if (previous.includes(id)) {

        return previous.filter(
          item => item !== id
        );

      }

      return [
        ...previous,
        id,
      ];

    });

  };


  // ==========================================================
  // SELECT DISH
  // ==========================================================

  const handleSelectDish = (id) => {

    setSelectedDishes(previous => {

      if (previous.includes(id)) {

        return previous.filter(
          item => item !== id
        );

      }

      return [
        ...previous,
        id,
      ];

    });

  };


  // ==========================================================
  // HAS SELECTION
  // ==========================================================

  const hasSelection =
    activeTab === 'food'
      ? selectedFoods.length > 0
      : selectedDishes.length > 0;


  // ==========================================================
  // SEARCH FILTER
  // ==========================================================

  const filterFoods = (items) => {

    if (!searchText.trim()) {
      return items;
    }

    return items.filter(item =>
      item.name
        .toLowerCase()
        .includes(
          searchText
            .toLowerCase()
            .trim()
        )
    );

  };


  const filteredFavoriteFoods =
    filterFoods(favoriteFoods);


  const filteredOtherFoods =
    filterFoods(otherFoods);


  const filteredDishes =
    filterFoods(dishes);


  // ==========================================================
  // SAVE
  // ==========================================================

  const handleSave = () => {

    // Tidak melakukan apa-apa jika belum memilih
    if (!hasSelection) {
      return;
    }


    // Tampilkan popup berhasil
    setShowSuccess(true);


    // Hapus timer sebelumnya jika ada
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }


    // ========================================================
    // SETELAH 2,5 DETIK KEMBALI KE HALAMAN NUTRISI
    // ========================================================

    saveTimerRef.current = setTimeout(() => {

      setShowSuccess(false);

      // Karena halaman ini dibuka dari Nutrisi,
      // goBack() akan kembali ke halaman Nutrisi.
      navigation.goBack();

    }, 2500);

  };


  // ==========================================================
  // RENDER SEARCH
  // ==========================================================

  const renderSearch = () => {

    return (

      <View style={styles.searchContainer}>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Cari"
          placeholderTextColor="#73777C"
          style={styles.searchInput}
          returnKeyType="search"
        />


        <Feather
          name="search"
          size={29}
          color="#6C7077"
          style={styles.searchIcon}
        />

      </View>

    );

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
          styles.itemCard,

          selected &&
            styles.itemCardSelected,
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
            FOOD TEXT
        ================================================== */}

        <View style={styles.itemTextContainer}>

          <Text style={styles.itemName}>
            {food.name}
          </Text>

          <Text style={styles.itemCalories}>
            {food.calories} kkal
          </Text>

        </View>

      </TouchableOpacity>

    );

  };


  // ==========================================================
  // RENDER DISH ITEM
  // ==========================================================

  const renderDishItem = (dish) => {

    const selected =
      selectedDishes.includes(dish.id);


    return (

      <TouchableOpacity
        key={dish.id}
        activeOpacity={0.8}
        onPress={() =>
          handleSelectDish(dish.id)
        }
        style={[
          styles.itemCard,

          selected &&
            styles.itemCardSelected,
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
            DISH TEXT
        ================================================== */}

        <View style={styles.itemTextContainer}>

          <Text style={styles.itemName}>
            {dish.name}
          </Text>

          <Text style={styles.itemCalories}>
            {dish.calories} kkal
          </Text>

        </View>

      </TouchableOpacity>

    );

  };


  // ==========================================================
  // ADD FOOD
  // ==========================================================

  const handleAddFood = () => {

    // Tempat untuk halaman tambah
    // makanan baru apabila nanti dibutuhkan.

  };


  // ==========================================================
  // ADD DISH
  // ==========================================================

  const handleAddDish = () => {

    // Tempat untuk halaman tambah
    // hidangan baru apabila nanti dibutuhkan.

  };


  // ==========================================================
  // RENDER FOOD TAB
  // ==========================================================

  const renderFoodTab = () => {

    return (

      <>

        {/* ==================================================
            FAVORIT
        ================================================== */}

        <Text style={styles.categoryTitle}>
          Makanan favorit
        </Text>


        <View style={styles.itemsContainer}>

          {filteredFavoriteFoods.map(
            food =>
              renderFoodItem(food)
          )}

        </View>


        {/* ==================================================
            LAINNYA
        ================================================== */}

        {filteredOtherFoods.length > 0 && (

          <>

            <Text
              style={[
                styles.categoryTitle,
                styles.otherTitle,
              ]}
            >
              Lainnya
            </Text>


            <View
              style={styles.itemsContainer}
            >

              {filteredOtherFoods.map(
                food =>
                  renderFoodItem(food)
              )}

            </View>

          </>

        )}


        {/* ==================================================
            TAMBAH MAKANAN
        ================================================== */}

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Makanan')}
        >

          <Feather
            name="plus"
            size={25}
            color="#003F34"
          />

          <Text style={styles.addButtonText}>
            Tambah makanan
          </Text>

        </TouchableOpacity>


        {/* ==================================================
            SIMPAN
        ================================================== */}

        {renderSaveButton()}

      </>

    );

  };


  // ==========================================================
  // RENDER DISH TAB
  // ==========================================================

  const renderDishTab = () => {

    return (

      <>

        {/* ==================================================
            DISH LIST
        ================================================== */}

        <View style={styles.dishList}>

          {filteredDishes.map(
            dish =>
              renderDishItem(dish)
          )}

        </View>


        {/* ==================================================
            TAMBAH HIDANGAN
        ================================================== */}

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Hidangan')}
        >

          <Feather
            name="plus"
            size={25}
            color="#003F34"
          />

          <Text style={styles.addButtonText}>
            Tambah Hidangan
          </Text>

        </TouchableOpacity>


        {/* ==================================================
            SIMPAN
        ================================================== */}

        {renderSaveButton()}

      </>

    );

  };


  // ==========================================================
  // SAVE BUTTON
  // ==========================================================

  const renderSaveButton = () => {

    return (

      <TouchableOpacity
        activeOpacity={
          hasSelection
            ? 0.8
            : 1
        }
        disabled={!hasSelection}
        onPress={handleSave}
        style={[
          styles.saveButton,

          hasSelection &&
            styles.saveButtonActive,
        ]}
      >

        <Text
          style={[
            styles.saveButtonText,

            hasSelection &&
              styles.saveButtonTextActive,
          ]}
        >
          Simpan
        </Text>

      </TouchableOpacity>

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

          <View
            style={
              styles.notificationIcon
            }
          >

            <Feather
              name="check"
              size={19}
              color="#003F34"
            />

          </View>


          <Text
            style={
              styles.notificationText
            }
          >
            {activeTab === 'food'
              ? 'Makanan berhasil disimpan'
              : 'Hidangan berhasil disimpan'}
          </Text>

        </View>

      </View>

    );

  };


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  const headerTitle =
    activeTab === 'food'
      ? 'Makanan saya'
      : 'Hidangan saya';


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
          {headerTitle}
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
            SEARCH
        ================================================== */}

        {renderSearch()}


        {/* ==================================================
            TABS
        ================================================== */}

        <View style={styles.tabsContainer}>

          {/* MAKANAN SAYA */}

          <TouchableOpacity
            style={styles.tabButton}
            activeOpacity={0.7}
            onPress={() =>
              handleChangeTab('food')
            }
          >

            <Text
              style={[
                styles.tabText,

                activeTab === 'food' &&
                  styles.tabTextActive,
              ]}
            >
              Makanan saya
            </Text>


            {activeTab === 'food' && (

              <View
                style={
                  styles.tabIndicator
                }
              />

            )}

          </TouchableOpacity>


          {/* HIDANGAN SAYA */}

          <TouchableOpacity
            style={styles.tabButton}
            activeOpacity={0.7}
            onPress={() =>
              handleChangeTab('dish')
            }
          >

            <Text
              style={[
                styles.tabText,

                activeTab === 'dish' &&
                  styles.tabTextActive,
              ]}
            >
              Hidangan saya
            </Text>


            {activeTab === 'dish' && (

              <View
                style={
                  styles.tabIndicator
                }
              />

            )}

          </TouchableOpacity>

        </View>


        {/* ==================================================
            TAB CONTENT
        ================================================== */}

        {activeTab === 'food'
          ? renderFoodTab()
          : renderDishTab()}


        <View
          style={styles.bottomSpace}
        />

      </ScrollView>


      {/* ====================================================
          SUCCESS NOTIFICATION
      ==================================================== */}

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
  // SEARCH
  // ==========================================================

  searchContainer: {
    marginTop: 32,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 32,
    backgroundColor: '#F1F1F3',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flex: 1,
    height: 60,
    paddingLeft: 31,
    paddingRight: 55,
    fontSize: 17,
    color: '#303538',
  },

  searchIcon: {
    position: 'absolute',
    right: 28,
  },


  // ==========================================================
  // TABS
  // ==========================================================

  tabsContainer: {
    marginTop: 12,
    paddingHorizontal: 20,
    height: 47,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  tabButton: {
    flex: 1,
    height: 47,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  tabText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
    paddingTop: 5,
  },

  tabTextActive: {
    fontWeight: '700',
  },

  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 117,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#003F34',
  },


  // ==========================================================
  // CATEGORY
  // ==========================================================

  categoryTitle: {
    marginTop: 22,
    marginHorizontal: 20,
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
  },

  otherTitle: {
    marginTop: 6,
  },


  // ==========================================================
  // ITEM LIST
  // ==========================================================

  itemsContainer: {
    marginTop: 16,
    paddingHorizontal: 19,
  },

  dishList: {
    marginTop: 13,
    paddingHorizontal: 20,
  },


  // ==========================================================
  // ITEM CARD
  // ==========================================================

  itemCard: {
    minHeight: 70,
    marginBottom: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemCardSelected: {
    borderColor: '#237A67',
    backgroundColor: '#DDEDE8',
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
    borderColor: '#69A99A',
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
  // ITEM TEXT
  // ==========================================================

  itemTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  itemName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
  },

  itemCalories: {
    marginTop: 2,
    fontSize: 16,
    color: '#173F37',
  },


  // ==========================================================
  // ADD BUTTON
  // ==========================================================

  addButton: {
    marginTop: 0,
    marginHorizontal: 20,
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

  addButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#003F34',
  },


  // ==========================================================
  // SAVE BUTTON
  // ==========================================================

  saveButton: {
    marginTop: 32,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 32,
    backgroundColor: '#92939A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonActive: {
    backgroundColor: '#237A67',
  },

  saveButtonText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  saveButtonTextActive: {
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
    marginTop: 0,
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
    height: 30,
  },

});
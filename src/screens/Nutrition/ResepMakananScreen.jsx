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
  Image,
  Dimensions,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// DEVICE
// ============================================================

const { width } = Dimensions.get('window');


// ============================================================
// RESEP MAKANAN SCREEN
// ============================================================

export default function ResepMakananScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // SEARCH
  // ==========================================================

  const [searchText, setSearchText] = useState('');


  // ==========================================================
  // DATA RESEP
  //
  // Pastikan nama file di assets sesuai dengan project kamu.
  // ==========================================================

  const recipes = [

    {
      id: 'recipe-1',
      title:
        'Dada Ayam Panggang Teppanyaki yang Tinggi Protein',
      image: require('../../../assets/dadaayam.png'),
    },

    {
      id: 'recipe-2',
      title:
        'Omelet Sayur Keju, Sangat Praktis untuk Menu Sarapan',
      image: require('../../../assets/omelet.png'),
    },

    {
      id: 'recipe-3',
      title:
        'Resep Tumis Sapi Brokoli Saus Tiram yang Rendah Kalori',
      image: require('../../../assets/tumissapi.png'),
    },

    {
      id: 'recipe-4',
      title:
        'Resep Gado-Gado Siram Spesial Pelacak Serat Harian',
      image: require('../../../assets/gadogado.png'),
    },

    {
      id: 'recipe-5',
      title:
        'Resep Nasi Goreng Merah Dada Ayam yang Rendah Minyak',
      image: require('../../../assets/nasigoreng.png'),
    },

  ];


  // ==========================================================
  // FILTER
  // ==========================================================

  const filteredRecipes = recipes.filter(recipe => {

    const keyword = searchText
      .toLowerCase()
      .trim();

    if (!keyword) {
      return true;
    }

    return recipe.title
      .toLowerCase()
      .includes(keyword);

  });


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // RESEP PRESS
  // ==========================================================

    const handleRecipePress = (recipe) => {

    navigation.navigate(
        'DetailResepMakanan',
        {
        recipeId: recipe.id,
        }
    );

    };


  // ==========================================================
  // SEARCH
  // ==========================================================

  const renderSearch = () => {

    return (

      <View style={styles.searchContainer}>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Cari resep makanan..."
          placeholderTextColor="#6C6E76"
          style={styles.searchInput}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />

        <Feather
          name="search"
          size={28}
          color="#696B73"
          style={styles.searchIcon}
        />

      </View>

    );

  };


  // ==========================================================
  // RECIPE ITEM
  // ==========================================================

  const renderRecipeItem = (recipe) => {

    return (

      <TouchableOpacity
        key={recipe.id}
        activeOpacity={0.85}
        onPress={() =>
          handleRecipePress(recipe)
        }
        style={styles.recipeItem}
      >

        {/* ==================================================
            IMAGE
        ================================================== */}

        <Image
          source={recipe.image}
          style={styles.recipeImage}
          resizeMode="cover"
        />


        {/* ==================================================
            TITLE
        ================================================== */}

        <View style={styles.recipeTitleContainer}>

          <Text
            style={styles.recipeTitle}
          >
            {recipe.title}
          </Text>

        </View>

      </TouchableOpacity>

    );

  };


  // ==========================================================
  // EMPTY SEARCH
  // ==========================================================

  const renderEmpty = () => {

    if (filteredRecipes.length > 0) {
      return null;
    }

    return (

      <View style={styles.emptyContainer}>

        <Feather
          name="search"
          size={36}
          color="#9B9DA3"
        />

        <Text style={styles.emptyTitle}>
          Resep tidak ditemukan
        </Text>

        <Text style={styles.emptySubtitle}>
          Coba gunakan kata kunci lain.
        </Text>

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
            size={32}
            color="#003F34"
          />

        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Resep Makanan
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
            RECIPE LIST
        ================================================== */}

        <View style={styles.recipeList}>

          {filteredRecipes.map(
            recipe =>
              renderRecipeItem(recipe)
          )}

        </View>


        {/* ==================================================
            EMPTY
        ================================================== */}

        {renderEmpty()}


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

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
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingBottom: 30,
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 80,

    marginTop: 12,

    paddingHorizontal: 20,

    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#E1E2E3',
    marginTop: 32,
  },


  backButton: {
    width: 40,
    height: 48,

    alignItems: 'flex-start',

    justifyContent: 'center',

    marginRight: 6,
  },


  headerTitle: {
    fontSize: 24,

    lineHeight: 30,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // SEARCH
  // ==========================================================

  searchContainer: {
    height: 60,

    marginTop: 28,

    marginHorizontal: 20,

    borderRadius: 60,

    backgroundColor: '#F1F1F3',

    flexDirection: 'row',

    alignItems: 'center',
  },


  searchInput: {
    flex: 1,

    height: 56,

    paddingLeft: 26,

    paddingRight: 58,

    fontSize: 18,

    lineHeight: 23,

    color: '#303238',
  },


  searchIcon: {
    position: 'absolute',

    right: 25,
  },


  // ==========================================================
  // RECIPE LIST
  // ==========================================================

  recipeList: {
    marginTop: 28,

    paddingHorizontal: 20,
  },


  // ==========================================================
  // RECIPE ITEM
  // ==========================================================

  recipeItem: {
    width: '100%',

    minHeight: 95,

    marginBottom: 14,

    flexDirection: 'row',

    alignItems: 'center',
  },


  // ==========================================================
  // RECIPE IMAGE
  // ==========================================================

  recipeImage: {
    width: Math.min(width * 0.395, 170),

    height: Math.min(width * 0.395, 170) * 0.63,

    borderRadius: 14,

    backgroundColor: '#E9E9E9',
  },


  // ==========================================================
  // TITLE CONTAINER
  // ==========================================================

  recipeTitleContainer: {
    flex: 1,

    alignSelf: 'stretch',

    marginLeft: 14,

    justifyContent: 'center',

    paddingVertical: 3,
  },


  // ==========================================================
  // RECIPE TITLE
  // ==========================================================

  recipeTitle: {
    fontSize: 17,

    lineHeight: 25,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // EMPTY
  // ==========================================================

  emptyContainer: {
    marginTop: 70,

    alignItems: 'center',

    paddingHorizontal: 30,
  },


  emptyTitle: {
    marginTop: 15,

    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',
  },


  emptySubtitle: {
    marginTop: 7,

    fontSize: 16,

    color: '#6C6E76',
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomSpace: {
    height: 60,
  },

});
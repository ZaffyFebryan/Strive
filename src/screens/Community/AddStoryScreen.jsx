import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// SCREEN WIDTH
// ============================================================

const { width } = Dimensions.get('window');


// ============================================================
// GRID CONFIGURATION
// ============================================================

const GRID_GAP = 2;

const GRID_PADDING = 4;

const IMAGE_SIZE =
  (width - (GRID_PADDING * 2) - (GRID_GAP * 2)) / 3;


// ============================================================
// ADD STORY SCREEN
// ============================================================

export default function AddStoryScreen({ navigation }) {


  // ==========================================================
  // STORY IMAGES
  // ==========================================================

  const storyImages = [

    {
      id: '1',
      image: require('../../../assets/story1.png'),
    },

    {
      id: '2',
      image: require('../../../assets/story2.png'),
    },

    {
      id: '3',
      image: require('../../../assets/story3.png'),
    },

    {
      id: '4',
      image: require('../../../assets/story4.png'),
    },

    {
      id: '5',
      image: require('../../../assets/story5.png'),
    },

    {
      id: '6',
      image: require('../../../assets/story6.png'),
    },

    {
      id: '7',
      image: require('../../../assets/story7.png'),
    },

    {
      id: '8',
      image: require('../../../assets/story8.png'),
    },

    {
      id: '9',
      image: require('../../../assets/story9.png'),
    },

    {
      id: '10',
      image: require('../../../assets/story10.png'),
    },

    {
      id: '11',
      image: require('../../../assets/story11.png'),
    },

    {
      id: '12',
      image: require('../../../assets/story12.png'),
    },

  ];


  // ==========================================================
  // SELECT IMAGE
  // ==========================================================

  const handleSelectImage = (imageSource) => {

    navigation.navigate(
      'StoryPreview',
      {
        selectedImage: imageSource,
      }
    );

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#101011"
        translucent={false}
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View style={styles.header}>


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >

          <Feather
            name="chevron-left"
            size={28}
            color="#FFFFFF"
          />

        </TouchableOpacity>


        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.headerTitle}>
          Tambah Cerita
        </Text>


      </View>


      {/* ====================================================
          IMAGE GRID
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >

        <View style={styles.imageGrid}>

          {storyImages.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.imageWrapper}
              onPress={() => handleSelectImage(item.image)}
              activeOpacity={0.85}
            >

              <Image
                source={item.image}
                style={styles.storyImage}
                resizeMode="cover"
              />

            </TouchableOpacity>

          ))}

        </View>


        {/* =================================================
            BOTTOM SPACE
        ================================================= */}

        <View style={styles.bottomSpacing} />

      </ScrollView>


      {/* ====================================================
          HOME INDICATOR AREA
      ==================================================== */}

      <View style={styles.bottomBar}>

        <View style={styles.homeIndicator} />

      </View>

    </SafeAreaView>

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
    backgroundColor: '#101011',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    marginTop: 32,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#101011',
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
    marginLeft: 4,
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,
    backgroundColor: '#101011',
  },


  // ==========================================================
  // GRID CONTAINER
  // ==========================================================

  gridContainer: {
    paddingHorizontal: GRID_PADDING,
    paddingTop: 0,
    paddingBottom: 30,
  },


  // ==========================================================
  // IMAGE GRID
  // ==========================================================

  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },


  // ==========================================================
  // IMAGE WRAPPER
  // ==========================================================

  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE * 1.35,
    backgroundColor: '#252525',
    borderRadius: 8,
    overflow: 'hidden',
  },


  // ==========================================================
  // STORY IMAGE
  // ==========================================================

  storyImage: {
    width: '100%',
    height: '100%',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpacing: {
    height: 20,
  },


  // ==========================================================
  // BOTTOM BAR
  // ==========================================================

  bottomBar: {
    height: 24,
    backgroundColor: '#101011',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // HOME INDICATOR
  // ==========================================================

  homeIndicator: {
    width: 135,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

});
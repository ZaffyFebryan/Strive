import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// STORY PREVIEW SCREEN
// ============================================================

export default function StoryPreviewScreen({
  navigation,
  route,
}) {


  // ==========================================================
  // SELECTED IMAGE
  // ==========================================================

  const selectedImage =
    route?.params?.selectedImage;


  // ==========================================================
  // CAPTION STATE
  // ==========================================================

  const [caption, setCaption] = useState('');


  // ==========================================================
  // HANDLE SHARE
  // ==========================================================

  const handleShare = () => {

    navigation.navigate('Community');

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


      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >


        {/* ==================================================
            IMAGE AREA
        ================================================== */}

        <View style={styles.imageContainer}>


          {/* =================================================
              SELECTED IMAGE
          ================================================= */}

          {selectedImage && (

            <Image
              source={selectedImage}
              style={styles.previewImage}
              resizeMode="cover"
            />

          )}


          {/* =================================================
              FALLBACK
          ================================================= */}

          {!selectedImage && (

            <View style={styles.emptyImage}>

              <Feather
                name="image"
                size={50}
                color="#777777"
              />

              <Text style={styles.emptyImageText}>
                Gambar tidak ditemukan
              </Text>

            </View>

          )}


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
              CAPTION INPUT
          ================================================= */}

          <TextInput
            style={styles.captionInput}
            value={caption}
            onChangeText={setCaption}
            placeholder="Tambahkan keterangan..."
            placeholderTextColor="#D5D5D5"
            multiline
            textAlignVertical="bottom"
          />

        </View>


        {/* ==================================================
            BOTTOM AREA
        ================================================== */}

        <View style={styles.bottomArea}>


          {/* =================================================
              SHARE BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.85}
          >

            <Text style={styles.shareButtonText}>
              Bagikan
            </Text>

          </TouchableOpacity>


          {/* =================================================
              HOME INDICATOR
          ================================================= */}

          <View style={styles.homeIndicator} />

        </View>


      </KeyboardAvoidingView>

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
  // MAIN CONTAINER
  // ==========================================================

  container: {
    flex: 1,
    backgroundColor: '#101011',
  },


  // ==========================================================
  // IMAGE CONTAINER
  // ==========================================================

  imageContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#101011',
    overflow: 'hidden',
  },


  // ==========================================================
  // PREVIEW IMAGE
  // ==========================================================

  previewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },


  // ==========================================================
  // EMPTY IMAGE
  // ==========================================================

  emptyImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101011',
  },


  emptyImageText: {
    marginTop: 10,
    fontSize: 17,
    color: '#777777',
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    position: 'absolute',
    marginTop: 28,
    top: 12,
    left: 2,
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },


  // ==========================================================
  // CAPTION INPUT
  // ==========================================================

  captionInput: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 15,
    minHeight: 45,
    maxHeight: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    zIndex: 10,
  },


  // ==========================================================
  // BOTTOM AREA
  // ==========================================================

  bottomArea: {
    height: 82,
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 42,
    backgroundColor: '#101011',
    alignItems: 'center',
  },


  // ==========================================================
  // SHARE BUTTON
  // ==========================================================

  shareButton: {
    width: '100%',
    height: 60,
    borderRadius: 32,
    backgroundColor: '#227B68',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 58,
  },


  // ==========================================================
  // SHARE BUTTON TEXT
  // ==========================================================

  shareButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  // ==========================================================
  // HOME INDICATOR
  // ==========================================================

  homeIndicator: {
    width: 135,

    height: 4,

    borderRadius: 4,

    backgroundColor: '#FFFFFF',

    marginTop: 10,
  },

});
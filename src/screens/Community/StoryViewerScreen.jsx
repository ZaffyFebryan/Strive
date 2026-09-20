import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// STORY VIEWER SCREEN
// ============================================================

export default function StoryViewerScreen({
  navigation,
  route,
}) {


  // ==========================================================
  // STORY DATA
  // ==========================================================

  /*
    Data story dikirim dari CommunityScreen.

    CommunityScreen mengirim:

    storyImage
    storyName
    storyProfile

    Contoh:

    Budi:
      storyName    = "Budi"
      storyProfile = budi.png
      storyImage   = story5.png

    Citra:
      storyName    = "Citra"
      storyProfile = citra.png
      storyImage   = story6.png

    John:
      storyName    = "John"
      storyProfile = john.png
      storyImage   = story7.png

    Sara:
      storyName    = "Sara"
      storyProfile = sara.png
      storyImage   = story8.png
  */


  // ==========================================================
  // STORY IMAGE
  // ==========================================================

  const storyImage =
    route?.params?.storyImage ||
    require('../../../assets/story1.png');


  // ==========================================================
  // PROFILE IMAGE
  // ==========================================================

  const profileImage =
    route?.params?.storyProfile ||
    require('../../../assets/budi.png');


  // ==========================================================
  // USER NAME
  // ==========================================================

  const userName =
    route?.params?.storyName ||
    'Budi Anto';


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
            STORY IMAGE
        ================================================== */}

        <View style={styles.storyContainer}>


          {/* =================================================
              STORY IMAGE
          ================================================= */}

          <Image
            source={storyImage}
            style={styles.storyImage}
            resizeMode="cover"
          />


          {/* =================================================
              DARK OVERLAY
          ================================================= */}

          <View style={styles.darkOverlay} />


          {/* =================================================
              TOP AREA
          ================================================= */}

          <View style={styles.topArea}>


            {/* ===============================================
                STORY PROGRESS
            =============================================== */}

            <View style={styles.progressContainer}>

              <View style={styles.progressBackground}>

                <View style={styles.progressActive} />

              </View>


              <View style={styles.progressBackground} />

            </View>


            {/* ===============================================
                PROFILE
            =============================================== */}

            <View style={styles.profileRow}>


              {/* PROFILE IMAGE */}

              <Image
                source={profileImage}
                style={styles.profileImage}
                resizeMode="cover"
              />


              {/* PROFILE NAME */}

              <Text style={styles.profileName}>
                {userName}
              </Text>

            </View>

          </View>


          {/* =================================================
              BOTTOM INPUT AREA
          ================================================= */}

          <View style={styles.bottomStoryArea}>


            {/* ===============================================
                MESSAGE INPUT
            =============================================== */}

            <TouchableOpacity
              style={styles.messageButton}
              activeOpacity={0.8}
            >

              <Text style={styles.messagePlaceholder}>
                Kirim pesan....
              </Text>

            </TouchableOpacity>


            {/* ===============================================
                LIKE BUTTON
            =============================================== */}

            <TouchableOpacity
            style={styles.likeButton}
            activeOpacity={0.8}
            >

            <Image
                source={require('../../../assets/sukaputih.png')}
                style={styles.likeIcon}
                resizeMode="contain"
            />

            </TouchableOpacity>

          </View>

        </View>


        {/* ==================================================
            BOTTOM BLACK AREA
        ================================================== */}

        <View style={styles.bottomArea}>

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
  // STORY CONTAINER
  // ==========================================================

  storyContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#101011',
  },


  // ==========================================================
  // STORY IMAGE
  // ==========================================================

  storyImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },


  // ==========================================================
  // DARK OVERLAY
  // ==========================================================

  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },


  // ==========================================================
  // TOP AREA
  // ==========================================================

  topArea: {
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    paddingHorizontal: 22,
    zIndex: 10,
  },


  // ==========================================================
  // PROGRESS CONTAINER
  // ==========================================================

  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 17,
  },


  // ==========================================================
  // PROGRESS BACKGROUND
  // ==========================================================

  progressBackground: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    overflow: 'hidden',
  },


  // ==========================================================
  // ACTIVE PROGRESS
  // ==========================================================

  progressActive: {
    width: '35%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // PROFILE ROW
  // ==========================================================

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ==========================================================
  // PROFILE IMAGE
  // ==========================================================

  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 29,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },


  // ==========================================================
  // PROFILE NAME
  // ==========================================================

  profileName: {
    marginLeft: 12,
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // BOTTOM STORY AREA
  // ==========================================================

  bottomStoryArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },


  // ==========================================================
  // MESSAGE BUTTON
  // ==========================================================

  messageButton: {
    flex: 1,
    height: 60,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 32,
    justifyContent: 'center',
    paddingHorizontal: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },


  // ==========================================================
  // MESSAGE PLACEHOLDER
  // ==========================================================

  messagePlaceholder: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },


    // ==========================================================
    // LIKE BUTTON
    // ==========================================================

    likeButton: {
    width: 52,
    height: 54,
    marginLeft: 13,
    alignItems: 'center',
    justifyContent: 'center',
    },


    // ==========================================================
    // LIKE ICON
    // ==========================================================

    likeIcon: {
    width: 32,
    height: 32,
    },


  // ==========================================================
  // BOTTOM AREA
  // ==========================================================

  bottomArea: {
    height: 34,
    backgroundColor: '#101011',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
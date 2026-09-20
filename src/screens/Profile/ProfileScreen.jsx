import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';

import BottomNavigation from '../../components/navigation/BottomNavigation';

import AddActivitySheet from '../../components/activity/AddActivitySheet';


// ============================================================
// PROFILE SCREEN
// ============================================================

export default function ProfileScreen({ navigation }) {


  // ==========================================================
  // ADD ACTIVITY SHEET
  // ==========================================================

  const [addActivityVisible, setAddActivityVisible] =
    useState(false);


  // ==========================================================
  // HANDLE OPEN ADD ACTIVITY
  // ==========================================================

  const handleOpenAddActivity = () => {

    setAddActivityVisible(true);

  };


  // ==========================================================
  // HANDLE CLOSE ADD ACTIVITY
  // ==========================================================

  const handleCloseAddActivity = () => {

    setAddActivityVisible(false);

  };


  // ==========================================================
  // USER DATA
  // ==========================================================

  const user = {

    id: 'andi-pratama',

    name: 'Andi Pratama',

    username: '@andi.pratama31',

    profileImage:
      require('../../../assets/andi.png'),

    followers: '320',

    following: '172',

    posts: '6',

    age: '38',

    height: '175',

    weight: '74',

  };


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Settings
    settings:
      require('../../../assets/pengaturan.png'),

    // Baja
    baja:
      require('../../../assets/baja.png'),

    // Master Latihan
    masterLatihan:
      require('../../../assets/masterlatihan.png'),

    // Pahlawan Nutrisi
    pahlawanNutrisi:
      require('../../../assets/pahlawannutrisi.png'),

    // Plus
    plus:
      require('../../../assets/tambah.png'),

    // Bagikan profil
    share:
      require('../../../assets/bagikanprofil.png'),

    // Aktivitas latihan
    activity:
      require('../../../assets/aktivitaslatihan.png'),

    // Background pencapaian
    achievementBackground:
      require('../../../assets/pencapaian.png'),

  };


  // ==========================================================
  // POST DATA
  // ==========================================================

  const posts = [

    {
      id: 'post-1',

      image:
        require('../../../assets/tirtapost.png'),

      summaryImage:
        require('../../../assets/ringkasanlatihan.png'),

    },

  ];


  // ==========================================================
  // ACHIEVEMENT DATA
  // ==========================================================

  const achievements = [

    {
      id: 'baja',

      title: 'Konsistensi Baja',

      image: ICONS.baja,

    },

    {
      id: 'master',

      title: 'Master Latihan',

      image: ICONS.masterLatihan,

    },

    {
      id: 'nutrition',

      title: 'Pahlawan Nutrisi',

      image: ICONS.pahlawanNutrisi,

    },

  ];


  // ==========================================================
  // HANDLE EDIT PROFILE
  // ==========================================================

  const handleEditProfile = () => {

    // Untuk sementara belum diarahkan.

  };


  // ==========================================================
  // HANDLE SHARE PROFILE
  // ==========================================================

  const handleShareProfile = () => {

    // Untuk sementara belum diarahkan.

  };


  // ==========================================================
  // HANDLE SETTINGS
  // ==========================================================

  const handleSettings = () => {

    // Untuk sementara belum diarahkan.

  };


  // ==========================================================
  // HANDLE OPEN POSTS
  // ==========================================================

  const handleOpenPosts = () => {

    navigation.navigate(
      'UserPosts',
      {
        user: user,
      }
    );

  };


  // ==========================================================
  // HANDLE OPEN ACHIEVEMENTS
  // ==========================================================

  const handleOpenAchievements = () => {

    navigation.navigate(
      'Achievements',
      {
        user: user,
      }
    );

  };


  // ==========================================================
  // HANDLE OPEN FOLLOWERS
  // ==========================================================

  const handleOpenFollowers = () => {

    navigation.navigate(
      'FollowersFollowing',
      {
        user: user,
        tab: 'followers',
      }
    );

  };


  // ==========================================================
  // HANDLE OPEN FOLLOWING
  // ==========================================================

  const handleOpenFollowing = () => {

    navigation.navigate(
      'FollowingFollowers',
      {
        user: user,
        tab: 'following',
      }
    );

  };


  // ==========================================================
  // RENDER POST
  // ==========================================================

  const renderPost = (post) => {

    return (

      <View
        key={post.id}
        style={styles.postCard}
      >

        {/* ==================================================
            POST HEADER
        ================================================== */}

        <View style={styles.postHeader}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.postTitle}>
            Postingan
          </Text>


          {/* =================================================
              LIHAT LAINNYA
          ================================================= */}

          <TouchableOpacity
            onPress={handleOpenPosts}
            activeOpacity={0.7}
          >

            <Text style={styles.seeMore}>
              Lihat lainnya
            </Text>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            POST CONTENT
        ================================================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.postScrollContent
          }
        >

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />


          <Image
            source={post.summaryImage}
            style={styles.summaryImage}
            resizeMode="cover"
          />

        </ScrollView>

      </View>

    );

  };


  // ==========================================================
  // RENDER ACHIEVEMENT
  // ==========================================================

  const renderAchievement = (achievement) => {

    return (

      <View
        key={achievement.id}
        style={styles.achievementItem}
      >

        <View style={styles.achievementCircle}>

          <Image
            source={achievement.image}
            style={styles.achievementImage}
            resizeMode="contain"
          />

        </View>


        <Text
          style={styles.achievementTitle}
          numberOfLines={1}
        >
          {achievement.title}
        </Text>

      </View>

    );

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View style={styles.header}>


        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.headerTitle}>
          Profil
        </Text>


        {/* =================================================
            SETTINGS
        ================================================= */}

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.8}
        >

          <Image
            source={ICONS.settings}
            style={styles.settingsIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >


        {/* ==================================================
            PROFILE INFORMATION
        ================================================== */}

        <View style={styles.profileSection}>


          {/* =================================================
              PROFILE IMAGE
          ================================================= */}

          <Image
            source={user.profileImage}
            style={styles.profileImage}
            resizeMode="cover"
          />


          {/* =================================================
              PROFILE INFO
          ================================================= */}

          <View style={styles.profileInfo}>

            <Text
              style={styles.profileName}
              numberOfLines={1}
            >
              {user.name}
            </Text>


            <Text
              style={styles.username}
              numberOfLines={1}
            >
              {user.username}
            </Text>


            {/* =================================================
                STATS
            ================================================= */}

            <View style={styles.statsRow}>


              {/* =================================================
                  PENGIKUT
              ================================================= */}

              <TouchableOpacity
                style={styles.statItem}
                onPress={handleOpenFollowers}
                activeOpacity={0.7}
              >

                <Text style={styles.statLabel}>
                  Pengikut
                </Text>

                <Text style={styles.statValue}>
                  {user.followers}
                </Text>

              </TouchableOpacity>


              {/* =================================================
                  MENGIKUTI
              ================================================= */}

              <TouchableOpacity
                style={styles.statItem}
                onPress={handleOpenFollowing}
                activeOpacity={0.7}
              >

                <Text style={styles.statLabel}>
                  Mengikuti
                </Text>

                <Text style={styles.statValue}>
                  {user.following}
                </Text>

              </TouchableOpacity>


              {/* =================================================
                  KIRIMAN
              ================================================= */}

              <View style={styles.statItem}>

                <Text style={styles.statLabel}>
                  Kiriman
                </Text>

                <Text style={styles.statValue}>
                  {user.posts}
                </Text>

              </View>

            </View>

          </View>

        </View>


        {/* ==================================================
            PROFILE ACTION BUTTONS
        ================================================== */}

        <View style={styles.actionButtons}>


          {/* =================================================
              EDIT PROFIL
          ================================================= */}

          <TouchableOpacity
            style={styles.editButton}
           onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.85}
          >

            <Text style={styles.editButtonText}>
              Edit profil
            </Text>

          </TouchableOpacity>


          {/* =================================================
              BAGIKAN PROFIL
          ================================================= */}

          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => navigation.navigate('ShareProfile')}
            activeOpacity={0.85}
          >

            <Text style={styles.shareButtonText}>
              Bagikan profil
            </Text>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            DIVIDER
        ================================================== */}

        <View style={styles.divider} />


        {/* ==================================================
            DATA PRIBADI
        ================================================== */}

        <View style={styles.personalDataCard}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.sectionTitle}>
            Data Pribadi
          </Text>


          {/* =================================================
              DATA ITEMS
          ================================================= */}

          <View style={styles.personalDataRow}>


            {/* =================================================
                UMUR
            ================================================= */}

            <View style={styles.personalDataItem}>

              <Text style={styles.personalDataLabel}>
                Umur
              </Text>

              <Text style={styles.personalDataValue}>
                {user.age}
              </Text>

            </View>


            {/* =================================================
                TINGGI
            ================================================= */}

            <View style={styles.personalDataItem}>

              <Text style={styles.personalDataLabel}>
                Tinggi
              </Text>

              <Text style={styles.personalDataValue}>
                {user.height}
              </Text>

            </View>


            {/* =================================================
                BERAT
            ================================================= */}

            <View style={styles.personalDataItem}>

              <Text style={styles.personalDataLabel}>
                Berat
              </Text>

              <Text style={styles.personalDataValue}>
                {user.weight}
              </Text>

            </View>

          </View>

        </View>


        {/* ==================================================
            WEARABLE DEVICE
        ================================================== */}

        <View style={styles.wearableCard}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.sectionTitle}>
            Wearable Device
          </Text>


          {/* =================================================
              WEARABLE BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.wearableButton}
            onPress={() => navigation.navigate('WearableDevice')}
            activeOpacity={0.8}
          >


            {/* =================================================
                PLUS
            ================================================= */}

            <View style={styles.wearablePlusContainer}>

              <Image
                source={ICONS.plus}
                style={styles.wearablePlusIcon}
                resizeMode="contain"
              />

            </View>


            {/* =================================================
                TEXT
            ================================================= */}

            <View style={styles.wearableTextContainer}>

              <Text style={styles.wearableTitle}>
                Tambah wearable device
              </Text>

              <Text style={styles.wearableDescription}>
                Hubungkan data dengan wearable
                device
              </Text>

            </View>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            POSTINGAN
        ================================================== */}

        {posts.map(renderPost)}


        {/* ==================================================
            AKTIVITAS LATIHAN
        ================================================== */}

        <View style={styles.activityCard}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.activityTitle}>
            Aktivitas latihan
          </Text>


          {/* =================================================
              MONTH
          ================================================= */}

          <Text style={styles.activityMonth}>
            Juni 2026
          </Text>


          {/* =================================================
              ACTIVITY CALENDAR IMAGE
          ================================================= */}

          <Image
            source={ICONS.activity}
            style={styles.activityImage}
            resizeMode="contain"
          />

        </View>


        {/* ==================================================
            PENCAPAIAN
        ================================================== */}

        <View style={styles.achievementCard}>

          <ImageBackground
            source={ICONS.achievementBackground}
            style={styles.achievementBackground}
            imageStyle={
              styles.achievementBackgroundImage
            }
            resizeMode="cover"
          >


            {/* =================================================
                ACHIEVEMENT HEADER
            ================================================= */}

            <View style={styles.achievementHeader}>

              <Text style={styles.achievementSectionTitle}>
                Pencapaian
              </Text>


              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleOpenAchievements}
              >

                <Text style={styles.seeMore}>
                  Lihat lainnya
                </Text>

              </TouchableOpacity>

            </View>


            {/* =================================================
                ACHIEVEMENT LIST
            ================================================= */}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                styles.achievementScroll
              }
            >

              {achievements.map(
                renderAchievement
              )}

            </ScrollView>

          </ImageBackground>

        </View>


        {/* ==================================================
            BOTTOM SPACE
        ================================================== */}

        <View style={styles.bottomSpace} />

      </ScrollView>


      {/* ====================================================
          BOTTOM NAVIGATION
      ==================================================== */}

      <BottomNavigation
        activeTab="profile"
        navigation={navigation}
        onPressAdd={handleOpenAddActivity}
      />


      {/* ====================================================
          ADD ACTIVITY SHEET
      ==================================================== */}

      <AddActivitySheet
        visible={addActivityVisible}
        onClose={handleCloseAddActivity}
      />

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

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 120,

    paddingHorizontal: 20,

    paddingTop: 32,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    borderBottomWidth: 1,

    borderBottomColor: '#E2E3E3',

    backgroundColor: '#FFFFFF',
  },


  headerTitle: {
    fontSize: 24,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // SETTINGS
  // ==========================================================

  settingsButton: {
    width: 48,

    height: 48,

    borderRadius: 24,

    backgroundColor: '#EAF3F0',

    alignItems: 'center',

    justifyContent: 'center',
  },


  settingsIcon: {
    width: 40,

    height: 40,
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },


  scrollContent: {
    paddingBottom: 155,
  },


  // ==========================================================
  // PROFILE
  // ==========================================================

  profileSection: {
    paddingHorizontal: 20,

    paddingTop: 24,

    flexDirection: 'row',

    alignItems: 'flex-start',
  },


  profileImage: {
    width: 112,

    height: 112,

    borderRadius: 56,
  },


  profileInfo: {
    flex: 1,

    marginLeft: 13,

    paddingTop: 0,
  },


  profileName: {
    fontSize: 24,

    fontWeight: '700',

    color: '#003F34',
  },


  username: {
    marginTop: 1,

    fontSize: 17,

    color: '#74777D',
  },


  // ==========================================================
  // STATS
  // ==========================================================

  statsRow: {
    flexDirection: 'row',

    marginTop: 13,

    gap: 18,
  },


  statItem: {
    alignItems: 'flex-start',
  },


  statLabel: {
    fontSize: 14,

    color: '#74777D',

    marginBottom: 3,
  },


  statValue: {
    fontSize: 18,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // ACTION BUTTONS
  // ==========================================================

  actionButtons: {
    flexDirection: 'row',

    paddingHorizontal: 20,

    marginTop: 19,

    gap: 17,
  },


  editButton: {
    flex: 1,

    height: 44,

    borderRadius: 24,

    borderWidth: 1,

    borderColor: '#003F34',

    backgroundColor: '#EAF3F0',

    alignItems: 'center',

    justifyContent: 'center',
  },


  editButtonText: {
    fontSize: 17,

    fontWeight: '700',

    color: '#003F34',
  },


  shareButton: {
    flex: 1,

    height: 44,

    borderRadius: 24,

    borderWidth: 1,

    borderColor: '#003F34',

    backgroundColor: '#EAF3F0',

    alignItems: 'center',

    justifyContent: 'center',
  },


  shareButtonText: {
    fontSize: 17,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // DIVIDER
  // ==========================================================

  divider: {
    height: 1,

    backgroundColor: '#E2E3E3',

    marginTop: 23,
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // DATA PRIBADI
  // ==========================================================

  personalDataCard: {
    marginHorizontal: 20,

    marginTop: 24,

    paddingHorizontal: 20,

    paddingTop: 26,

    paddingBottom: 24,

    borderRadius: 20,

    backgroundColor: '#F0FAF7',
  },


  personalDataRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 12,

    gap: 16,
  },


  personalDataItem: {
    flex: 1,

    height: 82,

    borderRadius: 12,

    borderWidth: 1,

    borderColor: '#B5BBB9',

    backgroundColor: '#F1F2F2',

    alignItems: 'center',

    justifyContent: 'center',
  },


  personalDataLabel: {
    fontSize: 19,

    fontWeight: '600',

    color: '#111111',
  },


  personalDataValue: {
    marginTop: 3,

    fontSize: 18,

    color: '#74777D',
  },


  // ==========================================================
  // WEARABLE DEVICE
  // ==========================================================

  wearableCard: {
    marginHorizontal: 20,

    marginTop: 16,

    paddingHorizontal: 20,

    paddingTop: 26,

    paddingBottom: 24,

    borderRadius: 20,

    backgroundColor: '#EAF3F0',
  },


  wearableButton: {
    height: 108,

    marginTop: 11,

    paddingHorizontal: 20,

    borderRadius: 12,

    borderWidth: 1,

    borderColor: '#D1D4D3',

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',
  },


  wearablePlusContainer: {
    width: 55,

    height: 55,

    alignItems: 'center',

    justifyContent: 'center',
  },


  wearablePlusIcon: {
    width: 38,

    height: 38,
  },


  wearableTextContainer: {
    flex: 1,

    marginLeft: 15,
  },


  wearableTitle: {
    fontSize: 17,

    fontWeight: '700',

    color: '#003F34',
  },


  wearableDescription: {
    marginTop: 3,

    fontSize: 15,

    lineHeight: 21,

    color: '#16483E',
  },


  // ==========================================================
  // POST CARD
  // ==========================================================

  postCard: {
    marginHorizontal: 20,

    marginTop: 16,

    paddingHorizontal: 20,

    paddingTop: 23,

    paddingBottom: 23,

    borderRadius: 20,

    backgroundColor: '#F0FAF7',

    overflow: 'hidden',
  },


  // ==========================================================
  // POST HEADER
  // ==========================================================

  postHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 11,
  },


  postTitle: {
    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // SEE MORE
  // ==========================================================

  seeMore: {
    fontSize: 14,

    fontWeight: '600',

    color: '#003F34',

    textDecorationLine: 'underline',
  },


  // ==========================================================
  // POST SCROLL
  // ==========================================================

  postScrollContent: {
    gap: 8,
  },


  // ==========================================================
  // POST IMAGE
  // ==========================================================

  postImage: {
    width: 240,

    height: 175,

    borderRadius: 11,

    backgroundColor: '#E5E5E5',
  },


  // ==========================================================
  // SUMMARY IMAGE
  // ==========================================================

  summaryImage: {
    width: 240,

    height: 175,

    borderRadius: 11,

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // AKTIVITAS LATIHAN CARD
  // ==========================================================

  activityCard: {
    marginHorizontal: 20,

    marginTop: 16,

    paddingHorizontal: 20,

    paddingTop: 24,

    paddingBottom: 18,

    borderRadius: 20,

    backgroundColor: '#F0FAF7',

    overflow: 'hidden',
  },


  // ==========================================================
  // ACTIVITY TITLE
  // ==========================================================

  activityTitle: {
    fontSize: 19,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // ACTIVITY MONTH
  // ==========================================================

  activityMonth: {
    marginTop: 2,

    fontSize: 16,

    color: '#74777D',
  },


  // ==========================================================
  // ACTIVITY CALENDAR IMAGE
  // ==========================================================

  activityImage: {
    width: '100%',

    height: 285,

    marginTop: 5,
  },


  // ==========================================================
  // PENCAPAIAN CARD
  // ==========================================================

  achievementCard: {
    marginHorizontal: 20,

    marginTop: 16,

    borderRadius: 20,

    overflow: 'hidden',

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // ACHIEVEMENT BACKGROUND
  // ==========================================================

  achievementBackground: {
    width: '100%',

    minHeight: 250,

    paddingTop: 24,

    paddingBottom: 18,
  },


  achievementBackgroundImage: {
    borderRadius: 20,
  },


  // ==========================================================
  // ACHIEVEMENT HEADER
  // ==========================================================

  achievementHeader: {
    paddingHorizontal: 20,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },


  achievementSectionTitle: {
    fontSize: 19,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // ACHIEVEMENT SCROLL
  // ==========================================================

  achievementScroll: {
    paddingHorizontal: 15,

    paddingTop: 17,

    gap: 8,
  },


  // ==========================================================
  // ACHIEVEMENT ITEM
  // ==========================================================

  achievementItem: {
    width: 100,

    alignItems: 'center',
  },


  // ==========================================================
  // ACHIEVEMENT CIRCLE
  // ==========================================================

  achievementCircle: {
    width: 90,

    height: 90,

    borderRadius: 48,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',

    justifyContent: 'center',

    borderWidth: 1,

    borderColor: '#E7E7E7',
  },


  // ==========================================================
  // ACHIEVEMENT IMAGE
  // ==========================================================

  achievementImage: {
    width: 80,

    height: 80,
  },


  // ==========================================================
  // ACHIEVEMENT TITLE
  // ==========================================================

  achievementTitle: {
    marginTop: 9,

    fontSize: 12,

    color: '#55595D',

    textAlign: 'center',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 30,
  },

});
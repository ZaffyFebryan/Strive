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
} from 'react-native';


// ============================================================
// PROFILE USER SCREEN
// ============================================================

export default function ProfileUserScreen({ navigation, route }) {


  // ==========================================================
  // USER DATA
  // ==========================================================

  const user = route?.params?.user || {

    id: 'tirta',

    name: 'Tirta Citot',

    username: '@tirtamandirhuhdi',

    profileImage:
      require('../../../assets/tirta.png'),

    followers: '1,4 juta',

    following: '700',

    posts: '62',

  };


  // ==========================================================
  // FOLLOW STATE
  // ==========================================================

  const [isFollowing, setIsFollowing] =
    useState(false);


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    back:
      require('../../../assets/kembali.png'),

    more:
      require('../../../assets/titiktiga.png'),

    baja:
      require('../../../assets/baja.png'),

    masterLatihan:
      require('../../../assets/masterlatihan.png'),

    pahlawanNutrisi:
      require('../../../assets/pahlawannutrisi.png'),

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
  // HANDLE FOLLOW
  // ==========================================================

  const handleFollow = () => {

    setIsFollowing(
      previous => !previous
    );

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
  // HANDLE MESSAGE
  // ==========================================================

  const handleMessage = () => {

    navigation.navigate(
      'Conversation',
      {
        contactId: user.id,

        contactName: user.name,

        profileImage: user.profileImage,
      }
    );

  };


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

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


        {/* BACK */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >

          <Image
            source={ICONS.back}
            style={styles.backIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>


        {/* USER NAME */}

        <Text
          style={styles.headerTitle}
          numberOfLines={1}
        >
          {user.name}
        </Text>


        {/* MORE */}

        <TouchableOpacity
          style={styles.moreButton}
          activeOpacity={0.8}
        >

          <Image
            source={ICONS.more}
            style={styles.moreIcon}
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
        contentContainerStyle={styles.scrollContent}
      >


        {/* ==================================================
            PROFILE
        ================================================== */}

        <View style={styles.profileSection}>


          {/* PROFILE IMAGE */}

          <Image
            source={user.profileImage}
            style={styles.profileImage}
            resizeMode="cover"
          />


          {/* PROFILE INFO */}

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
            ACTION BUTTONS
        ================================================== */}

        <View style={styles.actionButtons}>


          {/* FOLLOW */}

          <TouchableOpacity
            style={[
              styles.followButton,

              isFollowing &&
                styles.followingButton,
            ]}
            onPress={handleFollow}
            activeOpacity={0.85}
          >

            <Text
              style={[
                styles.followButtonText,

                isFollowing &&
                  styles.followingButtonText,
              ]}
            >

              {isFollowing
                ? 'Mengikuti'
                : 'Ikuti'}

            </Text>

          </TouchableOpacity>


          {/* MESSAGE */}

          <TouchableOpacity
            style={styles.messageButton}
            onPress={handleMessage}
            activeOpacity={0.85}
          >

            <Text style={styles.messageButtonText}>
              Kirim pesan
            </Text>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            DIVIDER
        ================================================== */}

        <View style={styles.divider} />


        {/* ==================================================
            POSTS
        ================================================== */}

        {posts.map(renderPost)}


        {/* ==================================================
            ACHIEVEMENT
        ================================================== */}

        <View style={styles.achievementSection}>


          {/* HEADER */}

          <View style={styles.achievementHeader}>

          <Text style={styles.achievementSectionTitle}>
            Pencapaian
          </Text>


          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Achievements', {
                user: user,
              });
            }}
          >

            <Text style={styles.seeMore}>
              Lihat lainnya
            </Text>

          </TouchableOpacity>

        </View>


          {/* ACHIEVEMENTS */}

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

        </View>


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
    height: 80,

    paddingHorizontal: 17,

    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#E2E3E3',

    backgroundColor: '#FFFFFF',

    marginTop: 32,
  },


  backButton: {
    width: 42,

    height: 50,

    alignItems: 'flex-start',

    justifyContent: 'center',
  },


  backIcon: {
    width: 25,

    height: 25,
  },


  headerTitle: {
    flex: 1,

    marginLeft: 7,

    fontSize: 24,

    fontWeight: '700',

    color: '#003F34',
  },


  moreButton: {
    width: 38,

    height: 50,

    alignItems: 'flex-end',

    justifyContent: 'center',
  },


  moreIcon: {
    width: 25,

    height: 25,
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },


  scrollContent: {
    paddingBottom: 2,
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

    marginLeft: 22,

    paddingTop: 0,
  },


  profileName: {
    fontSize: 24,

    fontWeight: '700',

    color: '#003F34',
  },


  username: {
    marginTop: 3,

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
  // BUTTONS
  // ==========================================================

  actionButtons: {
    flexDirection: 'row',

    paddingHorizontal: 20,

    marginTop: 20,

    gap: 17,
  },


  followButton: {
    flex: 1,

    height: 44,

    borderRadius: 24,

    backgroundColor: '#003F34',

    alignItems: 'center',

    justifyContent: 'center',
  },


  followingButton: {
    backgroundColor: '#EAF3F0',

    borderWidth: 1,

    borderColor: '#003F34',
  },


  followButtonText: {
    fontSize: 17,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  followingButtonText: {
    color: '#003F34',
  },


  messageButton: {
    flex: 1,

    height: 44,

    borderRadius: 24,

    borderWidth: 1,

    borderColor: '#003F34',

    backgroundColor: '#EAF3F0',

    alignItems: 'center',

    justifyContent: 'center',
  },


  messageButtonText: {
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

    marginTop: 31,
  },


  // ==========================================================
  // POST CARD
  // ==========================================================

  postCard: {
    marginHorizontal: 20,

    marginTop: 24,

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
  // LIHAT LAINNYA
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
  // ACHIEVEMENT
  // ==========================================================

  achievementSection: {
    marginTop: 18,

    paddingTop: 10,

    paddingBottom: 18,

    backgroundColor: '#FFFFFF',
  },


  achievementHeader: {
    paddingHorizontal: 40,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },


  achievementSectionTitle: {
    fontSize: 20,

    fontWeight: '700',

    color: '#003F34',
  },


  achievementScroll: {
    paddingHorizontal: 35,

    paddingTop: 17,

    gap: 8,
  },


  achievementItem: {
    width: 100,

    alignItems: 'center',
  },


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


  achievementImage: {
    width: 80,

    height: 80,
  },


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
    height: 80,
  },

});
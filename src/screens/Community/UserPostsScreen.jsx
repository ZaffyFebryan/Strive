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
} from 'react-native';


// ============================================================
// USER POSTS SCREEN
// ============================================================

export default function UserPostsScreen({
  navigation,
  route,
}) {


  // ==========================================================
  // USER DATA
  // ==========================================================

  const user =
    route?.params?.user || {

      name: 'Tirta Citot',

      username: '@tirtamandiraihudhi',

      profileImage:
        require('../../../assets/tirta.png'),

    };


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Back
    back:
      require('../../../assets/kembali.png'),

    // Like
    like:
      require('../../../assets/suka.png'),

    // Comment
    comment:
      require('../../../assets/komen.png'),

    // Share
    share:
      require('../../../assets/bagikan2.png'),

    // More
    more:
      require('../../../assets/lainnya.png'),

  };


  // ==========================================================
  // POSTS DATA
  // ==========================================================

  const posts = [

    {
      id: 'post-1',

      name: user.name,

      username: user.username,

      profileImage: user.profileImage,

      caption:
        'Ready @mandiri_jogmar cat 10km Kali ini pake jeans 18oz dari @oldblueco',

      images: [

        require('../../../assets/tirta1.png'),

        require('../../../assets/tirta1b.png'),

      ],

      likes: '21,1K',

      comments: '112',

      type: 'image',

    },


    {
      id: 'post-2',

      name: user.name,

      username: user.username,

      profileImage: user.profileImage,

      caption:
        'Rutinitas pagi tadi sebelum meeting Jumat berkah',

      likes: '10,4K',

      comments: '32',

      type: 'workout',

      workout: {

        title: 'Ringkasan Latihan',

        date: '12 Mei 2026',

        exerciseType: 'Leg day',

        calories: '246',

        heaviestWeight: '120kg',

        sets: 'Squat',

      },

    },

  ];


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // RENDER ACTIONS
  // ==========================================================

  const renderActions = (post) => {

    return (

      <View style={styles.postActions}>


        {/* ==================================================
            LIKE
        ================================================== */}

        <TouchableOpacity
          style={styles.actionItem}
          activeOpacity={0.7}
        >

          <Image
            source={ICONS.like}
            style={styles.actionIcon}
            resizeMode="contain"
          />

          <Text style={styles.actionCount}>
            {post.likes}
          </Text>

        </TouchableOpacity>


        {/* ==================================================
            COMMENT
        ================================================== */}

        <TouchableOpacity
          style={styles.actionItem}
          activeOpacity={0.7}
        >

          <Image
            source={ICONS.comment}
            style={styles.actionIcon}
            resizeMode="contain"
          />

          <Text style={styles.actionCount}>
            {post.comments}
          </Text>

        </TouchableOpacity>


        {/* ==================================================
            SHARE
        ================================================== */}

        <TouchableOpacity
          style={styles.shareAction}
          activeOpacity={0.7}
        >

          <Image
            source={ICONS.share}
            style={styles.shareIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>

      </View>

    );

  };


  // ==========================================================
  // RENDER IMAGE POST
  // ==========================================================

  const renderImagePost = (post) => {

    return (

      <>

        {/* ==================================================
            CAPTION
        ================================================== */}

        <Text style={styles.postCaption}>
          {post.caption}
        </Text>


        {/* ==================================================
            IMAGE CAROUSEL
        ================================================== */}

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.mediaScroll}
          contentContainerStyle={styles.mediaContent}
        >

          {post.images.map(
            (image, index) => (

              <Image
                key={index}
                source={image}
                style={styles.postImage}
                resizeMode="cover"
              />

            )
          )}

        </ScrollView>

      </>

    );

  };


  // ==========================================================
  // RENDER WORKOUT POST
  // ==========================================================

  const renderWorkoutPost = (post) => {

    return (

      <>

        {/* ==================================================
            CAPTION
        ================================================== */}

        <Text style={styles.postCaption}>
          {post.caption}
        </Text>


        {/* ==================================================
            WORKOUT SUMMARY
        ================================================== */}

        <View style={styles.workoutCard}>


          {/* =================================================
              WORKOUT HEADER
          ================================================= */}

          <View style={styles.workoutHeader}>

            <Text style={styles.workoutTitle}>
              {post.workout.title}
            </Text>

            <Text style={styles.workoutDate}>
              {post.workout.date}
            </Text>

          </View>


          <View style={styles.workoutDivider} />


          {/* =================================================
              JENIS LATIHAN
          ================================================= */}

          <View style={styles.workoutRow}>

            <Text style={styles.workoutLabel}>
              Jenis latihan
            </Text>

            <Text style={styles.workoutValue}>
              {post.workout.exerciseType}
            </Text>

          </View>


          {/* =================================================
              KALORI
          ================================================= */}

          <View style={styles.workoutRow}>

            <Text style={styles.workoutLabel}>
              Kalori terbakar
            </Text>

            <Text style={styles.workoutValue}>
              {post.workout.calories}
            </Text>

          </View>


          {/* =================================================
              ANGKATAN TERBERAT
          ================================================= */}

          <View style={styles.workoutRow}>

            <Text style={styles.workoutLabel}>
              Angkatan terberat
            </Text>

            <View style={styles.weightRow}>

              <Text style={styles.workoutValue}>
                {post.workout.sets}
              </Text>

              <Text style={styles.weightSeparator}>
                |
              </Text>

              <Text style={styles.workoutValue}>
                {post.workout.heaviestWeight}
              </Text>

            </View>

          </View>

        </View>

      </>

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
              PROFILE
          ================================================= */}

          <View style={styles.profileRow}>

            <Image
              source={post.profileImage}
              style={styles.profileImage}
              resizeMode="cover"
            />


            <View style={styles.profileInfo}>

              <Text style={styles.profileName}>
                {post.name}
              </Text>

              <Text style={styles.username}>
                {post.username}
              </Text>

            </View>

          </View>


          {/* =================================================
              MORE
          ================================================= */}

          <TouchableOpacity
            activeOpacity={0.7}
          >

            <Image
              source={ICONS.more}
              style={styles.moreIcon}
              resizeMode="contain"
            />

          </TouchableOpacity>

        </View>


        {/* ==================================================
            POST CONTENT
        ================================================== */}

        {post.type === 'image'
          ? renderImagePost(post)
          : renderWorkoutPost(post)
        }


        {/* ==================================================
            ACTIONS
        ================================================== */}

        {renderActions(post)}

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


        {/* ==================================================
            BACK BUTTON
        ================================================== */}

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


        {/* ==================================================
            HEADER TITLE
        ================================================== */}

        <Text style={styles.headerTitle}>
          Postingan
        </Text>

      </View>


      {/* ====================================================
          POST LIST
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {posts.map(
          renderPost
        )}

        <View
          style={styles.bottomSpacing}
        />

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

    marginTop: 32,

    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#E2E3E3',

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 38,

    height: 50,

    alignItems: 'flex-start',

    justifyContent: 'center',
  },


  // ==========================================================
  // BACK ICON
  // ==========================================================

  backIcon: {
    width: 25,

    height: 25,
  },


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
    marginLeft: 2,

    fontSize: 24,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },


  scrollContent: {
    paddingTop: 31,

    paddingBottom: 50,
  },


  // ==========================================================
  // POST CARD
  // ==========================================================

  postCard: {
    marginHorizontal: 20,

    marginBottom: 20,

    paddingHorizontal: 19,

    paddingTop: 20,

    paddingBottom: 17,

    borderWidth: 1,

    borderColor: '#B8BDBC',

    borderRadius: 13,

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // POST HEADER
  // ==========================================================

  postHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },


  // ==========================================================
  // PROFILE ROW
  // ==========================================================

  profileRow: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,
  },


  // ==========================================================
  // PROFILE IMAGE
  // ==========================================================

  profileImage: {
    width: 60,

    height: 60,

    borderRadius: 30,
  },


  // ==========================================================
  // PROFILE INFO
  // ==========================================================

  profileInfo: {
    marginLeft: 15,
  },


  // ==========================================================
  // PROFILE NAME
  // ==========================================================

  profileName: {
    fontSize: 18,

    fontWeight: '700',

    color: '#003F34',
  },


  // ==========================================================
  // USERNAME
  // ==========================================================

  username: {
    marginTop: 1,

    fontSize: 14,

    color: '#74777D',
  },


  // ==========================================================
  // MORE
  // ==========================================================

  moreIcon: {
    width: 27,

    height: 27,
  },


  // ==========================================================
  // CAPTION
  // ==========================================================

  postCaption: {
    marginTop: 17,

    marginBottom: 12,

    fontSize: 17,

    lineHeight: 24,

    color: '#4B4E53',
  },


  // ==========================================================
  // MEDIA SCROLL
  // ==========================================================

  mediaScroll: {
    width: '100%',

    borderRadius: 8,
  },


  // ==========================================================
  // MEDIA CONTENT
  // ==========================================================

  mediaContent: {
    gap: 8,
  },


  // ==========================================================
  // POST IMAGE
  // ==========================================================

  postImage: {
    width: 312,

    height: 232,

    borderRadius: 8,

    backgroundColor: '#E8E8E8',
  },


  // ==========================================================
  // WORKOUT CARD
  // ==========================================================

  workoutCard: {
    marginTop: 2,

    width: '100%',

    borderWidth: 1,

    borderColor: '#C8C9CA',

    borderRadius: 7,

    paddingHorizontal: 20,

    paddingTop: 17,

    paddingBottom: 13,

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // WORKOUT HEADER
  // ==========================================================

  workoutHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },


  workoutTitle: {
    fontSize: 17,

    fontWeight: '700',

    color: '#111111',
  },


  workoutDate: {
    fontSize: 14,

    color: '#74777D',
  },


  // ==========================================================
  // WORKOUT DIVIDER
  // ==========================================================

  workoutDivider: {
    height: 1,

    backgroundColor: '#303236',

    marginTop: 13,

    marginBottom: 14,
  },


  // ==========================================================
  // WORKOUT ROW
  // ==========================================================

  workoutRow: {
    marginBottom: 9,
  },


  workoutLabel: {
    fontSize: 17,

    fontWeight: '700',

    color: '#4B4E53',
  },


  workoutValue: {
    marginTop: 2,

    fontSize: 15,

    color: '#74777D',
  },


  // ==========================================================
  // WEIGHT ROW
  // ==========================================================

  weightRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },


  weightSeparator: {
    marginHorizontal: 12,

    marginTop: 2,

    fontSize: 15,

    color: '#74777D',
  },


  // ==========================================================
  // POST ACTIONS
  // ==========================================================

  postActions: {
    marginTop: 14,

    flexDirection: 'row',

    alignItems: 'center',
  },


  // ==========================================================
  // ACTION ITEM
  // ==========================================================

  actionItem: {
    flexDirection: 'row',

    alignItems: 'center',

    marginRight: 25,
  },


  // ==========================================================
  // ACTION ICON
  // ==========================================================

  actionIcon: {
    width: 26,

    height: 26,
  },


  // ==========================================================
  // ACTION COUNT
  // ==========================================================

  actionCount: {
    marginLeft: 8,

    fontSize: 14,

    color: '#16483E',
  },


  // ==========================================================
  // SHARE
  // ==========================================================

  shareAction: {
    marginLeft: 'auto',
  },


  shareIcon: {
    width: 26,

    height: 26,
  },


  // ==========================================================
  // BOTTOM SPACING
  // ==========================================================

  bottomSpacing: {
    height: 20,
  },

});
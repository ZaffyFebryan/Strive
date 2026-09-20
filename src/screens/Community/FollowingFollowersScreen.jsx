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
  ScrollView,
} from 'react-native';


// ============================================================
// FOLLOWING SCREEN
// ============================================================

export default function FollowingScreen({
  navigation,
}) {


  // ==========================================================
  // SEARCH STATE
  // ==========================================================

  const [searchText, setSearchText] =
    useState('');


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Tombol kembali
    back:
      require('../../../assets/kembali.png'),

    // Search
    search:
      require('../../../assets/cariijo.png'),

  };


  // ==========================================================
  // FOLLOWING DATA
  // ==========================================================

  const following = [

    {
      id: 'zaffebryan',

      name: 'Zaffebryan',

      username: '@anandafebryan',

      image:
        require('../../../assets/zaffebryan.png'),

      following: true,
    },


    {
      id: 'deddy',

      name: 'Deddy Corbuzier',

      username: '@deddycorbuzier',

      image:
        require('../../../assets/deddy.png'),

      following: false,
    },


    {
      id: 'raditya',

      name: 'Raditya Dika',

      username: '@radityadika',

      image:
        require('../../../assets/radit.png'),

      following: false,
    },


    {
      id: 'gia',

      name: 'Gia Pratama',

      username: '@drgiapratama',

      image:
        require('../../../assets/gia.png'),

      following: false,
    },


    {
      id: 'robi',

      name: 'Robi Syanturi',

      username: '@robisyanturi',

      image:
        require('../../../assets/robby.png'),

      following: false,
    },


    {
      id: 'bobby',

      name: 'Bobby Ida',

      username: '@bobbyida',

      image:
        require('../../../assets/bobby.png'),

      following: false,
    },


    {
      id: 'ade',

      name: 'Ade Rai',

      username: '@aderai',

      image:
        require('../../../assets/ade.png'),

      following: false,
    },


    {
      id: 'chris',

      name: 'Chris Putra',

      username: '@christputra',

      image:
        require('../../../assets/christ.png'),

      following: false,
    },


    {
      id: 'ikhsa',

      name: 'Ikhsanuddin Qothi',

      username: '@drikhsanqthii',

      image:
        require('../../../assets/ikhsan.png'),

      following: false,
    },


    {
      id: 'user10',

      name: 'Andi Pratama',

      username: '@andipratama04',

      image:
        require('../../../assets/andi.png'),

      following: false,
    },


    {
      id: 'user11',

      name: 'Tulipoi',

      username: '@tulipoi',

      image:
        require('../../../assets/tulipoi.png'),

      following: false,
    },

  ];


  // ==========================================================
  // FILTER SEARCH
  // ==========================================================

  const filteredUsers =
    following.filter((user) => {

      const keyword =
        searchText
          .toLowerCase()
          .trim();


      if (!keyword) {
        return true;
      }


      return (
        user.name
          .toLowerCase()
          .includes(keyword)

        ||

        user.username
          .toLowerCase()
          .includes(keyword)
      );

    });


  // ==========================================================
  // HANDLE BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // HANDLE FOLLOW
  // ==========================================================

  const handleFollow = (user) => {

    console.log(
      'Follow:',
      user.name
    );

  };


  // ==========================================================
  // RENDER USER
  // ==========================================================

  const renderUser = (user) => {

    return (

      <View
        key={user.id}
        style={styles.userItem}
      >


        {/* ==================================================
            PROFILE IMAGE
        ================================================== */}

        <Image
          source={user.image}
          style={styles.profileImage}
          resizeMode="cover"
        />


        {/* ==================================================
            USER INFORMATION
        ================================================== */}

        <View style={styles.userInfo}>

          <Text
            style={styles.userName}
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

        </View>


        {/* ==================================================
            FOLLOW BUTTON
        ================================================== */}

        <TouchableOpacity
          style={[
            styles.followButton,

            user.following &&
              styles.followingButton,
          ]}
          onPress={() =>
            handleFollow(user)
          }
          activeOpacity={0.8}
        >

          <Text
            style={[
              styles.followButtonText,

              user.following &&
                styles.followingButtonText,
            ]}
          >

            {user.following
              ? 'Diikuti'
              : 'Ikuti'}

          </Text>

        </TouchableOpacity>

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
          Mengikuti
        </Text>

      </View>


      {/* ====================================================
          TAB NAVIGATION
      ==================================================== */}

      <View style={styles.tabContainer}>


        {/* ==================================================
            MENGIKUTI
        ================================================== */}

        <View style={styles.tabButton}>

          <Text
            style={[
              styles.tabText,
              styles.activeTabText,
            ]}
          >
            Mengikuti
          </Text>


          {/* GARIS BAWAH MENGIKUTI */}

          <View
            style={styles.activeTabLine}
          />

        </View>


        {/* ==================================================
            PENGIKUT
        ================================================== */}

        <View style={styles.tabButton}>

          <Text style={styles.tabText}>
            Pengikut
          </Text>

        </View>

      </View>


      {/* ====================================================
          SEARCH
      ==================================================== */}

      <View style={styles.searchContainer}>


        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Cari"
          placeholderTextColor="#74777D"
          autoCorrect={false}
          autoCapitalize="none"
        />


        <Image
          source={ICONS.search}
          style={styles.searchIcon}
          resizeMode="contain"
        />

      </View>


      {/* ====================================================
          USER LIST
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >

        {filteredUsers.map(
          renderUser
        )}


        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {filteredUsers.length === 0 && (

          <View
            style={styles.emptyContainer}
          >

            <Text
              style={styles.emptyText}
            >
              Pengguna tidak ditemukan
            </Text>

          </View>

        )}

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
  // TAB CONTAINER
  // ==========================================================

  tabContainer: {
    height: 77,

    flexDirection: 'row',

    alignItems: 'flex-end',

    justifyContent: 'space-around',

    paddingHorizontal: 35,
  },


  // ==========================================================
  // TAB BUTTON
  // ==========================================================

  tabButton: {
    width: 150,

    height: 50,

    alignItems: 'center',

    justifyContent: 'flex-start',

    position: 'relative',
  },


  // ==========================================================
  // TAB TEXT
  // ==========================================================

  tabText: {
    fontSize: 17,

    color: '#003F34',

    fontWeight: '500',
  },


  // ==========================================================
  // ACTIVE TAB TEXT
  // ==========================================================

  activeTabText: {
    fontWeight: '600',
  },


  // ==========================================================
  // ACTIVE TAB LINE
  // ==========================================================

  activeTabLine: {
    position: 'absolute',

    bottom: 0,

    width: 76,

    height: 3,

    borderRadius: 3,

    backgroundColor: '#003F34',

    marginBottom: 20,
  },


  // ==========================================================
  // SEARCH
  // ==========================================================

  searchContainer: {
    height: 60,

    marginHorizontal: 20,

    marginTop: 0,

    borderRadius: 32,

    backgroundColor: '#F1F1F2',

    flexDirection: 'row',

    alignItems: 'center',

    paddingLeft: 30,

    paddingRight: 20,
  },


  // ==========================================================
  // SEARCH INPUT
  // ==========================================================

  searchInput: {
    flex: 1,

    height: '100%',

    padding: 0,

    fontSize: 18,

    color: '#303236',
  },


  // ==========================================================
  // SEARCH ICON
  // ==========================================================

  searchIcon: {
    width: 27,

    height: 27,

    marginRight: 8,
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },


  scrollContent: {
    paddingTop: 14,

    paddingBottom: 60,
  },


  // ==========================================================
  // USER ITEM
  // ==========================================================

  userItem: {
    minHeight: 72,

    marginHorizontal: 20,

    marginBottom: -4,

    flexDirection: 'row',

    alignItems: 'center',
  },


  // ==========================================================
  // PROFILE IMAGE
  // ==========================================================

  profileImage: {
    width: 50,

    height: 50,

    borderRadius: 25,
  },


  // ==========================================================
  // USER INFO
  // ==========================================================

  userInfo: {
    flex: 1,

    marginLeft: 12,

    paddingRight: 8,
  },


  // ==========================================================
  // USER NAME
  // ==========================================================

  userName: {
    fontSize: 17,

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
  // FOLLOW BUTTON
  // ==========================================================

  followButton: {
    width: 72,

    height: 36,

    borderRadius: 20,

    borderWidth: 1,

    borderColor: '#003F34',

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // FOLLOWING BUTTON
  // ==========================================================

  followingButton: {
    backgroundColor: '#003F34',

    borderColor: '#003F34',
  },


  // ==========================================================
  // FOLLOW TEXT
  // ==========================================================

  followButtonText: {
    fontSize: 14,

    fontWeight: '600',

    color: '#003F34',
  },


  followingButtonText: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  emptyContainer: {
    alignItems: 'center',

    justifyContent: 'center',

    paddingTop: 50,
  },


  emptyText: {
    fontSize: 16,

    color: '#777B7D',
  },

});
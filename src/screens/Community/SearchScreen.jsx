import React, { useMemo, useState } from 'react';

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
// SEARCH SCREEN
// ============================================================

export default function SearchScreen({ navigation }) {


  // ==========================================================
  // SEARCH TEXT
  // ==========================================================

  const [searchText, setSearchText] = useState('');


  // ==========================================================
  // FOLLOWED USERS
  // ==========================================================

  const [followedUsers, setFollowedUsers] = useState([]);


  // ==========================================================
  // USER DATA
  // ==========================================================

  const users = [

    {
      id: 'tirta',

      name: 'Tirta Citot',

      username: '@tirtamandirahudhi',

      image:
        require('../../../assets/budi.png'),
    },


    {
      id: 'deddy',

      name: 'Deddy Corbuzier',

      username: '@deddycorbuzier',

      image:
        require('../../../assets/john.png'),
    },


    {
      id: 'raditya',

      name: 'Raditya Dika',

      username: '@radityadika',

      image:
        require('../../../assets/andi.png'),
    },


    {
      id: 'gia',

      name: 'Gia Pratama',

      username: '@dgriajpratama',

      image:
        require('../../../assets/citra.png'),
    },


    {
      id: 'robi',

      name: 'Robi Syanturi',

      username: '@robisyanturi',

      image:
        require('../../../assets/sara.png'),
    },


    {
      id: 'bobby',

      name: 'Bobby Ida',

      username: '@bobbyida',

      image:
        require('../../../assets/budi.png'),
    },


    {
      id: 'ade',

      name: 'Ade Rai',

      username: '@aderai',

      image:
        require('../../../assets/john.png'),
    },


    {
      id: 'chris',

      name: 'Chris Putra',

      username: '@christputra',

      image:
        require('../../../assets/citra.png'),
    },


    {
      id: 'ikhsan',

      name: 'Ikhsanuddin Qothi',

      username: '@drikhansaqthiii',

      image:
        require('../../../assets/andi.png'),
    },


    {
      id: 'zaf',

      name: 'Zaffy Febryan',

      username: '@zaffyfebryan',

      image:
        require('../../../assets/sara.png'),
    },

  ];


  // ==========================================================
  // FILTER USER
  // ==========================================================

  const filteredUsers = useMemo(() => {

    const keyword =
      searchText
        .trim()
        .toLowerCase();


    if (!keyword) {

      return users;

    }


    return users.filter((user) =>

      user.name
        .toLowerCase()
        .includes(keyword)

      ||

      user.username
        .toLowerCase()
        .includes(keyword)

    );

  }, [searchText]);


  // ==========================================================
  // HANDLE FOLLOW
  // ==========================================================

  const handleFollow = (userId) => {

    setFollowedUsers((previous) => {

      if (previous.includes(userId)) {

        return previous.filter(
          (id) => id !== userId
        );

      }


      return [
        ...previous,
        userId,
      ];

    });

  };


  // ==========================================================
  // CHECK FOLLOWED
  // ==========================================================

  const isFollowed = (userId) => {

    return followedUsers.includes(userId);

  };


  // ==========================================================
  // RENDER USER
  // ==========================================================

  const renderUser = (user) => {

    const followed =
      isFollowed(user.id);


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
          style={styles.userImage}
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
            style={styles.userUsername}
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

            followed &&
              styles.followButtonFollowed,
          ]}
          onPress={() =>
            handleFollow(user.id)
          }
          activeOpacity={0.8}
        >

          <Text
            style={[
              styles.followText,

              followed &&
                styles.followTextFollowed,
            ]}
          >

            {followed
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
          onPress={() =>
            navigation.goBack()
          }
          activeOpacity={0.8}
        >

          <Image
            source={
            require('../../../assets/kembali.png')
            }
            style={styles.backIcon}
            resizeMode="contain"
        />

        </TouchableOpacity>


        {/* ==================================================
            TITLE
        ================================================== */}

        <Text style={styles.headerTitle}>
          Cari
        </Text>

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >


        {/* ==================================================
            SEARCH INPUT
        ================================================== */}

        <View style={styles.searchContainer}>


          {/* SEARCH TEXT INPUT */}

          <TextInput
            style={styles.searchInput}
            placeholder="Cari"
            placeholderTextColor="#74777D"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />


          {/* SEARCH ICON */}

          <View style={styles.searchIconContainer}>

            <View style={styles.searchCircle} />

            <View style={styles.searchHandle} />

          </View>

        </View>


        {/* ==================================================
            SECTION TITLE
        ================================================== */}

        <Text style={styles.sectionTitle}>
          {searchText.trim()
            ? 'Hasil pencarian'
            : 'Orang yang mungkin Anda kenal'}
        </Text>


        {/* ==================================================
            USER LIST
        ================================================== */}

        <View style={styles.userList}>

          {filteredUsers.map(renderUser)}

        </View>


        {/* ==================================================
            EMPTY SEARCH
        ================================================== */}

        {filteredUsers.length === 0 && (

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyText}>
              Pengguna tidak ditemukan
            </Text>

          </View>

        )}


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
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
    backgroundColor: '#FFFFFF',
    marginTop: 32,
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
    width: 26,
    height: 26,
  },


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
    marginLeft: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // SCROLL CONTENT
  // ==========================================================

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 30,
  },


  // ==========================================================
  // SEARCH CONTAINER
  // ==========================================================

  searchContainer: {
    width: '100%',
    height: 60,
    borderRadius: 32,
    backgroundColor: '#F1F1F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 28,
    paddingRight: 22,
  },


  // ==========================================================
  // SEARCH INPUT
  // ==========================================================

  searchInput: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: 19,
    color: '#303337',
  },


  // ==========================================================
  // SEARCH ICON CONTAINER
  // ==========================================================

  searchIconContainer: {
    width: 30,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // SEARCH CIRCLE
  // ==========================================================

  searchCircle: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#686B73',
    top: 1,
    left: 1,
  },


  // ==========================================================
  // SEARCH HANDLE
  // ==========================================================

  searchHandle: {
    position: 'absolute',
    width: 10,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#686B73',
    transform: [
      {
        rotate: '45deg',
      },
    ],
    right: 0,
    bottom: 4,
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    marginTop: 27,
    marginBottom: 14,
    fontSize: 19,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // USER LIST
  // ==========================================================

  userList: {
    width: '100%',
  },


  // ==========================================================
  // USER ITEM
  // ==========================================================

  userItem: {
    width: '100%',
    minHeight: 58,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ==========================================================
  // USER IMAGE
  // ==========================================================

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
  },


  // ==========================================================
  // USER INFORMATION
  // ==========================================================

  userInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    paddingRight: 8,
  },


  // ==========================================================
  // USER NAME
  // ==========================================================

  userName: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // USER USERNAME
  // ==========================================================

  userUsername: {
    marginTop: 1,
    fontSize: 14,
    lineHeight: 18,
    color: '#7A7C81',
  },


  // ==========================================================
  // FOLLOW BUTTON
  // ==========================================================

  followButton: {
    width: 72,
    height: 34,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#003F34',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // FOLLOWED BUTTON
  // ==========================================================

  followButtonFollowed: {
    backgroundColor: '#EAF3F0',
    borderColor: '#69A99A',
  },


  // ==========================================================
  // FOLLOW TEXT
  // ==========================================================

  followText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // FOLLOWED TEXT
  // ==========================================================

  followTextFollowed: {
    color: '#227B68',
  },


  // ==========================================================
  // EMPTY
  // ==========================================================

  emptyContainer: {
    paddingTop: 40,
    alignItems: 'center',
  },


  emptyText: {
    fontSize: 15,
    color: '#85898A',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 10,
  },

});
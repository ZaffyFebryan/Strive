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
// CONTACT SCREEN
// ============================================================

export default function ContactScreen({ navigation }) {


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Ikon panah kembali
    back:
      require('../../../assets/kembali.png'),

    // Ikon search
    search:
      require('../../../assets/cariijo.png'),

    // Ikon pesan sudah dibaca
    doubleCheck:
      require('../../../assets/centangdua.png'),

  };


  // ==========================================================
  // SEARCH STATE
  // ==========================================================

  const [searchText, setSearchText] =
    useState('');


  // ==========================================================
  // CONTACT DATA
  // ==========================================================

  const contacts = [

    {
      id: 'budi',

      name: 'Budi Anto',

      message:
        'Halo Mas Andi, latihan hari ini...',

      time: '10.30',

      profileImage:
        require('../../../assets/budi.png'),

      unread: true,

      status: 'sent',

    },


    {
      id: 'citra',

      name: 'Citra Dewi',

      message:
        'Siku saya agak nyeri setelah...',

      time: '09.22',

      profileImage:
        require('../../../assets/citra.png'),

      unread: false,

      status: 'sent',

    },


    {
      id: 'john',

      name: 'John No',

      message:
        'Nanti latihan sore aja mas...',

      time: '07.23',

      profileImage:
        require('../../../assets/john.png'),

      unread: false,

      status: 'read',

    },


    {
      id: 'ken',

      name: 'Ken Ekopo',

      message:
        'Udah mendingan pak, betis...',

      time: 'Kemarin',

      profileImage:
        require('../../../assets/sara.png'),

      unread: false,

      status: 'read',

    },

  ];


  // ==========================================================
  // FILTER CONTACT
  // ==========================================================

  const filteredContacts =
    contacts.filter((contact) => {

      const keyword =
        searchText
          .toLowerCase()
          .trim();


      if (!keyword) {
        return true;
      }


      return (

        contact.name
          .toLowerCase()
          .includes(keyword)

        ||

        contact.message
          .toLowerCase()
          .includes(keyword)

      );

    });


  // ==========================================================
  // HANDLE OPEN CHAT
  // ==========================================================

  const handleOpenChat = (contact) => {

    /*
      Ketika user memilih salah satu kontak,
      aplikasi akan membuka halaman Chat.

      Data kontak dikirim melalui route.params
      agar halaman Chat dapat menampilkan
      nama dan foto profil yang sesuai.
    */

    navigation.navigate(
      'Conversation',
      {
        contactId:
          contact.id,

        contactName:
          contact.name,

        profileImage:
          contact.profileImage,
      }
    );

  };


  // ==========================================================
  // RENDER CONTACT
  // ==========================================================

  const renderContact = (contact) => {

    return (

      <TouchableOpacity
        key={contact.id}
        style={styles.contactItem}
        onPress={() =>
          handleOpenChat(contact)
        }
        activeOpacity={0.75}
      >


        {/* ==================================================
            PROFILE IMAGE
        ================================================== */}

        <Image
          source={contact.profileImage}
          style={styles.contactProfileImage}
          resizeMode="cover"
        />


        {/* ==================================================
            CONTACT CONTENT
        ================================================== */}

        <View style={styles.contactContent}>


          {/* ================================================
              NAME
          ================================================ */}

          <Text
            style={styles.contactName}
            numberOfLines={1}
          >
            {contact.name}
          </Text>


          {/* ================================================
              MESSAGE ROW
          ================================================ */}

          <View style={styles.messageRow}>


            {/* ==============================================
                MESSAGE STATUS
            ============================================== */}

            {contact.status === 'read' && (

              <Image
                source={ICONS.doubleCheck}
                style={styles.doubleCheckIcon}
                resizeMode="contain"
              />

            )}


            {/* ==============================================
                MESSAGE
            ============================================== */}

            <Text
              style={[
                styles.contactMessage,

                contact.unread &&
                  styles.contactMessageUnread,
              ]}
              numberOfLines={1}
            >
              {contact.message}
            </Text>

          </View>

        </View>


        {/* ==================================================
            TIME
        ================================================== */}

        <View style={styles.timeContainer}>

          <Text
            style={[
              styles.contactTime,

              contact.unread &&
                styles.contactTimeUnread,
            ]}
          >
            {contact.time}
          </Text>


          {/* ==============================================
              UNREAD DOT
          ============================================== */}

          {contact.unread && (

            <View
              style={styles.unreadDot}
            />

          )}

        </View>

      </TouchableOpacity>

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
            source={ICONS.back}
            style={styles.backIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>


        {/* ==================================================
            TITLE
        ================================================== */}

        <Text style={styles.headerTitle}>
          Kontak
        </Text>

      </View>


      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >


        {/* ==================================================
            SEARCH
        ================================================== */}

        <View style={styles.searchContainer}>


          {/* =================================================
              SEARCH INPUT
          ================================================= */}

          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Cari"
            placeholderTextColor="#74777D"
            autoCorrect={false}
            autoCapitalize="none"
          />


          {/* =================================================
              SEARCH ICON
          ================================================= */}

          <Image
            source={ICONS.search}
            style={styles.searchIcon}
            resizeMode="contain"
          />

        </View>


        {/* ==================================================
            CONTACT LIST
        ================================================== */}

        <View style={styles.contactList}>

          {filteredContacts.map(
            renderContact
          )}

        </View>


        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {filteredContacts.length === 0 && (

          <View
            style={styles.emptyContainer}
          >

            <Text
              style={styles.emptyText}
            >
              Kontak tidak ditemukan
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
    paddingTop: 32,

    paddingBottom: 30,
  },


  // ==========================================================
  // SEARCH CONTAINER
  // ==========================================================

  searchContainer: {
    height: 60,

    marginHorizontal: 20,

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
    width: 26,

    height: 26,

    marginRight: 10,
  },


  // ==========================================================
  // CONTACT LIST
  // ==========================================================

  contactList: {
    marginTop: 31,

    paddingHorizontal: 20,
  },


  // ==========================================================
  // CONTACT ITEM
  // ==========================================================

  contactItem: {
    width: '100%',

    minHeight: 75,

    marginBottom: 9,

    flexDirection: 'row',

    alignItems: 'center',
  },


  // ==========================================================
  // PROFILE IMAGE
  // ==========================================================

  contactProfileImage: {
    width: 62,

    height: 62,

    borderRadius: 31,
  },


  // ==========================================================
  // CONTACT CONTENT
  // ==========================================================

  contactContent: {
    flex: 1,

    minWidth: 0,

    marginLeft: 16,

    justifyContent: 'center',
  },


  // ==========================================================
  // CONTACT NAME
  // ==========================================================

  contactName: {
    fontSize: 19,

    fontWeight: '700',

    color: '#003F34',

    marginBottom: 3,
  },


  // ==========================================================
  // MESSAGE ROW
  // ==========================================================

  messageRow: {
    flexDirection: 'row',

    alignItems: 'center',

    width: '100%',
  },


  // ==========================================================
  // DOUBLE CHECK
  // ==========================================================

  doubleCheckIcon: {
    width: 25,

    height: 20,

    marginRight: 6,
  },


  // ==========================================================
  // MESSAGE
  // ==========================================================

  contactMessage: {
    flex: 1,

    fontSize: 17,

    color: '#55595D',
  },


  // ==========================================================
  // UNREAD MESSAGE
  // ==========================================================

  contactMessageUnread: {
    color: '#55595D',
  },


  // ==========================================================
  // TIME CONTAINER
  // ==========================================================

  timeContainer: {
    width: 55,

    marginLeft: 8,

    alignItems: 'flex-end',

    justifyContent: 'center',
  },


  // ==========================================================
  // TIME
  // ==========================================================

  contactTime: {
    fontSize: 14,

    color: '#06483E',

    textAlign: 'right',
  },


  // ==========================================================
  // UNREAD TIME
  // ==========================================================

  contactTimeUnread: {
    color: '#06483E',
  },


  // ==========================================================
  // UNREAD DOT
  // ==========================================================

  unreadDot: {
    width: 10,

    height: 10,

    marginTop: 9,

    borderRadius: 5,

    backgroundColor: '#003F34',
  },


  // ==========================================================
  // EMPTY CONTAINER
  // ==========================================================

  emptyContainer: {
    alignItems: 'center',

    justifyContent: 'center',

    paddingTop: 50,
  },


  // ==========================================================
  // EMPTY TEXT
  // ==========================================================

  emptyText: {
    fontSize: 16,

    color: '#777B7D',
  },

});
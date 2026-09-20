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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';


// ============================================================
// CONVERSATION SCREEN
// ============================================================

export default function ConversationScreen({
  navigation,
  route,
}) {


  // ==========================================================
  // ICON ASSETS
  // ==========================================================

  const ICONS = {

    // Tombol kembali
    back:
      require('../../../assets/kembali.png'),

    // Ikon titik tiga
    more:
      require('../../../assets/lainnya.png'),

    // Ikon smile
    smile:
      require('../../../assets/senyum.png'),

    // Ikon kirim
    send:
      require('../../../assets/Panah-Kanan.png'),

  };


  // ==========================================================
  // CONTACT DATA
  // ==========================================================

  /*
    Data bisa dikirim dari halaman Contact.

    Kalau belum ada parameter,
    maka akan menggunakan data Citra.
  */

  const contactName =
    route?.params?.contactName ||
    'Citra Dewi';


  const contactImage =
    route?.params?.profileImage ||
    require('../../../assets/citra.png');


  // ==========================================================
  // MESSAGE INPUT
  // ==========================================================

  const [message, setMessage] =
    useState('');


  // ==========================================================
  // MESSAGE DATA
  // ==========================================================

  const [messages, setMessages] = useState([

    {
      id: '1',

      sender: 'me',

      text:
        'Halo Mbak Citra! Bagaimana sesi latihan dada dan lengan kemarin? Apakah bebannya sudah terasa pas?',

      time: '09.15',
    },


    {
      id: '2',

      sender: 'other',

      text:
        'Halo Andi. Untuk latihan dada kemarin beban 15 kg sudah cukup menantang buat saya.',

      time: '09.21',
    },


    {
      id: '3',

      sender: 'other',

      text:
        'Siku saya agak nyeri setelah melakukan sesi bench press terakhir kemarin, apakah itu normal?',

      time: '09.22',
    },

  ]);


  // ==========================================================
  // HANDLE SEND MESSAGE
  // ==========================================================

  const handleSendMessage = () => {

    const trimmedMessage =
      message.trim();


    // Jangan kirim kalau kosong
    if (!trimmedMessage) {
      return;
    }


    // Ambil waktu sekarang
    const now =
      new Date();


    const hours =
      String(now.getHours()).padStart(
        2,
        '0'
      );


    const minutes =
      String(now.getMinutes()).padStart(
        2,
        '0'
      );


    // Buat pesan baru
    const newMessage = {

      id:
        Date.now().toString(),

      sender: 'me',

      text:
        trimmedMessage,

      time:
        `${hours}.${minutes}`,

    };


    // Tambahkan pesan
    setMessages((previous) => [

      ...previous,

      newMessage,

    ]);


    // Kosongkan input
    setMessage('');

  };


  // ==========================================================
  // HANDLE OPEN MORE
  // ==========================================================

  const handleOpenMore = () => {

    // Nanti bisa digunakan untuk:
    // - Hapus percakapan
    // - Blokir
    // - Laporkan
    // dan sebagainya.

  };


  // ==========================================================
  // RENDER MESSAGE
  // ==========================================================

  const renderMessage = (item) => {

    const isMe =
      item.sender === 'me';


    return (

      <View
        key={item.id}
        style={[
          styles.messageWrapper,

          isMe
            ? styles.messageWrapperMe
            : styles.messageWrapperOther,
        ]}
      >

        {/* ==================================================
            MESSAGE BUBBLE
        ================================================== */}

        <View
          style={[
            styles.messageBubble,

            isMe
              ? styles.messageBubbleMe
              : styles.messageBubbleOther,
          ]}
        >


          {/* =================================================
              MESSAGE TEXT
          ================================================= */}

          <Text
            style={[
              styles.messageText,

              isMe
                ? styles.messageTextMe
                : styles.messageTextOther,
            ]}
          >
            {item.text}
          </Text>


          {/* =================================================
              TIME
          ================================================= */}

          <Text
            style={[
              styles.messageTime,

              isMe
                ? styles.messageTimeMe
                : styles.messageTimeOther,
            ]}
          >
            {item.time}
          </Text>

        </View>

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
        backgroundColor="#EAF3F0"
        translucent={false}
      />


      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >


        {/* ==================================================
            HEADER
        ================================================== */}

        <View style={styles.header}>


          {/* =================================================
              BACK BUTTON
          ================================================= */}

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


          {/* =================================================
              PROFILE
          ================================================= */}

          <View style={styles.headerProfile}>


            {/* ===============================================
                PROFILE IMAGE
            =============================================== */}

            <Image
              source={contactImage}
              style={styles.headerProfileImage}
              resizeMode="cover"
            />


            {/* ===============================================
                PROFILE INFORMATION
            =============================================== */}

            <View
              style={styles.headerProfileInfo}
            >

              <Text
                style={styles.headerName}
                numberOfLines={1}
              >
                {contactName}
              </Text>


              {/* =============================================
                  ONLINE STATUS
              ============================================= */}

              <View
                style={styles.onlineRow}
              >

                <View
                  style={styles.onlineDot}
                />

                <Text
                  style={styles.onlineText}
                >
                  Online
                </Text>

              </View>

            </View>

          </View>


          {/* =================================================
              MORE BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.moreButton}
            onPress={handleOpenMore}
            activeOpacity={0.8}
          >

            <Image
              source={ICONS.more}
              style={styles.moreIcon}
              resizeMode="contain"
            />

          </TouchableOpacity>

        </View>


        {/* ==================================================
            CHAT AREA
        ================================================== */}

        <ScrollView
          style={styles.chatScroll}
          contentContainerStyle={
            styles.chatContent
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >


          {/* =================================================
              DATE LABEL
          ================================================= */}

          <View
            style={styles.dateContainer}
          >

            <Text
              style={styles.dateText}
            >
              Hari ini
            </Text>

          </View>


          {/* =================================================
              MESSAGES
          ================================================= */}

          <View style={styles.messagesContainer}>

            {messages.map(
              renderMessage
            )}

          </View>


          {/* =================================================
              BOTTOM SPACE
          ================================================= */}

          <View
            style={styles.bottomChatSpace}
          />

        </ScrollView>


        {/* ==================================================
            MESSAGE INPUT AREA
        ================================================== */}

        <View style={styles.inputArea}>


          {/* =================================================
              INPUT CONTAINER
          ================================================= */}

          <View style={styles.inputContainer}>


            {/* ===============================================
                SMILE ICON
            =============================================== */}

            <TouchableOpacity
              style={styles.smileButton}
              activeOpacity={0.8}
            >

              <Image
                source={ICONS.smile}
                style={styles.smileIcon}
                resizeMode="contain"
              />

            </TouchableOpacity>


            {/* ===============================================
                TEXT INPUT
            =============================================== */}

            <TextInput
              style={styles.messageInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Ketik pesan"
              placeholderTextColor="#62656B"
              multiline
              maxLength={500}
              returnKeyType="default"
            />

          </View>


          {/* =================================================
              SEND BUTTON
          ================================================= */}

          <TouchableOpacity
            style={[
              styles.sendButton,

              message.trim().length > 0 &&
                styles.sendButtonActive,
            ]}
            onPress={handleSendMessage}
            activeOpacity={0.8}
          >

            <Image
              source={ICONS.send}
              style={styles.sendIcon}
              resizeMode="contain"
            />

          </TouchableOpacity>

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
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // MAIN CONTAINER
  // ==========================================================

  container: {
    flex: 1,
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 84,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF3F0',
    borderBottomWidth: 1,
    borderBottomColor: '#D7E3E0',
    marginTop: 32,
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 38,
    height: 58,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 8,
  },


  // ==========================================================
  // BACK ICON
  // ==========================================================

  backIcon: {
    width: 25,
    height: 25,
  },


  // ==========================================================
  // HEADER PROFILE
  // ==========================================================

  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ==========================================================
  // HEADER PROFILE IMAGE
  // ==========================================================

  headerProfileImage: {
    width: 52,
    height: 52,
    borderRadius: 31,
  },


  // ==========================================================
  // HEADER PROFILE INFO
  // ==========================================================

  headerProfileInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },


  // ==========================================================
  // HEADER NAME
  // ==========================================================

  headerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // ONLINE ROW
  // ==========================================================

  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },


  // ==========================================================
  // ONLINE DOT
  // ==========================================================

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#63D6AA',
    marginRight: 6,
  },


  // ==========================================================
  // ONLINE TEXT
  // ==========================================================

  onlineText: {
    fontSize: 14,
    color: '#6A6D72',
  },


  // ==========================================================
  // MORE BUTTON
  // ==========================================================

  moreButton: {
    width: 38,
    height: 58,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },


  // ==========================================================
  // MORE ICON
  // ==========================================================

  moreIcon: {
    width: 25,
    height: 25,
  },


  // ==========================================================
  // CHAT SCROLL
  // ==========================================================

  chatScroll: {
    flex: 1,
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // CHAT CONTENT
  // ==========================================================

  chatContent: {
    paddingHorizontal: 20,
    paddingTop: 31,
    paddingBottom: 10,
  },


  // ==========================================================
  // DATE CONTAINER
  // ==========================================================

  dateContainer: {
    alignSelf: 'center',
    paddingHorizontal: 13,
    height: 34,
    borderRadius: 7,
    backgroundColor: '#D9D9DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },


  // ==========================================================
  // DATE TEXT
  // ==========================================================

  dateText: {
    fontSize: 17,
    color: '#44474B',
  },


  // ==========================================================
  // MESSAGES CONTAINER
  // ==========================================================

  messagesContainer: {
    width: '100%',
  },


  // ==========================================================
  // MESSAGE WRAPPER
  // ==========================================================

  messageWrapper: {
    width: '100%',
    marginBottom: 8,
    flexDirection: 'row',
  },


  // ==========================================================
  // MY MESSAGE ALIGNMENT
  // ==========================================================

  messageWrapperMe: {
    justifyContent: 'flex-end',
  },


  // ==========================================================
  // OTHER MESSAGE ALIGNMENT
  // ==========================================================

  messageWrapperOther: {
    justifyContent: 'flex-start',
  },


  // ==========================================================
  // MESSAGE BUBBLE
  // ==========================================================

  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingTop: 11,
    paddingBottom: 9,
  },


  // ==========================================================
  // MY MESSAGE BUBBLE
  // ==========================================================

  messageBubbleMe: {
    backgroundColor: '#63D6AA',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,
  },


  // ==========================================================
  // OTHER MESSAGE BUBBLE
  // ==========================================================

  messageBubbleOther: {
    backgroundColor: '#FFFFFF',

    borderTopLeftRadius: 0,

    borderTopRightRadius: 12,

    borderBottomLeftRadius: 12,

    borderBottomRightRadius: 12,
  },


  // ==========================================================
  // MESSAGE TEXT
  // ==========================================================

  messageText: {
    fontSize: 17,
    lineHeight: 24,
  },


  // ==========================================================
  // MY MESSAGE TEXT
  // ==========================================================

  messageTextMe: {
    color: '#102D27',
  },


  // ==========================================================
  // OTHER MESSAGE TEXT
  // ==========================================================

  messageTextOther: {
    color: '#24272B',
  },


  // ==========================================================
  // MESSAGE TIME
  // ==========================================================

  messageTime: {
    alignSelf: 'flex-end',
    marginTop: 5,
    fontSize: 14,
  },


  // ==========================================================
  // MY MESSAGE TIME
  // ==========================================================

  messageTimeMe: {
    color: '#4B685F',
  },


  // ==========================================================
  // OTHER MESSAGE TIME
  // ==========================================================

  messageTimeOther: {
    color: '#5D6166',
  },


  // ==========================================================
  // BOTTOM CHAT SPACE
  // ==========================================================

  bottomChatSpace: {
    height: 15,
  },


  // ==========================================================
  // INPUT AREA
  // ==========================================================

  inputArea: {
    minHeight: 90,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // INPUT CONTAINER
  // ==========================================================

  inputContainer: {
    flex: 1,
    minHeight: 58,
    maxHeight: 110,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 38,
  },


  // ==========================================================
  // SMILE BUTTON
  // ==========================================================

  smileButton: {
    width: 34,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },


  // ==========================================================
  // SMILE ICON
  // ==========================================================

  smileIcon: {
    width: 28,
    height: 28,
  },


  // ==========================================================
  // MESSAGE INPUT
  // ==========================================================

  messageInput: {
    flex: 1,
    minHeight: 48,
    paddingVertical: 10,
    paddingHorizontal: 3,
    fontSize: 19,
    color: '#303338',
    textAlignVertical: 'center',
  },


  // ==========================================================
  // SEND BUTTON
  // ==========================================================

  sendButton: {
    width: 58,
    height: 58,
    marginLeft: 9,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 38,
  },


  // ==========================================================
  // SEND BUTTON ACTIVE
  // ==========================================================

  sendButtonActive: {
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // SEND ICON
  // ==========================================================

  sendIcon: {
    width: 29,
    height: 29,
  },

});
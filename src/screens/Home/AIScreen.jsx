import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';


// =====================================================
// AI SCREEN
// =====================================================

export default function AIScreen({ navigation }) {


  // =====================================================
  // STATE PESAN
  // =====================================================

  const [messages, setMessages] = useState([]);


  // =====================================================
  // STATE INPUT
  // =====================================================

  const [inputText, setInputText] = useState('');


  // =====================================================
  // PERTANYAAN POPULER
  // =====================================================

  const popularQuestions = [
    'Rekomendasi latihan beban 45 menit',
    'Tips pemulihan otot',
    'Cara mencegah cedera sendi',
    'Cara hitung target protein',
  ];


  // =====================================================
  // PILIH PERTANYAAN POPULER
  // =====================================================

  const handlePopularQuestion = (question) => {

    setInputText(question);

  };


  // =====================================================
  // KIRIM PESAN
  // =====================================================

  const handleSend = () => {

    const message = inputText.trim();


    // Jangan kirim jika input kosong
    if (!message) return;


    // ===================================================
    // PESAN USER
    // ===================================================

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      time: '09.15',
    };


    // Tambahkan pesan user
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);


    // Kosongkan input
    setInputText('');


    // ===================================================
    // SIMULASI BALASAN AI
    // ===================================================

    setTimeout(() => {

      const aiMessage = {
        id: `${Date.now()}-ai`,
        text:
          'Waktu 45 menit sangat ideal untuk latihan intensif! Agar rekomendasimu lebih pas dengan tubuhmu, boleh tahu dua hal ini?\n\n1. Di mana kamu akan berlatih?\n2. Apa target utamamu?',
        sender: 'ai',
        time: '09.15',
      };


      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);

    }, 700);

  };


  // =====================================================
  // RENDER PESAN
  // =====================================================

  const renderMessage = ({ item }) => {

    const isUser = item.sender === 'user';


    return (

      <View
        style={[
          styles.messageRow,

          isUser
            ? styles.messageRowUser
            : styles.messageRowAI,
        ]}
      >

        <View
          style={[
            styles.messageBubble,

            isUser
              ? styles.userBubble
              : styles.aiBubble,
          ]}
        >

          <Text
            style={[
              styles.messageText,

              isUser
                ? styles.userMessageText
                : styles.aiMessageText,
            ]}
          >
            {item.text}
          </Text>


          <Text
            style={[
              styles.messageTime,

              isUser
                ? styles.userMessageTime
                : styles.aiMessageTime,
            ]}
          >
            {item.time}
          </Text>

        </View>

      </View>

    );

  };


  // =====================================================
  // EMPTY STATE
  // =====================================================

  const renderEmptyState = () => {

    return (

      <View style={styles.emptyContainer}>


        {/* =================================================
            PERTANYAAN POPULER
        ================================================= */}

        <View style={styles.popularContainer}>

          <Text style={styles.popularTitle}>
            Pertanyaan populer
          </Text>


          <View style={styles.questionContainer}>

            {popularQuestions.map((question, index) => (

              <TouchableOpacity
                key={index}
                style={styles.questionButton}
                onPress={() => handlePopularQuestion(question)}
                activeOpacity={0.8}
              >

                <Text style={styles.questionText}>
                  {question}
                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

      </View>

    );

  };


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <SafeAreaView style={styles.safe}>


      {/* =================================================
          BACKGROUND
      ================================================= */}

      <ImageBackground
        source={require('../../../assets/BG-AI.png')}
        style={styles.background}
        resizeMode="cover"
      >


        {/* =================================================
            KEYBOARD AVOIDING
        ================================================= */}

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : 'height'
          }
          keyboardVerticalOffset={0}
        >


          {/* =================================================
              HEADER
          ================================================= */}

          <View style={styles.header}>


            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >

              <Image
                source={require('../../../assets/kembali.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />

            </TouchableOpacity>


            {/* =================================================
                HEADER TITLE
            ================================================= */}

            <Text style={styles.headerTitle}>
              Tanya AI
            </Text>


          </View>


          {/* =================================================
              CHAT
          ================================================= */}

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.chatList}
            contentContainerStyle={[
              styles.chatContent,

              messages.length === 0 &&
                styles.chatContentEmpty,
            ]}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />


          {/* =================================================
              INPUT AREA
          ================================================= */}

          <View style={styles.inputArea}>


            {/* =================================================
                TEXT INPUT
            ================================================= */}

            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Tanya AI tentang latihan dan nutrisi"
              placeholderTextColor="#9A9A9A"
              multiline
              maxLength={500}
              textAlignVertical="center"
            />


            {/* =================================================
                SEND BUTTON
            ================================================= */}

            <TouchableOpacity
              style={[
                styles.sendButton,

                !inputText.trim() &&
                  styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
              activeOpacity={0.8}
            >

              <Image
                source={require('../../../assets/Panah-Kanan.png')}
                style={styles.sendIcon}
                resizeMode="contain"
              />

            </TouchableOpacity>


          </View>


        </KeyboardAvoidingView>


      </ImageBackground>


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
  // BACKGROUND
  // ==========================================================

  background: {
    flex: 1,
  },


  // ==========================================================
  // KEYBOARD
  // ==========================================================

  keyboardContainer: {
    flex: 1,
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
    backgroundColor: 'transparent',
    marginTop: 28,
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 32,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  backIcon: {
    width: 24,
    height: 24,
  },


  // ==========================================================
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
    marginLeft: 8,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '700',
    color: '#003125',
  },


  // ==========================================================
  // CHAT
  // ==========================================================

  chatList: {
    flex: 1,
  },


  chatContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
  },


  chatContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },


  // ==========================================================
  // EMPTY AI
  // ==========================================================

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },


  // ==========================================================
  // POPULAR QUESTIONS
  // ==========================================================

  popularContainer: {
    width: '100%',
    marginTop: 260,
  },


  popularTitle: {
    fontSize: 19,
    lineHeight: 20,
    fontWeight: '700',
    color: '#003125',
    marginBottom: 16,
  },


  questionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },


  questionButton: {
    backgroundColor: '#8DE1C0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 32,
  },


  questionText: {
    fontSize: 17,
    lineHeight: 18,
    color: '#145548',
    fontWeight: '400',
  },


  // ==========================================================
  // MESSAGE
  // ==========================================================

  messageRow: {
    width: '100%',
    marginBottom: 12,
  },


  messageRowUser: {
    alignItems: 'flex-end',
  },


  messageRowAI: {
    alignItems: 'flex-start',
  },


  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },


  // ==========================================================
  // USER MESSAGE
  // ==========================================================

  userBubble: {
    backgroundColor: '#8DE1C0',
    borderTopRightRadius: 3,
  },


  userMessageText: {
    color: '#064C42',
  },


  userMessageTime: {
    color: '#5A8177',
    textAlign: 'right',
  },


  // ==========================================================
  // AI MESSAGE
  // ==========================================================

  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 3,
  },


  aiMessageText: {
    color: '#003125',
  },


  aiMessageTime: {
    color: '#7C7C7C',
    textAlign: 'right',
  },


  // ==========================================================
  // MESSAGE TEXT
  // ==========================================================

  messageText: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '400',
  },


  messageTime: {
    fontSize: 17,
    lineHeight: 14,
    marginTop: 4,
  },


  // ==========================================================
  // INPUT AREA
  // ==========================================================

  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,

    // Sebelumnya jarak 52 ada di input
    // dan 52 ada di sendButton.
    // Sekarang dipindahkan ke container
    // agar posisi lebih stabil saat keyboard muncul/ditutup.
    paddingBottom: 67,

    backgroundColor: 'transparent',
  },


  // ==========================================================
  // INPUT
  // ==========================================================

  input: {
    flex: 1,
    minHeight: 60,
    maxHeight: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingHorizontal: 17,
    paddingVertical: 12,
    fontSize: 14,
    color: '#003125',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },


  // ==========================================================
  // SEND BUTTON
  // ==========================================================

  sendButton: {
    width: 58,
    height: 58,
    borderRadius: 32,
    marginLeft: 10,
    backgroundColor: '#62D6A8',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // SEND BUTTON DISABLED
  // ==========================================================

  sendButtonDisabled: {
    opacity: 0.7,
  },


  // ==========================================================
  // SEND ICON
  // ==========================================================

  sendIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },


});
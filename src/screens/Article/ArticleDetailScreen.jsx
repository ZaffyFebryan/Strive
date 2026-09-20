import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';


// ============================================================
// ARTICLE DETAIL SCREEN
// ============================================================

export default function ArticleDetailScreen({ navigation }) {

  // ==========================================================
  // SAFE AREA INSETS
  // ==========================================================

  /*
    Mengambil ukuran area sistem Android/iOS.

    insets.bottom digunakan untuk memberikan ruang tambahan
    di bagian bawah ScrollView agar konten tidak tertutup
    oleh navigation bar bawaan HP.
  */
  const insets = useSafeAreaInsets();


  // ==========================================================
  // STATE
  // ==========================================================

  // Popup share
  const [showSharePopup, setShowSharePopup] = useState(false);

  // Kontak yang dipilih
  const [selectedContact, setSelectedContact] = useState(null);

  // Pesan
  const [message, setMessage] = useState('');

  // Notifikasi berhasil
  const [showShareSuccess, setShowShareSuccess] = useState(false);


  // ==========================================================
  // OPEN SHARE POPUP
  // ==========================================================

  const handleOpenShare = () => {

    setShowSharePopup(true);

    setShowShareSuccess(false);

  };


  // ==========================================================
  // CLOSE SHARE POPUP
  // ==========================================================

  const handleCloseShare = () => {

    setShowSharePopup(false);

    setSelectedContact(null);

    setMessage('');

  };


  // ==========================================================
  // SELECT CONTACT
  // ==========================================================

  const handleSelectContact = (contact) => {

    setSelectedContact(contact);

  };


  // ==========================================================
  // SEND ARTICLE
  // ==========================================================

  const handleSendArticle = () => {

    // Belum memilih kontak
    if (!selectedContact) {
      return;
    }


    // Pesan kosong tidak diperbolehkan
    if (!message.trim()) {
      return;
    }


    // Tutup popup
    setShowSharePopup(false);


    // Reset pilihan
    setSelectedContact(null);
    setMessage('');


    // Tampilkan notifikasi
    setShowShareSuccess(true);


    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => {

      setShowShareSuccess(false);

    }, 3000);

  };


  // ==========================================================
  // CEK FORM SHARE
  // ==========================================================

  const isShareValid =
    selectedContact !== null &&
    message.trim().length > 0;


  // ==========================================================
  // DATA KONTAK
  // ==========================================================

  const contacts = [

    {
      id: 'budi',
      name: 'Budi',
      image: require('../../../assets/budi.png'),
    },

    {
      id: 'john',
      name: 'John',
      image: require('../../../assets/john.png'),
    },

    {
      id: 'citra',
      name: 'Citra',
      image: require('../../../assets/citra.png'),
    },

  ];


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
          ARTICLE CONTENT
      ==================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}

        /*
          Padding bawah dibuat dinamis.

          insets.bottom = ukuran area navigation bar / safe area
          40 = ruang tambahan agar paragraf terakhir tetap
          memiliki jarak dari navigation bar.
        */
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 40,
          },
        ]}

        bounces={true}
      >


        {/* ==================================================
            HERO IMAGE
        ================================================== */}

        <View style={styles.heroContainer}>

          <Image
            source={require('../../../assets/gambar1.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />


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
              size={30}
              color="#003F34"
            />

          </TouchableOpacity>


          {/* =================================================
              CATEGORY BADGE
          ================================================= */}

          <View style={styles.categoryBadge}>

            <Text style={styles.categoryText}>
              Latihan
            </Text>

          </View>


          {/* =================================================
              SHARE BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleOpenShare}
            activeOpacity={0.8}
          >

            <Image
              source={require('../../../assets/bagikan.png')}
              style={styles.shareIcon}
              resizeMode="contain"
            />

          </TouchableOpacity>

        </View>


        {/* ==================================================
            ARTICLE CONTENT
        ================================================== */}

        <View style={styles.articleContainer}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.articleTitle}>
            Teknik Melakukan Bench Press
            {'\n'}
            yang Aman untuk Sendi Bahu
          </Text>


          {/* =================================================
              TIME
          ================================================= */}

          <View style={styles.timeRow}>

            <Feather
              name="clock"
              size={19}
              color="#929399"
            />

            <Text style={styles.timeText}>
              46 menit yang lalu
            </Text>

          </View>


          {/* =================================================
              PARAGRAPH 1
          ================================================= */}

          <Text style={styles.articleParagraph}>

            Bench press merupakan salah satu latihan
            yang efektif untuk melatih otot dada, bahu,
            dan trisep. Namun, teknik yang kurang tepat
            dapat meningkatkan risiko nyeri hingga
            cedera pada sendi bahu. Karena itu,
            memahami posisi tubuh yang benar menjadi
            langkah penting sebelum menambah beban
            latihan.

          </Text>


          {/* =================================================
              PARAGRAPH 2
          ================================================= */}

          <Text style={styles.articleParagraph}>

            Sebelum mulai mengangkat beban, pastikan
            kedua bahu ditarik ke belakang dan ke
            bawah agar tulang belikat tetap stabil di
            bangku. Posisi ini membantu mengurangi
            tekanan berlebih pada sendi bahu selama
            gerakan berlangsung. Selain itu, jaga telapak
            kaki tetap menapak kuat di lantai untuk
            membantu menjaga kestabilan tubuh.

          </Text>


          {/* =================================================
              PARAGRAPH 3
          ================================================= */}

          <Text style={styles.articleParagraph}>

            Saat menurunkan barbel, arahkan barbel
            secara terkontrol menuju bagian tengah
            dada. Hindari menurunkan beban terlalu
            cepat atau membiarkan siku terbuka terlalu
            lebar karena posisi tersebut dapat
            memberikan tekanan tambahan pada sendi
            bahu.

          </Text>


          {/* =================================================
              PARAGRAPH 4
          ================================================= */}

          <Text style={styles.articleParagraph}>

            Gunakan beban yang sesuai dengan kemampuan
            dan utamakan teknik yang benar sebelum
            meningkatkan berat beban. Jika muncul rasa
            sakit yang tidak biasa pada bahu selama
            latihan, hentikan gerakan dan lakukan
            evaluasi sebelum melanjutkan latihan.

          </Text>


        </View>

      </ScrollView>


      {/* ====================================================
          SHARE POPUP
      ==================================================== */}

      {showSharePopup && (

        <View style={styles.shareOverlay}>


          <View style={styles.sharePopup}>


            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <TouchableOpacity
              style={styles.closeShareButton}
              onPress={handleCloseShare}
              activeOpacity={0.8}
            >

              <Feather
                name="x"
                size={22}
                color="#55575B"
              />

            </TouchableOpacity>


            {/* =================================================
                TITLE
            ================================================= */}

            <Text style={styles.shareTitle}>
              Bagikan Artikel
            </Text>


            {/* =================================================
                CONTACT LIST
            ================================================= */}

            <View style={styles.contactRow}>

              {contacts.map((contact) => (

                <TouchableOpacity
                  key={contact.id}
                  style={styles.contactItem}
                  onPress={() =>
                    handleSelectContact(contact.id)
                  }
                  activeOpacity={0.8}
                >

                  <View style={styles.contactImageWrapper}>

                    <Image
                      source={contact.image}
                      style={styles.contactImage}
                      resizeMode="cover"
                    />


                    {/* CHECK */}

                    {selectedContact === contact.id && (

                      <View style={styles.selectedCheck}>

                        <Feather
                          name="check"
                          size={12}
                          color="#FFFFFF"
                        />

                      </View>

                    )}

                  </View>


                  <Text style={styles.contactName}>
                    {contact.name}
                  </Text>

                </TouchableOpacity>

              ))}


              {/* =================================================
                  KONTAK LAIN
              ================================================= */}

              <TouchableOpacity
                style={styles.contactItem}
                activeOpacity={0.8}
              >

                <View style={styles.moreContactCircle}>

                  <Feather
                    name="more-horizontal"
                    size={27}
                    color="#FFFFFF"
                  />

                </View>


                <Text style={styles.contactName}>
                  Kontak
                </Text>

              </TouchableOpacity>

            </View>


            {/* =================================================
                DIVIDER
            ================================================= */}

            <View style={styles.shareDivider} />


            {/* =================================================
                MESSAGE INPUT
            ================================================= */}

            <TextInput
              style={styles.messageInput}
              placeholder="Tulis pesan...."
              placeholderTextColor="#929399"
              value={message}
              onChangeText={setMessage}
              multiline
              textAlignVertical="top"
            />


            {/* =================================================
                SEND BUTTON
            ================================================= */}

            <TouchableOpacity
              style={[
                styles.sendButton,
                isShareValid
                  ? styles.sendButtonActive
                  : styles.sendButtonDisabled,
              ]}
              onPress={handleSendArticle}
              disabled={!isShareValid}
              activeOpacity={0.8}
            >

              <Text style={styles.sendButtonText}>
                Kirim
              </Text>

            </TouchableOpacity>


          </View>

        </View>

      )}


      {/* ====================================================
          SHARE SUCCESS NOTIFICATION
      ==================================================== */}

      {showShareSuccess && (

        <View style={styles.successNotification}>


          <View style={styles.successIconCircle}>

            <Feather
              name="check"
              size={17}
              color="#176C5B"
            />

          </View>


          <Text style={styles.successText}>
            Artikel berhasil dibagikan
          </Text>


        </View>

      )}


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
  // SCROLL
  // ==========================================================

  scrollContent: {
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // HERO
  // ==========================================================

  heroContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
    backgroundColor: '#EAF3F0',
  },


  heroImage: {
    width: '100%',
    height: '100%',
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    position: 'absolute',
    top: 24,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    marginTop: 8,
    backgroundColor: '#F5FAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // CATEGORY
  // ==========================================================

  categoryBadge: {
    position: 'absolute',
    left: 20,
    bottom: 28,
    height: 34,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: '#63D6AA',
    alignItems: 'center',
    justifyContent: 'center',
  },


  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003F34',
  },


  // ==========================================================
  // SHARE BUTTON
  // ==========================================================

  shareButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5FAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },


  shareIcon: {
    width: 26,
    height: 26,
  },


  // ==========================================================
  // ARTICLE CONTAINER
  // ==========================================================

  articleContainer: {
    paddingHorizontal: 20,
    paddingTop: 28,
    backgroundColor: '#FFFFFF',
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  articleTitle: {
    fontSize: 24,
    lineHeight: 35,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // TIME
  // ==========================================================

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },


  timeText: {
    marginLeft: 7,
    fontSize: 17,
    color: '#929399',
  },


  // ==========================================================
  // PARAGRAPH
  // ==========================================================

  articleParagraph: {
    marginTop: 24,
    fontSize: 19,
    lineHeight: 29,
    fontWeight: '400',
    color: '#16483E',
  },


  // ==========================================================
  // SHARE OVERLAY
  // ==========================================================

  shareOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },


  // ==========================================================
  // SHARE POPUP
  // ==========================================================

  sharePopup: {
    width: '90%',
    minHeight: 285,
    paddingHorizontal: 28,
    paddingTop: 35,
    paddingBottom: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#80B8AA',
    backgroundColor: '#EAF3F0',
    position: 'relative',
  },


  // ==========================================================
  // CLOSE BUTTON
  // ==========================================================

  closeShareButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#C8CCCE',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // SHARE TITLE
  // ==========================================================

  shareTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
    textAlign: 'center',
    marginBottom: 20,
  },


  // ==========================================================
  // CONTACT ROW
  // ==========================================================

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },


  contactItem: {
    width: 60,
    alignItems: 'center',
  },


  // ==========================================================
  // CONTACT IMAGE
  // ==========================================================

  contactImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 32,
    position: 'relative',
  },


  contactImage: {
    width: 60,
    height: 60,
    borderRadius: 32,
  },


  // ==========================================================
  // SELECTED CHECK
  // ==========================================================

  selectedCheck: {
    position: 'absolute',
    right: -2,
    bottom: -1,
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#63D6AA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#EAF3F0',
  },


  // ==========================================================
  // MORE CONTACT
  // ==========================================================

  moreContactCircle: {
    width: 60,
    height: 60,
    borderRadius: 36,
    backgroundColor: '#A6ABAE',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // CONTACT NAME
  // ==========================================================

  contactName: {
    marginTop: 6,
    fontSize: 14,
    color: '#16483E',
    textAlign: 'center',
  },


  // ==========================================================
  // DIVIDER
  // ==========================================================

  shareDivider: {
    height: 1,
    backgroundColor: '#9DA5A5',
    marginTop: 16,
    marginBottom: 8,
  },


  // ==========================================================
  // MESSAGE INPUT
  // ==========================================================

  messageInput: {
    height: 48,
    fontSize: 19,
    color: '#16483E',
    paddingHorizontal: 0,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },


  // ==========================================================
  // SEND BUTTON
  // ==========================================================

  sendButton: {
    height: 50,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },


  sendButtonDisabled: {
    backgroundColor: '#929399',
  },


  sendButtonActive: {
    backgroundColor: '#227B68',
  },


  sendButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  // ==========================================================
  // SUCCESS NOTIFICATION
  // ==========================================================

  successNotification: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 52,
    minHeight: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#80B8AA',
    borderRadius: 8,
    backgroundColor: '#EAF3F0',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 200,
  },


  successIconCircle: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#176C5B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },


  successText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16483E',
  },

});
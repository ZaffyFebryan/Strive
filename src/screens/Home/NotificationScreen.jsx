import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';


// ============================================================
// COMPONENT
// ============================================================

export default function NotificationScreen({ navigation }) {

  // =====================================================
  // RENDER NOTIFICATION ITEM
  // =====================================================

  const renderNotification = ({
    icon,
    title,
    description,
    time,
    isToday = false,
    showDot = false,
  }) => {

    return (
      <View style={styles.notificationItem}>

        {/* =================================================
            ICON
        ================================================= */}

        <View style={styles.notificationIconContainer}>

          <Image
            source={icon}
            style={styles.notificationIcon}
            resizeMode="contain"
          />

        </View>


        {/* =================================================
            CONTENT
        ================================================= */}

        <View style={styles.notificationContent}>

          <Text style={styles.notificationText}>

            <Text style={styles.notificationTitle}>
              {title}
            </Text>

            <Text style={styles.notificationDescription}>
              {' '}{description}
            </Text>

          </Text>


          {/* =================================================
              TIME
          ================================================= */}

          <View style={styles.timeContainer}>

            {showDot && (
              <View style={styles.timeDot} />
            )}

            <Text style={styles.timeText}>
              {time}
            </Text>

          </View>

        </View>

      </View>
    );
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* =================================================
          HEADER
      ================================================= */}

        <View style={styles.header}>

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


        <Text style={styles.headerTitle}>
            Notifikasi
        </Text>

        </View>


      {/* =================================================
          CONTENT
      ================================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* =================================================
            NOTIFICATION INTRO
        ================================================= */}

        <Text style={styles.introText}>
          Anda memiliki{' '}
          <Text style={styles.introBold}>
            3 notifikasi baru
          </Text>
          {' '}hari ini.
        </Text>


        {/* =================================================
            HARI INI
        ================================================= */}

        <Text style={styles.sectionTitle}>
          Hari ini
        </Text>


        {/* =================================================
            MAKAN SIANG
        ================================================= */}

        {renderNotification({
          icon: require('../../../assets/makan.png'),
          title: 'Waktunya Makan Siang!',
          description:
            'Jangan lupa catat menu makan siang Anda untuk menjaga target kalori hari ini.',
          time: '2 jam yang lalu',
          showDot: true,
        })}


        {/* =================================================
            LATIHAN BEBAN
        ================================================= */}

        {renderNotification({
          icon: require('../../../assets/dumbel.png'),
          title: 'Jadwal Latihan Beban.',
          description:
            'Hari ini adalah jadwal Pull Day, Siapkan stamina Anda agar bisa berlatih secara maksimal',
          time: '5 jam yang lalu',
          showDot: true,
        })}


        {/* =================================================
            AKTIVITAS KOMUNITAS
        ================================================= */}

        {renderNotification({
          icon: require('../../../assets/orang.png'),
          title: 'Aktivitas Komunitas.',
          description:
            'Budi Anto menyukai kiriman perkembangan fisik Anda!',
          time: '5 jam yang lalu',
          showDot: true,
        })}


        {/* =================================================
            MINGGU INI
        ================================================= */}

        <Text style={styles.sectionTitleWeek}>
          Minggu ini
        </Text>


        {/* =================================================
            PENCAPAIAN
        ================================================= */}

        {renderNotification({
          icon: require('../../../assets/piala.png'),
          title: 'Sistem Pencapaian,',
          description:
            'Anda mendapatkan pencapaian “Konsistensi Baja” karena rajin berlatih',
          time: '2 hari yang lalu',
          showDot: false,
        })}


        {/* =================================================
            AKTIVITAS KOMUNITAS
        ================================================= */}

        {renderNotification({
          icon: require('../../../assets/orang.png'),
          title: 'Aktivitas Komunitas,',
          description:
            'Ken Ekopo menyukai kiriman perkembangan fisik Anda!',
          time: '3 hari yang lalu',
          showDot: false,
        })}

      </ScrollView>

    </SafeAreaView>
  );
}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // =====================================================
  // SCREEN
  // =====================================================

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  // =====================================================
  // HEADER
  // =====================================================

  header: {
    height: 76,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDF',
    marginTop: 28,
  },


  backButton: {
    width: 30,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  backIcon: {
    width: 24,
    height: 24,
    },


  headerTitle: {
    marginLeft: 7,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '600',
    color: '#003F34',
  },


  // =====================================================
  // SCROLL
  // =====================================================

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },


  // =====================================================
  // INTRO
  // =====================================================

  introText: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: '400',
    color: '#003F34',
  },


  introBold: {
    fontWeight: '700',
    color: '#003F34',
  },


  // =====================================================
  // SECTION TITLE
  // =====================================================

  sectionTitle: {
    marginTop: 20,
    marginBottom: 25,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
    color: '#003F34',
  },


  sectionTitleWeek: {
    marginTop: 26,
    marginBottom: 25,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
    color: '#003F34',
  },


  // =====================================================
  // NOTIFICATION ITEM
  // =====================================================

  notificationItem: {
    minHeight: 112,
    paddingBottom: 10,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#C9C9CB',
    flexDirection: 'row',
  },


  // =====================================================
  // ICON
  // =====================================================

  notificationIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EAF3F0',
    borderWidth: 1,
    borderColor: '#C9D8D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },


  notificationIcon: {
    width: 42,
    height: 42,
  },


  // =====================================================
  // NOTIFICATION CONTENT
  // =====================================================

  notificationContent: {
    flex: 1,
    minHeight: 72,
    justifyContent: 'flex-start',
  },


  notificationText: {
    fontSize: 17,
    lineHeight: 24,
    color: '#6F7077',
    fontWeight: '400',
  },


  notificationTitle: {
    fontWeight: '800',
    color: '#003F34',
  },


  notificationDescription: {
    fontWeight: '400',
    color: '#73747B',
  },


  // =====================================================
  // TIME
  // =====================================================

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },


  timeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#003F34',
    marginRight: 16,
  },


  timeText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600',
    color: '#003F34',
  },

});
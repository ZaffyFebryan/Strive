import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';


// ============================================================
// COMPONENT
// ============================================================

export default function BottomNavigation({
  activeTab,
  onPressAdd,
  navigation,
}) {


  // =====================================================
  // TAB DATA
  // =====================================================

  const tabs = [

    {
      id: 'home',
      label: 'Beranda',

      // ICON TIDAK AKTIF
      icon: require('../../../assets/Beranda.png'),

      // ICON AKTIF
      activeIcon: require('../../../assets/Beranda-Ac.png'),
    },


    {
      id: 'article',
      label: 'Artikel',

      // ICON TIDAK AKTIF
      icon: require('../../../assets/Artikel.png'),

      // ICON AKTIF
      activeIcon: require('../../../assets/Artikel-Ac.png'),
    },


    {
      id: 'community',
      label: 'Komunitas',

      // ICON TIDAK AKTIF
      icon: require('../../../assets/Komunitas.png'),

      // ICON AKTIF
      activeIcon: require('../../../assets/Komunitas-Ac.png'),
    },


    {
      id: 'profile',
      label: 'Profil',

      // ICON TIDAK AKTIF
      icon: require('../../../assets/Profil.png'),

      // ICON AKTIF
      activeIcon: require('../../../assets/Profil-Ac.png'),
    },

  ];


  // =====================================================
  // HANDLE TAB PRESS
  // =====================================================

  const handleTabPress = (tab) => {

    if (tab.id === 'home') {
      navigation?.navigate('Home');
    }

    if (tab.id === 'article') {
      navigation?.navigate('Article');
    }

    if (tab.id === 'community') {
      navigation?.navigate('Community');
    }

    if (tab.id === 'profile') {
      navigation?.navigate('Profile');
    }

  };


  // =====================================================
  // RENDER TAB
  // =====================================================

  const renderTab = (tab) => {

    const active = activeTab === tab.id;


    return (

      <TouchableOpacity
        key={tab.id}
        style={styles.tab}
        onPress={() => handleTabPress(tab)}
        activeOpacity={0.7}
      >

        {/* =================================================
            ICON
        ================================================= */}

        <Image
          source={active ? tab.activeIcon : tab.icon}
          style={styles.icon}
          resizeMode="contain"
        />


        {/* =================================================
            LABEL
        ================================================= */}

        <Text
          style={[
            styles.label,
            active && styles.labelActive,
          ]}
        >
          {tab.label}
        </Text>

      </TouchableOpacity>

    );

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <View style={styles.container}>


      {/* =================================================
          BERANDA
          ARTIKEL
      ================================================= */}

      {tabs.slice(0, 2).map(renderTab)}


      {/* =================================================
          CATAT
      ================================================= */}

      <TouchableOpacity
        style={styles.addTab}
        onPress={onPressAdd}
        activeOpacity={0.8}
      >

        <View style={styles.addButton}>

          <Image
            source={require('../../../assets/Catat.png')}
            style={styles.addIcon}
            resizeMode="contain"
          />

        </View>


        <Text style={styles.addLabel}>
          Catat
        </Text>

      </TouchableOpacity>


      {/* =================================================
          KOMUNITAS
          PROFIL
      ================================================= */}

      {tabs.slice(2).map(renderTab)}

    </View>

  );
}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // =====================================================
  // CONTAINER
  // =====================================================

  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 138,
    backgroundColor: '#F7F9FC',
    borderTopWidth: 2,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: '#1F6F5C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    borderRadius: 16,
  },


  // =====================================================
  // TAB
  // =====================================================

  tab: {
    flex: 1,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },


  // =====================================================
  // ICON
  // =====================================================

  icon: {
    width: 26,
    height: 26,
  },


  // =====================================================
  // LABEL
  // =====================================================

  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#747474',
  },


  // =====================================================
  // LABEL ACTIVE
  // =====================================================

  labelActive: {
    color: '#1F6F5C',
    fontWeight: '800',
  },


  // =====================================================
  // CATAT
  // =====================================================

  addTab: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -52,
  },


  // =====================================================
  // ADD BUTTON
  // =====================================================

  addButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#004A39',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // =====================================================
  // ADD ICON
  // =====================================================

  addIcon: {
    width: 27,
    height: 27,
  },


  // =====================================================
  // ADD LABEL
  // =====================================================

  addLabel: {
    marginTop: 1,
    fontSize: 12,
    color: '#1F6F5C',
    fontWeight: '600',
  },

});
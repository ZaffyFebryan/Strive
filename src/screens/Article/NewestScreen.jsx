import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import BottomNavigation from '../../components/navigation/BottomNavigation';
import AddActivitySheet from '../../components/activity/AddActivitySheet';


// ============================================================
// DATA ARTIKEL TERBARU
// ============================================================

const newestArticles = [

  {
    id: '1',
    category: 'Nutrisi',
    title: 'Camilan Tinggi Protein yang Mudah Dibawa',
    time: '2 jam yang lalu',
    image: require('../../../assets/gambar5.png'),
  },

  {
    id: '2',
    category: 'Kesehatan',
    title: 'Pentingnya Menjaga Stamina Tubuh di Masa Tua',
    time: '2 jam yang lalu',
    image: require('../../../assets/gambar1.png'),
  },

  {
    id: '3',
    category: 'Nutrisi',
    title: 'Cara Mudah Penuhi Target Protein Harian Anda',
    time: '1 jam yang lalu',
    image: require('../../../assets/gambar8.png'),
  },

  {
    id: '4',
    category: 'Kesehatan',
    title: 'Manfaat Angkat Beban Bagi Kesehatan Jantung',
    time: '12 menit yang lalu',
    image: require('../../../assets/gambar7.png'),
  },

  {
    id: '5',
    category: 'Manajemen waktu',
    title: 'Cara Konsisten Olahraga Bagi Pekerja Kantor',
    time: '1 jam yang lalu',
    image: require('../../../assets/gambar6.png'),
  },

];


// ============================================================
// COMPONENT
// ============================================================

export default function NewestScreen({ navigation }) {

  // ==========================================================
  // STATE
  // ==========================================================

  const [searchText, setSearchText] = React.useState('');
  const [showAddActivity, setShowAddActivity] = React.useState(false);


  // ==========================================================
  // FILTER ARTIKEL
  // ==========================================================

  const filteredArticles = newestArticles.filter((article) => {

    const keyword = searchText.toLowerCase().trim();

    if (!keyword) {
      return true;
    }

    return (
      article.title.toLowerCase().includes(keyword) ||
      article.category.toLowerCase().includes(keyword)
    );

  });


  // ==========================================================
  // BOTTOM NAVIGATION
  // ==========================================================

  const handleOpenAddActivity = () => {
    setShowAddActivity(true);
  };


  const handleCloseAddActivity = () => {
    setShowAddActivity(false);
  };


  // ==========================================================
  // RENDER ARTICLE
  // ==========================================================

  const renderArticle = ({ item }) => {

    return (

      <TouchableOpacity
        style={styles.articleItem}
        activeOpacity={0.8}

        // Nanti bisa diarahkan ke halaman detail artikel
        // onPress={() => navigation.navigate('ArticleDetail', {
        //   articleId: item.id,
        // })}
      >

        {/* ==================================================
            GAMBAR ARTIKEL
        ================================================== */}

        <Image
          source={item.image}
          style={styles.articleImage}
          resizeMode="cover"
        />


        {/* ==================================================
            INFORMASI ARTIKEL
        ================================================== */}

        <View style={styles.articleInfo}>

          {/* KATEGORI */}

          <Text
            style={styles.articleCategory}
            numberOfLines={1}
          >
            {item.category}
          </Text>


          {/* JUDUL */}

          <Text
            style={styles.articleTitle}
            numberOfLines={2}
          >
            {item.title}
          </Text>


          {/* WAKTU */}

          <View style={styles.timeRow}>

            <Feather
              name="clock"
              size={18}
              color="#929399"
            />

            <Text style={styles.timeText}>
              {item.time}
            </Text>

          </View>

        </View>

      </TouchableOpacity>

    );

  };


  // ==========================================================
  // EMPTY SEARCH
  // ==========================================================

  const renderEmptyComponent = () => {

    return (

      <View style={styles.emptyContainer}>

        <Feather
          name="search"
          size={36}
          color="#929399"
        />

        <Text style={styles.emptyTitle}>
          Artikel tidak ditemukan
        </Text>

        <Text style={styles.emptyText}>
          Coba gunakan kata kunci lain.
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
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View style={styles.header}>

        {/* BACK BUTTON */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >

          <Feather
            name="chevron-left"
            size={32}
            color="#003F34"
          />

        </TouchableOpacity>


        {/* TITLE */}

        <Text style={styles.headerTitle}>
          Terbaru
        </Text>

      </View>


      {/* ====================================================
          SEARCH BAR
      ==================================================== */}

      <View style={styles.searchContainer}>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Cari artikel..."
          placeholderTextColor="#929399"
          style={styles.searchInput}
          returnKeyType="search"
        />


        <Feather
          name="search"
          size={29}
          color="#686B73"
          style={styles.searchIcon}
        />

      </View>


      {/* ====================================================
          ARTICLE LIST
      ==================================================== */}

      <FlatList
        data={filteredArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={[
          styles.listContent,

          filteredArticles.length === 0 &&
            styles.listContentEmpty,
        ]}

        ListEmptyComponent={renderEmptyComponent}
      />


      {/* ====================================================
          BOTTOM NAVIGATION
      ==================================================== */}

      <BottomNavigation
        activeTab="article"
        navigation={navigation}
        onPressAdd={handleOpenAddActivity}
      />


      {/* ====================================================
          ADD ACTIVITY SHEET
      ==================================================== */}

      <AddActivitySheet
        visible={showAddActivity}
        onClose={handleCloseAddActivity}
      />

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
    height: 72,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 38,
  },


  backButton: {
    width: 36,
    height: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 8,
  },


  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // SEARCH
  // ==========================================================

  searchContainer: {
    height: 60,
    marginHorizontal: 20,
    marginTop: 4,
    borderRadius: 32,
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
  },


  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 36,
    paddingRight: 55,
    fontSize: 18,
    color: '#003F34',
  },


  searchIcon: {
    position: 'absolute',
    right: 32,
  },


  // ==========================================================
  // ARTICLE LIST
  // ==========================================================

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 140,
  },


  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },


  // ==========================================================
  // ARTICLE ITEM
  // ==========================================================

  articleItem: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 16,
  },


  // ==========================================================
  // ARTICLE IMAGE
  // ==========================================================

  articleImage: {
    width: 137,
    height: 101,
    borderRadius: 12,
    backgroundColor: '#EAF3F0',
  },


  // ==========================================================
  // ARTICLE INFO
  // ==========================================================

  articleInfo: {
    flex: 1,
    marginLeft: 16,
    minHeight: 101,
    justifyContent: 'flex-start',
  },


  articleCategory: {
    fontSize: 14,
    lineHeight: 19,
    color: '#929399',
    marginBottom: 4,
  },


  articleTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '700',
    color: '#003F34',
    paddingRight: 2,
  },


  // ==========================================================
  // TIME
  // ==========================================================

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },


  timeText: {
    marginLeft: 7,
    fontSize: 14,
    color: '#929399',
  },


  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },


  emptyTitle: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: '700',
    color: '#003F34',
  },


  emptyText: {
    marginTop: 5,
    fontSize: 14,
    color: '#929399',
    textAlign: 'center',
  },

});
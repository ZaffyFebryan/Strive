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

import { Feather } from '@expo/vector-icons';

import BottomNavigation from '../../components/navigation/BottomNavigation';
import AddActivitySheet from '../../components/activity/AddActivitySheet';


// ============================================================
// DATA ARTIKEL
// ============================================================

const articles = [
  {
    id: 1,
    category: 'Latihan',
    title: 'Cara Melakukan Squat dengan Postur yang Benar',
    time: '22 menit yang lalu',
    image: require('../../../assets/gambar1.png'),
  },

  {
    id: 2,
    category: 'Latihan',
    title: 'Teknik Bench Press yang Aman untuk Sendi Bahu',
    time: '46 menit yang lalu',
    image: require('../../../assets/gambar2.png'),
  },

  {
    id: 3,
    category: 'Latihan',
    title: 'Panduan Latihan Pull Day Efektif di Rumah',
    time: '1 jam yang lalu',
    image: require('../../../assets/gambar3.png'),
  },

  {
    id: 4,
    category: 'Kesehatan',
    title: 'Pentingnya Istirahat untuk Pemulihan Otot',
    time: '1 jam yang lalu',
    image: require('../../../assets/gambar4.png'),
  },

  {
    id: 5,
    category: 'Latihan',
    title: 'Variasi Gerakan Angkat Beban Melatih Otot Back',
    time: '2 jam yang lalu',
    image: require('../../../assets/gambar5.png'),
  },

  {
    id: 6,
    category: 'Nutrisi',
    title: 'Cara Menghitung Kebutuhan Kalori Harian',
    time: '46 menit yang lalu',
    image: require('../../../assets/gambar6.png'),
  },

  {
    id: 7,
    category: 'Nutrisi',
    title: 'Panduan Memilih Makanan Tinggi Protein',
    time: '1 jam yang lalu',
    image: require('../../../assets/gambar7.png'),
  },

  {
    id: 8,
    category: 'Nutrisi',
    title: 'Mengenal Karbohidrat untuk Mendukung Latihan',
    time: '2 jam yang lalu',
    image: require('../../../assets/gambar8.png'),
  },

  {
    id: 9,
    category: 'Manajemen Waktu',
    title: 'Cara Menjaga Konsistensi Latihan Setiap Minggu',
    time: '1 jam yang lalu',
    image: require('../../../assets/gambar4.png'),
  },

  {
    id: 10,
    category: 'Manajemen Waktu',
    title: 'Cara Mengatur Jadwal Latihan yang Efektif',
    time: '2 jam yang lalu',
    image: require('../../../assets/gambar1.png'),
  },
];


// ============================================================
// KATEGORI
// ============================================================

const categories = [
  'Semua',
  'Latihan',
  'Nutrisi',
  'Manajemen Waktu',
  'Kesehatan'
];


// ============================================================
// ARTICLE SCREEN
// ============================================================

export default function ArticleScreen({ navigation }) {

  // ==========================================================
  // STATE
  // ==========================================================

  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchText, setSearchText] = useState('');
  const [showAddActivity, setShowAddActivity] = useState(false);


  // ==========================================================
  // FILTER ARTIKEL
  // ==========================================================

  const filteredArticles = useMemo(() => {

    let result = articles;


    // --------------------------------------------------------
    // FILTER KATEGORI
    // --------------------------------------------------------

    if (selectedCategory !== 'Semua') {

      result = result.filter(
        (article) =>
          article.category === selectedCategory
      );

    }


    // --------------------------------------------------------
    // FILTER SEARCH
    // --------------------------------------------------------

    if (searchText.trim() !== '') {

      const keyword = searchText
        .toLowerCase()
        .trim();

      result = result.filter((article) => {

        return (
          article.title
            .toLowerCase()
            .includes(keyword) ||

          article.category
            .toLowerCase()
            .includes(keyword)
        );

      });

    }


    return result;

  }, [selectedCategory, searchText]);


  // ==========================================================
  // ARTIKEL REKOMENDASI
  // HANYA DIGUNAKAN PADA KATEGORI SEMUA
  // ==========================================================

  const recommendationArticles = articles.slice(1, 4);


  // ==========================================================
  // NAVIGASI CATAT
  // ==========================================================

  const handleOpenAddActivity = () => {
    setShowAddActivity(true);
  };


  const handleCloseAddActivity = () => {
    setShowAddActivity(false);
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >


        {/* ==================================================
            SEARCH
        ================================================== */}

        <View style={styles.searchContainer}>

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Cari artikel..."
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
            returnKeyType="search"
          />


          <Feather
            name="search"
            size={29}
            color="#73767B"
            style={styles.searchIcon}
          />

        </View>


        {/* ==================================================
            CATEGORY
        ================================================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >

          {categories.map((category) => {

            const isActive =
              selectedCategory === category;


            return (

              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,

                  isActive &&
                    styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setSelectedCategory(category)
                }
                activeOpacity={0.8}
              >

                <Text
                  style={[
                    styles.categoryText,

                    isActive &&
                      styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>

              </TouchableOpacity>

            );

          })}

        </ScrollView>


        {/* ==================================================
            REKOMENDASI

            HANYA MUNCUL SAAT "SEMUA"
        ================================================== */}

        {selectedCategory === 'Semua' && (

          <View style={styles.recommendationSection}>


            {/* HEADER REKOMENDASI */}

            <View style={styles.sectionHeader}>

              <Text style={styles.sectionTitle}>
                Rekomendasi
              </Text>


              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Recommendation')}
              >
                <Text style={styles.seeAllText}>
                  Lihat semua
                </Text>
              </TouchableOpacity>

            </View>


            {/* RECOMMENDATION CARDS */}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                styles.recommendationScroll
              }
            >

              {recommendationArticles.map(
                (article) => (

                  <TouchableOpacity
                    key={article.id}
                    style={styles.recommendationCard}
                    activeOpacity={0.9}
                  >

                    <Image
                      source={article.image}
                      style={styles.recommendationImage}
                      resizeMode="cover"
                    />


                    {/* OVERLAY */}

                    <View
                      style={
                        styles.recommendationOverlay
                      }
                    />


                    {/* CATEGORY BADGE */}

                    <View
                      style={
                        styles.recommendationBadge
                      }
                    >

                      <Text
                        style={
                          styles.recommendationBadgeText
                        }
                      >
                        {article.category}
                      </Text>

                    </View>


                    {/* TITLE */}

                    <Text
                      style={
                        styles.recommendationTitle
                      }
                    >
                      {article.title}
                    </Text>

                  </TouchableOpacity>

                )
              )}

            </ScrollView>

          </View>

        )}


        {/* ==================================================
            HEADER TERBARU

            HANYA MUNCUL SAAT "SEMUA"
        ================================================== */}

        {selectedCategory === 'Semua' && (

          <View style={styles.latestHeader}>

            <Text style={styles.sectionTitle}>
              Terbaru
            </Text>


            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Newest')}
              >
                <Text style={styles.seeAllText}>
                  Lihat semua
                </Text>
              </TouchableOpacity>

          </View>

        )}


        {/* ==================================================
            DAFTAR ARTIKEL
        ================================================== */}

        <View
          style={[
            styles.articleList,

            selectedCategory !== 'Semua' &&
              styles.articleListFiltered,
          ]}
        >

          {filteredArticles.map((article) => (

            <TouchableOpacity
              key={article.id}
              style={styles.articleItem}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ArticleDetail', {
                  article: article,
                })
              }
            >

              {/* =================================================
                  GAMBAR
              ================================================= */}

              <Image
                source={article.image}
                style={styles.articleImage}
                resizeMode="cover"
              />


              {/* =================================================
                  INFORMASI ARTIKEL
              ================================================= */}

              <View style={styles.articleInfo}>

                <Text style={styles.articleCategory}>
                  {article.category}
                </Text>


                <Text
                  style={styles.articleTitle}
                  numberOfLines={2}
                >
                  {article.title}
                </Text>


                {/* WAKTU */}

                <View style={styles.articleTimeRow}>

                  <Feather
                    name="clock"
                    size={18}
                    color="#999BA0"
                  />

                  <Text style={styles.articleTime}>
                    {article.time}
                  </Text>

                </View>

              </View>

            </TouchableOpacity>

          ))}


          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {filteredArticles.length === 0 && (

            <View style={styles.emptyContainer}>

              <Feather
                name="search"
                size={40}
                color="#A0A0A0"
              />

              <Text style={styles.emptyTitle}>
                Artikel tidak ditemukan
              </Text>

              <Text style={styles.emptyText}>
                Coba gunakan kata kunci pencarian
                yang berbeda.
              </Text>

            </View>

          )}

        </View>

      </ScrollView>


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
  // SCROLL
  // ==========================================================

  scrollContent: {
    paddingTop: 25,
    paddingBottom: 150,
  },


  // ==========================================================
  // SEARCH
  // ==========================================================

  searchContainer: {
    height: 60,
    marginHorizontal: 20,
    borderRadius: 32,
    backgroundColor: '#F1F1F2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 36,
    paddingRight: 20,
    marginTop: 42,
  },


  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 19,
    color: '#003F34',
    paddingVertical: 0,
  },


  searchIcon: {
    marginRight: 14,
  },


  // ==========================================================
  // CATEGORY
  // ==========================================================

  categoryContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 7,
    gap: 8,
  },


  categoryButton: {
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: '#F2F2F3',
    alignItems: 'center',
    justifyContent: 'center',
  },


  categoryButtonActive: {
    backgroundColor: '#1F7A68',
  },


  categoryText: {
    fontSize: 17,
    color: '#8E8E93',
    fontWeight: '400',
  },


  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },


  // ==========================================================
  // REKOMENDASI
  // ==========================================================

  recommendationSection: {
    marginTop: 15,
  },


  // ==========================================================
  // SECTION HEADER
  // ==========================================================

  sectionHeader: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  seeAllText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#197461',
  },


  // ==========================================================
  // RECOMMENDATION SCROLL
  // ==========================================================

  recommendationScroll: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    gap: 16,
  },


  // ==========================================================
  // RECOMMENDATION CARD
  // ==========================================================

  recommendationCard: {
    width: 310,
    height: 180,
    borderRadius: 13,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E5E5E5',
  },


  recommendationImage: {
    width: '100%',
    height: '100%',
  },


  recommendationOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },


  recommendationBadge: {
    position: 'absolute',
    top: 18,
    left: 22,
    paddingHorizontal: 18,
    height: 34,
    borderRadius: 18,
    backgroundColor: '#63D6AA',
    alignItems: 'center',
    justifyContent: 'center',
  },


  recommendationBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003F34',
  },


  recommendationTitle: {
    position: 'absolute',
    left: 22,
    right: 18,
    bottom: 17,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },


  // ==========================================================
  // TERBARU
  // ==========================================================

  latestHeader: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  // ==========================================================
  // ARTICLE LIST
  // ==========================================================

  articleList: {
    marginTop: 0,
    paddingHorizontal: 20,
  },


  // ==========================================================
  // ARTICLE LIST KETIKA FILTER AKTIF
  // ==========================================================

  articleListFiltered: {
    marginTop: 12,
  },


  // ==========================================================
  // ARTICLE ITEM
  // ==========================================================

  articleItem: {
    flexDirection: 'row',
    marginBottom: 14,
    minHeight: 100,
  },


  // ==========================================================
  // ARTICLE IMAGE
  // ==========================================================

  articleImage: {
    width: 124,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#E8E8E8',
  },


  // ==========================================================
  // ARTICLE INFORMATION
  // ==========================================================

  articleInfo: {
    flex: 1,
    marginLeft: 15,
    paddingTop: 1,
    justifyContent: 'flex-start',
  },


  articleCategory: {
    fontSize: 14,
    color: '#85858A',
    marginBottom: 5,
  },


  articleTitle: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // ARTICLE TIME
  // ==========================================================

  articleTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },


  articleTime: {
    marginLeft: 7,
    fontSize: 14,
    color: '#999BA0',
  },


  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingHorizontal: 30,
  },


  emptyTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '700',
    color: '#003F34',
  },


  emptyText: {
    marginTop: 6,
    fontSize: 14,
    color: '#999BA0',
    textAlign: 'center',
    lineHeight: 21,
  },

});
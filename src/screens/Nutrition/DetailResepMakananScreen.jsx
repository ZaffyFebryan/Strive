import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// DATA DETAIL RESEP
// ============================================================

const recipeDetails = {

  'recipe-1': {
    title:
      'Dada Ayam Panggang Teppanyaki yang Tinggi Protein',

    image:
      require('../../../assets/dadaayam.png'),

    cookingTime:
      'Estimasi memasak : 20 Menit',

    description:
      'Menu ini dirancang khusus untuk Anda yang sibuk namun ingin memenuhi target protein harian dengan rasa yang lezat. Menggunakan dada ayam tanpa kulit yang dimasak minim minyak, hidangan ini sangat mendukung pembentukan massa otot tanpa menimbulkan lemak jenuh berlebih.',

    nutrition: {
      calories: '340 kkal',
      protein: '45 gram (Makro Utama)',
      carbohydrates: '12 gram',
      fiber: '1 gram',
    },

    ingredients: [
      '200 gram dada ayam filat (potong dadu)',
      '1 sendok makan saus tiram rendah natrium',
      '1 siung bawang putih (cincang halus)',
      '1 sendok teh minyak zaitun atau minyak wijen',
      'Wijen sangrai secukupnya untuk taburan',
    ],

    steps: [
      'Marinasi: Campurkan potongan dada ayam dengan bawang putih cincang dan saus tiram, lalu diamkan selama 10 menit agar bumbu meresap sempurna.',

      'Memasak: Panaskan minyak zaitun di atas wajan anti-lengket dengan api sedang, lalu masukkan ayam yang sudah dimarinasi.',

      'Penyajian: Masak ayam hingga berubah warna kecokelatan dan matang merata selama 8 menit, angkat, lalu taburkan wijen sangrai di atasnya sebelum disajikan.',
    ],
  },


  // ==========================================================
  // RESEP 2
  // ==========================================================

  'recipe-2': {
    title:
      'Omelet Sayur Keju, Sangat Praktis untuk Menu Sarapan',

    image:
      require('../../../assets/omelet.png'),

    cookingTime:
      'Estimasi memasak : 15 Menit',

    description:
      'Menu sarapan praktis dengan perpaduan telur, sayuran, dan keju yang lezat. Cocok untuk Anda yang membutuhkan menu sederhana dan bergizi untuk memulai aktivitas sehari-hari.',

    nutrition: {
      calories: '280 kkal',
      protein: '18 gram',
      carbohydrates: '10 gram',
      fiber: '3 gram',
    },

    ingredients: [
      '2 butir telur',
      '50 gram sayuran campur',
      '30 gram keju',
      '1 sendok teh minyak zaitun',
      'Garam secukupnya',
      'Lada secukupnya',
    ],

    steps: [
      'Kocok telur bersama garam dan lada hingga tercampur rata.',
      'Panaskan minyak di atas wajan anti-lengket kemudian masukkan sayuran.',
      'Tuangkan telur dan tambahkan keju.',
      'Masak hingga matang merata lalu lipat omelet dan sajikan.',
    ],
  },


  // ==========================================================
  // RESEP 3
  // ==========================================================

  'recipe-3': {
    title:
      'Resep Tumis Sapi Brokoli Saus Tiram yang Rendah Kalori',

    image:
      require('../../../assets/tumissapi.png'),

    cookingTime:
      'Estimasi memasak : 20 Menit',

    description:
      'Tumis sapi dan brokoli dengan saus tiram yang praktis dan lezat. Menu ini cocok untuk pilihan makanan dengan kandungan protein yang cukup dan kalori yang tetap terkontrol.',

    nutrition: {
      calories: '320 kkal',
      protein: '30 gram',
      carbohydrates: '15 gram',
      fiber: '5 gram',
    },

    ingredients: [
      '150 gram daging sapi tanpa lemak',
      '100 gram brokoli',
      '1 sendok makan saus tiram',
      '2 siung bawang putih',
      '1 sendok teh minyak zaitun',
    ],

    steps: [
      'Potong daging sapi menjadi irisan tipis.',
      'Panaskan minyak lalu tumis bawang putih hingga harum.',
      'Masukkan daging sapi dan masak hingga berubah warna.',
      'Tambahkan brokoli dan saus tiram.',
      'Masak hingga semua bahan matang lalu sajikan.',
    ],
  },


  // ==========================================================
  // RESEP 4
  // ==========================================================

  'recipe-4': {
    title:
      'Resep Gado-Gado Siram Spesial Pelacak Serat Harian',

    image:
      require('../../../assets/gadogado.png'),

    cookingTime:
      'Estimasi memasak : 25 Menit',

    description:
      'Gado-gado dengan perpaduan sayuran segar dan saus kacang yang lezat. Pilihan yang cocok untuk menambah asupan sayuran dan serat harian.',

    nutrition: {
      calories: '300 kkal',
      protein: '12 gram',
      carbohydrates: '25 gram',
      fiber: '8 gram',
    },

    ingredients: [
      '100 gram sayuran rebus',
      '50 gram tahu',
      '50 gram tempe',
      'Saus kacang secukupnya',
      'Kerupuk secukupnya',
    ],

    steps: [
      'Cuci dan potong seluruh sayuran.',
      'Rebus sayuran hingga matang.',
      'Goreng atau panggang tahu dan tempe.',
      'Susun seluruh bahan di atas piring.',
      'Siram dengan saus kacang kemudian sajikan.',
    ],
  },


  // ==========================================================
  // RESEP 5
  // ==========================================================

  'recipe-5': {
    title:
      'Resep Nasi Goreng Merah Dada Ayam yang Rendah Minyak',

    image:
      require('../../../assets/nasigoreng.png'),

    cookingTime:
      'Estimasi memasak : 20 Menit',

    description:
      'Nasi goreng dengan dada ayam yang dibuat menggunakan sedikit minyak. Cocok sebagai pilihan menu praktis dengan kandungan protein yang tetap terjaga.',

    nutrition: {
      calories: '360 kkal',
      protein: '25 gram',
      carbohydrates: '45 gram',
      fiber: '3 gram',
    },

    ingredients: [
      '150 gram nasi putih',
      '100 gram dada ayam',
      '1 butir telur',
      '2 siung bawang putih',
      '1 sendok teh minyak',
      'Bumbu secukupnya',
    ],

    steps: [
      'Potong dada ayam menjadi bagian kecil.',
      'Tumis bawang putih menggunakan sedikit minyak.',
      'Masukkan ayam dan masak hingga matang.',
      'Masukkan telur dan nasi kemudian aduk rata.',
      'Tambahkan bumbu sesuai selera lalu masak hingga matang.',
    ],
  },

};


// ============================================================
// DETAIL RESEP SCREEN
// ============================================================

export default function DetailResepMakananScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // AMBIL RECIPE ID
  // ==========================================================

  const recipeId =
    route?.params?.recipeId || 'recipe-1';


  // ==========================================================
  // DATA RESEP
  // ==========================================================

  const recipe =
    recipeDetails[recipeId] ||
    recipeDetails['recipe-1'];


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />


      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ==================================================
            HERO IMAGE
        ================================================== */}

        <View style={styles.imageContainer}>

          <Image
            source={recipe.image}
            style={styles.heroImage}
            resizeMode="cover"
          />


          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={handleBack}
          >

            <Feather
              name="chevron-left"
              size={27}
              color="#003F34"
            />

          </TouchableOpacity>

        </View>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <View style={styles.content}>


          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.title}>
            {recipe.title}
          </Text>


          {/* =================================================
              COOKING TIME
          ================================================= */}

          <View style={styles.cookingTimeContainer}>

            <Feather
              name="clock"
              size={18}
              color="#999CA2"
            />

            <Text style={styles.cookingTime}>
              {recipe.cookingTime}
            </Text>

          </View>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Text style={styles.description}>
            {recipe.description}
          </Text>


          {/* =================================================
              NUTRITION
          ================================================= */}

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Kandungan Nutrisi
            </Text>


            <Text style={styles.normalText}>
              Kalori: {recipe.nutrition.calories}
            </Text>


            <Text style={styles.normalText}>
              Protein: {recipe.nutrition.protein}
            </Text>


            <Text style={styles.normalText}>
              Karbohidrat: {recipe.nutrition.carbohydrates}
            </Text>


            <Text style={styles.normalText}>
              Serat: {recipe.nutrition.fiber}
            </Text>

          </View>


          {/* =================================================
              INGREDIENTS
          ================================================= */}

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Bahan-Bahan Utama:
            </Text>


            {recipe.ingredients.map(
              (ingredient, index) => (

                <Text
                  key={index}
                  style={styles.bulletText}
                >
                  • {ingredient}
                </Text>

              )
            )}

          </View>


          {/* =================================================
              STEPS
          ================================================= */}

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Cara Pembuatan:
            </Text>


            {recipe.steps.map(
              (step, index) => (

                <View
                  key={index}
                  style={styles.stepRow}
                >

                  <Text style={styles.stepNumber}>
                    {index + 1}.
                  </Text>


                  <Text style={styles.stepText}>
                    {step}
                  </Text>

                </View>

              )
            )}

          </View>


          {/* =================================================
              BOTTOM SPACE
          ================================================= */}

          <View style={styles.bottomSpace} />

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // GENERAL
  // ==========================================================

  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingBottom: 0,
  },


  // ==========================================================
  // HERO IMAGE
  // ==========================================================

  imageContainer: {
    width: '100%',
    height: 300,

    position: 'relative',

    backgroundColor: '#E9E9E9',
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

    top: 18,
    left: 20,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: '#F4F7F4',

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    marginTop: 26,
  },


  // ==========================================================
  // CONTENT
  // ==========================================================

  content: {
    paddingHorizontal: 19,
    paddingTop: 18,
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    fontSize: 24,

    lineHeight: 31,

    fontWeight: '700',

    color: '#003F34',

    marginBottom: 11,
  },


  // ==========================================================
  // COOKING TIME
  // ==========================================================

  cookingTimeContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 24,
  },


  cookingTime: {
    marginLeft: 8,

    fontSize: 17,

    lineHeight: 20,

    color: '#999CA2',

    fontWeight: '400',
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    fontSize: 17,

    lineHeight: 24,

    color: '#16483E',

    fontWeight: '400',

    marginBottom: 25,
  },


  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginBottom: 24,
  },


  sectionTitle: {
    fontSize: 17,

    lineHeight: 23,

    fontWeight: '700',

    color: '#003F34',

    marginBottom: 2,
  },


  // ==========================================================
  // NORMAL TEXT
  // ==========================================================

  normalText: {
    fontSize: 17,

    lineHeight: 24,

    color: '#16483E',

    fontWeight: '400',
  },


  // ==========================================================
  // BULLET
  // ==========================================================

  bulletText: {
    fontSize: 17,

    lineHeight: 24,

    color: '#16483E',

    fontWeight: '400',

    paddingLeft: 4,
  },


  // ==========================================================
  // STEP
  // ==========================================================

  stepRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    width: '100%',
  },


  stepNumber: {
    width: 24,

    fontSize: 17,

    lineHeight: 24,

    color: '#16483E',

    fontWeight: '400',
  },


  stepText: {
    flex: 1,

    fontSize: 17,

    lineHeight: 24,

    color: '#16483E',

    fontWeight: '400',
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomSpace: {
    height: 35,
  },

});
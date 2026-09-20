import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  Pressable,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// ASSETS
// ============================================================
//
// Grafik lingkaran untuk tanggal yang sudah selesai:
// nutrition_ring.png
//
// Grafik lingkaran kosong untuk hari ini / besok:
// nutrition_ring_empty.png
//

const nutritionRingFilled = require(
  '../../../assets/nutrition_ring.png'
);

const nutritionRingEmpty = require(
  '../../../assets/nutrition_ring_empty.png'
);


// ============================================================
// NUTRITION SCREEN
// ============================================================

export default function NutritionScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // TODAY
  // ==========================================================

  const TODAY = new Date(2026, 6, 23);

  const [weekOffset, setWeekOffset] = useState(0);

  const [selectedDate, setSelectedDate] = useState(
    new Date(TODAY)
  );

  // Popup kalender
  const [showDateModal, setShowDateModal] =
    useState(false);

  // Bulan yang sedang ditampilkan pada popup kalender
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(
      TODAY.getFullYear(),
      TODAY.getMonth(),
      1
    )
  );

  // Apakah Makanan Tambahan sudah ditambahkan
  const [showAdditionalFood, setShowAdditionalFood] =
    useState(false);


  // ==========================================================
  // WEEK DATE CALCULATION
  // ==========================================================

  const getStartOfWeek = (date) => {

    const result = new Date(date);

    const day = result.getDay();

    // Senin = 0
    // Minggu = 6

    const diff =
      day === 0
        ? -6
        : 1 - day;

    result.setDate(
      result.getDate() + diff
    );

    return result;
  };


  const weekDates = useMemo(() => {

    const start = getStartOfWeek(TODAY);

    start.setDate(
      start.getDate() +
      (weekOffset * 7)
    );

    const dates = [];

    for (let i = 0; i < 7; i++) {

      const date = new Date(start);

      date.setDate(
        start.getDate() + i
      );

      dates.push(date);
    }

    return dates;

  }, [weekOffset]);


  // ==========================================================
  // DATE HELPERS
  // ==========================================================

  const isSameDate = (
    date1,
    date2
  ) => {

    return (
      date1.getFullYear() ===
        date2.getFullYear() &&

      date1.getMonth() ===
        date2.getMonth() &&

      date1.getDate() ===
        date2.getDate()
    );
  };


  const getDateStatus = (date) => {

    const current =
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

    const today =
      new Date(
        TODAY.getFullYear(),
        TODAY.getMonth(),
        TODAY.getDate()
      );


    if (current < today) {
      return 'past';
    }

    if (isSameDate(current, today)) {
      return 'today';
    }

    return 'future';
  };


  // ==========================================================
  // DAY ITEM BACKGROUND
  // ==========================================================
  //
  // Ini bagian penting untuk mengikuti desain gambar:
  //
  // Past + tidak dipilih  -> hijau muda
  // Past + dipilih        -> hijau tua
  //
  // Today + tidak dipilih -> hijau tua
  // Today + dipilih       -> hijau tua
  //
  // Future + tidak dipilih -> abu muda
  // Future + dipilih       -> abu gelap
  //

  const getDayBackgroundStyle = (
    status,
    selected
  ) => {

    if (selected) {

      if (status === 'future') {
        return styles.dayItemFutureSelected;
      }

      return styles.dayItemSelectedDark;
    }

    if (status === 'past') {
      return styles.dayItemPast;
    }

    if (status === 'today') {
      return styles.dayItemToday;
    }

    return styles.dayItemFuture;
  };


  // ==========================================================
  // DAY TEXT COLOR
  // ==========================================================

  const getDayNumberStyle = (
    status,
    selected
  ) => {

    // Semua tanggal yang sedang dipilih
    // menggunakan angka putih.

    if (selected) {
      return styles.dayNumberSelected;
    }

    if (status === 'future') {
      return styles.dayNumberFuture;
    }

    return styles.dayNumber;
  };


  // ==========================================================
  // MONTH NAME
  // ==========================================================

  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];


  const currentMonth =
    weekDates[3]?.getMonth() ??
    TODAY.getMonth();

  const currentYear =
    weekDates[3]?.getFullYear() ??
    TODAY.getFullYear();


  // ==========================================================
  // DAY NAME
  // ==========================================================

  const dayNames = [
    'M',
    'S',
    'S',
    'R',
    'K',
    'J',
    'S',
  ];

  const fullDayNames = [
    'Sen',
    'Sel',
    'Rab',
    'Kam',
    'Jum',
    'Sab',
    'Min',
  ];


  // ==========================================================
  // SELECT DATE
  // ==========================================================

  const handleSelectDate = (date) => {

    setSelectedDate(
      new Date(date)
    );

    setWeekOffset(
      Math.floor(
        (
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          ) -
          getStartOfWeek(TODAY)
        ) /
        (1000 * 60 * 60 * 24 * 7)
      )
    );

    setShowDateModal(false);
  };


  // ==========================================================
  // WEEK NAVIGATION
  // ==========================================================

  const handlePreviousWeek = () => {

    setWeekOffset(
      previous => previous - 1
    );
  };


  const handleNextWeek = () => {

    setWeekOffset(
      previous => previous + 1
    );
  };


  // ==========================================================
  // BACK TO HOME
  // ==========================================================

  const handleBack = () => {

    navigation.navigate('Home');
  };


  // ==========================================================
  // SELECTED DATE STATUS
  // ==========================================================

  const selectedStatus =
    getDateStatus(selectedDate);


  // ==========================================================
  // FOOD DATA
  // ==========================================================

  const yesterdayFood = {

    breakfast: {
      name: 'Nasi, Steik Dada Ayam',
      calories: '363 kkal',
    },

    lunch: {
      name: 'Nasi Padang',
      calories: '624 kkal',
    },

    dinner: {
      name: 'Nasi, Ikan Bakar',
      calories: '524 kkal',
    },

    snack: {
      name: 'Protein Bar',
      calories: '360 kkal',
    },
  };


  // ==========================================================
  // RECIPE DATA
  // ==========================================================

  const recipes = [

    {
      id: 1,
      title:
        'Dada Ayam Panggang Teppanyaki Tinggi Protein',
      image: require(
        '../../../assets/dadaayam.png'
      ),
    },

    {
      id: 2,
      title:
        'Omelet Sayur Keju Praktis untuk Menu Sarapan',
      image: require(
        '../../../assets/omelet.png'
      ),
    },

    {
      id: 3,
      title:
        'Tumis Sapi Brokoli Saus Tiram yang Rendah Kalori',
      image: require(
        '../../../assets/tumissapi.png'
      ),
    },

    {
      id: 4,
      title:
        'Gado-Gado Siram Spesial Pelacak Serat Harian',
      image: require(
        '../../../assets/gadogado.png'
      ),
    },

    {
      id: 5,
      title:
        'Nasi Goreng Merah Dada Ayam yang Rendah Minyak',
      image: require(
        '../../../assets/nasigoreng.png'
      ),
    },

  ];


  // ==========================================================
  // RENDER FOOD SECTION
  // ==========================================================

  const renderFoodSection = (
    title,
    food,
    disabled = false
  ) => {

    return (

      <View style={styles.foodSection}>

        <View style={styles.foodSectionHeader}>

          <Text style={styles.foodSectionTitle}>
            {title}
          </Text>


          {!disabled && food && (

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('EditMakan')}
            >

              <Text style={styles.editFoodText}>
                Edit makanan
              </Text>

            </TouchableOpacity>

          )}

        </View>


        {food ? (

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.foodFilledCard}
            onPress={() => {}}
          >

            <Text style={styles.foodName}>
              {food.name}
            </Text>

            <Text style={styles.foodCalories}>
              {food.calories}
            </Text>

          </TouchableOpacity>

        ) : (

          <TouchableOpacity
            activeOpacity={
              disabled
                ? 1
                : 0.7
            }
            disabled={disabled}
            style={[
              styles.addFoodCard,

              disabled &&
                styles.addFoodCardDisabled,
            ]}
            onPress={() => navigation.navigate('TambahMakanan')}
          >

            <Feather
              name="plus"
              size={20}
              color={
                disabled
                  ? '#9A9D9F'
                  : '#003F34'
              }
            />

            <Text
              style={[
                styles.addFoodText,

                disabled &&
                  styles.addFoodTextDisabled,
              ]}
            >
              Tambah makanan
            </Text>

          </TouchableOpacity>

        )}

      </View>
    );
  };


  // ==========================================================
  // ADDITIONAL FOOD
  // ==========================================================

  const renderAdditionalFood = (
    disabled = false
  ) => {

    if (!showAdditionalFood) {
      return null;
    }


    return (

      <View style={styles.foodSection}>

        <View style={styles.foodSectionHeader}>

          <Text style={styles.foodSectionTitle}>
            Makanan Tambahan
          </Text>

        </View>


        <TouchableOpacity
          activeOpacity={
            disabled
              ? 1
              : 0.7
          }
          disabled={disabled}
          style={[
            styles.addFoodCard,

            disabled &&
              styles.addFoodCardDisabled,
          ]}
        >

          <Feather
            name="plus"
            size={20}
            color={
              disabled
                ? '#9A9D9F'
                : '#003F34'
            }
          />

          <Text
            style={[
              styles.addFoodText,

              disabled &&
                styles.addFoodTextDisabled,
            ]}
          >
            Tambah makanan
          </Text>

        </TouchableOpacity>

      </View>

    );
  };


  // ==========================================================
  // TARGET NUTRITION
  // ==========================================================

  const renderNutritionTarget = () => {

    const isPast =
      selectedStatus === 'past';

    const isToday =
      selectedStatus === 'today';

    const isFuture =
      selectedStatus === 'future';


    return (

      <View style={styles.targetCard}>

        {/* ==================================================
            GRAPHIC IMAGE
        ================================================== */}

        <View style={styles.mainRingContainer}>

          <Image
            source={
              isPast
                ? nutritionRingFilled
                : nutritionRingEmpty
            }
            style={styles.mainNutritionRing}
            resizeMode="contain"
          />

        </View>


        {/* ==================================================
            TARGET VALUES
        ================================================== */}

        <View style={styles.targetRows}>

          {/* KALORI */}

          <View
            style={[
              styles.targetBox,
              styles.calorieBox,
            ]}
          >

            <Text style={styles.targetLabel}>
              Kalori
            </Text>

            <Text style={styles.targetValue}>
              {isPast
                ? '1.871'
                : '-'} / 2.360g
            </Text>

          </View>


          {/* PROTEIN */}

          <View
            style={[
              styles.targetBox,
              styles.proteinBox,
            ]}
          >

            <Text style={styles.targetLabel}>
              Protein
            </Text>

            <Text style={styles.targetValue}>
              {isPast
                ? '110'
                : '-'} / 105g
            </Text>

          </View>


          {/* SERAT */}

          <View
            style={[
              styles.targetBox,
              styles.fiberBox,
            ]}
          >

            <Text style={styles.targetLabel}>
              Serat
            </Text>

            <Text style={styles.targetValue}>
              {isPast
                ? '38'
                : '-'} / 52g
            </Text>

          </View>


          {/* KARBOHIDRAT */}

          <View
            style={[
              styles.targetBox,
              styles.carbBox,
            ]}
          >

            <Text style={styles.targetLabel}>
              Karbohidrat
            </Text>

            <Text style={styles.targetValue}>
              {isPast
                ? '340'
                : '-'} / 396g
            </Text>

          </View>

        </View>

      </View>

    );
  };


  // ==========================================================
  // CALENDAR HELPERS
  // ==========================================================

  const getCalendarDays = () => {

    const year =
      calendarMonth.getFullYear();

    const month =
      calendarMonth.getMonth();

    const firstDay =
      new Date(
        year,
        month,
        1
      );

    const lastDay =
      new Date(
        year,
        month + 1,
        0
      );


    // Senin = index 0
    // Minggu = index 6

    let startingDay =
      firstDay.getDay() - 1;

    if (startingDay < 0) {
      startingDay = 6;
    }


    const totalDays =
      lastDay.getDate();


    const previousMonthLastDay =
      new Date(
        year,
        month,
        0
      ).getDate();


    const days = [];


    // Hari dari bulan sebelumnya

    for (
      let i = startingDay - 1;
      i >= 0;
      i--
    ) {

      days.push({
        date:
          new Date(
            year,
            month - 1,
            previousMonthLastDay - i
          ),

        currentMonth: false,
      });

    }


    // Hari bulan sekarang

    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {

      days.push({
        date:
          new Date(
            year,
            month,
            day
          ),

        currentMonth: true,
      });

    }


    // Hari bulan berikutnya

    let nextDay = 1;

    while (
      days.length < 42
    ) {

      days.push({
        date:
          new Date(
            year,
            month + 1,
            nextDay
          ),

        currentMonth: false,
      });

      nextDay++;
    }


    return days;
  };


  const calendarDays =
    getCalendarDays();


  // ==========================================================
  // CALENDAR MONTH NAVIGATION
  // ==========================================================

  const handlePreviousMonth = () => {

    setCalendarMonth(
      previous =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() - 1,
          1
        )
    );
  };


  const handleNextMonth = () => {

    setCalendarMonth(
      previous =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() + 1,
          1
        )
    );
  };


  // ==========================================================
  // CALENDAR STATUS
  // ==========================================================

  const getCalendarStatus = (date) => {

    return getDateStatus(date);
  };


  // ==========================================================
  // OPEN CALENDAR
  // ==========================================================

  const openCalendar = () => {

    setCalendarMonth(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      )
    );

    setShowDateModal(true);
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


      {/* ======================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >

          <Feather
            name="chevron-left"
            size={30}
            color="#003F34"
          />

        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Nutrisi
        </Text>


        <TouchableOpacity
          style={styles.historyButton}
          activeOpacity={0.7}
          onPress={() => {

            navigation.navigate(
              'RiwayatNutrisi'
            );

          }}
        >

          <Text style={styles.historyText}>
            Riwayat Nutrisi
          </Text>

        </TouchableOpacity>

      </View>


      {/* ======================================================
          SCROLL
      ====================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >


        {/* ====================================================
            MONTH HEADER
        ==================================================== */}

        <View style={styles.monthHeader}>

          <TouchableOpacity
            style={styles.monthSelector}
            activeOpacity={0.7}
            onPress={openCalendar}
          >

            <Text style={styles.monthText}>
              {monthNames[currentMonth]}, {currentYear}
            </Text>


            <Feather
              name="chevron-down"
              size={24}
              color="#003F34"
            />

          </TouchableOpacity>


          <View style={styles.weekArrowContainer}>

            <TouchableOpacity
              style={styles.weekArrowButton}
              onPress={
                handlePreviousWeek
              }
              activeOpacity={0.7}
            >

              <Feather
                name="chevron-left"
                size={29}
                color="#003F34"
              />

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.weekArrowButton}
              onPress={
                handleNextWeek
              }
              activeOpacity={0.7}
            >

              <Feather
                name="chevron-right"
                size={29}
                color="#003F34"
              />

            </TouchableOpacity>

          </View>

        </View>


        {/* ====================================================
            WEEK DATES
        ==================================================== */}

        <View style={styles.weekContainer}>

          {weekDates.map(
            (date, index) => {

              const status =
                getDateStatus(date);

              const selected =
                isSameDate(
                  date,
                  selectedDate
                );


              return (

                <TouchableOpacity
                  key={date.toISOString()}
                  activeOpacity={0.8}
                  onPress={() =>
                    handleSelectDate(date)
                  }
                  style={[
                    styles.dayItem,

                    // Background berdasarkan
                    // status + selected.
                    getDayBackgroundStyle(
                      status,
                      selected
                    ),
                  ]}
                >

                  {/* HARI */}

                  <Text
                    style={[
                      styles.dayLetter,

                      status === 'future' &&
                        styles.dayLetterFuture,

                      // Jika selected,
                      // hari juga tetap putih.
                      selected &&
                        styles.dayLetterSelected,
                    ]}
                  >
                    {dayNames[index]}
                  </Text>


                  {/* GRAFIK LINGKARAN */}

                  <Image
                    source={
                      status === 'past'
                        ? nutritionRingFilled
                        : nutritionRingEmpty
                    }
                    style={styles.dayRing}
                    resizeMode="contain"
                  />


                  {/* TANGGAL */}

                  <Text
                    style={[
                      getDayNumberStyle(
                        status,
                        selected
                      ),
                    ]}
                  >
                    {date.getDate()}
                  </Text>

                </TouchableOpacity>

              );

            }
          )}

        </View>


        {/* ====================================================
            TARGET NUTRITION TITLE
        ==================================================== */}

        <Text style={styles.sectionTitle}>
          Target Nutrisi
        </Text>


        {renderNutritionTarget()}


        {/* ====================================================
            PAST
        ==================================================== */}

        {selectedStatus === 'past' && (

          <>

            {renderFoodSection(
              'Makan Pagi',
              yesterdayFood.breakfast
            )}

            {renderFoodSection(
              'Makan Siang',
              yesterdayFood.lunch
            )}

            {renderFoodSection(
              'Makan Malam',
              yesterdayFood.dinner
            )}


            {/* MAKANAN TAMBAHAN */}

            {renderAdditionalFood(false)}


            {/* CAMILAN */}

            <View style={styles.foodSection}>

              <View
                style={
                  styles.foodSectionHeader
                }
              >

                <Text
                  style={
                    styles.foodSectionTitle
                  }
                >
                  Camilan
                </Text>


                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('EditMakan')}
                >

                  <Text
                    style={
                      styles.editFoodText
                    }
                  >
                    Edit makanan
                  </Text>

                </TouchableOpacity>

              </View>


              <TouchableOpacity
                activeOpacity={0.8}
                style={
                  styles.foodFilledCard
                }
              >

                <Text
                  style={styles.foodName}
                >
                  {yesterdayFood.snack.name}
                </Text>


                <Text
                  style={styles.foodCalories}
                >
                  {yesterdayFood.snack.calories}
                </Text>

              </TouchableOpacity>

            </View>

          </>

        )}


        {/* ====================================================
            TODAY
        ==================================================== */}

        {selectedStatus === 'today' && (

          <>

            {renderFoodSection(
              'Makan Pagi',
              null,
              false
            )}

            {renderFoodSection(
              'Makan Siang',
              null,
              false
            )}

            {renderFoodSection(
              'Makan Malam',
              null,
              false
            )}


            {/* MAKANAN TAMBAHAN */}

            {renderAdditionalFood(false)}


            {/* TAMBAH JENDELA MAKAN */}

            <TouchableOpacity
              style={
                styles.addWindowButton
              }
              activeOpacity={0.8}
              onPress={() =>
                setShowAdditionalFood(true)
              }
            >

              <Feather
                name="plus"
                size={20}
                color="#003F34"
              />

              <Text
                style={
                  styles.addWindowText
                }
              >
                Tambah jendela makan
              </Text>

            </TouchableOpacity>


            {/* CAMILAN */}

            {renderFoodSection(
              'Camilan',
              null,
              false
            )}


            {/* TAMBAH JENDELA CAMILAN */}

            <TouchableOpacity
              style={
                styles.addSnackButton
              }
              activeOpacity={0.8}
              onPress={() =>
                setShowAdditionalFood(true)
              }
            >

              <Feather
                name="plus"
                size={20}
                color="#003F34"
              />

              <Text
                style={
                  styles.addSnackText
                }
              >
                Tambah jendela camilan
              </Text>

            </TouchableOpacity>

          </>

        )}


        {/* ====================================================
            FUTURE
        ==================================================== */}

        {selectedStatus === 'future' && (

          <>

            {renderFoodSection(
              'Makan Pagi',
              null,
              true
            )}

            {renderFoodSection(
              'Makan Siang',
              null,
              true
            )}

            {renderFoodSection(
              'Makan Malam',
              null,
              true
            )}


            {/* MAKANAN TAMBAHAN */}

            {renderAdditionalFood(true)}


            {/* TAMBAH JENDELA MAKAN */}

            <TouchableOpacity
              disabled
              style={[
                styles.addWindowButton,
                styles.disabledOutlineButton,
              ]}
            >

              <Feather
                name="plus"
                size={20}
                color="#9A9D9F"
              />

              <Text
                style={[
                  styles.addWindowText,
                  styles.disabledButtonText,
                ]}
              >
                Tambah jendela makan
              </Text>

            </TouchableOpacity>


            {/* CAMILAN */}

            {renderFoodSection(
              'Camilan',
              null,
              true
            )}


            {/* TAMBAH JENDELA CAMILAN */}

            <TouchableOpacity
              disabled
              style={[
                styles.addSnackButton,
                styles.disabledOutlineButton,
              ]}
            >

              <Feather
                name="plus"
                size={20}
                color="#9A9D9F"
              />

              <Text
                style={[
                  styles.addSnackText,
                  styles.disabledButtonText,
                ]}
              >
                Tambah jendela camilan
              </Text>

            </TouchableOpacity>

          </>

        )}


        {/* ====================================================
            RECIPE
        ==================================================== */}

        <View style={styles.recipeCard}>

          <View style={styles.recipeHeader}>

            <Text style={styles.recipeTitle}>
              Resep Makanan
            </Text>


            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ResepMakanan')}
            >

              <Text
                style={
                  styles.recipeSeeAll
                }
              >
                Lihat semua
              </Text>

            </TouchableOpacity>

          </View>


          {recipes.map(recipe => (

            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeItem}
              activeOpacity={0.8}
              onPress={() => {}}
            >

              <Image
                source={recipe.image}
                style={
                  styles.recipeImage
                }
              />

              <Text
                style={
                  styles.recipeItemTitle
                }
              >
                {recipe.title}
              </Text>

            </TouchableOpacity>

          ))}

        </View>


        <View
          style={styles.bottomSpace}
        />

      </ScrollView>


      {/* ======================================================
          CALENDAR POPUP
      ====================================================== */}

      <Modal
        visible={showDateModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
            setShowDateModal(false)
        }
        >

        <View style={styles.calendarOverlay}>

            {/* AREA DI LUAR KALENDER */}
            <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() =>
                setShowDateModal(false)
            }
            />

            {/* KALENDER */}
            <View style={styles.calendarModal}>


            {/* =================================================
                CALENDAR HEADER
            ================================================= */}

            <View
              style={
                styles.calendarHeader
              }
            >

              <TouchableOpacity
                style={
                  styles.calendarArrow
                }
                onPress={
                  handlePreviousMonth
                }
                activeOpacity={0.7}
              >

                <Feather
                  name="chevron-left"
                  size={30}
                  color="#003F34"
                />

              </TouchableOpacity>


              <View
                style={
                  styles.calendarMonthTitle
                }
              >

                <Text
                  style={
                    styles.calendarMonth
                  }
                >
                  {
                    monthNames[
                      calendarMonth.getMonth()
                    ]
                  }
                </Text>


                <Text
                  style={
                    styles.calendarYear
                  }
                >
                  {
                    calendarMonth.getFullYear()
                  }
                </Text>

              </View>


              <TouchableOpacity
                style={
                  styles.calendarArrow
                }
                onPress={
                  handleNextMonth
                }
                activeOpacity={0.7}
              >

                <Feather
                  name="chevron-right"
                  size={30}
                  color="#003F34"
                />

              </TouchableOpacity>

            </View>


            {/* =================================================
                DAY HEADER
            ================================================= */}

            <View
              style={
                styles.calendarWeekHeader
              }
            >

              {fullDayNames.map(
                day => (

                  <View
                    key={day}
                    style={
                      styles.calendarWeekDay
                    }
                  >

                    <Text
                      style={
                        styles.calendarWeekText
                      }
                    >
                      {day}
                    </Text>

                  </View>

                )
              )}

            </View>


            {/* =================================================
                CALENDAR GRID
            ================================================= */}

            <View
              style={
                styles.calendarGrid
              }
            >

              {calendarDays.map(
                (item, index) => {

                  const date =
                    item.date;

                  const status =
                    getCalendarStatus(
                      date
                    );

                  const selected =
                    isSameDate(
                      date,
                      selectedDate
                    );


                  return (

                    <TouchableOpacity
                      key={`${date.toISOString()}-${index}`}
                      activeOpacity={
                        item.currentMonth
                          ? 0.7
                          : 1
                      }
                      disabled={
                        !item.currentMonth
                      }
                      onPress={() =>
                        handleSelectDate(
                          date
                        )
                      }
                      style={
                        styles.calendarDayCell
                      }
                    >

                      <View
                        style={[
                          styles.calendarDayCircle,

                          // --------------------------------
                          // STATUS + SELECTED
                          // --------------------------------

                          !selected &&
                            status === 'past' &&
                            item.currentMonth &&
                            styles.calendarPast,

                          !selected &&
                            status === 'today' &&
                            styles.calendarToday,

                          !selected &&
                            status === 'future' &&
                            item.currentMonth &&
                            styles.calendarFuture,

                          // Selected past / today
                          selected &&
                            status !== 'future' &&
                            styles.calendarSelectedDark,

                          // Selected future
                          selected &&
                            status === 'future' &&
                            styles.calendarSelectedFuture,

                          // Outside month
                          !item.currentMonth &&
                            styles.calendarOutside,
                        ]}
                      >

                        <Text
                          style={[
                            styles.calendarDayText,

                            // ------------------------------
                            // Past
                            // ------------------------------

                            !selected &&
                              status === 'past' &&
                              item.currentMonth &&
                              styles.calendarPastText,

                            // ------------------------------
                            // Today
                            // ------------------------------

                            !selected &&
                              status === 'today' &&
                              styles.calendarTodayText,

                            // ------------------------------
                            // Future
                            // ------------------------------

                            !selected &&
                              status === 'future' &&
                              item.currentMonth &&
                              styles.calendarFutureText,

                            // ------------------------------
                            // Selected
                            // ------------------------------

                            selected &&
                              styles.calendarSelectedText,

                            // ------------------------------
                            // Outside month
                            // ------------------------------

                            !item.currentMonth &&
                              styles.calendarOutsideText,
                          ]}
                        >
                          {date.getDate()}
                        </Text>

                      </View>

                    </TouchableOpacity>

                  );

                }
              )}

            </View>

          </View>

        </View>

      </Modal>

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
  },

  scrollContent: {
    paddingBottom: 20,
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 80,
    marginTop: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
  },

  backButton: {
    width: 40,
    height: 45,
    justifyContent: 'center',
  },

  headerTitle: {
    marginLeft: 2,
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },

  historyButton: {
    marginLeft: 'auto',
    paddingVertical: 8,
  },

  historyText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#003F34',
    textDecorationLine: 'underline',
  },


  // ==========================================================
  // MONTH HEADER
  // ==========================================================

  monthHeader: {
    marginTop: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  monthText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
    marginRight: 7,
  },

  weekArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  weekArrowButton: {
    width: 30,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },


  // ==========================================================
  // WEEK DATES
  // ==========================================================

  weekContainer: {
    marginTop: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dayItem: {
    width: 44,
    height: 88,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 9,
    paddingBottom: 7,
  },


  // ----------------------------------------------------------
  // PAST
  // ----------------------------------------------------------

  dayItemPast: {
    backgroundColor: '#67A79B',
  },


  // ----------------------------------------------------------
  // TODAY
  // ----------------------------------------------------------

  dayItemToday: {
    backgroundColor: '#003F34',
  },


  // ----------------------------------------------------------
  // FUTURE
  // ----------------------------------------------------------

  dayItemFuture: {
    backgroundColor: '#E7EAEA',
  },


  // ----------------------------------------------------------
  // SELECTED PAST / TODAY
  // ----------------------------------------------------------
  //
  // Tanggal yang dipilih pada masa lalu atau hari ini
  // menjadi hijau tua.
  //

  dayItemSelectedDark: {
    backgroundColor: '#003F34',
  },


  // ----------------------------------------------------------
  // SELECTED FUTURE
  // ----------------------------------------------------------
  //
  // Tanggal masa depan yang dipilih menjadi abu-abu gelap.
  // Ini yang membuat tanggal 26 pada gambar contoh
  // terlihat berbeda.
  //

  dayItemFutureSelected: {
    backgroundColor: '#696A72',
  },


  // ----------------------------------------------------------
  // SELECTED
  // ----------------------------------------------------------

  dayItemSelected: {
    // Tidak digunakan untuk background.
    // Background selected sekarang ditentukan oleh
    // getDayBackgroundStyle().
  },


  // ==========================================================
  // DAY TEXT
  // ==========================================================

  dayLetter: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  dayLetterFuture: {
    color: '#707577',
  },

  dayLetterSelected: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // DAY RING
  // ==========================================================

  dayRing: {
    width: 31,
    height: 31,
  },


  // ==========================================================
  // DAY NUMBER
  // ==========================================================

  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  dayNumberFuture: {
    color: '#626669',
  },

  dayNumberSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    marginTop: 25,
    marginHorizontal: 20,
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // TARGET NUTRITION
  // ==========================================================

  targetCard: {
    marginTop: 16,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingHorizontal: 19,
    paddingBottom: 22,
    borderRadius: 18,
    backgroundColor: '#F7F8F7',
    overflow: 'hidden',
  },

  mainRingContainer: {
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainNutritionRing: {
    width: 175,
    height: 175,
  },

  targetRows: {
    marginTop: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  targetBox: {
    height: 72,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calorieBox: {
    width: '54%',
    backgroundColor: '#234F45',
  },

  proteinBox: {
    flex: 1,
    backgroundColor: '#A5CDAA',
    borderWidth: 1,
    borderColor: '#6F9D76',
  },

  fiberBox: {
    width: '42%',
    backgroundColor: '#99C0BE',
    borderWidth: 1,
    borderColor: '#237D78',
  },

  carbBox: {
    flex: 1,
    backgroundColor: '#E4D39A',
    borderWidth: 1,
    borderColor: '#A88B2B',
  },

  targetLabel: {
    fontSize: 17,
    color: '#FFFFFF',
  },

  targetValue: {
    marginTop: 3,
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // FOOD SECTION
  // ==========================================================

  foodSection: {
    marginTop: 18,
    paddingHorizontal: 20,
  },

  foodSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  foodSectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },

  editFoodText: {
    fontSize: 17,
    color: '#003F34',
    textDecorationLine: 'underline',
  },

  foodFilledCard: {
    minHeight: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#69A99A',
    backgroundColor: '#EAF3F0',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  foodName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
  },

  foodCalories: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // ADD FOOD
  // ==========================================================

  addFoodCard: {
    minHeight: 64,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9EA3A5',
    backgroundColor: '#EAF3F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  addFoodCardDisabled: {
    backgroundColor: '#EEF0F0',
    borderColor: '#A9ADAF',
  },

  addFoodText: {
    fontSize: 17,
    color: '#496E67',
  },

  addFoodTextDisabled: {
    color: '#9A9D9F',
  },

  addWindowButton: {
    marginTop: 18,
    marginHorizontal: 20,
    height: 64,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A2A5A7',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  addWindowText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
  },

  addSnackButton: {
    marginTop: 18,
    marginHorizontal: 20,
    height: 62,
    borderRadius: 10,
    borderColor: '#A2A5A7',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  addSnackText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#003F34',
  },

  disabledOutlineButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#AEB2B4',
  },

  disabledButtonText: {
    color: '#9A9D9F',
  },


  // ==========================================================
  // RECIPE CARD
  // ==========================================================

  recipeCard: {
    marginTop: 24,
    marginHorizontal: 20,
    paddingHorizontal: 19,
    paddingTop: 23,
    paddingBottom: 18,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#B4B8B8',
    backgroundColor: '#FAFBFA',
  },

  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  recipeTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },

  recipeSeeAll: {
    fontSize: 16,
    color: '#003F34',
    textDecorationLine: 'underline',
  },

  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  recipeImage: {
    width: 138,
    height: 102,
    borderRadius: 11,
  },

  recipeItemTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // CALENDAR MODAL
  // ==========================================================

  calendarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  calendarModal: {
    width: '100%',
    borderRadius: 25,
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    elevation: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  },

  calendarArrow: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarMonthTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarMonth: {
    fontSize: 23,
    fontWeight: '700',
    color: '#003F34',
  },

  calendarYear: {
    marginTop: 1,
    fontSize: 19,
    color: '#003F34',
  },


  // ==========================================================
  // CALENDAR WEEK HEADER
  // ==========================================================

  calendarWeekHeader: {
    marginTop: 24,
    flexDirection: 'row',
  },

  calendarWeekDay: {
    width: '14.2857%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarWeekText: {
    fontSize: 14,
    color: '#53595B',
  },


  // ==========================================================
  // CALENDAR GRID
  // ==========================================================

  calendarGrid: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calendarDayCell: {
    width: '14.2857%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarDayCircle: {
    width: 40,
    height: 40,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ----------------------------------------------------------
  // CALENDAR PAST
  // ----------------------------------------------------------

  calendarPast: {
    backgroundColor: '#6AA99D',
  },


  // ----------------------------------------------------------
  // CALENDAR TODAY
  // ----------------------------------------------------------

  calendarToday: {
    backgroundColor: '#003F34',
  },


  // ----------------------------------------------------------
  // CALENDAR FUTURE
  // ----------------------------------------------------------

  calendarFuture: {
    backgroundColor: '#E7E9E9',
  },


  // ----------------------------------------------------------
  // CALENDAR SELECTED PAST / TODAY
  // ----------------------------------------------------------

  calendarSelectedDark: {
    backgroundColor: '#003F34',
  },


  // ----------------------------------------------------------
  // CALENDAR SELECTED FUTURE
  // ----------------------------------------------------------

  calendarSelectedFuture: {
    backgroundColor: '#696A72',
  },


  // ----------------------------------------------------------
  // OUTSIDE MONTH
  // ----------------------------------------------------------

  calendarOutside: {
    backgroundColor: 'transparent',
  },


  // ==========================================================
  // CALENDAR TEXT
  // ==========================================================

  calendarDayText: {
    fontSize: 16,
    color: '#222628',
  },

  calendarPastText: {
    color: '#FFFFFF',
  },

  calendarTodayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  calendarFutureText: {
    color: '#53595B',
  },

  calendarSelectedText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  calendarOutsideText: {
    color: '#777C7E',
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomSpace: {
    height: 30,
  },

});
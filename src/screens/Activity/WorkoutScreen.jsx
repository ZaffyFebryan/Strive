import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
  Image,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// WORKOUT SCREEN
// ============================================================

export default function WorkoutScreen({
  navigation,
  route,
}) {

  // ==========================================================
  // MONTH DATA
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


  const dayNames = [
    'Sen',
    'Sel',
    'Rab',
    'Kam',
    'Jum',
    'Sab',
    'Min',
  ];


  // ==========================================================
  // DEMO DATE
  // ==========================================================
  //
  // Untuk sementara:
  // Hari ini       = 23 Juli 2026
  // Hari latihan   = 23 Juli 2026
  //
  // Nanti bisa diganti dengan data backend.
  // ==========================================================

  const todayDate = new Date(2026, 6, 23);

  const workoutDate = new Date(2026, 6, 23);


  // ==========================================================
  // INITIAL SELECTED DATE
  // ==========================================================

  const initialDate = new Date(2026, 6, 23);

  const [selectedDate, setSelectedDate] =
    useState(initialDate);


  // ==========================================================
  // WORKOUT STATUS
  // ==========================================================
  //
  // Status:
  //
  // before
  // → Belum waktunya latihan
  //
  // active
  // → Latihan sekarang
  //
  // ongoing
  // → Sedang berlangsung
  // → Lanjutkan Latihan
  //
  // completed
  // → Selesai
  //
  // Status ongoing/completed dikirim melalui route params.
  // ==========================================================

  const [workoutStatus, setWorkoutStatus] =
    useState(
      route?.params?.workoutStatus || null
    );


  // ==========================================================
  // UPDATE STATUS DARI ROUTE PARAMS
  // ==========================================================

  useEffect(() => {

    if (route?.params?.workoutStatus) {

      setWorkoutStatus(
        route.params.workoutStatus
      );

    }

  }, [
    route?.params?.workoutStatus,
  ]);


  // ==========================================================
  // CLEAR ROUTE PARAM
  // ==========================================================
  //
  // Setelah status diterima, parameter route dibersihkan
  // supaya tidak mengganggu navigasi berikutnya.
  // ==========================================================

  useEffect(() => {

    if (route?.params?.workoutStatus) {

      navigation.setParams({
        workoutStatus: undefined,
      });

    }

  }, [
    route?.params?.workoutStatus,
    navigation,
  ]);


  // ==========================================================
  // CALENDAR MODAL
  // ==========================================================

  const [calendarVisible, setCalendarVisible] =
    useState(false);


  // ==========================================================
  // CALENDAR MONTH
  // ==========================================================

  const [calendarMonth, setCalendarMonth] =
    useState(
      new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        1
      )
    );


  // ==========================================================
  // DATE KEY
  // ==========================================================

  const getDateKey = (date) => {

    const year =
      date.getFullYear();

    const month =
      String(date.getMonth() + 1)
        .padStart(2, '0');

    const day =
      String(date.getDate())
        .padStart(2, '0');

    return `${year}-${month}-${day}`;

  };


  // ==========================================================
  // COMPARE DATE
  // ==========================================================

  const compareDate = (
    dateA,
    dateB
  ) => {

    const a =
      new Date(
        dateA.getFullYear(),
        dateA.getMonth(),
        dateA.getDate()
      ).getTime();

    const b =
      new Date(
        dateB.getFullYear(),
        dateB.getMonth(),
        dateB.getDate()
      ).getTime();


    if (a < b) {
      return -1;
    }


    if (a > b) {
      return 1;
    }


    return 0;

  };


  // ==========================================================
  // GET DEFAULT WORKOUT STATUS
  // ==========================================================

  const getWorkoutStatus = (date) => {

    const comparison =
      compareDate(
        date,
        todayDate
      );


    // Sebelum hari ini
    if (comparison < 0) {

      return 'completed';

    }


    // Hari ini
    if (comparison === 0) {

      return 'active';

    }


    // Setelah hari ini
    return 'before';

  };


  // ==========================================================
  // CURRENT WORKOUT STATUS
  // ==========================================================
  //
  // Jika status ongoing dikirim dari halaman pengisian data,
  // card hari latihan akan berubah menjadi ongoing.
  //
  // Kalau tidak ada status khusus, gunakan status berdasarkan
  // tanggal seperti sebelumnya.
  // ==========================================================

  const isWorkoutDate =
    getDateKey(selectedDate) ===
    getDateKey(workoutDate);


  const currentWorkoutStatus =
    isWorkoutDate &&
    (
      workoutStatus === 'ongoing' ||
      workoutStatus === 'completed'
    )
      ? workoutStatus
      : getWorkoutStatus(
          selectedDate
        );


  // ==========================================================
  // GET DATE COLOR STATUS
  // ==========================================================

  const getDateColorStatus = (date) => {

    const comparison =
      compareDate(
        date,
        workoutDate
      );


    if (comparison < 0) {

      return 'beforeWorkout';

    }


    if (comparison === 0) {

      return 'workoutDay';

    }


    return 'afterWorkout';

  };


  // ==========================================================
  // WEEK START
  // ==========================================================

  const getMonday = (date) => {

    const result =
      new Date(date);

    const day =
      result.getDay();

    const difference =
      day === 0
        ? -6
        : 1 - day;


    result.setDate(
      result.getDate() + difference
    );


    result.setHours(
      0,
      0,
      0,
      0
    );


    return result;

  };


  // ==========================================================
  // CURRENT WEEK
  // ==========================================================

  const weekStart =
    useMemo(() => {

      return getMonday(
        selectedDate
      );

    }, [
      selectedDate,
    ]);


  // ==========================================================
  // WEEK DATES
  // ==========================================================

  const weekDates =
    useMemo(() => {

      return Array.from(
        { length: 7 },
        (_, index) => {

          const date =
            new Date(
              weekStart
            );

          date.setDate(
            weekStart.getDate() +
            index
          );

          return date;

        }
      );

    }, [
      weekStart,
    ]);


  // ==========================================================
  // SELECT DATE
  // ==========================================================

  const handleSelectDate = (date) => {

    setSelectedDate(
      new Date(date)
    );

  };


  // ==========================================================
  // PREVIOUS WEEK
  // ==========================================================

  const handlePreviousWeek = () => {

    const previousWeek =
      new Date(
        selectedDate
      );

    previousWeek.setDate(
      previousWeek.getDate() - 7
    );


    setSelectedDate(
      previousWeek
    );

  };


  // ==========================================================
  // NEXT WEEK
  // ==========================================================

  const handleNextWeek = () => {

    const nextWeek =
      new Date(
        selectedDate
      );

    nextWeek.setDate(
      nextWeek.getDate() + 7
    );


    setSelectedDate(
      nextWeek
    );

  };


  // ==========================================================
  // OPEN CALENDAR
  // ==========================================================

  const handleOpenCalendar = () => {

    setCalendarMonth(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      )
    );


    setCalendarVisible(
      true
    );

  };


  // ==========================================================
  // CLOSE CALENDAR
  // ==========================================================

  const handleCloseCalendar = () => {

    setCalendarVisible(
      false
    );

  };


  // ==========================================================
  // PREVIOUS MONTH
  // ==========================================================

  const handlePreviousMonth = () => {

    setCalendarMonth(
      previousMonth(
        calendarMonth
      )
    );

  };


  // ==========================================================
  // NEXT MONTH
  // ==========================================================

  const handleNextMonth = () => {

    setCalendarMonth(
      nextMonth(
        calendarMonth
      )
    );

  };


  // ==========================================================
  // CALENDAR DATE PRESS
  // ==========================================================

  const handleCalendarDatePress = (
    date
  ) => {

    setSelectedDate(
      new Date(date)
    );

    setCalendarVisible(
      false
    );

  };


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.navigate(
      'Home'
    );

  };


  // ==========================================================
  // START / CONTINUE WORKOUT
  // ==========================================================

  const handleStartWorkout = () => {

    navigation.navigate(
      'LatihanSekarang'
    );

  };


  // ==========================================================
  // OPEN HISTORY
  // ==========================================================

  const handleOpenHistory = () => {

    navigation.navigate(
      'WorkoutHistory'
    );

  };


  // ==========================================================
  // DISPLAY MONTH
  // ==========================================================

  const displayMonth =
    `${monthNames[selectedDate.getMonth()]}, ${selectedDate.getFullYear()}`;


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


      {/* ====================================================
          HEADER
      ==================================================== */}

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
          Latihan Beban
        </Text>


        <TouchableOpacity
          style={styles.historyButton}
          onPress={() =>
            navigation.navigate(
              'WorkoutHistory'
            )
          }
          activeOpacity={0.7}
        >

          <Text style={styles.historyText}>
            Riwayat Latihan
          </Text>

        </TouchableOpacity>

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={
          false
        }
      >


        {/* ==================================================
            MONTH NAVIGATION
        ================================================== */}

        <View
          style={
            styles.monthNavigation
          }
        >

          <TouchableOpacity
            style={
              styles.monthSelector
            }
            onPress={
              handleOpenCalendar
            }
            activeOpacity={0.7}
          >

            <Text
              style={
                styles.monthText
              }
            >
              {displayMonth}
            </Text>


            <Feather
              name="chevron-down"
              size={23}
              color="#003F34"
            />

          </TouchableOpacity>


          <View
            style={
              styles.weekNavigation
            }
          >

            <TouchableOpacity
              style={
                styles.weekArrow
              }
              onPress={
                handlePreviousWeek
              }
              activeOpacity={0.7}
            >

              <Feather
                name="chevron-left"
                size={27}
                color="#003F34"
              />

            </TouchableOpacity>


            <TouchableOpacity
              style={
                styles.weekArrow
              }
              onPress={
                handleNextWeek
              }
              activeOpacity={0.7}
            >

              <Feather
                name="chevron-right"
                size={27}
                color="#003F34"
              />

            </TouchableOpacity>

          </View>

        </View>


        {/* ==================================================
            WEEKLY DATE
        ================================================== */}

        <View style={styles.weekRow}>

          {weekDates.map((date) => {

            const colorStatus =
              getDateColorStatus(
                date
              );

            const isSelected =
              getDateKey(date) ===
              getDateKey(
                selectedDate
              );


            return (

              <TouchableOpacity
                key={
                  getDateKey(date)
                }
                style={[
                  styles.dateItem,


                  colorStatus ===
                    'beforeWorkout' &&
                    styles.dateItemBeforeWorkout,


                  colorStatus ===
                    'workoutDay' &&
                    styles.dateItemWorkoutDay,


                  colorStatus ===
                    'afterWorkout' &&
                    styles.dateItemAfterWorkout,


                  isSelected &&
                    (
                      colorStatus ===
                        'beforeWorkout' ||
                      colorStatus ===
                        'workoutDay'
                    ) &&
                    styles.dateItemSelectedGreen,


                  isSelected &&
                    colorStatus ===
                      'afterWorkout' &&
                    styles.dateItemSelectedGray,

                ]}
                onPress={() =>
                  handleSelectDate(
                    date
                  )
                }
                activeOpacity={0.8}
              >

                <Text
                  style={[
                    styles.dateDay,


                    (
                      colorStatus ===
                        'beforeWorkout' ||
                      colorStatus ===
                        'workoutDay'
                    ) &&
                      styles.dateDayGreen,


                    colorStatus ===
                      'afterWorkout' &&
                      styles.dateDayGray,


                    isSelected &&
                      styles.dateDaySelected,

                  ]}
                >
                  {
                    dayNames[
                      date.getDay() === 0
                        ? 6
                        : date.getDay() - 1
                    ]
                  }
                </Text>


                <Text
                  style={[
                    styles.dateNumber,


                    (
                      colorStatus ===
                        'beforeWorkout' ||
                      colorStatus ===
                        'workoutDay'
                    ) &&
                      styles.dateNumberGreen,


                    colorStatus ===
                      'afterWorkout' &&
                      styles.dateNumberGray,


                    isSelected &&
                      styles.dateNumberSelected,

                  ]}
                >
                  {date.getDate()}
                </Text>

              </TouchableOpacity>

            );

          })}

        </View>


        {/* ==================================================
            LATIHAN HARI INI
        ================================================== */}

        <Text
          style={
            styles.sectionTitle
          }
        >
          Latihan Hari Ini
        </Text>


        {/* ==================================================
            WORKOUT CARD
        ================================================== */}

        <View
          style={
            styles.workoutCard
          }
        >


          {/* =================================================
              RECOMMENDATION BADGE
          ================================================= */}

          {currentWorkoutStatus ===
            'active' && (

            <View
              style={
                styles.recommendationBadge
              }
            >

              <Feather
                name="zap"
                size={14}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.recommendationText
                }
              >
                Rekomendasi Latihan
              </Text>

            </View>

          )}


          {/* =================================================
              ONGOING BADGE
          ================================================= */}

          {currentWorkoutStatus ===
            'ongoing' && (

            <View
              style={
                styles.ongoingBadge
              }
            >

              <Text
                style={
                  styles.ongoingBadgeText
                }
              >
                Sedang berlangsung
              </Text>

            </View>

          )}


          {/* =================================================
              COMPLETED BADGE
          ================================================= */}

          {currentWorkoutStatus ===
            'completed' && (

            <View
              style={
                styles.completedBadge
              }
            >

              <Text
                style={
                  styles.completedText
                }
              >
                Selesai
              </Text>

            </View>

          )}


          {/* =================================================
              WORKOUT INFO
          ================================================= */}

          <View
            style={[
              styles.workoutInfo,


              (
                currentWorkoutStatus ===
                  'active' ||
                currentWorkoutStatus ===
                  'ongoing' ||
                currentWorkoutStatus ===
                  'completed'
              ) &&
                styles.workoutInfoWithBadge,

            ]}
          >

            <Text
              style={
                styles.workoutTitle
              }
            >
              Latihan beban
            </Text>


            <Text
              style={
                styles.workoutDescription
              }
            >
              Punggung, Bisep

              <Text
                style={
                  styles.dot
                }
              >
                {' • '}
              </Text>

              Estimasi 320 kkal
            </Text>


            {/* =================================================
                STATUS
            ================================================= */}

            <View
              style={
                styles.statusRow
              }
            >

              <View
                style={[
                  styles.statusDot,


                  currentWorkoutStatus ===
                    'completed' &&
                    styles.statusDotCompleted,


                  currentWorkoutStatus ===
                    'ongoing' &&
                    styles.statusDotOngoing,

                ]}
              />


              <Text
                style={
                  styles.statusText
                }
              >

                {currentWorkoutStatus ===
                'completed'

                  ? 'Latihan telah selesai'

                  : currentWorkoutStatus ===
                    'ongoing'

                    ? 'Sedang berlangsung'

                    : 'Belum dimulai'

                }

              </Text>

            </View>

          </View>


          {/* =================================================
              BEFORE
          ================================================= */}

          {currentWorkoutStatus ===
            'before' && (

            <TouchableOpacity
              style={
                styles.actionButtonDisabled
              }
              activeOpacity={1}
              disabled={true}
            >

              <Text
                style={
                  styles.actionButtonDisabledText
                }
              >
                Belum waktunya latihan
              </Text>


              <View
                style={
                  styles.arrowCircleDisabled
                }
              >

                <Feather
                  name="arrow-right"
                  size={19}
                  color="#FFFFFF"
                />

              </View>

            </TouchableOpacity>

          )}


          {/* =================================================
              ACTIVE
          ================================================= */}

          {currentWorkoutStatus ===
            'active' && (

            <TouchableOpacity
              style={
                styles.actionButton
              }
              onPress={
                handleStartWorkout
              }
              activeOpacity={0.85}
            >

              <Text
                style={
                  styles.actionButtonText
                }
              >
                Latihan sekarang
              </Text>


              <View
                style={
                  styles.arrowCircle
                }
              >

                <Feather
                  name="arrow-right"
                  size={19}
                  color="#FFFFFF"
                />

              </View>

            </TouchableOpacity>

          )}


          {/* =================================================
              ONGOING
          ================================================= */}

          {currentWorkoutStatus ===
            'ongoing' && (

            <TouchableOpacity
              style={
                styles.actionButton
              }
              onPress={() => navigation.navigate('DataWorkout')}
              activeOpacity={0.85}
            >

              <Text
                style={
                  styles.actionButtonText
                }
              >
                Lanjutkan Latihan
              </Text>


              <View
                style={
                  styles.arrowCircle
                }
              >

                <Feather
                  name="arrow-right"
                  size={19}
                  color="#FFFFFF"
                />

              </View>

            </TouchableOpacity>

          )}


          {/* =================================================
              COMPLETED
          ================================================= */}

          {currentWorkoutStatus ===
            'completed' && (

            <TouchableOpacity
              style={
                styles.actionButton
              }
              onPress={
                handleOpenHistory
              }
              activeOpacity={0.85}
            >

              <Text
                style={
                  styles.actionButtonText
                }
              >
                Lihat riwayat latihan
              </Text>


              <View
                style={
                  styles.arrowCircle
                }
              >

                <Feather
                  name="arrow-right"
                  size={19}
                  color="#FFFFFF"
                />

              </View>

            </TouchableOpacity>

          )}

        </View>


        {/* ==================================================
            VARIASI LATIHAN
        ================================================== */}

        <View
          style={
            styles.variationHeader
          }
        >

          <Text
            style={
              styles.variationTitle
            }
          >
            Variasi Latihan
          </Text>

        </View>


        {/* ==================================================
            CATEGORY
        ================================================== */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.categoryScroll
          }
        >

          <CategoryButton
            title="Chest"
            active={true}
          />

          <CategoryButton
            title="Shoulder"
          />

          <CategoryButton
            title="Back"
          />

          <CategoryButton
            title="Abdomen"
          />

        </ScrollView>


        {/* ==================================================
            EXERCISE GRID
        ================================================== */}

        <View
          style={
            styles.exerciseGrid
          }
        >

          <ExerciseCard
            title="Bench Press"
            image={require('../../../assets/benchpress.png')}
            onPress={() =>
              navigation.navigate('WorkoutDetail', {
                exerciseName: 'Bench Press',
              })
            }
          />

          <ExerciseCard
            title="Dumbell Press"
            image={
              require(
                '../../../assets/dumbellpress.png'
              )
            }
          />

          <ExerciseCard
            title="Machine Fly"
            image={
              require(
                '../../../assets/machinefly.png'
              )
            }
          />

          <ExerciseCard
            title="Dips"
            image={
              require(
                '../../../assets/dips.png'
              )
            }
          />

          <ExerciseCard
            title="Incline Dumbell Press"
            image={
              require(
                '../../../assets/inclinedumbellpress.png'
              )
            }
          />

          <ExerciseCard
            title="Chest Press"
            image={
              require(
                '../../../assets/chestpress.png'
              )
            }
          />

        </View>


        <View
          style={
            styles.bottomSpace
          }
        />

      </ScrollView>


      {/* ====================================================
          CALENDAR MODAL
      ==================================================== */}

      <Modal
        visible={
          calendarVisible
        }
        transparent={true}
        animationType="fade"
        onRequestClose={
          handleCloseCalendar
        }
      >

        <View
          style={
            styles.modalOverlay
          }
        >

          <Pressable
            style={
              StyleSheet.absoluteFill
            }
            onPress={
              handleCloseCalendar
            }
          />


          <View
            style={
              styles.calendarContainer
            }
          >


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
                  size={28}
                  color="#003F34"
                />

              </TouchableOpacity>


              <View
                style={
                  styles.calendarMonthContainer
                }
              >

                <Text
                  style={
                    styles.calendarMonthText
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
                    styles.calendarYearText
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
                  size={28}
                  color="#003F34"
                />

              </TouchableOpacity>

            </View>


            {/* =================================================
                DAY LABEL
            ================================================= */}

            <View
              style={
                styles.calendarWeekRow
              }
            >

              {dayNames.map(
                (day) => (

                  <Text
                    key={day}
                    style={
                      styles.calendarWeekText
                    }
                  >
                    {day}
                  </Text>

                )
              )}

            </View>


            {/* =================================================
                CALENDAR GRID
            ================================================= */}

            <CalendarGrid
              month={
                calendarMonth
              }
              selectedDate={
                selectedDate
              }
              todayDate={
                todayDate
              }
              workoutDate={
                workoutDate
              }
              onSelectDate={
                handleCalendarDatePress
              }
            />

          </View>

        </View>

      </Modal>

    </SafeAreaView>

  );

}


// ============================================================
// CATEGORY BUTTON
// ============================================================

function CategoryButton({
  title,
  active = false,
}) {

  return (

    <TouchableOpacity
      style={[
        styles.categoryButton,

        active &&
          styles.categoryButtonActive,
      ]}
      activeOpacity={0.8}
    >

      <View
        style={[
          styles.categoryIcon,

          active &&
            styles.categoryIconActive,
        ]}
      >

        <Feather
          name="activity"
          size={14}
          color={
            active
              ? '#003F34'
              : '#74777D'
          }
        />

      </View>


      <Text
        style={[
          styles.categoryText,

          active &&
            styles.categoryTextActive,
        ]}
      >
        {title}
      </Text>

    </TouchableOpacity>

  );

}


// ============================================================
// EXERCISE CARD
// ============================================================

function ExerciseCard({
  title,
  image,
  onPress,
}) {

  return (

    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={onPress}
      activeOpacity={0.8}
    >

      <Image
        source={image}
        style={
          styles.exerciseImage
        }
        resizeMode="cover"
      />


      <View
        style={
          styles.exerciseTitleContainer
        }
      >

        <Text
          style={
            styles.exerciseTitle
          }
          numberOfLines={1}
        >
          {title}
        </Text>

      </View>

    </TouchableOpacity>

  );

}


// ============================================================
// CALENDAR GRID
// ============================================================

function CalendarGrid({
  month,
  selectedDate,
  todayDate,
  workoutDate,
  onSelectDate,
}) {

  const year =
    month.getFullYear();

  const monthIndex =
    month.getMonth();


  // ==========================================================
  // FIRST DAY
  // ==========================================================

  const firstDay =
    new Date(
      year,
      monthIndex,
      1
    );


  const firstDayIndex =
    firstDay.getDay() === 0
      ? 6
      : firstDay.getDay() - 1;


  // ==========================================================
  // DAYS IN MONTH
  // ==========================================================

  const daysInMonth =
    new Date(
      year,
      monthIndex + 1,
      0
    ).getDate();


  // ==========================================================
  // PREVIOUS MONTH DAYS
  // ==========================================================

  const previousMonthDays =
    new Date(
      year,
      monthIndex,
      0
    ).getDate();


  // ==========================================================
  // TOTAL CELLS
  // ==========================================================

  const totalCells =
    Math.ceil(
      (
        firstDayIndex +
        daysInMonth
      ) / 7
    ) * 7;


  // ==========================================================
  // CREATE CELLS
  // ==========================================================

  const cells = [];


  for (
    let index = 0;
    index < totalCells;
    index++
  ) {

    const dayNumber =
      index -
      firstDayIndex +
      1;


    // PREVIOUS MONTH

    if (
      dayNumber < 1
    ) {

      const previousDate =
        new Date(
          year,
          monthIndex - 1,
          previousMonthDays +
            dayNumber
        );


      cells.push({
        date: previousDate,
        currentMonth: false,
      });


      continue;

    }


    // NEXT MONTH

    if (
      dayNumber >
      daysInMonth
    ) {

      const nextDate =
        new Date(
          year,
          monthIndex + 1,
          dayNumber -
            daysInMonth
        );


      cells.push({
        date: nextDate,
        currentMonth: false,
      });


      continue;

    }


    // CURRENT MONTH

    cells.push({
      date:
        new Date(
          year,
          monthIndex,
          dayNumber
        ),

      currentMonth: true,
    });

  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <View
      style={
        styles.calendarGrid
      }
    >

      {cells.map(
        (item, index) => {

          const date =
            item.date;


          const dateComparison =
            compareStaticDate(
              date,
              workoutDate
            );


          const isSelected =
            getDateKeyStatic(
              date
            ) ===
            getDateKeyStatic(
              selectedDate
            );


          let dateStatus =
            'afterWorkout';


          if (
            dateComparison < 0
          ) {

            dateStatus =
              'beforeWorkout';

          }


          if (
            dateComparison === 0
          ) {

            dateStatus =
              'workoutDay';

          }


          return (

            <TouchableOpacity
              key={
                `${getDateKeyStatic(date)}-${index}`
              }
              style={
                styles.calendarDayContainer
              }
              onPress={() =>
                onSelectDate(
                  date
                )
              }
              activeOpacity={0.8}
            >

              <View
                style={[
                  styles.calendarDay,


                  dateStatus ===
                    'beforeWorkout' &&
                    styles.calendarDayBeforeWorkout,


                  dateStatus ===
                    'workoutDay' &&
                    styles.calendarDayWorkoutDay,


                  dateStatus ===
                    'afterWorkout' &&
                    styles.calendarDayAfterWorkout,


                  isSelected &&
                    (
                      dateStatus ===
                        'beforeWorkout' ||
                      dateStatus ===
                        'workoutDay'
                    ) &&
                    styles.calendarDaySelectedGreen,


                  isSelected &&
                    dateStatus ===
                      'afterWorkout' &&
                    styles.calendarDaySelectedGray,


                  !item.currentMonth &&
                    styles.calendarDayOutside,

                ]}
              >

                <Text
                  style={[
                    styles.calendarDayText,


                    (
                      dateStatus ===
                        'beforeWorkout' ||
                      dateStatus ===
                        'workoutDay'
                    ) &&
                      styles.calendarDayTextGreen,


                    dateStatus ===
                      'afterWorkout' &&
                      styles.calendarDayTextGray,


                    isSelected &&
                      styles.calendarDayTextSelected,


                    !item.currentMonth &&
                      styles.calendarDayTextOutside,

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

  );

}


// ============================================================
// STATIC DATE KEY
// ============================================================

function getDateKeyStatic(
  date
) {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, '0');

  const day =
    String(
      date.getDate()
    ).padStart(2, '0');


  return `${year}-${month}-${day}`;

}


// ============================================================
// STATIC DATE COMPARE
// ============================================================

function compareStaticDate(
  dateA,
  dateB
) {

  const a =
    new Date(
      dateA.getFullYear(),
      dateA.getMonth(),
      dateA.getDate()
    ).getTime();

  const b =
    new Date(
      dateB.getFullYear(),
      dateB.getMonth(),
      dateB.getDate()
    ).getTime();


  if (a < b) {

    return -1;

  }


  if (a > b) {

    return 1;

  }


  return 0;

}


// ============================================================
// PREVIOUS MONTH
// ============================================================

function previousMonth(
  date
) {

  return new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    1
  );

}


// ============================================================
// NEXT MONTH
// ============================================================

function nextMonth(
  date
) {

  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  );

}


// ============================================================
// STYLES
// ============================================================

const styles =
  StyleSheet.create({

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
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
    backgroundColor: '#FFFFFF',
    marginTop: 32,
  },


  backButton: {
    width: 38,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  headerTitle: {
    flex: 1,
    marginLeft: 3,
    fontSize: 22,
    fontWeight: '700',
    color: '#003F34',
  },


  historyButton: {
    paddingVertical: 8,
    paddingLeft: 8,
  },


  historyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#003F34',
    textDecorationLine: 'underline',
  },


  // ==========================================================
  // SCROLL
  // ==========================================================

  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  scrollContent: {
    paddingBottom: 40,
  },


  // ==========================================================
  // MONTH NAVIGATION
  // ==========================================================

  monthNavigation: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },


  monthText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },


  weekArrow: {
    width: 34,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // WEEK ROW
  // ==========================================================

  weekRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  // ==========================================================
  // DATE ITEM
  // ==========================================================

  dateItem: {
    width: 43,
    height: 74,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E9E9',
  },


  dateItemBeforeWorkout: {
    backgroundColor: '#6AA99D',
  },


  dateItemWorkoutDay: {
    backgroundColor: '#003F34',
  },


  dateItemAfterWorkout: {
    backgroundColor: '#E7E9E9',
  },


  dateItemSelectedGreen: {
    backgroundColor: '#003F34',
  },


  dateItemSelectedGray: {
    backgroundColor: '#686B71',
  },


  dateDay: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 7,
  },


  dateDayGreen: {
    color: '#FFFFFF',
  },


  dateDayGray: {
    color: '#55595D',
  },


  dateDaySelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },


  dateNumber: {
    fontSize: 14,
    fontWeight: '600',
  },


  dateNumberGreen: {
    color: '#FFFFFF',
  },


  dateNumberGray: {
    color: '#55595D',
  },


  dateNumberSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 24,
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // WORKOUT CARD
  // ==========================================================

  workoutCard: {
    marginHorizontal: 16,
    marginTop: 13,
    minHeight: 263,
    borderRadius: 17,
    paddingHorizontal: 23,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#F7F7F7',
    position: 'relative',
    overflow: 'hidden',
  },


  // ==========================================================
  // RECOMMENDATION BADGE
  // ==========================================================

  recommendationBadge: {
    alignSelf: 'flex-end',
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#003F34',
  },


  recommendationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  // ==========================================================
  // ONGOING BADGE
  // ==========================================================

  ongoingBadge: {
    alignSelf: 'flex-start',
    height: 34,
    paddingHorizontal: 17,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1CC',
  },


  ongoingBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F59E0B',
  },


  // ==========================================================
  // COMPLETED BADGE
  // ==========================================================

  completedBadge: {
    alignSelf: 'flex-start',
    height: 34,
    paddingHorizontal: 17,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#62D5AE',
  },


  completedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // WORKOUT INFO
  // ==========================================================

  workoutInfo: {
    marginTop: 65,
  },


  workoutInfoWithBadge: {
    marginTop: 48,
  },


  workoutTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  workoutDescription: {
    marginTop: 6,
    fontSize: 17,
    color: '#23816F',
  },


  dot: {
    color: '#23816F',
  },


  // ==========================================================
  // STATUS
  // ==========================================================

  statusRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },


  statusDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#686B71',
  },


  statusDotOngoing: {
    backgroundColor: '#F59E0B',
  },


  statusDotCompleted: {
    backgroundColor: '#217B68',
  },


  statusText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#74777D',
  },


  // ==========================================================
  // ACTION BUTTON
  // ==========================================================

  actionButton: {
    height: 60,
    marginTop: 17,
    paddingLeft: 23,
    paddingRight: 12,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#227B68',
  },


  actionButtonText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#FFFFFF',
  },


  // ==========================================================
  // DISABLED BUTTON
  // ==========================================================

  actionButtonDisabled: {
    height: 60,
    marginTop: 17,
    paddingLeft: 23,
    paddingRight: 12,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#929399',
  },


  actionButtonDisabledText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#FFFFFF',
  },


  // ==========================================================
  // ARROW CIRCLE
  // ==========================================================

  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005542',
  },


  arrowCircleDisabled: {
    width: 37,
    height: 37,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4D4F54',
  },


  // ==========================================================
  // VARIATION
  // ==========================================================

  variationHeader: {
    marginTop: 23,
    marginHorizontal: 16,
  },


  variationTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // CATEGORY
  // ==========================================================

  categoryScroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 1,
    gap: 7,
  },


  categoryButton: {
    height: 38,
    paddingHorizontal: 12,
    paddingRight: 13,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E3E8E7',
  },


  categoryButtonActive: {
    backgroundColor: '#227B68',
  },


  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },


  categoryIconActive: {
    backgroundColor: '#FFFFFF',
  },


  categoryText: {
    fontSize: 14,
    color: '#74777D',
  },


  categoryTextActive: {
    fontWeight: '700',
    color: '#FFFFFF',
  },


  // ==========================================================
  // EXERCISE GRID
  // ==========================================================

  exerciseGrid: {
    paddingHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },


  exerciseCard: {
    width: '48.5%',
    height: 109,
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: '#202229',
    position: 'relative',
  },


  exerciseImage: {
    width: '100%',
    height: '100%',
  },


  exerciseTitleContainer: {
    position: 'absolute',
    left: 9,
    bottom: 7,
    maxWidth: '90%',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#EAF3F0',
  },


  exerciseTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // CALENDAR MODAL
  // ==========================================================

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0, 0, 0, 0.35)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 32,
  },


  calendarContainer: {
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    marginTop: 180,
  },


  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },


  calendarArrow: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },


  calendarMonthContainer: {
    alignItems: 'center',
  },


  calendarMonthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  calendarYearText: {
    marginTop: 2,
    fontSize: 14,
    color: '#16483E',
  },


  calendarWeekRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  calendarWeekText: {
    width: 38,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#55595D',
  },


  calendarGrid: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },


  calendarDayContainer: {
    width: '14.2857%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },


  calendarDay: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },


  calendarDayBeforeWorkout: {
    backgroundColor: '#6AA99D',
  },


  calendarDayWorkoutDay: {
    backgroundColor: '#003F34',
  },


  calendarDayAfterWorkout: {
    backgroundColor: '#E7E9E9',
  },


  calendarDaySelectedGreen: {
    backgroundColor: '#003F34',
  },


  calendarDaySelectedGray: {
    backgroundColor: '#686B71',
  },


  calendarDayOutside: {
    backgroundColor: 'transparent',
  },


  calendarDayText: {
    fontSize: 14,
    color: '#303336',
  },


  calendarDayTextGreen: {
    color: '#FFFFFF',
    fontWeight: '600',
  },


  calendarDayTextGray: {
    color: '#303336',
  },


  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },


  calendarDayTextOutside: {
    color: '#B5B8B8',
  },


  // ==========================================================
  // BOTTOM SPACE
  // ==========================================================

  bottomSpace: {
    height: 40,
  },

});
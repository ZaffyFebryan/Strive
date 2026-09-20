import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Image,
  Pressable,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


// ============================================================
// CONSTANT
// ============================================================

// Untuk prototype:
// 23 Juli 2026 dianggap sebagai HARI INI.
//
// Jika aplikasi sudah menggunakan tanggal asli perangkat,
// nantinya bisa diganti menjadi:
//
// const TODAY = new Date();

const TODAY = new Date(2026, 6, 23);


// ============================================================
// HELPER DATE
// ============================================================

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


// ------------------------------------------------------------
// Normalize tanggal
// ------------------------------------------------------------

const normalizeDate = (date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
};


// ------------------------------------------------------------
// Date key
// ------------------------------------------------------------

const dateKey = (date) => {
  const d = normalizeDate(date);

  return `${d.getFullYear()}-${String(
    d.getMonth() + 1
  ).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
};


// ------------------------------------------------------------
// Cek tanggal sama
// ------------------------------------------------------------

const isSameDate = (date1, date2) => {
  return dateKey(date1) === dateKey(date2);
};


// ------------------------------------------------------------
// Tambah / kurangi hari
// ------------------------------------------------------------

const addDays = (date, amount) => {
  const result = new Date(date);

  result.setDate(
    result.getDate() + amount
  );

  return result;
};


// ------------------------------------------------------------
// Perbedaan tanggal
// ------------------------------------------------------------

const getDateDifference = (date1, date2) => {
  const first = normalizeDate(date1);
  const second = normalizeDate(date2);

  const difference =
    first.getTime() -
    second.getTime();

  return Math.round(
    difference /
      (1000 * 60 * 60 * 24)
  );
};


// ============================================================
// SLEEP SCREEN
// ============================================================

export default function SleepScreen({
  navigation,
}) {

  // ----------------------------------------------------------
  // Selected date
  // ----------------------------------------------------------

  const [selectedDate, setSelectedDate] =
    useState(
      new Date(TODAY)
    );


  // ----------------------------------------------------------
  // Calendar modal
  // ----------------------------------------------------------

  const [showCalendar, setShowCalendar] =
    useState(false);


  // ----------------------------------------------------------
  // Status tanggal yang dipilih
  // ----------------------------------------------------------

  const selectedDateStatus = useMemo(() => {

    const difference =
      getDateDifference(
        selectedDate,
        TODAY
      );

    if (difference < 0) {
      return 'past';
    }

    if (difference === 0) {
      return 'today';
    }

    return 'future';

  }, [selectedDate]);


  // ==========================================================
  // WEEK DATES
  // ==========================================================

  const getWeekDates = (date) => {

    const current =
      normalizeDate(date);

    // JavaScript:
    // Sunday = 0
    // Monday = 1
    //
    // Diubah sehingga:
    // Monday = 0

    const day =
      current.getDay() === 0
        ? 6
        : current.getDay() - 1;

    const monday =
      addDays(
        current,
        -day
      );

    return Array.from(
      { length: 7 },
      (_, index) =>
        addDays(
          monday,
          index
        )
    );
  };


  const weekDates = useMemo(
    () =>
      getWeekDates(
        selectedDate
      ),
    [selectedDate]
  );


  // ==========================================================
  // WEEK NAVIGATION
  // ==========================================================

  const handlePreviousWeek = () => {

    setSelectedDate(
      addDays(
        selectedDate,
        -7
      )
    );

  };


  const handleNextWeek = () => {

    setSelectedDate(
      addDays(
        selectedDate,
        7
      )
    );

  };


  // ==========================================================
  // SELECT DATE
  // ==========================================================

  const handleSelectDate = (date) => {

    setSelectedDate(
      normalizeDate(date)
    );

    setShowCalendar(false);

  };


  // ==========================================================
  // MONTH
  // ==========================================================

  const currentMonth =
    selectedDate.getMonth();

  const currentYear =
    selectedDate.getFullYear();


  // ==========================================================
  // CALENDAR DATA
  // ==========================================================

  const getCalendarDays = () => {

    const firstDay =
      new Date(
        currentYear,
        currentMonth,
        1
      );

    const lastDay =
      new Date(
        currentYear,
        currentMonth + 1,
        0
      );

    const firstDayIndex =
      firstDay.getDay() === 0
        ? 6
        : firstDay.getDay() - 1;

    const totalDays =
      lastDay.getDate();

    const previousMonthLastDay =
      new Date(
        currentYear,
        currentMonth,
        0
      ).getDate();

    const calendar = [];


    // --------------------------------------------------------
    // Previous month
    // --------------------------------------------------------

    for (
      let index =
        firstDayIndex - 1;
      index >= 0;
      index--
    ) {

      calendar.push({

        date: new Date(
          currentYear,
          currentMonth - 1,
          previousMonthLastDay -
            index
        ),

        currentMonth: false,

      });

    }


    // --------------------------------------------------------
    // Current month
    // --------------------------------------------------------

    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {

      calendar.push({

        date: new Date(
          currentYear,
          currentMonth,
          day
        ),

        currentMonth: true,

      });

    }


    // --------------------------------------------------------
    // Next month
    //
    // HANYA SAMPAI 5 MINGGU
    // Total maksimal = 35 tanggal
    // --------------------------------------------------------

    let nextDay = 1;

    while (
      calendar.length < 35
    ) {

      calendar.push({

        date: new Date(
          currentYear,
          currentMonth + 1,
          nextDay
        ),

        currentMonth: false,

      });

      nextDay++;

    }

    // Pastikan tidak pernah lebih dari 35 item.

    return calendar.slice(0, 35);

  };


  const calendarDays =
    getCalendarDays();


  // ==========================================================
  // DEMO SLEEP DATA
  // ==========================================================

  const sleepDataDates = [

    '2026-07-02',
    '2026-07-03',
    '2026-07-05',
    '2026-07-06',
    '2026-07-07',
    '2026-07-08',
    '2026-07-09',
    '2026-07-10',
    '2026-07-12',
    '2026-07-13',
    '2026-07-14',
    '2026-07-15',
    '2026-07-16',
    '2026-07-17',
    '2026-07-19',
    '2026-07-20',
    '2026-07-21',
    '2026-07-22',
    '2026-07-23',

  ];


  const hasSleepData = (date) => {

    return sleepDataDates.includes(
      dateKey(date)
    );

  };


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {

            navigation.navigate(
              'Home'
            );

          }}
          activeOpacity={0.7}
        >

          <Feather
            name="chevron-left"
            size={31}
            color="#003F34"
          />

        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Pola Tidur
        </Text>

      </View>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >


        {/* ===================================================
            MONTH HEADER
        =================================================== */}

        <View style={styles.monthHeader}>

          <TouchableOpacity
            style={styles.monthSelector}
            onPress={() =>
              setShowCalendar(true)
            }
            activeOpacity={0.7}
          >

            <Text style={styles.monthText}>
              {monthNames[currentMonth]},{' '}
              {currentYear}
            </Text>

            <Feather
              name="chevron-down"
              size={25}
              color="#003F34"
            />

          </TouchableOpacity>


          <View style={styles.weekNavigation}>

            <TouchableOpacity
              style={styles.weekArrow}
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
              style={styles.weekArrow}
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


        {/* ===================================================
            WEEK DATE SELECTOR
        =================================================== */}

        <View style={styles.weekContainer}>

          {weekDates.map((date) => {

            const selected =
              isSameDate(
                date,
                selectedDate
              );


            const dateDifference =
              getDateDifference(
                date,
                TODAY
              );

            const isPastOrToday =
              dateDifference <= 0;

            const isFuture =
              dateDifference > 0;


            const selectedFuture =
              selected &&
              isFuture;


            const selectedPastOrToday =
              selected &&
              isPastOrToday;


            return (

              <TouchableOpacity
                key={dateKey(date)}
                style={[

                  styles.dayItem,

                  isPastOrToday &&
                    !selected &&
                    styles.dayItemPast,

                  isFuture &&
                    !selected &&
                    styles.dayItemFuture,

                  selectedPastOrToday &&
                    styles.dayItemSelected,

                  selectedFuture &&
                    styles.dayItemSelectedFuture,

                ]}
                onPress={() =>
                  setSelectedDate(
                    normalizeDate(date)
                  )
                }
                activeOpacity={0.8}
              >

                {/* DAY NAME */}

                <Text
                  style={[

                    styles.dayName,

                    isPastOrToday &&
                      !selected &&
                      styles.dayNamePast,

                    isFuture &&
                      !selected &&
                      styles.dayNameFuture,

                    selectedPastOrToday &&
                      styles.dayNameSelected,

                    selectedFuture &&
                      styles.dayNameSelectedFuture,

                  ]}
                >

                  {
                    dayNames[
                      date.getDay() === 0
                        ? 6
                        : date.getDay() - 1
                    ].substring(0, 1)
                  }

                </Text>


                {/* DATE NUMBER */}

                <View
                  style={[
                    styles.dayNumberCircle,

                    isPastOrToday &&
                      styles.dayNumberCirclePast,

                    isFuture &&
                      styles.dayNumberCircleFuture,

                  ]}
                >

                  <Text
                    style={[
                      styles.dayNumber,

                      isPastOrToday &&
                        styles.dayNumberPast,

                      isFuture &&
                        styles.dayNumberFuture,

                    ]}
                  >

                    {date.getDate()}

                  </Text>

                </View>

              </TouchableOpacity>

            );

          })}

        </View>


        {/* ===================================================
            CONDITIONAL CONTENT
        =================================================== */}

        {selectedDateStatus === 'past' && (

          <PastSleepContent />

        )}


        {selectedDateStatus === 'today' && (

          <TodaySleepContent
            navigation={navigation}
          />

        )}


        {selectedDateStatus === 'future' && (

          <FutureSleepContent />

        )}

      </ScrollView>


      {/* =====================================================
          CALENDAR MODAL
      ===================================================== */}

      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowCalendar(false)
        }
      >

        <Pressable
          style={styles.calendarOverlay}
          onPress={() =>
            setShowCalendar(false)
          }
        >

          <Pressable
            style={styles.calendarModal}
            onPress={(event) => {
              event.stopPropagation();
            }}
          >


            {/* =============================================
                CALENDAR HEADER
            ============================================= */}

            <View
              style={
                styles.calendarHeader
              }
            >

              <TouchableOpacity
                style={
                  styles.calendarArrow
                }
                onPress={() => {

                  setSelectedDate(
                    new Date(
                      currentYear,
                      currentMonth - 1,
                      1
                    )
                  );

                }}
                activeOpacity={0.7}
              >

                <Feather
                  name="chevron-left"
                  size={29}
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

                  {monthNames[
                    currentMonth
                  ]}

                </Text>

                <Text
                  style={
                    styles.calendarYear
                  }
                >

                  {currentYear}

                </Text>

              </View>


              <TouchableOpacity
                style={
                  styles.calendarArrow
                }
                onPress={() => {

                  setSelectedDate(
                    new Date(
                      currentYear,
                      currentMonth + 1,
                      1
                    )
                  );

                }}
                activeOpacity={0.7}
              >

                <Feather
                  name="chevron-right"
                  size={29}
                  color="#003F34"
                />

              </TouchableOpacity>

            </View>


            {/* =============================================
                DAY NAMES
            ============================================= */}

            <View
              style={
                styles.calendarWeekHeader
              }
            >

              {dayNames.map(
                (day) => (

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


            {/* =============================================
                CALENDAR GRID
            ============================================= */}

            <View
              style={
                styles.calendarGrid
              }
            >

              {calendarDays.map(
                ({
                  date,
                  currentMonth:
                    isCurrentMonth,
                }) => {

                  const selected =
                    isSameDate(
                      date,
                      selectedDate
                    );

                  const hasData =
                    hasSleepData(date);

                  const isFuture =
                    getDateDifference(
                      date,
                      TODAY
                    ) > 0;


                  return (

                    <TouchableOpacity
                      key={dateKey(date)}
                      style={
                        styles.calendarDateContainer
                      }
                      onPress={() =>
                        handleSelectDate(
                          date
                        )
                      }
                      activeOpacity={0.8}
                    >

                      <View
                        style={[
                          styles.calendarDate,

                          !isCurrentMonth &&
                            styles.calendarDateOutside,

                          hasData &&
                            isCurrentMonth &&
                            styles.calendarDateHasData,

                          selected &&
                            styles.calendarDateSelected,

                          isFuture &&
                            isCurrentMonth &&
                            !selected &&
                            styles.calendarDateFuture,

                        ]}
                      >

                        <Text
                          style={[
                            styles.calendarDateText,

                            !isCurrentMonth &&
                              styles.calendarDateTextOutside,

                            hasData &&
                              isCurrentMonth &&
                              styles.calendarDateTextHasData,

                            selected &&
                              styles.calendarDateTextSelected,

                            isFuture &&
                              isCurrentMonth &&
                              !selected &&
                              styles.calendarDateTextFuture,

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

          </Pressable>

        </Pressable>

      </Modal>

    </SafeAreaView>

  );

}


// ============================================================
// PAST SLEEP CONTENT
// ============================================================

function PastSleepContent() {

  return (

    <View>

      <Text
        style={
          styles.sectionTitle
        }
      >
        Statistik
      </Text>


      <View
        style={
          styles.statisticsRow
        }
      >

        {/* QUALITY */}

        <View
          style={
            styles.statCard
          }
        >

          <View
            style={
              styles.statBackground
            }
          />

          <View
            style={
              styles.statContent
            }
          >

            <Text
              style={
                styles.statTitle
              }
            >
              Kualitas
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              78 %
            </Text>

            <View
              style={
                styles.progressBackground
              }
            >

              <View
                style={[
                  styles.progressValue,
                  {
                    width: '86%',
                  },
                ]}
              />

            </View>

          </View>

        </View>


        {/* DURATION */}

        <View
          style={
            styles.statCard
          }
        >

          <View
            style={
              styles.statBackground
            }
          />

          <View
            style={
              styles.statContent
            }
          >

            <View
              style={
                styles.sleepBadge
              }
            >

              <Text
                style={
                  styles.sleepBadgeText
                }
              >
                7j
              </Text>

              <Feather
                name="clock"
                size={14}
                color="#FFFFFF"
              />

            </View>


            <Text
              style={[
                styles.statTitle,
                styles.durationTitle,
              ]}
            >
              Durasi
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              6 Jam 54 Menit
            </Text>

            <View
              style={
                styles.progressBackground
              }
            >

              <View
                style={[
                  styles.progressValue,
                  {
                    width: '94%',
                  },
                ]}
              />

            </View>

          </View>

        </View>

      </View>

    </View>

  );

}


// ============================================================
// TODAY SLEEP CONTENT
// ============================================================

function TodaySleepContent({
  navigation,
}) {

  return (

    <View>

      <Text
        style={
          styles.sectionTitle
        }
      >
        Pantau Pola Tidur
      </Text>


      {/* =====================================================
          MONITOR CARD
      ===================================================== */}

      <View
        style={
          styles.monitorCard
        }
      >

        <View
          style={
            styles.monitorBackground
          }
        />


        <View
          style={
            styles.monitorContent
          }
        >

          <View
            style={
              styles.sleepBadgeMonitor
            }
          >

            <Text
              style={
                styles.sleepBadgeText
              }
            >
              7j
            </Text>

            <Feather
              name="clock"
              size={14}
              color="#FFFFFF"
            />

          </View>


          <View
            style={
              styles.monitorTextContainer
            }
          >

            <Text
              style={
                styles.monitorTitle
              }
            >
              Kamis
            </Text>

            <Text
              style={
                styles.monitorTime
              }
            >
              Waktu tidur : 22.00 – 05.00
            </Text>

          </View>


          {/* =================================================
              PANTAU SEKARANG
          ================================================= */}

          <TouchableOpacity
            style={
              styles.monitorButton
            }
            onPress={() => {

              navigation.navigate(
                'SleepMonitoring'
              );

            }}
            activeOpacity={0.8}
          >

            <Text
              style={
                styles.monitorButtonText
              }
            >
              Pantau Sekarang
            </Text>

            <View
              style={
                styles.monitorArrow
              }
            >

              <Feather
                name="arrow-right"
                size={20}
                color="#FFFFFF"
              />

            </View>

          </TouchableOpacity>

        </View>

      </View>


      {/* =====================================================
          WEARABLE
      ===================================================== */}

      <View
        style={
          styles.wearableCard
        }
      >

        <Text
          style={
            styles.wearableTitle
          }
        >
          Terhubung dengan:
        </Text>


        <View
          style={
            styles.connectedDevice
          }
        >

          <View
            style={
              styles.watchPlaceholder
            }
          >

            <Image
              source={
                require(
                  '../../../assets/corospace4.png'
                )
              }
              style={
                styles.watchImage
              }
              resizeMode="contain"
            />

          </View>


          <Text
            style={
              styles.deviceName
            }
          >
            Coros Pace 4
          </Text>

        </View>

      </View>

    </View>

  );

}


// ============================================================
// FUTURE SLEEP CONTENT
// ============================================================

function FutureSleepContent() {

  return (

    <View>

      <Text
        style={
          styles.sectionTitle
        }
      >
        Pantau Pola Tidur
      </Text>


      {/* =====================================================
          MONITOR CARD DISABLED
      ===================================================== */}

      <View
        style={
          styles.monitorCard
        }
      >

        <View
          style={
            styles.monitorBackground
          }
        />


        <View
          style={
            styles.monitorContent
          }
        >

          <View
            style={
              styles.sleepBadgeMonitor
            }
          >

            <Text
              style={
                styles.sleepBadgeText
              }
            >
              7j
            </Text>

            <Feather
              name="clock"
              size={14}
              color="#FFFFFF"
            />

          </View>


          <View
            style={
              styles.monitorTextContainer
            }
          >

            <Text
              style={
                styles.monitorTitle
              }
            >
              Minggu
            </Text>

            <Text
              style={
                styles.monitorTime
              }
            >
              Waktu tidur : 22.00 – 05.00
            </Text>

          </View>


          <TouchableOpacity
            style={[
              styles.monitorButton,
              styles.monitorButtonDisabled,
            ]}
            disabled
          >

            <Text
              style={[
                styles.monitorButtonText,
                styles.monitorButtonTextDisabled,
              ]}
            >
              Pantau Sekarang
            </Text>

            <View
              style={[
                styles.monitorArrow,
                styles.monitorArrowDisabled,
              ]}
            >

              <Feather
                name="arrow-right"
                size={20}
                color="#FFFFFF"
              />

            </View>

          </TouchableOpacity>

        </View>

      </View>


      {/* =====================================================
          WEARABLE
      ===================================================== */}

      <View
        style={
          styles.wearableCard
        }
      >

        <Text
          style={
            styles.wearableTitle
          }
        >
          Wearable Device
        </Text>


        <TouchableOpacity
          style={
            styles.connectButton
          }
          onPress={() => navigation.navigate('ConnectedDevice')}
          activeOpacity={0.8}
        >

          <Feather
            name="plus-circle"
            size={22}
            color="#003F34"
          />

          <Text
            style={
              styles.connectButtonText
            }
          >
            Hubungkan
          </Text>

        </TouchableOpacity>

      </View>

    </View>

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
    paddingBottom: 35,
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 80,
    marginTop: 32,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3E3',
  },


  backButton: {
    width: 38,
    height: 45,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },


  headerTitle: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
    marginRight: 10,
  },


  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  weekArrow: {
    width: 36,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // WEEK DATE SELECTOR
  // ==========================================================

  weekContainer: {
    marginTop: 14,
    paddingHorizontal: 20,
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  dayItem: {
    width: 46,
    height: 78,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 9,
    paddingBottom: 7,
  },


  dayItemPast: {
    backgroundColor: '#67A99B',
  },


  dayItemFuture: {
    backgroundColor: '#E7EAEB',
  },


  dayItemSelected: {
    backgroundColor: '#003F34',
  },


  dayItemSelectedFuture: {
    backgroundColor: '#686970',
  },


  // ==========================================================
  // DAY NAME
  // ==========================================================

  dayName: {
    fontSize: 14,
    fontWeight: '400',
  },


  dayNamePast: {
    color: '#FFFFFF',
  },


  dayNameFuture: {
    color: '#62656A',
  },


  dayNameSelected: {
    color: '#FFFFFF',
  },


  dayNameSelectedFuture: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // DAY NUMBER
  // ==========================================================

  dayNumberCircle: {
    width: 29,
    height: 29,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },


  dayNumberCirclePast: {
    backgroundColor: '#F4F5F5',
  },


  dayNumberCircleFuture: {
    backgroundColor: '#F4F5F5',
  },


  dayNumber: {
    fontSize: 14,
    fontWeight: '400',
    color: '#55585B',
  },


  dayNumberPast: {
    color: '#55585B',
  },


  dayNumberFuture: {
    color: '#55585B',
  },


  // ==========================================================
  // SECTION
  // ==========================================================

  sectionTitle: {
    marginTop: 27,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // STATISTICS
  // ==========================================================

  statisticsRow: {
    marginTop: 17,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 16,
  },


  statCard: {
    flex: 1,
    height: 275,
    borderRadius: 19,
    overflow: 'hidden',
    backgroundColor: '#F5F6F6',
    position: 'relative',
  },


  statBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F2F4F4',
    opacity: 0.9,
  },


  statContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 19,
    paddingBottom: 27,
  },


  statTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#003F34',
  },


  durationTitle: {
    marginTop: 66,
  },


  statValue: {
    marginTop: 3,
    fontSize: 19,
    fontWeight: '700',
    color: '#27816F',
  },


  progressBackground: {
    width: '100%',
    height: 7,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#D6DAD9',
    overflow: 'hidden',
  },


  progressValue: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#227B68',
  },


  sleepBadge: {
    position: 'absolute',
    top: 21,
    right: 18,
    minWidth: 80,
    height: 33,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: '#003F34',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },


  sleepBadgeText: {
    fontSize: 14,
    color: '#FFFFFF',
  },


  // ==========================================================
  // MONITOR CARD
  // ==========================================================

  monitorCard: {
    height: 275,
    marginTop: 17,
    marginHorizontal: 20,
    borderRadius: 19,
    overflow: 'hidden',
    backgroundColor: '#F5F6F6',
    position: 'relative',
  },


  monitorBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F4F5F5',
    opacity: 0.9,
  },


  monitorContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 21,
    justifyContent: 'space-between',
  },


  sleepBadgeMonitor: {
    alignSelf: 'flex-end',
    minWidth: 80,
    height: 33,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: '#003F34',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },


  monitorTextContainer: {
    marginTop: 26,
  },


  monitorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#003F34',
  },


  monitorTime: {
    marginTop: 4,
    fontSize: 19,
    color: '#27816F',
  },


  monitorButton: {
    height: 64,
    borderRadius: 34,
    backgroundColor: '#227B68',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 27,
    paddingRight: 7,
  },


  monitorButtonDisabled: {
    backgroundColor: '#929399',
  },


  monitorButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },


  monitorButtonTextDisabled: {
    color: '#F1F1F1',
  },


  monitorArrow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#003F34',
    alignItems: 'center',
    justifyContent: 'center',
  },


  monitorArrowDisabled: {
    backgroundColor: '#55565A',
  },


  // ==========================================================
  // WEARABLE
  // ==========================================================

  wearableCard: {
    marginTop: 24,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 24,
    borderRadius: 20,
    backgroundColor: '#EAF3F0',
  },


  wearableTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  connectedDevice: {
    height: 65,
    marginTop: 10,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },


  watchPlaceholder: {
    width: 95,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },


  watchImage: {
    width: 80,
    height: 60,
  },


  deviceName: {
    marginLeft: 17,
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  connectButton: {
    height: 65,
    marginTop: 10,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },


  connectButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003F34',
  },


  // ==========================================================
  // CALENDAR MODAL
  // ==========================================================

  calendarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },


  calendarModal: {
    width: '90%',
    minHeight: 420,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    overflow: 'hidden',
  },


  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  calendarArrow: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },


  calendarMonthTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },


  calendarMonth: {
    fontSize: 19,
    fontWeight: '700',
    color: '#003F34',
  },


  calendarYear: {
    marginTop: 3,
    fontSize: 17,
    color: '#003F34',
  },


  // ==========================================================
  // CALENDAR WEEK
  // ==========================================================

  calendarWeekHeader: {
    marginTop: 24,
    flexDirection: 'row',
  },


  calendarWeekDay: {
    flex: 1,
    alignItems: 'center',
  },


  calendarWeekText: {
    fontSize: 14,
    color: '#56585C',
  },


  // ==========================================================
  // CALENDAR GRID
  // ==========================================================

  calendarGrid: {
    marginTop: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },


  calendarDateContainer: {
    width: '14.285%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },


  calendarDate: {
    width: 40,
    height: 40,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8D8DA',
    borderWidth: 1,
    borderColor: '#D7D9DA',
  },


  calendarDateOutside: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },


  calendarDateHasData: {
    backgroundColor: '#227B68',
    borderColor: '#227B68',
  },


  calendarDateSelected: {
    backgroundColor: '#003F34',
    borderColor: '#003F34',
  },


  calendarDateFuture: {
    backgroundColor: '#D8D8DA',
    borderColor: '#D8D8DA',
  },


  calendarDateText: {
    fontSize: 16,
    color: '#2C2F31',
  },


  calendarDateTextOutside: {
    color: '#999B9E',
  },


  calendarDateTextHasData: {
    color: '#FFFFFF',
  },


  calendarDateTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },


  calendarDateTextFuture: {
    color: '#55585B',
  },

});
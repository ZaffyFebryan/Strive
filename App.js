// App.js

import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ActivityIndicator, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './src/screens/Auth/OnboardingScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';
import OTPVerificationScreen from './src/screens/Auth/OTPVerificationScreen';
import NewPasswordScreen from './src/screens/Auth/NewPasswordScreen';

import KebijakanPrivasi from './src/screens/Auth/KebijakanPrivasi';
import PerjanjianPengguna from './src/screens/Auth/PerjanjianPengguna';

import DataGenderScreen from './src/screens/Auth/DataGenderScreen';
import DataAgeScreen from './src/screens/Auth/DataAgeScreen';
import DataHWScreen from './src/screens/Auth/DataHWScreen';
import DataActivityScreen from './src/screens/Auth/DataActivityScreen';
import DataGoalScreen from './src/screens/Auth/DataGoalScreen';

import MainNavigator from './src/navigation/MainNavigator';

import HomeScreen from './src/screens/Home/HomeScreen';
import NotificationScreen from './src/screens/Home/NotificationScreen';
import AIScreen from './src/screens/Home/AIScreen';

import ArticleScreen from './src/screens/Article/ArticleScreen';
import RecommendationScreen from './src/screens/Article/RecommendationScreen';
import NewestScreen from './src/screens/Article/NewestScreen';
import ArticleDetailScreen from './src/screens/Article/ArticleDetailScreen';

import CommunityScreen from './src/screens/Community/CommunityScreen';
import AddStoryScreen from './src/screens/Community/AddStoryScreen';
import StoryPreviewScreen from './src/screens/Community/StoryPreviewScreen';
import StoryViewerScreen from './src/screens/Community/StoryViewerScreen';
import ShareActivityScreen from './src/screens/Community/ShareActivityScreen';
import SearchScreen from './src/screens/Community/SearchScreen';
import ContactScreen from './src/screens/Community/ContactScreen';
import ConversationScreen from './src/screens/Community/ConversationScreen';
import ProfileUserScreen from './src/screens/Community/ProfileUserScreen';
import FollowersFollowingScreen from './src/screens/Community/FollowersFollowingScreen';
import FollowingFollowersScreen from './src/screens/Community/FollowingFollowersScreen';
import UserPostsScreen from './src/screens/Community/UserPostsScreen';
import AchievementsScreen from './src/screens/Community/AchievementsScreen';

import ProfileScreen from './src/screens/Profile/ProfileScreen';
import ShareProfileScreen from './src/screens/Profile/ShareProfileScreen';
import QRScannerScreen from './src/screens/Profile/QRScannerScreen';
import EditProfileScreen from './src/screens/Profile/EditProfileScreen';
import SettingsScreen from './src/screens/Profile/SettingsScreen';
import WearableDeviceScreen from './src/screens/Profile/WearableDeviceScreen';
import ConnectCorosScreen from './src/screens/Profile/ConnectCorosScreen';
import ConnectingCorosScreen from './src/screens/Profile/ConnectingCorosScreen';
import ConnectedDeviceScreen from './src/screens/Profile/ConnectedDeviceScreen';

import WorkoutScreen from './src/screens/Activity/WorkoutScreen';
import LatihanSekarangScreen from './src/screens/Activity/LatihanSekarangScreen';
import WorkoutHistoryScreen from './src/screens/Activity/WorkoutHistoryScreen';
import DetailWorkoutHistoryScreen from './src/screens/Activity/DetailWorkoutHistoryScreen';
import UbahVariasiScreen from './src/screens/Activity/UbahVariasiScreen';
import StartWorkoutCountdownScreen from './src/screens/Activity/StartWorkoutCountdownScreen';
import DataWorkoutScreen from './src/screens/Activity/DataWorkoutScreen';
import WorkoutDetailScreen from './src/screens/Activity/WorkoutDetailScreen';

import NutritionScreen from './src/screens/Nutrition/NutritionScreen';
import EditMakanScreen from './src/screens/Nutrition/EditMakanScreen';
import TambahMakananScreen from './src/screens/Nutrition/TambahMakananScreen';
import MakananScreen from './src/screens/Nutrition/MakananScreen';
import HidanganScreen from './src/screens/Nutrition/HidanganScreen';
import RiwayatNutrisiScreen from './src/screens/Nutrition/RiwayatNutrisiScreen';
import DetailRiwayatNutrisiScreen from './src/screens/Nutrition/DetailRiwayatNutrisiScreen.jsx';
import ResepMakananScreen from './src/screens/Nutrition/ResepMakananScreen.jsx';
import DetailResepMakananScreen from './src/screens/Nutrition/DetailResepMakananScreen.jsx';

import SleepScreen from './src/screens/Sleep/SleepScreen';
import SleepMonitoringScreen from './src/screens/Sleep/SleepMonitoringScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Plus-Jakarta-Sans-Regular': require('./assets/fonts/Plus-Jakarta-Sans-Regular.ttf'),
      'Plus-Jakarta-Sans-Italic': require('./assets/fonts/Plus-Jakarta-Sans-Italic.ttf'),
    });

    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#000',
        }}
      >
        <ActivityIndicator
          size="large"
          color="#56E39F"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />

        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
        />

        <Stack.Screen 
          name="OTPVerification" 
          component={OTPVerificationScreen} 
        />

        <Stack.Screen 
          name="NewPassword" 
          component={NewPasswordScreen} 
        />

        <Stack.Screen 
          name="KebijakanPrivasi" 
          component={KebijakanPrivasi} 
        />

        <Stack.Screen 
          name="PerjanjianPengguna" 
          component={PerjanjianPengguna} 
        />

        <Stack.Screen 
          name="DataGender" 
          component={DataGenderScreen} 
        />

        <Stack.Screen 
          name="DataAge" 
          component={DataAgeScreen} 
        />

        <Stack.Screen 
          name="DataHW" 
          component={DataHWScreen} 
        />

        <Stack.Screen 
          name="DataActivity" 
          component={DataActivityScreen} 
        />

        <Stack.Screen 
          name="DataGoal" 
          component={DataGoalScreen} 
        />

        <Stack.Screen
          name="Main"
          component={MainNavigator}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
        />

        <Stack.Screen
          name="AI"
          component={AIScreen}
        />

        <Stack.Screen
          name="Article"
          component={ArticleScreen}
        />

        <Stack.Screen
          name="Recommendation"
          component={RecommendationScreen}
        />

        <Stack.Screen
          name="Newest"
          component={NewestScreen}
        />

        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetailScreen}
        />

        <Stack.Screen
          name="Community"
          component={CommunityScreen}
        />

        <Stack.Screen
          name="AddStory"
          component={AddStoryScreen}
        />

        <Stack.Screen
          name="StoryPreview"
          component={StoryPreviewScreen}
        />

        <Stack.Screen
          name="StoryViewer"
          component={StoryViewerScreen}
        />

        <Stack.Screen
          name="ShareActivity"
          component={ShareActivityScreen}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
        />

        <Stack.Screen
          name="Contact"
          component={ContactScreen}
        />

        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
        />

        <Stack.Screen
          name="ProfileUser"
          component={ProfileUserScreen}
        />

        <Stack.Screen
          name="FollowersFollowing"
          component={FollowersFollowingScreen}
        />

        <Stack.Screen
          name="FollowingFollowers"
          component={FollowingFollowersScreen}
        />

        <Stack.Screen
          name="UserPosts"
          component={UserPostsScreen}
        />

        <Stack.Screen
          name="Achievements"
          component={AchievementsScreen}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />

        <Stack.Screen
          name="ShareProfile"
          component={ShareProfileScreen}
        />

        <Stack.Screen
          name="QRScanner"
          component={QRScannerScreen}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />

        <Stack.Screen
          name="WearableDevice"
          component={WearableDeviceScreen}
        />

        <Stack.Screen
          name="ConnectCoros"
          component={ConnectCorosScreen}
        />

        <Stack.Screen
          name="ConnectingCoros"
          component={ConnectingCorosScreen}
        />

        <Stack.Screen
          name="ConnectedDevice"
          component={ConnectedDeviceScreen}
        />

        <Stack.Screen
          name="Workout"
          component={WorkoutScreen}
        />

        <Stack.Screen
          name="LatihanSekarang"
          component={LatihanSekarangScreen}
        />

        <Stack.Screen
          name="WorkoutHistory"
          component={WorkoutHistoryScreen}
        />

        <Stack.Screen
          name="DetailWorkoutHistory"
          component={DetailWorkoutHistoryScreen}
        />

        <Stack.Screen
          name="UbahVariasi"
          component={UbahVariasiScreen}
        />

        <Stack.Screen
          name="StartWorkoutCountdown"
          component={StartWorkoutCountdownScreen}
        />

        <Stack.Screen
          name="DataWorkout"
          component={DataWorkoutScreen}
        />

        <Stack.Screen
          name="WorkoutDetail"
          component={WorkoutDetailScreen}
        />

        <Stack.Screen
          name="Nutrition"
          component={NutritionScreen}
        />

        <Stack.Screen
          name="EditMakan"
          component={EditMakanScreen}
        />

        <Stack.Screen
          name="TambahMakanan"
          component={TambahMakananScreen}
        />

        <Stack.Screen
          name="Makanan"
          component={MakananScreen}
        />

        <Stack.Screen
          name="Hidangan"
          component={HidanganScreen}
        />

        <Stack.Screen
          name="RiwayatNutrisi"
          component={RiwayatNutrisiScreen}
        />

        <Stack.Screen
          name="DetailRiwayatNutrisi"
          component={DetailRiwayatNutrisiScreen}
        />

        <Stack.Screen
          name="ResepMakanan"
          component={ResepMakananScreen}
        />

        <Stack.Screen
          name="DetailResepMakanan"
          component={DetailResepMakananScreen}
        />

        <Stack.Screen
          name="Sleep"
          component={SleepScreen}
        />

        <Stack.Screen
          name="SleepMonitoring"
          component={SleepMonitoringScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
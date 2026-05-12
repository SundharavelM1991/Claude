import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../theme';

import HomeScreen from '../screens/home/HomeScreen';
import ChildProfileScreen from '../screens/child/ChildProfileScreen';
import DailyReportsScreen from '../screens/reports/DailyReportsScreen';
import ReportDetailScreen from '../screens/reports/ReportDetailScreen';
import GalleryScreen from '../screens/gallery/GalleryScreen';
import MessagesScreen from '../screens/messages/MessagesScreen';
import ChatScreen from '../screens/messages/ChatScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import BillingScreen from '../screens/billing/BillingScreen';
import InvoiceDetailScreen from '../screens/billing/InvoiceDetailScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

export type MainTabParamList = {
  HomeTab: undefined;
  ReportsTab: undefined;
  MessagesTab: undefined;
  BillingTab: undefined;
  MoreTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ChildProfile: { childId: string };
  Notifications: undefined;
};

export type ReportsStackParamList = {
  DailyReports: undefined;
  ReportDetail: { reportId: string };
  Gallery: undefined;
};

export type MessagesStackParamList = {
  Messages: undefined;
  Chat: { conversationId: string };
};

export type BillingStackParamList = {
  Billing: undefined;
  InvoiceDetail: { invoiceId: string };
};

export type MoreStackParamList = {
  Settings: undefined;
  Attendance: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ReportsStack = createNativeStackNavigator<ReportsStackParamList>();
const MessagesStack = createNativeStackNavigator<MessagesStackParamList>();
const BillingStack = createNativeStackNavigator<BillingStackParamList>();
const MoreStack = createNativeStackNavigator<MoreStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ChildProfile" component={ChildProfileScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
    </HomeStack.Navigator>
  );
}

function ReportsStackNavigator() {
  return (
    <ReportsStack.Navigator screenOptions={{ headerShown: false }}>
      <ReportsStack.Screen name="DailyReports" component={DailyReportsScreen} />
      <ReportsStack.Screen name="ReportDetail" component={ReportDetailScreen} />
      <ReportsStack.Screen name="Gallery" component={GalleryScreen} />
    </ReportsStack.Navigator>
  );
}

function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator screenOptions={{ headerShown: false }}>
      <MessagesStack.Screen name="Messages" component={MessagesScreen} />
      <MessagesStack.Screen name="Chat" component={ChatScreen} />
    </MessagesStack.Navigator>
  );
}

function BillingStackNavigator() {
  return (
    <BillingStack.Navigator screenOptions={{ headerShown: false }}>
      <BillingStack.Screen name="Billing" component={BillingScreen} />
      <BillingStack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
    </BillingStack.Navigator>
  );
}

function MoreStackNavigator() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="Settings" component={SettingsScreen} />
      <MoreStack.Screen name="Attendance" component={AttendanceScreen} />
    </MoreStack.Navigator>
  );
}

function TabIcon({ name, focused, badge }: { name: any; focused: boolean; badge?: number }) {
  return (
    <View>
      <Ionicons name={name} size={24} color={focused ? Colors.tabBarActive : Colors.tabBarInactive} />
      {badge && badge > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportsStackNavigator}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'document-text' : 'document-text-outline'} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="MessagesTab"
        component={MessagesStackNavigator}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} focused={focused} badge={3} />,
        }}
      />
      <Tab.Screen
        name="BillingTab"
        component={BillingStackNavigator}
        options={{
          tabBarLabel: 'Billing',
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'card' : 'card-outline'} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreStackNavigator}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'menu' : 'menu-outline'} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 60,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabLabel: {
    ...Typography.caption,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 2,
  },
});

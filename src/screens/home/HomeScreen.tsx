import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MOCK_DAILY_REPORTS, MOCK_NOTIFICATIONS, MOCK_EVENTS } from '../../data/mockData';
import { HomeStackParamList } from '../../navigation/MainNavigator';

type NavProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const { user, selectedChild, children, selectChild } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const todayReport = MOCK_DAILY_REPORTS[0];
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;
  const upcomingEvents = MOCK_EVENTS.slice(0, 2);

  async function onRefresh() {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    setRefreshing(false);
  }

  const firstName = user?.name?.split(' ')[0] ?? 'Parent';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning, {firstName}! 👋</Text>
              <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={24} color={Colors.textInverse} />
              {unreadCount > 0 && (
                <View style={styles.notifBadge}>
                  <Text style={styles.notifBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {children.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.childSelector}>
              {children.map(child => (
                <TouchableOpacity
                  key={child.id}
                  style={[styles.childChip, selectedChild?.id === child.id && styles.childChipActive]}
                  onPress={() => selectChild(child)}
                >
                  <Image source={{ uri: child.avatar }} style={styles.childChipAvatar} />
                  <Text style={[styles.childChipName, selectedChild?.id === child.id && styles.childChipNameActive]}>
                    {child.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </LinearGradient>

        {selectedChild && (
          <View style={styles.childCard}>
            <TouchableOpacity
              style={styles.childCardInner}
              onPress={() => navigation.navigate('ChildProfile', { childId: selectedChild.id })}
              activeOpacity={0.8}
            >
              <Image source={{ uri: selectedChild.avatar }} style={styles.childAvatar} />
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{selectedChild.name}</Text>
                <Text style={styles.childDetail}>{selectedChild.classroom}</Text>
                <Text style={styles.childDetail}>{selectedChild.teacher}</Text>
              </View>
              <View style={styles.childStatus}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Checked In</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickGrid}>
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity key={action.label} style={styles.quickItem} activeOpacity={0.7}>
                <View style={[styles.quickIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {todayReport && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Snapshot</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See full report</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.snapshotCard}>
              <View style={styles.moodRow}>
                <Text style={styles.moodEmoji}>{MOOD_MAP[todayReport.mood].emoji}</Text>
                <View style={styles.moodInfo}>
                  <Text style={styles.moodLabel}>Mood Today</Text>
                  <Text style={styles.moodValue}>{MOOD_MAP[todayReport.mood].label}</Text>
                </View>
              </View>
              <View style={styles.statRow}>
                <StatBadge icon="restaurant-outline" label="Meals" value="3 / 3 eaten" color={Colors.success} />
                <StatBadge icon="moon-outline" label="Nap" value={`${todayReport.naps[0]?.duration ?? 0} min`} color={Colors.info} />
                <StatBadge icon="star-outline" label="Activities" value={`${todayReport.activities.length} done`} color={Colors.secondary} />
              </View>
              <View style={styles.noteBox}>
                <Ionicons name="chatbubble-ellipses-outline" size={16} color={Colors.primary} />
                <Text style={styles.noteText} numberOfLines={2}>{todayReport.notes}</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View all</Text>
            </TouchableOpacity>
          </View>
          {upcomingEvents.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <View style={[styles.eventTypeBadge, { backgroundColor: EVENT_COLORS[event.type] + '20' }]}>
                <Ionicons name={EVENT_ICONS[event.type] as any} size={20} color={EVENT_COLORS[event.type]} />
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {event.location ? ` · ${event.location}` : ''}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBadge({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <View style={[statStyles.container, { borderColor: color + '30' }]}>
      <Ionicons name={icon as any} size={18} color={color} />
      <Text style={statStyles.label}>{label}</Text>
      <Text style={[statStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: 2,
  },
  label: { ...Typography.caption, color: Colors.textSecondary },
  value: { ...Typography.caption, fontWeight: '600' },
});

const MOOD_MAP: Record<string, { emoji: string; label: string }> = {
  happy: { emoji: '😊', label: 'Happy' },
  sad: { emoji: '😢', label: 'Sad' },
  neutral: { emoji: '😐', label: 'Calm' },
  excited: { emoji: '🤩', label: 'Excited' },
  tired: { emoji: '😴', label: 'Tired' },
};

const QUICK_ACTIONS = [
  { label: 'Check-In', icon: 'log-in-outline', color: Colors.success },
  { label: 'Message', icon: 'chatbubble-outline', color: Colors.primary },
  { label: 'Gallery', icon: 'images-outline', color: Colors.secondary },
  { label: 'Invoice', icon: 'receipt-outline', color: Colors.warning },
];

const EVENT_COLORS: Record<string, string> = {
  holiday: Colors.error,
  activity: Colors.success,
  meeting: Colors.primary,
  performance: Colors.secondary,
  'field-trip': Colors.info,
};

const EVENT_ICONS: Record<string, string> = {
  holiday: 'calendar',
  activity: 'fitness',
  meeting: 'people',
  performance: 'musical-notes',
  'field-trip': 'bus',
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.xl + 8 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { ...Typography.h3, color: Colors.textInverse },
  date: { ...Typography.body2, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  notifBtn: { padding: 4, position: 'relative' },
  notifBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  childSelector: { marginTop: Spacing.md },
  childChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.round,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    gap: 6,
  },
  childChipActive: { backgroundColor: Colors.surface },
  childChipAvatar: { width: 24, height: 24, borderRadius: 12 },
  childChipName: { ...Typography.label, color: 'rgba(255,255,255,0.85)' },
  childChipNameActive: { color: Colors.primary },
  childCard: {
    marginHorizontal: Spacing.lg,
    marginTop: -20,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    ...Shadow.md,
  },
  childCardInner: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  childAvatar: { width: 56, height: 56, borderRadius: 28, marginRight: Spacing.md },
  childInfo: { flex: 1 },
  childName: { ...Typography.h4, color: Colors.text },
  childDetail: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  childStatus: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success },
  statusText: { ...Typography.caption, color: Colors.success, fontWeight: '600' },
  section: { marginTop: Spacing.lg, paddingHorizontal: Spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionTitle: { ...Typography.h4, color: Colors.text },
  seeAll: { ...Typography.label, color: Colors.primary },
  quickGrid: { flexDirection: 'row', gap: Spacing.sm },
  quickItem: { flex: 1, alignItems: 'center', gap: 6 },
  quickIcon: { width: 56, height: 56, borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },
  snapshotCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, ...Shadow.sm },
  moodRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md, gap: Spacing.md },
  moodEmoji: { fontSize: 40 },
  moodInfo: {},
  moodLabel: { ...Typography.caption, color: Colors.textSecondary },
  moodValue: { ...Typography.h4, color: Colors.text },
  statRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  noteBox: { flexDirection: 'row', gap: 8, backgroundColor: Colors.background, borderRadius: BorderRadius.sm, padding: Spacing.sm },
  noteText: { ...Typography.caption, color: Colors.textSecondary, flex: 1 },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  eventTypeBadge: { width: 44, height: 44, borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center' },
  eventInfo: { flex: 1 },
  eventTitle: { ...Typography.body2, fontWeight: '600', color: Colors.text },
  eventDate: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
});

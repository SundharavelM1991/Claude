import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MOCK_DAILY_REPORTS } from '../../data/mockData';
import { ReportsStackParamList } from '../../navigation/MainNavigator';

type RouteProps = RouteProp<ReportsStackParamList, 'ReportDetail'>;

const MOOD_MAP: Record<string, { emoji: string; label: string; color: string }> = {
  happy: { emoji: '😊', label: 'Happy', color: Colors.success },
  sad: { emoji: '😢', label: 'Sad', color: Colors.info },
  neutral: { emoji: '😐', label: 'Calm', color: Colors.textSecondary },
  excited: { emoji: '🤩', label: 'Excited', color: Colors.secondary },
  tired: { emoji: '😴', label: 'Tired', color: Colors.warning },
};

const MEAL_ICONS: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  snack: '🍎',
  dinner: '🌙',
};

const CONSUMED_COLORS: Record<string, string> = {
  all: Colors.success,
  most: Colors.info,
  some: Colors.warning,
  none: Colors.error,
};

export default function ReportDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const report = MOCK_DAILY_REPORTS.find(r => r.id === route.params.reportId);

  if (!report) return null;

  const mood = MOOD_MAP[report.mood];
  const date = new Date(report.date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Daily Report</Text>
          <Text style={styles.headerDate}>{date}</Text>
        </View>
        <View style={styles.moodDisplay}>
          <Text style={{ fontSize: 28 }}>{mood.emoji}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.teacherBanner}>
          <Ionicons name="person-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.teacherText}>Report by {report.teacherName}</Text>
        </View>

        <Section title="Teacher's Notes" icon="chatbubble-ellipses-outline">
          <Text style={styles.notesText}>{report.notes}</Text>
        </Section>

        <Section title="Meals" icon="restaurant-outline">
          {report.meals.map((meal, i) => (
            <View key={i} style={[styles.mealRow, i > 0 && styles.divider]}>
              <Text style={styles.mealIcon}>{MEAL_ICONS[meal.type]}</Text>
              <View style={styles.mealInfo}>
                <Text style={styles.mealType}>{meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <Text style={styles.mealItems}>{meal.items.join(', ')}</Text>
              </View>
              <View style={[styles.consumedBadge, { backgroundColor: CONSUMED_COLORS[meal.consumed] + '20' }]}>
                <Text style={[styles.consumedText, { color: CONSUMED_COLORS[meal.consumed] }]}>
                  {meal.consumed.charAt(0).toUpperCase() + meal.consumed.slice(1)}
                </Text>
              </View>
            </View>
          ))}
        </Section>

        <Section title="Nap Time" icon="moon-outline">
          {report.naps.length > 0 ? report.naps.map((nap, i) => (
            <View key={i} style={styles.napRow}>
              <NapStat label="Start" value={nap.startTime} />
              <Ionicons name="arrow-forward" size={16} color={Colors.textSecondary} />
              <NapStat label="End" value={nap.endTime} />
              <View style={styles.napDuration}>
                <Text style={styles.napDurationText}>{nap.duration} min</Text>
              </View>
            </View>
          )) : (
            <Text style={styles.emptyText}>No nap recorded today</Text>
          )}
        </Section>

        <Section title="Activities" icon="color-palette-outline">
          {report.activities.map((activity, i) => (
            <View key={i} style={styles.activityRow}>
              <View style={styles.activityDot} />
              <Text style={styles.activityText}>{activity}</Text>
            </View>
          ))}
        </Section>

        {report.photos.length > 0 && (
          <Section title={`Photos (${report.photos.length})`} icon="camera-outline">
            <View style={styles.photoGrid}>
              {report.photos.map((uri, i) => (
                <TouchableOpacity key={i} style={styles.photoItem} activeOpacity={0.8}>
                  <Image source={{ uri }} style={styles.photo} />
                </TouchableOpacity>
              ))}
            </View>
          </Section>
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <View style={sectionStyles.container}>
      <View style={sectionStyles.header}>
        <Ionicons name={icon as any} size={18} color={Colors.primary} />
        <Text style={sectionStyles.title}>{title}</Text>
      </View>
      <View style={sectionStyles.content}>{children}</View>
    </View>
  );
}

function NapStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ ...Typography.caption, color: Colors.textSecondary }}>{label}</Text>
      <Text style={{ ...Typography.body2, fontWeight: '600', color: Colors.text }}>{value}</Text>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: { marginHorizontal: Spacing.lg, marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.sm },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider, backgroundColor: Colors.background },
  title: { ...Typography.h4, color: Colors.text },
  content: { padding: Spacing.md },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { marginRight: Spacing.sm },
  headerCenter: { flex: 1 },
  headerTitle: { ...Typography.h4, color: Colors.text },
  headerDate: { ...Typography.caption, color: Colors.textSecondary },
  moodDisplay: {},
  teacherBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary + '10',
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  teacherText: { ...Typography.body2, color: Colors.primary, fontWeight: '500' },
  scroll: { flex: 1 },
  notesText: { ...Typography.body2, color: Colors.text, lineHeight: 22 },
  mealRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.sm },
  divider: { borderTopWidth: 1, borderTopColor: Colors.divider },
  mealIcon: { fontSize: 24 },
  mealInfo: { flex: 1 },
  mealType: { ...Typography.body2, fontWeight: '600', color: Colors.text },
  mealTime: { ...Typography.caption, color: Colors.textSecondary },
  mealItems: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  consumedBadge: { borderRadius: BorderRadius.round, paddingHorizontal: 10, paddingVertical: 4 },
  consumedText: { ...Typography.caption, fontWeight: '600' },
  napRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  napDuration: { backgroundColor: Colors.info + '20', borderRadius: BorderRadius.round, paddingHorizontal: 12, paddingVertical: 4 },
  napDurationText: { ...Typography.label, color: Colors.info, fontWeight: '600' },
  emptyText: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center', paddingVertical: Spacing.md },
  activityRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  activityDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary },
  activityText: { ...Typography.body2, color: Colors.text },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  photoItem: { width: '30%', aspectRatio: 1 },
  photo: { width: '100%', height: '100%', borderRadius: BorderRadius.sm },
});

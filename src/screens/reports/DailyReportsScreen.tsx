import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MOCK_DAILY_REPORTS } from '../../data/mockData';
import { DailyReport } from '../../types';
import { ReportsStackParamList } from '../../navigation/MainNavigator';

type NavProp = NativeStackNavigationProp<ReportsStackParamList>;

const MOOD_MAP: Record<string, { emoji: string; label: string; color: string }> = {
  happy: { emoji: '😊', label: 'Happy', color: Colors.success },
  sad: { emoji: '😢', label: 'Sad', color: Colors.info },
  neutral: { emoji: '😐', label: 'Calm', color: Colors.textSecondary },
  excited: { emoji: '🤩', label: 'Excited', color: Colors.secondary },
  tired: { emoji: '😴', label: 'Tired', color: Colors.warning },
};

export default function DailyReportsScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Reports</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Gallery')} style={styles.galleryBtn}>
          <Ionicons name="images-outline" size={22} color={Colors.primary} />
          <Text style={styles.galleryBtnText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {MOCK_DAILY_REPORTS.map((report, index) => (
          <ReportCard key={report.id} report={report} isLatest={index === 0} onPress={() => navigation.navigate('ReportDetail', { reportId: report.id })} />
        ))}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ReportCard({ report, isLatest, onPress }: { report: DailyReport; isLatest: boolean; onPress: () => void }) {
  const mood = MOOD_MAP[report.mood];
  const date = new Date(report.date);
  const isToday = report.date === new Date().toISOString().split('T')[0];

  return (
    <TouchableOpacity style={[styles.card, isLatest && styles.cardLatest]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View>
          <View style={styles.dateBadgeRow}>
            {isToday && <View style={styles.todayBadge}><Text style={styles.todayBadgeText}>TODAY</Text></View>}
            <Text style={styles.dateText}>
              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>
          <Text style={styles.teacherText}>By {report.teacherName}</Text>
        </View>
        <View style={styles.moodBadge}>
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          <Text style={[styles.moodLabel, { color: mood.color }]}>{mood.label}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <MiniStat icon="restaurant-outline" label="Meals" value={`${report.meals.length} meals`} />
        <MiniStat icon="moon-outline" label="Nap" value={report.naps.length ? `${report.naps[0].duration}m` : 'None'} />
        <MiniStat icon="color-palette-outline" label="Activities" value={`${report.activities.length}`} />
        {report.photos.length > 0 && <MiniStat icon="camera-outline" label="Photos" value={`${report.photos.length}`} />}
      </View>

      {report.photos.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoStrip}>
          {report.photos.slice(0, 4).map((uri, i) => (
            <Image key={i} source={{ uri }} style={styles.photo} />
          ))}
        </ScrollView>
      )}

      <Text style={styles.notePreview} numberOfLines={2}>{report.notes}</Text>

      <View style={styles.cardFooter}>
        <Text style={styles.viewMore}>View Full Report</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

function MiniStat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={miniStyles.container}>
      <Ionicons name={icon as any} size={14} color={Colors.textSecondary} />
      <Text style={miniStyles.value}>{value}</Text>
      <Text style={miniStyles.label}>{label}</Text>
    </View>
  );
}

const miniStyles = StyleSheet.create({
  container: { alignItems: 'center', gap: 2 },
  value: { ...Typography.label, color: Colors.text, fontWeight: '600' },
  label: { ...Typography.caption, color: Colors.textSecondary },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: { ...Typography.h3, color: Colors.text },
  galleryBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  galleryBtnText: { ...Typography.label, color: Colors.primary },
  scroll: { flex: 1, padding: Spacing.lg },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  cardLatest: { borderWidth: 2, borderColor: Colors.primary + '40' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  dateBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  todayBadge: { backgroundColor: Colors.primary, borderRadius: BorderRadius.round, paddingHorizontal: 8, paddingVertical: 2 },
  todayBadgeText: { ...Typography.caption, color: Colors.textInverse, fontWeight: '700', fontSize: 10 },
  dateText: { ...Typography.body2, fontWeight: '600', color: Colors.text },
  teacherText: { ...Typography.caption, color: Colors.textSecondary },
  moodBadge: { alignItems: 'center' },
  moodEmoji: { fontSize: 28 },
  moodLabel: { ...Typography.caption, fontWeight: '600', marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.background, borderRadius: BorderRadius.md, padding: Spacing.sm, marginBottom: Spacing.md },
  photoStrip: { marginBottom: Spacing.md },
  photo: { width: 72, height: 72, borderRadius: BorderRadius.sm, marginRight: Spacing.sm },
  notePreview: { ...Typography.body2, color: Colors.textSecondary, marginBottom: Spacing.md },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  viewMore: { ...Typography.label, color: Colors.primary },
});

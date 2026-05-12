import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MOCK_ATTENDANCE } from '../../data/mockData';
import { AttendanceRecord } from '../../types';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  present: { label: 'Present', color: Colors.success, icon: 'checkmark-circle' },
  absent: { label: 'Absent', color: Colors.error, icon: 'close-circle' },
  late: { label: 'Late', color: Colors.warning, icon: 'time' },
  'early-pickup': { label: 'Early Pickup', color: Colors.info, icon: 'exit' },
};

export default function AttendanceScreen() {
  const navigation = useNavigation();
  const [selectedMonth] = useState('May 2026');

  const presentDays = MOCK_ATTENDANCE.filter(a => a.status === 'present').length;
  const absentDays = MOCK_ATTENDANCE.filter(a => a.status === 'absent').length;
  const lateDays = MOCK_ATTENDANCE.filter(a => a.status === 'late').length;
  const totalDays = MOCK_ATTENDANCE.length;
  const attendanceRate = Math.round((presentDays / totalDays) * 100);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Attendance</Text>
        <TouchableOpacity style={styles.monthBtn}>
          <Text style={styles.monthText}>{selectedMonth}</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.rateCard}>
          <View style={styles.rateCircle}>
            <Text style={styles.rateNumber}>{attendanceRate}%</Text>
            <Text style={styles.rateLabel}>Attendance Rate</Text>
          </View>
          <View style={styles.rateDivider} />
          <View style={styles.rateStats}>
            <RateStat value={presentDays} label="Present" color={Colors.success} />
            <RateStat value={absentDays} label="Absent" color={Colors.error} />
            <RateStat value={lateDays} label="Late" color={Colors.warning} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Attendance Log</Text>
        {MOCK_ATTENDANCE.map(record => (
          <AttendanceRow key={record.id} record={record} />
        ))}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function RateStat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <View style={rateStatStyles.container}>
      <Text style={[rateStatStyles.value, { color }]}>{value}</Text>
      <Text style={rateStatStyles.label}>{label}</Text>
    </View>
  );
}

const rateStatStyles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1 },
  value: { ...Typography.h2 },
  label: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
});

function AttendanceRow({ record }: { record: AttendanceRecord }) {
  const config = STATUS_CONFIG[record.status];
  const date = new Date(record.date);

  return (
    <View style={rowStyles.row}>
      <View style={rowStyles.dateBox}>
        <Text style={rowStyles.dayNum}>{date.getDate()}</Text>
        <Text style={rowStyles.dayName}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
      </View>

      <View style={rowStyles.info}>
        <View style={[rowStyles.statusBadge, { backgroundColor: config.color + '15' }]}>
          <Ionicons name={config.icon as any} size={14} color={config.color} />
          <Text style={[rowStyles.statusText, { color: config.color }]}>{config.label}</Text>
        </View>
        {(record.checkIn || record.checkOut) && (
          <View style={rowStyles.timeRow}>
            {record.checkIn && (
              <View style={rowStyles.timeItem}>
                <Ionicons name="log-in-outline" size={12} color={Colors.textSecondary} />
                <Text style={rowStyles.timeText}>{record.checkIn}</Text>
              </View>
            )}
            {record.checkOut && (
              <View style={rowStyles.timeItem}>
                <Ionicons name="log-out-outline" size={12} color={Colors.textSecondary} />
                <Text style={rowStyles.timeText}>{record.checkOut}</Text>
              </View>
            )}
          </View>
        )}
        {record.notes && <Text style={rowStyles.notes}>{record.notes}</Text>}
      </View>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  dateBox: { alignItems: 'center', minWidth: 36 },
  dayNum: { ...Typography.h3, color: Colors.text },
  dayName: { ...Typography.caption, color: Colors.textSecondary },
  info: { flex: 1, gap: 6 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', borderRadius: BorderRadius.round, paddingHorizontal: 8, paddingVertical: 4 },
  statusText: { ...Typography.caption, fontWeight: '600' },
  timeRow: { flexDirection: 'row', gap: Spacing.md },
  timeItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { ...Typography.caption, color: Colors.textSecondary },
  notes: { ...Typography.caption, color: Colors.textSecondary, fontStyle: 'italic' },
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
  title: { ...Typography.h3, color: Colors.text, flex: 1 },
  monthBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  monthText: { ...Typography.label, color: Colors.primary },
  scroll: { flex: 1 },
  rateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadow.md,
  },
  rateCircle: { alignItems: 'center' },
  rateNumber: { ...Typography.h1, color: Colors.primary },
  rateLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 4 },
  rateDivider: { width: 1, height: 60, backgroundColor: Colors.border, marginHorizontal: Spacing.lg },
  rateStats: { flex: 1, flexDirection: 'row' },
  sectionTitle: { ...Typography.h4, color: Colors.text, paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
});

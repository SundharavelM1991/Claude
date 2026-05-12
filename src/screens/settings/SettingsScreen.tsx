import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MoreStackParamList } from '../../navigation/MainNavigator';

type NavProp = NativeStackNavigationProp<MoreStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavProp>();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    dailyReport: true,
    messages: true,
    billing: true,
    attendance: true,
    events: false,
  });

  function handleLogout() {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitial}>{user?.name?.[0] ?? 'P'}</Text>
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <Text style={styles.profileRole}>{user?.relationship ? user.relationship.charAt(0).toUpperCase() + user.relationship.slice(1) : ''}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="create-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <SettingsGroup title="Account">
          <SettingsRow icon="person-outline" label="Edit Profile" onPress={() => {}} />
          <SettingsRow icon="lock-closed-outline" label="Change Password" onPress={() => {}} />
          <SettingsRow icon="call-outline" label="Contact Information" onPress={() => {}} />
        </SettingsGroup>

        <SettingsGroup title="Children">
          <SettingsRow icon="people-outline" label="Manage Children" onPress={() => {}} />
          <SettingsRow icon="time-outline" label="View Attendance" onPress={() => navigation.navigate('Attendance')} />
        </SettingsGroup>

        <SettingsGroup title="Notifications">
          <NotifToggle
            label="Daily Reports"
            description="When your child's report is ready"
            value={notifications.dailyReport}
            onChange={v => setNotifications(n => ({ ...n, dailyReport: v }))}
          />
          <NotifToggle
            label="Messages"
            description="New messages from teachers"
            value={notifications.messages}
            onChange={v => setNotifications(n => ({ ...n, messages: v }))}
          />
          <NotifToggle
            label="Billing"
            description="Invoice and payment reminders"
            value={notifications.billing}
            onChange={v => setNotifications(n => ({ ...n, billing: v }))}
          />
          <NotifToggle
            label="Attendance"
            description="Check-in / check-out alerts"
            value={notifications.attendance}
            onChange={v => setNotifications(n => ({ ...n, attendance: v }))}
          />
          <NotifToggle
            label="Events"
            description="Upcoming center events"
            value={notifications.events}
            onChange={v => setNotifications(n => ({ ...n, events: v }))}
          />
        </SettingsGroup>

        <SettingsGroup title="Support">
          <SettingsRow icon="help-circle-outline" label="Help Center" onPress={() => {}} />
          <SettingsRow icon="chatbubble-ellipses-outline" label="Contact Support" onPress={() => {}} />
          <SettingsRow icon="document-text-outline" label="Privacy Policy" onPress={() => {}} />
          <SettingsRow icon="shield-checkmark-outline" label="Terms of Service" onPress={() => {}} />
        </SettingsGroup>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>KidConnect v1.0.0</Text>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={groupStyles.container}>
      <Text style={groupStyles.title}>{title}</Text>
      <View style={groupStyles.card}>{children}</View>
    </View>
  );
}

const groupStyles = StyleSheet.create({
  container: { marginBottom: Spacing.md, paddingHorizontal: Spacing.lg },
  title: { ...Typography.label, color: Colors.textSecondary, marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.sm },
});

function SettingsRow({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={rowStyles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={rowStyles.iconBg}>
        <Ionicons name={icon as any} size={18} color={Colors.primary} />
      </View>
      <Text style={rowStyles.label}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
}

const rowStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.divider, gap: Spacing.md },
  iconBg: { width: 32, height: 32, borderRadius: BorderRadius.sm, backgroundColor: Colors.primary + '15', alignItems: 'center', justifyContent: 'center' },
  label: { ...Typography.body2, color: Colors.text, flex: 1 },
});

function NotifToggle({ label, description, value, onChange }: {
  label: string; description: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <View style={[rowStyles.row, { alignItems: 'flex-start', gap: Spacing.md }]}>
      <View style={[rowStyles.iconBg, { marginTop: 4 }]}>
        <Ionicons name="notifications-outline" size={18} color={Colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={rowStyles.label}>{label}</Text>
        <Text style={{ ...Typography.caption, color: Colors.textSecondary }}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: Colors.border, true: Colors.primaryLight }}
        thumbColor={value ? Colors.primary : Colors.textLight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: { ...Typography.h3, color: Colors.text },
  scroll: { flex: 1 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.md,
  },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  avatarFallback: { backgroundColor: Colors.primary + '20', alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { ...Typography.h2, color: Colors.primary },
  profileInfo: { flex: 1 },
  profileName: { ...Typography.h4, color: Colors.text },
  profileEmail: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  profileRole: { ...Typography.caption, color: Colors.primary, marginTop: 2, fontWeight: '500' },
  editBtn: { padding: 8 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.error + '10',
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.error + '30',
  },
  logoutText: { ...Typography.button, color: Colors.error },
  version: { ...Typography.caption, color: Colors.textLight, textAlign: 'center', marginTop: Spacing.md },
});

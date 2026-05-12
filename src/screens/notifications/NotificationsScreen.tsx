import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MOCK_NOTIFICATIONS } from '../../data/mockData';
import { Notification } from '../../types';

const TYPE_CONFIG: Record<string, { icon: string; color: string }> = {
  message: { icon: 'chatbubble', color: Colors.primary },
  report: { icon: 'document-text', color: Colors.success },
  billing: { icon: 'card', color: Colors.warning },
  attendance: { icon: 'time', color: Colors.info },
  alert: { icon: 'warning', color: Colors.error },
  event: { icon: 'calendar', color: Colors.secondary },
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  function markAllRead() {
    setNotifications(n => n.map(item => ({ ...item, isRead: true })));
  }

  function markRead(id: string) {
    setNotifications(n => n.map(item => item.id === id ? { ...item, isRead: true } : item));
  }

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markAll}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Text style={styles.unreadText}>{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</Text>
        </View>
      )}

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <NotificationItem notification={item} timeStr={formatTime(item.timestamp)} onPress={() => markRead(item.id)} />
        )}
      />
    </SafeAreaView>
  );
}

function NotificationItem({ notification, timeStr, onPress }: {
  notification: Notification; timeStr: string; onPress: () => void;
}) {
  const config = TYPE_CONFIG[notification.type];
  return (
    <TouchableOpacity
      style={[styles.item, !notification.isRead && styles.itemUnread]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBg, { backgroundColor: config.color + '15' }]}>
        <Ionicons name={config.icon as any} size={22} color={config.color} />
      </View>
      <View style={styles.itemContent}>
        <View style={styles.itemTop}>
          <Text style={[styles.itemTitle, !notification.isRead && styles.itemTitleBold]}>{notification.title}</Text>
          {!notification.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.itemBody} numberOfLines={2}>{notification.body}</Text>
        <Text style={styles.itemTime}>{timeStr}</Text>
      </View>
    </TouchableOpacity>
  );
}

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
  markAll: { ...Typography.label, color: Colors.primary },
  unreadBanner: { backgroundColor: Colors.primary + '10', padding: Spacing.sm, paddingHorizontal: Spacing.lg },
  unreadText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  list: { padding: Spacing.lg, gap: Spacing.sm },
  item: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  itemUnread: { borderLeftWidth: 3, borderLeftColor: Colors.primary },
  iconBg: { width: 44, height: 44, borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center' },
  itemContent: { flex: 1 },
  itemTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  itemTitle: { ...Typography.body2, color: Colors.text, flex: 1 },
  itemTitleBold: { fontWeight: '700' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginLeft: 8 },
  itemBody: { ...Typography.caption, color: Colors.textSecondary, marginBottom: 4, lineHeight: 18 },
  itemTime: { ...Typography.caption, color: Colors.textLight },
});

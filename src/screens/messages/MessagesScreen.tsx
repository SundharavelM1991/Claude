import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MOCK_CONVERSATIONS } from '../../data/mockData';
import { Conversation } from '../../types';
import { MessagesStackParamList } from '../../navigation/MainNavigator';

type NavProp = NativeStackNavigationProp<MessagesStackParamList>;

export default function MessagesScreen() {
  const navigation = useNavigation<NavProp>();

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.composeBtn}>
          <Ionicons name="create-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ConversationCard
            conversation={item}
            timeStr={formatTime(item.lastMessageTime)}
            onPress={() => navigation.navigate('Chat', { conversationId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="chatbubbles-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyText}>No messages yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function ConversationCard({ conversation, timeStr, onPress }: {
  conversation: Conversation; timeStr: string; onPress: () => void;
}) {
  const hasUnread = conversation.unreadCount > 0;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        {conversation.participantAvatar ? (
          <Image source={{ uri: conversation.participantAvatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarInitial}>{conversation.participantName[0]}</Text>
          </View>
        )}
        <View style={styles.onlineDot} />
      </View>

      <View style={styles.info}>
        <View style={styles.infoTop}>
          <Text style={[styles.name, hasUnread && styles.nameBold]}>{conversation.participantName}</Text>
          <Text style={styles.time}>{timeStr}</Text>
        </View>
        <Text style={styles.role}>{conversation.participantRole}</Text>
        <Text style={[styles.lastMessage, hasUnread && styles.lastMessageBold]} numberOfLines={1}>
          {conversation.lastMessage}
        </Text>
      </View>

      {hasUnread && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{conversation.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

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
  composeBtn: { padding: 4 },
  list: { padding: Spacing.lg, gap: Spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  avatarContainer: { position: 'relative' },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  avatarFallback: { backgroundColor: Colors.primary + '20', alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { ...Typography.h3, color: Colors.primary },
  onlineDot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.success, borderWidth: 2, borderColor: Colors.surface },
  info: { flex: 1 },
  infoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  name: { ...Typography.body2, color: Colors.text },
  nameBold: { fontWeight: '700' },
  role: { ...Typography.caption, color: Colors.textSecondary, marginBottom: 4 },
  lastMessage: { ...Typography.caption, color: Colors.textSecondary },
  lastMessageBold: { color: Colors.text, fontWeight: '600' },
  time: { ...Typography.caption, color: Colors.textSecondary },
  badge: { minWidth: 22, height: 22, borderRadius: 11, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { ...Typography.caption, color: Colors.textInverse, fontWeight: '700', fontSize: 11 },
  empty: { alignItems: 'center', paddingTop: 80, gap: Spacing.md },
  emptyText: { ...Typography.body1, color: Colors.textLight },
});

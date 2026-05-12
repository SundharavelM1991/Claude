import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius } from '../../theme';
import { MOCK_CONVERSATIONS } from '../../data/mockData';
import { Message } from '../../types';
import { MessagesStackParamList } from '../../navigation/MainNavigator';

type RouteProps = RouteProp<MessagesStackParamList, 'Chat'>;

export default function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const conversation = MOCK_CONVERSATIONS.find(c => c.id === route.params.conversationId);
  const [messages, setMessages] = useState<Message[]>(conversation?.messages ?? []);
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  if (!conversation) return null;

  function sendMessage() {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: 'user_1',
      senderName: 'Sarah Johnson',
      content: text.trim(),
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setText('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }

  function formatTime(timestamp: string) {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function formatDateGroup(timestamp: string) {
    const date = new Date(timestamp);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        {conversation.participantAvatar && (
          <Image source={{ uri: conversation.participantAvatar }} style={styles.headerAvatar} />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{conversation.participantName}</Text>
          <Text style={styles.headerRole}>{conversation.participantRole}</Text>
        </View>
        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          renderItem={({ item, index }) => {
            const isMe = item.senderId === 'user_1';
            const showDate = index === 0 || formatDateGroup(messages[index - 1].timestamp) !== formatDateGroup(item.timestamp);
            return (
              <>
                {showDate && (
                  <View style={styles.dateGroup}>
                    <Text style={styles.dateGroupText}>{formatDateGroup(item.timestamp)}</Text>
                  </View>
                )}
                <View style={[styles.messageRow, isMe && styles.messageRowMe]}>
                  {!isMe && conversation.participantAvatar && (
                    <Image source={{ uri: conversation.participantAvatar }} style={styles.msgAvatar} />
                  )}
                  <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
                    <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{item.content}</Text>
                    <Text style={[styles.bubbleTime, isMe && styles.bubbleTimeMe]}>{formatTime(item.timestamp)}</Text>
                  </View>
                </View>
              </>
            );
          }}
        />

        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="attach-outline" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textLight}
            value={text}
            onChangeText={setText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!text.trim()}
          >
            <Ionicons name="send" size={20} color={text.trim() ? Colors.textInverse : Colors.textLight} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  backBtn: { marginRight: 4 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20 },
  headerInfo: { flex: 1 },
  headerName: { ...Typography.body2, fontWeight: '600', color: Colors.text },
  headerRole: { ...Typography.caption, color: Colors.textSecondary },
  callBtn: { padding: 4 },
  messageList: { padding: Spacing.lg, gap: 4 },
  dateGroup: { alignItems: 'center', paddingVertical: Spacing.sm },
  dateGroupText: { ...Typography.caption, color: Colors.textSecondary, backgroundColor: Colors.surfaceAlt, paddingHorizontal: 12, paddingVertical: 4, borderRadius: BorderRadius.round },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4, gap: 8 },
  messageRowMe: { justifyContent: 'flex-end' },
  msgAvatar: { width: 28, height: 28, borderRadius: 14 },
  bubble: { maxWidth: '75%', borderRadius: BorderRadius.lg, padding: Spacing.sm, paddingHorizontal: Spacing.md },
  bubbleMe: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: Colors.surface, borderBottomLeftRadius: 4 },
  bubbleText: { ...Typography.body2, color: Colors.text },
  bubbleTextMe: { color: Colors.textInverse },
  bubbleTime: { ...Typography.caption, color: Colors.textLight, marginTop: 2, textAlign: 'right' },
  bubbleTimeMe: { color: 'rgba(255,255,255,0.7)' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 8,
  },
  attachBtn: { padding: 8 },
  input: {
    flex: 1,
    ...Typography.body2,
    color: Colors.text,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.round,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: Colors.border },
});

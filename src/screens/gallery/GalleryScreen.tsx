import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius } from '../../theme';
import { MOCK_GALLERY } from '../../data/mockData';
import { GalleryPhoto } from '../../types';

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - Spacing.lg * 2 - Spacing.sm * 2) / 3;

export default function GalleryScreen() {
  const navigation = useNavigation();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeTag, setActiveTag] = useState<string>('all');

  const allTags = ['all', ...Array.from(new Set(MOCK_GALLERY.flatMap(p => p.tags)))];
  const filtered = activeTag === 'all' ? MOCK_GALLERY : MOCK_GALLERY.filter(p => p.tags.includes(activeTag));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Photo Gallery</Text>
        <Text style={styles.count}>{filtered.length} photos</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagScroll} contentContainerStyle={styles.tagContent}>
        {allTags.map(tag => (
          <TouchableOpacity
            key={tag}
            style={[styles.tag, activeTag === tag && styles.tagActive]}
            onPress={() => setActiveTag(tag)}
          >
            <Text style={[styles.tagText, activeTag === tag && styles.tagTextActive]}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        numColumns={3}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.photoItem} onPress={() => setSelectedPhoto(item)} activeOpacity={0.85}>
            <Image source={{ uri: item.thumbnail }} style={styles.photo} />
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.row}
      />

      <Modal visible={!!selectedPhoto} animationType="fade" statusBarTranslucent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setSelectedPhoto(null)}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          {selectedPhoto && (
            <>
              <Image source={{ uri: selectedPhoto.url }} style={styles.fullPhoto} resizeMode="contain" />
              <View style={styles.modalInfo}>
                {selectedPhoto.caption ? (
                  <Text style={styles.modalCaption}>{selectedPhoto.caption}</Text>
                ) : null}
                <Text style={styles.modalDate}>
                  {new Date(selectedPhoto.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Text>
                <Text style={styles.modalUploader}>By {selectedPhoto.uploadedBy}</Text>
                <View style={styles.modalTags}>
                  {selectedPhoto.tags.map(t => (
                    <View key={t} style={styles.modalTag}>
                      <Text style={styles.modalTagText}>#{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
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
  count: { ...Typography.body2, color: Colors.textSecondary },
  tagScroll: { maxHeight: 48, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tagContent: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, gap: Spacing.sm },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tagText: { ...Typography.label, color: Colors.textSecondary },
  tagTextActive: { color: Colors.textInverse },
  grid: { padding: Spacing.lg, gap: Spacing.sm },
  row: { gap: Spacing.sm },
  photoItem: { width: PHOTO_SIZE, height: PHOTO_SIZE, borderRadius: BorderRadius.sm, overflow: 'hidden' },
  photo: { width: '100%', height: '100%' },
  modalContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  modalClose: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 8 },
  fullPhoto: { width: '100%', height: '70%' },
  modalInfo: { padding: Spacing.lg },
  modalCaption: { ...Typography.h4, color: '#fff', marginBottom: 4 },
  modalDate: { ...Typography.body2, color: 'rgba(255,255,255,0.7)' },
  modalUploader: { ...Typography.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  modalTags: { flexDirection: 'row', gap: 8, marginTop: Spacing.sm },
  modalTag: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: BorderRadius.round, paddingHorizontal: 10, paddingVertical: 4 },
  modalTagText: { ...Typography.caption, color: 'rgba(255,255,255,0.8)' },
});

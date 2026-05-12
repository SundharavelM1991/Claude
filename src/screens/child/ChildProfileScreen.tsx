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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

export default function ChildProfileScreen() {
  const navigation = useNavigation();
  const { selectedChild } = useAuth();

  if (!selectedChild) return null;

  const age = selectedChild.age;
  const dob = new Date(selectedChild.dateOfBirth).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.textInverse} />
          </TouchableOpacity>
          <View style={styles.profileHeader}>
            <Image source={{ uri: selectedChild.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{selectedChild.name}</Text>
            <Text style={styles.ageText}>{age} years old · {selectedChild.classroom}</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <InfoCard title="Enrollment Information" icon="school-outline">
            <InfoRow label="Classroom" value={selectedChild.classroom} />
            <InfoRow label="Lead Teacher" value={selectedChild.teacher} />
            <InfoRow label="Date of Birth" value={dob} />
            <InfoRow label="Enrolled Since" value={new Date(selectedChild.enrollmentDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} />
          </InfoCard>

          <InfoCard title="Health & Allergies" icon="medical-outline" accentColor={Colors.error}>
            {selectedChild.allergies.length > 0 ? (
              <View>
                <Text style={styles.allergyLabel}>Allergies</Text>
                <View style={styles.tagRow}>
                  {selectedChild.allergies.map(a => (
                    <View key={a} style={styles.allergyTag}>
                      <Ionicons name="warning-outline" size={12} color={Colors.error} />
                      <Text style={styles.allergyText}>{a}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.noAllergies}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                <Text style={styles.noAllergiesText}>No known allergies</Text>
              </View>
            )}
            {selectedChild.medicalNotes ? (
              <View style={styles.medicalNoteBox}>
                <Text style={styles.medicalNoteLabel}>Medical Notes</Text>
                <Text style={styles.medicalNoteText}>{selectedChild.medicalNotes}</Text>
              </View>
            ) : null}
          </InfoCard>

          <InfoCard title="Emergency Contacts" icon="call-outline" accentColor={Colors.warning}>
            {selectedChild.emergencyContacts.map((contact, i) => (
              <View key={i} style={[styles.contactItem, i > 0 && styles.contactDivider]}>
                <View style={styles.contactAvatar}>
                  <Text style={styles.contactInitial}>{contact.name[0]}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRelation}>{contact.relationship}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
                <TouchableOpacity style={styles.callBtn}>
                  <Ionicons name="call" size={18} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </InfoCard>

          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Ionicons name="create-outline" size={20} color={Colors.textInverse} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <View style={{ height: Spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoCard({ title, icon, accentColor = Colors.primary, children }: {
  title: string; icon: string; accentColor?: string; children: React.ReactNode;
}) {
  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.header}>
        <View style={[cardStyles.iconBg, { backgroundColor: accentColor + '15' }]}>
          <Ionicons name={icon as any} size={18} color={accentColor} />
        </View>
        <Text style={cardStyles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={rowStyles.row}>
      <Text style={rowStyles.label}>{label}</Text>
      <Text style={rowStyles.value}>{value}</Text>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, ...Shadow.sm, marginBottom: Spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: Spacing.md },
  iconBg: { width: 32, height: 32, borderRadius: BorderRadius.sm, alignItems: 'center', justifyContent: 'center' },
  title: { ...Typography.h4, color: Colors.text },
});

const rowStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  label: { ...Typography.body2, color: Colors.textSecondary },
  value: { ...Typography.body2, color: Colors.text, fontWeight: '500', maxWidth: '60%', textAlign: 'right' },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerGradient: { paddingTop: Spacing.md, paddingBottom: Spacing.xl + 16 },
  backBtn: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  profileHeader: { alignItems: 'center', paddingHorizontal: Spacing.lg },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: Colors.surface, marginBottom: Spacing.md },
  name: { ...Typography.h2, color: Colors.textInverse },
  ageText: { ...Typography.body2, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  content: { marginTop: -20, padding: Spacing.lg },
  allergyLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 8 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  allergyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.error + '15',
    borderRadius: BorderRadius.round,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  allergyText: { ...Typography.caption, color: Colors.error, fontWeight: '600' },
  noAllergies: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  noAllergiesText: { ...Typography.body2, color: Colors.success },
  medicalNoteBox: { marginTop: Spacing.md, backgroundColor: Colors.warning + '10', borderRadius: BorderRadius.sm, padding: Spacing.sm },
  medicalNoteLabel: { ...Typography.label, color: Colors.warning, marginBottom: 4 },
  medicalNoteText: { ...Typography.body2, color: Colors.text },
  contactItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.md },
  contactDivider: { borderTopWidth: 1, borderTopColor: Colors.divider },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInitial: { ...Typography.h4, color: Colors.primary },
  contactInfo: { flex: 1 },
  contactName: { ...Typography.body2, fontWeight: '600', color: Colors.text },
  contactRelation: { ...Typography.caption, color: Colors.textSecondary },
  contactPhone: { ...Typography.caption, color: Colors.primary, marginTop: 2 },
  callBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary + '15', alignItems: 'center', justifyContent: 'center' },
  editButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.sm,
  },
  editButtonText: { ...Typography.button, color: Colors.textInverse },
});

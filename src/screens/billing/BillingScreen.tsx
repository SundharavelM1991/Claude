import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MOCK_INVOICES } from '../../data/mockData';
import { Invoice } from '../../types';
import { BillingStackParamList } from '../../navigation/MainNavigator';

type NavProp = NativeStackNavigationProp<BillingStackParamList>;

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: 'Paid', color: Colors.success, bg: Colors.success + '15' },
  pending: { label: 'Due', color: Colors.warning, bg: Colors.warning + '15' },
  overdue: { label: 'Overdue', color: Colors.error, bg: Colors.error + '15' },
};

export default function BillingScreen() {
  const navigation = useNavigation<NavProp>();

  const pending = MOCK_INVOICES.find(i => i.status === 'pending');
  const totalPaidYTD = MOCK_INVOICES.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Billing</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {pending && (
          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.pendingBanner}>
            <View style={styles.pendingInfo}>
              <Text style={styles.pendingLabel}>Amount Due</Text>
              <Text style={styles.pendingAmount}>${pending.total.toLocaleString()}</Text>
              <Text style={styles.pendingDue}>Due by {new Date(pending.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Text>
            </View>
            <TouchableOpacity
              style={styles.payNowBtn}
              onPress={() => navigation.navigate('InvoiceDetail', { invoiceId: pending.id })}
            >
              <Text style={styles.payNowText}>Pay Now</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </LinearGradient>
        )}

        <View style={styles.summaryRow}>
          <SummaryCard icon="checkmark-circle-outline" label="Paid YTD" value={`$${totalPaidYTD.toLocaleString()}`} color={Colors.success} />
          <SummaryCard icon="time-outline" label="Pending" value={pending ? `$${pending.total.toLocaleString()}` : '$0'} color={Colors.warning} />
        </View>

        <Text style={styles.sectionTitle}>Invoice History</Text>
        {MOCK_INVOICES.map(invoice => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onPress={() => navigation.navigate('InvoiceDetail', { invoiceId: invoice.id })}
          />
        ))}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <View style={[summaryStyles.card, { borderLeftColor: color }]}>
      <Ionicons name={icon as any} size={20} color={color} />
      <Text style={summaryStyles.value}>{value}</Text>
      <Text style={summaryStyles.label}>{label}</Text>
    </View>
  );
}

const summaryStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
    gap: 4,
    ...Shadow.sm,
  },
  value: { ...Typography.h3, color: Colors.text },
  label: { ...Typography.caption, color: Colors.textSecondary },
});

function InvoiceCard({ invoice, onPress }: { invoice: Invoice; onPress: () => void }) {
  const status = STATUS_CONFIG[invoice.status];
  return (
    <TouchableOpacity style={invoiceStyles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={invoiceStyles.left}>
        <Text style={invoiceStyles.number}>{invoice.invoiceNumber}</Text>
        <Text style={invoiceStyles.period}>{invoice.period}</Text>
        <Text style={invoiceStyles.date}>
          {invoice.status === 'paid' && invoice.paidDate
            ? `Paid ${new Date(invoice.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
            : `Due ${new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
          }
        </Text>
      </View>
      <View style={invoiceStyles.right}>
        <Text style={invoiceStyles.amount}>${invoice.total.toLocaleString()}</Text>
        <View style={[invoiceStyles.badge, { backgroundColor: status.bg }]}>
          <Text style={[invoiceStyles.badgeText, { color: status.color }]}>{status.label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

const invoiceStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  left: {},
  number: { ...Typography.label, color: Colors.textSecondary },
  period: { ...Typography.body2, fontWeight: '600', color: Colors.text },
  date: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  amount: { ...Typography.h4, color: Colors.text },
  badge: { borderRadius: BorderRadius.round, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { ...Typography.caption, fontWeight: '600' },
});

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
  pendingBanner: { margin: Spacing.lg, borderRadius: BorderRadius.lg, padding: Spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pendingInfo: {},
  pendingLabel: { ...Typography.caption, color: 'rgba(255,255,255,0.8)' },
  pendingAmount: { ...Typography.h1, color: Colors.textInverse },
  pendingDue: { ...Typography.body2, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  payNowBtn: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, paddingVertical: 10, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 6 },
  payNowText: { ...Typography.button, color: Colors.primary },
  summaryRow: { flexDirection: 'row', gap: Spacing.md, paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.h4, color: Colors.text, paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
});

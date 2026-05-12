import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import { MOCK_INVOICES } from '../../data/mockData';
import { BillingStackParamList } from '../../navigation/MainNavigator';

type RouteProps = RouteProp<BillingStackParamList, 'InvoiceDetail'>;

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  paid: { label: 'Paid', color: Colors.success, icon: 'checkmark-circle' },
  pending: { label: 'Payment Due', color: Colors.warning, icon: 'time' },
  overdue: { label: 'Overdue', color: Colors.error, icon: 'alert-circle' },
};

export default function InvoiceDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const invoice = MOCK_INVOICES.find(i => i.id === route.params.invoiceId);

  if (!invoice) return null;

  const status = STATUS_CONFIG[invoice.status];

  function handlePay() {
    Alert.alert(
      'Confirm Payment',
      `Pay $${invoice!.total.toLocaleString()} for ${invoice!.period}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Pay Now', onPress: () => Alert.alert('Success', 'Payment processed successfully!') },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Invoice Detail</Text>
        <TouchableOpacity style={styles.downloadBtn}>
          <Ionicons name="download-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.invoiceCard}>
          <View style={styles.invoiceTop}>
            <View>
              <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
              <Text style={styles.period}>{invoice.period}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: status.color + '15' }]}>
              <Ionicons name={status.icon as any} size={14} color={status.color} />
              <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
            </View>
          </View>

          <View style={styles.datesRow}>
            <DateItem label="Issue Date" value={new Date(invoice.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
            <DateItem label="Due Date" value={new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
            {invoice.paidDate && (
              <DateItem label="Paid Date" value={new Date(invoice.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
            )}
          </View>
        </View>

        <View style={styles.lineItemsCard}>
          <Text style={styles.sectionTitle}>Line Items</Text>
          {invoice.items.map((item, i) => (
            <View key={i} style={[styles.lineItem, i > 0 && styles.lineItemBorder]}>
              <Text style={styles.lineDesc}>{item.description}</Text>
              <View style={styles.lineRight}>
                {item.quantity > 1 && (
                  <Text style={styles.lineQty}>{item.quantity} × ${item.unitPrice}</Text>
                )}
                <Text style={styles.lineTotal}>${item.total.toLocaleString()}</Text>
              </View>
            </View>
          ))}

          <View style={styles.totalsSection}>
            <TotalRow label="Subtotal" value={`$${invoice.subtotal.toLocaleString()}`} />
            <TotalRow label="Tax" value={`$${invoice.tax.toLocaleString()}`} />
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>${invoice.total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {invoice.status !== 'paid' && (
          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            {['Credit / Debit Card', 'Bank Transfer (ACH)', 'PayPal'].map((method, i) => (
              <TouchableOpacity key={i} style={styles.paymentMethod} onPress={handlePay}>
                <Ionicons name={i === 0 ? 'card-outline' : i === 1 ? 'business-outline' : 'logo-paypal'} size={20} color={Colors.primary} />
                <Text style={styles.paymentMethodText}>{method}</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      {invoice.status !== 'paid' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.payButton} onPress={handlePay} activeOpacity={0.8}>
            <Ionicons name="card" size={20} color={Colors.textInverse} />
            <Text style={styles.payButtonText}>Pay ${invoice.total.toLocaleString()}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

function DateItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ ...Typography.caption, color: Colors.textSecondary }}>{label}</Text>
      <Text style={{ ...Typography.label, color: Colors.text, marginTop: 2 }}>{value}</Text>
    </View>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={totalRowStyles.row}>
      <Text style={totalRowStyles.label}>{label}</Text>
      <Text style={totalRowStyles.value}>{value}</Text>
    </View>
  );
}

const totalRowStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  label: { ...Typography.body2, color: Colors.textSecondary },
  value: { ...Typography.body2, color: Colors.text },
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
  downloadBtn: { padding: 4 },
  scroll: { flex: 1 },
  invoiceCard: { margin: Spacing.lg, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, ...Shadow.md },
  invoiceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.lg },
  invoiceNumber: { ...Typography.label, color: Colors.textSecondary },
  period: { ...Typography.h3, color: Colors.text, marginTop: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: BorderRadius.round, paddingHorizontal: 10, paddingVertical: 6 },
  statusText: { ...Typography.label, fontWeight: '600' },
  datesRow: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.divider },
  lineItemsCard: { marginHorizontal: Spacing.lg, marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, ...Shadow.sm },
  sectionTitle: { ...Typography.h4, color: Colors.text, marginBottom: Spacing.md },
  lineItem: { paddingVertical: Spacing.sm },
  lineItemBorder: { borderTopWidth: 1, borderTopColor: Colors.divider },
  lineDesc: { ...Typography.body2, color: Colors.text, marginBottom: 4 },
  lineRight: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lineQty: { ...Typography.caption, color: Colors.textSecondary },
  lineTotal: { ...Typography.body2, fontWeight: '600', color: Colors.text },
  totalsSection: { borderTopWidth: 2, borderTopColor: Colors.border, marginTop: Spacing.md, paddingTop: Spacing.md },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border, marginTop: Spacing.sm },
  grandTotalLabel: { ...Typography.h4, color: Colors.text },
  grandTotalValue: { ...Typography.h3, color: Colors.primary },
  paymentSection: { marginHorizontal: Spacing.lg, marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, ...Shadow.sm },
  paymentMethod: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  paymentMethodText: { ...Typography.body2, color: Colors.text, flex: 1 },
  footer: { padding: Spacing.lg, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border },
  payButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  payButtonText: { ...Typography.button, color: Colors.textInverse },
});

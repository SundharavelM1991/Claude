import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

const PIN_LENGTH = 6;
const NUMPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'del'],
] as const;

export default function LoginScreen({ navigation }: Props) {
  const { login, loginWithPin, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const [pin, setPin] = useState('');
  const [pinLoading, setPinLoading] = useState(false);

  function validateEmail() {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email address';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleEmailLogin() {
    if (!validateEmail()) return;
    try {
      await login(email, password);
    } catch {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  }

  async function handlePinPress(digit: string) {
    if (pin.length >= PIN_LENGTH || pinLoading) return;
    const next = pin + digit;
    setPin(next);
    if (next.length === PIN_LENGTH) {
      setPinLoading(true);
      try {
        await loginWithPin(next);
      } catch {
        Vibration.vibrate(300);
        Alert.alert('Invalid PIN', 'Incorrect PIN. Please try again.');
        setPin('');
      } finally {
        setPinLoading(false);
      }
    }
  }

  function handlePinDelete() {
    setPin(p => p.slice(0, -1));
  }

  function handleBiometric() {
    Alert.alert(
      'Biometric Login',
      'Face ID / Touch ID requires expo-local-authentication. This is a placeholder UI.',
      [{ text: 'OK' }]
    );
  }

  function handleQRScan() {
    Alert.alert(
      'Scan QR Code',
      'QR scanner requires expo-camera or expo-barcode-scanner integration.',
      [{ text: 'OK' }]
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primaryDark, Colors.primary]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Ionicons name="happy-outline" size={36} color="#fff" />
          </View>
          <Text style={styles.appName}>KidConnect</Text>
          <Text style={styles.headerSub}>Parent Portal</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          <ScrollView
            style={styles.sheet}
            contentContainerStyle={styles.sheetContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >

            {/* ─── EMAIL / PASSWORD ─── */}
            <View style={styles.sectionLabel}>
              <Ionicons name="mail-outline" size={14} color={Colors.primary} />
              <Text style={styles.sectionLabelText}>Email & Password</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={[styles.inputRow, errors.email ? styles.inputError : null]}>
                  <Ionicons name="mail-outline" size={18} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    placeholderTextColor={Colors.textLight}
                    value={email}
                    onChangeText={t => { setEmail(t); setErrors(e => ({ ...e, email: undefined })); }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={[styles.inputRow, errors.password ? styles.inputError : null]}>
                  <Ionicons name="lock-closed-outline" size={18} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={Colors.textLight}
                    value={password}
                    onChangeText={t => { setPassword(t); setErrors(e => ({ ...e, password: undefined })); }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={styles.eyeBtn}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={18}
                      color={Colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              </View>

              <TouchableOpacity style={styles.forgotWrap}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnPrimary, isLoading && styles.btnDisabled]}
                onPress={handleEmailLogin}
                disabled={isLoading}
                activeOpacity={0.85}
              >
                {isLoading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.btnPrimaryText}>Sign In</Text>
                }
              </TouchableOpacity>
            </View>

            <View style={styles.orDivider}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.orLine} />
            </View>

            {/* ─── BIOMETRIC ─── */}
            <View style={styles.sectionLabel}>
              <Ionicons name="finger-print-outline" size={14} color={Colors.primary} />
              <Text style={styles.sectionLabelText}>Biometric Login</Text>
            </View>
            <View style={[styles.card, styles.bioCard]}>
              <TouchableOpacity style={styles.bioBtn} onPress={handleBiometric} activeOpacity={0.85}>
                <Ionicons name="finger-print" size={40} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.bioHint}>Touch ID or Face ID</Text>
              <View style={styles.placeholderBadge}>
                <Text style={styles.placeholderText}>Placeholder – native integration required</Text>
              </View>
            </View>

            <View style={styles.orDivider}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.orLine} />
            </View>

            {/* ─── QPIN ─── */}
            <View style={styles.sectionLabel}>
              <Ionicons name="keypad-outline" size={14} color={Colors.primary} />
              <Text style={styles.sectionLabelText}>Quick PIN (QPIN)</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.dotRow}>
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                  <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />
                ))}
              </View>

              {pinLoading ? (
                <View style={styles.pinLoadingWrap}>
                  <ActivityIndicator color={Colors.primary} />
                  <Text style={styles.bioHint}>Verifying PIN…</Text>
                </View>
              ) : (
                <View style={styles.numpad}>
                  {NUMPAD_ROWS.map((row, ri) => (
                    <View key={ri} style={styles.numRow}>
                      {row.map((key) => {
                        if (key === '') {
                          return <View key="empty" style={styles.numKeyPlaceholder} />;
                        }
                        if (key === 'del') {
                          return (
                            <TouchableOpacity
                              key="del"
                              style={styles.numKey}
                              onPress={handlePinDelete}
                              activeOpacity={0.7}
                            >
                              <Ionicons name="backspace-outline" size={22} color={Colors.text} />
                            </TouchableOpacity>
                          );
                        }
                        return (
                          <TouchableOpacity
                            key={key}
                            style={styles.numKey}
                            onPress={() => handlePinPress(key)}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.numKeyText}>{key}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* ─── QR SCAN CTA ─── */}
            <View style={styles.qrDivider}>
              <View style={styles.orLine} />
              <Text style={styles.qrDividerLabel}>Child sign in / sign out</Text>
              <View style={styles.orLine} />
            </View>

            <TouchableOpacity style={styles.qrCta} onPress={handleQRScan} activeOpacity={0.85}>
              <View style={styles.qrIconWrap}>
                <Ionicons name="qr-code-outline" size={28} color={Colors.primary} />
              </View>
              <View style={styles.qrCtaText}>
                <Text style={styles.qrCtaTitle}>Scan QR Code</Text>
                <Text style={styles.qrCtaSubtitle}>Child sign in &amp; sign out</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.primaryLight} />
            </TouchableOpacity>

            <View style={styles.signupRow}>
              <Text style={styles.signupPrompt}>New parent? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupLink}>Create Account</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  flex: { flex: 1 },

  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: 6,
  },
  iconBox: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  appName: { ...Typography.h2, color: '#fff', letterSpacing: 0.4 },
  headerSub: { ...Typography.body2, color: 'rgba(255,255,255,0.75)' },

  sheet: {
    flex: 1,
    backgroundColor: Colors.primarySurface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  sheetContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    marginTop: 4,
  },
  sectionLabelText: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadow.md,
  },

  fieldGroup: { marginBottom: Spacing.md },
  label: { ...Typography.label, color: Colors.text, marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: Spacing.md,
    height: 50,
  },
  inputError: { borderColor: Colors.error },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, ...Typography.body1, color: Colors.text },
  eyeBtn: { padding: 4 },
  errorText: { ...Typography.caption, color: Colors.error, marginTop: 4 },
  forgotWrap: { alignSelf: 'flex-end', marginTop: -4, marginBottom: Spacing.lg },
  forgotText: { ...Typography.label, color: Colors.primary },

  btnPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  btnDisabled: { opacity: 0.65 },
  btnPrimaryText: { ...Typography.button, color: '#fff' },

  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  orLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  orText: { ...Typography.caption, color: Colors.textSecondary, marginHorizontal: Spacing.md },

  bioCard: { alignItems: 'center', paddingVertical: Spacing.xl, gap: 14 },
  bioBtn: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  bioHint: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center' },
  placeholderBadge: {
    backgroundColor: Colors.primarySurface,
    borderRadius: BorderRadius.round,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  placeholderText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' as const },

  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.primaryBorder,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  numpad: { gap: 10 },
  numRow: { flexDirection: 'row', gap: 10 },
  numKey: {
    flex: 1,
    height: 54,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.primaryBorder,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numKeyPlaceholder: { flex: 1, height: 54 },
  numKeyText: { ...Typography.h3, color: Colors.text },
  pinLoadingWrap: { alignItems: 'center', gap: 10, paddingVertical: Spacing.lg },

  qrDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  qrDividerLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginHorizontal: Spacing.sm,
    fontWeight: '600' as const,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  qrCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 14,
    borderWidth: 1.5,
    borderColor: Colors.primaryBorder,
    ...Shadow.sm,
  },
  qrIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCtaText: { flex: 1 },
  qrCtaTitle: { ...Typography.body1, color: Colors.text, fontWeight: '700' as const },
  qrCtaSubtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  signupPrompt: { ...Typography.body2, color: Colors.textSecondary },
  signupLink: { ...Typography.body2, color: Colors.primary, fontWeight: '600' as const },
});

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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

type Relationship = 'mother' | 'father' | 'guardian';

export default function RegisterScreen({ navigation }: Props) {
  const { register, isLoading } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    relationship: 'mother' as Relationship,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function setField(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: '' }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.phone) e.phone = 'Phone number is required';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleRegister() {
    if (!validate()) return;
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        relationship: form.relationship,
      });
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again later.');
    }
  }

  const relationships: { value: Relationship; label: string; icon: string }[] = [
    { value: 'mother', label: 'Mother', icon: '👩' },
    { value: 'father', label: 'Father', icon: '👨' },
    { value: 'guardian', label: 'Guardian', icon: '🧑' },
  ];

  return (
    <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={Colors.textInverse} />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.appName}>KidConnect</Text>
              <Text style={styles.tagline}>Create your parent account</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Sign Up</Text>

              <InputField
                label="Full Name"
                icon="person-outline"
                placeholder="Sarah Johnson"
                value={form.name}
                onChangeText={v => setField('name', v)}
                error={errors.name}
              />

              <InputField
                label="Email Address"
                icon="mail-outline"
                placeholder="your@email.com"
                value={form.email}
                onChangeText={v => setField('email', v)}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <InputField
                label="Phone Number"
                icon="call-outline"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChangeText={v => setField('phone', v)}
                error={errors.phone}
                keyboardType="phone-pad"
              />

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Relationship to Child</Text>
                <View style={styles.relationshipRow}>
                  {relationships.map(r => (
                    <TouchableOpacity
                      key={r.value}
                      style={[styles.relationshipBtn, form.relationship === r.value && styles.relationshipBtnActive]}
                      onPress={() => setForm(f => ({ ...f, relationship: r.value }))}
                    >
                      <Text style={styles.relationshipIcon}>{r.icon}</Text>
                      <Text style={[styles.relationshipLabel, form.relationship === r.value && styles.relationshipLabelActive]}>
                        {r.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={[styles.inputContainer, errors.password ? styles.inputError : null]}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Minimum 8 characters"
                    placeholderTextColor={Colors.textLight}
                    value={form.password}
                    onChangeText={v => setField('password', v)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(s => !s)}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.textSecondary} />
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              </View>

              <InputField
                label="Confirm Password"
                icon="lock-closed-outline"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChangeText={v => setField('confirmPassword', v)}
                error={errors.confirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={[styles.registerButton, isLoading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={Colors.textInverse} />
                ) : (
                  <Text style={styles.registerButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <View style={styles.loginRow}>
                <Text style={styles.loginPrompt}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function InputField({
  label, icon, placeholder, value, onChangeText, error, keyboardType, autoCapitalize, secureTextEntry,
}: {
  label: string;
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  keyboardType?: any;
  autoCapitalize?: any;
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <Ionicons name={icon as any} size={20} color={Colors.textSecondary} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textLight}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize || 'words'}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, padding: Spacing.lg, paddingTop: Spacing.md },
  backButton: { width: 40, height: 40, justifyContent: 'center', marginBottom: Spacing.sm },
  header: { alignItems: 'center', marginBottom: Spacing.lg },
  appName: { ...Typography.h2, color: Colors.textInverse },
  tagline: { ...Typography.body2, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing.xl },
  title: { ...Typography.h3, color: Colors.text, marginBottom: Spacing.lg },
  fieldGroup: { marginBottom: Spacing.md },
  label: { ...Typography.label, color: Colors.text, marginBottom: 6 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    height: 52,
  },
  inputError: { borderColor: Colors.error },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, ...Typography.body1, color: Colors.text },
  errorText: { ...Typography.caption, color: Colors.error, marginTop: 4 },
  relationshipRow: { flexDirection: 'row', gap: 8 },
  relationshipBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  relationshipBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight + '20' },
  relationshipIcon: { fontSize: 24, marginBottom: 4 },
  relationshipLabel: { ...Typography.caption, color: Colors.textSecondary },
  relationshipLabelActive: { color: Colors.primary, fontWeight: '600' },
  registerButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  buttonDisabled: { opacity: 0.7 },
  registerButtonText: { ...Typography.button, color: Colors.textInverse },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginPrompt: { ...Typography.body2, color: Colors.textSecondary },
  loginLink: { ...Typography.body2, color: Colors.primary, fontWeight: '600' },
});

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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin() {
    if (!validate()) return;
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  }

  return (
    <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="heart" size={40} color={Colors.primary} />
              </View>
              <Text style={styles.appName}>KidConnect</Text>
              <Text style={styles.tagline}>Stay connected with your child's day</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to your parent account</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={[styles.inputContainer, errors.email ? styles.inputError : null]}>
                  <Ionicons name="mail-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    placeholderTextColor={Colors.textLight}
                    value={email}
                    onChangeText={text => { setEmail(text); setErrors(e => ({ ...e, email: undefined })); }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={[styles.inputContainer, errors.password ? styles.inputError : null]}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={Colors.textLight}
                    value={password}
                    onChangeText={text => { setPassword(text); setErrors(e => ({ ...e, password: undefined })); }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={styles.eyeIcon}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.textSecondary} />
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={Colors.textInverse} />
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity style={styles.demoButton} onPress={() => { setEmail('sarah.johnson@example.com'); setPassword('password123'); }}>
                <Ionicons name="flask-outline" size={18} color={Colors.primary} />
                <Text style={styles.demoButtonText}>Use Demo Account</Text>
              </TouchableOpacity>

              <View style={styles.signupRow}>
                <Text style={styles.signupPrompt}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
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
  scroll: { flexGrow: 1, justifyContent: 'center', padding: Spacing.lg },
  logoContainer: { alignItems: 'center', marginBottom: Spacing.xl },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  appName: { ...Typography.h1, color: Colors.textInverse, letterSpacing: 0.5 },
  tagline: { ...Typography.body2, color: 'rgba(255,255,255,0.85)', marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
  },
  title: { ...Typography.h2, color: Colors.text, marginBottom: 4 },
  subtitle: { ...Typography.body2, color: Colors.textSecondary, marginBottom: Spacing.lg },
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
  eyeIcon: { padding: 4 },
  errorText: { ...Typography.caption, color: Colors.error, marginTop: 4 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: Spacing.lg },
  forgotPasswordText: { ...Typography.label, color: Colors.primary },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: { opacity: 0.7 },
  loginButtonText: { ...Typography.button, color: Colors.textInverse },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { ...Typography.caption, color: Colors.textSecondary, marginHorizontal: Spacing.md },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
    height: 48,
    gap: 8,
    marginBottom: Spacing.lg,
  },
  demoButtonText: { ...Typography.button, color: Colors.primary },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupPrompt: { ...Typography.body2, color: Colors.textSecondary },
  signupLink: { ...Typography.body2, color: Colors.primary, fontWeight: '600' },
});

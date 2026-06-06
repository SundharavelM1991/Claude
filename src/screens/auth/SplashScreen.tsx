import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Typography } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Splash'>;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const LOADER_WIDTH = SCREEN_WIDTH - 96;
const SPLASH_DURATION = 5000;

export default function SplashScreen({ navigation }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: SPLASH_DURATION,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => navigation.replace('Login'));
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, LOADER_WIDTH],
  });

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <LinearGradient
        colors={['#4338CA', '#6366F1', '#818CF8']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Ionicons name="happy-outline" size={52} color="#fff" />
        </View>
        <Text style={styles.appName}>KidConnect</Text>
        <Text style={styles.tagline}>Safe. Simple. Reliable.</Text>
      </View>
      <View style={styles.loaderWrap}>
        <View style={[styles.loaderTrack, { width: LOADER_WIDTH }]}>
          <Animated.View style={[styles.loaderBar, { width: barWidth }]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appName: { ...Typography.h1, color: '#fff', letterSpacing: 0.5 },
  tagline: { ...Typography.body2, color: 'rgba(255,255,255,0.78)' },
  loaderWrap: { paddingBottom: 80, alignItems: 'center' },
  loaderTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderBar: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 2,
  },
});

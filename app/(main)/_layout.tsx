// app/(main)/_layout.tsx
import { _colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'react-native';

export default function MainLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={_colors.primary} />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: _colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            let iconName: any;

            if (route.name === 'home') iconName = 'home';
            else if (route.name === 'medicine') iconName = 'medkit';
            else if (route.name === 'schedule') iconName = 'calendar';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      />
    </>
  );
}

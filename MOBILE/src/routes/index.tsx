import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { BluetoothScreen } from '../screens/BluetoothScreen';
import { CropsScreen } from '../screens/CropsScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import PlantLibraryScreen from '../screens/PlantLibraryScreen';

// Definição completa de todas as rotas da aplicação
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Bluetooth: undefined;
  Crops: undefined;
  History: undefined;
  Settings: undefined;
  Library: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          
          <Stack.Screen name="Crops" component={CropsScreen} />

          <Stack.Screen name="History" component={HistoryScreen} />
          
          <Stack.Screen name="Settings" component={SettingsScreen} />

          <Stack.Screen name="Library" component={PlantLibraryScreen} />


          <Stack.Screen 
            name="Bluetooth" 
            component={BluetoothScreen} 
            options={{ 
              headerShown: true, 
              title: 'Conectar Sensor',
              headerTintColor: '#1b5e20',
              headerStyle: { backgroundColor: '#EEF2EE' }
            }} 
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
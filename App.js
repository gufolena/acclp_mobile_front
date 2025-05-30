// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppStack from './src/navigation/AppStack';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext'; // Importe o ThemeProvider
import AppStack from './src/navigation/AppStack';

export default function App() {
  return (
    <AuthProvider>
      {/* O ThemeProvider deve envolver o restante do aplicativo para que o tema seja acessível globalmente */}
      <ThemeProvider> 
        <PaperProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
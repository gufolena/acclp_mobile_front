// src/navigation/CasosStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Importe as telas relacionadas a casos
import CasosScreen from '../screens/CasosScreen';
import VisualizarCasoScreen from '../screens/VisualizarCasoScreen';
import EditarCasoScreen from '../screens/EditarCasoScreen';
import CriarCasoScreen from '../screens/CriarCasoScreen'; // <-- Importe a tela de criação

const CasosStack = createStackNavigator();

export default function CasosStackNavigator() {
  return (
    <CasosStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#f0f6fc' },
        headerTintColor: '#003f88',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <CasosStack.Screen
        name="ListaCasos"
        component={CasosScreen}
        options={({ navigation }) => ({
          headerTitle: 'Meus Casos',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="menu" size={24} color="#003f88" />
            </TouchableOpacity>
          ),
        })}
      />
      <CasosStack.Screen
        name="VisualizarCaso"
        component={VisualizarCasoScreen}
        options={{
          headerTitle: 'Detalhes do Caso',
        }}
      />
      <CasosStack.Screen
        name="EditarCaso"
        component={EditarCasoScreen}
        options={{ headerTitle: 'Editar Caso' }}
      />
      <CasosStack.Screen 
        name="CriarCaso"
        component={CriarCasoScreen}
        options={{ headerTitle: 'Novo Caso' }}
      />
    </CasosStack.Navigator>
  );
}
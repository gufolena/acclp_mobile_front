// src/navigation/UsuariosStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Importe as telas relacionadas a usuários
import UsuariosScreen from '../screens/UsuariosScreen';
import VisualizarUsuarioScreen from '../screens/VisualizarUsuarioScreen';
import EditarUsuarioScreen from '../screens/EditarUsuarioScreen';
import CriarUsuarioScreen from '../screens/CriarUsuarioScreen';

const UsuariosStack = createStackNavigator();

export default function UsuariosStackNavigator() {
  return (
    <UsuariosStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#f0f6fc' },
        headerTintColor: '#003f88',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <UsuariosStack.Screen
        name="ListaUsuarios"
        component={UsuariosScreen}
        options={({ navigation }) => ({
          headerTitle: 'Gerenciar Usuários',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="menu" size={24} color="#003f88" />
            </TouchableOpacity>
          ),
        })}
      />
      <UsuariosStack.Screen
        name="VisualizarUsuario"
        component={VisualizarUsuarioScreen}
        options={{
          headerTitle: 'Detalhes do Usuário',
        }}
      />
      <UsuariosStack.Screen
        name="EditarUsuario"
        component={EditarUsuarioScreen}
        options={{ headerTitle: 'Editar Usuário' }}
      />
      <UsuariosStack.Screen
        name="CriarUsuario"
        component={CriarUsuarioScreen}
        options={{ headerTitle: 'Novo Usuário' }}
      />
    </UsuariosStack.Navigator>
  );
}
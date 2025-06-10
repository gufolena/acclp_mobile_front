// src/navigation/AppDrawer.js
import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/AppDrawerStyles';

// Importe as telas
import HomeScreen from '../screens/HomeScreen';
import CasosStackNavigator from './CasosStackNavigator'; 
import UsuariosStackNavigator from './UsuariosStackNavigator'; 

// Placeholders temporários (REMOVA ou substitua conforme for criando)
const ProfileScreen = () => <View><Text>Perfil</Text></View>;
const SettingsScreen = () => <View><Text>Configurações</Text></View>;
const LaudosScreen = () => <View><Text>Laudos</Text></View>;

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.profileSection}>
        <Image
          source={
            userInfo?.foto_perfil
              ? { uri: userInfo.foto_perfil }
              : require('../../assets/img/dentista-perito-judicial-como-se-formar.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userInfo?.nome}</Text>
        <Text style={styles.profileEmail}>{userInfo?.email}</Text>
      </View>

      <DrawerItem
        label="Home"
        icon={({ color, size }) => <MaterialIcons name="home" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Home')}
      />

      <DrawerItem
        label="Perfil"
        icon={({ color, size }) => <MaterialIcons name="person" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Perfil')}
      />

      <DrawerItem
        label="Configurações"
        icon={({ color, size }) => <MaterialIcons name="settings" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Configurações')}
      />

      <DrawerItem
        label="Casos"
        icon={({ color, size }) => <MaterialIcons name="assignment" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Casos')}
      />

      <DrawerItem
        label="Usuários"
        icon={({ color, size }) => <MaterialIcons name="group" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Usuarios')} 
      />

      <DrawerItem
        label="Laudos"
        icon={({ color, size }) => <MaterialIcons name="description" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Laudos')}
      />

      <DrawerItem
        label="Sair"
        icon={({ color, size }) => <MaterialIcons name="logout" size={size} color={color} />}
        onPress={logout}
      />
    </DrawerContentScrollView>
  );
};

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#003f88',
        drawerInactiveTintColor: '#5a7ca8',
        drawerActiveBackgroundColor: '#d7e9fc',
        drawerLabelStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: '#f0f6fc',
        },
        headerTintColor: '#003f88',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Configurações" component={SettingsScreen} />
      <Drawer.Screen name="Casos" component={CasosStackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Usuarios" component={UsuariosStackNavigator} options={{ headerShown: false }} /> 
      <Drawer.Screen name="Laudos" component={LaudosScreen} />
    </Drawer.Navigator>
  );
}
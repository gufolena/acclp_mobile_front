import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/HomeScreenStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Login realizado com sucesso!</Text>
      <Text style={styles.subtitle}>Bem-vindo à HomeScreen 👋</Text>
    </View>
  );
};

export default HomeScreen;

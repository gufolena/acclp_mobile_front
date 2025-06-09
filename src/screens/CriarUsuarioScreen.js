// src/screens/CriarUsuarioScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CriarUsuarioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Criar Usuário</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f6fc',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003f88',
  },
});
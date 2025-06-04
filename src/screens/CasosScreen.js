import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/CasosScreenStyles';

const casosExemplo = [
  {
    id: '1',
    titulo: 'Caso João da Silva',
    status: 'Aberto',
    data: '03/06/2025',
  },
  {
    id: '2',
    titulo: 'Caso Maria Oliveira',
    status: 'Concluído',
    data: '29/05/2025',
  },
];

const CasosScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.data}>Última atualização: {item.data}</Text>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Casos</Text>
      <FlatList
        data={casosExemplo}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
};

export default CasosScreen;

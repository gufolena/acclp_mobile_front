// src/screens/LaudosScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'; // Se precisar do userInfo para algo básico
import styles from '../styles/LaudosScreenStyles'; // Ainda vamos usar os estilos que criamos

export default function LaudosScreen() {
  const { userInfo } = useContext(AuthContext); // Exemplo: se quiser exibir o nome do usuário logado
  const [searchQuery, setSearchQuery] = useState('');

  const handleNovoLaudo = () => {
    console.log('Botão "Novo Laudo" clicado!');
    // No futuro, navegará para uma tela de criação de laudo
    // navigation.navigate('CriarLaudo');
  };

  const handleSearch = () => {
    console.log('Pesquisando por:', searchQuery);
    // No futuro, esta função acionaria a busca na API
  };

  // Esta é uma versão MUITO básica.
  // No futuro, aqui você teria uma FlatList e faria as requisições à API.
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.screenTitle}>Meus Laudos</Text>
        <Text style={styles.greetingText}>
          Olá, {userInfo?.nome || 'Usuário'}! Aqui estão seus laudos.
        </Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleNovoLaudo}>
        <MaterialIcons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Novo Laudo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar laudos..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch} // Aciona pesquisa ao pressionar Enter
      />

      {/* Área para exibir os laudos (atualmente vazia, ou com mensagem básica) */}
      <View style={styles.laudosListSection}>
        <Text style={styles.sectionTitle}>Laudos Recentes</Text>
        <View style={styles.emptyList}>
          <MaterialIcons name="folder-off" size={50} color={styles.textSecondary.color} />
          <Text style={styles.cardText}>Nenhum laudo encontrado ainda.</Text>
          <Text style={styles.cardText}>Seus laudos aparecerão aqui!</Text>
        </View>
        {/* Futuramente, aqui será uma FlatList renderizando os itens de laudo */}
        {/* <FlatList
            data={laudos} // Viria de um estado 'laudos'
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text>{item.titulo}</Text>
                    // ... mais detalhes
                </View>
            )}
        /> */}
      </View>
    </ScrollView>
  );
}
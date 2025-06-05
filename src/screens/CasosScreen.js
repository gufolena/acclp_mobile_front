// src/screens/CasosScreen.js
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, RefreshControl, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importações adicionadas
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/CasosScreenStyles'; // Certifique-se de que este arquivo existe e está correto

// Considerando que você tem um arquivo de configuração para a URL da API
import { API_BASE_URL } from '../services/api'; // Crie este arquivo se ainda não tiver

export default function CasosScreen() {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Novo estado para o pull-to-refresh
  const { userToken } = useContext(AuthContext);
  const navigation = useNavigation(); // Hook para navegação

  const fetchCasos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/casos/`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setCasos(response.data.data);
      } else {
        console.error('Formato inesperado da API:', response.data);
        Alert.alert('Erro', 'Formato de dados inesperado ao carregar casos.');
      }
    } catch (error) {
      console.error('Erro ao buscar casos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os casos. Verifique sua conexão ou tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false); // Finaliza o refresh, se estiver ocorrendo
    }
  }, [userToken]); // userToken como dependência para useCallback

  // Usa useFocusEffect para recarregar os casos sempre que a tela estiver em foco
  useFocusEffect(
    useCallback(() => {
      fetchCasos();
    }, [fetchCasos])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCasos();
  }, [fetchCasos]);

  const handleEditar = (caso) => {
    // Navega para a tela de edição, passando os dados completos do caso
    navigation.navigate('EditarCaso', { casoId: caso._id, casoData: caso });
  };

  const handleDeletar = async (id) => {
    Alert.alert('Deletar caso', 'Tem certeza que deseja deletar este caso? Esta ação é irreversível.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_BASE_URL}/casos/${id}`, {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            });
            Alert.alert('Sucesso', 'Caso deletado com sucesso!');
            fetchCasos(); // Recarrega a lista de casos após a exclusão
          } catch (error) {
            console.error('Erro ao deletar:', error);
            Alert.alert('Erro', 'Não foi possível deletar o caso. Tente novamente mais tarde.');
          }
        },
      },
    ]);
  };

  const handleNovoCaso = () => {
    // Navega para a tela de criação de um novo caso
    navigation.navigate('CriarCaso');
  };

  // Componente de renderização individual para o FlatList
  const renderCasoItem = ({ item: caso }) => (
    <View key={caso._id} style={styles.card}>
      <Text style={styles.cardTitle}>{caso.titulo_caso}</Text>
      <Text>Processo: {caso.processo_caso}</Text>
      <Text>Status: {caso.status_caso}</Text>
      <Text>Responsável: {caso.responsavel_caso}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => handleEditar(caso)} style={styles.editButton}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletar(caso._id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && !refreshing) { // Mostra o ActivityIndicator apenas se estiver carregando inicialmente e não refrescando
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#003f88" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleNovoCaso}>
        <Text style={styles.addButtonText}>+ Novo Caso</Text>
      </TouchableOpacity>

      {casos.length === 0 && !loading && !refreshing ? (
        <View style={styles.centered}>
          <Text>Nenhum caso encontrado. Crie um novo!</Text>
        </View>
      ) : (
        <FlatList
          data={casos}
          keyExtractor={(item) => item._id}
          renderItem={renderCasoItem}
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#003f88']} // Cor do ícone de refresh
            />
          }
        />
      )}
    </View>
  );
}
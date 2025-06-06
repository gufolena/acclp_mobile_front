// src/screens/CasosScreen.js
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, RefreshControl, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/CasosScreenStyles'; // Removida a importação de 'colors' aqui

import { API_BASE_URL } from '../services/api';

export default function CasosScreen() {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userToken } = useContext(AuthContext);
  const navigation = useNavigation();

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
      setRefreshing(false);
    }
  }, [userToken]);

  useFocusEffect(
    useCallback(() => {
      fetchCasos();
    }, [fetchCasos])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCasos();
  }, [fetchCasos]);

  const handleVisualizar = (caso) => {
  navigation.navigate('VisualizarCaso', { casoData: caso }); // <-- Substitua esta linha
  };

  const handleEditar = (caso) => {
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
            fetchCasos();
          } catch (error) {
            console.error('Erro ao deletar:', error);
            Alert.alert('Erro', 'Não foi possível deletar o caso. Tente novamente mais tarde.');
          }
        },
      },
    ]);
  };

  const handleNovoCaso = () => {
    navigation.navigate('CriarCaso');
  };

  const renderCasoItem = ({ item: caso }) => (
    <View key={caso._id} style={styles.card}>
      <Text style={styles.cardTitle}>{caso.titulo_caso}</Text>
      <Text style={styles.cardText}>Processo: {caso.processo_caso}</Text>
      <Text style={styles.cardText}>Status: {caso.status_caso}</Text>
      <Text style={styles.cardText}>Responsável: {caso.responsavel_caso}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => handleVisualizar(caso)} style={styles.viewButton}>
          <Text style={styles.buttonText}>Visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditar(caso)} style={styles.editButton}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletar(caso._id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        {/* Usando a cor diretamente. Se #003f88 é primaryDark, use o valor exato. */}
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
              // Usando a cor diretamente. Se #003f88 é primaryDark, use o valor exato.
              colors={['#003f88']}
            />
          }
        />
      )}
    </View>
  );
}
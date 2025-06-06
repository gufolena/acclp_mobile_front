// src/screens/CasosScreen.js
import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, RefreshControl, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/CasosScreenStyles';
import ConfirmationModal from '../components/ConfirmationModal';
import CustomMessageModal from '../components/CustomMessageModal'; // <-- Importe o novo modal de mensagem

import { API_BASE_URL } from '../services/api';

export default function CasosScreen() {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { userToken } = useContext(AuthContext);
  const navigation = useNavigation();

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [casoToDeleteId, setCasoToDeleteId] = useState(null);

  // --- Novos estados para o modal de mensagem customizado ---
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [messageModalType, setMessageModalType] = useState('info'); // 'success' ou 'error'
  const [messageModalTitle, setMessageModalTitle] = useState('');
  const [messageModalMessage, setMessageModalMessage] = useState('');
  // --- Fim dos novos estados ---

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
        // Usar o novo modal para erros de formato também
        setMessageModalType('error');
        setMessageModalTitle('Erro de Dados');
        setMessageModalMessage('Formato de dados inesperado ao carregar casos.');
        setIsMessageModalVisible(true);
      }
    } catch (error) {
      console.error('Erro ao buscar casos:', error);
      // Usar o novo modal para erros de busca
      setMessageModalType('error');
      setMessageModalTitle('Erro de Conexão');
      setMessageModalMessage('Não foi possível carregar os casos. Verifique sua conexão ou tente novamente.');
      setIsMessageModalVisible(true);
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

  const filteredCasos = useMemo(() => {
    if (!searchQuery) {
      return casos;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return casos.filter(caso =>
      caso.titulo_caso.toLowerCase().includes(lowerCaseQuery) ||
      caso.processo_caso.toLowerCase().includes(lowerCaseQuery) ||
      caso.status_caso.toLowerCase().includes(lowerCaseQuery) ||
      caso.responsavel_caso.toLowerCase().includes(lowerCaseQuery)
    );
  }, [casos, searchQuery]);

  const handleVisualizar = (caso) => {
    navigation.navigate('VisualizarCaso', { casoData: caso });
  };

  const handleEditar = (caso) => {
    navigation.navigate('EditarCaso', { casoId: caso._id, casoData: caso });
  };

  const handleDeletar = (id) => {
    setCasoToDeleteId(id);
    setIsConfirmationModalVisible(true); // Abre o modal de confirmação
  };

  const handleConfirmDelete = async () => {
    setIsConfirmationModalVisible(false); // Fecha o modal de confirmação
    if (!casoToDeleteId) return;

    try {
      await axios.delete(`${API_BASE_URL}/casos/${casoToDeleteId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      // Usa o CustomMessageModal para sucesso
      setMessageModalType('success');
      setMessageModalTitle('Sucesso!');
      setMessageModalMessage('Caso deletado com sucesso!');
      setIsMessageModalVisible(true);

      fetchCasos();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      // Usa o CustomMessageModal para erro
      setMessageModalType('error');
      setMessageModalTitle('Erro ao Deletar');
      setMessageModalMessage('Não foi possível deletar o caso. Tente novamente mais tarde.');
      setIsMessageModalVisible(true);
    } finally {
      setCasoToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalVisible(false);
    setCasoToDeleteId(null);
    console.log('Exclusão cancelada pelo usuário.');
  };

  // Função para fechar o modal de mensagem (sucesso/erro)
  const handleCloseMessageModal = () => {
    setIsMessageModalVisible(false);
    setMessageModalTitle('');
    setMessageModalMessage('');
    setMessageModalType('info'); // Reseta para o tipo padrão
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
        <ActivityIndicator size="large" color="#003f88" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleNovoCaso}>
        <Text style={styles.addButtonText}>+ Novo Caso</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar casos..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredCasos.length === 0 && !loading && !refreshing ? (
        <View style={styles.centered}>
          <Text>Nenhum caso encontrado. Crie um novo ou ajuste sua pesquisa!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCasos}
          keyExtractor={(item) => item._id}
          renderItem={renderCasoItem}
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#003f88']}
            />
          }
        />
      )}

      <ConfirmationModal
        isVisible={isConfirmationModalVisible}
        title="Confirmar Exclusão"
        message="Você tem certeza que deseja deletar este caso? Esta ação não pode ser desfeita."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Deletar Caso"
        cancelText="Manter Caso"
      />

      {/* --- Adicione o CustomMessageModal aqui --- */}
      <CustomMessageModal
        isVisible={isMessageModalVisible}
        title={messageModalTitle}
        message={messageModalMessage}
        type={messageModalType}
        onClose={handleCloseMessageModal}
      />
      {/* --- Fim do CustomMessageModal --- */}
    </View>
  );
}
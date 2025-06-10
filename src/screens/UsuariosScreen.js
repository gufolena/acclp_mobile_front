// src/screens/UsuariosScreen.js
import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, RefreshControl, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
// IMPORTANTE: Agora importamos os estilos do UsuariosScreen
import styles from '../styles/UsuariosScreenStyles'; // <--- ALTERADO AQUI!
import ConfirmationModal from '../components/ConfirmationModal';
import CustomMessageModal from '../components/CustomMessageModal';
import { API_BASE_URL } from '../services/api';

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { userToken } = useContext(AuthContext);
  const navigation = useNavigation();

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [usuarioToDeleteId, setUsuarioToDeleteId] = useState(null);

  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [messageModalType, setMessageModalType] = useState('info');
  const [messageModalTitle, setMessageModalTitle] = useState('');
  const [messageModalMessage, setMessageModalMessage] = useState('');

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/usuarios/`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Cache-Control': 'no-cache',
        },
      });

      if (response.data.sucesso && Array.isArray(response.data.dados)) {
        setUsuarios(response.data.dados);
      } else {
        console.error('Formato inesperado da API de usuários:', response.data);
        setMessageModalType('error');
        setMessageModalTitle('Erro de Dados');
        setMessageModalMessage('Formato de dados inesperado ao carregar usuários. Verifique o console para detalhes.');
        setIsMessageModalVisible(true);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setMessageModalType('error');
      setMessageModalTitle('Erro de Conexão');
      setMessageModalMessage('Não foi possível carregar os usuários. Verifique sua conexão ou tente novamente.');
      setIsMessageModalVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userToken]);

  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [fetchUsuarios])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUsuarios();
  }, [fetchUsuarios]);

  const filteredUsuarios = useMemo(() => {
    if (!searchQuery) {
      return usuarios;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return usuarios.filter(usuario =>
      usuario.nome_completo.toLowerCase().includes(lowerCaseQuery) ||
      usuario.email.toLowerCase().includes(lowerCaseQuery) ||
      usuario.tipo_perfil.toLowerCase().includes(lowerCaseQuery)
    );
  }, [usuarios, searchQuery]);

  const handleVisualizar = (usuario) => {
    navigation.navigate('VisualizarUsuario', { usuarioData: usuario });
  };

  const handleEditar = (usuario) => {
    navigation.navigate('EditarUsuario', { usuarioId: usuario._id, usuarioData: usuario });
  };

  const handleDeletar = (id) => {
    setUsuarioToDeleteId(id);
    setIsConfirmationModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmationModalVisible(false);
    if (!usuarioToDeleteId) return;

    try {
      await axios.delete(`${API_BASE_URL}/usuarios/${usuarioToDeleteId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setMessageModalType('success');
      setMessageModalTitle('Sucesso!');
      setMessageModalMessage('Usuário deletado com sucesso!');
      setIsMessageModalVisible(true);

      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      setMessageModalType('error');
      setMessageModalTitle('Erro ao Deletar');
      setMessageModalMessage('Não foi possível deletar o usuário. Tente novamente mais tarde.');
      setIsMessageModalVisible(true);
    } finally {
      setUsuarioToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalVisible(false);
    setUsuarioToDeleteId(null);
    console.log('Exclusão de usuário cancelada pelo usuário.');
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalVisible(false);
    setMessageModalTitle('');
    setMessageModalMessage('');
    setMessageModalType('info');
  };

  const handleNovoUsuario = () => {
    navigation.navigate('CriarUsuario');
  };

  const renderUsuarioItem = ({ item: usuario }) => (
    <View key={usuario._id} style={styles.card}>
      <Text style={styles.cardTitle}>{usuario.nome_completo}</Text>
      <Text style={styles.cardText}>Email: {usuario.email}</Text>
      <Text style={styles.cardText}>Telefone: {usuario.telefone}</Text>
      <Text style={styles.cardText}>Perfil: {usuario.tipo_perfil}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => handleVisualizar(usuario)} style={styles.viewButton}>
          <Text style={styles.buttonText}>Visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditar(usuario)} style={styles.editButton}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletar(usuario._id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#003f88" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleNovoUsuario}>
        <Text style={styles.addButtonText}>+ Novo Usuário</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar usuários..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredUsuarios.length === 0 && !loading && !refreshing ? (
        <View style={styles.centered}>
          <Text>Nenhum usuário encontrado. Crie um novo ou ajuste sua pesquisa!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsuarios}
          keyExtractor={(item) => item._id}
          renderItem={renderUsuarioItem}
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
        message="Você tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Deletar Usuário"
        cancelText="Manter Usuário"
      />

      <CustomMessageModal
        isVisible={isMessageModalVisible}
        title={messageModalTitle}
        message={messageModalMessage}
        type={messageModalType}
        onClose={handleCloseMessageModal}
      />
    </View>
  );
}
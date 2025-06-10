// src/screens/VisualizarUsuarioScreen.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/VisualizarUsuarioScreenStyles'; // Usando o estilo dedicado
import { API_BASE_URL } from '../services/api';

export default function VisualizarUsuarioScreen() {
  const route = useRoute();
  const { userToken } = useContext(AuthContext);
  const { usuarioData: initialUsuarioData } = route.params;

  const [usuario, setUsuario] = useState(initialUsuarioData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsuarioDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/usuarios/${initialUsuarioData._id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.data.sucesso && response.data.dados) {
        setUsuario(response.data.dados);
      } else {
        setError('Não foi possível carregar os detalhes completos do usuário.');
        console.error('Erro no formato da resposta da API de detalhes:', response.data);
      }
    } catch (err) {
      console.error('Erro ao buscar detalhes do usuário:', err);
      setError('Erro ao carregar detalhes do usuário. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }, [userToken, initialUsuarioData._id]);

  useEffect(() => {
    if (!initialUsuarioData.foto_perfil_usuario) {
      fetchUsuarioDetails();
    } else {
      setLoading(false);
    }
  }, [initialUsuarioData, fetchUsuarioDetails]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={styles.primaryColorForIndicator} />
        <Text style={styles.loadingText}>Carregando detalhes do usuário...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Dados do usuário não disponíveis.</Text>
      </View>
    );
  }

  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    if (isNaN(data.getTime())) return 'Data Inválida';
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes do Usuário</Text>

      <Text style={styles.sectionTitle}>Informações Pessoais</Text>
      {/* Cada label/value em seu próprio detailCard */}
      <View style={styles.detailCard}><Text style={styles.label}>Nome Completo:</Text><Text style={styles.value}>{usuario.nome_completo || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Primeiro Nome:</Text><Text style={styles.value}>{usuario.primeiro_nome || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Sobrenome:</Text><Text style={styles.value}>{usuario.segundo_nome || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Data de Nascimento:</Text><Text style={styles.value}>{formatarData(usuario.data_nascimento)}</Text></View>

      <Text style={styles.sectionTitle}>Contato</Text>
      <View style={styles.detailCard}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{usuario.email || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Telefone:</Text><Text style={styles.value}>{usuario.telefone || 'N/A'}</Text></View>

      <Text style={styles.sectionTitle}>Informações do Perfil</Text>
      <View style={styles.detailCard}><Text style={styles.label}>Tipo de Perfil:</Text><Text style={styles.value}>{usuario.tipo_perfil || 'N/A'}</Text></View>
      {usuario.tipo_perfil === 'Perito' && (
        <View style={styles.detailCard}>
          <Text style={styles.label}>CRO / UF:</Text>
          <Text style={styles.value}>{usuario.cro_uf || 'Não informado'}</Text>
        </View>
      )}

      {/* --- Exibição da foto de perfil (apenas se disponível) --- */}
      {usuario.foto_perfil_usuario && ( // <-- REMOVIDA A MENSAGEM DE "FOTO NÃO DISPONÍVEL"
        <>
          <Text style={styles.sectionTitle}>Foto de Perfil</Text>
          <View style={styles.detailCard}>
            <Image
              source={{ uri: usuario.foto_perfil_usuario }}
              style={{ width: '100%', height: 300, borderRadius: 10, resizeMode: 'contain' }}
            />
          </View>
        </>
      )}
      {/* --- Fim da exibição da foto de perfil --- */}

      <Text style={styles.sectionTitle}>Outras Informações</Text>
      <View style={styles.detailCard}><Text style={styles.label}>Data de Criação do Cadastro:</Text><Text style={styles.value}>{formatarData(usuario.data_criacao)}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>ID do Usuário:</Text><Text style={styles.value}>{usuario._id || 'N/A'}</Text></View>
    </ScrollView>
  );
}
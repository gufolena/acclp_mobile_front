// src/screens/VisualizarUsuarioScreen.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/VisualizarCasoScreenStyles'; 
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

      // --- CORRIGIDO AQUI: De 'response.data.dado' para 'response.data.dados' ---
      if (response.data.sucesso && response.data.dados) { 
        setUsuario(response.data.dados); // <-- Agora usa 'dados' corretamente
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
    // Se a foto_perfil_usuario NÃO veio nos dados iniciais (o que é o caso da lista),
    // ou se veio vazia, fazemos uma nova requisição para obter os detalhes completos.
    // O backend de detalhes sempre deve retornar a foto.
    if (!initialUsuarioData.foto_perfil_usuario) { // Ou se initialUsuarioData.foto_perfil_usuario for uma string vazia
      fetchUsuarioDetails();
    } else {
      // Se já temos a foto nos dados iniciais (caso venha de outra rota que a inclua)
      setLoading(false); 
    }
  }, [initialUsuarioData, fetchUsuarioDetails]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={styles.primaryDark.color} /> {/* Usando a cor do estilo */}
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

  // Helper para formatar datas (opcional, mas bom para UX)
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
      <View style={styles.detailCard}>
        <Text style={styles.label}>Nome Completo:</Text>
        <Text style={styles.value}>{usuario.nome_completo || 'N/A'}</Text>
        <Text style={styles.label}>Primeiro Nome:</Text>
        <Text style={styles.value}>{usuario.primeiro_nome || 'N/A'}</Text>
        <Text style={styles.label}>Segundo Nome:</Text>
        <Text style={styles.value}>{usuario.segundo_nome || 'N/A'}</Text>
        <Text style={styles.label}>Data de Nascimento:</Text>
        <Text style={styles.value}>{formatarData(usuario.data_nascimento)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Contato</Text>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{usuario.email || 'N/A'}</Text>
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>{usuario.telefone || 'N/A'}</Text>
      </View>

      <Text style={styles.sectionTitle}>Informações do Perfil</Text>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Tipo de Perfil:</Text>
        <Text style={styles.value}>{usuario.tipo_perfil || 'N/A'}</Text>
        {usuario.tipo_perfil === 'Perito' && (
          <>
            <Text style={styles.label}>CRO / UF:</Text>
            <Text style={styles.value}>{usuario.cro_uf || 'Não informado'}</Text>
          </>
        )}
      </View>

      {/* --- Exibição da foto de perfil --- */}
      {usuario.foto_perfil_usuario ? (
        <>
          <Text style={styles.sectionTitle}>Foto de Perfil</Text>
          <View style={styles.detailCard}>
            <Image
              source={{ uri: usuario.foto_perfil_usuario }}
              style={{ width: '100%', height: 300, borderRadius: 10, resizeMode: 'contain' }}
            />
          </View>
        </>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20, color: styles.textSecondary.color }}>
          Foto de perfil não disponível.
        </Text>
      )}
      {/* --- Fim da exibição da foto de perfil --- */}

      <Text style={styles.sectionTitle}>Outras Informações</Text>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Data de Criação do Cadastro:</Text>
        <Text style={styles.value}>{formatarData(usuario.data_criacao)}</Text>
        <Text style={styles.label}>ID do Usuário:</Text>
        <Text style={styles.value}>{usuario._id || 'N/A'}</Text>
      </View>

    </ScrollView>
  );
}
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Alert } from 'react-native';
import styles from '../styles/HomeScreenStyles'; // Certifique-se de que o caminho está correto
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Certifique-se de que o caminho está correto
import { API_BASE_URL } from '../services/api';

const HomeScreen = () => {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalCasos: 0,
    casosEmAndamento: 0,
    casosFinalizados: 0,
    casosArquivados: 0,
    totalPeritos: 0,
    totalAdmin: 0,
    totalAssistente: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${userToken}` };

        const [
          totalCasosResponse,
          todosCasosResponse,
          peritosResponse,
          adminResponse,
          assistenteResponse,
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/casos/count`, { headers }),
          axios.get(`${API_BASE_URL}/casos`, { headers }), // Essa rota pode ser um gargalo se tiver muitos casos
          axios.get(`${API_BASE_URL}/usuarios/por-tipo/Perito`, { headers }),
          axios.get(`${API_BASE_URL}/usuarios/por-tipo/Admin`, { headers }),
          axios.get(`${API_BASE_URL}/usuarios/por-tipo/Assistente`, { headers }),
        ]);

        const totalCasos = totalCasosResponse.data.count;

        const todosOsCasos = todosCasosResponse.data.data;
        const casosEmAndamento = todosOsCasos.filter(caso => caso.status_caso === 'Em andamento').length;
        const casosFinalizados = todosOsCasos.filter(caso => caso.status_caso === 'Finalizado').length;
        const casosArquivados = todosOsCasos.filter(caso => caso.status_caso === 'Arquivado').length;

        const totalPeritos = peritosResponse.data.length;
        const totalAdmin = adminResponse.data.length;
        const totalAssistente = assistenteResponse.data.length;

        setDashboardData({
          totalCasos,
          casosEmAndamento,
          casosFinalizados,
          casosArquivados,
          totalPeritos,
          totalAdmin,
          totalAssistente,
        });

      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        Alert.alert(
          'Erro de Carregamento',
          'Não foi possível carregar os dados do dashboard. Verifique sua conexão ou tente novamente.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userToken]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003f88" />
        <Text style={{ marginTop: 10, color: '#343a40' }}>Carregando dados do dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TEXTO INICIAL ALTERADO AQUI */}
      <Text style={styles.title}>Bem-vindo(a) ao Dashboard!</Text>
      <Text style={styles.subtitle}>Visão Geral do Sistema de Perícias e Casos</Text>

      <View style={styles.dashboardContainer}>
        <Text style={styles.dashboardTitle}>Visão Geral dos Casos</Text>
        
        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{dashboardData.totalCasos}</Text>
            <Text style={styles.metricLabel}>Total de Casos</Text>
          </View>
        </View>

        <Text style={styles.dashboardTitle}>Casos por Status</Text>
        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{dashboardData.casosEmAndamento}</Text>
            <Text style={styles.metricLabel}>Em Andamento</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{dashboardData.casosFinalizados}</Text>
            <Text style={styles.metricLabel}>Finalizados</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{dashboardData.casosArquivados}</Text>
            <Text style={styles.metricLabel}>Arquivados</Text>
          </View>
        </View>

        <Text style={styles.dashboardTitle}>Usuários por Perfil</Text>
        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{dashboardData.totalAdmin}</Text>
            <Text style={styles.metricLabel}>Admins Ativos</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{dashboardData.totalPeritos}</Text>
            <Text style={styles.metricLabel}>Peritos Ativos</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{dashboardData.totalAssistente}</Text>
            <Text style={styles.metricLabel}>Assistentes Ativos</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
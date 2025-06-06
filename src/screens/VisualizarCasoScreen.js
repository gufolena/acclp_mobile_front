// src/screens/VisualizarCasoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../styles/VisualizarCasoScreenStyles';

export default function VisualizarCasoScreen() {
  const route = useRoute();
  const [caso, setCaso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { casoData } = route.params;
    if (casoData) {
      setCaso(casoData);
      setLoading(false);
    } else {
      Alert.alert('Erro', 'Dados do caso não encontrados.');
      setLoading(false);
      // Opcional: navigation.goBack();
    }
  }, [route.params]);

  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    try { return new Date(dataString).toLocaleDateString('pt-BR'); }
    catch (e) { console.error("Erro ao formatar data:", e); return dataString; }
  };

  if (loading) {
    return (<View style={styles.centered}><ActivityIndicator size="large" color="#003f88" /><Text style={styles.loadingText}>Carregando detalhes do caso...</Text></View>);
  }

  if (!caso) {
    return (<View style={styles.centered}><Text style={styles.errorText}>Não foi possível carregar os detalhes do caso.</Text></View>);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Detalhes do Caso</Text>

      <View style={styles.detailCard}><Text style={styles.label}>Título:</Text><Text style={styles.value}>{caso.titulo_caso || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Processo:</Text><Text style={styles.value}>{caso.processo_caso || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Status:</Text><Text style={styles.value}>{caso.status_caso || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Responsável:</Text><Text style={styles.value}>{caso.responsavel_caso || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Descrição:</Text><Text style={styles.value}>{caso.descricao_caso || 'N/A'}</Text></View>

      <Text style={styles.sectionTitle}>Detalhes da Vítima</Text>
      <View style={styles.detailCard}><Text style={styles.label}>Nome Completo:</Text><Text style={styles.value}>{caso.nome_completo_vitima_caso || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Data de Nascimento:</Text><Text style={styles.value}>{formatarData(caso.data_nac_vitima_caso)}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Sexo:</Text><Text style={styles.value}>{caso.sexo_vitima_caso || 'N/A'}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Observação da Vítima:</Text><Text style={styles.value}>{caso.observacao_vitima_caso || 'N/A'}</Text></View>

      <Text style={styles.sectionTitle}>Outras Informações</Text>
      <View style={styles.detailCard}><Text style={styles.label}>Data de Criação:</Text><Text style={styles.value}>{formatarData(caso.data_criacao)}</Text></View>
      <View style={styles.detailCard}><Text style={styles.label}>Última Atualização:</Text><Text style={styles.value}>{formatarData(caso.data_atualizacao)}</Text></View>

      {/* Condicionais, agora mais compactas para evitar espaços */}
      {caso.descricao && (<View style={styles.detailCard}><Text style={styles.label}>Descrição (Antiga):</Text><Text style={styles.value}>{caso.descricao}</Text></View>)}
      {caso.observacoes && (<View style={styles.detailCard}><Text style={styles.label}>Observações (Antiga):</Text><Text style={styles.value}>{caso.observacoes}</Text></View>)}
    </ScrollView>
  );
}
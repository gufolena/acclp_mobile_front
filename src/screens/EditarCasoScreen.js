// src/screens/EditarCasoScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native'; // Removido StyleSheet
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CustomMessageModal from '../components/CustomMessageModal';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { API_BASE_URL } from '../services/api';
import styles from '../styles/EditarCasoScreenStyles'; 

export default function EditarCasoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userToken } = useContext(AuthContext);

  const { casoId } = route.params;

  const [loading, setLoading] = useState(true);
  const [responsaveis, setResponsaveis] = useState([]);
  const [formData, setFormData] = useState({
    titulo_caso: '',
    processo_caso: '',
    status_caso: '',
    responsavel_caso: '',
    descricao_caso: '',
    nome_completo_vitima_caso: '',
    data_nac_vitima_caso: '',
    sexo_vitima_caso: '',
    observacao_vitima_caso: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [messageModalType, setMessageModalType] = useState('info');
  const [messageModalTitle, setMessageModalTitle] = useState('');
  const [messageModalMessage, setMessageModalMessage] = useState('');

  const handleCloseMessageModal = () => {
    setIsMessageModalVisible(false);
    setMessageModalTitle('');
    setMessageModalMessage('');
    if (messageModalType === 'success') {
      navigation.goBack();
    }
    setMessageModalType('info');
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
    const formattedDate = currentDate.toISOString().split('T')[0];
    handleChange('data_nac_vitima_caso', formattedDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const peritoResponse = await axios.get(`${API_BASE_URL}/usuarios/por-tipo/Perito`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        const adminResponse = await axios.get(`${API_BASE_URL}/usuarios/por-tipo/Admin`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        let allResponsaveis = [];

        if (peritoResponse.data && Array.isArray(peritoResponse.data)) {
          allResponsaveis = [...peritoResponse.data];
        } else {
          console.warn('Dados de perito não são um array ou requisição falhou:', peritoResponse.data);
        }

        if (adminResponse.data && Array.isArray(adminResponse.data)) {
          const adminUsers = adminResponse.data;
          adminUsers.forEach(admin => {
            if (!allResponsaveis.some(resp => resp._id === admin._id)) {
              allResponsaveis.push(admin);
            }
          });
        } else {
          console.warn('Dados de admin não são um array ou requisição falhou:', adminResponse.data);
        }

        setResponsaveis(allResponsaveis);

      } catch (error) {
        console.error('Erro ao buscar responsáveis (Perito/Admin):', error);
        Alert.alert('Erro de Conexão', 'Não foi possível carregar a lista de responsáveis. Verifique a conexão com o servidor.');
      }
    };

    fetchResponsaveis();
  }, [userToken]);


  useEffect(() => {
    const fetchCaso = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/casos/${casoId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.success && response.data.data) {
          const casoData = response.data.data;
          setFormData({
            titulo_caso: casoData.titulo_caso || '',
            processo_caso: casoData.processo_caso || '',
            status_caso: casoData.status_caso || 'Em andamento',
            responsavel_caso: casoData.responsavel_caso || '',
            descricao_caso: casoData.descricao_caso || '',
            nome_completo_vitima_caso: casoData.nome_completo_vitima_caso || '',
            data_nac_vitima_caso: casoData.data_nac_vitima_caso ? new Date(casoData.data_nac_vitima_caso).toISOString().split('T')[0] : '',
            sexo_vitima_caso: casoData.sexo_vitima_caso || '',
            observacao_vitima_caso: casoData.observacao_vitima_caso || '',
          });

          if (casoData.data_nac_vitima_caso) {
            setSelectedDate(new Date(casoData.data_nac_vitima_caso));
          }

        } else {
          Alert.alert('Erro', response.data.error || 'Não foi possível carregar os dados do caso.');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao buscar caso para edição:', error);
        Alert.alert('Erro de Conexão', 'Não foi possível carregar o caso. Verifique sua rede.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    if (casoId) {
      fetchCaso();
    } else {
      Alert.alert('Erro', 'ID do caso não fornecido para edição.');
      navigation.goBack();
    }
  }, [casoId, userToken, navigation]);

  const handleSubmit = async () => {
    setLoading(true);

    if (!formData.titulo_caso || !formData.processo_caso || !formData.status_caso || !formData.responsavel_caso) {
      setMessageModalType('error');
      setMessageModalTitle('Campos Obrigatórios');
      setMessageModalMessage('Por favor, preencha Título, Processo, Status e Responsável.');
      setIsMessageModalVisible(true);
      setLoading(false);
      return;
    }

    if (formData.data_nac_vitima_caso && !/^\d{4}-\d{2}-\d{2}$/.test(formData.data_nac_vitima_caso)) {
        setMessageModalType('error');
        setMessageModalTitle('Erro de Data');
        setMessageModalMessage('Formato de data de nascimento inválido. Use AAAA-MM-DD.');
        setIsMessageModalVisible(true);
        setLoading(false);
        return;
    }

    const dataToSend = { ...formData };
    if (dataToSend.data_nac_vitima_caso === '') {
      dataToSend.data_nac_vitima_caso = null;
    } else {
      try {
        dataToSend.data_nac_vitima_caso = new Date(dataToSend.data_nac_vitima_caso).toISOString();
      } catch (e) {
        console.error("Erro ao converter data para ISO (pós-picker):", e);
        setMessageModalType('error');
        setMessageModalTitle('Erro de Data');
        setMessageModalMessage('Problema ao processar a data de nascimento. Tente novamente.');
        setIsMessageModalVisible(true);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/casos/${casoId}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setMessageModalType('success');
        setMessageModalTitle('Sucesso!');
        setMessageModalMessage('Caso atualizado com sucesso!');
        setIsMessageModalVisible(true);
      } else {
        setMessageModalType('error');
        setMessageModalTitle('Erro ao Atualizar');
        setMessageModalMessage(response.data.error || 'Não foi possível atualizar o caso.');
        setIsMessageModalVisible(true);
      }
    } catch (error) {
      console.error('Erro ao atualizar caso:', error);
      if (error.response) {
        console.error("Dados do erro de resposta:", error.response.data);
        console.error("Status do erro de resposta:", error.response.status);
        setMessageModalType('error');
        setMessageModalTitle('Erro do Servidor');
        setMessageModalMessage(error.response.data.error || `Erro ${error.response.status}: Não foi possível atualizar o caso.`);
      } else if (error.request) {
        console.error("Nenhuma resposta recebida:", error.request);
        setMessageModalType('error');
        setMessageModalTitle('Erro de Conexão');
        setMessageModalMessage('Não foi possível conectar ao servidor. Verifique sua rede.');
      } else {
        console.error("Erro na configuração da requisição:", error.message);
        setMessageModalType('error');
        setMessageModalTitle('Erro Interno');
        setMessageModalMessage('Ocorreu um erro inesperado. Tente novamente.');
      }
      setIsMessageModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003f88" />
        <Text style={{ marginTop: 10, color: '#343a40' }}>Carregando dados do caso...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Caso</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          value={formData.titulo_caso}
          onChangeText={(text) => handleChange('titulo_caso', text)}
          placeholder="Título do Caso"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Processo:</Text>
        <TextInput
          style={styles.input}
          value={formData.processo_caso}
          onChangeText={(text) => handleChange('processo_caso', text)}
          placeholder="Número do Processo"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Status:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.status_caso}
            style={styles.picker}
            onValueChange={(itemValue) => handleChange('status_caso', itemValue)}
          >
            <Picker.Item label="Em andamento" value="Em andamento" />
            <Picker.Item label="Finalizado" value="Finalizado" />
            <Picker.Item label="Arquivado" value="Arquivado" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Responsável:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.responsavel_caso}
            style={styles.picker}
            onValueChange={(itemValue) => handleChange('responsavel_caso', itemValue)}
          >
            <Picker.Item label="Escolha a pessoa responsável pelo caso" value="" />
            {responsaveis.length > 0 ? (
              responsaveis.map((responsavel) => (
                <Picker.Item key={responsavel._id} label={responsavel.nome_completo} value={responsavel.nome_completo} />
              ))
            ) : (
              <Picker.Item label="Carregando responsáveis..." value="loading" enabled={false} />
            )}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.descricao_caso}
          onChangeText={(text) => handleChange('descricao_caso', text)}
          placeholder="Descrição detalhada do caso"
          multiline
        />
      </View>

      <Text style={styles.title}>Detalhes da Vítima</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data de Nascimento:</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
          <Text style={formData.data_nac_vitima_caso ? styles.dateInputText : styles.placeholderText}>
            {formData.data_nac_vitima_caso || "Selecione a data (AAAA-MM-DD)"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome Completo da Vítima:</Text>
        <TextInput
          style={styles.input}
          value={formData.nome_completo_vitima_caso}
          onChangeText={(text) => handleChange('nome_completo_vitima_caso', text)}
          placeholder="Nome completo da vítima"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sexo da Vítima:</Text>
        <TextInput
          style={styles.input}
          value={formData.sexo_vitima_caso}
          onChangeText={(text) => handleChange('sexo_vitima_caso', text)}
          placeholder="Ex: Masculino, Feminino, Outro"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Observação da Vítima:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.observacao_vitima_caso}
          onChangeText={(text) => handleChange('observacao_vitima_caso', text)}
          placeholder="Observações sobre a vítima"
          multiline
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Atualizar Caso</Text>
      </TouchableOpacity>

      <CustomMessageModal
        isVisible={isMessageModalVisible}
        title={messageModalTitle}
        message={messageModalMessage}
        type={messageModalType}
        onClose={handleCloseMessageModal}
      />
    </ScrollView>
  );
}
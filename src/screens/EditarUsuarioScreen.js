import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/EditarUsuarioScreenStyles';
import { API_BASE_URL } from '../services/api';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';


// Importe o seu CustomMessageModal
import CustomMessageModal from '../components/CustomMessageModal';

export default function EditarUsuarioScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const { usuarioData } = route.params;

  // Estados para os campos do formulário
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [segundoNome, setSegundoNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [tipoPerfil, setTipoPerfil] = useState('');
  const [croUf, setCroUf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null); // URI para exibição
  const [profileImageBase64, setProfileImageBase64] = useState(null); // Base64 para envio

  // Estados de UI
  const [loading, setLoading] = useState(true); // Começa como true para carregar os dados
  const [submitting, setSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Estados para o CustomMessageModal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info'); // 'success', 'error', 'info'
  const [onModalClose, setOnModalClose] = useState(null); // Função a ser chamada ao fechar o modal

  // Função para exibir o modal customizado
  const showCustomModal = useCallback((title, message, type, onCloseCallback = null) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setOnModalClose(() => onCloseCallback);
    setModalVisible(true);
  }, []);

  // Preencher o formulário com os dados do usuário ao carregar a tela
  useEffect(() => {
    if (usuarioData) {
      setNomeCompleto(usuarioData.nome_completo || '');
      setPrimeiroNome(usuarioData.primeiro_nome || '');
      setSegundoNome(usuarioData.segundo_nome || '');
      setEmail(usuarioData.email || '');
      setTelefone(usuarioData.telefone || '');

      if (usuarioData.data_nascimento) {
        const parsedDate = new Date(usuarioData.data_nascimento);
        if (!isNaN(parsedDate.getTime())) {
          setDataNascimento(parsedDate);
        } else {
          setDataNascimento(new Date());
        }
      } else {
        setDataNascimento(new Date());
      }

      setTipoPerfil(usuarioData.tipo_perfil || '');
      setCroUf(usuarioData.cro_uf || '');
      setProfileImage(usuarioData.foto_perfil_usuario || null); // Pré-popular com a URL existente
    }
    setLoading(false);
  }, [usuarioData]);

  const formatarDataParaExibicao = useCallback((dateObject) => {
    if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
      return 'Selecione a Data';
    }
    return dateObject.toLocaleDateString('pt-BR');
  }, []);

  const onChangeDate = useCallback((event, selectedDate) => {
    const currentDate = selectedDate || dataNascimento;
    setShowDatePicker(false);
    setDataNascimento(currentDate);
  }, [dataNascimento]);

  const pickImage = useCallback(async () => {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!granted) {
    showCustomModal(
      'Permissão Necessária',
      'Precisamos da permissão para acessar a galeria de fotos.',
      'error'
    );
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
    base64: true,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const selectedAsset = result.assets[0];
    setProfileImage(selectedAsset.uri);
    setProfileImageBase64(selectedAsset.base64);
    showCustomModal('Sucesso', 'Foto de perfil selecionada com sucesso!', 'success');
  } else {
    showCustomModal('Informação', 'Seleção de foto cancelada.', 'info');
  }
    }, [showCustomModal]);

  const handleSave = useCallback(async () => {
    setSubmitting(true);

    if (password !== confirmPassword) {
        showCustomModal(
            'Erro de Validação',
            'A senha e a confirmação de senha não coincidem.',
            'error'
        );
        setSubmitting(false);
        return;
    }

    try {
        // 1. Lógica para atualizar a FOTO DE PERFIL (se uma nova foi selecionada)
        if (profileImageBase64) {
            console.log('Tentando atualizar a foto de perfil separadamente...');
            try {
                const fotoPayload = {
                    foto_base64: `data:image/jpeg;base64,${profileImageBase64}`
                };
                console.log('Enviando foto para:', `${API_BASE_URL}/usuarios/${usuarioData._id}/foto`);
                console.log('Tamanho da string Base64 da foto:', fotoPayload.foto_base64.length);

                const fotoResponse = await axios.patch(
                    `${API_BASE_URL}/usuarios/${usuarioData._id}/foto`,
                    fotoPayload,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (fotoResponse.data.sucesso) {
                    console.log('Foto de perfil atualizada com sucesso no backend.');
                    // Opcional: Atualizar a URL da foto no estado usuarioData localmente,
                    // se o backend retornar a nova URL ou base64 para consistência.
                    // Isso pode ser importante se a tela precisar refletir a mudança imediatamente
                    // sem recarregar todos os dados do usuário.
                    // Você pode querer chamar a função que busca os dados do usuário novamente aqui.
                } else {
                    // Trate o erro da foto, mas permita que o resto do formulário seja salvo
                    console.error('Erro ao atualizar apenas a foto:', fotoResponse.data.mensagem);
                    showCustomModal('Erro na Foto', fotoResponse.data.mensagem || 'Não foi possível atualizar a foto.', 'error');
                    // Você pode optar por não retornar aqui, permitindo que os outros dados sejam salvos
                }
            } catch (fotoErr) {
                console.error('Erro na requisição da foto:', fotoErr.response?.data || fotoErr.message);
                let fotoErrorMessage = 'Erro ao enviar a foto. Tente novamente.';
                if (fotoErr.response && fotoErr.response.status === 413) {
                    fotoErrorMessage = 'A imagem é muito grande. Por favor, selecione uma imagem menor.';
                } else if (fotoErr.response && fotoErr.response.data && fotoErr.response.data.mensagem) {
                    fotoErrorMessage = fotoErr.response.data.mensagem;
                }
                showCustomModal('Erro na Foto', fotoErrorMessage, 'error');
                // Ainda assim, permita que o resto do formulário seja salvo, a menos que a foto seja um campo obrigatório
            }
        }

        // 2. Lógica para atualizar os OUTROS DADOS do usuário (sem a foto)
        const dataToUpdate = {
            nome_completo: nomeCompleto,
            primeiro_nome: primeiroNome,
            segundo_nome: segundoNome,
            email,
            telefone,
            data_nascimento: dataNascimento instanceof Date && !isNaN(dataNascimento.getTime())
                               ? dataNascimento.toISOString()
                               : null,
            tipo_perfil: tipoPerfil,
            cro_uf: tipoPerfil === 'Perito' ? croUf : '',
        };

        if (password) {
            dataToUpdate.senha = password;
        }

        console.log('Dados textuais a serem enviados para o backend:', dataToUpdate);

        const response = await axios.put(`${API_BASE_URL}/usuarios/${usuarioData._id}`, dataToUpdate, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.data.sucesso) {
            showCustomModal(
                'Sucesso',
                'Dados do usuário atualizados com sucesso!',
                'success',
                () => navigation.goBack() // Volta após salvar
            );
        } else {
            showCustomModal(
                'Erro',
                response.data.mensagem || 'Erro ao atualizar dados do usuário.',
                'error'
            );
        }
    } catch (err) {
        console.error('Erro geral ao salvar usuário:', err.response?.data || err.message);
        let errorMessage = 'Erro de conexão ou servidor ao salvar dados.';
        if (err.response && err.response.data && err.response.data.mensagem) {
            errorMessage = err.response.data.mensagem;
        }
        showCustomModal(
            'Erro de Conexão',
            errorMessage,
            'error'
        );
    } finally {
        setSubmitting(false);
    }
      }, [nomeCompleto, primeiroNome, segundoNome, email, telefone, dataNascimento, tipoPerfil, croUf, password, confirmPassword, profileImageBase64, userToken, usuarioData._id, navigation, showCustomModal]);
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={styles.primaryColorForIndicator} />
        <Text style={styles.loadingText}>Carregando dados do usuário...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>

      {/* Removido o erro inline, agora o modal cuidará disso */}
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}

      <Text style={styles.sectionTitle}>Informações Pessoais</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome Completo:</Text>
        <TextInput
          style={styles.input}
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
          placeholder="Nome Completo"
          placeholderTextColor={styles.inputPlaceholder}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Primeiro Nome:</Text>
        <TextInput
          style={styles.input}
          value={primeiroNome}
          onChangeText={setPrimeiroNome}
          placeholder="Primeiro Nome"
          placeholderTextColor={styles.inputPlaceholder}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Sobrenome:</Text>
        <TextInput
          style={styles.input}
          value={segundoNome}
          onChangeText={setSegundoNome}
          placeholder="Sobrenome"
          placeholderTextColor={styles.inputPlaceholder}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Data de Nascimento:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={styles.value}>{formatarDataParaExibicao(dataNascimento)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dataNascimento}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}
      </View>

      <Text style={styles.sectionTitle}>Contato</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={styles.inputPlaceholder}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="(XX) XXXXX-XXXX"
          keyboardType="phone-pad"
          placeholderTextColor={styles.inputPlaceholder}
        />
      </View>

      <Text style={styles.sectionTitle}>Informações do Perfil</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de Perfil:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={tipoPerfil}
            onValueChange={(itemValue) => setTipoPerfil(itemValue)}
            style={styles.pickerItem}
          >
            <Picker.Item label="Selecione o Perfil" value="" />
            <Picker.Item label="Administrador" value="Administrador" />
            <Picker.Item label="Perito" value="Perito" />
            <Picker.Item label="Assistente" value="Assistente" />
          </Picker>
        </View>
      </View>

      {tipoPerfil === 'Perito' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>CRO / UF:</Text>
          <TextInput
            style={styles.input}
            value={croUf}
            onChangeText={setCroUf}
            placeholder="Ex: 123456/SP"
            autoCapitalize="characters"
            placeholderTextColor={styles.inputPlaceholder}
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>Alterar Senha (Opcional)</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nova Senha:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Deixe em branco para não alterar"
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor={styles.inputPlaceholder}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Confirmar Nova Senha:</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirme a nova senha"
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor={styles.inputPlaceholder}
        />
      </View>

      <Text style={styles.sectionTitle}>Foto de Perfil</Text>
      {profileImage && (
        // Garante que a URI é válida antes de tentar exibir
        <Image source={{ uri: profileImage }} style={styles.profileImagePreview} />
      )}
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerButtonText}>
          {profileImage ? 'Mudar Foto de Perfil' : 'Selecionar Foto de Perfil'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color={styles.buttonText.color} />
        ) : (
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
        disabled={submitting}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      {/* Renderiza o CustomMessageModal */}
      <CustomMessageModal
        isVisible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
        onClose={() => {
          setModalVisible(false);
          if (onModalClose) {
            onModalClose();
            setOnModalClose(null);
          }
        }}
      />
    </ScrollView>
  );
}
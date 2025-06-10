import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Importe o AuthContext
import styles from '../styles/CriarUsuarioScreenStyles';
import { API_BASE_URL } from '../services/api';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

// Importe o seu CustomMessageModal
import CustomMessageModal from '../components/CustomMessageModal';

export default function CriarUsuarioScreen() {
    const navigation = useNavigation();
    // userToken será usado apenas para a requisição PATCH da foto, se necessário para a criação de usuários
    const { userToken } = useContext(AuthContext); 

    // Estados para os campos do formulário
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [primeiroNome, setPrimeiroNome] = useState('');
    const [segundoNome, setSegundoNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date());
    const [tipoPerfil, setTipoPerfil] = useState(''); // 'Admin', 'Perito', 'Assistente'
    const [croUf, setCroUf] = useState(''); // Apenas para Perito
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null); // URI para exibição
    const [profileImageBase64, setProfileImageBase64] = useState(null); // Base64 para envio

    // Estados de UI
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

    const formatarDataParaExibicao = useCallback((dateObject) => {
        if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
            return 'Selecione a Data';
        }
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return dateObject.toLocaleDateString('pt-BR', options);
    }, []);

    const onChangeDate = useCallback((event, selectedDate) => {
        const currentDate = selectedDate || dataNascimento;
        setShowDatePicker(Platform.OS === 'ios');
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

        try {
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
        } catch (pickerError) {
            console.error('Erro ao abrir o seletor de imagens:', pickerError);
            showCustomModal('Erro', 'Não foi possível abrir a galeria de fotos. Tente novamente.', 'error');
        }
    }, [showCustomModal]);

    const handleCreateUser = useCallback(async () => {
        setSubmitting(true);

        // Validações
        if (!nomeCompleto || !email || !telefone || !tipoPerfil || !password || !confirmPassword) {
            showCustomModal('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            setSubmitting(false);
            return;
        }

        if (password !== confirmPassword) {
            showCustomModal('Erro de Validação', 'A senha e a confirmação de senha não coincidem.', 'error');
            setSubmitting(false);
            return;
        }
        if (password.length < 6) {
            showCustomModal('Erro de Validação', 'A senha deve ter no mínimo 6 caracteres.', 'error');
            setSubmitting(false);
            return;
        }

        if (tipoPerfil === 'Perito' && !croUf) {
            showCustomModal('Erro de Validação', 'CRO/UF é obrigatório para perfil Perito.', 'error');
            setSubmitting(false);
            return;
        }

        let newUserId = null; // Para armazenar o ID do usuário recém-criado

        try {
            // 1. Criar o usuário sem a foto de perfil inicial
            const newUserBasicData = {
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
                senha: password,
            };

            console.log('Dados básicos do novo usuário a serem enviados:', newUserBasicData);

            const response = await axios.post(`${API_BASE_URL}/usuarios`, newUserBasicData, {
                headers: {
                    // **NÃO ADICIONA TOKEN AQUI**: A rota POST para criar usuário é pública
                    'Content-Type': 'application/json',
                },
            });

            if (!response.data.sucesso) {
                showCustomModal(
                    'Erro',
                    response.data.mensagem || 'Erro ao criar usuário.',
                    'error'
                );
                setSubmitting(false);
                return; // Interrompe se a criação básica falhar
            }

            // Supondo que a API retorne o ID do novo usuário em response.data.dados.id
            newUserId = response.data.dados.id;
            console.log('Usuário criado com sucesso! ID:', newUserId);

            // 2. Se uma foto foi selecionada, enviar a foto separadamente
            if (profileImageBase64 && newUserId) {
                console.log('Tentando enviar a foto de perfil separadamente para o novo usuário...');
                try {
                    const fotoPayload = {
                        foto_base64: `data:image/jpeg;base64,${profileImageBase64}`
                    };
                    console.log('Enviando foto para:', `${API_BASE_URL}/usuarios/${newUserId}/foto`);
                    console.log('Tamanho da string Base64 da foto:', fotoPayload.foto_base64.length);

                    const fotoResponse = await axios.patch(
                        `${API_BASE_URL}/usuarios/${newUserId}/foto`,
                        fotoPayload,
                        {
                            headers: {
                                // **ADICIONA TOKEN AQUI**: A rota PATCH para foto DEVE ser autenticada
                                Authorization: `Bearer ${userToken}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (fotoResponse.data.sucesso) {
                        console.log('Foto de perfil adicionada com sucesso ao novo usuário.');
                    } else {
                        console.warn('Aviso: Erro ao adicionar foto de perfil após a criação do usuário:', fotoResponse.data.mensagem);
                        showCustomModal('Aviso', `Usuário criado, mas houve um problema ao salvar a foto: ${fotoResponse.data.mensagem}`, 'info');
                    }
                } catch (fotoErr) {
                    console.error('Erro na requisição da foto para o novo usuário:', fotoErr.response?.data || fotoErr.message);
                    let fotoErrorMessage = 'Não foi possível adicionar a foto de perfil ao usuário recém-criado.';
                    if (fotoErr.response) {
                        if (fotoErr.response.status === 413) {
                            fotoErrorMessage = 'A imagem é muito grande. Por favor, selecione uma imagem menor.';
                        } else if (fotoErr.response.data && fotoErr.response.data.mensagem) {
                            fotoErrorMessage = fotoErr.response.data.mensagem;
                        }
                    }
                    console.warn('Aviso: ', fotoErrorMessage);
                    showCustomModal('Aviso', `Usuário criado, mas houve um problema ao salvar a foto: ${fotoErrorMessage}`, 'info');
                }
            }

            // Se tudo correu bem até aqui (usuário criado e foto, se aplicável, tentada)
            showCustomModal(
                'Sucesso',
                'Usuário criado com sucesso!',
                'success',
                () => navigation.goBack() // Volta para a tela anterior
            );

        } catch (err) {
            console.error('Erro geral ao criar usuário:', err.response?.data || err.message);
            let errorMessage = 'Erro de conexão ou servidor ao tentar criar o usuário.';
            if (err.response) {
                if (err.response.status === 409) { // Exemplo: conflito, email já existe
                    errorMessage = 'Email já cadastrado. Por favor, use outro email.';
                } else if (err.response.data && err.response.data.mensagem) {
                    errorMessage = err.response.data.mensagem;
                } else {
                    errorMessage = `Erro do servidor: ${err.response.status}`;
                }
            }
            showCustomModal(
                'Erro',
                errorMessage,
                'error'
            );
        } finally {
            setSubmitting(false);
        }
    }, [
        nomeCompleto, primeiroNome, segundoNome, email, telefone, dataNascimento,
        tipoPerfil, croUf, password, confirmPassword, profileImageBase64,
        userToken, navigation, showCustomModal
    ]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Criar Novo Usuário</Text>

            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Nome Completo <Text style={styles.required}>*</Text>:</Text>
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
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChangeDate}
                        maximumDate={new Date()}
                    />
                )}
            </View>

            <Text style={styles.sectionTitle}>Contato</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email <Text style={styles.required}>*</Text>:</Text>
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
                <Text style={styles.label}>Tipo de Perfil <Text style={styles.required}>*</Text>:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={tipoPerfil}
                        onValueChange={(itemValue) => setTipoPerfil(itemValue)}
                        style={styles.pickerItem}
                    >
                        <Picker.Item label="Selecione o Perfil" value="" />
                        <Picker.Item label="Admin" value="Admin" />
                        <Picker.Item label="Perito" value="Perito" />
                        <Picker.Item label="Assistente" value="Assistente" />
                    </Picker>
                </View>
            </View>

            {tipoPerfil === 'Perito' && (
                <View style={styles.formGroup}>
                    <Text style={styles.label}>CRO / UF <Text style={styles.required}>*</Text>:</Text>
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

            <Text style={styles.sectionTitle}>Credenciais</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Senha <Text style={styles.required}>*</Text>:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Mínimo 6 caracteres"
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor={styles.inputPlaceholder}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Confirmar Senha <Text style={styles.required}>*</Text>:</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirme a senha"
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor={styles.inputPlaceholder}
                />
            </View>

            <Text style={styles.sectionTitle}>Foto de Perfil (Opcional)</Text>
            {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImagePreview} />
            ) : (
                <Image source={require('../../assets/img/dentista-perito-judicial-como-se-formar.png')} style={styles.profileImagePreview} />
            )}
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.imagePickerButtonText}>
                    {profileImage ? 'Mudar Foto de Perfil' : 'Selecionar Foto de Perfil'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleCreateUser}
                disabled={submitting}
            >
                {submitting ? (
                    <ActivityIndicator color={styles.buttonText.color} />
                ) : (
                    <Text style={styles.buttonText}>Criar Usuário</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
                disabled={submitting}
            >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

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
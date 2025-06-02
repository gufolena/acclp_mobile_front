// LoginScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Snackbar, TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { loginService } from '../services/authService';
import styles from '../styles/LoginScreenStyles';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Preencha todos os campos');
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      const data = await loginService(email, password);
      console.log('Token recebido:', data.token);
      login(data.token);
    } catch (error) {
      console.log('Erro ao logar:', error);
      if (error.response?.data?.mensagem) {
        setErrorMessage(error.response.data.mensagem);
      } else {
        setErrorMessage('Erro ao tentar logar. Verifique suas credenciais.');
      }
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/dentista-perito-judicial-como-se-formar.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <TextInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            mode="flat"
            activeUnderlineColor="#003f88"
            underlineColor="#d7e9fc"
            theme={{
              colors: {
                primary: '#003f88',
                background: '#e8f0fe',
                text: '#003f88',
                placeholder: '#5a7ca8',
              },
            }}
          />

          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            mode="flat"
            activeUnderlineColor="#003f88"
            underlineColor="#d7e9fc"
            theme={{
              colors: {
                primary: '#003f88',
                background: '#e8f0fe',
                text: '#003f88',
                placeholder: '#5a7ca8',
              },
            }}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Entrar
          </Button>
        </View>
      </KeyboardAvoidingView>

      {/* Snackbar de erro */}
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        duration={4000}
        style= {styles.snackbar}
        action={{
          label: 'Fechar',
          labelStyle: { color: "#ffdede" },
          onPress: () => setShowError(false),
        }}
      >
        {errorMessage}
      </Snackbar>
    </ImageBackground>
  );
};

export default LoginScreen;

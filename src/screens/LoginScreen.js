// LoginScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { loginService } from '../services/authService';
import styles from '../styles/LoginScreenStyles';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const data = await loginService(email, password);  // Chama o serviço
      console.log('Token recebido:', data.token);
      login(data.token);  // Usa o token do contexto
    } catch (error) {
      console.error('Erro ao logar:', error);
      if (error.response?.data?.mensagem) {
        alert(error.response.data.mensagem);
      } else {
        alert('Erro ao tentar logar. Verifique suas credenciais.');
      }
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
          />
          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
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
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

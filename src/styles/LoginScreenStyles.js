// src/styles/LoginScreenStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 63, 136, 0.3)', // azul translúcido
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#f0f6fc', // azul muito claro
    borderRadius: 12,
    padding: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#e8f0fe',  // azul clarinho suave para o fundo do campo
    color: '#003f88', // texto em azul escuro para boa leitura
  },
  button: {
    marginTop: 10,
    backgroundColor: '#003f88', // botão com azul escuro
  },
  link: {
    color: '#003f88', // azul escuro coerente com o Drawer
    marginTop: 20,
    textAlign: 'center',
  },
  snackbar: {
    backgroundColor: '#a83232',
    borderRadius: 8,
    margin: 10,
  },
  snackbarText: {
    color: '#000',
  },
});

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f6fc', // azul claro de fundo
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003f88', // azul escuro do menu
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#5a7ca8', // azul secundário do menu
    textAlign: 'center',
  },
});

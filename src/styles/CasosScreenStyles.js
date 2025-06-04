import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6fc',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    color: '#003f88',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#e8f0fe',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003f88',
    marginBottom: 6,
  },
  status: {
    fontSize: 14,
    color: '#5a7ca8',
  },
  data: {
    fontSize: 12,
    color: '#7a92b1',
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#003f88',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

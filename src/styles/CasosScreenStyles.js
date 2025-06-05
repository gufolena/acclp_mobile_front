// src/styles/CasosScreenStyles.js
import { StyleSheet } from 'react-native';

const colors = {
  // Cores base do seu HomeScreenStyles
  background: '#f0f6fc',   // Azul claro de fundo, igual ao HomeScreen
  primaryDark: '#003f88',  // Azul escuro do menu, para títulos de cartão
  primaryLight: '#5a7ca8', // Azul secundário do menu, para botões de ação
  danger: '#dc3545',       // Vermelho para deletar (mantido)

  // Cores adicionais para elementos específicos, ajustadas para harmonizar
  cardBackground: '#ffffff',// Fundo branco para cartões
  textPrimary: '#343a40',   // Cor de texto principal (quase preto)
  textSecondary: '#6c757d', // Cor de texto secundário (cinza)
  border: '#d0e6f5',        // Borda sutil que combina com o fundo claro
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fundo azul claro, igual ao HomeScreen
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Estilo para o botão de "Novo Caso"
  addButton: {
    backgroundColor: colors.primaryLight, // Azul secundário do menu
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: colors.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  addButtonText: {
    color: colors.cardBackground, // Texto branco
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilo para o FlatList ou ScrollView
  scrollContainer: {
    paddingBottom: 20,
  },
  // Estilo para os cartões de caso
  card: {
    backgroundColor: colors.cardBackground, // Fundo branco para os cartões
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: colors.border, // Borda que combina com o fundo
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryDark, // Azul escuro do menu para o título do cartão
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border, // Borda que combina com o fundo
    paddingTop: 15,
  },
  // Estilo para o botão de "Editar"
  editButton: {
    backgroundColor: colors.primaryLight, // Azul secundário do menu
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.primaryLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // Estilo para o botão de "Deletar"
  deleteButton: {
    backgroundColor: colors.danger, // Vermelho (mantido)
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: colors.cardBackground, // Texto branco
    fontSize: 16,
    fontWeight: '600',
  },
});
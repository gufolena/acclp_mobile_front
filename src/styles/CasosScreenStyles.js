// src/styles/CasosScreenStyles.js
import { StyleSheet } from 'react-native';

const colors = {
  background: '#f0f6fc',   // Azul claro de fundo, igual ao HomeScreen
  primaryDark: '#003f88',  // Azul escuro do menu, para títulos de cartão
  primaryLight: '#5a7ca8', // Azul secundário do menu, para botões de ação (editar e novo caso)
  infoButton: '#17a2b8',   // Azul ciano para o botão de visualizar
  danger: '#dc3545',       // Vermelho para deletar (mantido)

  cardBackground: '#ffffff', // Fundo branco para cartões
  textPrimary: '#343a40',    // Cor de texto principal (quase preto)
  textSecondary: '#6c757d',  // Cor de texto secundário (cinza)
  border: '#d0e6f5',         // Borda sutil que combina com o fundo claro
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15, // Reduzido para dar espaço ao searchInput
    elevation: 4,
    shadowColor: colors.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  addButtonText: {
    color: colors.cardBackground,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // --- Novo estilo para o campo de busca ---
  searchInput: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.cardBackground,
    marginBottom: 20, // Espaço entre o campo de busca e a lista de casos
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  // --- Fim do novo estilo ---
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
  },
  viewButton: {
    backgroundColor: colors.infoButton,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.infoButton,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  editButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  deleteButton: {
    backgroundColor: colors.danger,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 0,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: colors.cardBackground,
    fontSize: 14,
    fontWeight: '600',
  },
});
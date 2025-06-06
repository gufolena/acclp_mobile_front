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
    marginBottom: 20,
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
    justifyContent: 'space-between', // Ajustado para distribuir melhor os 3 botões
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
  },
  // Novo estilo para o botão de "Visualizar"
  viewButton: {
    backgroundColor: colors.infoButton, // Azul ciano para Visualizar
    paddingVertical: 10,
    paddingHorizontal: 15, // Ajuste de padding para 3 botões
    borderRadius: 8,
    flex: 1,
    marginRight: 8, // Espaço à direita para o próximo botão
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.infoButton,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // Estilo para o botão de "Editar" (ajustado o marginRight/marginLeft)
  editButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 15, // Ajuste de padding para 3 botões
    borderRadius: 8,
    flex: 1,
    marginRight: 8, // Espaço à direita para o próximo botão
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.primaryLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // Estilo para o botão de "Deletar" (ajustado o marginLeft)
  deleteButton: {
    backgroundColor: colors.danger,
    paddingVertical: 10,
    paddingHorizontal: 15, // Ajuste de padding para 3 botões
    borderRadius: 8,
    flex: 1,
    marginLeft: 0, // Removido o marginLeft para que o marginRight do editar e o flex do deletar se ajustem
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: colors.cardBackground,
    fontSize: 14, // Diminuído um pouco para caber os 3 botões
    fontWeight: '600',
  },
});
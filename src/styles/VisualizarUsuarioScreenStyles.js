// src/styles/VisualizarUsuarioScreenStyles.js
import { StyleSheet } from 'react-native';

// Você pode manter a constante 'colors' para organizar internamente
const colors = {
  background: '#f0f6fc',
  primaryDark: '#003f88',
  textPrimary: '#343a40',
  textSecondary: '#6c757d',
  cardBackground: '#ffffff',
  border: '#d0e6f5',
  danger: '#dc3545',
};

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: colors.danger,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 25,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primaryDark, // Usando colors.primaryDark internamente
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
  },
  detailCard: {
    backgroundColor: colors.cardBackground,
    padding: 18,
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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  noImageText: {
      textAlign: 'center',
      marginTop: 20,
      color: '#999', // cor neutra para textos secundários
  },
  // --- ADICIONE ESTES NO FINAL SE PRECISAR ACESSAR DIRETAMENTE ---
  primaryColorForIndicator: colors.primaryDark, // Uma propriedade para a cor do ActivityIndicator
  secondaryTextColor: colors.textSecondary, // Se precisar acessar textSecondary diretamente
});
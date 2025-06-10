import { StyleSheet } from 'react-native';

const colors = {
  background: '#f0f6fc',
  primaryDark: '#003f88',       // Título principal e bordas de seção
  textPrimary: '#343a40',       // Textos de labels e inputs
  textSecondary: '#6c757d',     // Texto de placeholders, loading, labels em EditarUsuario
  cardBackground: '#ffffff',    // Fundo de inputs, pickers
  border: '#d0e6f5',            // Bordas de inputs, pickers, imagem
  danger: '#dc3545',            // Cor para botões de cancelar/perigo
  success: '#28a745',           // Cor para mensagens de sucesso (se o modal usar)

  // Cores de botões AGORA PADRONIZADAS com EditarCasoScreenStyles.js
  buttonPrimary: '#5a7ca8',     // Cor do botão "Salvar Alterações"
  buttonText: '#ffffff',        // Cor do texto nos botões
  
  inputBorder: '#d0e6f5',       // Cor da borda dos inputs (igual ao 'border' geral)
  inputPlaceholder: '#6c757d',  // Cor do placeholder (igual ao 'textSecondary')
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
    marginBottom: 15,
  },
  successText: {
    fontSize: 16,
    color: colors.success,
    textAlign: 'center',
    marginBottom: 15,
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
    color: colors.primaryDark,
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textSecondary, // Mantive textSecondary para a label, você pode mudar para textPrimary se preferir mais escuro
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10, // Arredondado para 10px para combinar com EditarCasoScreenStyles
    paddingHorizontal: 15, // Ajustado para combinar com EditarCasoScreenStyles
    paddingVertical: 12,   // Ajustado para combinar com EditarCasoScreenStyles
    fontSize: 16,
    color: colors.textPrimary,
    elevation: 1, // Adicionado elevação
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10, // Arredondado para 10px para combinar
    overflow: 'hidden', // Importante para o borderRadius funcionar no Android
    elevation: 1, // Adicionado elevação
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    marginBottom: 10,
  },
  pickerItem: {
    height: 50, // Ajustado para garantir altura consistente do picker
    width: '100%',
    color: colors.textPrimary,
  },
  // Botão Salvar (agora usando a cor do EditarCasoScreenStyles)
  button: {
    backgroundColor: colors.buttonPrimary, // Cor padronizada: #5a7ca8
    paddingVertical: 15, // Ajustado para combinar
    borderRadius: 10, // Ajustado para combinar
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 3, // Elevação ajustada
    shadowColor: colors.buttonPrimary, // Sombra com a própria cor do botão
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Botão Cancelar (mantendo a cor danger)
  cancelButton: {
    backgroundColor: colors.danger, // Mantendo a cor danger: #dc3545
    paddingVertical: 15, // Ajustado para combinar
    borderRadius: 10, // Ajustado para combinar
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 3, // Elevação ajustada
    shadowColor: colors.danger, // Sombra com a própria cor do botão
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cancelButtonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Botão de seleção de imagem (usando a cor primária do botão)
  imagePickerButton: {
    backgroundColor: colors.buttonPrimary, // Usando a cor padronizada: #5a7ca8
    paddingVertical: 12, // Ajustado para ser um pouco menor que os botões principais
    borderRadius: 10, // Ajustado para combinar
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
    elevation: 3, // Elevação ajustada
    shadowColor: colors.buttonPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  imagePickerButtonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  // Cores diretamente como propriedades para uso externo
  primaryColorForIndicator: colors.primaryDark,
  secondaryTextColor: colors.textSecondary,
});
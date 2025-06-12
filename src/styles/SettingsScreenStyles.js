// src/styles/SettingsScreenStyles.js
import { StyleSheet } from 'react-native';

const colors = {
  // Cores claras
  lightBackground: '#f0f6fc',
  lightPrimaryDark: '#003f88',
  lightTextPrimary: '#343a40',
  lightTextSecondary: '#6c757d',
  lightCardBackground: '#ffffff',
  lightBorder: '#d0e6f5',

  // Cores escuras (Defina suas cores para o tema escuro aqui)
  darkBackground: '#121212', // Cor de fundo escura
  darkPrimaryDark: '#BB86FC', // Cor de destaque escura (ex: para títulos)
  darkTextPrimary: '#E0E0E0', // Texto principal claro
  darkTextSecondary: '#A0A0A0', // Texto secundário claro
  darkCardBackground: '#1E1E1E', // Fundo de itens escuros
  darkBorder: '#333333', // Borda escura

  // Cores comuns para ambos os temas (se aplicável, ou defina versões light/dark para cada)
  danger: '#dc3545',
  success: '#28a745',

  // Cores para o Switch (alternar tema)
  switchTrackFalse: '#767577', // Cor quando o switch está desligado
  switchTrackTrue: '#81b0ff',  // Cor quando o switch está ligado
  switchThumbFalse: '#f4f3f4', // Cor do "polegar" do switch desligado
  switchThumbTrue: '#f5dd4b',  // Cor do "polegar" do switch ligado
  switchIosBackground: '#3e3e3e', // Fundo para iOS quando o switch está desligado (opcional)

  // Cores do modal
  modalBackground: 'rgba(0, 0, 0, 0.5)', // Fundo translúcido do modal
  modalContentBackground: '#ffffff', // Fundo do conteúdo do modal (pode ser light/dark)
  modalTitleText: '#343a40',
  modalBodyText: '#6c757d',
  modalButtonBackground: '#5a7ca8',
  modalButtonText: '#ffffff',
};

// Funções auxiliares para obter as cores com base no tema
const getColors = (theme) => ({
  background: theme === 'dark' ? colors.darkBackground : colors.lightBackground,
  primaryDark: theme === 'dark' ? colors.darkPrimaryDark : colors.lightPrimaryDark,
  textPrimary: theme === 'dark' ? colors.darkTextPrimary : colors.lightTextPrimary,
  textSecondary: theme === 'dark' ? colors.darkTextSecondary : colors.lightTextSecondary,
  cardBackground: theme === 'dark' ? colors.darkCardBackground : colors.lightCardBackground,
  border: theme === 'dark' ? colors.darkBorder : colors.lightBorder,
  // Para cores que não mudam com o tema, ou se você definir light/dark para elas também
  danger: colors.danger,
  success: colors.success,
  switchTrackFalse: colors.switchTrackFalse,
  switchTrackTrue: colors.switchTrackTrue,
  switchThumbFalse: colors.switchThumbFalse,
  switchThumbTrue: colors.switchThumbTrue,
  switchIosBackground: colors.switchIosBackground,
  modalContentBackground: theme === 'dark' ? colors.darkCardBackground : colors.modalContentBackground,
  modalTitleText: theme === 'dark' ? colors.darkTextPrimary : colors.modalTitleText,
  modalBodyText: theme === 'dark' ? colors.darkTextSecondary : colors.modalBodyText,
  modalButtonBackground: colors.modalButtonBackground,
  modalButtonText: colors.modalButtonText,
});


// Exporta uma função que recebe o tema e retorna os estilos
export default (theme) => {
  const themedColors = getColors(theme); // Obtém as cores baseadas no tema atual

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: themedColors.background, // Usa a cor do tema
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: themedColors.primaryDark, // Usa a cor do tema
      marginBottom: 25,
      textAlign: 'center',
    },
    optionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: themedColors.cardBackground, // Usa a cor do tema
      paddingVertical: 18,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000', // Sombra pode ser estática ou adaptada ao tema
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      borderWidth: 1,
      borderColor: themedColors.border, // Usa a cor do tema
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionIcon: { // Este estilo será usado em `SettingsScreen.js` para `color={styles.optionIcon.color}`
      color: themedColors.textSecondary, // Usa a cor do tema
    },
    optionText: {
      fontSize: 17,
      color: themedColors.textPrimary, // Usa a cor do tema
      fontWeight: '600',
    },
    // Estilos para o Modal "Sobre o Aplicativo"
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.modalBackground, // Fundo translúcido estático
    },
    modalView: {
      margin: 20,
      backgroundColor: themedColors.modalContentBackground, // Fundo do modal com base no tema
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
      color: themedColors.modalTitleText, // Cor do título do modal
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 24,
      color: themedColors.modalBodyText, // Cor do corpo do texto do modal
    },
    button: {
      borderRadius: 10,
      padding: 12,
      elevation: 2,
      marginTop: 15,
      backgroundColor: themedColors.modalButtonBackground, // Cor do botão do modal
    },
    buttonClose: {
      // Estilos específicos para o botão de fechar, se houver
    },
    textStyle: {
      color: themedColors.modalButtonText, // Cor do texto do botão do modal
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
    // Estilos para o Switch (opcional, se precisar de personalização extra)
    switchTrackFalse: { color: colors.switchTrackFalse },
    switchTrackTrue: { color: colors.switchTrackTrue },
    switchThumbFalse: { color: colors.switchThumbFalse },
    switchThumbTrue: { color: colors.switchThumbTrue },
    switchIosBackground: { color: colors.switchIosBackground },
  });
};
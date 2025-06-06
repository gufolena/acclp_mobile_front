// src/components/ConfirmationModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Para adicionar um ícone de alerta

const colors = {
  backgroundOverlay: 'rgba(0, 0, 0, 0.6)', // Fundo escuro transparente
  modalBackground: '#ffffff',             // Fundo do modal
  primaryDark: '#003f88',                  // Azul escuro para títulos
  danger: '#dc3545',                       // Vermelho para ações destrutivas
  textPrimary: '#343a40',                  // Cor de texto principal
  textSecondary: '#6c757d',                // Cor de texto secundário
  borderColor: '#e0e0e0',                 // Borda suave
  buttonCancel: '#f0f6fc',                 // Cor do botão de cancelar (fundo claro)
};

export default function ConfirmationModal({
  isVisible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Deletar', // Texto padrão para o botão de confirmação
  cancelText = 'Cancelar', // Texto padrão para o botão de cancelar
}) {
  return (
    <Modal
      transparent={true}
      animationType="fade" // Animação suave de aparecimento
      visible={isVisible}
      onRequestClose={onCancel} // Para lidar com o botão "voltar" do Android
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <MaterialIcons name="warning" size={30} color={colors.danger} style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundOverlay, // Fundo semitransparente
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.modalBackground,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 10, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primaryDark,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.buttonCancel,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.danger,
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  confirmButtonText: {
    color: colors.modalBackground,
    fontSize: 16,
    fontWeight: '600',
  },
});
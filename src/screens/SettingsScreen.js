import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import getThemedStyles from '../styles/SettingsScreenStyles';
import { ThemeContext } from '../context/ThemeContext';

import CustomMessageModal from '../components/CustomMessageModal'; // Modal personalizado

export default function SettingsScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);

  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false); // <-- Novo estado

  const handleToggleTheme = () => {
    toggleTheme();
    setShowThemeModal(true); // Mostra o modal
  };

  const handleShowAbout = () => {
    setAboutModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Tema do Aplicativo */}
      <View style={styles.optionItem}>
        <View style={styles.optionContent}>
          <MaterialIcons name="palette" size={24} color={styles.optionIcon.color} />
          <Text style={styles.optionText}>Tema Escuro</Text>
        </View>
        <Switch
          trackColor={{ false: styles.switchTrackFalse.color, true: styles.switchTrackTrue.color }}
          thumbColor={styles.switchThumbTrue.color}
          ios_backgroundColor={styles.switchIosBackground.color}
          onValueChange={handleToggleTheme}
          value={theme === 'dark'}
        />
      </View>

      {/* Idioma */}
      <TouchableOpacity style={styles.optionItem} onPress={() => console.log('Idioma selecionado')}>
        <View style={styles.optionContent}>
          <MaterialIcons name="language" size={24} color={styles.optionIcon.color} />
          <Text style={styles.optionText}>Idioma</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={styles.optionIcon.color} />
      </TouchableOpacity>

      {/* Privacidade e Segurança */}
      <TouchableOpacity style={styles.optionItem} onPress={() => console.log('Privacidade selecionada')}>
        <View style={styles.optionContent}>
          <MaterialIcons name="security" size={24} color={styles.optionIcon.color} />
          <Text style={styles.optionText}>Privacidade e Segurança</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={styles.optionIcon.color} />
      </TouchableOpacity>

      {/* Sobre o Aplicativo */}
      <TouchableOpacity style={styles.optionItem} onPress={handleShowAbout}>
        <View style={styles.optionContent}>
          <MaterialIcons name="info" size={24} color={styles.optionIcon.color} />
          <Text style={styles.optionText}>Sobre o Aplicativo</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={styles.optionIcon.color} />
      </TouchableOpacity>

      {/* Modal Sobre o Aplicativo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutModalVisible}
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Sobre o Aplicativo</Text>
            <Text style={styles.modalText}>
              Este aplicativo foi desenvolvido para auxiliar no gerenciamento de casos judiciais e usuários.
              Ele oferece funcionalidades como visualização e edição de casos, gerenciamento de usuários
              e em breve, geração de laudos. Nosso objetivo é simplificar o fluxo de trabalho e melhorar
              a eficiência da equipe forense.
            </Text>
            <Text style={styles.modalText}>
              Versão: 1.0.0 {'\n'}
              Desenvolvido por: Equipe 3
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setAboutModalVisible(false)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de confirmação de troca de tema */}
      <CustomMessageModal
        isVisible={showThemeModal}
        title="Tema Alterado"
        message={`O tema agora é ${theme === 'light' ? 'Claro' : 'Escuro'}.`}
        type="success"
        onClose={() => setShowThemeModal(false)}
      />
    </ScrollView>
  );
}

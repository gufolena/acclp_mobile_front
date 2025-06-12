// src/screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'; // Para pegar os dados do usuário
import styles from '../styles/ProfileScreenStyles'; // <--- Importe os estilos diretamente (não mais como função)

export default function ProfileScreen() {
  const { userInfo } = useContext(AuthContext); // Pega as informações do usuário
  // REMOVIDA: const styles = getProfileScreenStyles(colors);
  // AGORA: styles é importado diretamente de '../styles/ProfileScreenStyles'

  // Função para lidar com a edição do perfil (pode navegar para outra tela)
  const handleEditProfile = () => {
    console.log('Editar perfil clicado!');
    // Exemplo: navigation.navigate('EditProfile');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={
            userInfo?.foto_perfil
              ? { uri: userInfo.foto_perfil }
              : require('../../assets/img/dentista-perito-judicial-como-se-formar.png') // <--- Certifique-se de ter uma imagem padrão ou ajuste o caminho
          }
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userInfo?.nome || 'Nome do Usuário'}</Text>
        <Text style={styles.profileEmail}>{userInfo?.email || 'email@exemplo.com'}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          {/* A cor do ícone agora é baseada na cor do texto do botão */}
          <MaterialIcons name="edit" size={20} color={styles.editButtonText.color} />
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        {/* CPF - Continuará "Não informado" se não vier da API */}
        <View style={styles.infoItem}>
          {/* Cor do ícone baseada na cor do texto secundário, que está em infoLabel.color */}
          <MaterialIcons name="badge" size={24} color={styles.infoLabel.color} />
          <View>
            <Text style={styles.infoLabel}>CPF</Text>
            <Text style={styles.infoValue}>{userInfo?.cpf || 'Não informado'}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="phone" size={24} color={styles.infoLabel.color} />
          <View>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>{userInfo?.telefone || 'Não informado'}</Text>
          </View>
        </View>

        {/* Endereço - Continuará "Não informado" se não vier da API */}
        <View style={styles.infoItem}>
          <MaterialIcons name="home" size={24} color={styles.infoLabel.color} />
          <View>
            <Text style={styles.infoLabel}>Endereço</Text>
            <Text style={styles.infoValue}>{userInfo?.endereco || 'Não informado'}</Text>
          </View>
        </View>

        {/* Novo campo: CRO/UF */}
        {userInfo?.cro_uf && ( // Só exibe se houver valor
          <View style={styles.infoItem}>
            <MaterialIcons name="medical-information" size={24} color={styles.infoLabel.color} />
            <View>
              <Text style={styles.infoLabel}>CRO/UF</Text>
              <Text style={styles.infoValue}>{userInfo.cro_uf}</Text>
            </View>
          </View>
        )}

      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Outras Informações</Text>

        {/* Nível de Acesso (agora usando tipo_perfil) */}
        <View style={styles.infoItem}>
          <MaterialIcons name="security" size={24} color={styles.infoLabel.color} />
          <View>
            <Text style={styles.infoLabel}>Nível de Acesso</Text>
            <Text style={styles.infoValue}>{userInfo?.tipo_perfil || 'Padrão'}</Text>
          </View>
        </View>

        {/* Descrição - Continuará "Não informado" se não vier da API */}
        {userInfo?.descricao && ( // Só exibe se houver valor
          <View style={styles.infoItem}>
            <MaterialIcons name="description" size={24} color={styles.infoLabel.color} />
            <View>
              <Text style={styles.infoLabel}>Sobre Mim</Text>
              <Text style={styles.infoValue}>{userInfo.descricao}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
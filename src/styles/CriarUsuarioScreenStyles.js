import { StyleSheet } from 'react-native';

const CriarUsuarioScreenStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f0f6fc', // Cor de fundo do seu CriarCaso
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#003f88', // Cor do título do seu CriarCaso
        marginBottom: 25,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#003f88', // Reutilizando a cor do título para títulos de seção
        marginTop: 20,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#d0e6f5', // Borda similar ao seu CriarCaso
        paddingBottom: 5,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#343a40', // Cor de texto do label do seu CriarCaso
        marginBottom: 8,
        fontWeight: '600',
    },
    required: {
        color: '#dc3545', // Uma cor de destaque para campos obrigatórios (vermelho padrão)
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d0e6f5', // Cor da borda do input do seu CriarCaso
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#343a40', // Cor do texto do input do seu CriarCaso
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    inputPlaceholder: { // Para ser usado como `placeholderTextColor` no TextInput
        color: '#999', // Cor do placeholder do seu CriarCaso
    },
    picker: { // Estilo para o View que envolve o Picker
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d0e6f5',
        borderRadius: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        overflow: 'hidden', // Importante para garantir que o borderRadius funcione no Android
    },
    pickerItem: { // Estilo para o próprio Picker
        height: 50, // Altura padrão do Picker
        width: '100%',
        color: '#343a40', // Cor do texto do Picker
    },
    value: { // Para textos dentro de TouchableOpacity (como a data de nascimento)
        fontSize: 16,
        color: '#343a40',
    },
    profileImagePreview: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#003f88', // Borda com a cor principal
        resizeMode: 'cover',
    },
    imagePickerButton: {
        backgroundColor: '#5a7ca8', // Botão de salvar do seu CriarCaso
        paddingVertical: 12, // Um pouco menor que o botão principal
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#5a7ca8',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    imagePickerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: { // Estilo para o botão principal de "Criar Usuário"
        backgroundColor: '#5a7ca8', // Cor do botão de salvar do seu CriarCaso
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        elevation: 3,
        shadowColor: '#5a7ca8',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        // Usando o seu '#dc3545' para a cor de fundo do botão de cancelar
        backgroundColor: '#dc3545',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 30,
        elevation: 3,
        // Usando o seu '#dc3545' também para a cor da sombra
        shadowColor: '#dc3545',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    cancelButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    centered: { // Para ActivityIndicator em telas de carregamento
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f6fc',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#343a40',
    },
    primaryColorForIndicator: '#003f88', // Uma cor para o ActivityIndicator, pegando do seu título
});

export default CriarUsuarioScreenStyles;
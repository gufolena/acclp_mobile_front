# ACCLP Mobile Front-end

## 📱 Visão Geral

Este é um aplicativo móvel desenvolvido em React Native usando Expo, projetado para gerenciar casos de perícias odontológicas. O aplicativo permite que peritos, assistentes e administradores gerenciem casos, usuários e laudos periciais de forma organizada e intuitiva.

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis multiplataforma
- **Expo**: Plataforma para facilitar o desenvolvimento React Native
- **React Navigation**: Biblioteca para navegação entre telas
  - Stack Navigator
  - Drawer Navigator
- **Context API**: Para gerenciamento de estado global (autenticação)
- **Axios**: Cliente HTTP para comunicação com a API
- **AsyncStorage**: Para persistência de dados locais
- **React Native Paper**: Biblioteca de componentes UI
- **Expo Image Picker**: Para seleção de imagens da galeria

## 📂 Estrutura do Projeto

```
acclp_mobile_front/
├── assets/                  # Imagens e recursos estáticos
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── context/             # Contextos globais (AuthContext)
│   ├── navigation/          # Configuração de navegação
│   ├── screens/             # Telas do aplicativo
│   ├── services/            # Serviços para comunicação com API
│   └── styles/              # Estilos para componentes e telas
├── App.js                   # Ponto de entrada da aplicação
├── app.json                 # Configuração do Expo
└── package.json             # Dependências do projeto
```

## 🔍 Principais Funcionalidades

### 1. Sistema de Autenticação
- Login com e-mail e senha
- Persistência de sessão usando AsyncStorage
- Controle de acesso baseado em autenticação

### 2. Gestão de Casos
- Visualização da lista de casos
- Criação de novos casos
- Edição de casos existentes
- Visualização detalhada de cada caso
- Exclusão de casos
- Filtragem e busca de casos

### 3. Gestão de Usuários
- Lista de usuários do sistema
- Criação de novos usuários
- Edição de usuários existentes
- Visualização detalhada de perfis
- Diferentes perfis: Admin, Perito e Assistente

### 4. Dashboard
- Visão geral dos dados do sistema
- Contagem de casos por status
- Estatísticas de usuários por perfil

## 📚 Conceitos Importantes para Entender o Código

### Navegação
O aplicativo utiliza diferentes tipos de navegação:
- **Stack Navigator**: Para navegação linear entre telas relacionadas
- **Drawer Navigator**: Para menu lateral deslizante com acesso às principais seções

### Contexto de Autenticação
- O `AuthContext` mantém o estado de autenticação do usuário
- Gerencia o token JWT para comunicação com a API
- Controla o fluxo de navegação baseado no estado de autenticação

### Consumo de API
- O aplicativo se comunica com um backend REST através do Axios
- Os endpoints são configurados no arquivo `src/services/api.js`
- Cada chamada de API inclui o token de autenticação nos cabeçalhos

### Componentização
- Interface dividida em componentes reutilizáveis
- Modais de confirmação e mensagens
- Cartões para exibição de informações

## 🚀 Como Iniciar o Desenvolvimento

1. Instale as dependências:
   ```
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

3. Use o aplicativo Expo Go no seu dispositivo ou um emulador para visualizar o aplicativo

## 📝 Exemplo de Fluxo de Funcionamento

1. Usuário faz login com suas credenciais
2. Sistema armazena o token JWT no AsyncStorage
3. Usuário é redirecionado para o Dashboard
4. A partir do menu lateral, pode acessar todas as funcionalidades
5. Ao gerenciar casos ou usuários, pode visualizar, criar, editar ou excluir registros
6. Ao finalizar, o usuário pode fazer logout, removendo o token de autenticação

## 🔐 Segurança

- Autenticação baseada em token JWT
- Validação de dados nos formulários
- Confirmação antes de ações críticas (exclusão)
- Tratamento de erros e feedback visual

## 📱 Responsividade e UX

- Interface adaptada para diferentes tamanhos de tela
- Feedback visual para ações do usuário (carregamento, sucesso, erro)
- Design intuitivo com cores consistentes e feedback tátil
- Formulários com validação em tempo real

## 🧩 Como Contribuir

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie para o GitHub (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
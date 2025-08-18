# Journify

<p align="center">
  <img src="https://github.com/user-attachments/assets/10cfc79a-03e6-4541-8e7c-bc6869c97e4c" alt="Journify Logo" width="1000"/>
</p>

<p align="center">
  <strong>Um micro-SaaS para registrar e salvar todas as suas memórias de viagem em um só lugar.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-desenvolvimento%20conclu%C3%ADdo-green" alt="Status do Projeto">
  </p>

---

## 🗺️ Sobre o Projeto

Journify é uma plataforma SaaS (Software as a Service) desenvolvida para entusiastas de viagens. A aplicação permite que os usuários criem um diário digital de suas jornadas, salvando destinos, descrições, fotos e destaques de cada lugar visitado. O objetivo é oferecer uma vitrine elegante e organizada para que os viajantes possam reviver e compartilhar suas aventuras.

Este projeto foi criado como uma peça de portfólio para demonstrar habilidades em **React, Node.js e MongoDB**.

---

## ✨ Funcionalidades Principais

-   **✈️ Registro de Viagens:** Adicione novas viagens com título, datas e descrição geral.
-   **📍 Destaques por Local:** Marque os principais pontos de interesse em cada viagem.
-   **📸 Galeria de Fotos:** Faça upload e associe imagens a cada registro de viagem.
-   **🗺️ Mapa Interativo:** Visualize todas as suas viagens em um mapa-múndi. *(Funcionalidade opcional)*
-   **🔐 Autenticação de Usuários:** Sistema seguro de login e cadastro para proteger seus registros.
-   **✒️ Edição e Exclusão:** Gerencie suas viagens e registros com total liberdade.

---

## 📸 Screenshots / Demonstração

<p align="center">
  <img width="1492" height="940" alt="Mockup Login" src="https://github.com/user-attachments/assets/395f8ef4-2feb-447e-9099-ae8cc89189c7" />
  <br>
  <em>Realize o Login em sua conta.</em>
</p>

<p align="center">
  <img width="1492" height="940" alt="Mockup Amostras" src="https://github.com/user-attachments/assets/1b8a101e-978f-4596-916d-abd81ef69b14" />
  <br>
  <em>Visualize seu hub de momentos salvos em viagens.</em>
</p>

<p align="center">
  <img width="1492" height="940" alt="Mockup Editar momentos" src="https://github.com/user-attachments/assets/dc1f9842-2648-4c91-be0b-577c73c69d28" />
  <br>
  <em>Registre novos momentos.</em>
</p>


---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

| Categoria      | Tecnologias                                     |
| :------------- | :---------------------------------------------- |
| **Frontend** | `React`, `TypeScript`, `Tailwind CSS`  |
| **Backend** | `Node.js`, `Fastify`, `Prisma`                  |
| **Banco de Dados** | `MongoDB`                         |
| **Autenticação** | `JWT`                            |
| **Ferramentas** | `ESLint`, `Prettier`                 |

---

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)
* Uma instância do banco de dados **[Nome do Banco de Dados]** rodando.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/VainestFall2/Journify.git](https://github.com/VainestFall2/Journify.git)
    cd Journify
    ```

2.  **Instale as dependências (Frontend):**
    ```bash
    # Navegue para a pasta do frontend, se houver
    cd frontend
    npm install
    ```

3.  **Instale as dependências (Backend):**
    ```bash
    # Navegue para a pasta do backend, se houver
    cd ../backend
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    - Crie um arquivo `.env` na raiz da pasta do backend.
    - Copie o conteúdo de `.env.example` para o novo arquivo.
    - Preencha as variáveis com suas chaves e credenciais (banco de dados, segredos de autenticação, etc.).
      ```
      # Exemplo de .env
      DATABASE_URL="sua_string_de_conexao_aqui"
      JWT_SECRET="seu_segredo_jwt_aqui"
      ```

5.  **Execute as migrações do banco de dados (se aplicável):**
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie a aplicação:**
    ```bash
    # Para iniciar o backend
    npm run dev

    # Para iniciar o frontend (em outro terminal)
    npm run dev
    ```

Após seguir esses passos, a aplicação estará disponível em `http://localhost:3000` (ou a porta que você configurar).

---

## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um **Fork** do projeto.
2.  Crie uma **Branch** para sua feature (`git checkout -b feature/AmazingFeature`).
3.  Faça o **Commit** de suas mudanças (`git commit -m 'Add some AmazingFeature'`).
4.  Faça o **Push** para a Branch (`git push origin feature/AmazingFeature`).
5.  Abra um **Pull Request**.

---

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

## 👨‍💻 Autor

* **Allan Cesar Amaral Gomes** - [LinkedIn](www.linkedin.com/in/allancesargomes) - [Email](allancagomes@hotmail.com)

Link do Projeto: [https://github.com/VainestFall2/Journify](https://github.com/VainestFall2/Journify)

# ⛩️ Dojo Scheduler ⛩️

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)
![Licença](https://img.shields.io/badge/licença-MIT-blue)

Uma aplicação web full-stack moderna para o gerenciamento completo de dojos de artes marciais, desenvolvida como solução para o Projeto Integrador Transdisciplinar em Engenharia de Software II.

<img width="2505" height="1186" alt="image" src="https://github.com/user-attachments/assets/d10aa6a4-76dc-40e5-9984-10252d1b8b33" />

> Dashboard - Dojo Scheduler

---

## 🎯 Sobre o Projeto

O **Dojo Scheduler** foi criado para resolver a necessidade de uma ferramenta centralizada e intuitiva para administrar alunos, aulas e matrículas. A plataforma oferece uma experiência de usuário fluida, com um design responsivo e funcionalidades robustas que garantem a integridade dos dados e facilitam a rotina administrativa de um dojo.

O projeto foi construído seguindo as melhores práticas de desenvolvimento, com uma arquitetura baseada em componentes, um backend robusto e um banco de dados relacional gerenciado por um ORM moderno.

---

## ✨ Funcionalidades Principais

*   **📊 Dashboard Inteligente:** Visão geral com estatísticas de alunos e aulas, além de um feed de atividades recentes que é atualizado em tempo real.
*   **👤 Gerenciamento de Alunos (CRUD):**
    *   Cadastro de novos alunos com validação de dados (email, telefone).
    *   Visualização em tabela responsiva.
    *   Exclusão segura de membros.
*   **🥋 Gerenciamento de Aulas (CRUD):**
    *   Criação de novas aulas com dia da semana, horários e capacidade máxima.
    *   Visualização e exclusão de aulas existentes.
*   **🎟️ Sistema de Matrículas:**
    *   Interface simples para matricular alunos em aulas.
    *   Validação automática de vagas disponíveis.
    *   Prevenção inteligente contra matrículas duplicadas.
*   **🗓️ Agenda Semanal:** Uma visualização clara de todas as aulas da semana, organizadas por dia, com indicadores de ocupação.
*   **🌙 Tema Escuro e Claro:** Suporte nativo a temas, com persistência da preferência do usuário.

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
| :--- | :--- |
| **Frontend** | React, Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, TypeScript |
| **Banco de Dados** | Prisma ORM, SQLite (Facilmente portável para PostgreSQL/MySQL) |
| **UI/UX** | Shadcn/UI, Lucide React (Ícones), Sonner (Notificações), Zod (Validação) |
| **Testes** | Jest, React Testing Library |

---

## 🚀 Começando

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

*   Node.js (versão 18.x ou superior)
*   npm ou yarn

### Instalação

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/seu-usuario/dojo-scheduler.git
    cd dojo-scheduler
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    ```sh 
    copy .env.example .env
    ```
ou se estiver no linux:
```sh 
    cp .env.example .env
```

4.  **Configure o Banco de Dados:**
    O Prisma precisa criar e popular o banco de dados SQLite.
    ```sh
    npx prisma migrate dev
    ```
    Este comando irá:
    *   Criar o arquivo do banco de dados em `prisma/dev.db`.
    *   Aplicar o schema definido em `prisma/schema.prisma`.

5.  **Inicie o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```

6.  Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação.

---

## 🧪 Rodando os Testes

Para garantir a qualidade e a robustez do código, foram implementados testes unitários e de integração. Para executá-los, use o comando:

```sh
npm test
```

---

## 📂 Estrutura de Pastas

A estrutura do projeto foi organizada para manter a escalabilidade e a clareza:

```
dojo-scheduler/
├── prisma/               # Schema e migrações do banco de dados
├── public/               # Arquivos estáticos
├── src/
│   ├── app/
│   │   ├── api/          # Rotas da API (backend)
│   │   │   ├── activities/
│   │   │   ├── bookings/
│   │   │   ├── classes/
│   │   │   └── members/
│   │   ├── (pages)/      # Rotas de páginas da aplicação (frontend)
│   │   │   ├── agenda/
│   │   │   ├── bookings/
│   │   │   ├── classes/
│   │   │   └── members/
│   │   └── layout.tsx    # Layout principal
│   │   └── page.tsx      # Página do Dashboard
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── layout/
│   │   └── ui/           # Componentes base (shadcn)
│   ├── context/          # Contexto global da aplicação (AppProvider)
│   └── lib/              # Funções utilitárias e tipos
└── README.md
```

---

## 🖼️ Screenshots

<p align="center">
  <img width="2505" height="1186" alt="image" src="https://github.com/user-attachments/assets/49bdf3c2-1b0c-4854-ab5c-75eafa9f2706" />
</p>

<br/>

<p align="center">
  <img width="1318" height="694" alt="image" src="https://github.com/user-attachments/assets/18e092d2-ebb2-4922-8929-997c7fdb359b" />
</p>

<br/>

<p align="center">
  <img width="1387" height="960" alt="image" src="https://github.com/user-attachments/assets/a9e5ef97-1ac3-42b2-ae4e-2a0902002ae7" />
</p>

<br/>

> Modo Escuro

<p align="center">
  <img width="2480" height="1200" alt="image" src="https://github.com/user-attachments/assets/8e330643-f7dd-4bf7-abe7-e2d9273cd4ad" />
</p>

<br/>

<p align="center">
  <img width="1448" height="935" alt="image" src="https://github.com/user-attachments/assets/3ff617f0-6253-4992-88b9-7985469b5278" />
</p>

<br/>

> Mobile

<p align="center">
  <img width="420" height="857" alt="Mobile view 1" src="https://github.com/user-attachments/assets/398262d7-e458-45f6-875e-b800e936241b" />
</p>

<br/>

<p align="center">
  <img width="421" height="857" alt="Mobile view 2" src="https://github.com/user-attachments/assets/9006e873-807a-46e6-a84a-5ba4a9597336" />
</p>

<br/>

<p align="center">
  <img width="415" height="863" alt="Mobile view 3" src="https://github.com/user-attachments/assets/88fc9b2e-c756-44fb-8ad8-4b04c279199c" />
</p>


---

## 👨‍💻 Autor 

*   **Christiansen Taques**
*   **Projeto Integrador Transdisciplinar em Engenharia de Software II - UNIFRAN**

---

## 📜 Licença

Distribuído sob a licença MIT. 


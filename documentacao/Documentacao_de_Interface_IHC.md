# Documentação de Interface Humano-Computador - Dojo Scheduler

Este documento descreve a interface do usuário (UI) e a experiência do usuário (UX) da aplicação Dojo Scheduler, conforme os requisitos da Situação-Problema 1.

## 1. Mapa de Navegação e Funcionalidades

A estrutura da aplicação é organizada em torno de quatro seções principais, cada uma correspondendo a um caso de uso fundamental do sistema. A navegação é centralizada em uma barra lateral que permite acesso rápido a todas as áreas.

O mapa conceitual das funcionalidades pode ser visualizado no **Diagrama de Casos de Uso** presente nesta pasta de documentação.

## 2. Protótipos de Tela 

O desenvolvimento da aplicação adotou uma abordagem de prototipagem rápida, onde o próprio software funcional serve como protótipo de alta fidelidade. As telas principais são:

### 2.1. Dashboard (Página Inicial)
- **Descrição:** Ponto de entrada da aplicação. Apresenta cartões com estatísticas chave (total de alunos e aulas) e um feed de atividades recentes para manter o administrador informado.
- **Screenshot:**
  *![Dashboard do Dojo Scheduler](https://private-user-images.githubusercontent.com/102271783/501293408-49bdf3c2-1b0c-4854-ab5c-75eafa9f2706.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjEwMjYyNTksIm5iZiI6MTc2MTAyNTk1OSwicGF0aCI6Ii8xMDIyNzE3ODMvNTAxMjkzNDA4LTQ5YmRmM2MyLTFiMGMtNDg1NC1hYjVjLTc1ZWFmYTlmMjcwNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAyMVQwNTUyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kMThhMTBjYjgxNGI4M2QyYTkxY2M4MjYyOWQzNWRhNmMzM2Y0M2UxZTZhMmIxZGZlNTc0Yzc0OGM1Zjg2ZDc2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.lPDPCv3bvpiV0h-lLjoYpgB2ER9elI-Gh4ptyP_ZDN0)*

### 2.2. Gerenciamento de Alunos
- **Descrição:** Composta por um formulário de cadastro e uma tabela de visualização. O formulário utiliza validação em tempo real e máscaras de entrada para garantir a qualidade dos dados. A tabela permite a exclusão de registros com um diálogo de confirmação para prevenir ações acidentais.
- **Screenshot:**
  *![Tela de Gerenciamento de Alunos](https://i.imgur.com/71b45xJ.png)*

### 2.3. Gerenciamento de Aulas
- **Descrição:** Similar à tela de alunos, apresenta um formulário para criação de novas turmas (com nome, dia, horário e capacidade) e uma tabela que exibe as aulas existentes.
- **Screenshot:**
  *![Tela de Gerenciamento de Aulas](https://private-user-images.githubusercontent.com/102271783/501293457-18e092d2-ebb2-4922-8929-997c7fdb359b.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjEwMjYyNTksIm5iZiI6MTc2MTAyNTk1OSwicGF0aCI6Ii8xMDIyNzE3ODMvNTAxMjkzNDU3LTE4ZTA5MmQyLWViYjItNDkyMi04OTI5LTk5N2M3ZmRiMzU5Yi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAyMVQwNTUyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zMTlhNjI5MjRhMzA0Nzc2NjQyYjFmYzcyMzlhOGVjMDYwYjhiMGRkMmQ3YzU4OTg1ZTVkY2JhZTQ5YWRlZDZhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.sJ19DlCGscxrN6iSpbioYtE991c3fyB8yBBnMJ5nW-E)*

### 2.4. Gerenciamento de Matrículas
- **Descrição:** Tela central para a principal operação do sistema. Contém um formulário para selecionar um aluno e uma aula, com validação de vagas, e uma tabela que lista todas as matrículas ativas.
- **Screenshot:**
  *![Tela de Gerenciamento de Matrículas](https://i.imgur.com/sdkjTOL.png)*

### 2.5. Agenda Semanal
- **Descrição:** Exibe todas as aulas cadastradas, organizadas visualmente por dia da semana, facilitando o planejamento e a consulta rápida.
- **Screenshot:**
  *![Tela da Agenda](https://private-user-images.githubusercontent.com/102271783/501293479-a9e5ef97-1ac3-42b2-ae4e-2a0902002ae7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjEwMjYyNTksIm5iZiI6MTc2MTAyNTk1OSwicGF0aCI6Ii8xMDIyNzE3ODMvNTAxMjkzNDc5LWE5ZTVlZjk3LTFhYzMtNDJiMi1hZTRlLTJhMDkwMjAwMmFlNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAyMVQwNTUyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00MjViNzA3ZWExYzUzNzc2Nzg0NmZlMTAzMjczYzEzNWJhMTY2MWRjY2ZmNmU4MThmYjA1NTY5N2RkMmIwY2JmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.Onuvf0SCY50GLBbN8rOjv-Kmxkw7BY9PtRQaIKFwYZU)*

## 3. Mensagens de Erro e Feedback ao Usuário

A comunicação com o usuário é realizada através de mensagens claras e contextuais, utilizando notificações do tipo "toast". As principais mensagens de erro e sucesso planejadas e validadas são:

- **Sucesso:**
  - `[Nome do Aluno] foi cadastrado(a) com sucesso!`
  - `Matrícula de [Nome do Aluno] realizada com sucesso!`
  - `[Nome da Aula] criada com sucesso!`
- **Erro (Validação de Formulário):**
  - `O nome deve ter pelo menos 3 caracteres.`
  - `Formato de email inválido.`
- **Erro (Regra de Negócio):**
  - `Este aluno já está matriculado nesta aula.`
  - `Esta aula já atingiu a capacidade máxima.`
  - `Falha ao realizar matrícula.`

A validação detalhada e o feedback coletado sobre estas mensagens estão documentados no **Relatório de Validação de Usuário** do projeto.
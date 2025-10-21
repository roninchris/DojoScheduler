# Dicionário de Dados - Dojo Scheduler

Este documento detalha a estrutura do banco de dados utilizado na aplicação.

## Tabela: Member

| Coluna    | Tipo de Dado | Chave? | Nulo? | Descrição                                        |
|-----------|--------------|--------|-------|--------------------------------------------------|
| `id`      | String       | PK     | Não   | Identificador único universal do aluno (UUID).   |
| `name`    | String       |        | Não   | Nome completo do aluno.                          |
| `email`   | String       |        | Não   | Email único do aluno.                            |
| `phone`   | String       |        | Não   | Telefone de contato.                             |
| `createdAt`| DateTime    |        | Não   | Data e hora do cadastro do aluno.                |

## Tabela: Class

| Coluna        | Tipo de Dado | Chave? | Nulo? | Descrição                                        |
|---------------|--------------|--------|-------|--------------------------------------------------|
| `id`          | String       | PK     | Não   | Identificador único universal da aula (UUID).    |
| `name`        | String       |        | Não   | Nome da aula (ex: "Karatê Kids").                |
| `dayOfWeek`   | Int          |        | Não   | Dia da semana (0 = Domingo, 1 = Segunda, etc).   |
| `startTime`   | String       |        | Não   | Horário de início no formato "HH:MM".            |
| `endTime`     | String       |        | Não   | Horário de término no formato "HH:MM".           |
| `maxCapacity` | Int          |        | Não   | Número máximo de alunos permitidos na aula.      |
| `createdAt`   | DateTime     |        | Não   | Data e hora de criação da aula.                  |

## Tabela: Booking

| Coluna    | Tipo de Dado | Chave? | Nulo? | Descrição                                        |
|-----------|--------------|--------|-------|--------------------------------------------------|
| `id`      | String       | PK     | Não   | Identificador único universal da matrícula (UUID)|
| `memberId`| String       | FK     | Não   | Chave estrangeira referenciando o `Member`.      |
| `classId` | String       | FK     | Não   | Chave estrangeira referenciando a `Class`.       |
| `createdAt`| DateTime    |        | Não   | Data e hora em que a matrícula foi realizada.    |
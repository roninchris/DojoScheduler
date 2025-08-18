# 🥋 DojoScheduler

Sistema para personal trainers e academias de artes marciais.  
Permite cadastrar alunos, criar aulas e reservar vagas de **Muay Thai, Taekwondo e Karatê**.

---

## 🚀 Como rodar

### 1. Backend (API - FastAPI + SQLite)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

- API: http://127.0.0.1:8000
- Docs: http://127.0.0.1:8000/docs

## Banco de Dados
- **SGBD**: SQLite
- Arquivo: `backend/data.db`

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, SessionLocal
from . import models
from .routes import users, classes, bookings

# Cria a aplicação FastAPI
app = FastAPI(title="Dojo API", version="1.0.0")

# Permite o servidor de desenvolvimento Next.js e outros servidores locais
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:9002",
    "http://127.0.0.1:9002",
]

# Adiciona o middleware CORS à aplicação
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui os roteadores para usuários, aulas e reservas
app.include_router(users.router)
app.include_router(classes.router)
app.include_router(bookings.router)

@app.on_event("startup")
def on_startup():
    # Cria as tabelas no banco de dados
    Base.metadata.create_all(bind=engine)
    
    # Insere dados iniciais se o banco de dados estiver vazio
    db = SessionLocal()
    try:
        # Verifica se já existem membros cadastrados
        if db.query(models.Member).count() == 0:
            # Cria uma lista de membros iniciais
            members = [
                models.Member(name="Kenji Tanaka", email="kenji.t@example.com", phone="555-0101"),
                models.Member(name="Yumi Sato", email="yumi.s@example.com", phone="555-0102"),
                models.Member(name="Haruto Ito", email="haruto.i@example.com", phone="555-0103"),
            ]
            # Adiciona todos os membros ao banco de dados
            db.add_all(members)
            db.commit()
        
        # Verifica se já existem aulas cadastradas
        if db.query(models.ClassModel).count() == 0:
            # Cria uma lista de aulas iniciais
            classes = [
                models.ClassModel(name="Karate Fundamentals", schedule="Mon, Wed 5:00 PM", capacity=20),
                models.ClassModel(name="Advanced Kata", schedule="Tue, Thu 7:00 PM", capacity=15),
                models.ClassModel(name="Judo Throws", schedule="Fri 6:00 PM", capacity=12),
                models.ClassModel(name="Aikido Principles", schedule="Sat 10:00 AM", capacity=18),
            ]
            # Adiciona todas as aulas ao banco de dados
            db.add_all(classes)
            db.commit()
    finally:
        # Garante que a conexão com o banco de dados seja fechada
        db.close()

# Rota para verificação de saúde do aplicativo
@app.get("/health")
def health():
    return {"status": "ok"}
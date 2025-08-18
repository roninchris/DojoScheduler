from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import usuarios, aulas, reservas
from .database import init_db

app = FastAPI(title="Martial Arts Class Booking API", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router, prefix="/usuarios", tags=["Usuários"])
app.include_router(aulas.router, prefix="/aulas", tags=["Aulas"])
app.include_router(reservas.router, prefix="/reservas", tags=["Reservas"])

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/", tags=["Health"])
def read_root():
    return {"status": "ok"}

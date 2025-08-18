from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class UsuarioBase(BaseModel):
    nome: str = Field(..., min_length=2, max_length=100)
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int
    class Config:
        from_attributes = True

class AulaBase(BaseModel):
    titulo: str = Field(..., min_length=2, max_length=120)
    descricao: str | None = Field(None, max_length=300)
    data_hora: datetime
    capacidade: int = Field(..., ge=1, le=100)
    instrutor: str = Field(..., min_length=2, max_length=120)

class AulaCreate(AulaBase):
    pass

class Aula(AulaBase):
    id: int
    class Config:
        from_attributes = True

class ReservaBase(BaseModel):
    usuario_id: int
    aula_id: int

class ReservaCreate(ReservaBase):
    pass

class Reserva(ReservaBase):
    id: int
    class Config:
        from_attributes = True

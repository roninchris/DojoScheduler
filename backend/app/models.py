from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, ForeignKey, UniqueConstraint
from .database import Base
from datetime import datetime

class Usuario(Base):
    __tablename__ = "usuarios"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, index=True, nullable=False)
    reservas = relationship("Reserva", back_populates="usuario", cascade="all, delete-orphan")

class Aula(Base):
    __tablename__ = "aulas"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    titulo: Mapped[str] = mapped_column(String(120), nullable=False)
    descricao: Mapped[str] = mapped_column(String(300), nullable=True)
    data_hora: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    capacidade: Mapped[int] = mapped_column(Integer, nullable=False, default=10)
    instrutor: Mapped[str] = mapped_column(String(120), nullable=False)
    reservas = relationship("Reserva", back_populates="aula", cascade="all, delete-orphan")

class Reserva(Base):
    __tablename__ = "reservas"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    aula_id: Mapped[int] = mapped_column(ForeignKey("aulas.id", ondelete="CASCADE"), nullable=False)
    usuario = relationship("Usuario", back_populates="reservas")
    aula = relationship("Aula", back_populates="reservas")
    __table_args__ = (UniqueConstraint("usuario_id", "aula_id", name="uq_usuario_aula"),)

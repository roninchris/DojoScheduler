from sqlalchemy.orm import Session
from . import models, schemas

def create_usuario(db: Session, data: schemas.UsuarioCreate) -> models.Usuario:
    usuario = models.Usuario(nome=data.nome, email=data.email)
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

def list_usuarios(db: Session):
    return db.query(models.Usuario).order_by(models.Usuario.id).all()

def create_aula(db: Session, data: schemas.AulaCreate) -> models.Aula:
    aula = models.Aula(**data.dict())
    db.add(aula)
    db.commit()
    db.refresh(aula)
    return aula

def list_aulas(db: Session):
    return db.query(models.Aula).order_by(models.Aula.data_hora).all()

def create_reserva(db: Session, data: schemas.ReservaCreate) -> models.Reserva:
    aula = db.query(models.Aula).filter(models.Aula.id == data.aula_id).first()
    if not aula:
        raise ValueError("Aula não encontrada.")
    count = db.query(models.Reserva).filter(models.Reserva.aula_id == data.aula_id).count()
    if count >= aula.capacidade:
        raise ValueError("Capacidade esgotada para esta aula.")
    existing = db.query(models.Reserva).filter(
        models.Reserva.aula_id == data.aula_id,
        models.Reserva.usuario_id == data.usuario_id
    ).first()
    if existing:
        raise ValueError("Usuário já possui reserva nesta aula.")
    reserva = models.Reserva(usuario_id=data.usuario_id, aula_id=data.aula_id)
    db.add(reserva)
    db.commit()
    db.refresh(reserva)
    return reserva

def list_reservas(db: Session):
    return db.query(models.Reserva).order_by(models.Reserva.id).all()

def delete_reserva(db: Session, reserva_id: int) -> bool:
    reserva = db.query(models.Reserva).filter(models.Reserva.id == reserva_id).first()
    if not reserva:
        return False
    db.delete(reserva)
    db.commit()
    return True

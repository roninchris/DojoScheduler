from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, services

router = APIRouter()

@router.get("", response_model=list[schemas.Usuario])
def list_usuarios(db: Session = Depends(get_db)):
    return services.list_usuarios(db)

@router.post("", response_model=schemas.Usuario, status_code=201)
def create_usuario(data: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    try:
        return services.create_usuario(db, data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

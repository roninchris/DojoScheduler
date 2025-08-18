from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, services

router = APIRouter()

@router.get("", response_model=list[schemas.Aula])
def list_aulas(db: Session = Depends(get_db)):
    return services.list_aulas(db)

@router.post("", response_model=schemas.Aula, status_code=201)
def create_aula(data: schemas.AulaCreate, db: Session = Depends(get_db)):
    try:
        return services.create_aula(db, data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

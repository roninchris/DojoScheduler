from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, services

router = APIRouter()

@router.get("", response_model=list[schemas.Reserva])
def list_reservas(db: Session = Depends(get_db)):
    return services.list_reservas(db)

@router.post("", response_model=schemas.Reserva, status_code=201)
def create_reserva(data: schemas.ReservaCreate, db: Session = Depends(get_db)):
    try:
        return services.create_reserva(db, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro inesperado")

@router.delete("/{reserva_id}", status_code=204)
def delete_reserva(reserva_id: int, db: Session = Depends(get_db)):
    ok = services.delete_reserva(db, reserva_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")
    return None

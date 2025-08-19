
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import schemas, crud

router = APIRouter(prefix="/api/classes", tags=["classes"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.Class])
def list_classes(db: Session = Depends(get_db)):
    return crud.get_classes(db)

@router.post("/", response_model=schemas.Class, status_code=201)
def create_class(clazz: schemas.ClassCreate, db: Session = Depends(get_db)):
    return crud.create_class(db, clazz)

@router.delete("/{class_id}", response_model=schemas.Class)
def delete_class(class_id: int, db: Session = Depends(get_db)):
    c = crud.delete_class(db, class_id)
    if not c:
        raise HTTPException(404, "Class not found")
    return c

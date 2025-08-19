from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import MartialClass
from ..schemas import MartialClass as ClassSchema, MartialClassCreate
from typing import List

router = APIRouter(prefix="/classes", tags=["classes"])

@router.get("/", response_model=List[ClassSchema])
def list_classes(db: Session = Depends(get_db)):
    return db.query(MartialClass).order_by(MartialClass.name).all()

@router.post("/", response_model=ClassSchema, status_code=201)
def create_class(klass: MartialClassCreate, db: Session = Depends(get_db)):
    obj = MartialClass(**klass.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/{class_id}", response_model=ClassSchema)
def get_class(class_id: int, db: Session = Depends(get_db)):
    obj = db.get(MartialClass, class_id)
    if not obj:
        raise HTTPException(404, "Class not found")
    return obj

@router.put("/{class_id}", response_model=ClassSchema)
def update_class(class_id: int, klass: MartialClassCreate, db: Session = Depends(get_db)):
    obj = db.get(MartialClass, class_id)
    if not obj:
        raise HTTPException(404, "Class not found")
    for k, v in klass.dict().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{class_id}", status_code=204)
def delete_class(class_id: int, db: Session = Depends(get_db)):
    obj = db.get(MartialClass, class_id)
    if not obj:
        raise HTTPException(404, "Class not found")
    db.delete(obj)
    db.commit()
    return None

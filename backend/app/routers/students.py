from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Student
from ..schemas import Student as StudentSchema, StudentCreate
from typing import List

router = APIRouter(prefix="/students", tags=["students"])

@router.get("/", response_model=List[StudentSchema])
def list_students(db: Session = Depends(get_db)):
    return db.query(Student).order_by(Student.name).all()

@router.post("/", response_model=StudentSchema, status_code=201)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    obj = Student(**student.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/{student_id}", response_model=StudentSchema)
def get_student(student_id: int, db: Session = Depends(get_db)):
    obj = db.get(Student, student_id)
    if not obj:
        raise HTTPException(404, "Student not found")
    return obj

@router.put("/{student_id}", response_model=StudentSchema)
def update_student(student_id: int, student: StudentCreate, db: Session = Depends(get_db)):
    obj = db.get(Student, student_id)
    if not obj:
        raise HTTPException(404, "Student not found")
    for k, v in student.dict().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{student_id}", status_code=204)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    obj = db.get(Student, student_id)
    if not obj:
        raise HTTPException(404, "Student not found")
    db.delete(obj)
    db.commit()
    return None

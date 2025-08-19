from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models import Enrollment, MartialClass, Student
from ..schemas import Enrollment as EnrollSchema, EnrollmentCreate
from typing import List

router = APIRouter(prefix="/enrollments", tags=["enrollments"])

@router.get("/", response_model=List[EnrollSchema])
def list_enrollments(db: Session = Depends(get_db)):
    return db.query(Enrollment).all()

@router.post("/", response_model=EnrollSchema, status_code=201)
def create_enrollment(payload: EnrollmentCreate, db: Session = Depends(get_db)):
    student = db.get(Student, payload.student_id)
    klass = db.get(MartialClass, payload.class_id)
    if not student or not klass:
        raise HTTPException(400, "Invalid student or class id")
    # capacity check
    current = db.query(func.count(Enrollment.id)).filter(Enrollment.class_id == payload.class_id).scalar()
    if current >= klass.capacity:
        raise HTTPException(409, "Class is full")
    # unique check handled by constraint; but we can pre-check
    exists = db.query(Enrollment).filter(Enrollment.student_id==payload.student_id, Enrollment.class_id==payload.class_id).first()
    if exists:
        raise HTTPException(409, "Student already enrolled in this class")
    obj = Enrollment(student_id=payload.student_id, class_id=payload.class_id)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{enrollment_id}", status_code=204)
def delete_enrollment(enrollment_id: int, db: Session = Depends(get_db)):
    obj = db.get(Enrollment, enrollment_id)
    if not obj:
        raise HTTPException(404, "Enrollment not found")
    db.delete(obj)
    db.commit()
    return None

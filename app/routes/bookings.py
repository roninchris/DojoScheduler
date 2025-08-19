
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import schemas, crud

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.Booking])
def list_bookings(db: Session = Depends(get_db)):
    return crud.get_bookings(db)

@router.post("/", response_model=schemas.Booking, status_code=201)
def create_booking(payload: schemas.BookingCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_booking(db, payload.member_id, payload.class_id)
    except ValueError as e:
        raise HTTPException(400, str(e))

@router.delete("/{booking_id}", response_model=schemas.Booking)
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    b = crud.delete_booking(db, booking_id)
    if not b:
        raise HTTPException(404, "Booking not found")
    return b

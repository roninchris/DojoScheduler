
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import schemas, crud

router = APIRouter(prefix="/api/users", tags=["users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.Member])
def list_users(db: Session = Depends(get_db)):
    return crud.get_members(db)

@router.post("/", response_model=schemas.Member, status_code=201)
def create_user(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    return crud.create_member(db, member)

@router.delete("/{member_id}", response_model=schemas.Member)
def delete_user(member_id: int, db: Session = Depends(get_db)):
    m = crud.delete_member(db, member_id)
    if not m:
        raise HTTPException(404, "User not found")
    return m

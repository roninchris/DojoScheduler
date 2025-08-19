
from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas

# Members
def get_members(db: Session):
    return db.query(models.Member).all()

def get_member(db: Session, member_id: int):
    return db.query(models.Member).filter(models.Member.id == member_id).first()

def create_member(db: Session, member: schemas.MemberCreate):
    m = models.Member(name=member.name, email=member.email, phone=member.phone)
    db.add(m)
    db.commit()
    db.refresh(m)
    return m

def delete_member(db: Session, member_id: int):
    m = get_member(db, member_id)
    if m:
        db.delete(m)
        db.commit()
    return m

# Classes
def get_classes(db: Session):
    
    classes = db.query(models.ClassModel).all()
    result = []
    for c in classes:
        enrolled = db.query(func.count(models.Booking.id)).filter(models.Booking.class_id == c.id).scalar()
     
        c.enrolledMembers = enrolled
        result.append(c)
    return result

def get_class(db: Session, class_id: int):
    return db.query(models.ClassModel).filter(models.ClassModel.id == class_id).first()

def create_class(db: Session, clazz: schemas.ClassCreate):
    c = models.ClassModel(name=clazz.name, schedule=clazz.schedule, capacity=clazz.capacity)
    db.add(c)
    db.commit()
    db.refresh(c)
    return c

def delete_class(db: Session, class_id: int):
    c = get_class(db, class_id)
    if c:
        db.delete(c)
        db.commit()
    return c

# Bookings
def create_booking(db: Session, member_id: int, class_id: int):
    # capacity check
    enrolled = db.query(models.Booking).filter(models.Booking.class_id == class_id).count()
    clazz = db.query(models.ClassModel).filter(models.ClassModel.id == class_id).first()
    if not clazz:
        raise ValueError("Class not found")
    if enrolled >= clazz.capacity:
        raise ValueError("Class is full")
    b = models.Booking(member_id=member_id, class_id=class_id)
    db.add(b)
    db.commit()
    db.refresh(b)
    return b

def delete_booking(db: Session, booking_id: int):
    b = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if b:
        db.delete(b)
        db.commit()
    return b

def get_bookings(db: Session):
    return db.query(models.Booking).all()

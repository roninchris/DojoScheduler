
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

class MemberBase(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    phone: Optional[str] = None

class MemberCreate(MemberBase):
    pass

class Member(MemberBase):
    id: int
    class Config:
        from_attributes = True

class ClassBase(BaseModel):
    name: str
    schedule: str
    capacity: int

class ClassCreate(ClassBase):
    pass

class Class(ClassBase):
    id: int
    enrolledMembers: int = 0
    class Config:
        from_attributes = True

class BookingBase(BaseModel):
    member_id: int
    class_id: int

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    class Config:
        from_attributes = True

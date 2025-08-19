from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Auth
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True

# Students
class StudentBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: int
    class Config:
        from_attributes = True

# Classes
class MartialClassBase(BaseModel):
    name: str
    description: Optional[str] = None
    capacity: int = 10

class MartialClassCreate(MartialClassBase):
    pass

class MartialClass(MartialClassBase):
    id: int
    class Config:
        from_attributes = True

# Enrollments
class EnrollmentBase(BaseModel):
    student_id: int
    class_id: int

class EnrollmentCreate(EnrollmentBase):
    pass

class Enrollment(EnrollmentBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

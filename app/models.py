
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .database import Base

class Member(Base):
    __tablename__ = "members"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    phone = Column(String, nullable=True)

    bookings = relationship("Booking", back_populates="member", cascade="all, delete-orphan")

class ClassModel(Base):
    __tablename__ = "classes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    schedule = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False, default=0)

    bookings = relationship("Booking", back_populates="class_", cascade="all, delete-orphan")

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False)
    class_id = Column(Integer, ForeignKey("classes.id"), nullable=False)

    member = relationship("Member", back_populates="bookings")
    class_ = relationship("ClassModel", back_populates="bookings")

    __table_args__ = (UniqueConstraint("member_id", "class_id", name="uq_member_class"),)

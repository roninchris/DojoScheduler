export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Class {
  id: string;
  name: string;
  schedule: string;
  capacity: number;
  enrolledMembers: number;
}

export interface Booking {
  memberId: string;
  classId: string;
}

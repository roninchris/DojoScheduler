import type { Member, Class } from './types';

export const initialMembers: Member[] = [
  { id: '1', name: 'Kenji Tanaka', email: 'kenji.t@example.com', phone: '555-0101' },
  { id: '2', name: 'Yumi Sato', email: 'yumi.s@example.com', phone: '555-0102' },
  { id: '3', name: 'Haruto Ito', email: 'haruto.i@example.com', phone: '555-0103' },
];

export const initialClasses: Class[] = [
  { id: 'c1', name: 'Karate Fundamentals', schedule: 'Mon, Wed 5:00 PM', capacity: 20, enrolledMembers: 0 },
  { id: 'c2', name: 'Advanced Kata', schedule: 'Tue, Thu 7:00 PM', capacity: 15, enrolledMembers: 0 },
  { id: 'c3', name: 'Judo Throws', schedule: 'Fri 6:00 PM', capacity: 12, enrolledMembers: 0 },
  { id: 'c4', name: 'Aikido Principles', schedule: 'Sat 10:00 AM', capacity: 18, enrolledMembers: 0 },
];

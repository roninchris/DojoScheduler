'use client'
import { AddBookingForm } from './add-booking-form';
import { BookingsTable } from './bookings-table';

export default function BookingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Gerenciamento de Matrículas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1"><AddBookingForm /></div>
        <div className="lg:col-span-2"><BookingsTable /></div>
      </div>
    </div>
  );
}
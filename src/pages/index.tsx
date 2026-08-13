import { useState } from 'react';
import BookingForm from '../components/BookingForm';
import ConfirmationScreen from '../components/ConfirmationScreen';
import { BookingFormData } from '../types/booking';

export default function Home() {
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  function handleSuccess(data: BookingFormData) {
    setBookingData(data);
  }

  function handleReset() {
    setBookingData(null);
  }

  return (
    <>
      {bookingData ? (
        <ConfirmationScreen data={bookingData} onReset={handleReset} />
      ) : (
        <BookingForm onSuccess={handleSuccess} />
      )}
    </>
  );
}
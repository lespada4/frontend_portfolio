import { useState } from 'react';
import { BookingFormData, BookingErrors, BookingStatus } from '../types/booking';
import { validateForm } from '../utils/validation';
import styles from './BookingForm.module.css';

const TIME_SLOTS = [
  '12:00', '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
];

interface BookingFormProps {
  onSuccess: (data: BookingFormData) => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });

  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<BookingStatus>('idle');

  function handleBlur(field: keyof BookingFormData) {
    const fieldErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      onSuccess(formData);
    }, 1500);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1 className={styles.title}>Бронирование столика</h1>

      <label className={styles.field}>
        Имя гостя
        <input
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onBlur={() => handleBlur('name')}
        />
      </label>
      {errors.name && <p className={styles.error}>{errors.name}</p>}

      <label className={styles.field}>
        Телефон
        <input
          type="tel"
          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          onBlur={() => handleBlur('phone')}
          placeholder="+7XXXXXXXXXX"
        />
      </label>
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}

      <label className={styles.field}>
        Дата
        <input
          type="date"
          className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          onBlur={() => handleBlur('date')}
        />
      </label>
      {errors.date && <p className={styles.error}>{errors.date}</p>}

      <label className={styles.field}>
        Время
        <select
          className={`${styles.input} ${errors.time ? styles.inputError : ''}`}
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          onBlur={() => handleBlur('time')}
        >
          <option value="">Выберите время</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </label>
      {errors.time && <p className={styles.error}>{errors.time}</p>}

      <label className={styles.field}>
        Количество гостей
        <input
          type="number"
          min={1}
          max={12}
          className={`${styles.input} ${errors.guests ? styles.inputError : ''}`}
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
          onBlur={() => handleBlur('guests')}
        />
      </label>
      {errors.guests && <p className={styles.error}>{errors.guests}</p>}

      <button type="submit" className={styles.button} disabled={status === 'loading'}>
        {status === 'loading' ? 'Бронирую...' : 'Забронировать'}
      </button>
    </form>
  );
}
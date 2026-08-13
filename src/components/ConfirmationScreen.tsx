import { BookingFormData } from '../types/booking';
import styles from './ConfirmationScreen.module.css';

interface ConfirmationScreenProps {
  data: BookingFormData;
  onReset: () => void;
}

export default function ConfirmationScreen({ data, onReset }: ConfirmationScreenProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Бронирование подтверждено!</h1>
      <p className={styles.detail}>Имя: {data.name}</p>
      <p className={styles.detail}>Дата: {data.date}</p>
      <p className={styles.detail}>Время: {data.time}</p>
      <p className={styles.detail}>Количество гостей: {data.guests}</p>
      <button className={styles.button} onClick={onReset}>Забронировать ещё</button>
    </div>
  );
}
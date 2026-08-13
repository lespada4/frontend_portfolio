import { BookingFormData, BookingErrors } from '../types/booking';

export function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, ''); // убираем всё, кроме цифр
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return null; // всё ок, ошибки нет
  }
  return 'Введите номер в формате +7XXXXXXXXXX';
}

export function validateName(value: string): string | null {
  if (value.trim().length < 2) {
    return 'Имя должно содержать минимум 2 символа';
  }
  return null;
}

export function validateDate(value: string): string | null {
  if (!value) {
    return 'Выберите дату';
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0); // обнуляем время, сравниваем только даты
  const selectedDate = new Date(value);
  if (selectedDate < today) {
    return 'Дата не может быть раньше сегодняшней';
  }
  return null;
}

export function validateTime(value: string): string | null {
  if (!value) {
    return 'Выберите время';
  }
  return null;
}

export function validateGuests(value: number): string | null {
  if (value < 1 || value > 12) {
    return 'Количество гостей — от 1 до 12';
  }
  return null;
}

export function validateForm(data: BookingFormData): BookingErrors {
  const errors: BookingErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const dateError = validateDate(data.date);
  if (dateError) errors.date = dateError;

  const timeError = validateTime(data.time);
  if (timeError) errors.time = timeError;

  const guestsError = validateGuests(data.guests);
  if (guestsError) errors.guests = guestsError;

  return errors;
}
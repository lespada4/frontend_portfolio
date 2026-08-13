import { validatePhone } from '../utils/validation';

describe('validatePhone', () => {
  test('возвращает null для корректного номера с +7', () => {
    expect(validatePhone('+79123456789')).toBeNull();
  });

  test('возвращает null для корректного номера с 8', () => {
    expect(validatePhone('89123456789')).toBeNull();
  });

  test('возвращает null для номера с пробелами и скобками', () => {
    expect(validatePhone('+7 (912) 345-67-89')).toBeNull();
  });

  test('возвращает ошибку для короткого номера', () => {
    expect(validatePhone('123')).toBe('Введите номер в формате +7XXXXXXXXXX');
  });

  test('возвращает ошибку для номера с неправильной первой цифрой', () => {
    expect(validatePhone('+91234567890')).toBe('Введите номер в формате +7XXXXXXXXXX');
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Процесс бронирования', () => {
  test('пользователь бронирует столик и видит подтверждение', async () => {
    render(<Home />);

  //заполняем форму
    fireEvent.change(screen.getByLabelText(/имя гостя/i), {
      target: { value: 'Сергей' },
    });
    fireEvent.change(screen.getByLabelText(/телефон/i), {
      target: { value: '+79999999999' },
    });
    fireEvent.change(screen.getByLabelText(/дата/i), {
      target: { value: '2026-12-31' },
    });
    fireEvent.change(screen.getByLabelText(/время/i), {
      target: { value: '19:00' },
    });
    fireEvent.change(screen.getByLabelText(/количество гостей/i), {
      target: { value: '4' },
    });


    fireEvent.click(screen.getByText(/забронировать/i));

    expect(screen.getByText(/бронирую\.\.\./i)).toBeInTheDocument();

    const confirmation = await screen.findByText(
      /Бронирование подтверждено!/i,
      {},
      { timeout: 3000 }
    );
    expect(confirmation).toBeInTheDocument();

    expect(screen.getByText(/Имя: Сергей/i)).toBeInTheDocument();
    expect(screen.getByText(/Дата: 2026-12-31/i)).toBeInTheDocument();
    expect(screen.getByText(/Время: 19:00/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество гостей: 4/i)).toBeInTheDocument();

//проверяем "бронировать еще"
    fireEvent.click(screen.getByText(/Забронировать ещё/i));

//проверяем видимость формы после нажатия "бронировать еще"
    expect(screen.getByText(/Имя гостя/i)).toBeInTheDocument();
  });
});
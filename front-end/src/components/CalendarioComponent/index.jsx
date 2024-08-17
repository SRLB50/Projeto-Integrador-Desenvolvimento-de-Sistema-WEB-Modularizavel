
/* eslint-disable */
import React from 'react';
import './index.scss'; // Importa os estilos para o calendário

const Calendar = ({ year, month }) => {
  // Obtém o número de dias no mês
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Obtém o dia da semana do primeiro dia do mês
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Cria um array com os dias do mês, iniciando do primeiro dia da semana
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const leadingEmptyCells = Array(firstDayOfMonth).fill(null);
  const calendarDays = [...leadingEmptyCells, ...days];

  // Divide os dias em semanas
  const weeks = [];
  while (calendarDays.length) {
    weeks.push(calendarDays.splice(0, 7));
  }

  return (
    <div className="calendar-container">
      <table className="calendar">
        <thead>
          <tr>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sab</th>
            <th>Dom</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, index) => (
                <td key={index} className={day ? '' : 'empty-cell'}>
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;

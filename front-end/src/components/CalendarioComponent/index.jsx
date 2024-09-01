/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./index.scss";
import ArrowLeft from "../../../public/assets/arrow-left.svg";
import ArrowRight from "../../../public/assets/arrow-right.svg";

const Calendar = ({ daySelected, setDaySelected, nextCycle, events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeks, setWeeks] = useState([]);

  const updateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Obtém o número de dias no mês usando de referência o ultimo dia
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Obtém o dia da semana do primeiro dia do mês
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Cria um array com os dias do mês de referência
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Calcula os dias que devem ficar em branco no calendário tendo segunda-feira como inicio
    const leadingEmptyCells = Array((firstDayOfMonth + 6) % 7).fill(null);

    // mescla os dois arrays
    const calendarDays = [...leadingEmptyCells, ...days];

    // Divide os dias em semanas para renderizar na tabela
    const newWeeks = [];
    while (calendarDays.length) {
      newWeeks.push(calendarDays.splice(0, 7));
    }

    setWeeks(newWeeks);
  };

  useEffect(() => {
    updateCalendar(currentDate);

    //Realizando a limpeza do componente
    return () => {};
  }, [currentDate]);

  const handleGetMonth = (action) => {
    const month =
      action == "next"
        ? currentDate.getMonth() + 1
        : currentDate.getMonth() - 1;
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setDaySelected("")
  };

  const handleDayClick = (day) => {
    setDaySelected(`${String(day).length == 1 ? "0" : ""}${day}${currentDate.toLocaleDateString("pt-BR").substring(2)}`)
  }

  //Formata as classes para mostrar os dias correspondentes aos eventos
  const handleImplementEvent = (day) => {
    const referenceDate = `${String(day).length == 1 ? "0" : ""}${day}${currentDate.toLocaleDateString("pt-BR").substring(2)}`
    const initialDay = new Date().toLocaleDateString("pt-BR")

    const event = events.find(e => e.data === referenceDate);
  
    const classes = {
      'pregnancy-day': event?.gravidez,
      'pregnancy-day-expectative': event?.gravidezFim,
      'standart-day': referenceDate === initialDay,
      'symptom': event?.sintoma,
      'cycle-day': !event?.gravidez && referenceDate === nextCycle,
      'cycle-day-runing': event?.mestruacao,
    };
  
    return Object.entries(classes)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ');
  };

  return (
    <div className="container-calendar-structure">
      <img
        src={ArrowLeft}
        onClick={() => handleGetMonth("previous")}
        className="arrow"
        alt="seta para a esquerda"
      />
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
                  <td
                    key={index}
                    className={day ? "standart-cell" : "empty-cell"}
                  >
                    <span
                      className={`cursor-pointer ${events?.length > 0 && day && handleImplementEvent(day)} ${daySelected?.slice(0, 2) == day ? 'clicked' : ''}`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <img
        src={ArrowRight}
        onClick={() => {
          handleGetMonth("next");
        }}
        className="arrow"
        alt="seta para a direita"
      />
    </div>
  );
};

export default Calendar;

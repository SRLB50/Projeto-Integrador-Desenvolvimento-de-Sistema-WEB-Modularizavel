import { useEffect, useState } from "react"
import BodyDay from "../BodyDay/BodyDay"
import "./CalendarioSemanal.scss"

const CalendarioSemanal = ({ actualDate, dayOnWeek, month, year, ciclo, periodUser }) => {
    const [days, setDays] = useState([])
    const [period, setPeriod] = useState([])
    
    useEffect(() => {
        const instance = new CountCalendar(dayOnWeek, actualDate, month, year)
        setDays(instance.days())

        setPeriod(calcNextPeriod())
    }, [periodUser])

    const calcNextPeriod = () => {
        let period = []
        for (let x = 0; x < 5; x++) {
            const mountDays = x + periodUser
            const date = new Date(year, month, (mountDays + actualDate)).getDate()

            period.push(date)
        }

        return period
    }

    return (
        <section id="calendar-week">
            <div className="header">
                <div className="header-day">Dom</div>
                <div className="header-day">Seg</div>
                <div className="header-day">Ter</div>
                <div className="header-day">Qua</div>
                <div className="header-day">Qui</div>
                <div className="header-day">Sex</div>
                <div className="header-day">Sáb</div>
            </div>

            <div className="body">
                {
                    days.map((day, i) => (ciclo == day || period.includes(day)) ? (<BodyDay day={day} ciclo={true} key={i} />) : (<BodyDay day={day} key={i} />))
                }
            </div>
        </section>
    )
}

class CountCalendar {
    constructor(dayWeek, getDay, month, year) {
        this.dayWeek = dayWeek;
        this.getDay = getDay;
        this.month = month;
        this.year = year;
    }

    getActualDate(day) {
        return new Date(this.year, this.month, day);
    }

    getPreviousMonthLastDay() {
        return new Date(this.year, this.month, 0).getDate();
    }

    #increment() {
        let days = [];
        const quantDaysIncrement = 7 - this.dayWeek;
        for (let y = 0; y < quantDaysIncrement; y++) {
            const getDate = this.getActualDate(this.getDay + y);
            days.push(getDate.getDate());
        }
        return days;
    }

    #decrement() {
        let days = [];
        const previousMonthLastDay = this.getPreviousMonthLastDay();
        const quantDaysDecrement = this.dayWeek;
        for (let y = quantDaysDecrement; y > 0; y--) {
            let day = this.getDay - y;
            if (day <= 0) {
                day = previousMonthLastDay + day;
            }
            days.push(day);
        }
        return days;
    }

    days() {
        const decrement = this.#decrement();
        const increment = this.#increment();
        return decrement.concat(increment);
    }
}


export default CalendarioSemanal
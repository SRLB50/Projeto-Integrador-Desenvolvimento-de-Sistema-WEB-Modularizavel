import BodyDay from "../BodyDay/BodyDay"
import "./CalendarioSemanal.scss"

const CalendarioSemanal = ({ actualDate, dayOnWeek }) => {

    const instance = new CountCalendar(dayOnWeek, actualDate)
    const days = instance.days()

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
                    days.map((day, i) => (<BodyDay day={day} key={i} />))
                }
            </div>
        </section>
    )
}

class CountCalendar {
    constructor(dayWeek, getDay) {
        this.dayWeek = dayWeek
        this.getDay = getDay
    }

    #increment() {
        let days = []
        const quantDaysIncrement = 7 - this.dayWeek
        for (let y = 0; y < quantDaysIncrement; y++) {
            days.push(this.getDay + y)
        }

        return days
    }

    #decrement() {
        let days = []
        if (this.dayWeek == 7) {
            for (let x = 0; x < 7; x++) {
                days.push(this.getDay - x)
            }
        } else {
            const quantDaysDecrement = 7 - this.dayWeek
            const decrement = (this.dayWeek == 0) ? 0 : 7 - quantDaysDecrement
            for (let y = 0; y < decrement; y++) {
                days.push(this.getDay - (y + 1))
            }
        }

        return days
    }

    days() {
        const decrement = this.#decrement()
        const increment = this.#increment()

        return decrement.concat(increment).sort((a, b) => a - b)
    }
}
export default CalendarioSemanal

const BodyDay = ({ day }) => {
    const actualDay = new Date().getDate()
    return day == actualDay ? <div className="body-day"> <span className="pink-date">{day}</span></div> : <div className="body-day">{day}</div>

}

export default BodyDay
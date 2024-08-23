
const BodyDay = ({ day, ciclo }) => {
    const actualDay = new Date().getDate()

    const classNameCiclo = ciclo == true ? "ciclo-active" : ""
    return day == actualDay ? <div className="body-day"> <span className={"pink-date " + classNameCiclo}>{day}</span></div> : <div className="body-day"> <span className={classNameCiclo}>{day}</span></div>

}

export default BodyDay
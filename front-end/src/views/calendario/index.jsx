
/* eslint-disable */
import { react,  useState } from "react"
import CalendarioComponent from '../../components/CalendarioComponent/index'
import './index.scss'

const Calendario = () => {
    const [count, setCount] = useState(0)
    const [textExample, setTextExample] = useState("")

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('pt-BR', { month: 'long' });
      const year = date.getFullYear();
      return { day, month, year };
  };

  const { day, month, year } = formatDate(new Date());

    return (
      <div className="container-calendar-screen">
        <div className="welcome-user-container">
          <h2 className="main-title">Como está o seu cíclo hoje, <span className="bold-phrase prominence-word">Marcela</span>?</h2>
          <div className="counter-day-container">
            <h3 className="bold-phrase">{day} de {month} <span className="prominence-word">{year}</span></h3>
            <h3>Faltam <span>9</span> dias para sua menstruação.</h3>
          </div>
        </div>
        <div className="">
          <CalendarioComponent year={2024} month={7} />
        </div>
      </div>
    )
}

export default Calendario
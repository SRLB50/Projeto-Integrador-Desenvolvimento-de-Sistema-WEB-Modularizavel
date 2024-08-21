
/* eslint-disable */
import { react,  useState } from "react"
import CalendarioComponent from '../../components/CalendarioComponent/index'
import './index.scss'

const Calendario = () => {
    const [count, setCount] = useState(0)
    const [textExample, setTextExample] = useState("")

    return (
      <div className="container-calendar-screen">
        <div>
          <h2>Como está o seu cíclo hoje, Marcela?</h2>
        </div>
        <div>
          <h3>04 de Junho 2024</h3>
          <h3>Faltam 9 dias para sua menstruação.</h3>
        </div>
        <div className="">
          <CalendarioComponent year={2024} month={7} />
        </div>
      </div>
    )
}

export default Calendario
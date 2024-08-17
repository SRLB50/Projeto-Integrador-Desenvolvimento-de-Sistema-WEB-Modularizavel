
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
          Como está o seu cíclo hoje, Marcela?
        </div>
        <div className="">
          <CalendarioComponent year={2024} month={7} />
        </div>
      </div>
    )
}

export default Calendario
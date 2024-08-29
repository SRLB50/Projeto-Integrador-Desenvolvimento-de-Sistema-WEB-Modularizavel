/* eslint-disable */
import { react,  useState } from "react"
import BotaoModal from "../../components/Modais/BotaoModal"
import ModalLembrete from "../../components/Modais/ModalLembrete"
import ModalAtraso from "../../components/Modais/ModalAtraso"

const Login = () => {
    const [count, setCount] = useState(0)

    return (
      <>
        <div>
          teste tela de login
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <BotaoModal />
        <ModalLembrete />
        <ModalAtraso daysLate={0}/>
      </>
    )
}

export default Login
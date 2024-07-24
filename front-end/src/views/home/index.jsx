
/* eslint-disable */
import { react,  useState } from "react"
import InputElement from "../../components/FormElements/Input"

const Home = () => {
    const [count, setCount] = useState(0)
    const [textExample, setTextExample] = useState("")

    return (
      <>
        <div>
          teste tela de Home
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <InputElement
            label={"input de teste"}
            type="text"
            id="input-text"
            value={textExample}
            setValue={setTextExample}
          />
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
      </>
    )
}

export default Home
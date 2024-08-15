
/* eslint-disable */
import { useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import MenuAside from "../../components/MenuAside/MenuAside"


const Home = () => {
  const [count, setCount] = useState(0)
  const [textExample, setTextExample] = useState("")

  return (
    <>
      <header>
        <NavBar />
      </header>

      <section id="menu">
        <MenuAside />
      </section>
    </>
  )
}

export default Home
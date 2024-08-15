
/* eslint-disable */
import { useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import MenuAside from "../../components/MenuAside/MenuAside"
import { Outlet } from "react-router-dom"
import "./index.scss"


const Home = () => {
  const [count, setCount] = useState(0)
  const [textExample, setTextExample] = useState("")

  return (
    <>
      
      <NavBar />
      <MenuAside />

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Home
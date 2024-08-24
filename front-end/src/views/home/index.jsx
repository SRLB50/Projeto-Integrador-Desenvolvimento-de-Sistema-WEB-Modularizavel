
/* eslint-disable */
import { useState, useEffect } from "react"
import NavBar from "../../components/NavBar/NavBar"
import MenuAside from "../../components/MenuAside/MenuAside"
import { Outlet, useNavigate } from "react-router-dom"


import "./index.scss"

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/home", {replace: true})
    }
  }, [navigate])

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
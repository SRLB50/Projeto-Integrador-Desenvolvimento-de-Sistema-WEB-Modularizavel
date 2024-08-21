import { useEffect, useState } from "react"
import CalendarioSemanal from "../CalendarioSemanal/CalendarioSemanal"
import CardBlog from "../CardBlog/CardBlog"
import {jwtDecode} from "jwt-decode"
import "./TelaInicial.scss"
import { useNavigate } from "react-router-dom"
import Ciclo from "../../services/ciclo"
import Cards from "./../../mocks/cards.json"

const TelaInicial = () => {
    const navigate = useNavigate()
    const [day, month, year] = new Date().toLocaleDateString().split("/")
    const dayWeek = new Date().getDay()
    const formattedMonth = getFormattedMonth(Number(month) - 1)
    const cards = Cards
    
    const [name, setName] = useState()
    const [id, setId] = useState()
    const [ciclo, setCiclo] = useState()

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const decodeToken = jwtDecode(token)
            const {nome, id} = decodeToken
            
            getCiclo(id)
            setName(nome)
            setId(id)
        }else{
            navigate("/login")
        }
    }, [])

    const getCiclo = async (id) => {
        const requestCiclo = new Ciclo(id)
            
        const ciclo = await requestCiclo.get()

        setCiclo(ciclo.dias)
    }

    return (
        <section id="tela_inicial">
            <div id="titulo">
                <h1 style={{fontSize: "2rem"}}>Seja bem vinda, <span className="pink-text">{name}</span></h1>
            </div>

            <div id="calendario-menstrual">
                <div className="header-calendario">
                    <span style={{fontWeight: 700}}>{day} de {formattedMonth} de <span className="pink-text">{year}</span></span>

                    <span className="dias-menstruacao">Faltam <span className="circle">{ciclo}</span> dias para sua menstruação</span>
                </div>

                <div className="body-calendario">
                    <CalendarioSemanal actualDate={Number(day)} dayOnWeek={dayWeek} month={Number(month)} year={Number(year)} ciclo={(ciclo + Number(day))} />
                </div>
            </div>

            <div id="dicas-saude">
                <div className="titulo-saude">
                    <h3>Dicas de <span className="pink-text">Saúde</span></h3>
                </div>
                <div className="cards">
                    {
                        cards.map((card, i) => (
                            <CardBlog 
                                img={card.img} 
                                title={card.title}
                                subtitle={card.subtitle}
                                text={card.text}
                                key={i}
                                id={card.id}
                            />
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

const getFormattedMonth = (month) => {

    const months = [
        "janeiro", "fevereiro", "março", "abril", 
        "maio", "junho", "julho", "agosto",
        "setembro", "outubro", "novembro", "dezembro"
    ]

    return months[month]
}

export default TelaInicial
import { useEffect, useState } from "react"
import CalendarioSemanal from "../CalendarioSemanal/CalendarioSemanal"
import CardBlog from "../CardBlog/CardBlog"
//import {jwtDecode} from "jwt-decode"
import "./TelaInicial.scss"
import { useNavigate } from "react-router-dom"
import Ciclo from "../../services/ciclo"
import Cards from "./../../mocks/cards.json"

//Dados mockados
import mockAuth from "./../../mocks/user.json"

const TelaInicial = () => {
    const navigate = useNavigate()
    
    const [day, setDay] = useState(new Date().getDate())
    const [month, setMonth] = useState((new Date().getMonth() + 1))
    const [year, setYear] = useState(new Date().getYear())
    const [dayWeek, setDayWeek] = useState(new Date().getDay())
    const [formattedMonth, setFormattedMonth] = useState("")
    const [cards, setCards] = useState([])

    const [name, setName] = useState()
    const [id, setId] = useState()
    const [ciclo, setCiclo] = useState(0)

    useEffect(() => {
        dateComponent()
    }, [])
    useEffect(() => {
        initCards()
        const token = mockAuth
        if (token) {
            //const decodeToken = jwtDecode(token)
            const {nome, id, ciclo} = token[0]
            
            setCiclo(ciclo)
            setName(nome)
            setId(id)
        }else{
            navigate("/login")
        }
    }, [])

    const dateComponent = () => {
        const [day, month, year] = new Date().toLocaleDateString().split("/")
        const dayWeek = new Date().getDay()
        const formattedMonth = getFormattedMonth(Number(month) - 1)

        setDay(Number(day))
        setMonth(Number(month))
        setYear(Number(year))
        setDayWeek(dayWeek)
        setFormattedMonth(formattedMonth)
    }

    const initCards = () => setCards(Cards)

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

                    <div className="dias-menstruacao">
                        {
                            ciclo > 0 
                            ? 
                                (<span>Faltam <span className="circle">{ciclo}</span> dias para sua menstruação</span> ) 
                            : 
                                ciclo < 0 
                                    ? <h5 className="pink-text"> {Math.abs(ciclo)} dia(s) da sua menstruação inicial!</h5> 
                                    : <h5 className="pink-text">Sua menstruação se inicia hoje!</h5> 
                        }
                    </div>
                </div>

                <div className="body-calendario">
                    <CalendarioSemanal actualDate={day} dayOnWeek={dayWeek} month={month} year={year} ciclo={(ciclo + day)} periodUser={ciclo} />
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
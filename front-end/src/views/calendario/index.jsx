
/* eslint-disable */
import { react,  useState, useEffect } from "react"
import axios from 'axios'
import {Button} from 'reactstrap'
import CalendarioComponent from '../../components/CalendarioComponent/index'
import './index.scss'

const Calendario = () => {
    const [count, setCount] = useState(0)
    const [daySelected, setDaySelected] = useState("")
    const [daysUntilNextCycle, setDaysUntilNextCycle] = useState(0)
    const [firstCycle, setFirstCycle] = useState(false)
    const [nextCycle, setNextCycle] = useState()
    const [events, setEvents] = useState([])

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('pt-BR', { month: 'long' });
      const year = date.getFullYear();
      return { day, month, year };
    };

    const { day, month, year } = formatDate(new Date());

    const handleGetDatesBetween = (startDateStr, endDateStr) => {

      const parseBrazilianDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day)
      }

      const startDate = parseBrazilianDate(startDateStr)
      const endDate = parseBrazilianDate(endDateStr)

      const dates = []
      let currentDate = new Date(startDate)

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return dates;
    }

    useEffect(() => {

      //Retorna o próximo ciclo
      axios.post(`http://localhost:3000/dias-ciclo`, {userId: 2} )
      .then(response => {
        setDaysUntilNextCycle(response?.data?.dias) 
        setNextCycle(response?.data?.data)
      })

      //Retorna os ciclos
      const getCycle = axios.get(`http://localhost:3000/ciclos`, {params: {userId: 2}} )

      //Retorna os sintomas
      const getSympton = axios.get(`http://localhost:3000/sintomas`, {params: {userId: 2}} )

      //Retorna os sintomas
      const getPregnancy = axios.get(`http://localhost:3000/gravidezes`, {params: {userId: 2}} )
        
      axios.all([getCycle, getSympton, getPregnancy])
        .then(axios.spread((cycleResponse, symptonResponse, pregnancyResponse) => {
          let responsesFormated = []

          //Inicia a estrutura de eventos para renderização no componente de calendário
          cycleResponse.data.forEach(item => {
            const dataArray = handleGetDatesBetween(item.inicio, item.fim)

            dataArray.map(data => 
              responsesFormated.push(
                {
                  mestruacao: true,
                  sintoma: false,
                  gravidez: false,
                  data: data.toLocaleDateString('pt-BR')
                }
              ))
          })

          //Adiciona os dias de eventos de sintomas já cadastrados
          symptonResponse?.data?.forEach(item => {
            const existingIndex = responsesFormated.findIndex(element => element.data === item.data)
            
            if (existingIndex !== -1) {
              responsesFormated[existingIndex].sintoma = true
            } else {
              responsesFormated.push({
                mestruacao: false,
                sintoma: true,
                gravidez: false,
                data: item.data
              })
            }
          })

          //Adiciona os dias de eventos de gravidez já cadastrados
          // pregnancyResponse?.data?.forEach(item => {
          //   const existingIndex = responsesFormated.findIndex(element => element.data === item.data);
            
          //   if (existingIndex !== -1) {
          //     responsesFormated[existingIndex].sintoma = true;
          //   } else {
          //     responsesFormated.push({
          //       mestruacao: false,
          //       sintoma: false,
          //       gravidez: true,
          //       data: item.data
          //     });
          //   }
          // });

          setEvents(responsesFormated)

          console.log(responsesFormated, 'responsesFormated')
        })).catch(error => {
          console.error('Erro nas requisições:', error);
        });

      return () => {}
    }, [])

    const handleInitCycle = () => {
      //Retorna os ciclos
      axios.post(`http://localhost:3000/iniciar-ciclo`, {userId: 2} )
      .then(response => {
        console.log(response, 'response')
        if(response?.data?.message == "Nenhum ciclo registrado") {
          setFirstCycle(true)
        }
      })
    }

    return (
      <div className="container-calendar-screen">
        <div className="welcome-user-container">
          <h2 className="main-title">Como está o seu cíclo hoje, <span className="bold-phrase prominence-word">Marcela</span>?</h2>
          <div className="counter-day-container">
            <h3 className="bold-phrase">{day} de {month} <span className="prominence-word">{year}</span></h3>
            {
              firstCycle && 
              <h3>Primeira menstruação ainda não cadastrada.</h3>
            }
            {
              !firstCycle && daysUntilNextCycle > 0 &&
              <h3>Faltam <span className="cycle-day-expectative">{daysUntilNextCycle}</span> dias para sua menstruação.</h3>
            }
            {
              !firstCycle && daysUntilNextCycle == 0 &&
              <div className="radio-cycle-container">
                <h3>Sua menstruação já iniciou ?</h3>

                <div className="radio-phrase">
                  <input type="radio" id="on" name="cycle" value="Sim"/>
                  <label for="on" className="radio-phrase-label">Sim</label>
                </div>
                
                <div className="radio-phrase">
                  <input type="radio" id="off" name="cycle" value="Não"/>
                  <label for="off" className="radio-phrase-label">Não</label>
                </div>
              </div>
            }

          </div>
        </div>
        <div className="">
          <CalendarioComponent daySelected={daySelected} setDaySelected={setDaySelected} nextCycle={nextCycle} events={events}/>
        </div>
        <div className="actions-button-container">
          <div className="flex-buttons">
            <Button 
              className="action-button action-button-filled"
              onClick={() => handleInitCycle()}
            > 
              Menstruação 
            </Button>
            <Button 
              className="action-button action-button-filled"
            > 
              Sintoma 
            </Button>
          </div>
          <Button 
            className="action-button action-button-border"
          > 
            Gravidez 
          </Button>
        </div>
      </div>
    )
}

export default Calendario
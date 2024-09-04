
/* eslint-disable */
import { react,  useState, useEffect } from "react"
import axios from 'axios'
import {Button} from 'reactstrap'
import CalendarioComponent from '../../components/CalendarioComponent/index'
import ModalAdicionarSintoma from '../../components/Modais/ModalAdicionarSintomas.jsx';
import ModalVisualizarSintoma from '../../components/Modais/ModalVisualizarSintomas.jsx';
import './index.scss'

import StopWhite from '../../assets/stop-white.svg'
import PlusWhite from '../../assets/plus-white.svg'
import PlusPink from '../../assets/plus-pink.svg'
import NegativePink from '../../assets/negative-pink.svg'
import Play from '../../assets/play.svg'
import Eye from '../../assets/eye.svg'

const Calendario = () => {
    const [daySelected, setDaySelected] = useState("")
    const [daysUntilNextCycle, setDaysUntilNextCycle] = useState(0)
    const [firstCycle, setFirstCycle] = useState(false)
    const [nextCycle, setNextCycle] = useState()
    const [events, setEvents] = useState([])

    //modais
    const [modalAdicionarOpen, setModalAdicionarOpen] = useState(false)
    const [modalVisualizarOpen, setModalVisualizarOpen] = useState(false)
    const [sintomaEditando, setSintomaEditando] = useState('')

    const toggleAdicionar = () => setModalAdicionarOpen(!modalAdicionarOpen)
    const toggleVisualizar = () => setModalVisualizarOpen(!modalVisualizarOpen)

    const handleEditarSintoma = () => {
      setModalVisualizarOpen(false)
      setModalAdicionarOpen(true)
    }

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('pt-BR', { month: 'long' });
      const year = date.getFullYear();
      return { day, month, year };
    };

    const formatToAmericanDate = (date) => {
       // Divide a string da data em ano, mês e dia
      const [day, month, year] = date.split('/');

      // Retorna a data no formato Americano
      return `${month}-${day}-${year}`;
    }

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
      axios.post(`http://localhost:3000/dias-ciclo`, {userId: 1} )
      .then(response => {
        setDaysUntilNextCycle(response?.data?.dias) 
        setNextCycle(response?.data?.data)
      })

      //Retorna os ciclos
      const getCycle = axios.get(`http://localhost:3000/ciclos`, {params: {userId: 1}} )

      //Retorna os sintomas
      const getSympton = axios.get(`http://localhost:3000/sintomas`, {params: {userId: 1}} )

      //Retorna os sintomas
      const getPregnancy = axios.get(`http://localhost:3000/gravidezes`, {params: {userId: 1}} )
        
      axios.all([getCycle, getSympton, getPregnancy])
        .then(axios.spread((cycleResponse, symptonResponse, pregnancyResponse) => {
          let responsesFormated = []

          if(cycleResponse?.data?.message == "Nenhum ciclo registrado") {
            setFirstCycle(true)
          } else {
            //Inicia a estrutura de eventos para renderização no componente de calendário
            cycleResponse?.data?.forEach(item => {
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
          }

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

          const getDaysOfPregnancy = handleGetDatesBetween(pregnancyResponse.data[0].inicio, pregnancyResponse.data[0].fim)

          getDaysOfPregnancy?.forEach(item => {
            const existingIndex = responsesFormated.findIndex(element => element.data === item);
            
            if (existingIndex !== -1) {
              responsesFormated[existingIndex].gravidez = true;
            } else {
              responsesFormated.push({
                mestruacao: false,
                sintoma: false,
                gravidez: true,
                data: item.toLocaleDateString('pt-BR'),
                gravidezFim: pregnancyResponse.data[0].fim == item,
              });
            }
          });

          setEvents(responsesFormated)

        })).catch(error => {
          console.error('Erro nas requisições:', error);
        });

      return () => {}
    }, [])

    const handleInitCycle = () => {
      //Retorna os ciclos
      axios.post(`http://localhost:3000/iniciar-ciclo`, {userId: 1} )
      .then(response => {
        console.log(response, 'response')    
      })
    }

    // Inicia a gravidez
    const handleStartPregnancy = () => {
      axios.post(`http://localhost:3000/iniciar-gravidez`, {userId: 1, dataInicio:"28/08/2024"} )
      .then((response) => {
        const getDaysOfPregnancy = handleGetDatesBetween(new Date().toLocaleDateString('pt-BR'), response.data.dataFim)
        const responsesFormated = [...events]

        getDaysOfPregnancy?.forEach(item => {
          const existingIndex = responsesFormated.findIndex(element => element.data === item);
          
          if (existingIndex !== -1) {
            responsesFormated[existingIndex].gravidez = true;
          } else {
            responsesFormated.push({
              mestruacao: false,
              sintoma: false,
              gravidez: true,
              data: item.toLocaleDateString('pt-BR'),
              gravidezFim: response.data.dataFim == item,
            });
          }
        });

        setEvents(responsesFormated)
      }).catch(error => {
        console.log(error)
      })
    }

    const handleCallSintomaModal = () => {
      if(events.some(item => item?.data == daySelected && item?.sintoma)) {
        toggleVisualizar()
      } else {
        toggleAdicionar()
      }
    }

    return (
      <>
        <ModalAdicionarSintoma
          isOpen={modalAdicionarOpen}
          toggle={toggleAdicionar}
          sintoma={sintomaEditando}
          daySelected={daySelected}
          setEvents={setEvents}
        />

        <ModalVisualizarSintoma
          isOpen={modalVisualizarOpen}
          toggle={toggleVisualizar}
          onEdit={handleEditarSintoma}
          atualizarSintoma={setSintomaEditando}
          daySelected={daySelected}
          setEvents={setEvents}
        />

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
                !firstCycle && daysUntilNextCycle <= 0 &&
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
                disabled={daySelected && events?.some(item => item?.data == daySelected && item.gravidez)}
              > 
                <img src={Play} />
                Menstruação 
              </Button>
              <Button 
                className="action-button action-button-filled"
                onClick={() => handleCallSintomaModal()}
                disabled={!daySelected}
              > 
                {
                  daySelected && events?.some(item => item?.data == daySelected) ? 
                  <img src={Eye} />
                  : 
                  <img src={PlusWhite} />
                }
                Sintoma 
              </Button>
            </div>
            <Button 
              className="action-button action-button-border"
              onClick={() => handleStartPregnancy()}
              disabled={!daySelected || (new Date(formatToAmericanDate(daySelected)) < new Date() )}
            > 
              <img src={PlusPink} />
              Gravidez 
            </Button>
          </div>
        </div>
      </>
    )
}

export default Calendario
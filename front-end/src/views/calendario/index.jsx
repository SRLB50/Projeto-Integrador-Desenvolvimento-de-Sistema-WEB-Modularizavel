
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

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('pt-BR', { month: 'long' });
      const year = date.getFullYear();
      return { day, month, year };
    };

    const { day, month, year } = formatDate(new Date());

    useEffect(() => {

      //Retorna os ciclos
      axios.get(`http://localhost:3000/ciclos`, {params: {userId: 2}} )
      .then(response => {
        if(response?.data?.message == "Nenhum ciclo registrado") {
          setFirstCycle(true)
        }
      })

      //Retorna o próximo ciclo
      axios.post(`http://localhost:3000/dias-ciclo`, {userId: 2} )
      .then(response => {
        setDaysUntilNextCycle(response?.data?.dias) 
      })

      // Funções para fazer as requisições
      // const requestOne = axios.get('http://localhost:3000/ciclos');
      // const requestTwo = axios.get('http://localhost:3000/ciclos');
      // const requestThree = axios.get('http://localhost:3000/ciclos');

      // axios.all([requestOne, requestTwo, requestThree])
      //   .then(axios.spread((responseOne, responseTwo, responseThree) => {
      //     // Acesse as respostas aqui
      //     console.log('Resposta 1:', responseOne.data);
      //     console.log('Resposta 2:', responseTwo.data);
      //     console.log('Resposta 3:', responseThree.data);
      //   }))
      //   .catch(error => {
      //     // Lida com qualquer erro
      //     console.error('Erro nas requisições:', error);
      //   });

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
          <CalendarioComponent daySelected={daySelected} setDaySelected={setDaySelected} />
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
/* eslint-disable */
import { useNavigate } from 'react-router-dom'

import CardBlog from "../../components/CardBlog/CardBlog"
import Cards from "../../mocks/cards.json"
import "./index.scss"

const Dicas = () => {
  const navigate = useNavigate()

  const handleClick = (id) => {
    console.log(id, 'id')
    if(id === 1) {
      navigate("/dicas/vida-saudavel")
    } else if (id === 2) {
      navigate("/dicas/cuida-se")
    } else {
      navigate("/dicas/trabalho-remoto")
    }
  }

  return (
    <div className="dicas-Container">
      <div id="dicas-saude">
        <div className="titulo-saude">
          <h3>
            Dicas de <span className="pink-text">Saúde</span>
          </h3>
        </div>
        <div className="cards">
          {Cards.map((card, i) => (
            <CardBlog
              img={card.img}
              title={card.title}
              subtitle={card.subtitle}
              text={card.text}
              key={i}
              id={card.id}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dicas;

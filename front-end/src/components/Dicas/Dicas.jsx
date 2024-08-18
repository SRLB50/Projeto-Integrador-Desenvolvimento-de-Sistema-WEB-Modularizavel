import "./Dicas.scss"
import cards from "./../../mocks/cards.json"
import CardBlog from "../CardBlog/CardBlog"

const Dicas = () => {
    return (
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
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Dicas
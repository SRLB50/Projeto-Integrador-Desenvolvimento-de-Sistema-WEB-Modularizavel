import "./Blog.scss"
import back from "../../assets/back.svg"
import { useEffect, useState } from "react"
import cards from "../../mocks/cards.json"

const Blog = ({id}) => {

    const [card, setCard] = useState({})

    useEffect(() => {
        const cardRendering = cards.filter(card => card.id == id)

        setCard(cardRendering[0])
    }, [])

    return (
        <section id="blog">
            <div className="header">
                <div className="back">
                    {back}
                </div>
            </div>

            <div className="body">
                <div className="image">
                    <img src={card.img} alt={card.title} />
                </div>
                <div className="body-text">
                    <h2>{card.title}</h2>
                    <p>{card.post}</p>
                </div>

            </div>

            <div className="footer">
                <h5>{card.dataBlog}</h5>
            </div>
        </section>
    )
}

export default Blog
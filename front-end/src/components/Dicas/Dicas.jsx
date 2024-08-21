import "./Dicas.scss"
import cards from "./../../mocks/cards.json"
import CardBlog from "../CardBlog/CardBlog"
import { useEffect, useState } from "react"
import Blog from "../Blog/Blog"

const Dicas = () => {

    const [blog, setBlog] = useState(false)
    const [idBlog, setIdBlog] = useState("")

    useEffect(() => setBlog(true), [])

    const handleClick = (id) => {
        setIdBlog(id)
        setBlog(false)
    }

    return (
        <div id="dicas-saude">
            <div className="titulo-saude">
                <h3>Dicas de <span className="pink-text">Saúde</span></h3>
            </div>
            <div className="cards">
                {
                    blog ?
                        cards.map((card, i) => (
                            <CardBlog
                                img={card.img}
                                title={card.title}
                                subtitle={card.subtitle}
                                text={card.text}
                                key={i}
                                handleClick={() => handleClick(card.id)}
                            />
                        ))

                        : <Blog id={idBlog} />
                }
            </div>

        </div>
    )
}

export default Dicas
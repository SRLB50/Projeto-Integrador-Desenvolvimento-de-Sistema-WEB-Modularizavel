import CalendarioSemanal from "../CalendarioSemanal/CalendarioSemanal"
import CardBlog from "../CardBlog/CardBlog"
import "./TelaInicial.scss"

const TelaInicial = () => {

    const [day, month, year] = new Date().toLocaleDateString().split("/")
    const dayWeek = new Date().getDay()
    const formattedMonth = getFormattedMonth(Number(month) - 1)

    const cards = [
        {
            title: "Vida saudável",
            img: "https://images.pexels.com/photos/864939/pexels-photo-864939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            subtitle: "03/04/2024 - Michel K. | 4min",
            text: "Quer uma vida saudável e sem problemas? Vem conosco e se prepare para a mudança de vida!"
        },
        {
            title: "Cuide-se",
            img: "https://images.pexels.com/photos/774866/pexels-photo-774866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            subtitle: "02/01/2024 - Sandra R. | 7 min",
            text: "Se cuidar deve ser um dos primordios femininos. Que tal algumas dicas?"
        },
        {
            title: "Trabalho remoto",
            img: "https://images.pexels.com/photos/1586973/pexels-photo-1586973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            subtitle: "10/07/2023 - Gabriel A. | 5 min",
            text: `O mercado de trabalho remoto para as mulheres cresceu exponencialmente! Veja as vagas que mais permitem o trabalho home office.`
        }
    ]
    return (
        <section id="tela_inicial">
            <div id="titulo">
                <h1 style={{fontSize: "2rem"}}>Seja bem vinda, <span className="pink-text">Marcela</span></h1>
            </div>

            <div id="calendario-menstrual">
                <div className="header-calendario">
                    <span style={{fontWeight: 700}}>{day} de {formattedMonth} de <span className="pink-text">{year}</span></span>

                    <span>Faltam <span className="circle">9</span> dias para sua menstruação</span>
                </div>

                <div className="body-calendario">
                    <CalendarioSemanal actualDate={Number(day)} dayOnWeek={dayWeek} />
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
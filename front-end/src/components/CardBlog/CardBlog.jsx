import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle
} from "reactstrap"

const style = {
    borderBottom: "3px solid #FF869C", 
    borderRadius: "15px 15px 0 0"
}


const CardBlog = ({ img, title, subtitle, text, id, handleClick }) => {
    return <Card style={{ width: '16rem', borderRadius: "15px" }} onClick={() => handleClick(id)}>
            <img alt="Sample" src={img} style={style} />
            <CardBody>
                <CardTitle tag="h6">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" style={{fontSize: "0.8rem"}} tag="h6">{subtitle}</CardSubtitle>
                <CardText>{text}</CardText>
            </CardBody>
        </Card>
    
}

export default CardBlog
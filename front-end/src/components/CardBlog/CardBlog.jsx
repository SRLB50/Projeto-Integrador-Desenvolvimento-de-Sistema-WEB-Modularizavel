import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle
} from "reactstrap"


const CardBlog = ({ img, title, subtitle, text }) => {
    return <Card style={{ width: '16rem' }}>
            <img alt="Sample" src={img} style={{borderBottom: "3px solid #FF869C"}} />
            <CardBody>
                <CardTitle tag="h6">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" style={{fontSize: "0.8rem"}} tag="h6">{subtitle}</CardSubtitle>
                <CardText>{text}</CardText>
            </CardBody>
        </Card>
    
}

export default CardBlog
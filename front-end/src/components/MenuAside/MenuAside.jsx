import { Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

import dicas from "./../../assets/Group 19.svg"
import home from "./../../assets/Vector.svg"
import user from "./../../assets/Icon-color.svg"
import calendar from "./../../assets/Icon-color2.svg"
const MenuAside = () => {
    return (
        <Nav vertical>
            <NavItem>
                <Link to="/" ><img src={home} alt='Home' /> Home</Link>
            </NavItem>
            
            <NavItem>
            <Link to="/calendar" ><img src={calendar} alt='Home' /> Calendário</Link>
            </NavItem>
            
            <NavItem>
            <Link to="/" ><img src={dicas} alt='Dicas' /> Dicas</Link>
            </NavItem>
            
            <NavItem>
            <Link to="/" ><img src={user} alt='Perfil' /> Perfil</Link>
            </NavItem>
        </Nav>
    )
}

export default MenuAside
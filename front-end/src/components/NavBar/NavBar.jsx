import { Navbar, NavbarBrand } from 'reactstrap'
import logo from "./../../assets/CycleSense.svg"
import logout from "./../../assets/logout.svg"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate()
    const logoutRedirect = () => {
        sessionStorage.removeItem('token');
        navigate("/login")
    }

    return (
        <header>
            <Navbar color="light" light style={{ boxShadow: "0px 4px 10px 0px #1E1E1E26", position: "fixed", width: "100%", zIndex: 10}}>
                <NavbarBrand href="/">
                    <img
                        alt="logo"
                        src={logo}
                        style={{
                            width: 120
                        }}
                    />
                </NavbarBrand>
                <div>
                    <img 
                        src={logout} 
                        style={{
                            cursor: 'pointer',
                            margin: "0px 20px 0px 0px"
                        }}
                        onClick={() => logoutRedirect()}
                    />
                </div>
            </Navbar>
        </header>
    )
}

export default NavBar
import { Navbar, NavbarBrand } from 'reactstrap'
import logo from "./../../assets/CycleSense.svg"

const NavBar = () => {
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
            </Navbar>
        </header>
    )
}

export default NavBar
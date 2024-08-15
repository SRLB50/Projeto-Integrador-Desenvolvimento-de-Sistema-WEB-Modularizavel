import { Navbar, NavbarBrand } from 'reactstrap'
import logo from "./../../assets/CycleSense.svg"

const NavBar = () => {
    return (
        <Navbar className="my-2" color="light" light style={{ boxShadow: "0px 4px 10px 0px #1E1E1E26" }}>
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
    )
}

export default NavBar
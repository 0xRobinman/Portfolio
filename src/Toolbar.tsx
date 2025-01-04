// OxRobinamn Hire me | About | Projects | Contact       ...              gh_logo | cog_logo
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';




function ToolBarItem({ link, text }: { link: string, text: string }) {
    return (
        <Nav.Link href={link}>
            {text}
        </Nav.Link>
    )

}

function ToolBarIcon({ link, icon }: { link: string, icon: string }) {

    return (
        <Nav.Link href={link}>
            <img src={icon} alt = "icon"/> 
        </Nav.Link>
    );
}


function ToolBar() {


    return(

        <Navbar bg="light" expand="lg">


            <Container>
            <Nav className="me-auto">
                <ToolBarItem link="#hireme" text="Hire me" />            
                <ToolBarItem link="#about" text="About" />            
                <ToolBarItem link="#projects" text="Projects" />            
                <ToolBarItem link="#contact" text="Contact" />
            </Nav>
            </Container>

                    

        </Navbar>


    )


}


export default ToolBar;
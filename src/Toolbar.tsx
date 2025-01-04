// OxRobinamn Hire me | About | Projects | Contact       ...              gh_logo | cog_logo
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Toolbar.css';
import GithubLogo from '/github.svg';


function ToolBarItem({ link, text }: { link: string, text: string }) {
    return (
        <Nav.Link className='toolbar_item' href={link}>
            {text}
        </Nav.Link>
    )

}
type IconProps = React.ReactNode;

  
function ToolBarIcon({ link, icon }: { link: string, icon: IconProps }) {

    return (
        <Nav.Link className='toolbar_icon' href={link}>
            {icon}
        </Nav.Link>
    );
}


function ToolBar() {


    return(
        <Navbar bg="dark" expand="lg">
            <Container>
            <Nav className="me-auto">
                <Navbar.Brand href="#">o<span>x</span>robinman</Navbar.Brand>
                <ToolBarItem link="#hireme" text="hire me" />            
                <ToolBarItem link="#about" text="about" />            
                <ToolBarItem link="#projects" text="projects" />            
                <ToolBarItem link="#contact" text="contact" />
            </Nav>

            <Nav>
                <Nav.Link className='toolbar_icon' href="https://github.com/0xRobinman">
                    <svg xmlns="http://www.w3.org/2000/svg" width={25} fill="white" className="bi bi-github gh" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )


}


export default ToolBar;
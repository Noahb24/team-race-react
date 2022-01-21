import React from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";

const Header = () => {
    
    return (
        <Navbar bg="dark" variant='dark' expand={false}>
            <Container fluid>
                <Navbar.Brand href="/">Team Series</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/history">History</Nav.Link>
                            <Nav.Link href="/leaderboard">Leader Board</Nav.Link>
                            <Nav.Link href="/book">Kris's Fun Facts</Nav.Link>
                            <Nav.Link href="/pictures">Pictures</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header
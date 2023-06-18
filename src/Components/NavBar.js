import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/studentslist">Students List</Nav.Link>
          <Nav.Link as={Link} to="/teacherslist">Teachers List</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;

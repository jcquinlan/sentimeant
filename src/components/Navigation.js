import React, { useContext } from 'react';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Link} from './styled';
import HeartGIF from '../imgs/heart.gif';
import { DataContext } from '../contexts/data';

const NavStyles = {
    marginBottom: '30px',
    paddingTop: '30px'
};

const Navigation = () => {
    const data = useContext(DataContext);

    return (
        <Navbar expand="lg" variant="light" style={NavStyles}>
            <Container>
                <Navbar.Brand href="#">
                    <BrandImage src={HeartGIF} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/">Home</Link>
                        <Link to="/new">Request a Letter</Link>
                        <Link to="/open-requests">Write a Letter</Link>
                        {!data.currentUser && <Link to="/sign-in">Sign In</Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const BrandImage = styled.img`
    width: 30px;
    margin-right: 15px;
`;

export default Navigation;

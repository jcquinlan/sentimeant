import React, {useContext, useState} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Link} from './styled';
import HeartGIF from '../imgs/heart.gif';
import {DataContext} from '../contexts/data';

const NavStyles = {
    marginBottom: '30px',
    paddingTop: '30px'
};

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);
    const data = useContext(DataContext);
    const history = useHistory();
    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                history.replace('/');
                data.setCurrentUser(null);

            })
            .catch(err => {
                console.error(err)
            });
    }

    return (
        <Navbar expand="lg" variant="light" style={NavStyles} expanded={expanded}>
            <Container>
                <Navbar.Brand onClick={() => history.push('/')}>
                    <BrandImage src={HeartGIF} />
                </Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link onClick={() => setExpanded(false)} to="/">Home</Link>
                        <Link onClick={() => setExpanded(false)} to="/new">Request a Letter</Link>
                        <Link onClick={() => setExpanded(false)} to="/open-requests">Write a Letter</Link>
                        {!data.currentUser && <Link to="/sign-in">Sign In</Link>}
                        {!!data.currentUser && <Link onClick={signOut}>Sign Out</Link>}
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

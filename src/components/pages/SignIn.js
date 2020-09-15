import React, {useContext} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {Row} from 'react-bootstrap';
import firebase from 'firebase';
import {Hero, Title, SectionWrapper} from '../styled';
import SignInButtonSrc from '../../imgs/google_sign_in.png';
import {DataContext} from '../../contexts/data';

const provider = new firebase.auth.GoogleAuthProvider();

const SignIn = () => {
    const dataContext = useContext(DataContext);
    const history = useHistory();

    const signInUser = () => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            dataContext.setCurrentUser(result.user);
            history.replace('/');
          }).catch(function(error) {
              console.error(error);
          });
    };

    return (
        <>
        <Row>
            <Hero>
                <SectionWrapper>
                    <Title>Sign In</Title>
                    <p>If you want to make a new letter request, you need to make an account first.
                        Yeah, it's annoying to have to do, but ¯\_(ツ)_/¯</p>
                    <SignInButton onClick={signInUser}>
                        <SignInButtonImage src={SignInButtonSrc} />
                    </SignInButton>
                </SectionWrapper>
            </Hero>
        </Row>
        </>
    )
};

const SignInButton = styled.div`
    cursor: pointer;
`;

const SignInButtonImage = styled.img`
    width: 200px;
    margin-left: -5px;
`;

export default SignIn;
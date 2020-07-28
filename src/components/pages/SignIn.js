import React from 'react';
import styled from 'styled-components';
import {Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Hero, Title, SectionWrapper, Small} from '../styled';
import SignInButtonSrc from '../../imgs/google_sign_in.png';

const SignIn = () => {

    return (
        <>
        <Row>
            <Hero>
                <SectionWrapper>
                    <Title>Sign In</Title>
                    <p>If you want to make a new letter request, you need to make an account first.
                        Yeah, it's annoying to have to do, but ¯\_(ツ)_/¯</p>
                    <SignInButton>
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

import React from 'react';
import styled from 'styled-components';
import {Row, Button} from 'react-bootstrap';
import {Title, CenterBox, Small, Hero, SectionWrapper, Separator} from '../styled';

function Home () {
    return (
        <>
            <Row>
                <Hero>
                    <Title>sentimeant</Title>
                    <p>Have a total stranger write the love letter you know you can't.</p>
                </Hero>
            </Row>

            <Row>
                <SectionWrapper>
                    <InstructionsList>
                        <InstructionItem>
                            <InstructionNumber>1.</InstructionNumber>
                            <div>
                                <InstructionTitle>Submit a love letter request.</InstructionTitle>
                                <InstructionSubtext>
                                    Provide some basic info, like who the letter is for, what you want to emphasize, maybe a specific memory with that person, etc.
                                </InstructionSubtext>
                            </div>
                        </InstructionItem>

                        <InstructionItem>
                            <InstructionNumber>2.</InstructionNumber>
                            <div>
                                <InstructionTitle>Wait for someone to fulfill the request.</InstructionTitle>
                                <InstructionSubtext>
                                    Other visitors to the site can submit drafts of your love letter, so you just need to sit back and relax until
                                    someone writes your love letter for you. Hopefully they're the sappy, romantic type.
                                </InstructionSubtext>
                            </div>
                        </InstructionItem>

                        <InstructionItem>
                            <InstructionNumber>3.</InstructionNumber>
                            <div>
                                <InstructionTitle>Approve a draft you like.</InstructionTitle>
                                <InstructionSubtext>
                                    Once the drafts come in, we'll email you and let you know that your love letter has been written. If you like it, you
                                    can approve the draft, so we can mark it as being fulfilled, hiding it from future writers.
                                </InstructionSubtext>
                            </div>
                        </InstructionItem>

                        <InstructionItem>
                            <InstructionNumber>4.</InstructionNumber>
                            <div>
                                <InstructionTitle>Send it to your honeydip, boo, baby, amor, etc.</InstructionTitle>
                                <InstructionSubtext>
                                    Use it. Those are <i>basically</i> your words, right? It's at least what you meant.
                                </InstructionSubtext>
                            </div>
                        </InstructionItem>
                    </InstructionsList>
                </SectionWrapper>
            </Row>
             <Row>
                 <CenterBox>
                    <Button variant="primary">Request a Love Letter</Button>
                 </CenterBox>
             </Row>

            <Separator />

             <Row>
                <Hero>
                    <Title>Wanna write someone's love letter?</Title>
                    <p>Maybe you're just the Shakespeare that some ineloquent, love-drunk sap has been looking for.</p>
                    <Button variant="primary">See Open Requests</Button>
                </Hero>
             </Row>

             <Row>
                 <CenterBox>
                     <Small>made by james quinlan</Small>
                 </CenterBox>
             </Row>
        </>
    )
}

const InstructionsList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    
    li {
        margin-bottom: 10px;
    }
`;

const InstructionNumber = styled.span`
    font-weight: bold;
    font-size: 24px;
    margin-right: 15px;
`;

const InstructionItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

const InstructionTitle = styled.h6`
    font-size: 20px;
`;

const InstructionSubtext = styled.p`
    color: #444;
`;

export default Home;
import React from 'react';
import {Row} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {Hero, Title, SectionWrapper, MarginBox, CenterBox, Small} from '../styled';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const backgroundPlaceholder = "We met 2 years ago. My petname for them is 'Greenbean' and we went to the Grand Canyon together last year. We camped for 2 weeks there, and we said we love eachother for the first time on that trip. They snore lightly, but it comforts me to hear because it means I know they're sleeping peacefully. They taught me to whistle, and I think of them when I hear whistling in songs."
const shittyLoveLetter = "Roses are red, violets are blue, I love you as much as someone who loves someone else a whole lot."

const SubmitLetterRequest = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <>
        <Row>
            <Hero>
                <SectionWrapper>
                    <Title>New Request</Title>
                    <p>
                        Provide some basic information for your ghostwriters, so they have ample
                        material to work with. Feel free to be as specific as you'd like.
                    </p>
                </SectionWrapper>
            </Hero>
        </Row>

        <Row>
            <SectionWrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Your Email Address</Form.Label>
                        <Form.Control name="email" ref={register({required: true})} type="email" placeholder="unromantic@cantwrite.gov" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else, promise.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name of Recipient</Form.Label>
                        <Form.Control name="name" ref={register({required: true})} type="text" placeholder="Clara? James? Malcolm? Tyra?" />
                    </Form.Group>

                    <Form.Group controlId="formBasicInfo">
                        <Form.Label>Background Info</Form.Label>
                        <Form.Control name="basicInfo" ref={register({required: true})} type="text" rows="10" as="textarea" placeholder={backgroundPlaceholder} />
                    </Form.Group>

                    <Form.Text>
                    In case you don't know what to include in the background info section, maybe include stuff like your ages, preferred pronouns, how you met,
                    how long you've known eachother, a favorite memory with this person, something they helped you learn, a petname you call them,
                    a fear you have about the relationship, etc.
                    </Form.Text>

                    <MarginBox />

                    <Form.Group controlId="formBasicDraft">
                        <Form.Label>Shitty Version That You Wrote</Form.Label>
                        <Form.Control name="draft" ref={register()} type="text" rows="10" as="textarea" placeholder={shittyLoveLetter} />
                    </Form.Group>

                    <Form.Text>
                        Maybe you tried your best to write the letter on your own, and struck out. Feel free to include your version here
                        so your ghostwriter can get a better feel for what you like or the direction you wanted to head in.
                    </Form.Text>

                    <MarginBox />

                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title of Request</Form.Label>
                        <Form.Control name="name" ref={register({required: true})} type="text" placeholder="Letter for partner of 2 years - looking for extra sappiness" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </SectionWrapper>
        </Row>

        <Row>
            <MarginBox height="80px"/>
            <CenterBox>
                <Small>And don't worry, we won't tell anyone you need a little help.</Small>
            </CenterBox>
        </Row>
        </>
    )
}

export default SubmitLetterRequest;

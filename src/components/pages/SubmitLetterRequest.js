import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Row} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {Hero, Title, SectionWrapper, MarginBox, CenterBox, Small, MessageText} from '../styled';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {DataContext} from '../../contexts/data';
import { createLetterRequest } from '../../services/requestService';

const backgroundPlaceholder = "We met 2 years ago. My petname for them is 'Greenbean' and we went to the Grand Canyon together last year. We camped for 2 weeks there, and we said we love each other for the first time on that trip. They taught me to whistle, and I think of them when I hear whistling in songs."
const shittyLoveLetter = "Roses are red, violets are blue, I love you as much as someone who loves someone else a whole lot."
const descriptionPlaceholder = "They are loud, but I like that about them, because they have so much energy and I don't. \
They always say what they feel as they feel it, and say it in a way like they're discovering their feelings as the words come out. \
They snore a little bit, too, but I like that because it means they're sleeping peacefully, which is important to me. \
Their favorite time of day is dusk, and they always drink a coffee on the porch when it rains.";

const SubmitLetterRequest = () => {
    const history = useHistory();
    const dataContext = useContext(DataContext);
    const {register, handleSubmit} = useForm();
    const onSubmit = formData => {
        createLetterRequest({
            ownerId: dataContext.currentUser.uid,
            name: formData.name,
            description: formData.description,
            miscInfo: formData.miscInfo,
            ownVersion: formData.draft,
            title: formData.title
        }).then(res => {
            // @TODO - Redirect the user to their new post, or the list of all posts, or something
            history.push('/');
        })
        .catch(err => {
            console.error(err);
        });
    };

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

        {!dataContext.currentUser && (
            <Row>
                <SectionWrapper>
                    <MessageText>Only registered users can request letters.</MessageText>
                </SectionWrapper>
            </Row>
        )}

        <Row>
            <SectionWrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name of Recipient</Form.Label>
                        <Form.Control name="name" disabled={!dataContext.currentUser} ref={register({required: true})} type="text" placeholder="Clara? James? Malcolm? Tyra?" />
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Description of Recipient</Form.Label>
                        <Form.Control name="description" disabled={!dataContext.currentUser} ref={register({required: true})} type="text" rows="10" as="textarea" placeholder={descriptionPlaceholder} />
                    </Form.Group>

                    <Form.Group controlId="formBasicInfo">
                        <Form.Label>Miscellaneous Info</Form.Label>
                        <Form.Control name="miscInfo" disabled={!dataContext.currentUser} ref={register({required: true})} type="text" rows="10" as="textarea" placeholder={backgroundPlaceholder} />
                    </Form.Group>

                    <Form.Text>
                    In case you don't know what to include in the background info section, maybe include stuff like your ages, preferred pronouns, how you met,
                    how long you've known eachother, a favorite memory with this person, something they helped you learn, a petname you call them,
                    a fear you have about the relationship, etc.
                    </Form.Text>

                    <MarginBox />

                    <Form.Group controlId="formBasicDraft">
                        <Form.Label>Shitty Version That You Wrote</Form.Label>
                        <Form.Control name="draft" disabled={!dataContext.currentUser} ref={register()} type="text" rows="10" as="textarea" placeholder={shittyLoveLetter} />
                    </Form.Group>

                    <Form.Text>
                        Maybe you tried your best to write the letter on your own, and struck out. Feel free to include your version here
                        so your ghostwriter can get a better feel for what you like or the direction you wanted to head in.
                    </Form.Text>

                    <MarginBox />

                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title of Request</Form.Label>
                        <Form.Control name="title" disabled={!dataContext.currentUser} ref={register({required: true})} type="text" placeholder="Letter for partner of 2 years - looking for extra sappiness" />
                    </Form.Group>

                    <Button disabled={!dataContext.currentUser} variant="primary" type="submit">
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

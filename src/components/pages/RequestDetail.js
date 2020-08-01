import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {Row, Button} from 'react-bootstrap';
import {Hero, SectionWrapper, Section, SectionTitle, SectionBody, Title, MessageText, Separator} from '../styled';
import Editor, {ContentDisplay} from '../Editor';
import {getRequest, createLetterDraft, getDraftsForRequest} from '../../services/requestService';

const RequestDetail = () => {
    const {requestId} = useParams();
    const history = useHistory();
    const [request, setRequest] = useState(null);
    const [error, setError] = useState('');
    const [editorState, setEditorState] = useState(null);
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        if (requestId) {
            getRequest(requestId)
                .then(incomingRequest => console.log(incomingRequest) || setRequest(incomingRequest))
                .catch(err => setError(err));
            
            getDraftsForRequest(requestId)
                .then(draftsSnapshot => {
                    const incomingDrafts = [];
                    draftsSnapshot.forEach(draftSnapshot => {
                        incomingDrafts.push(draftSnapshot.data());
                    });
                    setDrafts(incomingDrafts);
                });
        }
    }, [requestId]);

    const submitDraft = () => {
        if (!editorState || !editorState.length) return;

        createLetterDraft({
            requestId,
            content: JSON.stringify(editorState)
        })
        .then(() => {
            // @TODO - hook up a toast message or something
            history.push('/');
        });
    };

    const renderDrafts = () => {
        return drafts.map(draft => {
            return (
                <ContentDisplayWrapper>
                    <ContentDisplayHeader>
                        <span>Submitted {moment(draft.createdAt.seconds * 1000).format('l')}</span>
                    </ContentDisplayHeader>
                    <ContentDisplay content={JSON.parse(draft.content)} />
                </ContentDisplayWrapper>
            )
        });
    };

    if (error) {
        return (
            <>
            <Row>
                <Hero>
                    <SectionWrapper>
                        <MessageText>An error has occurred.</MessageText>
                    </SectionWrapper>
                </Hero>
            </Row>
            </>
        );
    }

    if (!request) {
        return (
            <>
            <Row>
                <Hero>
                    <SectionWrapper>
                        <p>Loading...</p>
                    </SectionWrapper>
                </Hero>
            </Row>
            </>
        );
    }

    return (
        <>
        <Row>
            <Hero>
                <SectionWrapper>
                    <Title>{request.title}</Title>
                </SectionWrapper>
            </Hero>
        </Row>

        <Row>
            <SectionWrapper>
                <Section>
                    <SectionTitle>Name of Recipient</SectionTitle>
                    <SectionBody>{request.recipientName}</SectionBody>
                </Section>

                <Section>
                    <SectionTitle>Description of Recipient</SectionTitle>
                    <SectionBody>{request.recipientDescription}</SectionBody>
                </Section>

                <Section>
                    <SectionTitle>Miscellaneous Info</SectionTitle>
                    <SectionBody>{request.miscInfo}</SectionBody>
                </Section>

                <Section>
                    <SectionTitle>Requester's Attempt</SectionTitle>
                    <SectionBody>{request.ownVersion}</SectionBody>
                </Section>
            </SectionWrapper>
        </Row>

        <Separator />

        <Row>
            <Section>
                <SectionTitle>Write a Draft</SectionTitle>
                <SectionBody>
                    Use the material above to try to write a love letter on behalf of whoever requested it.
                    Once you submit it, we'll inform the requester that they have a new draft ready. If they like it, they can accept it.
                    If they don't like it, then that's just a shame.
                </SectionBody>
            </Section>
            <Section>
                <Editor state={editorState} onChange={setEditorState} />
            </Section>
            <Section>
                <Button onClick={submitDraft}>Submit</Button>
            </Section>
        </Row>

        <Separator />

        <Row>
            <SectionWrapper>
                <Section>
                    <SectionTitle>Drafts List</SectionTitle>
                    <SectionBody>
                        These are all the drafts for this request which have been submitted by visitors to the site. If you're the owner 
                        of this request, you can mark one as accepted.
                    </SectionBody>
                </Section>
            </SectionWrapper>

            <Section>
                {renderDrafts()}
            </Section>
        </Row>
        </>
    )
};

const ContentDisplayWrapper = styled.div``;

const ContentDisplayHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;

    span {
        color: #666;
    }
`;

export default RequestDetail;

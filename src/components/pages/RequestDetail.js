import React, {useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {useToasts} from 'react-toast-notifications';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {Row, Button} from 'react-bootstrap';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Hero,
    SectionWrapper,
    Section,
    SectionTitle,
    SectionBody,
    Title,
    ErrorMessage,
    Separator,
    ButtonRow,
    Colors
} from '../styled';
import Editor, {ContentDisplay} from '../Editor';
import {getRequest, getDraftsForRequest, deleteRequest, deleteDraft, acceptDraft, submitDraft} from '../../services/requestService';
import usePermissions from '../hooks/usePermissions';

const RequestDetail = () => {
    const {requestId} = useParams();
    const history = useHistory();
    const {addToast} = useToasts();
    const [request, setRequest] = useState(null);
    const [savingDraft, setSavingDraft] = useState(false);
    const [error, setError] = useState('');
    const [editorState, setEditorState] = useState(null);
    const [drafts, setDrafts] = useState([]);
    const {isRequestOwner} = usePermissions(request);
    const hasAlreadyAcceptedDraft = useMemo(() => {
        return !!drafts.some(draft => draft.accepted);
    }, [drafts]);

    useEffect(() => {
        if (requestId) {
            getRequest(requestId)
                .then(incomingRequest => setRequest(incomingRequest))
                .catch(err => setError(err));
            
            getDraftsForRequest(requestId)
                .then(draftsSnapshot => {
                    const incomingDrafts = [];
                    draftsSnapshot.forEach(draftSnapshot => {
                        incomingDrafts.push({...draftSnapshot.data(), id: draftSnapshot.id});
                    });
                    setDrafts(incomingDrafts);
                });
        }
    }, [requestId]);

    const handleSubmitDraft = () => {
        if (!editorState || !editorState.length) return;

        setSavingDraft(true);
        submitDraft({
            requestId,
            content: JSON.stringify(editorState),
            ownerId: request.ownerId,
            requestTitle: request.title
        })
        .then(() => {
            // @TODO - hook up a toast message or something
            addToast('Your draft has been submitted.', {appearance: 'success'});
            history.push('/');
        })
        .catch(() => {
            addToast('There was a problem submitting your draft.', {appearance: 'error'});
        })
        .finally(() => {
            setSavingDraft(false);
        });
    };

    const handleDeleteDraft = (draftId) => {
        deleteDraft(draftId)
            .then(() => {
                setDrafts(drafts.filter(draft => draft.id !== draftId));
            })
            .catch(err => console.error(err));
    }

    const handleAcceptDraft = (draftId) => {
        acceptDraft(draftId)
            .then(() => {
                const syncedDrafts = drafts.map(draft => {
                    if (draft.id === draftId) {
                        return {
                            ...draft,
                            accepted: true
                        }
                    }

                    return draft;
                });

                setDrafts(syncedDrafts);
            })
            .catch(err => console.error(err));
    }

    const renderDrafts = () => {
        return drafts.map(draft => {
            return (
                <ContentDisplayWrapper key={draft.id}>
                    <ContentDisplayHeader>
                        <div>
                            {draft.accepted && (
                                <>
                                <AcceptedTag>Accepted</AcceptedTag>
                                <CheckIcon color={Colors.Green} icon={faCheckCircle} />
                                </>
                            )}
                        </div>
                        <div>
                            <SubmittedText>Submitted {moment(draft.createdAt.seconds * 1000).format('l')}</SubmittedText>
                            {isRequestOwner && !hasAlreadyAcceptedDraft && (
                                <MiniButton onClick={() => handleAcceptDraft(draft.id)}>Accept Draft</MiniButton>
                            )}
                            {isRequestOwner && <MiniButton secondary onClick={() => handleDeleteDraft(draft.id)}>Delete</MiniButton>}
                        </div>
                    </ContentDisplayHeader>
                    <ContentDisplay content={JSON.parse(draft.content)} />
                </ContentDisplayWrapper>
            )
        });
    };

    const handleDeleteRequest = () => {
        deleteRequest(requestId)
            .then(() => history.push('/'));
    };

    if (error) {
        return (
            <>
            <Row>
                <Hero>
                    <SectionWrapper>
                        <ErrorMessage>An error has occurred.</ErrorMessage>
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

        {isRequestOwner && (<Row>
            <SectionWrapper>
                <ButtonRow>
                    <Button onClick={handleDeleteRequest}>Delete Request</Button>
                </ButtonRow>
            </SectionWrapper>
        </Row>
        )}

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

        {!isRequestOwner && (
            <>
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
                        <Button disabled={savingDraft} onClick={handleSubmitDraft}>
                            {savingDraft ? 'Loading' : 'Submit'}
                        </Button>
                    </Section>
                </Row>

                <Separator />
            </>
        )}

        <Row>
            <SectionWrapper>
                <Section>
                    <SectionTitle>Draft List</SectionTitle>
                    <SectionBody>
                        These are all the drafts for this request which have been submitted by visitors to the site. If you're the owner 
                        of this request, you can mark one as accepted.
                    </SectionBody>
                </Section>
            </SectionWrapper>

            <Section>
                {drafts.length ? renderDrafts() : <SectionWrapper>Hmmm, no drafts yet.</SectionWrapper>}
            </Section>
        </Row>
        </>
    )
};

const SubmittedText = styled.span`
    color: #888;
`;

const CheckIcon = styled(FontAwesomeIcon)`
    margin-left: 5px;
`;

const ContentDisplayWrapper = styled.div``;

const ContentDisplayHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

const MiniButton = styled.button`
    border: none;
    background-color: ${Colors.Pink};
    border: 1px solid ${Colors.Pink};
    border-radius: 5px;
    margin-left: 10px;
    color: #fff;

    ${props => !!props.secondary ? `
        color: #666;
        background-color: #eee;
        border-color: #eee;
    ` : ''}
`;

const AcceptedTag = styled.span`
    color: ${Colors.Green};
`;

export default RequestDetail;

import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import {groupBy} from 'lodash';
import {Row} from 'react-bootstrap';
import {Hero, Title, SectionWrapper, Colors} from '../styled';
import {getAcceptedDrafts, convertSnapshotToArray} from '../../services/requestService';
import {ContentDisplay} from '../Editor';

const AcceptedDraftsList = () => {
    const [loadingWindowEnded, setLoadingWindowEnded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        setTimeout(() => setLoadingWindowEnded(true), 500);
        getAcceptedDrafts()
            .then(requestSnapshot => {
                const draftList = convertSnapshotToArray(requestSnapshot);
                setDrafts(draftList);
            })
            .finally(() => setLoading(false));
    }, []);

    const renderDrafts = () => {
        return drafts.map(draft => {
            return (
                <div>
                    <ContentDisplayHeader>
                        <ContentDisplayHeaderText></ContentDisplayHeaderText>
                        <ContentDisplayHeaderText>Submitted {moment(draft.createdAt.seconds * 1000).format('l')}</ContentDisplayHeaderText>
                    </ContentDisplayHeader>
                    <ContentDisplay content={JSON.parse(draft.content)} />
                </div>
            )
        })
    }

    return (
        <>
        <Row>
            <Hero>
                <SectionWrapper>
                    <Title>Accepted Drafts</Title>
                    <p>These are the most recent accepted drafts, so you can get some inspiration, or just satisfy your penchant for voyeurism.</p>
                </SectionWrapper>
            </Hero>
        </Row>

        <Row>
            <SectionWrapper>
                {loadingWindowEnded && loading && <p>Loading...</p>}
                {!loading && !drafts.length && <p>No accepted drafts, yet.</p>}
            </SectionWrapper>
        </Row>
        <div>
        {!loading && renderDrafts()}
        </div>
        </>
    )
};

const ContentDisplayHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

const ContentDisplayHeaderText = styled.span`
    color: #888;
`;

export default AcceptedDraftsList;

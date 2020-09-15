import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import {groupBy} from 'lodash';
import {Row} from 'react-bootstrap';
import {Hero, Title, SectionWrapper, Colors} from '../styled';
import {getRequests, getDraftsForRequests, convertSnapshotToArray} from '../../services/requestService';

const ViewOpenRequests = () => {
    const history = useHistory();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [drafts, setDrafts] = useState({});

    useEffect(() => {
        getRequests().then(requestSnapshot => {
            const requestList = convertSnapshotToArray(requestSnapshot);
            setRequests(requestList);
            const requestIds = requestList.map(({id}) => id);

            if (requestIds.length) {
                return getDraftsForRequests(requestIds)
                    .then(draftsSnapshot => {
                        return convertSnapshotToArray(draftsSnapshot)
                    });
            }

            return [];
        })
        .then(drafts => {
            setDrafts(groupBy(drafts, 'requestId'));
        })
        .finally(() => setLoading(false));
    }, []);

    const goToRequest = (requestId) => {
        history.push(`/request/${requestId}`);
    };

    const renderRequests = () => {
        return requests.map(request => {
            const numOfDrafts = drafts[request.id] ? drafts[request.id].length : 0;

            return (
                <RequestPreview key={request.id} onClick={() => goToRequest(request.id)}>
                    <InfoBox>
                        <Number>{numOfDrafts}</Number>
                        draft{numOfDrafts === 1 ? '' : 's'}
                    </InfoBox>

                    <RequestTitle>
                        {request.title}
                    </RequestTitle>

                    <InfoBox>
                        <Date>{moment().format('M/D/YY')}</Date>
                        created
                    </InfoBox>
                </RequestPreview>
            )
        })
    }

    return (
        <>
        <Row>
            <Hero>
                <SectionWrapper>
                    <Title>Write a Letter</Title>
                    <p>
                        See all love letter requests that still need to be fulfilled. Find one that piques your interest, and take a stab
                        at writing the love letter based on the information provided in the request.
                    </p>
                </SectionWrapper>
            </Hero>
        </Row>

        <Row>
            <SectionWrapper>
                {loading && <p>Loading...</p>}
                {!loading && !requests.length && <p>There are no open requests at the moment.</p>}
                {renderRequests()}
            </SectionWrapper>
        </Row>
        </>
    )
};

const RequestPreview = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #eee;
    margin-bottom: 15px;
    padding: 15px 30px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        border-color: ${Colors.Pink};
    }
`;

const InfoBox = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center; 
   font-size: 12px;
`;

const Number = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: -7px;
`;

const Date = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const RequestTitle = styled.div`
    padding: 0 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
`;

export default ViewOpenRequests;

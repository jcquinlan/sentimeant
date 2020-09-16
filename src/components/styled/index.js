import styled from 'styled-components';
import {Title} from './Title';
import {Link} from './Link';

export const Colors = {
    Pink: '#ff9ccf',
    Red: '#e32424',
    Green: '#3cc761'
}

const Button = styled.button`
    padding: 7px 20px;
    background-color: #fff;
    color: #333;
    border: 3px solid ${Colors.Pink};
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        color: #000;
    }
`;

const CenterBox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

const Small = styled.small`
    color: #666;
`;

const Hero = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 50px 0 30px 0;
    
    p {
        font-size: 18px;
    }

    @media (max-width: 575px) {
        padding-top: 0;
    }
`;

const SectionWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
`;

const Section = styled.div`
    margin-bottom: 30px;
    width: 100%;
`;

const SectionTitle = styled.h4`
    font-size: 20px;
`;

const SectionBody = styled.p`

`;

const MarginBox = styled.div`
    width: 100%;
    height: ${props => props.height || '30px'};
`;

const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #eee;
    margin: 60px 0;
`;

const ErrorMessage = styled.h3`
    font-size: 14px;
    margin-bottom: 30px;
    color: ${Colors.Red};
    
    a {
        text-decoration: underline;

        &:hover {
            color: ${Colors.Pink};
        }
    }
`;

const ButtonRow = styled.div`
    display: flex;
    margin-bottom: 30px;
`;

export {
    Title,
    Link,
    Button,
    CenterBox,
    Small,
    Hero,
    SectionWrapper,
    Section,
    SectionTitle,
    SectionBody,
    MarginBox,
    Separator,
    ErrorMessage,
    ButtonRow
};

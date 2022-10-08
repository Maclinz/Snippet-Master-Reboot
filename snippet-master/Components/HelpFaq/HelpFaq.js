import React from 'react'
import styled from 'styled-components'
import faqs from '../../utils/faqs';
import FaqItem from './FaqItem';

function HelpFaq() {

    return (
        <HelpFaqStyled>
            {
                faqs.map((faq, index) => {
                    return <FaqItem key={index} question={faq.question} answer={faq.answer} />
                })
            }
        </HelpFaqStyled>
    )
}

const HelpFaqStyled = styled.div`

`;

export default HelpFaq
import React from 'react'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'
import { plus, xmark } from '../../utils/Icons'

function FaqItem({question, answer}) {

    const theme = useThemeContext()

    //state
    const [toggleAnswer, setToggleAnswer] = React.useState(false)

    return (
        <FaqItemStyled theme={theme}>
            <div className="faq">
                <h6 className={`${toggleAnswer ? 'active-faq': '' }`} onClick={() => setToggleAnswer(!toggleAnswer)}>
                    {question} 
                    <div className="icons">
                        {
                            toggleAnswer ?  xmark : plus 
                        }
                    </div>
                </h6>
                <p>
                    {
                        toggleAnswer && answer
                    }
                </p>
            </div>
        </FaqItemStyled>
    )
}

const FaqItemStyled = styled.div`
    .active-faq{
        background-color: ${props => props.theme.colorBg};
    }
    h6{
        cursor: pointer;
        padding: 1.4rem 1rem;
        border: 1px solid ${props => props.theme.borderColor2};
        border-radius: 5px;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    p{
        padding: .6rem 1rem;
    }
`;

export default FaqItem
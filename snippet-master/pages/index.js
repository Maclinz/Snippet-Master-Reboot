import Head from 'next/head'
import styled from 'styled-components'
import Categories from '../Components/Categories/Categories';
import Layout from '../Components/Layout';
import Main from '../Components/Main/Main';
import MainContent from '../Components/MainContent/MainContent';
import Snippet from '../Components/Snippet/Snippet';
import { useThemeContext } from '../context/themeContext';

export default function Home() {
  const theme = useThemeContext()

  return (
    <MainContentStyled theme={theme}>
      <Layout>
        <MainContent>
          <div className="categories-con">
            <Categories />
          </div>
          <div className="snippets-con">
            
          </div>
        </MainContent>
      </Layout>
    </MainContentStyled>
  )
}

const MainContentStyled = styled.div`
  .categories-con{
    position: fixed;
    z-index: 3;
  }
  .snippets-con{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 6rem 1.5rem;
    grid-gap: ${props => props.theme.gridGap};
  }

`;




import Head from "next/head";
import styled from "styled-components";
import Button from "../Components/Button/Button";
import Categories from "../Components/Categories/Categories";
import Layout from "../Components/Layout";
import Loading from "../Components/Loading/Loading";
import MainContent from "../Components/MainContent/MainContent";
import Snippet from "../Components/Snippet/Snippet";
import { useSnippetContext } from "../context/snippetContext";
import { useThemeContext } from "../context/themeContext";
import { down } from "../utils/Icons";

export default function Home() {
  const theme = useThemeContext();
  const { snippets, loading, loadMore, expandSnippet } = useSnippetContext();

  return (
    <MainContentStyled theme={theme}>
      <Layout>
        <MainContent>
          <div className="categories-con">
            <Categories />
          </div>
          <div
            className="loading-con"
            style={{
              paddingTop: loading ? "2rem" : "0",
            }}
          >
            {loading && <Loading />}
          </div>
          <div className="snippets-con">
            {snippets?.map((snippet) => {
              return <Snippet key={snippet._id} snippet={snippet} />;
            })}
          </div>
          {snippets?.length > 5 && (
            <div className="load-more">
              <Button
                name={"Load More"}
                type={"submit"}
                selector={"btn-login"}
                padding={".8rem 2rem"}
                borderRad={"0.8rem"}
                fw={"bold"}
                fs={"1.2rem"}
                backgound={theme.colorPrimary2}
                icon={down}
                blob={"blob"}
                click={loadMore}
              />
            </div>
          )}
        </MainContent>
      </Layout>
    </MainContentStyled>
  );
}

const MainContentStyled = styled.div`
  .categories-con {
    position: fixed;
    z-index: 3;
  }
  .snippets-con {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    padding: 6.1rem 1.5rem;
    grid-gap: ${(props) => props.theme.gridGap};
    transition: all 0.2s ease-in-out;
    @media screen and (max-width: 1260px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

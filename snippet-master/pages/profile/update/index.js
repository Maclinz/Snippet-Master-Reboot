import Layout from "../../../Components/Layout";
import MainContent from "../../../Components/MainContent/MainContent";
import { useThemeContext } from "../../../context/themeContext";
import styled from 'styled-components'
import Private from "../../../Components/auth/Private";
import ProfileUpdate from "../../../Components/ProfileUpdate/ProfileUpdate";

function UserProfileUpdate() {
    const theme = useThemeContext()

    return (
        <Layout>
            <MainContent >
                <Private>
                    <ProfileStyled theme={theme}>
                        <ProfileUpdate />
                    </ProfileStyled>
                </Private>
            </MainContent>
        </Layout>
    )
}

const ProfileStyled = styled.div`
    
`;

export default UserProfileUpdate
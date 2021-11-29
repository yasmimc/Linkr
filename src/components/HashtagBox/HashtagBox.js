import Hashtag from "./Hashtag";
import CircleLoader from "../loaders/CircleLoader";
import styled from "styled-components";
import { getTrendingTopics } from "../../services/API/requests";
import UserContext from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import SearchHashtag from "./SearchHashtag";
export default function HashtagBox() {
    const { loggedUser } = useContext(UserContext);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingTopics(loggedUser).then((response) => {
            setLoading(false);
            setHashtags(response.data.hashtags.sort((a, b) => a - b));
        });
    }, [loggedUser]);

    return (
        <Container>
            <TitleContainer>
                <h2>trending</h2>
            </TitleContainer>

            <ContentContainer>
                {loading ? (
                    <CircleLoader
                        customStyle={{
                            color: "rgba(255,255,255)",
                            height: "250px",
                        }}
                    />
                ) : (
                    hashtags.map((hashtagObject) => (
                        <Hashtag
                            hashtagObject={hashtagObject}
                            key={hashtagObject.id}
                        />
                    ))
                )}
            </ContentContainer>
            <SearchHashtag />
        </Container>
    );
}

const Container = styled.div`
    width: 300px;
    height: auto;
    margin: 142px 0 0 20px;
    background-color: ${(props) => props.theme.mode.trending.primary};
    border-radius: 15px;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;

    @media (max-width: 1000px) {
        display: none;
    }
`;

const TitleContainer = styled.div`
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
    color: ${(props) => props.theme.mode.font};
    height: 60px;
    padding: 0 15px;
    border-bottom: 1px solid rgba(72, 72, 72, 1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const ContentContainer = styled.div`
    font-family: "Lato", sans-serif;
    font-size: 19px;
    font-weight: 700;
    color: ${(props) => props.theme.mode.hashtag.primary};
    padding: 0 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

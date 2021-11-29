import CircleLoader from "../../components/loaders/CircleLoader";
import {
    PageContainer,
    ContentContainer,
} from "../../components/_shared/PageContainer";
import { PageTitleContainer } from "../../components/_shared/PageTitleContainer";
import Header from "../../components/Header/Header";
import PublishBox from "./PublishBox";
import HashtagBox from "../../components/HashtagBox/HashtagBox";
import WarningParagraph from "../../components/_shared/WarningParagraph";
import {
    FeedPostsContainer,
    forcedPageUpdate,
} from "../../components/_shared/FeedPostsContainer";
import Search from "../../components/Header/Search";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPosts, getFollows } from "../../services/API/requests";
import routes from "../../routes/routes";

export default function Timeline() {
    const { loggedUser } = useContext(UserContext);
    const { pagePosts, setPagePosts } = useContext(PagePostsContext);
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [followingList, setFollowingList] = useState([]);

    function getFollowingList() {
        getFollows({ token: loggedUser.token })
            .then((response) => {
                setFollowingList(response.data.users);
                setLoading(false);
            })
            .catch((error) => {
                alert("Algo deu errado. Por favor, recarregue a página.");
                setLoading(false);
            });
    }

    useEffect(() => {
        if (!loggedUser.token) return history.push(routes.login);

        getFollowingList();
    }, [loggedUser]);

    return (
        <PageContainer>
            {loading ? (
                <CircleLoader customStyle={{ height: "50vh" }} />
            ) : (
                <>
                    <Header />

                    <ContentContainer>
                        <Search className="timeline" />
                        <PageTitleContainer>
                            <h1>timeline</h1>
                        </PageTitleContainer>

                        <PublishBox
                            updateTimeline={() =>
                                forcedPageUpdate({
                                    APIfunction: getPosts,
                                    settings: { token: loggedUser.token },
                                    pagePosts,
                                    setPagePosts,
                                })
                            }
                        />

                        {followingList.length === 0 ? (
                            <WarningParagraph>
                                Você não segue ninguém ainda, procure por perfis
                                na busca
                            </WarningParagraph>
                        ) : null}

                        <FeedPostsContainer APIfunction={getPosts} />
                    </ContentContainer>

                    <HashtagBox />
                </>
            )}
        </PageContainer>
    );
}

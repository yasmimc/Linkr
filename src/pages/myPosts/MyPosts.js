import CircleLoader from "../../components/loaders/CircleLoader";
import Header from "../../components/Header/Header";
import {
    PageContainer,
    ContentContainer,
} from "../../components/_shared/PageContainer";
import { PageTitleContainer } from "../../components/_shared/PageTitleContainer";
import HashtagBox from "../../components/HashtagBox/HashtagBox";
import { getUserPosts } from "../../services/API/requests";
import routes from "../../routes/routes";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FeedPostsContainer } from "../../components/_shared/FeedPostsContainer";

export default function MyPosts({ setPreviousPage }) {
    const { loggedUser } = useContext(UserContext);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPreviousPage(true);
        if (!loggedUser.token) return history.push(routes.login);

        setLoading(false);
    }, [loggedUser]);

    return (
        <PageContainer>
            {loading ? (
                <CircleLoader customStyle={{ height: "50vh" }} />
            ) : (
                <>
                    <Header />

                    <ContentContainer>
                        <PageTitleContainer>
                            <h1>meus posts</h1>
                        </PageTitleContainer>

                        <FeedPostsContainer
                            APIfunction={getUserPosts}
                            settings={{ id: loggedUser.user.id }}
                        />
                    </ContentContainer>

                    <HashtagBox />
                </>
            )}
        </PageContainer>
    );
}

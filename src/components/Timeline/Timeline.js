import CircleLoader from "../loaders/CircleLoader";
import { PageContainer, ContentContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Post from "../_shared/Post";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";
import HashtagBox from "../HashtagBox/HashtagBox";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../API/requests";
import routes from "../../routes/routes";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Timeline() {
	const { loggedUser } = useContext(UserContext);
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [timelinePosts, setTimelinePosts] = useState(null);

	function updateTimeline() {
		if (!loggedUser.token) return history.push(routes.login);

		getPosts(loggedUser)
			.then((resp) => {
				if (resp.data.posts.length === 0)
					alert("Nenhum post encontrado");
				setTimelinePosts(resp.data.posts);
				setLoading(false);
			})
			.catch(() => {
				alert("Houve uma falha ao obter os posts, por favor atualize a página")
				setLoading(false);
			});
	}

	useEffect(() => updateTimeline(), []);

	return (
		<PageContainer>
			{loading ?
				<CircleLoader customStyle={{ height: '50vh' }} />
				:
				<>
					<Header />

					<ContentContainer>
						<PageTitle>
							timeline
						</PageTitle>

						<PublishBox updateTimeline={updateTimeline} />

						{timelinePosts.map(post =>
							<Post postData={post} key={post.id} />
						)}
					</ContentContainer>

					<HashtagBox />
				</>
			}
		</PageContainer>
	);
}
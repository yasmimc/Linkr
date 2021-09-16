import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import routes from "../../routes/routes";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { likePost, dislikePost } from "../../API/requests";

export default function Post({ postData }) {
	const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } = postData;

	const { loggedUser } = useContext(UserContext);

	const [isLiked, setIsLiked] = useState(false);

	const [ likesNumber, setLikesNumber ] = useState(likes.length);

	const likesText = likesNumber > 0 ? (likesNumber > 1 ? `${likesNumber} likes` : `${likesNumber} like`) : ""

	useEffect(() => {
		likes.forEach(like => {
			if(like.userId === loggedUser.user.id)
				setIsLiked(true)
		});
	}, []);

	function clickHeart() {
		if (!isLiked) {
			setIsLiked(true);
			setLikesNumber(likesNumber + 1);
			likePost({likedPost: id, token: loggedUser.token})
				.then((resp)=>console.log(resp.data))
				.catch((err)=>console.log(err.response))
			console.log("likei")
			setLikesNumber(likesNumber + 1);
		}
		else {
			setIsLiked(false)
			setLikesNumber(likesNumber - 1);
			dislikePost({likedPost: id, token: loggedUser.token})
				.then((resp)=>console.log(resp.data))
				.catch((err)=>console.log(err.response))
		}
	}
	return (
		<PostContainer>
			<LeftContainer>
				<Link to={routes.user.replace(":id", user.id)}>
					<ProfilePicture src={user.avatar} alt="profile" />
				</Link>
				<button onClick={clickHeart}>
					{isLiked ? <HeartFilled /> : <HeartOutline />}
				</button>
				<p>{likesText}</p>
			</LeftContainer>
			<RightContainer>
				<Link to={routes.user.replace(":id", user.id)}>
					<h2>{user.username}</h2>
				</Link>

				<p>
					<ReactHashtag
						renderHashtag={(hashtagValue) => (
							<Link
								to={routes.trending.replace(":HASHTAG", hashtagValue.slice(1))}
							>
								{hashtagValue}
							</Link>
						)}
					>
						{text}
					</ReactHashtag>
				</p>
				<a href={link} target="_blank" rel="noreferrer">
					<PreviewContainer>
						<DetailsContainer>
							<div>
								<h1>{linkTitle} </h1>
								<p>{linkDescription}</p>
							</div>
							<div className="link-container">

								{link}

							</div>
						</DetailsContainer>
						{linkImage ? (
							<PostImage src={linkImage} />
						) : (
							<LogoContainer>
								{" "}
								<Logo>linkr</Logo>
							</LogoContainer>
						)}
					</PreviewContainer></a>
			</RightContainer>
		</PostContainer>
	);
}

const PostContainer = styled.div`
	width: 100%;
	background-color: #171717;
	border-radius: 16px;
	padding: 20px 20px 20px 0;
	display: flex;
	margin-bottom: 15px;

	button {
		background: none;
		border: none;
	}

	@media (max-width: 611px) {
		border-radius: 0px;
	}
`;

const LeftContainer = styled.div`
	height: 100%;
	width: 15%;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		font-size: 11px;
		color: #fff;
	}

	@media (max-width: 611px) {
		p {
			font-size: 9px;
		}
	}
`;

const ProfilePicture = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-bottom: 15px;

	@media (max-width: 611px) {
		height: 40px;
		width: 40px;
	}
`;

const HeartOutline = styled(AiOutlineHeart)`
	width: 23px;
	height: 23px;
	color: #fff;
	margin-bottom: 3px;

	@media (max-width: 611px) {
		width: 17px;
		height: 17px;
	}
`;

const HeartFilled = styled(AiFillHeart)`
	width: 23px;
	height: 23px;
	color: #fff;
	margin-bottom: 3px;

	@media (max-width: 611px) {
		width: 17px;
		height: 17px;
	}
`;

const RightContainer = styled.div`
	height: 100%;
	width: 83%;

	a {
		color: rgb(210, 220, 220);
		text-decoration: none;
		margin-bottom: 10px;
		cursor: pointer;

		:hover {
			color: rgb(255, 255, 255);
		}
	}

	h2 {
		font-size: 19px;
		color: #fff;
		margin-bottom: 12px;
	}

	> p {
		font-size: 17px;
		color: #aaaaaa;
		line-height: 18px;
		margin-bottom: 15px;
	}

	@media (max-width: 611px) {
		width: calc(100% - 30px);

		h2 {
			font-size: 17px;
			margin-left: 5px;
		}

		p {
			font-size: 15px;
			margin-left: 5px;
		}
	}
`;

const PreviewContainer = styled.div`
	max-width: 503px;
	display: flex;
	justify-content: space-between;
`;

const PostImage = styled.img`
	height: 155px;
	width: 153px;
	border-radius: 0 11px 11px 0;

	@media (max-width: 611px) {
		height: 115px;
		width: 95px;
	}
`;

const DetailsContainer = styled.div`
	height: 155px;
	border: 1px solid #c4c4c4;
	border-right: none;
	border-radius: 11px 0 0 11px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1 1 auto;
	overflow-y: hidden;

	h1 {
		font-size: 16px;
		color: #cecece;
		margin-bottom: 8px;
	}

	p {
		font-size: 11px;
		color: #aaaaaa;
		margin: 10px 0;
	}

	.link-container {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #cecece;
		font-size: 9px;
	}

	a {
		text-decoration: none;
		font-size: 11px;
		color: #cecece;
	}

	@media (max-width: 611px) {
		width: calc(100% - 115px);
		height: 115px;
		padding: 10px;

		h1 {
			font-size: 11px;
		}

		p {
			font-size: 9px;
		}

		a {
			font-size: 9px;
		}
	}
`;

const LogoContainer = styled.div`
	height: 155px;
	width: 153px;
	border-radius: 0 11px 11px 0;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 611px) {
		height: 115px;
		width: 95px;
	}
`;

const Logo = styled.div`
	font-family: "Passion One", cursive;
	font-size: 35px;
	font-weight: 700;
	color: #000;
`;

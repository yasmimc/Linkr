import { useContext, useEffect, useState, useRef } from "react";
import autosize from "autosize";
import { IoLocationSharp } from "react-icons/io5";
import getYouTubeID from "get-youtube-id";

import {
    Container,
    RepostContainer,
    PostContainer,
    LeftContainer,
    UserContainer,
    RightContainer,
    InputEditText,
    UserNameContainer,
} from "../Post/PostStyles";
import ButtonsContainer from "../_shared/buttons/ButtonsContainer";
import UserAvatar from "../_shared/UserAvatar";
import { MdDelete } from "react-icons/md";

import Username from "../_shared/Username";
import ActionButton from "../_shared/buttons/ActionButton";
import { BiRepost } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

import { EmbeddedVideo, FormattedVideoURL } from "./EmbeddedVideo";
import Snippet from "./Snippet";
import Like from "./Like";
import PostText from "./PostText";

import { edit } from "../../services/API/requests";
import UserContext from "../../contexts/UserContext";
import PagePostsContext from "../../contexts/PagePostsContext";
import MapModal from "./MapModal";
import Repost from "./Repost";
import CommentSession from "./CommentSession";
import Comments from "./Comments";

export default function Post({ postData, forcedPageUpdate = null }) {
    const {
        id,
        text,
        link,
        linkTitle,
        linkDescription,
        linkImage,
        user,
        likes,
        geolocation,
        repostCount,
        repostId,
        repostedBy,
        commentCount,
    } = postData;

    const { loggedUser } = useContext(UserContext);
    const { setDeletingPostId } = useContext(PagePostsContext);

    const [isEditing, setEdit] = useState(false);
    const inputRef = useRef();
    const [postText, setPostText] = useState(text);
    const [editText, setEditText] = useState(text);
    const [loading, setLoading] = useState(false);
    const [openCommentSession, setOpenCommentSession] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [youtubeVideoId] = useState(getYouTubeID(link));

    const [isMapModelOpen, setIsMapModalOpen] = useState(false);
    const [commentsNumber, setCommentsNumber] = useState(commentCount);

    const isRepost = !!repostedBy;

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
            autosize(inputRef.current);
        }
    }, [isEditing]);

    function editPost() {
        if (!isEditing) {
            setEdit(true);
            return;
        }

        setEditText(postText);
        setEdit(false);
    }

    function submitEdit() {
        setLoading(true);
        edit({ text: editText, id, token: loggedUser.token })
            .then((response) => {
                setPostText(response.data.post.text);
                setEdit(false);
                setLoading(false);
            })
            .catch(() => {
                alert("Não foi possível salvar as alterações.");
                setLoading(false);
            });
    }

    function handleKeys(e) {
        if (e.key === "Enter" && !loading) {
            e.preventDefault();

            if (e.repeat) {
                return;
            }
            submitEdit();
        }

        if (e.key === "Escape") {
            setEditText(postText);
            editPost();
        }
    }

    return (
        <Container>
            {isRepost && (
                <RepostContainer isRepost={isRepost}>
                    <BiRepost className="repost" />
                    <p>
                        {"Repostado por "}
                        <Username
                            user={repostedBy}
                            canBeYou={true}
                            fontSize="11px"
                        />
                    </p>
                </RepostContainer>
            )}

            <PostContainer>
                <LeftContainer>
                    <UserAvatar user={user} alt="profile" />

                    <Like likes={likes} postId={id} loggedUser={loggedUser} />
                    <Comments
                        openCommentSession={openCommentSession}
                        setOpenCommentSession={setOpenCommentSession}
                        commentCount={commentsNumber}
                    />

                    <Repost
                        repostCount={repostCount ? repostCount : 0}
                        repostedBy={repostedBy}
                        postId={id}
                        loggedUser={loggedUser}
                        forcedPageUpdate={forcedPageUpdate}
                    />
                </LeftContainer>

                <RightContainer>
                    <UserContainer>
                        <UserNameContainer>
                            <Username user={user} />
                            {geolocation ? (
                                <>
                                    <IoLocationSharp
                                        onClick={() => setIsMapModalOpen(true)}
                                    />
                                    <MapModal
                                        isOpen={isMapModelOpen}
                                        setIsOpen={setIsMapModalOpen}
                                        username={user.username}
                                        geolocation={geolocation}
                                    />
                                </>
                            ) : (
                                ""
                            )}
                        </UserNameContainer>
                        {loggedUser.user.id === user.id ||
                        (repostedBy && loggedUser.user.id === repostedBy.id) ? (
                            <ButtonsContainer
                                customStyle={{ separationMargin: "0 0 0 5px" }}
                            >
                                {!repostedBy ? (
                                    <ActionButton
                                        disabled={loading}
                                        onClick={() => editPost()}
                                        customStyle={{
                                            fontSize: "20px",
                                            color: (props) =>
                                                props.theme.mode.button,
                                        }}
                                    >
                                        <MdEdit title={"Editar post"} />
                                    </ActionButton>
                                ) : null}
                                <ActionButton
                                    onClick={() =>
                                        setDeletingPostId(
                                            repostId || postData.id
                                        )
                                    }
                                    customStyle={{
                                        fontSize: "20px",
                                        color: (props) =>
                                            props.theme.mode.button,
                                    }}
                                >
                                    <MdDelete title={"Deletar post"} />
                                </ActionButton>
                            </ButtonsContainer>
                        ) : null}
                    </UserContainer>

                    {isEditing ? (
                        <InputEditText
                            value={editText}
                            ref={inputRef}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => handleKeys(e, id)}
                            loading={loading}
                            disabled={loading}
                        />
                    ) : (
                        <PostText postText={postText} />
                    )}

                    {youtubeVideoId ? (
                        <>
                            <EmbeddedVideo videoId={youtubeVideoId} />
                            <FormattedVideoURL>{link}</FormattedVideoURL>
                        </>
                    ) : (
                        <Snippet
                            link={link}
                            linkTitle={linkTitle}
                            linkDescription={linkDescription}
                            linkImage={linkImage}
                        />
                    )}
                </RightContainer>
            </PostContainer>
            {openCommentSession && (
                <CommentSession
                    commentValue={commentValue}
                    setCommentValue={setCommentValue}
                    setCommentsNumber={setCommentsNumber}
                    postId={id}
                    postOwner={user}
                />
            )}
        </Container>
    );
}

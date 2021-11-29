import styled from "styled-components";
import { repost } from "../../services/API/requests";
import { useState } from "react";
import ActionButton from "../_shared/buttons/ActionButton";
import { BiRepost } from "react-icons/bi";
import ConfirmModal from "../modals/ConfirmModal";

export default function Repost({
    repostCount,
    repostedBy,
    postId,
    loggedUser,
    forcedPageUpdate,
}) {
    const [repostTimes, setRepostTimes] = useState(repostCount);
    const [openRepostModal, setOpenRepostModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const isLoggedUserRepost = repostedBy
        ? repostedBy.id === loggedUser.user.id
        : false;
    const [reposted, setReposted] = useState(isLoggedUserRepost);

    function submitRepost() {
        setLoading(true);
        repost({ token: loggedUser.token, postId })
            .then(() => {
                setRepostTimes(() => repostTimes + 1);
                setReposted(true);
                setOpenRepostModal(false);
                forcedPageUpdate();
            })
            .catch((error) => {
                alert("Desculpe, houve um erro. Atualize a pagina.");
                setLoading(false);
            });
    }
    return (
        <>
            <Container reposted={reposted}>
                <ActionButton onClick={() => setOpenRepostModal(true)}>
                    <RepostButton title={"Repostar em meu feed"} />
                </ActionButton>

                <p>
                    {repostTimes} re<span>&#8209;</span>
                    {repostTimes === 1 ? "post" : "posts"}
                </p>
            </Container>
            <ConfirmModal
                isOpen={openRepostModal}
                setIsOpen={setOpenRepostModal}
                loading={loading}
                onConfirm={submitRepost}
                title="Tem certeza quer repostar esse post em seu feed?"
                confirmText="Sim, repostar"
            />
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 10px 0;
    color: ${({ reposted }) => (reposted ? "#00e03f" : "inherit")};

    p {
        font-size: 10px;
        color: ${({ reposted }) => (reposted ? "#00e03f" : "inherit")};
    }

    @media (max-width: 611px) {
        p {
            font-size: 8px;
        }
    }
`;

const RepostButton = styled(BiRepost)`
    border-radius: 50%;

    &:hover {
        background-color: none;
        color: #00e03f;
        box-shadow: 0px 0px 30px rgba(0, 224, 63, 0.35);
    }
`;

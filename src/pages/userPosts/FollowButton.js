import styled from "styled-components";
import CustomButton from "../../components/_shared/buttons/CustomButton";
import UserContext from "../../contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import {
    getFollows,
    followUser,
    unfollowUser,
} from "../../services/API/requests";

export default function FollowButton({ userId }) {
    const { loggedUser } = useContext(UserContext);
    const [following, setFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isFollowing(userId);
    }, [userId]);

    function isFollowing(userId) {
        getFollows({ token: loggedUser.token })
            .then((response) => {
                if (
                    response.data.users.filter(
                        (user) => user.id === Number(userId)
                    ).length > 0
                ) {
                    setFollowing(true);
                }
                setLoading(false);
            })
            .catch((error) =>
                alert("Algo deu errado. Por favor, recarregue a página.")
            );
    }

    function followRequest() {
        setLoading(true);

        followUser({ token: loggedUser.token, userId })
            .then((response) => {
                setFollowing(true);
                setLoading(false);
            })
            .catch((error) => {
                alert("Ocorreu um erro. Por favor, tente novamente.");
                setLoading(false);
            });
    }

    function unfollowRequest() {
        setLoading(true);

        unfollowUser({ token: loggedUser.token, userId })
            .then((response) => {
                setFollowing(false);
                setLoading(false);
            })
            .catch((error) => {
                alert("Ocorreu um erro. Por favor, tente novamente.");
                setLoading(false);
            });
    }

    return (
        <ButtonBase
            following={following}
            onClick={
                loading ? null : following ? unfollowRequest : followRequest
            }
            loading={loading}
        >
            {following ? (
                <p>
                    <span>Seguindo</span>
                </p>
            ) : (
                "Seguir"
            )}
        </ButtonBase>
    );
}

const ButtonBase = styled(CustomButton)`
    font-family: Lato, "sans-serif";
    font-size: 15px;
    width: 80px;
    position: relative;
    left: 320px;
    color: ${(props) => (props.following ? "rgb(24, 119, 242)" : "")};
    background-color: ${(props) =>
        props.following ? "rgb(225, 225, 225)" : ""};

    &:hover span {
        display: none;
    }

    &:hover p:after {
        font-size: 13px;
        content: "Deixar de seguir";
    }

    @media (max-width: 1000px) {
        position: initial;
    }
`;

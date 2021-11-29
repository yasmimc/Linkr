import ReactTooltip from "react-tooltip";
import { likePost, dislikePost } from "../../services/API/requests";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import ActionButton from "../_shared/buttons/ActionButton";

export default function Like({ likes, loggedUser, postId }) {
    const [isLiked, setIsLiked] = useState(false);

    const [likesNumber, setLikesNumber] = useState(likes.length);

    const likesText =
        likesNumber !== 1
            ? `${likesNumber} curtidas`
            : `${likesNumber} curtida`;
    const [tooltip, setTooltip] = useState("");

    useEffect(() => {
        if (likes.find((like) => like.userId === loggedUser.user.id))
            setIsLiked(true);
    }, []);

    useEffect(() => {
        constructTooltip();
    }, [tooltip, isLiked, likesNumber, likesText]);

    function constructTooltip() {
        let tooltipNumber = likesNumber;
        let tmpTooltip = "";

        if (likesNumber === 0) {
            setTooltip("Seja o primeiro a curtir!");
            return;
        }

        if (likesNumber > 0) {
            if (isLiked) {
                tmpTooltip = "Você ";
            } else {
                tmpTooltip = `${likes[0]["user.username"]} `;
            }
            tmpTooltip = moreUsersLiked(tmpTooltip, tooltipNumber);
        }
        setTooltip(tmpTooltip);
    }

    function moreUsersLiked(tmpTooltip, tooltipNumber) {
        let newTooltipNumber = tooltipNumber;

        if (tooltipNumber > 1) {
            if (tooltipNumber === 2) {
                if (isLiked)
                    return `Você e ${likes[0]["user.username"]} curtiram`;
                tmpTooltip =
                    tmpTooltip + `e ${likes[1]["user.username"]} curtiram`;
                return tmpTooltip;
            } else {
                newTooltipNumber = tooltipNumber - 2;
                tmpTooltip = `${tmpTooltip}, ${likes[1]["user.username"]} e mais ${newTooltipNumber} `;
                moreUsersLiked(tmpTooltip, tooltipNumber - 2);
            }
        } else {
            tmpTooltip = tmpTooltip + "curtiu";
            return tmpTooltip;
        }
        if (likes.length !== newTooltipNumber) {
            if (tooltipNumber > 1) tmpTooltip = tmpTooltip + "curtiram";
            return tmpTooltip;
        }
    }

    function clickHeart() {
        setTooltip("");
        constructTooltip();
        if (!isLiked) {
            setIsLiked(true);
            setLikesNumber(likesNumber + 1);
            likePost({ likedPost: postId, token: loggedUser.token });
            setLikesNumber(likesNumber + 1);
        } else {
            setIsLiked(false);
            setLikesNumber(likesNumber - 1);
            dislikePost({ likedPost: postId, token: loggedUser.token });
        }
    }

    return (
        <LikeContainer>
            <ActionButton onClick={clickHeart}>
                {isLiked ? (
                    <HeartFilled title="Retirar curtida" />
                ) : (
                    <HeartOutline title="Curtir post" />
                )}
            </ActionButton>
            <p data-tip={tooltip}>{likesText}</p>
            <ReactTooltip />
        </LikeContainer>
    );
}

const LikeContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 10px;
    p {
        font-size: 10px;
    }

    @media (max-width: 611px) {
        p {
            font-size: 8px;
        }
    }
`;

const HeartOutline = styled(AiOutlineHeart)`
    width: 23px;
    height: 23px;
    margin-bottom: 3px;
    border-radius: 50%;

    &:hover {
        background-color: none;
        color: red;
        box-shadow: 0px 0px 30px rgba(255, 0, 0, 0.35);
    }

    @media (max-width: 611px) {
        width: 17px;
        height: 17px;
    }
`;

const HeartFilled = styled(AiFillHeart)`
    width: 23px;
    height: 23px;
    color: red;
    margin-bottom: 3px;

    @media (max-width: 611px) {
        width: 17px;
        height: 17px;
    }
`;

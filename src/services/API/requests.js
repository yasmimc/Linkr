import axiosBase from "./axiosBase";

function createBearerAuthorization(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

function login({ email, password }) {
    return axiosBase.post("/sign-in", { email, password });
}

function signUp({ email, password, username, pictureUrl }) {
    return axiosBase.post("/sign-up", {
        email,
        password,
        username,
        pictureUrl,
    });
}

function post({ token }, data) {
    return axiosBase.post("/posts", data, createBearerAuthorization(token));
}

function edit({ id, text, token }) {
    return axiosBase.put(
        `/posts/${id}`,
        { text: text },
        createBearerAuthorization(token)
    );
}

function getPosts({ token, lastPostId }) {
    if (lastPostId)
        return axiosBase.get(
            `/following/posts?olderThan=${lastPostId}`,
            createBearerAuthorization(token)
        );
    return axiosBase.get("/following/posts", createBearerAuthorization(token));
}

function getLikedPosts({ token, lastPostId }) {
    if (lastPostId)
        return axiosBase.get(
            `/posts/liked?olderThan=${lastPostId}`,
            createBearerAuthorization(token)
        );
    return axiosBase.get("/posts/liked", createBearerAuthorization(token));
}

function getUserPosts({ id, token, lastPostId }) {
    if (lastPostId)
        return axiosBase.get(
            `/users/${id}/posts?olderThan=${lastPostId}`,
            createBearerAuthorization(token)
        );
    return axiosBase.get(
        `/users/${id}/posts`,
        createBearerAuthorization(token)
    );
}

function getTrendingTopics({ token }) {
    return axiosBase.get(
        "/hashtags/trending",
        createBearerAuthorization(token)
    );
}

function getUserData({ id, token }) {
    return axiosBase.get(`/users/${id}`, createBearerAuthorization(token));
}

function getTrendingPosts({ topic, token, lastPostId }) {
    if (lastPostId)
        return axiosBase.get(
            `/hashtags/${topic}/posts?olderThan=${lastPostId}`,
            createBearerAuthorization(token)
        );
    return axiosBase.get(
        `/hashtags/${topic}/posts`,
        createBearerAuthorization(token)
    );
}

function likePost({ likedPost, token }) {
    return axiosBase.post(
        `/posts/${likedPost}/like`,
        "",
        createBearerAuthorization(token)
    );
}

function dislikePost({ likedPost, token }) {
    return axiosBase.post(
        `/posts/${likedPost}/dislike`,
        "",
        createBearerAuthorization(token)
    );
}

function getFollows({ token }) {
    return axiosBase.get(`/users/follows`, createBearerAuthorization(token));
}

function deletePost({ postId, token }) {
    return axiosBase.delete(
        `/posts/${postId}`,
        createBearerAuthorization(token)
    );
}

function followUser({ token, userId }) {
    return axiosBase.post(
        `/users/${userId}/follow`,
        "",
        createBearerAuthorization(token)
    );
}

function unfollowUser({ token, userId }) {
    return axiosBase.post(
        `/users/${userId}/unfollow`,
        "",
        createBearerAuthorization(token)
    );
}

function getSearchedUsers({ token, username }) {
    return axiosBase.get(
        `/users/search?username=${username}`,
        createBearerAuthorization(token)
    );
}

function repost({ token, postId }) {
    return axiosBase.post(
        `/posts/${postId}/share`,
        "",
        createBearerAuthorization(token)
    );
}

function getPostComments({ token, postId }) {
    return axiosBase.get(
        `/posts/${postId}/comments`,
        createBearerAuthorization(token)
    );
}

function comment({ token, text, postId }) {
    return axiosBase.post(
        `/posts/${postId}/comment`,
        { text: text },
        createBearerAuthorization(token)
    );
}

export {
    login,
    signUp,
    post,
    getPosts,
    getLikedPosts,
    getUserPosts,
    getTrendingTopics,
    getUserData,
    getTrendingPosts,
    likePost,
    dislikePost,
    getFollows,
    edit,
    deletePost,
    followUser,
    unfollowUser,
    getSearchedUsers,
    repost,
    getPostComments,
    comment,
};

import { deletePost } from "../../services/API/requests";
import PagePostsContext from "../../contexts/PagePostsContext";
import UserContext from "../../contexts/UserContext";
import { useState, useContext } from "react";
import ConfirmModal from "./ConfirmModal";

export default function DeletingPostModal() {
    const { loggedUser } = useContext(UserContext);
    const { pagePosts, setPagePosts, deletingPostId, setDeletingPostId } =
        useContext(PagePostsContext);
    const [loading, setLoading] = useState(false);

    function deletePostOnServer() {
        setLoading(true);

        deletePost({ postId: deletingPostId, token: loggedUser.token })
            .then(() => {
                setPagePosts(
                    pagePosts.filter(
                        (post) =>
                            post.repostId !== deletingPostId &&
                            post.id !== deletingPostId
                    )
                );
                setDeletingPostId(false);
                setLoading(false);
            })
            .catch((error) => {
                setDeletingPostId(false);
                setLoading(false);
                alert(
                    "Não foi possível deletar o post. Por favor, tente de novo."
                );
            });
    }

    return (
        <ConfirmModal
            isOpen={!!deletingPostId}
            setIsOpen={setDeletingPostId}
            onRequestClose={() => setDeletingPostId(false)}
            title={"Tem certeza que deseja excluir essa publicação?"}
            confirmText={"Sim, excluir"}
            onCancel={() => setDeletingPostId(false)}
            onConfirm={deletePostOnServer}
            loading={loading}
        />
    );
}

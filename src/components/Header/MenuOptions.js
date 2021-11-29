import styled from "styled-components";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";
import { useState } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import ThemePreferencesModal from "../modals/ThemePreferencesModal";

export default function MenuOptions({ menuOpened }) {
    const history = useHistory();

    function logout() {
        localStorage.removeItem("linkrUser");
        history.push(routes.login);
    }

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showThemeModal, setShowThemeModal] = useState(false);

    return (
        <Container menuOpened={menuOpened}>
            <span onClick={() => history.push(routes.myPosts)}>Meus Post</span>
            <span onClick={() => history.push(routes.likes)}>
                Minhas Curtidas
            </span>

            <span onClick={() => setShowThemeModal(true)}>Preferências</span>

            <span onClick={() => setShowLogoutModal(true)}>Logout</span>

            <ThemePreferencesModal
                isOpen={showThemeModal}
                setIsOpen={setShowThemeModal}
            />
            <ConfirmModal
                isOpen={showLogoutModal}
                setIsOpen={setShowLogoutModal}
                title={"Tem certeza que deseja sair?"}
                onConfirm={logout}
                confirmText={"Sim, fazer logout"}
            />
        </Container>
    );
}

const Container = styled.div`
    width: 175px;
    padding: 0 10px 10px;
    background-color: ${(props) => props.theme.mode.header.background};
    border-bottom-left-radius: 10px;
    position: fixed;
    top: ${({ menuOpened }) => (menuOpened ? "70px" : "-30vh")};
    right: -1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: top 0.5s ease;

    span {
        font-family: "Lato", sans-serif;
        font-weight: 700;
        font-size: 20px;
        color: ${(props) => props.theme.mode.font};
        margin-top: 10px;
        cursor: pointer;
    }
`;

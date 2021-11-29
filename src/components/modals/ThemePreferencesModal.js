import AlertModal from "../Modal/Modal";
import ModalTitle from "../Modal/ModalTitle";

import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import styled, { ThemeContext } from "styled-components";

import { darkTheme, lightTheme } from "../App/globalStyles";
import CustomButton from "../_shared/buttons/CustomButton";
import {
    getUserFromLocalStorage,
    setLocalStorage,
} from "../../helpers/localStorage";

import { AiOutlineClose } from "react-icons/ai";

export default function ThemePreferencesModal({ isOpen, setIsOpen }) {
    const { setTheme } = useContext(UserContext);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        const localStorage = getUserFromLocalStorage();
        setTheme({
            mode: localStorage?.theme?.mode === "dark" ? darkTheme : lightTheme,
            color: localStorage?.theme?.color,
        });
    }, []);

    return (
        <AlertModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            <ModalTitle>Personalize sua exibição</ModalTitle>
            <Container>
                <h1> Plano de fundo: </h1>

                <OptionsContainer>
                    <Mode
                        value="black"
                        onClick={() => {
                            setTheme({ ...theme, mode: darkTheme });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: { mode: "dark", color: theme.color },
                            });
                        }}
                        children="Escuro"
                    />
                    <Mode
                        value="white"
                        onClick={() => {
                            setTheme({ ...theme, mode: lightTheme });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: { mode: "light", color: theme.color },
                            });
                        }}
                        children="Claro"
                    />
                </OptionsContainer>

                <h1> Cor: </h1>

                <OptionsContainer>
                    <Color
                        children={<AiOutlineClose />}
                        value="white"
                        onClick={() => {
                            setTheme({
                                ...theme,
                                color: "",
                            });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: {
                                    mode:
                                        theme.mode === darkTheme
                                            ? "dark"
                                            : "ligth",
                                    color: "",
                                },
                            });
                        }}
                    />
                    <Color
                        value="orange"
                        onClick={() => {
                            setTheme({
                                ...theme,
                                color: "orange",
                            });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: {
                                    mode:
                                        theme.mode === darkTheme
                                            ? "dark"
                                            : "ligth",
                                    color: "orange",
                                },
                            });
                        }}
                    />
                    <Color
                        value="red"
                        onClick={() => {
                            setTheme({
                                ...theme,
                                color: "red",
                            });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: {
                                    mode:
                                        theme.mode === darkTheme
                                            ? "dark"
                                            : "ligth",
                                    color: "red",
                                },
                            });
                        }}
                    />
                    <Color
                        value="purple"
                        onClick={() => {
                            setTheme({
                                ...theme,
                                color: "purple",
                            });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: {
                                    mode:
                                        theme.mode === darkTheme
                                            ? "dark"
                                            : "ligth",
                                    color: "purple",
                                },
                            });
                        }}
                    />
                    <Color
                        value="CornflowerBlue"
                        onClick={() => {
                            setTheme({
                                ...theme,
                                color: "CornflowerBlue",
                            });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: {
                                    mode:
                                        theme.mode === darkTheme
                                            ? "dark"
                                            : "ligth",
                                    color: "CornflowerBlue",
                                },
                            });
                        }}
                    />
                    <Color
                        value="green"
                        onClick={() => {
                            setTheme({
                                ...theme,
                                color: "green",
                            });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: {
                                    mode:
                                        theme.mode === darkTheme
                                            ? "dark"
                                            : "ligth",
                                    color: "green",
                                },
                            });
                        }}
                    />
                    <Color
                        value="Crimson"
                        onClick={() => {
                            setTheme({
                                ...theme,
                                color: "Crimson",
                            });
                            setLocalStorage({
                                ...getUserFromLocalStorage(),
                                theme: {
                                    mode:
                                        theme.mode === darkTheme
                                            ? "dark"
                                            : "ligth",
                                    color: "Crimson",
                                },
                            });
                        }}
                    />
                </OptionsContainer>
            </Container>
            <CloseButton
                children="Concluído"
                onClick={() => setIsOpen(false)}
            />
        </AlertModal>
    );
}

const Container = styled.div`
    width: 100%;
    font-family: "Lato", sans-serif;
    color: white;

    h1 {
        margin: 10px 0;
    }
`;

const OptionsContainer = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.mode.modal.secondary};
    padding: 20px 10px;
    border-radius: 10px;
    justify-content: space-around;
`;

const Color = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #191919;
    font-size: 40px;

    width: 62px;
    height: 62px;
    background-color: ${(props) => props.value};
    border-radius: 50%;
`;

const Mode = styled.div`
    border-radius: 5px;

    width: 50%;
    margin: 0 10px;
    height: 62px;
    background-color: ${(props) => props.value};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => (props.value === "white" ? "black" : "white")};
`;

const CloseButton = styled(CustomButton)`
    margin-top: 30px;
    font-family: Lato, "sans-serif";
    width: 30%;
`;

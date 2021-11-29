import styled from "styled-components";
import Modal from "../Modal/Modal";
import ModalTitle from "../Modal/ModalTitle";
import ButtonsContainer from "../_shared/buttons/ButtonsContainer";
import CustomButton from "../_shared/buttons/CustomButton";

export default function ConfirmModal({
    isOpen,
    setIsOpen,
    loading,
    onConfirm,
    onCancel,
    title,
    confirmText,
    cancelText,
}) {
    function handleKeys(e) {
        if (e.key === "Enter") {
            e.preventDefault();

            if (e.repeat) {
                return;
            }
            onConfirm();
        }
    }

    return (
        <ModalContainer
            type="confirm"
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            <Title>{title}</Title>

            <ButtonsContainer
                customStyle={{
                    width: "100%",
                    separationMargin: "45px 10px 15px",
                }}
            >
                <CancelButton
                    loading={loading}
                    onClick={
                        loading
                            ? null
                            : () => {
                                  setIsOpen(false);
                                  if (onCancel) onCancel();
                              }
                    }
                >
                    {cancelText ? cancelText : "Não, voltar"}
                </CancelButton>

                <ConfirmButton
                    type="submit"
                    loading={loading}
                    onClick={() => {
                        setIsOpen(false);
                        onConfirm();
                    }}
                    onKeyDown={handleKeys}
                >
                    {confirmText ? confirmText : "Sim, confirmar"}
                </ConfirmButton>
            </ButtonsContainer>
        </ModalContainer>
    );
}

const CancelButton = styled(CustomButton)`
    background-color: rgb(225, 225, 225);
    color: ${(props) => props.theme.mode.font};
    @media (max-width: 400px) {
        font-size: 15px;
    }
`;

const ConfirmButton = styled(CustomButton)`
    @media (max-width: 400px) {
        font-size: 15px;
    }
`;

const ModalContainer = styled(Modal)`
    div {
        border-radius: 50px;
    }
`;

const Title = styled(ModalTitle)`
    padding: 0 30px;
    text-align: center;

    @media (max-width: 611px) {
        font-size: 26px;
    }
`;

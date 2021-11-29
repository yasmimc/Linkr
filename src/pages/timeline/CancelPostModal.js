import ConfirmModal from "../../components/modals/ConfirmModal";

export default function CancelPostModal({ isOpen, setIsOpen, clearForm }) {
    return (
        <ConfirmModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onRequestClose={() => setIsOpen(false)}
            title={"Tem certeza de que quer descartar esse post?"}
            onConfirm={clearForm}
        ></ConfirmModal>
    );
}

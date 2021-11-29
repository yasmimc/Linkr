import HomeContainer from "../../components/_shared/HomeContainer";
import CircleLoader from "../../components/loaders/CircleLoader";
import Cover from "../../components/_shared/Cover";
import ContentContainer from "../../components/_shared/ContentContainer";
import { CustomForm, CustomInput } from "../../components/_shared/Inputs";
import CustomButton from "../../components/_shared/buttons/CustomButton";
import CustomLink from "../../components/_shared/CustomLink";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { login } from "../../services/API/requests";
import statusCode from "../../services/API/statusCode";
import routes from "../../routes/routes";

export default function Login({ previousPage }) {
    const history = useHistory();
    const { setLoggedUser } = useContext(UserContext);

    const [firstLoad, setFirsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [inputsValues, setInputsValues] = useState([
        { field: "email", value: "", type: "email", placeholder: "e-mail" },
        {
            field: "password",
            value: "",
            type: "password",
            placeholder: "senha",
        },
    ]);

    useEffect(() => {
        const localStorageUser = getUserFromLocalStorage();

        if (!localStorageUser) return setFirsLoading(false);

        setLoggedUser(localStorageUser);
        if (previousPage) return history.goBack();
        history.push(routes.timeline);
    }, []);

    function getUserFromLocalStorage() {
        return JSON.parse(localStorage.getItem("linkrUser"));
    }

    function setLocalStorage(value) {
        localStorage.setItem("linkrUser", JSON.stringify(value));
    }

    function getInputValue(field) {
        const input = inputsValues.filter((input) => input.field === field)[0];
        return input.value;
    }

    function loginSubmit(event) {
        event.preventDefault();

        if (loading) return;

        setLoading(true);

        login({
            email: getInputValue("email"),
            password: getInputValue("password"),
        })
            .then((response) => {
                setLoading(false);
                setLoggedUser(response.data);
                setLocalStorage(response.data);
                history.push(routes.timeline);
            })
            .catch((err) => {
                if (err.response.status === statusCode.wrongUserOrPassword) {
                    setLoading(false);
                    alert("Email e/ou senha inválidos.");
                    return;
                }
                setLoading(false);
                alert(
                    "Houve um erro ao fazer login. Por favor, tente novamente."
                );
            });
    }

    function inputValueRecorder(index, input, newValue) {
        inputsValues[index] = { ...input, value: newValue };
        setInputsValues([...inputsValues]);
    }

    return (
        <HomeContainer>
            {firstLoad ? (
                <CircleLoader customStyle={{ height: "100%" }} />
            ) : (
                <>
                    <Cover />

                    <ContentContainer>
                        <CustomForm onSubmit={loginSubmit}>
                            {inputsValues.map((input, index) => (
                                <CustomInput
                                    value={input.value}
                                    onChange={
                                        loading
                                            ? null
                                            : (event) =>
                                                  inputValueRecorder(
                                                      index,
                                                      input,
                                                      event.target.value
                                                  )
                                    }
                                    placeholder={input.placeholder}
                                    type={input.type}
                                    customStyle={{ loading }}
                                    required
                                    key={index}
                                />
                            ))}

                            <CustomButton loading={loading} type="submit">
                                Entrar
                            </CustomButton>
                        </CustomForm>

                        <CustomLink
                            loading={loading}
                            onClick={
                                loading
                                    ? null
                                    : () => history.push(routes.signUp)
                            }
                        >
                            Primeira vez? Crie uma conta!
                        </CustomLink>
                    </ContentContainer>
                </>
            )}
        </HomeContainer>
    );
}

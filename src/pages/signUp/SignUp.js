import HomeContainer from "../../components/_shared/HomeContainer";
import Cover from "../../components/_shared/Cover";
import ContentContainer from "../../components/_shared/ContentContainer";
import { CustomForm, CustomInput } from "../../components/_shared/Inputs";
import CustomButton from "../../components/_shared/buttons/CustomButton";
import CustomLink from "../../components/_shared/CustomLink";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { signUp } from "../../services/API/requests";
import statusCode from "../../services/API/statusCode";
import routes from "../../routes/routes";

export default function SignUp() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [inputsValues, setInputsValues] = useState([
        { field: "email", value: "", type: "email", placeholder: "e-mail" },
        {
            field: "password",
            value: "",
            type: "password",
            placeholder: "senha",
        },
        {
            field: "username",
            value: "",
            type: "text",
            placeholder: "nome de usuário",
        },
        {
            field: "pictureUrl",
            value: "",
            type: "url",
            placeholder: "URL da imagem de perfil",
        },
    ]);

    function getInputValue(field) {
        const input = inputsValues.filter((input) => input.field === field)[0];
        return input.value;
    }

    function signUpSubmit(event) {
        event.preventDefault();

        if (loading) return;

        setLoading(true);

        signUp({
            email: getInputValue("email"),
            password: getInputValue("password"),
            username: getInputValue("username"),
            pictureUrl: getInputValue("pictureUrl"),
        })
            .then((response) => {
                setLoading(false);
                history.push(routes.login);
            })
            .catch((err) => {
                if (err.response.status === statusCode.invalidField) {
                    setLoading(false);
                    alert("Por favor, preencha todos os campos corretamente.");
                    return;
                }
                if (err.response.status === statusCode.alreadyExists) {
                    setLoading(false);
                    alert("Este usuário já existe.");
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
            <Cover />

            <ContentContainer>
                <CustomForm onSubmit={signUpSubmit}>
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
                        Cadastrar
                    </CustomButton>
                </CustomForm>

                <CustomLink
                    loading={loading}
                    onClick={loading ? null : () => history.push(routes.login)}
                >
                    Voltar para login
                </CustomLink>
            </ContentContainer>
        </HomeContainer>
    );
}

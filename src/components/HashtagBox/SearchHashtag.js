import { useState } from "react";
import { CustomInput } from "../_shared/Inputs";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";
import styled from "styled-components";

export default function SearchHashtag() {
    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();

    function submitSearch(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            history.push(routes.trending.replace(":HASHTAG", searchValue));
            setSearchValue("");
        }
    }

    return (
        <Container>
            #
            <Input
                type="search"
                customStyle={{ loading: false }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => submitSearch(e)}
                placeholder="digite uma hashtag"
            />
        </Container>
    );
}

const Container = styled.div`
    width: 270px;
    height: 35px;
    background-color: ${(props) => props.theme.mode.hashtag.input};
    border-radius: 5px;
    color: ${(props) => props.theme.mode.font};
    margin: 5px auto 15px;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
`;

const Input = styled(CustomInput)`
    font-family: Lato, sans-serif;
    font-size: 16px;
    width: 250px;
    background-color: transparent;
    outline: none;
    border: none;

    :focus {
        color: ${(props) => props.theme.mode.font};
    }

    ::placeholder {
        font-style: italic;
    }
`;

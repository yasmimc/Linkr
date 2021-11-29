import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { CustomInput } from "../_shared/Inputs";
import { DebounceInput } from "react-debounce-input";
import { getSearchedUsers } from "../../services/API/requests";
import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";
import UserAvatar from "../_shared/UserAvatar";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";

function UserFound({ user }) {
    return (
        <UserContainer>
            <UserAvatar
                user={user}
                customStyle={{ height: "40px", width: "40px" }}
            />
            <h2>{user.username}</h2>
            {user.isFollowingLoggedUser && <p>• following</p>}
        </UserContainer>
    );
}

export default function Search({ className }) {
    const { loggedUser } = useContext(UserContext);
    const [usersList, setUsersList] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    function searchUsers(e) {
        if (e.key === "Escape") return;

        let value = e.target.value;
        setSearchValue(value);

        if (value.length > 2) {
            getSearchedUsers({
                username: value,
                token: loggedUser.token,
            })
                .then((response) => {
                    setUsersList(response.data.users.sort(comparator));
                    setShowResults(true);
                })
                .catch((error) =>
                    alert(
                        "Houve um erro ao pesquisar os usuários. Por favor, tente novamente."
                    )
                );

            return;
        }

        setShowResults(false);
    }

    //puts users being followed first on the list
    function comparator(a) {
        return a.isFollowingLoggedUser ? -1 : 1;
    }

    function clearSearch() {
        setShowResults(false);
        setSearchValue("");
    }

    return (
        <Container className={className} showResults={showResults}>
            <SearchContainer>
                <DebounceInput
                    type="search"
                    element={SearchInput}
                    customStyle={{
                        loading: false,
                    }}
                    placeholder="Procure por pessoas e amigos"
                    minLength={3}
                    debounceTimeout={300}
                    value={searchValue}
                    onChange={(e) => searchUsers(e)}
                />

                <AiOutlineSearch
                    color="#C6C6C6"
                    title={"Search"}
                    fontSize="28px"
                />
            </SearchContainer>
            <ResultsContainer showResults={showResults}>
                {usersList.length > 0 ? (
                    usersList.map((user, index) => (
                        <Link
                            to={routes.user.replace(":id", user.id)}
                            onClick={clearSearch}
                        >
                            <UserFound user={user} key={index} />
                        </Link>
                    ))
                ) : (
                    <h3>Ops, não achamos nada com essas informações ;)</h3>
                )}
            </ResultsContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 43%;
    height: 45px;
    background-color: ${({ showResults }) =>
        showResults ? "#e7e7e7" : "transparent"};
    border-radius: 8px 8px 0 0;
    z-index: 1;
    padding-bottom: 15px;

    a {
        text-decoration: none;
    }

    &.timeline {
        display: none;
        width: 100%;
    }

    @media (max-width: 611px) {
        &.header {
            display: none;
        }

        &.timeline {
            display: initial;
            margin-top: 10px;
        }
    }
`;

const SearchContainer = styled.div`
    /* width */
    ::-webkit-scrollbar {
        width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: red;
        border-radius: 10px;
    }
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    border-radius: 8px;
    padding: 0 5px;

    input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
`;

const SearchInput = styled(CustomInput)`
    font-family: "Lato", sans-serif;
    background-color: transparent;
    border: none;
    font-size: 17px;
    width: 90%;
`;

const ResultsContainer = styled.div`
    display: ${({ showResults }) => (showResults ? "inherit" : "none")};
    background-color: #e7e7e7;
    width: 100%;
    bottom: 5px;
    border-radius: 0 0 8px 8px;
    overflow-y: scroll;
    max-height: 200px;
    z-index: 3;

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 10px;
    }

    h3 {
        font-family: "Lato", sans-serif;
        font-size: 19px;
        color: #1c1919;
        margin: 20px;
        font-weight: bold;
    }

    @media (max-width: 600px) {
        h3 {
            font-size: 17px;
        }
    }
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 3px 5px;
    font-family: "Lato", sans-serif;
    color: #515151;

    h2 {
        margin: 0 3px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    p {
        color: #c5c5c5;
        font-style: italic;
        font-size: 13px;
    }
`;

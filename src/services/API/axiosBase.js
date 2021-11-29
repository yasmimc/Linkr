import axios from "axios";

const axiosBase = axios.create({
    baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr",
});

export default axiosBase;

import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.111.92:3000", // Backend base URL
});

export default api;

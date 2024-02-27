import axios from "axios";

export const scrapApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_SCRAPS_URL
});
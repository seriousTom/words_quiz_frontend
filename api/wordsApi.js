import axiosClient from "./axiosClient";

export const wordsApi = {
    list(baseLanguage = 'en', perPage = 50) {
        return axiosClient.get(`/words?language=${baseLanguage}&per_page=${perPage}`);
    }
};
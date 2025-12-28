import axiosClient from "./axiosClient";

export const wordsApi = {
    list(baseLanguage = 'en', perPage = 50) {
        const params = new URLSearchParams({ language: baseLanguage });

        if (perPage) {
            params.append('per_page', perPage);
        }

        return axiosClient.get(`/words?${params.toString()}`);
    },
    logGuesses(language = 'es', data) {
        return axiosClient.post('/words/log-guesses', {logs: data[language]});
    }
};

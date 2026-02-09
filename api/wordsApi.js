import axiosClient from "./axiosClient";

export const wordsApi = {
    list(language = 'es', perPage = 50) {
        const params = new URLSearchParams({ language: language });

        if (perPage) {
            params.append('per_page', perPage);
        }

        return axiosClient.get(`/words?${params.toString()}`);
    },
    //params: game_type, word_display, number_of_words_langage
    getGameWords(params = {}) {

        return axiosClient.get('/words/get-game-words', {params: params});
    },
    logGuesses(language = 'es', data) {
        return axiosClient.post('/words/log-guesses', {logs: data[language]});
    }
};

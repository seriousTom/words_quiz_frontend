import axiosClient from "./axiosClient";

export const wordsApi = {
    list(language = 'es', perPage = 50) {
        const params = new URLSearchParams({ language: language });

        if (perPage) {
            params.append('per_page', perPage);
        }

        return axiosClient.get(`/words?${params.toString()}`);
    },
    getGameWords(language = 'es', gameType, perPage = 50) {
        const params = new URLSearchParams({ language: language, game_type: gameType });

        if (perPage) {
            params.append('per_page', perPage);
        }

        return axiosClient.get(`/words/get-game-words?${params.toString()}`);
    },
    logGuesses(language = 'es', data) {
        return axiosClient.post('/words/log-guesses', {logs: data[language]});
    }
};

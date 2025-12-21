import axiosClient from "./axiosClient";

export const authApi = {
    login(email, password) {
        return axiosClient.post("/login", { email, password });
    },
    register(data) {
        return axiosClient.post("/register", data);
    }
};
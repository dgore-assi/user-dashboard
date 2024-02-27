import { BASE_API } from "../shared/constant/environment"
import axiosInstance from "./axios";
// import axios from "./axios";



export const getCurrentUserData = () => {
    const url = `${BASE_API}auth/currentUser`;
    return axiosInstance.get(url);
}
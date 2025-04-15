import axios from "axios"
import { baseUrl } from "./http"
import { LoginData } from "../types/login"
import { UserResponse } from "../types/user";


const url = baseUrl + "user";
const getAll = async() => {
   const response = await (axios.get<UserResponse[]>(url))
   return response.data
}

const getById = async(id: string) => {
    const response = await (axios.get<UserResponse>(url + "/" + id));
    return response.data
}

const login = async (data: LoginData) => {
    const response = await (axios.post(url + "/login", data));
    return response.data
}
export default {getAll,getById,login}


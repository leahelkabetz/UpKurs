import axios from 'axios';
import { User } from '../models/user';

const BASE_URL_USERS = 'http://localhost:4000/users';

 export const getAllUsers=()=>axios.get(BASE_URL_USERS);

export const getUserByEmail = (email: string) =>
    axios.get(`${BASE_URL_USERS}?email=${email}`);

export const addUsers = (user: any) => axios.post(BASE_URL_USERS, user);

export const updateUser = (id: string, updatedUser: Partial<User>) => {
  return axios.put(`${BASE_URL_USERS}/${id}`, updatedUser);
};

export const deleteUsers = (id: number) => axios.delete(`${BASE_URL_USERS}/${id}`);
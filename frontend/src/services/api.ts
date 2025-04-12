import axios from 'axios';
import { config } from '../config';
import { User } from '../types/User';

export const api = {
    getUsers: async (): Promise<User[]> => {
        const response = await axios.get<User[]>(`${config.apiUrl}/users`);
        return response.data;
    },

    getUserById: async (id: number): Promise<User> => {
        const response = await axios.get<User>(`${config.apiUrl}/users/${id}`);
        return response.data;
    },

    createUser: async (user: User): Promise<User> => {
        const response = await axios.post<User>(`${config.apiUrl}/users`, user);
        return response.data;
    },

    updateUser: async (id: number, user: User): Promise<User> => {
        const response = await axios.put<User>(`${config.apiUrl}/users/${id}`, user);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await axios.delete(`${config.apiUrl}/users/${id}`);
    }
};
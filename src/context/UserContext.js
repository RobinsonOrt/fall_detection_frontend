import React, {createContext, useState} from 'react'
import { API } from "../config";
import axios from "axios";
import useSWR from 'swr';

const MyUserContext = createContext();

const MyUserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    const login = async (email, password) => {
        try{

            const response = await axios.post(`${API}/users/login`, {'email':email, 'password':password});
            return response;
        } catch (error) {
            return error.response;
        }
    };

    const addUser = async (user) => {
        try{
            const response = await axios.post(`${API}/users/adduser`, user, {headers: headerss});
            return response;
        } catch (error) {
            return error.response;
        }
    }

    const modifyUser = async (user) => {
        try{
            const response = await axios.put(`${API}/users/modifyuser`, user, {headers: headerss});
            return response;
        } catch (error) {
            return error.response;
        }
    }

    const deleteUser = async (userId) => {
        try{
            const response = await axios.delete(`${API}/users/deleteuser/${userId}`, {headers: headerss});
            return response;
        } catch (error) {
            return error.response;
        }
    }

    const headerss = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('token')
    }

    const fetcher = () => axios.get(`${API}/users`, {headers: headerss}).then(res => res.data).then(
        (data) => {
            //console.log(data);
            return data
        }
    );
    function useUsers () {
        const { data, error } = useSWR(`${API}/users`, fetcher, { refreshInterval: 2000 });
        return {
            users: data,
            isLoading: !error && !data,
            isError: error
        };
    }

    return (
        <MyUserContext.Provider value={{
            user,
            setUser,
            users,
            setUsers,
            useUsers,
            login,
            addUser,
            modifyUser,
            deleteUser
        }}>
            {children}
        </MyUserContext.Provider>
    )
}

export { MyUserProvider }
export default MyUserContext;
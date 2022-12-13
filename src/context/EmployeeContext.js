import React, { createContext, useState } from "react";
import { API } from "../config";
import axios from "axios";
import useSWR from "swr";

const MyEmployeeContext = createContext();

const MyEmployeeProvider = ({ children }) => {
    const [employee, setEmployee] = useState({});
    const [employees, setEmployees] = useState([]);

    const addEmployee = async (employee) => {
        try {
            const response = await axios.post(
                `${API}/employees/addemployee`,
                employee,
                { headers: headerss }
            );
            return response;
        } catch (error) {
            return error.response;
        }
    }

    const modifyEmployee = async (employee) => {
        try {
            const response = await axios.put(
                `${API}/employees/modifyemployee`,
                employee,
                { headers: headerss }
            );
            return response;
        } catch (error) {
            return error.response;
        }
    }

    const deleteEmployee = async (employeeId) => {
        try {
            const response = await axios.delete(
                `${API}/employees/deleteemployee/${employeeId}`,
                { headers: headerss }
            );
            return response;
        } catch (error) {
            return error.response;
        }
    }

    const headerss = {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("token"),
    }

    const fetcher = () => axios.get(`${API}/employees`, { headers: headerss }).then((res) => res.data).then(
        (data) => {
            //console.log(data);
            return data;
        }
    );
    

    function useEmployees () {
        const { data, error } = useSWR(`${API}/employees`, fetcher, { refreshInterval: 3000 });
        return {
            employees: data,
            isLoading: !error && !data,
            isError: error,
        };
    }

    return (
        <MyEmployeeContext.Provider value={{
            employees,
            setEmployees,
            employee,
            setEmployee,
            addEmployee,
            modifyEmployee,
            deleteEmployee,
            useEmployees,
        }}>
            {children}
        </MyEmployeeContext.Provider>
    );
};

export { MyEmployeeProvider }
export default MyEmployeeContext;
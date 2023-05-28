import { useEffect, useState } from "react";
import { doApiMethod } from "../services/apiService";
import { UserContext } from "./createContext";

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await doApiMethod("auth/me", "GET");
            setUser(response);
            console.log("context user", user)
        } catch (err) {
            console.log(err);
            setUser(null)
        }
        console.log("context user", user)
    };

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <UserContext.Provider value={{ user, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

import { createContext } from "react";
import { getSessionCookie, setSessionCookie } from "./session";

export const userContext = createContext({
    getContextUser: () => {},
    setContextUser: () => {},
});

export const useUserContext = () => {
    const getContextUser = () => getSessionCookie();
    const setContextUser = (user) => {
        setSessionCookie(JSON.stringify(user))
    }

    return {
        getContextUser, setContextUser,
    };
}
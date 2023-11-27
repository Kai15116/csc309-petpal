import { useState } from "react";
import { createContext } from "react";

export const userContext = createContext({
    user: {},
    setUser: () => {},
});

export const useUserContext = () => {
    const [user, setUser] = useState({});

    return {
        user, setUser,
    };
}
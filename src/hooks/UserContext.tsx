import React, { ReactNode, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface UserContextProps {
    children: ReactNode;
}

interface UserContextValue {
    user: RootState["user"];
    login: (user: RootState["user"]) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

// export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
//     const dispatch = useDispatch();
//     const user = useSelector((state: RootState) => state.user);

//     const login = (user: RootState["user"]) => {
//         dispatch(setUser(user));
//     };

//     const logout = () => {
//         dispatch(setUser(null));
//     };

//     return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
// };

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

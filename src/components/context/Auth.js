import React, {useState} from "react";
import useLocalStorage from "../../components/hooks/UseLocalStorage";

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
    const [auth, setAuth] = useLocalStorage("auth", null);
    return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>;


};

export default AuthContext; 
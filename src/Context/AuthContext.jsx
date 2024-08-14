import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export let authContext = createContext(null);
export function AuthContextProvider(props) {
    let [userData, setData] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("user")) {
            setData(jwtDecode(localStorage.getItem("user")));
        }
    }, [localStorage.getItem("user")]);


    return <authContext.Provider value={{ userData, setData }}>
        {props.children}
    </authContext.Provider>
}
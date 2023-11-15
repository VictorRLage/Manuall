import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function CreateContext({ children }) {
    const [data, setData] = useState("");
    const [userPfp, setUserPfp] = useState(undefined);
    const [userName, setUserName] = useState("");
    const [userType, setUserType] = useState(
        localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO),
    );
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                userPfp,
                setUserPfp,
                userName,
                setUserName,
                userType,
                setUserType,
                windowWidth,
                setWindowWidth,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);

import { createContext, useContext, useState } from "react";
import axios from "@/api/axios";

const DataContext = createContext();

export function CreateContext({ children }) {
    const [data, setData] = useState("");
    const [userPfp, setUserPfp] = useState(undefined);
    const [userName, setUserName] = useState("");
    const [userType, setUserType] = useState(
        localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO),
    );
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [notificacoesCount, setNotificacoesCount] = useState(0);

    if (localStorage.TOKEN) {
        axios.get("/usuario/nome").then(({ data }) => setUserName(data));
    }

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
                notificacoesCount,
                setNotificacoesCount
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);

import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function CreateContext({ children }) {
    const [data, setData] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    return (
        <DataContext.Provider
            value={{ data, setData, windowWidth, setWindowWidth }}
        >
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);

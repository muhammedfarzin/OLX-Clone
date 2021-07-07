import { createContext, useState } from "react";

export const LoadContext = createContext(null)

function Loader({ children }) {
    const [loading, setLoading] = useState(Boolean)

    return (
        <LoadContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadContext.Provider>
    )
}

export default Loader
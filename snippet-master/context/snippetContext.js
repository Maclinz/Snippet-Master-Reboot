import React, { useContext, useState } from "react";

const SnippeContext = React.createContext();



export const SnipetProvider = ({ children }) => {

    const [snippetValues, setSnippetValues] = useState({
        title: "",
        code: "",
        tags: [],
        errors: '',
        success: false,
        loading: false,

    });

    return (
        <SnippeContext.Provider value={{...snippetValues, snippetValues, setSnippetValues}}>
            {children}
        </SnippeContext.Provider>
    )
}

export const useSnippetContext = () => {
    return useContext(SnippeContext);
}

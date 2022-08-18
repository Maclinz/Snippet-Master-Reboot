import React, {useContext, useState} from 'react'
import themes from '../styles/themes'

const ThemeContext = React.createContext()

export const ThemeProider = ({children}) => {

    const [theme, seTheme] = useState(0)
    const currentTheme = themes[theme]

    return (
        <ThemeContext.Provider value={currentTheme}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () =>{
    return useContext(ThemeContext)
}
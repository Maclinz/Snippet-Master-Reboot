import React, {useContext, useState} from 'react'
import themes from '../styles/themes'

const ThemeContext = React.createContext()
const ThemeContextUpdate = React.createContext()

export const ThemeProider = ({children}) => {

    const [theme, setTheme] = useState(0)
    const currentTheme = themes[theme]


    return (
        <ThemeContext.Provider value={currentTheme}>
            <ThemeContextUpdate.Provider value={setTheme}>
                {children}
            </ThemeContextUpdate.Provider>
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () =>{
    return useContext(ThemeContext)
}

export const useThemeUpdate= () => {
    return useContext(ThemeContextUpdate)
}
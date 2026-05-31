import { createContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [tema, setTemaInterno] = useLocalStorage('tema', 'claro')

    useEffect(() => {
        document.body.setAttribute('data-theme', tema)
    }, [tema])

    function setTema(nuevoTema) {
        setTemaInterno(nuevoTema)
    }

    function toggleTema() {
        setTemaInterno(t => t === 'claro' ? 'oscuro' : 'claro')
    }

    return (
        <ThemeContext.Provider value={{ tema, setTema, toggleTema }}>
            {children}
        </ThemeContext.Provider>
    )
}

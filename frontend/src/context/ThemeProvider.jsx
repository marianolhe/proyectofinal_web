import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [tema, setTemaInterno] = useState(
        () => localStorage.getItem('tema') || 'claro'
    )

    useEffect(() => {
        document.body.setAttribute('data-theme', tema)
        localStorage.setItem('tema', tema)
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

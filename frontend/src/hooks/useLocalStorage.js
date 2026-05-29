import { useState, useEffect } from 'react'

/**
 * @param {string} clave - clave en localStorage
 * @param {*} valorInicial - valor por defecto si no existe
 * @returns {[*, Function]} par [valor, setValor]
 */
function useLocalStorage(clave, valorInicial) {
    const [valor, setValor] = useState(() => {
        try {
            const item = localStorage.getItem(clave)
            return item ? JSON.parse(item) : valorInicial
        } catch {
            return valorInicial
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(clave, JSON.stringify(valor))
        } catch {}
    }, [clave, valor])

    return [valor, setValor]
}

export default useLocalStorage

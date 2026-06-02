import { createContext, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const StorageContext = createContext()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function StorageProvider({ children }) {
    const [modo, setModoInterno] = useLocalStorage('modo', 'local')

    function setModo(nuevoModo) {
        setModoInterno(nuevoModo)
    }

    const obtenerItems = useCallback(async () => {
        if (modo === 'api') {
            try {
                const respuesta = await fetch(`${API_URL}/api/items`)
                return await respuesta.json()
            } catch {
                console.error('Error al conectar con la API')
                return []
            }
        } else {
            const guardado = localStorage.getItem('viajes')
            return guardado ? JSON.parse(guardado) : []
        }
    }, [modo])

    const guardarItem = useCallback(async (item, esNuevo = false) => {
        if (modo === 'api') {
            try {
                const metodo = esNuevo ? 'POST' : 'PUT'
                const url = esNuevo
                    ? `${API_URL}/api/items`
                    : `${API_URL}/api/items/${item.id}`
                await fetch(url, {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                })
            } catch {
                console.error('Error al guardar en la API')
            }
        } else {
            const guardado = localStorage.getItem('viajes')
            const items = guardado ? JSON.parse(guardado) : []
            const existe = items.find(i => i.id === item.id)
            if (existe) {
                const actualizados = items.map(i => i.id === item.id ? item : i)
                localStorage.setItem('viajes', JSON.stringify(actualizados))
            } else {
                localStorage.setItem('viajes', JSON.stringify([...items, item]))
            }
        }
    }, [modo])

    const eliminarItem = useCallback(async (id) => {
        if (modo === 'api') {
            try {
                await fetch(`${API_URL}/api/items/${id}`, { method: 'DELETE' })
            } catch {
                console.error('Error al eliminar en la API')
            }
        } else {
            const guardado = localStorage.getItem('viajes')
            const items = guardado ? JSON.parse(guardado) : []
            const actualizados = items.map(i =>
                i.id === id ? { ...i, activo: false } : i
            )
            localStorage.setItem('viajes', JSON.stringify(actualizados))
        }
    }, [modo])

    return (
        <StorageContext.Provider value={{ modo, setModo, obtenerItems, guardarItem, eliminarItem }}>
            {children}
        </StorageContext.Provider>
    )
}

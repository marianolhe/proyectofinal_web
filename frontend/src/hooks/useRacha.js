import { useMemo } from 'react'

/**
 * @param {Array} lista - lista de viajes del estado global
 * @returns {{ racha: number, rachaMaxima: number, diasActivos: number }}
 */
function useRacha(lista) {
    return useMemo(() => {
        const fechas = new Set()

        lista.forEach(item => {
            if (item.fechaRegistro) fechas.add(item.fechaRegistro.split('T')[0])
            ;(item.registros || []).forEach(r => {
                if (r.fecha) fechas.add(r.fecha.split('T')[0])
            })
        })

        const sorted = [...fechas].sort()
        const diasActivos = sorted.length

        if (diasActivos === 0) return { racha: 0, rachaMaxima: 0, diasActivos: 0 }

        let actual = 1, rachaMaxima = 1
        for (let i = 1; i < sorted.length; i++) {
            const diff = (new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000
            actual = diff === 1 ? actual + 1 : 1
            if (actual > rachaMaxima) rachaMaxima = actual
        }

        const hoy = new Date().toISOString().split('T')[0]
        const ayer = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        const ultimo = sorted[sorted.length - 1]

        let racha = 0
        if (ultimo === hoy || ultimo === ayer) {
            racha = 1
            for (let i = sorted.length - 2; i >= 0; i--) {
                const diff = (new Date(sorted[i + 1]) - new Date(sorted[i])) / 86400000
                if (diff === 1) racha++
                else break
            }
        }

        return { racha, rachaMaxima, diasActivos }
    }, [lista])
}

export default useRacha

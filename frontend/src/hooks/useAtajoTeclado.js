import { useEffect, useRef } from 'react'

/**
 * @param {Object.<string, Function>} atajos - mapa de combo a handler (ej. 'ctrl+n', 't')
 */
function useAtajoTeclado(atajos) {
    const atajesRef = useRef(atajos)
    atajesRef.current = atajos

    useEffect(() => {
        const manejar = (e) => {
            const enInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'

            Object.entries(atajesRef.current).forEach(([combo, fn]) => {
                const partes = combo.split('+')
                const necesitaCtrl = partes.includes('ctrl')
                const tecla = partes[partes.length - 1]

                if (necesitaCtrl) {
                    if (e.ctrlKey && e.key === tecla) { e.preventDefault(); fn(e) }
                } else {
                    if (!enInput && e.key === tecla) fn(e)
                }
            })
        }

        window.addEventListener('keydown', manejar)
        return () => window.removeEventListener('keydown', manejar)
    }, [])
}

export default useAtajoTeclado

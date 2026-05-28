import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

function GraficaActividad({ listaFiltrada }) {

    const datos = useMemo(() => {
        const hoy = new Date()

        const ultimos7 = Array.from({ length: 7 }, (_, i) => {
            const fecha = new Date(hoy)
            fecha.setDate(hoy.getDate() - (6 - i))
            return {
                fecha: fecha.toISOString().split('T')[0],
                etiqueta: fecha.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
                viajes: 0
            }
        })

        listaFiltrada.forEach(item => {
            if (!item.fechaRegistro) return
            const dia = item.fechaRegistro.split('T')[0]
            const entrada = ultimos7.find(d => d.fecha === dia)
            if (entrada) entrada.viajes += 1
        })

        return ultimos7
    }, [listaFiltrada])

    return (
        <div className="grafica-card">
            <h3 className="grafica-titulo">📅 Actividad últimos 7 días</h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={datos} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-borde)" />
                    <XAxis dataKey="etiqueta" tick={{ fontSize: 12, fill: 'var(--color-texto-secundario)' }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: 'var(--color-texto-secundario)' }} />
                    <Tooltip
                        contentStyle={{ background: 'var(--color-superficie)', border: '1px solid var(--color-borde)', borderRadius: '8px' }}
                        labelStyle={{ color: 'var(--color-texto)', fontWeight: 600 }}
                        formatter={(value) => [value, 'Viajes registrados']}
                    />
                    <Legend formatter={() => 'Viajes registrados'} />
                    <Bar dataKey="viajes" fill="#a3a380" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraficaActividad

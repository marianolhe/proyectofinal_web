import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import { categorias } from '../../utils/categorias'

function GraficaPuntuacion({ listaFiltrada }) {

    const datos = useMemo(() => {
        return categorias
            .map(cat => {
                const viajesConPuntuacion = listaFiltrada.filter(
                    item => item.categoriaId === cat.id && item.puntuacion !== null && item.puntuacion !== undefined
                )
                if (viajesConPuntuacion.length === 0) return null

                const promedio = viajesConPuntuacion.reduce((sum, item) => sum + item.puntuacion, 0) / viajesConPuntuacion.length

                return {
                    name: `${cat.emoji} ${cat.nombre}`,
                    promedio: parseFloat(promedio.toFixed(1)),
                    color: cat.color
                }
            })
            .filter(d => d !== null)
    }, [listaFiltrada])

    if (datos.length === 0) {
        return (
            <div className="grafica-card">
                <h3 className="grafica-titulo">⭐ Puntuación promedio por categoría</h3>
                <p className="grafica-vacia">No hay viajes con puntuación para mostrar</p>
            </div>
        )
    }

    return (
        <div className="grafica-card">
            <h3 className="grafica-titulo">⭐ Puntuación promedio por categoría</h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={datos} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-borde)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--color-texto-secundario)' }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: 'var(--color-texto-secundario)' }} />
                    <Tooltip
                        contentStyle={{ background: 'var(--color-superficie)', border: '1px solid var(--color-borde)', borderRadius: '8px' }}
                        labelStyle={{ color: 'var(--color-texto)', fontWeight: 600 }}
                        formatter={(value) => [value + ' / 10', 'Puntuación promedio']}
                    />
                    <Legend formatter={() => 'Puntuación promedio (0-10)'} />
                    <Bar dataKey="promedio" radius={[4, 4, 0, 0]}>
                        {datos.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraficaPuntuacion

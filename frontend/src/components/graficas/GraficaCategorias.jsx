import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { categorias } from '../../utils/categorias'

function GraficaCategorias({ listaFiltrada }) {

    const datos = useMemo(() => {
        return categorias
            .map(cat => ({
                name: `${cat.emoji} ${cat.nombre}`,
                value: listaFiltrada.filter(item => item.categoriaId === cat.id).length,
                color: cat.color
            }))
            .filter(d => d.value > 0)
    }, [listaFiltrada])

    if (datos.length === 0) {
        return (
            <div className="grafica-card">
                <h3 className="grafica-titulo">🗂 Viajes por categoría</h3>
                <p className="grafica-vacia">No hay viajes para mostrar</p>
            </div>
        )
    }

    return (
        <div className="grafica-card">
            <h3 className="grafica-titulo">🗂 Viajes por categoría</h3>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={datos}
                        cx="50%"
                        cy="50%"
                        outerRadius={75}
                        dataKey="value"
                        label={({ name, percent }) => `${Math.round(percent * 100)}%`}
                        labelLine={false}
                    >
                        {datos.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ background: 'var(--color-superficie)', border: '1px solid var(--color-borde)', borderRadius: '8px' }}
                        formatter={(value, name) => [value + ' viajes', name]}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraficaCategorias

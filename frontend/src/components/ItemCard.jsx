import { memo } from 'react'
import './ItemCard.css'
import { categorias } from '../utils/categorias'

function CardViaje({ viaje, onEliminarViaje, onEditarViaje }) {
    const categoria = categorias.find(c => c.id === viaje.categoriaId)

    return (
        <div className="card" data-categoria={viaje.categoriaId}>
            <div className="card-cabecera">
                <p className="card-nombre">{viaje.nombre}</p>
                {categoria && (
                    <span
                        className="card-categoria-badge"
                        style={{ backgroundColor: categoria.color }}
                    >
                        {categoria.emoji} {categoria.nombre}
                    </span>
                )}
            </div>
            <p className="card-detalle">📍 {viaje.atributos.pais}</p>
            <p className="card-detalle">⏱ {viaje.atributos.duracion} días</p>
            <p className="card-detalle">⭐ {viaje.puntuacion ?? 'Sin puntuación'}</p>
            <p className={`card-estado ${viaje.estado}`}>{viaje.estado}</p>

            <div className="card-botones">
                <button className="btn-editar" onClick={() => onEditarViaje(viaje)}>✏️ Editar</button>
                <button className="btn-eliminar" onClick={() => onEliminarViaje(viaje.id)}>🗑 Eliminar</button>
            </div>
        </div>
    )
}

export default memo(CardViaje)

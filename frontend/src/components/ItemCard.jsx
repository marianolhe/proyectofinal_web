import './ItemCard.css';

function CardViaje({viaje}){
    return(
        <div className="card" data-categoria={viaje.categoriaId}>
            <p className='card-nombre'>{viaje.nombre}</p>
            <p className='card-detalle'>Categoria: {viaje.categoriaId}</p>
            
            <p className='card-detalle'>Puntuacion: {viaje.puntuacion}</p>
            <p className='card-detalle'>Pais: {viaje.atributos.pais}</p>

            <p className={`card-estado ${viaje.estado}`}> Estado: {viaje.estado}</p>
        </div>
    )
}

export default CardViaje;
function CardViaje({viaje}){
    return(
        <div>
            <h2>{viaje.nombre}</h2>
            <p>Categoria: {viaje.categoriaId}</p>
            <p>Estado: {viaje.estado}</p>
            <p>Puntuacion: {viaje.puntuacion}</p>
            <p>Pais: {viaje.atributos.pais}</p>
        </div>
    )
}

export default CardViaje;
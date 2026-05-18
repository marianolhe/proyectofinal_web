

function ListaItems({viajes}){
    if (viajes.length === 0){
        return <p>No hay viajes registrados</p>
    }
    return(
        <div>
            <h1>Lista de viajes</h1>
            {viajes.map((viaje) => (
                <p key={viaje.id}>
                    {viaje.nombre}</p>
            ))}
        </div>
)}

export default ListaItems;
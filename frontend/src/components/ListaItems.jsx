import CardViaje from "./ItemCard";
import './ItemCard.css';

function ListaItems({viajes, onEliminarViaje, onEditarViaje}){
    if (viajes.length === 0){
        return <p>No hay viajes registrados</p>
    }
    return(
        <div>
            <h1 className='lista-titulo'> Lista de viajes</h1>
            <div className='lista-grid'>
            {viajes.map((viaje) => (
                <CardViaje key={viaje.id} viaje={viaje} onEliminarViaje={onEliminarViaje} onEditarViaje={onEditarViaje}/>  
            ))}
            </div>
        </div>
)}

export default ListaItems;
import {categorias} from '../utils/categorias'
import { useEffect, useState } from 'react';
import './Formulario.css';

function Formulario({onAgregarViaje, viajeEditando, onActualizarViaje}){ 
    const [formulario, setFormulario] = useState({
        nombre: '',
        categoriaId: '',
        estado: '',
        puntuacion: '',
        notas: '',
        pais: '',
        duracion: '',
        compania: ''
    })

    useEffect(() => {
    if (viajeEditando) {
    setFormulario({
      nombre: viajeEditando.nombre,
      categoriaId: viajeEditando.categoriaId,
      estado: viajeEditando.estado,
      puntuacion: viajeEditando.puntuacion || '',
      notas: viajeEditando.notas,
      pais: viajeEditando.atributos.pais,
      duracion: viajeEditando.atributos.duracion,
      compania: viajeEditando.atributos.compania
    })
    }
    }, [viajeEditando])

    function enviarFormulario(e){
        e.preventDefault();
        const nuevoViaje = {
            id: crypto.randomUUID(),
            nombre: formulario.nombre,
            categoriaId: formulario.categoriaId,
            estado: formulario.estado,
            puntuacion: formulario.puntuacion ?
            Number(formulario.puntuacion) : null,
            notas: formulario.notas,
            fechaRegistro: new Date().toISOString(),
            fechaActividad : new Date().toISOString(),
            activo: true,
            atributos:{
            pais: formulario.pais,
            duracion: formulario.duracion,
            compania: formulario.compania
            }
        }
        if (viajeEditando) {
        onActualizarViaje({
        ...viajeEditando,
        nombre: formulario.nombre,
        categoriaId: formulario.categoriaId,
        estado: formulario.estado,
        puntuacion: formulario.puntuacion ? Number(formulario.puntuacion) : null,
        notas: formulario.notas,
        fechaActividad: new Date().toISOString(),
        atributos: {
            pais: formulario.pais,
            duracion: formulario.duracion,
            compania: formulario.compania
        }
    });
    } else {
    onAgregarViaje(nuevoViaje);
    }
        setFormulario({
            nombre: '',
            categoriaId: '',
            estado: '',
            puntuacion: '',
            notas: '',
            pais: '',
            duracion: '',
            compania: ''
        });

        
    }

    return(
        <div className ='formulario-container'>
            <form onSubmit={enviarFormulario}>
            <h1>Agregar Viaje</h1>

        <div className='formulario-grid'>

            <div className='campo'>
            <label>Nombre del viaje: </label>
            <input type="text" placeholder="Nombre del viaje"
            value={formulario.nombre}
            onChange={(e) => setFormulario({...formulario, nombre: e.target.value})} />
            </div>


            <div className='campo'>
            <label>Categoria: </label>
            <select
            value={formulario.categoriaId}
            onChange={(e) => setFormulario({...formulario, categoriaId: e.target.value})}>
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre} </option>
                ))}
            </select>
            </div>
            
            <div className='campo'>
            <label>Estado del viaje: </label>
            <select
            value={formulario.estado}
            onChange={(e) => setFormulario({...formulario, estado: e.target.value})}>
                <option value="">Selecciona un estado</option>
                <option value="completado">Completado</option>
                <option value="pendiente">Pendiente</option>
                <option value="cancelado">Cancelado</option>
            </select>
            </div>

            <div className='campo'>
            <label>Puntuación: </label>
            <input type="number" placeholder="Puntuación del 0-10"
            value={formulario.puntuacion}
            onChange={(e) => setFormulario({...formulario, puntuacion: e.target.value})} />
            </div>

            <div className='campo'>
            <label> Notas: </label>
            <textarea placeholder="Notas sobre el viaje"
            value={formulario.notas}
            onChange={(e) => setFormulario({...formulario, notas: e.target.value})}></textarea>
            </div>

            <div className='campo'>
            <label>País: </label>
            <input type="text" placeholder="País del viaje"
            value={formulario.pais}
            onChange={(e) => setFormulario({...formulario, pais: e.target.value})} />
            </div>

            <div className='campo'>
            <label>Duración (días): </label>
            <input type="number" placeholder="Duración del viaje"
            value={formulario.duracion}
            onChange={(e) => setFormulario({...formulario, duracion: e.target.value})} />
            </div>

            <div className='campo'>
            <label> ¿Solo o acompañado?</label>
            <select
            value={formulario.compania}
            onChange={(e) => setFormulario({...formulario, compania: e.target.value})}>
                <option value="">Selecciona una opción</option>
                <option value="solo">Solo</option>
                <option value="acompañado">Acompañado</option>
            </select>
            </div>

            <button className='btn-guardar' type="submit">Guardar</button>

        </div>
        </form>
    
        </div>
    )
}

export default Formulario;
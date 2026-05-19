import Formulario from "./components/FormularioItem";
import {useState, useEffect} from "react";
import ListaItems from "./components/ListaItems";
import './App.css';

function App() {
  const [viajeEditando, setViajeEditando] = useState(null);
  const [viajes, setViajes] = useState(() => {
    try{
      const guardado = localStorage.getItem('viajes');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
    });
  function agregarViaje(nuevoViaje){
    setViajes([...viajes, nuevoViaje]);
  }
  useEffect(() => {
    localStorage.setItem('viajes', JSON.stringify(viajes));
  }, [viajes]);

  function eliminarViaje(id){
    setViajes(viajes.map ( v =>
      v.id === id ? {...v, activo: false} : v
    ))
  }
  function actualizarViaje(viajeActualizado) {
  setViajes(viajes.map(v => 
    v.id === viajeActualizado.id ? viajeActualizado : v
  ))
  setViajeEditando(null)
  }

  return (
    <div>
    <div className="app-header">
      <h1>Bienvenido a tu tracker de viajes!! </h1>
    </div>
      <Formulario 
      onAgregarViaje={agregarViaje}
      viajeEditando={viajeEditando}
      onActualizarViaje={actualizarViaje} />
      <ListaItems viajes={viajes.filter(v => v.activo)} 
      onEliminarViaje={eliminarViaje} 
      onEditarViaje={setViajeEditando}/>
    </div>
  )
}


export default App;
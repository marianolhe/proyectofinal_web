import Formulario from "./components/FormularioItem";
import {useState, useEffect} from "react";
import ListaItems from "./components/ListaItems";
import './App.css';

function App() {
  const [viajes, setViajes] = useState(
    () => JSON.parse(localStorage.getItem('viajes') || '[]')
  );
  function agregarViaje(nuevoViaje){
    setViajes([...viajes, nuevoViaje]);
  }
  useEffect(() => {
    localStorage.setItem('viajes', JSON.stringify(viajes));
  }, [viajes]);

  return (
    <div>
    <div className="app-header">
      <h1>Bienvenido a tu tracker de viajes!! </h1>
    </div>
      <Formulario onAgregarViaje={agregarViaje} />
      <ListaItems viajes={viajes} />
    </div>
  )
}

export default App;
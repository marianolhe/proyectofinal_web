import Formulario from "./components/FormularioItem";
import {useState} from "react";
import ListaItems from "./components/ListaItems";

function App() {
  const [viajes, setViajes] = useState([]);
  function agregarViaje(nuevoViaje){
    setViajes([...viajes, nuevoViaje]);
  }

  return (
    <div>
      <h1>Bienvenido a tu tracker de viajes!! </h1>
      <Formulario onAgregarViaje={agregarViaje} />
      <ListaItems viajes={viajes} />
    </div>
  )
}

export default App;
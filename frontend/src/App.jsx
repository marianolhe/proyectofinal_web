import { useState, useEffect, useContext, useRef } from 'react'
import Formulario from './components/FormularioItem'
import ListaItems from './components/ListaItems'
import { StorageContext } from './context/StorageProvider'
import { ThemeContext } from './context/ThemeProvider'
import './App.css'

function App() {
  const { modo, setModo, obtenerItems, guardarItem, eliminarItem } = useContext(StorageContext)
  const { tema, toggleTema } = useContext(ThemeContext)

  const [viajes, setViajes] = useState([])
  const [viajeEditando, setViajeEditando] = useState(null)

  // useRef #1 — referencia al input de nombre para auto-focus con Ctrl+N
  const inputNombreRef = useRef(null)

  // useRef #2 — referencia al final de la lista para hacer scroll automático al agregar un viaje
  const listaFinalRef = useRef(null)

  // carga los items cada vez que cambia el modo — limpia primero para no mostrar datos del modo anterior
  useEffect(() => {
    setViajes([])
    obtenerItems().then(items => setViajes(items))
  }, [obtenerItems])

  // atajos de teclado: Ctrl+N enfoca el input, T cambia el tema
  useEffect(() => {
    const manejarAtajo = (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault()
        inputNombreRef.current?.focus()
      }
      if (e.key === 't' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        toggleTema()
      }
    }
    window.addEventListener('keydown', manejarAtajo)
    return () => window.removeEventListener('keydown', manejarAtajo)
  }, [toggleTema])

  // agrega un viaje nuevo usando el contexto
  async function agregarViaje(nuevoViaje) {
    await guardarItem(nuevoViaje, true)  // true = es nuevo → POST
    const itemsActualizados = await obtenerItems()
    setViajes(itemsActualizados)
    // auto-focus al input después de agregar
    inputNombreRef.current?.focus()
    // scroll al final de la lista para ver la tarjeta recién agregada
    setTimeout(() => listaFinalRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  // actualiza un viaje existente usando el contexto
  async function actualizarViaje(viajeActualizado) {
    await guardarItem(viajeActualizado, false)  // false = existente → PUT
    const itemsActualizados = await obtenerItems()
    setViajes(itemsActualizados)
    setViajeEditando(null)
  }

  // archiva un viaje usando el contexto
  async function archivarViaje(id) {
    await eliminarItem(id)
    const itemsActualizados = await obtenerItems()
    setViajes(itemsActualizados)
  }

  return (
    <div>
      <div className="app-header">
        <h1>Bienvenido a tu tracker de viajes!!</h1>

        {/* selector de modo API vs Local */}
        <div className="modo-selector">
          <span>Modo:</span>
          <button
            className={modo === 'local' ? 'btn-modo activo' : 'btn-modo'}
            onClick={() => setModo('local')}
          >
            📦 Local
          </button>
          <button
            className={modo === 'api' ? 'btn-modo activo' : 'btn-modo'}
            onClick={() => setModo('api')}
          >
            🌐 API
          </button>
        </div>

        {/* botón para cambiar tema claro/oscuro */}
        <button className="btn-tema" onClick={toggleTema}>
          {tema === 'claro' ? '🌙 Oscuro' : '☀️ Claro'}
        </button>
      </div>

      <Formulario
        onAgregarViaje={agregarViaje}
        viajeEditando={viajeEditando}
        onActualizarViaje={actualizarViaje}
        inputNombreRef={inputNombreRef}
      />

      <ListaItems
        viajes={viajes.filter(v => v.activo)}
        onEliminarViaje={archivarViaje}
        onEditarViaje={setViajeEditando}
      />

      {/* ancla invisible al final de la lista — useRef #2 hace scroll aquí al agregar un viaje */}
      <div ref={listaFinalRef} />
    </div>
  )
}

export default App

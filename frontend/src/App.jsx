import { useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback } from 'react'
import Formulario from './components/FormularioItem'
import ListaItems from './components/ListaItems'
import { StorageContext } from './context/StorageProvider'
import { ThemeContext } from './context/ThemeProvider'
import { itemsReducer, initialState } from './reducers/itemsReducer'
import { categorias } from './utils/categorias'
import GraficaActividad from './components/graficas/GraficaActividad'
import GraficaCategorias from './components/graficas/GraficaCategorias'
import GraficaPuntuacion from './components/graficas/GraficaPuntuacion'
import useAtajoTeclado from './hooks/useAtajoTeclado'
import useRacha from './hooks/useRacha'
import useFetch from './hooks/useFetch'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const { modo, setModo, obtenerItems, guardarItem, eliminarItem } = useContext(StorageContext)
  const { tema, toggleTema } = useContext(ThemeContext)

  const [state, dispatch] = useReducer(itemsReducer, initialState)
  const { lista, filtroCategoria, filtroEstado, busqueda } = state

  const [viajeEditando, setViajeEditando] = useState(null)

  // useRef #1 — referencia al input de nombre para auto-focus con Ctrl+N
  const inputNombreRef = useRef(null)

  // useRef #2 — referencia al final de la lista para scroll automático
  const listaFinalRef = useRef(null)

  const { racha } = useRacha(lista)
  const { data: estadoApi } = useFetch(modo === 'api' ? `${API_URL}/` : null)

  useEffect(() => {
    dispatch({ type: 'HIDRATAR', payload: [] })
    obtenerItems().then(items => dispatch({ type: 'HIDRATAR', payload: items }))
  }, [obtenerItems])

  useAtajoTeclado({
    'ctrl+n': () => inputNombreRef.current?.focus(),
    't': () => toggleTema()
  })

  const listaFiltrada = useMemo(() => {
    return lista.filter(item =>
      item.activo &&
      (filtroCategoria === 'todas' || item.categoriaId === filtroCategoria) &&
      (filtroEstado === 'todos' || item.estado === filtroEstado) &&
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
  }, [lista, filtroCategoria, filtroEstado, busqueda])

  async function agregarViaje(nuevoViaje) {
    await guardarItem(nuevoViaje, true)
    dispatch({ type: 'AGREGAR', payload: nuevoViaje })
    inputNombreRef.current?.focus()
    setTimeout(() => listaFinalRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  async function actualizarViaje(viajeActualizado) {
    await guardarItem(viajeActualizado, false)
    const items = await obtenerItems()
    dispatch({ type: 'HIDRATAR', payload: items })
    setViajeEditando(null)
  }

  const handleEliminar = useCallback(async (id) => {
    await eliminarItem(id)
    dispatch({ type: 'ELIMINAR', payload: id })
  }, [eliminarItem])

  const handleEditar = useCallback((viaje) => {
    setViajeEditando(viaje)
  }, [])

  return (
    <div>
      <div className="app-header">
        <div className="header-titulo">
          <h1>Bienvenido a tu tracker de viajes!!</h1>
          {racha > 0 && <span className="racha-badge">🔥 {racha} {racha === 1 ? 'día' : 'días'} de racha</span>}
          {modo === 'api' && estadoApi && <span className="api-badge">🟢 API conectada</span>}
        </div>

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

      <div className="filtros-container">
        <input
          type="text"
          placeholder="🔍 Buscar viaje..."
          value={busqueda}
          onChange={e => dispatch({ type: 'FILTRAR', payload: { busqueda: e.target.value } })}
          className="filtro-busqueda"
        />

        <select
          value={filtroCategoria}
          onChange={e => dispatch({ type: 'FILTRAR', payload: { filtroCategoria: e.target.value } })}
          className="filtro-select"
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.emoji} {c.nombre}</option>
          ))}
        </select>

        <select
          value={filtroEstado}
          onChange={e => dispatch({ type: 'FILTRAR', payload: { filtroEstado: e.target.value } })}
          className="filtro-select"
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <button
          className="btn-limpiar-filtros"
          onClick={() => dispatch({ type: 'LIMPIAR_FILTROS' })}
        >
          ✕ Limpiar filtros
        </button>
      </div>

      <ListaItems
        viajes={listaFiltrada}
        onEliminarViaje={handleEliminar}
        onEditarViaje={handleEditar}
      />

      <div className="graficas-grid">
        <GraficaActividad listaFiltrada={listaFiltrada} />
        <GraficaCategorias listaFiltrada={listaFiltrada} />
        <GraficaPuntuacion listaFiltrada={listaFiltrada} />
      </div>

      <div ref={listaFinalRef} />
    </div>
  )
}

export default App

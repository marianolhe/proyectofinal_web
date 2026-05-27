export const initialState = {
    lista: [],
    filtroCategoria: 'todas',
    filtroEstado: 'todos',
    busqueda: '',
}

// función pura: sin fetch, sin Date.now(), sin mutaciones
export function itemsReducer(state, action) {
    switch (action.type) {
        case 'HIDRATAR':
            return { ...state, lista: action.payload }

        case 'AGREGAR':
            return { ...state, lista: [...state.lista, action.payload] }

        case 'ELIMINAR':
            return {
                ...state,
                lista: state.lista.map(item =>
                    item.id === action.payload ? { ...item, activo: false } : item
                )
            }

        case 'CAMBIAR_ESTADO':
            return {
                ...state,
                lista: state.lista.map(item =>
                    item.id === action.payload.id
                        ? { ...item, estado: action.payload.estado }
                        : item
                )
            }

        case 'FILTRAR':
            return { ...state, ...action.payload }

        case 'LIMPIAR_FILTROS':
            return { ...state, filtroCategoria: 'todas', filtroEstado: 'todos', busqueda: '' }

        case 'REGISTRAR_ACTIVIDAD':
            return {
                ...state,
                lista: state.lista.map(item =>
                    item.id === action.payload.id
                        ? { ...item, registros: [...(item.registros || []), action.payload.registro] }
                        : item
                )
            }

        default:
            return state
    }
}
